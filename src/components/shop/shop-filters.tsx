"use client";

import { useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { SlidersHorizontal, X } from "lucide-react";
import { useI18n } from "@/i18n/provider";
import { Button } from "@/components/ui/button";

type Category = { name: string; slug: string };

export function ShopFilters({
  categories,
  hideCategoryFilter = false,
  priceBounds,
}: {
  categories: Category[];
  hideCategoryFilter?: boolean;
  priceBounds: { min: number; max: number };
}) {
  const { t } = useI18n();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);

  function update(key: string, value: string | null) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
  }

  function clearAll() {
    router.push(pathname);
  }

  const activeCategory = searchParams.get("category") || "";
  const sale = searchParams.get("sale") === "1";
  const inStock = searchParams.get("inStock") === "1";
  const sort = searchParams.get("sort") || "newest";
  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";

  const filterBody = (
    <div className="space-y-7">
      {!hideCategoryFilter && (
        <div>
          <h3 className="text-sm font-semibold text-navy-900">{t("shop.category")}</h3>
          <div className="mt-3 space-y-2">
            <label className="flex items-center gap-2 text-sm text-ink-700">
              <input type="radio" name="category" checked={!activeCategory} onChange={() => update("category", null)} />
              {t("shop.allCategories")}
            </label>
            {categories.map((c) => (
              <label key={c.slug} className="flex items-center gap-2 text-sm text-ink-700">
                <input type="radio" name="category" checked={activeCategory === c.slug} onChange={() => update("category", c.slug)} />
                {c.name}
              </label>
            ))}
          </div>
        </div>
      )}

      <div>
        <h3 className="text-sm font-semibold text-navy-900">{t("shop.price")}</h3>
        <div className="mt-3 flex items-center gap-2">
          <input
            type="number"
            placeholder={String(Math.floor(priceBounds.min))}
            defaultValue={minPrice}
            onBlur={(e) => update("minPrice", e.target.value || null)}
            className="h-10 w-full rounded-md border border-navy-200 px-3 text-sm"
          />
          <span className="text-ink-400">–</span>
          <input
            type="number"
            placeholder={String(Math.ceil(priceBounds.max))}
            defaultValue={maxPrice}
            onBlur={(e) => update("maxPrice", e.target.value || null)}
            className="h-10 w-full rounded-md border border-navy-200 px-3 text-sm"
          />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-navy-900">{t("shop.availability")}</h3>
        <div className="mt-3 space-y-2">
          <label className="flex items-center gap-2 text-sm text-ink-700">
            <input type="checkbox" checked={inStock} onChange={(e) => update("inStock", e.target.checked ? "1" : null)} />
            {t("shop.inStockOnly")}
          </label>
          <label className="flex items-center gap-2 text-sm text-ink-700">
            <input type="checkbox" checked={sale} onChange={(e) => update("sale", e.target.checked ? "1" : null)} />
            {t("shop.onSaleOnly")}
          </label>
        </div>
      </div>

      <button onClick={clearAll} className="text-sm font-medium text-gold-700 hover:underline">
        {t("shop.clearFilters")}
      </button>
    </div>
  );

  return (
    <>
      <div className="hidden lg:block w-64 shrink-0">{filterBody}</div>

      <div className="lg:hidden flex items-center justify-between gap-3 mb-4">
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 rounded-md border border-navy-200 px-4 py-2.5 text-sm font-medium text-navy-900"
        >
          <SlidersHorizontal className="h-4 w-4" /> {t("shop.filters")}
        </button>
        <select
          value={sort}
          onChange={(e) => update("sort", e.target.value)}
          className="h-11 rounded-md border border-navy-200 bg-white px-3 text-sm"
        >
          <option value="newest">{t("shop.sortNewest")}</option>
          <option value="bestselling">{t("shop.sortBestSelling")}</option>
          <option value="price-asc">{t("shop.sortPriceLow")}</option>
          <option value="price-desc">{t("shop.sortPriceHigh")}</option>
        </select>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-navy-950/50" onClick={() => setOpen(false)} />
          <div className="absolute inset-y-0 start-0 w-4/5 max-w-xs overflow-y-auto bg-white p-6">
            <div className="mb-6 flex items-center justify-between">
              <span className="font-display text-lg text-navy-900">{t("shop.filters")}</span>
              <button onClick={() => setOpen(false)}><X className="h-5 w-5" /></button>
            </div>
            {filterBody}
            <Button className="w-full mt-6" onClick={() => setOpen(false)}>{t("shop.applyFilters")}</Button>
          </div>
        </div>
      )}
    </>
  );
}

export function ShopSortDesktop() {
  const { t } = useI18n();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const sort = searchParams.get("sort") || "newest";

  function update(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", value);
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <select
      value={sort}
      onChange={(e) => update(e.target.value)}
      className="hidden lg:block h-11 rounded-md border border-navy-200 bg-white px-3 text-sm"
    >
      <option value="newest">{t("shop.sortNewest")}</option>
      <option value="bestselling">{t("shop.sortBestSelling")}</option>
      <option value="price-asc">{t("shop.sortPriceLow")}</option>
      <option value="price-desc">{t("shop.sortPriceHigh")}</option>
    </select>
  );
}
