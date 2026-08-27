"use client";

import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";
import { useI18n } from "@/i18n/provider";
import { useCartStore } from "@/store/cart";
import { formatPrice } from "@/lib/format";
import { Button } from "@/components/ui/button";
import type { ProductCardData } from "./product-card";

export function QuickViewDialog({
  product,
  open,
  onOpenChange,
}: {
  product: ProductCardData;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { t, locale } = useI18n();
  const addItem = useCartStore((s) => s.addItem);
  const hasSale = product.onSale && product.salePrice && product.salePrice < product.price;
  const effectivePrice = hasSale ? product.salePrice! : product.price;
  const outOfStock = product.stock <= 0;
  const href = `/${locale}/products/${product.slug}`;

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[70] bg-navy-950/50" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-[70] w-[92vw] max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white shadow-2xl focus:outline-none">
          <Dialog.Close className="absolute end-4 top-4 z-10 rounded-full bg-white/90 p-1.5 text-navy-900">
            <X className="h-5 w-5" />
          </Dialog.Close>
          <div className="grid grid-cols-1 sm:grid-cols-2">
            <div className="relative aspect-square sm:aspect-auto sm:h-full overflow-hidden rounded-t-lg sm:rounded-s-lg sm:rounded-tr-none bg-slate-100">
              <Image src={product.image} alt={product.name} fill sizes="400px" className="object-cover" />
            </div>
            <div className="p-6 flex flex-col">
              <Dialog.Title className="font-display text-2xl text-navy-900">{product.name}</Dialog.Title>
              <p className="mt-1 text-xs uppercase tracking-wide text-ink-400">{product.categoryName}</p>
              <div className="mt-3 flex items-center gap-2">
                <span className="text-lg font-semibold text-navy-900">{formatPrice(effectivePrice, locale)}</span>
                {hasSale && (
                  <span className="text-sm text-ink-400 line-through">{formatPrice(product.price, locale)}</span>
                )}
              </div>
              {product.shortDescription && (
                <p className="mt-4 text-sm text-ink-500 line-clamp-4">{product.shortDescription}</p>
              )}
              <div className="mt-auto pt-6 flex flex-col gap-3">
                <Button
                  disabled={outOfStock}
                  onClick={() =>
                    addItem({
                      productId: product.id,
                      slug: product.slug,
                      name: product.name,
                      image: product.image,
                      price: effectivePrice,
                      stock: product.stock,
                    })
                  }
                >
                  {outOfStock ? t("common.outOfStock") : t("common.addToCart")}
                </Button>
                <Link href={href} className="text-center text-sm font-medium text-ink-700 hover:text-gold-700">
                  {t("product.description")} &rarr;
                </Link>
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
