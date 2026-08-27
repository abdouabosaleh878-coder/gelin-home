"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Copy, Trash2, Power } from "lucide-react";
import { deleteProduct, duplicateProduct, toggleProductActive } from "@/actions/products";

export function ProductRowActions({ productId, active }: { productId: string; active: boolean }) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  function handleDelete() {
    if (!confirm("Delete this product permanently? This cannot be undone.")) return;
    startTransition(async () => {
      await deleteProduct(productId);
      toast.success("Product deleted");
      router.refresh();
    });
  }

  function handleDuplicate() {
    startTransition(() => {
      duplicateProduct(productId);
    });
  }

  function handleToggle() {
    startTransition(async () => {
      await toggleProductActive(productId, !active);
      toast.success(active ? "Product disabled" : "Product enabled");
      router.refresh();
    });
  }

  return (
    <div className="flex items-center gap-1">
      <button disabled={pending} onClick={handleToggle} title={active ? "Disable" : "Enable"} className="p-2 text-ink-500 hover:text-navy-900">
        <Power className="h-4 w-4" />
      </button>
      <button disabled={pending} onClick={handleDuplicate} title="Duplicate" className="p-2 text-ink-500 hover:text-navy-900">
        <Copy className="h-4 w-4" />
      </button>
      <button disabled={pending} onClick={handleDelete} title="Delete" className="p-2 text-ink-500 hover:text-sale-600">
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
}
