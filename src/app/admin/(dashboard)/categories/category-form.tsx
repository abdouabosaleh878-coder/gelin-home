"use client";

import { useActionState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

type ActionState = { error?: string; success?: boolean };

export function CategoryForm({
  action,
  initial,
  currentImage,
  submitLabel = "Save Category",
}: {
  action: (prevState: ActionState, formData: FormData) => Promise<ActionState>;
  initial?: {
    name?: string;
    nameAr?: string;
    slug?: string;
    description?: string;
    descriptionAr?: string;
    sortOrder?: number;
    active?: boolean;
  };
  currentImage?: string | null;
  submitLabel?: string;
}) {
  const [state, formAction, pending] = useActionState(action, {});

  return (
    <form action={formAction} className="space-y-6" encType="multipart/form-data">
      {state.error && <p className="rounded-md bg-sale-50 px-4 py-3 text-sm text-sale-600">{state.error}</p>}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="name">Name (English)</Label>
          <Input id="name" name="name" required defaultValue={initial?.name} />
        </div>
        <div>
          <Label htmlFor="nameAr">Name (Arabic)</Label>
          <Input id="nameAr" name="nameAr" dir="rtl" defaultValue={initial?.nameAr} />
        </div>
      </div>
      <div>
        <Label htmlFor="slug">URL Slug (leave blank to auto-generate)</Label>
        <Input id="slug" name="slug" defaultValue={initial?.slug} placeholder="bed-linen" />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="description">Description (English)</Label>
          <Textarea id="description" name="description" rows={3} defaultValue={initial?.description} />
        </div>
        <div>
          <Label htmlFor="descriptionAr">Description (Arabic)</Label>
          <Textarea id="descriptionAr" name="descriptionAr" dir="rtl" rows={3} defaultValue={initial?.descriptionAr} />
        </div>
      </div>
      <div>
        <Label htmlFor="sortOrder">Display Order</Label>
        <Input id="sortOrder" name="sortOrder" type="number" defaultValue={initial?.sortOrder ?? 0} className="max-w-[140px]" />
      </div>

      <div>
        {currentImage && (
          <div className="relative mb-3 h-32 w-32 overflow-hidden rounded-md bg-slate-100">
            <Image src={currentImage} alt="" fill sizes="128px" className="object-cover" />
          </div>
        )}
        <Label htmlFor="image">{currentImage ? "Replace Image" : "Category Image"}</Label>
        <input
          id="image"
          name="image"
          type="file"
          accept="image/*"
          className="block w-full text-sm text-ink-700 file:mr-4 file:rounded-md file:border-0 file:bg-navy-900 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-navy-800"
        />
      </div>

      <label className="flex items-center gap-2 text-sm text-ink-700">
        <input type="checkbox" name="active" defaultChecked={initial?.active ?? true} className="h-4 w-4 rounded border-navy-300" />
        Active (visible on storefront)
      </label>

      <Button type="submit" size="lg" disabled={pending}>{pending ? "Saving..." : submitLabel}</Button>
    </form>
  );
}
