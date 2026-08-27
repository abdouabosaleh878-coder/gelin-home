import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { prisma } from "@/lib/db";
import { formatOrderNumber } from "@/lib/format";
import { OrderStatusSelect } from "../order-status-select";
import { PrintButton } from "../print-button";

export const metadata: Metadata = { title: "Order Details" };

export default async function AdminOrderDetailPage({ params }: PageProps<"/admin/orders/[id]">) {
  const { id } = await params;
  const orderId = Number(id);
  if (!Number.isFinite(orderId)) notFound();

  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: { items: true, customer: true },
  });
  if (!order) notFound();

  const customerOrderCount = await prisma.order.count({ where: { customerId: order.customerId } });

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 no-print">
        <div>
          <h1 className="font-display text-3xl text-navy-900">{formatOrderNumber(order.id)}</h1>
          <p className="mt-1 text-sm text-ink-500">Placed on {order.createdAt.toLocaleString()}</p>
        </div>
        <div className="flex items-center gap-3">
          <OrderStatusSelect orderId={order.id} status={order.status} />
          <PrintButton />
        </div>
      </div>

      <div className="hidden print:block mb-6">
        <h1 className="font-display text-2xl">Gelin Home — {formatOrderNumber(order.id)}</h1>
        <p className="text-sm text-ink-500">Placed on {order.createdAt.toLocaleString()} — Status: {order.status}</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="rounded-xl border border-navy-100 bg-white p-6">
          <h2 className="font-display text-lg text-navy-900">Customer</h2>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between"><dt className="text-ink-500">Name</dt><dd className="text-navy-900">{order.fullName}</dd></div>
            <div className="flex justify-between"><dt className="text-ink-500">Phone</dt><dd className="text-navy-900">{order.phone}</dd></div>
            {order.email && <div className="flex justify-between"><dt className="text-ink-500">Email</dt><dd className="text-navy-900">{order.email}</dd></div>}
            <div className="flex justify-between"><dt className="text-ink-500">Total Orders</dt><dd className="text-navy-900">{customerOrderCount}</dd></div>
          </dl>
        </div>

        <div className="rounded-xl border border-navy-100 bg-white p-6">
          <h2 className="font-display text-lg text-navy-900">Shipping Address</h2>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between"><dt className="text-ink-500">Governorate</dt><dd className="text-navy-900">{order.governorate}</dd></div>
            <div className="flex justify-between"><dt className="text-ink-500">City</dt><dd className="text-navy-900">{order.city}</dd></div>
            <div className="flex justify-between"><dt className="text-ink-500">Address</dt><dd className="text-navy-900 text-right">{order.address}</dd></div>
            {order.building && <div className="flex justify-between"><dt className="text-ink-500">Building</dt><dd className="text-navy-900">{order.building}</dd></div>}
            {order.apartment && <div className="flex justify-between"><dt className="text-ink-500">Apartment</dt><dd className="text-navy-900">{order.apartment}</dd></div>}
          </dl>
        </div>
      </div>

      {order.notes && (
        <div className="rounded-xl border border-navy-100 bg-white p-6">
          <h2 className="font-display text-lg text-navy-900">Order Notes</h2>
          <p className="mt-2 text-sm text-ink-700">{order.notes}</p>
        </div>
      )}

      <div className="rounded-xl border border-navy-100 bg-white p-6">
        <h2 className="font-display text-lg text-navy-900">Items</h2>
        <div className="mt-4 divide-y divide-navy-50">
          {order.items.map((item) => (
            <div key={item.id} className="flex items-center gap-4 py-3">
              {item.productImage && (
                <div className="relative h-14 w-12 shrink-0 overflow-hidden rounded bg-slate-100">
                  <Image src={item.productImage} alt={item.productName} fill sizes="48px" className="object-cover" />
                </div>
              )}
              <div className="flex-1">
                <p className="text-sm font-medium text-navy-900">{item.productName}</p>
                {(item.size || item.color) && (
                  <p className="text-xs text-ink-500">{[item.size, item.color].filter(Boolean).join(" / ")}</p>
                )}
                <p className="text-xs text-ink-400">Qty {item.quantity} &times; EGP {item.unitPrice.toLocaleString()}</p>
              </div>
              <p className="text-sm font-semibold text-navy-900">EGP {item.subtotal.toLocaleString()}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 space-y-1.5 border-t border-navy-100 pt-4 text-sm">
          <div className="flex justify-between text-ink-700"><span>Subtotal</span><span>EGP {order.subtotal.toLocaleString()}</span></div>
          <div className="flex justify-between text-ink-700"><span>Delivery Fee</span><span>EGP {order.deliveryFee.toLocaleString()}</span></div>
          <div className="flex justify-between text-base font-semibold text-navy-900 pt-1"><span>Total</span><span>EGP {order.total.toLocaleString()}</span></div>
          <div className="flex justify-between text-ink-500 pt-1"><span>Payment Method</span><span className="uppercase">{order.paymentMethod}</span></div>
        </div>
      </div>
    </div>
  );
}
