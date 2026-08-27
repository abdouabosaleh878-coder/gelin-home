import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { localize } from "@/lib/localize";
import { Button } from "@/components/ui/button";

export function Hero({
  locale,
  image,
  titleEn,
  titleAr,
  subtitleEn,
  subtitleAr,
  primaryEn,
  primaryAr,
  secondaryEn,
  secondaryAr,
}: {
  locale: Locale;
  image: string;
  titleEn: string;
  titleAr: string;
  subtitleEn: string;
  subtitleAr: string;
  primaryEn: string;
  primaryAr: string;
  secondaryEn: string;
  secondaryAr: string;
}) {
  const title = localize(titleEn, titleAr, locale);
  const subtitle = localize(subtitleEn, subtitleAr, locale);
  const primary = localize(primaryEn, primaryAr, locale);
  const secondary = localize(secondaryEn, secondaryAr, locale);

  return (
    <section className="relative flex min-h-[88vh] items-center overflow-hidden bg-navy-900">
      <Image
        src={image || "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=2400&auto=format&fit=crop"}
        alt={title}
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-70"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/20 to-navy-950/40" />
      <div className="relative mx-auto max-w-7xl px-6 py-24 md:px-10">
        <div className="reveal max-w-xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-gold-300">
            Hand Made Gelin Home
          </p>
          <h1 className="font-display text-4xl leading-[1.1] text-white sm:text-5xl md:text-6xl">
            {title}
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-slate-100/90 md:text-lg">
            {subtitle}
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Link href={`/${locale}/shop`}>
              <Button size="lg">{primary}</Button>
            </Link>
            <Link href={`/${locale}/about`}>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-navy-900">
                {secondary}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
