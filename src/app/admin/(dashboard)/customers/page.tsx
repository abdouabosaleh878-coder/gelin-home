import type { Metadata } from "next";
import { prisma } from "@/lib/db";

export const metadata: Metadata = { title: "Customers" };

export default async function AdminCustomersPage() {
  const customers = await prisma.customer.findMany({
    orderBy: { createdAt: "desc" },
    include: { orders: { select: { total: true, status: true } } },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl text-navy-900">Customers</h1>
        <p className="mt-1 text-sm text-ink-500">{customers.length} customers</p>
      </div>

      <div className="overflow-x-auto rounded-xl border border-navy-100 bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-navy-100 text-left text-xs uppercase tracking-wide text-ink-400">
              <th className="p-4">Name</th>
              <th className="p-4">Phone</th>
              <th className="p-4">Email</th>
              <th className="p-4">Orders</th>
              <th className="p-4">Total Spent</th>
              <th className="p-4">Joined</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c) => {
              const totalSpent = c.orders
                .filter((o) => o.status !== "CANCELLED")
                .reduce((sum, o) => sum + o.total, 0);
              return (
                <tr key={c.id} className="border-b border-navy-50 last:border-0">
                  <td className="p-4 font-medium text-navy-900">{c.fullName}</td>
                  <td className="p-4 text-ink-700">{c.phone}</td>
                  <td className="p-4 text-ink-700">{c.email || "—"}</td>
                  <td className="p-4 text-ink-700">{c.orders.length}</td>
                  <td className="p-4 text-ink-700">EGP {Math.round(totalSpent).toLocaleString()}</td>
                  <td className="p-4 text-ink-500">{c.createdAt.toLocaleDateString()}</td>
                </tr>
              );
            })}
            {customers.length === 0 && (
              <tr><td colSpan={6} className="p-8 text-center text-ink-400">No customers yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
