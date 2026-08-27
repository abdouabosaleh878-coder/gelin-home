import type { Metadata } from "next";
import { createCategory } from "@/actions/categories";
import { CategoryForm } from "../category-form";

export const metadata: Metadata = { title: "Add Category" };

export default function NewCategoryPage() {
  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="font-display text-3xl text-navy-900">Add Category</h1>
      <CategoryForm action={createCategory} submitLabel="Create Category" />
    </div>
  );
}
