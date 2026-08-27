"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/require-admin";
import { getSiteSettings } from "@/lib/settings";
import { effectivePrice } from "@/lib/products";
import { formatOrderNumber } from "@/lib/format";

const orderInputSchema = z.object({
  fullName: z.string().min(2),
  phone: z.string().min(8),
  email: z.string().email().optional().or(z.literal("")),
  governorate: z.string().min(1),
  city: z.string().min(1),
  address: z.string().min(3),
  building: z.string().optional(),
  apartment: z.string().optional(),
  notes: z.string().optional(),
  items: z
    .array(
      z.object({
        productId: z.string().min(1),
        quantity: z.number().int().positive(),
        size: z.string().optional(),
        color: z.string().optional(),
      })
    )
    .min(1),
});

export type CreateOrderInput = z.infer<typeof orderInputSchema>;
export type CreateOrderResult =
  | { ok: true; orderId: number; orderNumber: string }
  | { ok: false; error: string };

export async function createOrder(input: CreateOrderInput): Promise<CreateOrderResult> {
  const parsed = orderInputSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: "Please check the order details and try again." };
  const data = parsed.data;

  const productIds = [...new Set(data.items.map((i) => i.productId))];
  const products = await prisma.product.findMany({
    where: { id: { in: productIds } },
    include: { images: true },
  });
  const productMap = new Map(products.map((p) => [p.id, p]));

  for (const item of data.items) {
    const product = productMap.get(item.productId);
    if (!product || !product.active) return { ok: false, error: "One of the items in your cart is no longer available." };
    if (product.stock < item.quantity) return { ok: false, error: `Only ${product.stock} left of "${product.name}".` };
  }

  const settings = await getSiteSettings();
  const orderItemsData = data.items.map((item) => {
    const product = productMap.get(item.productId)!;
    const unitPrice = effectivePrice(product);
    return {
      productId: product.id,
      productName: product.name,
      productImage: product.images[0]?.url ?? null,
      size: item.size || null,
      color: item.color || null,
      unitPrice,
      quantity: item.quantity,
      subtotal: unitPrice * item.quantity,
    };
  });

  const subtotal = orderItemsData.reduce((sum, i) => sum + i.subtotal, 0);
  const deliveryFee = subtotal >= settings.freeShippingThreshold ? 0 : settings.deliveryFee;
  const total = subtotal + deliveryFee;

  const customer = await prisma.customer.upsert({
    where: { phone: data.phone },
    update: { fullName: data.fullName, email: data.email || undefined },
    create: { fullName: data.fullName, phone: data.phone, email: data.email || null },
  });

  const order = await prisma.$transaction(async (tx) => {
    const created = await tx.order.create({
      data: {
        customerId: customer.id,
        fullName: data.fullName,
        phone: data.phone,
        email: data.email || null,
        governorate: data.governorate,
        city: data.city,
        address: data.address,
        building: data.building || null,
        apartment: data.apartment || null,
        notes: data.notes || null,
        subtotal,
        deliveryFee,
        total,
        paymentMethod: "cod",
        paymentStatus: "pending",
        status: "PENDING",
        items: { create: orderItemsData },
      },
    });

    for (const item of data.items) {
      await tx.product.update({
        where: { id: item.productId },
        data: { stock: { decrement: item.quantity } },
      });
    }

    return created;
  });

  revalidatePath("/admin");
  revalidatePath("/admin/orders");

  return { ok: true, orderId: order.id, orderNumber: formatOrderNumber(order.id) };
}

const STATUSES = ["PENDING", "CONFIRMED", "PREPARING", "SHIPPED", "DELIVERED", "CANCELLED"] as const;

export async function updateOrderStatus(orderId: number, status: (typeof STATUSES)[number]) {
  await requireAdmin();
  if (!STATUSES.includes(status)) throw new Error("Invalid status");
  await prisma.order.update({ where: { id: orderId }, data: { status } });
  revalidatePath("/admin/orders");
  revalidatePath(`/admin/orders/${orderId}`);
}
