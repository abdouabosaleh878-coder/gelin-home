import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { createProduct } from "@/actions/products";
import { ProductForm } from "../product-form";

export const metadata: Metadata = { title: "Add Product" };

export default async function NewProductPage() {
  const categories = await prisma.category.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl text-navy-900">Add Product</h1>
        <p className="mt-1 text-sm text-ink-500">Create a new product for your store.</p>
      </div>
      {categories.length === 0 && (
        <p className="rounded-md bg-gold-50 px-4 py-3 text-sm text-gold-800">
          You don&apos;t have any categories yet. <Link href="/admin/categories/new" className="underline">Create one first</Link>.
        </p>
      )}
      <ProductForm action={createProduct} categories={categories} submitLabel="Create Product" />
    </div>
  );
}
