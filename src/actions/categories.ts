"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/require-admin";
import { saveImage, deleteImage } from "@/lib/storage";

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

const categorySchema = z.object({
  name: z.string().min(1),
  nameAr: z.string().optional(),
  description: z.string().optional(),
  descriptionAr: z.string().optional(),
  sortOrder: z.coerce.number().int().optional(),
});

export async function createCategory(_prevState: { error?: string }, formData: FormData) {
  await requireAdmin();
  const raw = Object.fromEntries(formData.entries());
  const parsed = categorySchema.safeParse(raw);
  if (!parsed.success) return { error: "Please enter a category name." };

  const slugSource = (raw.slug as string) || parsed.data.name;
  const image = formData.get("image");

  try {
    const category = await prisma.category.create({
      data: {
        name: parsed.data.name,
        nameAr: parsed.data.nameAr || null,
        slug: slugify(slugSource),
        description: parsed.data.description || null,
        descriptionAr: parsed.data.descriptionAr || null,
        sortOrder: parsed.data.sortOrder ?? 0,
        active: formData.get("active") === "on",
        image: image instanceof File && image.size > 0 ? await saveImage(image, "categories") : null,
      },
    });
    revalidatePath("/[locale]", "layout");
    revalidatePath("/admin/categories");
    redirect(`/admin/categories?created=${category.id}`);
  } catch (err) {
    if (err && typeof err === "object" && "code" in err && err.code === "P2002") {
      return { error: "A category with this name/slug already exists." };
    }
    throw err;
  }
}

export async function updateCategory(
  categoryId: string,
  _prevState: { error?: string },
  formData: FormData
) {
  await requireAdmin();
  const raw = Object.fromEntries(formData.entries());
  const parsed = categorySchema.safeParse(raw);
  if (!parsed.success) return { error: "Please enter a category name." };

  const slugSource = (raw.slug as string) || parsed.data.name;
  const image = formData.get("image");

  try {
    const data: Record<string, unknown> = {
      name: parsed.data.name,
      nameAr: parsed.data.nameAr || null,
      slug: slugify(slugSource),
      description: parsed.data.description || null,
      descriptionAr: parsed.data.descriptionAr || null,
      sortOrder: parsed.data.sortOrder ?? 0,
      active: formData.get("active") === "on",
    };

    if (image instanceof File && image.size > 0) {
      const existing = await prisma.category.findUnique({ where: { id: categoryId } });
      data.image = await saveImage(image, "categories");
      if (existing?.image) await deleteImage(existing.image);
    }

    await prisma.category.update({ where: { id: categoryId }, data });
    revalidatePath("/[locale]", "layout");
    revalidatePath("/admin/categories");
  } catch (err) {
    if (err && typeof err === "object" && "code" in err && err.code === "P2002") {
      return { error: "A category with this name/slug already exists." };
    }
    throw err;
  }
  return { success: true };
}

export async function deleteCategory(categoryId: string) {
  await requireAdmin();
  const productCount = await prisma.product.count({ where: { categoryId } });
  if (productCount > 0) {
    throw new Error("Cannot delete a category that still has products. Move or delete its products first.");
  }
  const category = await prisma.category.findUnique({ where: { id: categoryId } });
  await prisma.category.delete({ where: { id: categoryId } });
  if (category?.image) await deleteImage(category.image);
  revalidatePath("/[locale]", "layout");
  revalidatePath("/admin/categories");
}

export async function reorderCategory(categoryId: string, direction: "up" | "down") {
  await requireAdmin();
  const categories = await prisma.category.findMany({ orderBy: { sortOrder: "asc" } });
  const index = categories.findIndex((c) => c.id === categoryId);
  const swapWith = direction === "up" ? index - 1 : index + 1;
  if (index < 0 || swapWith < 0 || swapWith >= categories.length) return;

  await prisma.$transaction([
    prisma.category.update({ where: { id: categories[index].id }, data: { sortOrder: categories[swapWith].sortOrder } }),
    prisma.category.update({ where: { id: categories[swapWith].id }, data: { sortOrder: categories[index].sortOrder } }),
  ]);
  revalidatePath("/[locale]", "layout");
  revalidatePath("/admin/categories");
}
