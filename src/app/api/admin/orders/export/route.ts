import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { formatOrderNumber } from "@/lib/format";

function csvEscape(value: string | number) {
  const str = String(value ?? "");
  return /[",\n]/.test(str) ? `"${str.replace(/"/g, '""')}"` : str;
}

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: { items: true },
  });

  const header = [
    "Order Number",
    "Date",
    "Customer",
    "Phone",
    "Email",
    "Governorate",
    "City",
    "Address",
    "Items",
    "Subtotal",
    "Delivery Fee",
    "Total",
    "Payment Method",
    "Status",
  ];

  const rows = orders.map((o) => [
    formatOrderNumber(o.id),
    o.createdAt.toISOString(),
    o.fullName,
    o.phone,
    o.email || "",
    o.governorate,
    o.city,
    o.address,
    o.items.map((i) => `${i.productName} x${i.quantity}`).join("; "),
    o.subtotal,
    o.deliveryFee,
    o.total,
    o.paymentMethod,
    o.status,
  ]);

  const csv = [header, ...rows].map((row) => row.map(csvEscape).join(",")).join("\n");

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="gelin-home-orders-${Date.now()}.csv"`,
    },
  });
}
