import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { translate } from "@/i18n/translate";
import { ProductCard, type ProductCardData } from "@/components/product/product-card";

export async function ProductSection({
  locale,
  titleKey,
  subtitleKey,
  products,
  scroll = false,
}: {
  locale: Locale;
  titleKey: string;
  subtitleKey: string;
  products: ProductCardData[];
  scroll?: boolean;
}) {
  if (products.length === 0) return null;
  const dict = await getDictionary(locale);

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20">
      <div className="mb-10 flex items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-3xl text-navy-900 md:text-4xl">
            {translate(dict, titleKey)}
          </h2>
          <p className="mt-2 text-ink-500">{translate(dict, subtitleKey)}</p>
        </div>
        <Link
          href={`/${locale}/shop`}
          className="hidden shrink-0 text-sm font-semibold tracking-wide text-navy-900 hover:text-gold-700 sm:block"
        >
          {translate(dict, "common.viewAll")} &rarr;
        </Link>
      </div>

      {scroll ? (
        <div className="scroll-rail -mx-4 flex gap-4 overflow-x-auto px-4 sm:gap-5">
          {products.map((product) => (
            <div key={product.id} className="w-[62vw] shrink-0 sm:w-[38vw] md:w-[26vw] lg:w-[22vw]">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      <Link
        href={`/${locale}/shop`}
        className="mt-8 block text-center text-sm font-semibold tracking-wide text-navy-900 hover:text-gold-700 sm:hidden"
      >
        {translate(dict, "common.viewAll")} &rarr;
      </Link>
    </section>
  );
}
