"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Eye } from "lucide-react";
import { useI18n } from "@/i18n/provider";
import { useCartStore } from "@/store/cart";
import { useWishlistStore } from "@/store/wishlist";
import { useMounted } from "@/hooks/use-mounted";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { QuickViewDialog } from "./quick-view-dialog";

export type ProductCardData = {
  id: string;
  slug: string;
  name: string;
  categoryName: string;
  price: number;
  salePrice: number | null;
  stock: number;
  image: string;
  images: string[];
  featured: boolean;
  bestseller: boolean;
  newArrival: boolean;
  onSale: boolean;
  shortDescription?: string | null;
};

export function ProductCard({ product }: { product: ProductCardData }) {
  const { t, locale } = useI18n();
  const mounted = useMounted();
  const addItem = useCartStore((s) => s.addItem);
  const toggleWishlist = useWishlistStore((s) => s.toggle);
  const isWished = useWishlistStore((s) => s.has(product.id));
  const [quickViewOpen, setQuickViewOpen] = useState(false);

  const hasSale = product.onSale && product.salePrice && product.salePrice < product.price;
  const effectivePrice = hasSale ? product.salePrice! : product.price;
  const outOfStock = product.stock <= 0;
  const href = `/${locale}/products/${product.slug}`;

  function quickAdd(e: React.MouseEvent) {
    e.preventDefault();
    if (outOfStock) return;
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      image: product.image,
      price: effectivePrice,
      stock: product.stock,
    });
  }

  return (
    <div className="group relative flex flex-col">
      <div className="relative">
        <Link href={href} className="img-zoom relative block aspect-[4/5] w-full overflow-hidden rounded-lg bg-slate-100">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            className="object-cover"
          />
          {outOfStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-navy-950/40">
              <span className="rounded-full bg-white/90 px-4 py-1.5 text-xs font-semibold tracking-wide text-navy-900">
                {t("common.outOfStock")}
              </span>
            </div>
          )}
        </Link>

        <div className="absolute top-3 start-3 flex flex-col gap-1.5">
          {hasSale && <Badge variant="sale" className="px-2.5 py-0.5 text-[11px]">{t("common.sale")}</Badge>}
          {product.newArrival && <Badge variant="navy" className="px-2.5 py-0.5 text-[11px]">{t("common.new")}</Badge>}
          {product.bestseller && !product.newArrival && <Badge variant="gold" className="px-2.5 py-0.5 text-[11px]">{t("common.bestseller")}</Badge>}
        </div>

        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product.id);
          }}
          aria-label={t("product.addToWishlist")}
          className="absolute top-3 end-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-navy-900 shadow-sm transition-colors hover:bg-white"
        >
          <Heart className={cn("h-4 w-4", mounted && isWished && "fill-sale-600 text-sale-600")} />
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            setQuickViewOpen(true);
          }}
          className="absolute inset-x-3 bottom-3 hidden items-center justify-center gap-2 rounded-md bg-white/95 py-2.5 text-xs font-semibold tracking-wide text-navy-900 opacity-0 shadow transition-opacity duration-300 group-hover:opacity-100 md:flex"
        >
          <Eye className="h-4 w-4" /> {t("common.quickView")}
        </button>
      </div>

      <Link href={href} className="mt-3 block">
        <p className="text-xs uppercase tracking-wide text-ink-400">{product.categoryName}</p>
        <h3 className="mt-1 text-sm font-medium text-navy-900 line-clamp-2">{product.name}</h3>
      </Link>

      <div className="mt-1.5 flex items-center gap-2">
        <span className="text-sm font-semibold text-navy-900">{formatPrice(effectivePrice, locale)}</span>
        {hasSale && (
          <span className="text-xs text-ink-400 line-through">{formatPrice(product.price, locale)}</span>
        )}
      </div>

      <button
        onClick={quickAdd}
        disabled={outOfStock}
        className="mt-2.5 w-full rounded-md border border-navy-900 py-2 text-xs font-semibold uppercase tracking-wide text-navy-900 transition-colors hover:bg-navy-900 hover:text-white disabled:cursor-not-allowed disabled:border-navy-200 disabled:text-navy-300 disabled:hover:bg-transparent"
      >
        {outOfStock ? t("common.outOfStock") : t("common.addToCart")}
      </button>

      <QuickViewDialog product={product} open={quickViewOpen} onOpenChange={setQuickViewOpen} />
    </div>
  );
}
