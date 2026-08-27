"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Heart, Minus, Plus } from "lucide-react";
import { useI18n } from "@/i18n/provider";
import { useCartStore } from "@/store/cart";
import { useWishlistStore } from "@/store/wishlist";
import { useMounted } from "@/hooks/use-mounted";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type ParsedColor = { name: string; hex: string };

export function ProductPurchasePanel({
  productId,
  slug,
  name,
  price,
  salePrice,
  stock,
  sku,
  sizeList,
  colorList,
  image,
  whatsapp,
}: {
  productId: string;
  slug: string;
  name: string;
  price: number;
  salePrice: number | null;
  stock: number;
  sku: string;
  sizeList: string[];
  colorList: ParsedColor[];
  image: string;
  whatsapp: string;
}) {
  const { t, locale } = useI18n();
  const router = useRouter();
  const mounted = useMounted();
  const addItem = useCartStore((s) => s.addItem);
  const toggleWishlist = useWishlistStore((s) => s.toggle);
  const isWished = useWishlistStore((s) => s.has(productId));

  const [size, setSize] = useState(sizeList[0] || "");
  const [color, setColor] = useState(colorList[0]?.name || "");
  const [qty, setQty] = useState(1);

  const hasSale = salePrice != null && salePrice < price;
  const effectivePrice = hasSale ? salePrice! : price;
  const outOfStock = stock <= 0;

  function buildCartItem() {
    return {
      productId,
      slug,
      name,
      image,
      price: effectivePrice,
      size: size || undefined,
      color: color || undefined,
      stock,
    };
  }

  function handleAddToCart() {
    addItem(buildCartItem(), qty);
  }

  function handleBuyNow() {
    addItem(buildCartItem(), qty);
    router.push(`/${locale}/checkout`);
  }

  const whatsappDigits = whatsapp.replace(/[^\d]/g, "");
  const whatsappHref = `https://wa.me/${whatsappDigits}?text=${encodeURIComponent(
    t("product.shareOnWhatsApp", { product: name, url: typeof window !== "undefined" ? window.location.href : "" })
  )}`;

  return (
    <div>
      <div className="flex items-center gap-2">
        {hasSale && <Badge variant="sale">{t("common.sale")}</Badge>}
      </div>
      <h1 className="mt-2 font-display text-3xl text-navy-900">{name}</h1>
      <div className="mt-3 flex items-center gap-3">
        <span className="text-2xl font-semibold text-navy-900">{formatPrice(effectivePrice, locale)}</span>
        {hasSale && <span className="text-base text-ink-400 line-through">{formatPrice(price, locale)}</span>}
      </div>

      <p className="mt-2 text-sm text-ink-500">
        {t("product.sku")}: {sku} &middot;{" "}
        <span className={outOfStock ? "text-sale-600" : "text-green-700"}>
          {outOfStock ? t("common.outOfStock") : stock <= 5 ? t("common.lowStock", { count: stock }) : t("common.inStock")}
        </span>
      </p>

      {colorList.length > 0 && (
        <div className="mt-6">
          <p className="text-sm font-semibold text-navy-900">{t("product.color")}{color ? `: ${color}` : ""}</p>
          <div className="mt-2 flex gap-2">
            {colorList.map((c) => (
              <button
                key={c.name}
                onClick={() => setColor(c.name)}
                title={c.name}
                className={cn(
                  "h-8 w-8 rounded-full border-2",
                  color === c.name ? "border-navy-900" : "border-transparent"
                )}
                style={{ backgroundColor: c.hex }}
              />
            ))}
          </div>
        </div>
      )}

      {sizeList.length > 0 && (
        <div className="mt-6">
          <p className="text-sm font-semibold text-navy-900">{t("product.size")}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {sizeList.map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={cn(
                  "rounded-md border px-4 py-2 text-sm",
                  size === s ? "border-navy-900 bg-navy-900 text-white" : "border-navy-200 text-navy-900"
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="mt-6">
        <p className="text-sm font-semibold text-navy-900">{t("product.quantity")}</p>
        <div className="mt-2 inline-flex items-center rounded-full border border-navy-200">
          <button className="p-2.5 text-navy-900" onClick={() => setQty((q) => Math.max(1, q - 1))}>
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-10 text-center text-sm">{qty}</span>
          <button className="p-2.5 text-navy-900" onClick={() => setQty((q) => Math.min(stock || 99, q + 1))}>
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button size="lg" className="flex-1" disabled={outOfStock} onClick={handleAddToCart}>
          {outOfStock ? t("common.outOfStock") : t("common.addToCart")}
        </Button>
        <Button size="lg" variant="secondary" className="flex-1" disabled={outOfStock} onClick={handleBuyNow}>
          {t("common.buyNow")}
        </Button>
        <button
          onClick={() => toggleWishlist(productId)}
          aria-label={t("product.addToWishlist")}
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-md border border-navy-200"
        >
          <Heart className={cn("h-5 w-5", mounted && isWished && "fill-sale-600 text-sale-600")} />
        </button>
      </div>

      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-green-700 hover:underline"
      >
        {t("product.askWhatsApp")}
      </a>
    </div>
  );
}
