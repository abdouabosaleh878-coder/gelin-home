"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import en from "@/i18n/en.json";
import ar from "@/i18n/ar.json";

export default function LocaleNotFound() {
  const pathname = usePathname();
  const isArabic = pathname?.startsWith("/ar");
  const dict = isArabic ? ar : en;
  const locale = isArabic ? "ar" : "en";

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-4 text-center">
      <p className="font-display text-6xl text-gold-500">404</p>
      <h1 className="mt-4 font-display text-2xl text-navy-900">{dict.notFound.title}</h1>
      <p className="mt-2 text-ink-500">{dict.notFound.body}</p>
      <Link
        href={`/${locale}`}
        className="mt-8 inline-flex h-12 items-center justify-center rounded-full bg-gold-600 px-6 text-base font-semibold text-white hover:bg-gold-700"
      >
        {dict.notFound.cta}
      </Link>
    </div>
  );
}
