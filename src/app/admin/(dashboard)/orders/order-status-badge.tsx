const COLORS: Record<string, string> = {
  PENDING: "bg-gold-50 text-gold-800",
  CONFIRMED: "bg-blue-50 text-blue-700",
  PREPARING: "bg-purple-50 text-purple-700",
  SHIPPED: "bg-cyan-50 text-cyan-700",
  DELIVERED: "bg-green-50 text-green-700",
  CANCELLED: "bg-sale-50 text-sale-600",
};

export function OrderStatusBadge({ status }: { status: string }) {
  return (
    <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${COLORS[status] || "bg-navy-50 text-ink-700"}`}>
      {status}
    </span>
  );
}
