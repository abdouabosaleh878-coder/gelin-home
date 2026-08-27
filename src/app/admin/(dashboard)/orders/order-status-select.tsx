"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { updateOrderStatus } from "@/actions/orders";

const STATUSES = ["PENDING", "CONFIRMED", "PREPARING", "SHIPPED", "DELIVERED", "CANCELLED"] as const;

export function OrderStatusSelect({ orderId, status }: { orderId: number; status: string }) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <select
      defaultValue={status}
      disabled={pending}
      onChange={(e) => {
        const value = e.target.value as (typeof STATUSES)[number];
        startTransition(async () => {
          await updateOrderStatus(orderId, value);
          toast.success(`Order marked as ${value}`);
          router.refresh();
        });
      }}
      className="h-11 rounded-md border border-navy-200 bg-white px-3 text-sm font-medium"
    >
      {STATUSES.map((s) => (
        <option key={s} value={s}>{s}</option>
      ))}
    </select>
  );
}
