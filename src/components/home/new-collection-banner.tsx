import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { localize } from "@/lib/localize";
import { getDictionary } from "@/i18n/dictionaries";
import { translate } from "@/i18n/translate";
import { Button } from "@/components/ui/button";

export async function NewCollectionBanner({
  locale,
  image,
  titleEn,
  titleAr,
  subtitleEn,
  subtitleAr,
}: {
  locale: Locale;
  image: string;
  titleEn: string;
  titleAr: string;
  subtitleEn: string;
  subtitleAr: string;
}) {
  const dict = await getDictionary(locale);
  return (
    <section className="relative mx-auto my-16 max-w-7xl overflow-hidden rounded-2xl px-4 md:my-24 md:px-6">
      <div className="relative h-[460px] w-full overflow-hidden rounded-2xl md:h-[520px]">
        <Image
          src={image || "https://images.unsplash.com/photo-1616627561950-9f746e330187?q=80&w=2000&auto=format&fit=crop"}
          alt={localize(titleEn, titleAr, locale)}
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-navy-950/35" />
        <div className="relative flex h-full flex-col items-center justify-center px-6 text-center text-white">
          <h2 className="font-display text-3xl md:text-5xl">{localize(titleEn, titleAr, locale)}</h2>
          <p className="mt-4 max-w-md text-slate-100/90">{localize(subtitleEn, subtitleAr, locale)}</p>
          <Link href={`/${locale}/shop?sort=newest`} className="mt-8">
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-navy-900">
              {translate(dict, "home.newCollectionCta")}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
