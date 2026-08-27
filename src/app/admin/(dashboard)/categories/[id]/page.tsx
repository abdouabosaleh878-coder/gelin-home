import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { updateCategory } from "@/actions/categories";
import { CategoryForm } from "../category-form";

export const metadata: Metadata = { title: "Edit Category" };

export default async function EditCategoryPage({ params }: PageProps<"/admin/categories/[id]">) {
  const { id } = await params;
  const category = await prisma.category.findUnique({ where: { id } });
  if (!category) notFound();

  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="font-display text-3xl text-navy-900">Edit Category</h1>
      <CategoryForm
        action={updateCategory.bind(null, category.id)}
        currentImage={category.image}
        initial={{
          name: category.name,
          nameAr: category.nameAr ?? "",
          slug: category.slug,
          description: category.description ?? "",
          descriptionAr: category.descriptionAr ?? "",
          sortOrder: category.sortOrder,
          active: category.active,
        }}
      />
    </div>
  );
}
