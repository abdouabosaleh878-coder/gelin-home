"use client";

import { useRecentlyViewedStore } from "@/store/recently-viewed";
import { useMounted } from "@/hooks/use-mounted";
import { useI18n } from "@/i18n/provider";
import { ProductRailByIds } from "./product-rail-by-ids";

export function RecentlyViewedSection({ excludeId }: { excludeId: string }) {
  const { t } = useI18n();
  const mounted = useMounted();
  const ids = useRecentlyViewedStore((s) => s.ids).filter((id) => id !== excludeId);

  if (!mounted || ids.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:px-6">
      <h2 className="font-display text-2xl text-navy-900 mb-6">{t("product.recentlyViewed")}</h2>
      <ProductRailByIds ids={ids} />
    </section>
  );
}
