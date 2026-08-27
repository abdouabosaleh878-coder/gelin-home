import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { localize } from "@/lib/localize";
import { getDictionary } from "@/i18n/dictionaries";
import { translate } from "@/i18n/translate";
import { Button } from "@/components/ui/button";

export async function BrandStory({
  locale,
  image,
  titleEn,
  titleAr,
  bodyEn,
  bodyAr,
}: {
  locale: Locale;
  image: string;
  titleEn: string;
  titleAr: string;
  bodyEn: string;
  bodyAr: string;
}) {
  const dict = await getDictionary(locale);
  return (
    <section className="bg-navy-50">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-0 md:grid-cols-2">
        <div className="relative aspect-[4/3] md:aspect-auto md:h-[560px]">
          <Image
            src={image || "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1600&auto=format&fit=crop"}
            alt="Gelin Home atelier"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
        <div className="px-6 py-16 md:px-16 md:py-0">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-gold-700">
            {locale === "ar" ? "قصتنا" : "Our Story"}
          </p>
          <h2 className="font-display text-3xl text-navy-900 md:text-4xl">
            {localize(titleEn, titleAr, locale)}
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-ink-700">
            {localize(bodyEn, bodyAr, locale)}
          </p>
          <Link href={`/${locale}/about`} className="mt-8 inline-block">
            <Button variant="outline">{translate(dict, "home.brandStoryCta")}</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
