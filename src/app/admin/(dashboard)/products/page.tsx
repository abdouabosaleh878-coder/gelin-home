import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import { parseProduct } from "@/lib/products";
import { ProductRowActions } from "./product-row-actions";

export const metadata: Metadata = { title: "Products" };

const PAGE_SIZE = 20;

export default async function AdminProductsPage({
  searchParams,
}: PageProps<"/admin/products">) {
  const params = await searchParams;
  const q = typeof params.q === "string" ? params.q : "";
  const page = Math.max(1, Number(params.page) || 1);

  const where = q
    ? { OR: [{ name: { contains: q } }, { sku: { contains: q } }] }
    : {};

  const [products, total, categories] = await Promise.all([
    prisma.product.findMany({
      where,
      include: { images: true, category: true },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
    prisma.product.count({ where }),
    prisma.category.count(),
  ]);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl text-navy-900">Products</h1>
          <p className="mt-1 text-sm text-ink-500">{total} products{categories === 0 ? " — add a category first" : ""}</p>
        </div>
        <Link href="/admin/products/new" className="rounded-md bg-gold-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-gold-700">
          + Add Product
        </Link>
      </div>

      <form className="flex gap-2">
        <input
          type="text"
          name="q"
          defaultValue={q}
          placeholder="Search by name or SKU..."
          className="h-11 flex-1 max-w-sm rounded-md border border-navy-200 bg-white px-4 text-sm focus-visible:border-gold-500 focus-visible:outline-none"
        />
        <button className="h-11 rounded-md border border-navy-200 bg-white px-4 text-sm font-medium text-navy-900">Search</button>
      </form>

      <div className="overflow-x-auto rounded-xl border border-navy-100 bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-navy-100 text-left text-xs uppercase tracking-wide text-ink-400">
              <th className="p-4">Product</th>
              <th className="p-4">Category</th>
              <th className="p-4">Price</th>
              <th className="p-4">Stock</th>
              <th className="p-4">Status</th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => {
              const parsed = parseProduct(p);
              return (
                <tr key={p.id} className="border-b border-navy-50 last:border-0">
                  <td className="p-4">
                    <Link href={`/admin/products/${p.id}`} className="flex items-center gap-3">
                      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md bg-slate-100">
                        <Image src={parsed.primaryImage} alt={p.name} fill sizes="48px" className="object-cover" />
                      </div>
                      <div>
                        <p className="font-medium text-navy-900">{p.name}</p>
                        <p className="text-xs text-ink-400">{p.sku}</p>
                      </div>
                    </Link>
                  </td>
                  <td className="p-4 text-ink-700">{p.category.name}</td>
                  <td className="p-4 text-ink-700">
                    EGP {p.price.toLocaleString()}
                    {p.salePrice ? <span className="ml-1 text-xs text-sale-600">(sale {p.salePrice})</span> : null}
                  </td>
                  <td className="p-4">
                    <span className={p.stock <= 5 ? "font-semibold text-sale-600" : "text-ink-700"}>{p.stock}</span>
                  </td>
                  <td className="p-4">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${p.active ? "bg-green-50 text-green-700" : "bg-navy-50 text-ink-500"}`}>
                      {p.active ? "Active" : "Disabled"}
                    </span>
                  </td>
                  <td className="p-4">
                    <ProductRowActions productId={p.id} active={p.active} />
                  </td>
                </tr>
              );
            })}
            {products.length === 0 && (
              <tr><td colSpan={6} className="p-8 text-center text-ink-400">No products found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <Link
              key={i}
              href={`/admin/products?q=${encodeURIComponent(q)}&page=${i + 1}`}
              className={`h-9 w-9 flex items-center justify-center rounded-md text-sm ${page === i + 1 ? "bg-navy-900 text-white" : "border border-navy-200 text-navy-700"}`}
            >
              {i + 1}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
