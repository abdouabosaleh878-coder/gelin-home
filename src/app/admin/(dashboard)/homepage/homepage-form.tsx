"use client";

import { useActionState } from "react";
import Image from "next/image";
import { updateHomepage } from "@/actions/homepage";
import { BilingualField } from "../_shared/bilingual-field";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import type { HomepageContent } from "@prisma/client";

function ImageField({ name, label, current }: { name: string; label: string; current: string }) {
  return (
    <div>
      {current && (
        <div className="relative mb-3 h-32 w-full max-w-xs overflow-hidden rounded-md bg-slate-100">
          <Image src={current} alt="" fill sizes="320px" className="object-cover" />
        </div>
      )}
      <Label htmlFor={name}>{label}</Label>
      <input
        id={name}
        name={name}
        type="file"
        accept="image/*"
        className="block w-full text-sm text-ink-700 file:mr-4 file:rounded-md file:border-0 file:bg-navy-900 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-navy-800"
      />
    </div>
  );
}

export function HomepageForm({ content }: { content: HomepageContent }) {
  const [state, formAction, pending] = useActionState(updateHomepage, {});

  return (
    <form action={formAction} className="space-y-8" encType="multipart/form-data">
      {state.success && <p className="rounded-md bg-green-50 px-4 py-3 text-sm text-green-700">Homepage updated.</p>}

      <section className="rounded-xl border border-navy-100 bg-white p-6 space-y-5">
        <h2 className="font-display text-lg text-navy-900">Hero Section</h2>
        <ImageField name="heroImage" label="Hero Image" current={content.heroImage} />
        <BilingualField label="Title" nameEn="heroTitleEn" nameAr="heroTitleAr" defaultEn={content.heroTitleEn} defaultAr={content.heroTitleAr} />
        <BilingualField label="Subtitle" nameEn="heroSubtitleEn" nameAr="heroSubtitleAr" defaultEn={content.heroSubtitleEn} defaultAr={content.heroSubtitleAr} textarea />
        <BilingualField label="Primary Button" nameEn="heroButtonPrimaryEn" nameAr="heroButtonPrimaryAr" defaultEn={content.heroButtonPrimaryEn} defaultAr={content.heroButtonPrimaryAr} />
        <BilingualField label="Secondary Button" nameEn="heroButtonSecondaryEn" nameAr="heroButtonSecondaryAr" defaultEn={content.heroButtonSecondaryEn} defaultAr={content.heroButtonSecondaryAr} />
      </section>

      <section className="rounded-xl border border-navy-100 bg-white p-6 space-y-5">
        <h2 className="font-display text-lg text-navy-900">Brand Story</h2>
        <ImageField name="brandStoryImage" label="Story Image" current={content.brandStoryImage} />
        <BilingualField label="Title" nameEn="brandStoryTitleEn" nameAr="brandStoryTitleAr" defaultEn={content.brandStoryTitleEn} defaultAr={content.brandStoryTitleAr} />
        <BilingualField label="Body" nameEn="brandStoryBodyEn" nameAr="brandStoryBodyAr" defaultEn={content.brandStoryBodyEn} defaultAr={content.brandStoryBodyAr} textarea />
      </section>

      <section className="rounded-xl border border-navy-100 bg-white p-6 space-y-5">
        <h2 className="font-display text-lg text-navy-900">New Collection Banner</h2>
        <ImageField name="newCollectionImage" label="Banner Image" current={content.newCollectionImage} />
        <BilingualField label="Title" nameEn="newCollectionTitleEn" nameAr="newCollectionTitleAr" defaultEn={content.newCollectionTitleEn} defaultAr={content.newCollectionTitleAr} />
        <BilingualField label="Subtitle" nameEn="newCollectionSubtitleEn" nameAr="newCollectionSubtitleAr" defaultEn={content.newCollectionSubtitleEn} defaultAr={content.newCollectionSubtitleAr} />
      </section>

      <section className="rounded-xl border border-navy-100 bg-white p-6 space-y-5">
        <h2 className="font-display text-lg text-navy-900">Newsletter</h2>
        <BilingualField label="Title" nameEn="newsletterTitleEn" nameAr="newsletterTitleAr" defaultEn={content.newsletterTitleEn} defaultAr={content.newsletterTitleAr} />
        <BilingualField label="Subtitle" nameEn="newsletterSubtitleEn" nameAr="newsletterSubtitleAr" defaultEn={content.newsletterSubtitleEn} defaultAr={content.newsletterSubtitleAr} textarea />
      </section>

      <Button type="submit" size="lg" disabled={pending}>{pending ? "Saving..." : "Save Homepage"}</Button>
    </form>
  );
}
