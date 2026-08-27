"use client";

import { useActionState, useTransition } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { addInstagramPost, deleteInstagramPost } from "@/actions/homepage";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

type Post = { id: string; imageUrl: string; link: string };

export function InstagramManager({ posts }: { posts: Post[] }) {
  const [state, formAction, pending] = useActionState(addInstagramPost, {});
  const [deleting, startTransition] = useTransition();
  const router = useRouter();

  return (
    <section className="rounded-xl border border-navy-100 bg-white p-6 space-y-5">
      <h2 className="font-display text-lg text-navy-900">Instagram Gallery</h2>
      {state.error && <p className="rounded-md bg-sale-50 px-3 py-2 text-sm text-sale-600">{state.error}</p>}

      <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
        {posts.map((post) => (
          <div key={post.id} className="relative aspect-square overflow-hidden rounded-md bg-slate-100">
            <Image src={post.imageUrl} alt="" fill sizes="120px" className="object-cover" />
            <button
              disabled={deleting}
              onClick={() => startTransition(async () => { await deleteInstagramPost(post.id); router.refresh(); })}
              className="absolute top-1 right-1 rounded-full bg-white/90 p-1 text-sale-600"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
      </div>

      <form action={formAction} encType="multipart/form-data" className="flex flex-wrap items-end gap-3 border-t border-navy-100 pt-5">
        <div>
          <Label htmlFor="ig-image">Image</Label>
          <input id="ig-image" name="image" type="file" accept="image/*" required className="block text-sm" />
        </div>
        <div className="flex-1 min-w-[180px]">
          <Label htmlFor="ig-link">Link (optional)</Label>
          <Input id="ig-link" name="link" placeholder="https://instagram.com/..." />
        </div>
        <Button type="submit" disabled={pending}>{pending ? "Adding..." : "Add Photo"}</Button>
      </form>
    </section>
  );
}
