import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { translate } from "@/i18n/translate";
import { localize } from "@/lib/localize";
import { prisma } from "@/lib/db";
import { queryShopProducts, type ShopSearchParams } from "@/lib/shop-query";
import { toCardData } from "@/lib/products";
import { ProductCard } from "@/components/product/product-card";
import { ShopFilters, ShopSortDesktop } from "./shop-filters";
import { ShopSearchBox } from "./shop-search-box";

export async function ShopView({
  locale,
  searchParams,
  forcedCategorySlug,
  title,
}: {
  locale: Locale;
  searchParams: ShopSearchParams;
  forcedCategorySlug?: string;
  title?: string;
}) {
  const dict = await getDictionary(locale);
  const [{ products, total, page, totalPages, minPrice, maxPrice }, categories] = await Promise.all([
    queryShopProducts(searchParams, forcedCategorySlug),
    prisma.category.findMany({ where: { active: true }, orderBy: { sortOrder: "asc" } }),
  ]);

  const cardData = products.map((p) => toCardData(p, locale));

  function pageHref(p: number) {
    const params = new URLSearchParams();
    Object.entries(searchParams).forEach(([k, v]) => {
      if (v && k !== "page") params.set(k, v);
    });
    params.set("page", String(p));
    return `?${params.toString()}`;
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-6 md:py-14">
      <div className="mb-8">
        <h1 className="font-display text-3xl text-navy-900 md:text-4xl">{title || translate(dict, "shop.title")}</h1>
        <p className="mt-2 text-sm text-ink-500">
          {translate(dict, "shop.showingResults", { count: products.length, total })}
        </p>
      </div>

      <div className="mb-6">
        <ShopSearchBox />
      </div>

      <div className="flex flex-col gap-8 lg:flex-row">
        <ShopFilters
          categories={categories.map((c) => ({ name: localize(c.name, c.nameAr, locale), slug: c.slug }))}
          hideCategoryFilter={Boolean(forcedCategorySlug)}
          priceBounds={{ min: minPrice, max: maxPrice }}
        />

        <div className="flex-1">
          <div className="mb-6 hidden lg:flex justify-end">
            <ShopSortDesktop />
          </div>

          {cardData.length === 0 ? (
            <div className="py-20 text-center text-ink-500">{translate(dict, "shop.noResults")}</div>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3">
              {cardData.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <div className="mt-10 flex justify-center gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <Link
                  key={i}
                  href={pageHref(i + 1)}
                  className={`h-9 w-9 flex items-center justify-center rounded-md text-sm ${page === i + 1 ? "bg-navy-900 text-white" : "border border-navy-200 text-navy-700"}`}
                >
                  {i + 1}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
