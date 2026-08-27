import Link from "next/link";
import type { Metadata } from "next";
import { DollarSign, ShoppingBag, Package, Users, AlertTriangle, CalendarDays } from "lucide-react";
import { prisma } from "@/lib/db";
import { formatOrderNumber } from "@/lib/format";

export const metadata: Metadata = { title: "Dashboard" };

const LOW_STOCK_THRESHOLD = 5;

function startOfDay(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}
function startOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}

export default async function AdminDashboardPage() {
  const now = new Date();
  const todayStart = startOfDay(now);
  const monthStart = startOfMonth(now);
  const sevenDaysAgo = new Date(todayStart);
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);

  const [
    totalSalesAgg,
    ordersToday,
    ordersThisMonth,
    productCount,
    lowStockProducts,
    customerCount,
    recentOrders,
    weekOrders,
  ] = await Promise.all([
    prisma.order.aggregate({ _sum: { total: true }, where: { status: { not: "CANCELLED" } } }),
    prisma.order.count({ where: { createdAt: { gte: todayStart } } }),
    prisma.order.count({ where: { createdAt: { gte: monthStart } } }),
    prisma.product.count(),
    prisma.product.findMany({
      where: { stock: { lte: LOW_STOCK_THRESHOLD }, active: true },
      orderBy: { stock: "asc" },
      take: 5,
      select: { id: true, name: true, stock: true, sku: true },
    }),
    prisma.customer.count(),
    prisma.order.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      select: { id: true, fullName: true, total: true, status: true, createdAt: true },
    }),
    prisma.order.findMany({
      where: { createdAt: { gte: sevenDaysAgo }, status: { not: "CANCELLED" } },
      select: { total: true, createdAt: true },
    }),
  ]);

  const chartData = Array.from({ length: 7 }).map((_, i) => {
    const day = new Date(sevenDaysAgo);
    day.setDate(day.getDate() + i);
    const total = weekOrders
      .filter((o) => startOfDay(o.createdAt).getTime() === day.getTime())
      .reduce((sum, o) => sum + o.total, 0);
    return { day: day.toLocaleDateString("en-US", { weekday: "short" }), total: Math.round(total) };
  });

  const stats = [
    { label: "Total Sales", value: `EGP ${Math.round(totalSalesAgg._sum.total || 0).toLocaleString()}`, icon: DollarSign },
    { label: "Orders Today", value: ordersToday, icon: CalendarDays },
    { label: "Orders This Month", value: ordersThisMonth, icon: ShoppingBag },
    { label: "Products", value: productCount, icon: Package },
    { label: "Customers", value: customerCount, icon: Users },
  ];

  const { SalesChart } = await import("./sales-chart");

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl text-navy-900">Dashboard</h1>
        <p className="mt-1 text-ink-500">Welcome back — here&apos;s how Gelin Home is doing.</p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-xl border border-navy-100 bg-white p-5">
            <stat.icon className="h-5 w-5 text-gold-600" />
            <p className="mt-3 text-2xl font-semibold text-navy-900">{stat.value}</p>
            <p className="mt-1 text-xs text-ink-500">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-xl border border-navy-100 bg-white p-6 lg:col-span-2">
          <h2 className="font-display text-lg text-navy-900">Sales — Last 7 Days</h2>
          <div className="mt-4">
            <SalesChart data={chartData} />
          </div>
        </div>

        <div className="rounded-xl border border-navy-100 bg-white p-6">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-sale-600" />
            <h2 className="font-display text-lg text-navy-900">Low Stock</h2>
          </div>
          {lowStockProducts.length === 0 ? (
            <p className="mt-4 text-sm text-ink-500">All products are well stocked.</p>
          ) : (
            <ul className="mt-4 space-y-3">
              {lowStockProducts.map((p) => (
                <li key={p.id}>
                  <Link href={`/admin/products/${p.id}`} className="flex items-center justify-between text-sm hover:text-gold-700">
                    <span className="text-navy-900">{p.name}</span>
                    <span className="font-semibold text-sale-600">{p.stock} left</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="rounded-xl border border-navy-100 bg-white p-6">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg text-navy-900">Recent Orders</h2>
          <Link href="/admin/orders" className="text-sm font-medium text-gold-700 hover:underline">View all</Link>
        </div>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wide text-ink-400 border-b border-navy-100">
                <th className="pb-2 pr-4">Order</th>
                <th className="pb-2 pr-4">Customer</th>
                <th className="pb-2 pr-4">Total</th>
                <th className="pb-2 pr-4">Status</th>
                <th className="pb-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} className="border-b border-navy-50 last:border-0">
                  <td className="py-3 pr-4">
                    <Link href={`/admin/orders/${order.id}`} className="font-medium text-navy-900 hover:text-gold-700">
                      {formatOrderNumber(order.id)}
                    </Link>
                  </td>
                  <td className="py-3 pr-4">{order.fullName}</td>
                  <td className="py-3 pr-4">EGP {Math.round(order.total).toLocaleString()}</td>
                  <td className="py-3 pr-4">
                    <span className="rounded-full bg-navy-50 px-2.5 py-1 text-xs font-medium text-navy-700">{order.status}</span>
                  </td>
                  <td className="py-3 text-ink-500">{order.createdAt.toLocaleDateString()}</td>
                </tr>
              ))}
              {recentOrders.length === 0 && (
                <tr><td colSpan={5} className="py-6 text-center text-ink-400">No orders yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
