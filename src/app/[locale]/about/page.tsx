import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { getHomepageContent, getSiteSettings } from "@/lib/settings";
import { localize } from "@/lib/localize";
import { TrustStrip } from "@/components/home/trust-strip";

export const metadata: Metadata = { title: "Our Story" };

export default async function AboutPage({ params }: PageProps<"/[locale]/about">) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale as Locale;

  const [content, settings] = await Promise.all([getHomepageContent(), getSiteSettings()]);

  return (
    <div>
      <section className="relative h-[50vh] min-h-[360px] w-full overflow-hidden">
        <Image
          src={content.brandStoryImage || "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1800&auto=format&fit=crop"}
          alt="Gelin Home"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-navy-950/45 flex items-center justify-center">
          <h1 className="font-display text-4xl text-white md:text-5xl">
            {localize(content.brandStoryTitleEn, content.brandStoryTitleAr, locale)}
          </h1>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 py-16 md:px-6">
        <p className="text-lg leading-relaxed text-ink-700 whitespace-pre-line">
          {localize(content.brandStoryBodyEn, content.brandStoryBodyAr, locale)}
        </p>
        <p className="mt-6 text-lg leading-relaxed text-ink-700">
          {locale === "ar"
            ? `يقع متجرنا في مدينة نصر، القاهرة، حيث نقدم مجموعة مختارة بعناية من المنسوجات والإكسسوارات المنزلية المصنوعة يدويًا.`
            : `Our studio is based in Nasr City, Cairo, where every collection is curated with an eye for craftsmanship, comfort and timeless design.`}
        </p>
      </div>

      <TrustStrip locale={locale} />

      <div className="mx-auto max-w-3xl px-4 py-16 text-center md:px-6">
        <p className="text-ink-500">{localize(settings.addressEn, settings.addressAr, locale)}</p>
      </div>
    </div>
  );
}
