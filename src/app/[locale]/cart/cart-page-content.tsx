"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import { useI18n } from "@/i18n/provider";
import { useCartStore, lineKey, cartSubtotal } from "@/store/cart";
import { useMounted } from "@/hooks/use-mounted";
import { formatPrice } from "@/lib/format";
import { Button } from "@/components/ui/button";

export function CartPageContent() {
  const { t, locale } = useI18n();
  const mounted = useMounted();
  const items = useCartStore((s) => s.items);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const visibleItems = mounted ? items : [];
  const subtotal = mounted ? cartSubtotal(items) : 0;

  if (mounted && items.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 py-20 text-center">
        <ShoppingBag className="h-14 w-14 text-navy-200" />
        <h1 className="font-display text-2xl text-navy-900">{t("cart.title")}</h1>
        <p className="text-ink-500">{t("cart.empty")}</p>
        <Link href={`/${locale}/shop`}>
          <Button>{t("cart.continueShopping")}</Button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="font-display text-3xl text-navy-900 mb-8">{t("cart.title")}</h1>
      <div className="grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {visibleItems.map((item) => {
            const key = lineKey(item);
            return (
              <div key={key} className="flex gap-4 border-b border-navy-100 pb-6">
                <div className="relative h-32 w-24 shrink-0 overflow-hidden rounded-md bg-slate-100">
                  <Image src={item.image} alt={item.name} fill sizes="96px" className="object-cover" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <Link href={`/${locale}/products/${item.slug}`} className="font-medium text-navy-900 hover:text-gold-700">
                        {item.name}
                      </Link>
                      {(item.size || item.color) && (
                        <p className="mt-0.5 text-sm text-ink-500">{[item.size, item.color].filter(Boolean).join(" / ")}</p>
                      )}
                    </div>
                    <p className="font-semibold text-navy-900">{formatPrice(item.price * item.quantity, locale)}</p>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center rounded-full border border-navy-200">
                      <button className="p-2 text-navy-900" onClick={() => updateQuantity(key, item.quantity - 1)}>
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-8 text-center text-sm">{item.quantity}</span>
                      <button className="p-2 text-navy-900" onClick={() => updateQuantity(key, item.quantity + 1)} disabled={item.quantity >= item.stock}>
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <button className="text-sm font-medium text-ink-500 hover:text-sale-600" onClick={() => removeItem(key)}>
                      {t("cart.remove")}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
          <Link href={`/${locale}/shop`} className="inline-block text-sm font-medium text-navy-900 hover:text-gold-700">
            &larr; {t("cart.continueShopping")}
          </Link>
        </div>

        <div className="rounded-xl border border-navy-100 bg-white p-6 h-fit">
          <h2 className="font-display text-lg text-navy-900">{t("checkout.orderSummary")}</h2>
          <div className="mt-4 flex items-center justify-between text-sm text-ink-700">
            <span>{t("cart.subtotal")}</span>
            <span>{formatPrice(subtotal, locale)}</span>
          </div>
          <p className="mt-2 text-xs text-ink-400">{t("cart.orderNote")}</p>
          <Link href={`/${locale}/checkout`} className="mt-6 block">
            <Button className="w-full" size="lg">{t("cart.checkout")}</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
