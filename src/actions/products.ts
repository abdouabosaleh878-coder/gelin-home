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

function parseSizes(raw: string): string {
  const list = raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  return JSON.stringify(list);
}

function parseColors(raw: string): string {
  const list = raw
    .split(",")
    .map((pair) => pair.trim())
    .filter(Boolean)
    .map((pair) => {
      const [name, hex] = pair.split(":").map((s) => s.trim());
      return { name: name || pair, hex: hex || "#D9CDB8" };
    });
  return JSON.stringify(list);
}

const productSchema = z.object({
  name: z.string().min(1),
  nameAr: z.string().optional(),
  description: z.string().min(1),
  descriptionAr: z.string().optional(),
  shortDescription: z.string().optional(),
  shortDescriptionAr: z.string().optional(),
  price: z.coerce.number().positive(),
  salePrice: z.coerce.number().optional(),
  sku: z.string().min(1),
  stock: z.coerce.number().int().min(0),
  categoryId: z.string().min(1),
  material: z.string().optional(),
  dimensions: z.string().optional(),
  sizes: z.string().optional(),
  colors: z.string().optional(),
});

async function buildProductData(formData: FormData) {
  const raw = Object.fromEntries(formData.entries());
  const parsed = productSchema.parse(raw);
  const slugSource = (raw.slug as string) || parsed.name;

  return {
    name: parsed.name,
    nameAr: parsed.nameAr || null,
    slug: slugify(slugSource),
    description: parsed.description,
    descriptionAr: parsed.descriptionAr || null,
    shortDescription: parsed.shortDescription || null,
    shortDescriptionAr: parsed.shortDescriptionAr || null,
    price: parsed.price,
    salePrice: parsed.salePrice && parsed.salePrice > 0 ? parsed.salePrice : null,
    sku: parsed.sku,
    stock: parsed.stock,
    categoryId: parsed.categoryId,
    material: parsed.material || null,
    dimensions: parsed.dimensions || null,
    sizes: parseSizes(parsed.sizes || ""),
    colors: parseColors(parsed.colors || ""),
    featured: formData.get("featured") === "on",
    bestseller: formData.get("bestseller") === "on",
    newArrival: formData.get("newArrival") === "on",
    onSale: formData.get("onSale") === "on",
    active: formData.get("active") === "on",
  };
}

async function saveNewImages(formData: FormData, productId: string, startOrder: number) {
  const files = formData.getAll("images").filter((f): f is File => f instanceof File && f.size > 0);
  let order = startOrder;
  for (const file of files) {
    const url = await saveImage(file, "products");
    await prisma.productImage.create({ data: { productId, url, sortOrder: order } });
    order += 1;
  }
}

export async function createProduct(_prevState: { error?: string }, formData: FormData) {
  await requireAdmin();
  let data;
  try {
    data = await buildProductData(formData);
  } catch {
    return { error: "Please check all required fields." };
  }

  try {
    const product = await prisma.product.create({ data });
    await saveNewImages(formData, product.id, 0);
    revalidatePath("/[locale]", "layout");
    revalidatePath("/admin/products");
    redirect(`/admin/products/${product.id}?created=1`);
  } catch (err) {
    if (err && typeof err === "object" && "code" in err && err.code === "P2002") {
      return { error: "A product with this SKU or slug already exists." };
    }
    throw err;
  }
}

export async function updateProduct(
  productId: string,
  _prevState: { error?: string },
  formData: FormData
) {
  await requireAdmin();
  let data;
  try {
    data = await buildProductData(formData);
  } catch {
    return { error: "Please check all required fields." };
  }

  const removeIds = formData.getAll("removeImage").map(String);

  try {
    await prisma.product.update({ where: { id: productId }, data });

    if (removeIds.length) {
      const toRemove = await prisma.productImage.findMany({ where: { id: { in: removeIds } } });
      await prisma.productImage.deleteMany({ where: { id: { in: removeIds } } });
      await Promise.all(toRemove.map((img) => deleteImage(img.url)));
    }

    const currentMax = await prisma.productImage.count({ where: { productId } });
    await saveNewImages(formData, productId, currentMax);

    revalidatePath("/[locale]", "layout");
    revalidatePath("/admin/products");
    revalidatePath(`/admin/products/${productId}`);
  } catch (err) {
    if (err && typeof err === "object" && "code" in err && err.code === "P2002") {
      return { error: "A product with this SKU or slug already exists." };
    }
    throw err;
  }
  return { error: undefined, success: true };
}

export async function deleteProduct(productId: string) {
  await requireAdmin();
  const images = await prisma.productImage.findMany({ where: { productId } });
  await prisma.product.delete({ where: { id: productId } });
  await Promise.all(images.map((img) => deleteImage(img.url)));
  revalidatePath("/[locale]", "layout");
  revalidatePath("/admin/products");
}

export async function duplicateProduct(productId: string) {
  await requireAdmin();
  const original = await prisma.product.findUniqueOrThrow({
    where: { id: productId },
    include: { images: true },
  });

  const copy = await prisma.product.create({
    data: {
      name: `${original.name} (Copy)`,
      nameAr: original.nameAr,
      slug: `${original.slug}-copy-${Date.now().toString(36)}`,
      description: original.description,
      descriptionAr: original.descriptionAr,
      shortDescription: original.shortDescription,
      shortDescriptionAr: original.shortDescriptionAr,
      price: original.price,
      salePrice: original.salePrice,
      sku: `${original.sku}-COPY-${Date.now().toString(36).toUpperCase()}`,
      stock: original.stock,
      categoryId: original.categoryId,
      material: original.material,
      dimensions: original.dimensions,
      sizes: original.sizes,
      colors: original.colors,
      featured: false,
      bestseller: false,
      newArrival: original.newArrival,
      onSale: original.onSale,
      active: false,
      isDemo: original.isDemo,
      images: { create: original.images.map((img) => ({ url: img.url, alt: img.alt, sortOrder: img.sortOrder })) },
    },
  });

  revalidatePath("/admin/products");
  redirect(`/admin/products/${copy.id}`);
}

export async function toggleProductActive(productId: string, active: boolean) {
  await requireAdmin();
  await prisma.product.update({ where: { id: productId }, data: { active } });
  revalidatePath("/[locale]", "layout");
  revalidatePath("/admin/products");
}
