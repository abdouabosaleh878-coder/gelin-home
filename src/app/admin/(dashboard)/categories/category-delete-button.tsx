"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { deleteCategory } from "@/actions/categories";

export function CategoryDeleteButton({ categoryId, productCount }: { categoryId: string; productCount: number }) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  function handleDelete() {
    if (productCount > 0) {
      toast.error("Move or delete this category's products first.");
      return;
    }
    if (!confirm("Delete this category permanently?")) return;
    startTransition(async () => {
      try {
        await deleteCategory(categoryId);
        toast.success("Category deleted");
        router.refresh();
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Could not delete category.");
      }
    });
  }

  return (
    <button disabled={pending} onClick={handleDelete} className="text-xs font-medium text-ink-500 hover:text-sale-600">
      Delete
    </button>
  );
}
