"use client";

import { useActionState } from "react";
import { updatePolicy } from "@/actions/settings";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export function PolicyForm({
  slug,
  titleEn,
  titleAr,
  contentEn,
  contentAr,
}: {
  slug: string;
  titleEn: string;
  titleAr: string;
  contentEn: string;
  contentAr: string;
}) {
  const [state, formAction, pending] = useActionState(updatePolicy, {});

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="slug" value={slug} />
      {state.success && <p className="rounded-md bg-green-50 px-3 py-2 text-sm text-green-700">Saved.</p>}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor={`${slug}-titleEn`}>Title (English)</Label>
          <Input id={`${slug}-titleEn`} name="titleEn" defaultValue={titleEn} />
        </div>
        <div>
          <Label htmlFor={`${slug}-titleAr`}>Title (Arabic)</Label>
          <Input id={`${slug}-titleAr`} name="titleAr" dir="rtl" defaultValue={titleAr} />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor={`${slug}-contentEn`}>Content (English)</Label>
          <Textarea id={`${slug}-contentEn`} name="contentEn" rows={10} defaultValue={contentEn} />
        </div>
        <div>
          <Label htmlFor={`${slug}-contentAr`}>Content (Arabic)</Label>
          <Textarea id={`${slug}-contentAr`} name="contentAr" dir="rtl" rows={10} defaultValue={contentAr} />
        </div>
      </div>
      <Button type="submit" disabled={pending}>{pending ? "Saving..." : "Save"}</Button>
    </form>
  );
}
