"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { deleteShortAction } from "@/lib/actions/short-actions";

export function DeleteButton({ shortId }: { shortId: string }) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  function handleDelete() {
    if (!confirm("Delete this short permanently? This can't be undone.")) return;
    startTransition(async () => {
      await deleteShortAction(shortId);
      router.push("/shorts");
    });
  }

  return (
    <Button variant="danger" size="sm" onClick={handleDelete} disabled={pending}>
      {pending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />} Delete
    </Button>
  );
}
