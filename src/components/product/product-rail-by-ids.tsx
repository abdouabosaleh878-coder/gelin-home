"use client";

import { useEffect, useState } from "react";
import { useI18n } from "@/i18n/provider";
import { ProductCard, type ProductCardData } from "./product-card";

export function ProductRailByIds({ ids, emptyMessage }: { ids: string[]; emptyMessage?: string }) {
  const { locale } = useI18n();
  const [products, setProducts] = useState<ProductCardData[] | null>(null);
  const idsKey = ids.join(",");

  useEffect(() => {
    if (ids.length === 0) return;
    let cancelled = false;
    fetch(`/api/products?ids=${idsKey}&locale=${locale}`)
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) setProducts(data.products);
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idsKey, locale]);

  if (ids.length === 0) {
    return emptyMessage ? <p className="text-sm text-ink-500">{emptyMessage}</p> : null;
  }
  if (products === null) return null;

  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
