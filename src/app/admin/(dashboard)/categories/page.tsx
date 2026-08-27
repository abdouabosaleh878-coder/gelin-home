import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { ArrowUp, ArrowDown } from "lucide-react";
import { prisma } from "@/lib/db";
import { reorderCategory } from "@/actions/categories";
import { CategoryDeleteButton } from "./category-delete-button";

export const metadata: Metadata = { title: "Categories" };

export default async function AdminCategoriesPage() {
  const categories = await prisma.category.findMany({
    orderBy: { sortOrder: "asc" },
    include: { _count: { select: { products: true } } },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl text-navy-900">Categories</h1>
          <p className="mt-1 text-sm text-ink-500">{categories.length} categories</p>
        </div>
        <Link href="/admin/categories/new" className="rounded-md bg-gold-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-gold-700">
          + Add Category
        </Link>
      </div>

      <div className="overflow-x-auto rounded-xl border border-navy-100 bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-navy-100 text-left text-xs uppercase tracking-wide text-ink-400">
              <th className="p-4">Category</th>
              <th className="p-4">Products</th>
              <th className="p-4">Status</th>
              <th className="p-4">Order</th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody>
            {categories.map((c, i) => (
              <tr key={c.id} className="border-b border-navy-50 last:border-0">
                <td className="p-4">
                  <Link href={`/admin/categories/${c.id}`} className="flex items-center gap-3">
                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md bg-slate-100">
                      {c.image && <Image src={c.image} alt={c.name} fill sizes="48px" className="object-cover" />}
                    </div>
                    <span className="font-medium text-navy-900">{c.name}</span>
                  </Link>
                </td>
                <td className="p-4 text-ink-700">{c._count.products}</td>
                <td className="p-4">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${c.active ? "bg-green-50 text-green-700" : "bg-navy-50 text-ink-500"}`}>
                    {c.active ? "Active" : "Disabled"}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex gap-1">
                    <form action={reorderCategory.bind(null, c.id, "up")}>
                      <button disabled={i === 0} className="p-1.5 text-ink-500 hover:text-navy-900 disabled:opacity-20"><ArrowUp className="h-4 w-4" /></button>
                    </form>
                    <form action={reorderCategory.bind(null, c.id, "down")}>
                      <button disabled={i === categories.length - 1} className="p-1.5 text-ink-500 hover:text-navy-900 disabled:opacity-20"><ArrowDown className="h-4 w-4" /></button>
                    </form>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <Link href={`/admin/categories/${c.id}`} className="text-xs font-medium text-gold-700 hover:underline">Edit</Link>
                    <CategoryDeleteButton categoryId={c.id} productCount={c._count.products} />
                  </div>
                </td>
              </tr>
            ))}
            {categories.length === 0 && (
              <tr><td colSpan={5} className="p-8 text-center text-ink-400">No categories yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
