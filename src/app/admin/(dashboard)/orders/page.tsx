import Link from "next/link";
import type { Metadata } from "next";
import { Download } from "lucide-react";
import { prisma } from "@/lib/db";
import { formatOrderNumber } from "@/lib/format";
import { OrderStatusBadge } from "./order-status-badge";

export const metadata: Metadata = { title: "Orders" };

const STATUSES = ["PENDING", "CONFIRMED", "PREPARING", "SHIPPED", "DELIVERED", "CANCELLED"] as const;
const PAGE_SIZE = 20;

export default async function AdminOrdersPage({
  searchParams,
}: PageProps<"/admin/orders">) {
  const params = await searchParams;
  const q = typeof params.q === "string" ? params.q : "";
  const status = typeof params.status === "string" ? params.status : "";
  const page = Math.max(1, Number(params.page) || 1);

  const where = {
    ...(status ? { status } : {}),
    ...(q
      ? {
          OR: [
            { fullName: { contains: q } },
            { phone: { contains: q } },
          ],
        }
      : {}),
  };

  const [orders, total] = await Promise.all([
    prisma.order.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
    prisma.order.count({ where }),
  ]);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl text-navy-900">Orders</h1>
          <p className="mt-1 text-sm text-ink-500">{total} orders</p>
        </div>
        {/* File download, not a page route — a real <a> is required here. */}
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a
          href="/api/admin/orders/export"
          className="flex items-center gap-2 rounded-md border border-navy-200 bg-white px-4 py-2.5 text-sm font-medium text-navy-900 hover:bg-navy-50"
        >
          <Download className="h-4 w-4" /> Export CSV
        </a>
      </div>

      <form className="flex flex-wrap gap-2">
        <input
          type="text"
          name="q"
          defaultValue={q}
          placeholder="Search by name or phone..."
          className="h-11 flex-1 min-w-[200px] max-w-sm rounded-md border border-navy-200 bg-white px-4 text-sm focus-visible:border-gold-500 focus-visible:outline-none"
        />
        <select
          name="status"
          defaultValue={status}
          className="h-11 rounded-md border border-navy-200 bg-white px-3 text-sm"
        >
          <option value="">All statuses</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <button className="h-11 rounded-md border border-navy-200 bg-white px-4 text-sm font-medium text-navy-900">Filter</button>
      </form>

      <div className="overflow-x-auto rounded-xl border border-navy-100 bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-navy-100 text-left text-xs uppercase tracking-wide text-ink-400">
              <th className="p-4">Order</th>
              <th className="p-4">Customer</th>
              <th className="p-4">Phone</th>
              <th className="p-4">Total</th>
              <th className="p-4">Status</th>
              <th className="p-4">Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b border-navy-50 last:border-0">
                <td className="p-4">
                  <Link href={`/admin/orders/${order.id}`} className="font-medium text-navy-900 hover:text-gold-700">
                    {formatOrderNumber(order.id)}
                  </Link>
                </td>
                <td className="p-4 text-ink-700">{order.fullName}</td>
                <td className="p-4 text-ink-700">{order.phone}</td>
                <td className="p-4 text-ink-700">EGP {Math.round(order.total).toLocaleString()}</td>
                <td className="p-4"><OrderStatusBadge status={order.status} /></td>
                <td className="p-4 text-ink-500">{order.createdAt.toLocaleDateString()}</td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr><td colSpan={6} className="p-8 text-center text-ink-400">No orders found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <Link
              key={i}
              href={`/admin/orders?q=${encodeURIComponent(q)}&status=${status}&page=${i + 1}`}
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
