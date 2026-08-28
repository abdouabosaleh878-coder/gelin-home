import { cn } from "@/lib/utils";

const STATUS_STYLES: Record<string, string> = {
  DRAFT: "bg-white/8 text-muted",
  GENERATING: "bg-amber-500/15 text-amber-400",
  READY: "bg-emerald-500/15 text-emerald-400",
  FAILED: "bg-rose-500/15 text-rose-400",
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <span className={cn("inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide", STATUS_STYLES[status] ?? STATUS_STYLES.DRAFT)}>
      {status}
    </span>
  );
}
