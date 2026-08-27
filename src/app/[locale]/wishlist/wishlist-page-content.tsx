"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { useI18n } from "@/i18n/provider";
import { useWishlistStore } from "@/store/wishlist";
import { useMounted } from "@/hooks/use-mounted";
import { ProductRailByIds } from "@/components/product/product-rail-by-ids";
import { Button } from "@/components/ui/button";

export function WishlistPageContent() {
  const { t, locale } = useI18n();
  const mounted = useMounted();
  const ids = useWishlistStore((s) => s.ids);

  return (
    <div>
      <h1 className="font-display text-3xl text-navy-900 mb-8">{t("nav.wishlist")}</h1>
      {mounted && ids.length === 0 ? (
        <div className="flex flex-col items-center gap-4 py-16 text-center">
          <Heart className="h-12 w-12 text-navy-200" />
          <p className="text-ink-500">{t("cart.empty")}</p>
          <Link href={`/${locale}/shop`}>
            <Button>{t("cart.continueShopping")}</Button>
          </Link>
        </div>
      ) : (
        mounted && <ProductRailByIds ids={ids} />
      )}
    </div>
  );
}
