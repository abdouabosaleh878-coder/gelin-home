"use client";

import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, X, ShoppingBag } from "lucide-react";
import { useI18n } from "@/i18n/provider";
import { useCartStore, lineKey, cartSubtotal } from "@/store/cart";
import { formatPrice } from "@/lib/format";
import { useMounted } from "@/hooks/use-mounted";
import { Button } from "@/components/ui/button";

export function CartDrawer() {
  const { t, locale } = useI18n();
  const isOpen = useCartStore((s) => s.isOpen);
  const close = useCartStore((s) => s.close);
  const items = useCartStore((s) => s.items);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const mounted = useMounted();

  const subtotal = mounted ? cartSubtotal(items) : 0;
  const visibleItems = mounted ? items : [];

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && close()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[60] bg-navy-950/50 data-[state=open]:animate-in data-[state=open]:fade-in" />
        <Dialog.Content className="fixed inset-y-0 end-0 z-[60] flex w-full max-w-md flex-col bg-slate-50 shadow-2xl focus:outline-none">
          <div className="flex items-center justify-between border-b border-navy-100 px-5 py-4">
            <Dialog.Title className="font-display text-xl text-navy-900">
              {t("cart.title")}
            </Dialog.Title>
            <Dialog.Close aria-label={t("common.close")} className="p-1 text-navy-900 hover:text-gold-700">
              <X className="h-5 w-5" />
            </Dialog.Close>
          </div>

          {visibleItems.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
              <ShoppingBag className="h-12 w-12 text-navy-200" />
              <p className="text-ink-500">{t("cart.empty")}</p>
              <Dialog.Close asChild>
                <Link href={`/${locale}/shop`}>
                  <Button variant="outline">{t("cart.continueShopping")}</Button>
                </Link>
              </Dialog.Close>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
                {visibleItems.map((item) => {
                  const key = lineKey(item);
                  return (
                    <div key={key} className="flex gap-3">
                      <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-md bg-slate-100">
                        <Image src={item.image} alt={item.name} fill sizes="80px" className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-navy-900 line-clamp-2">{item.name}</p>
                        {(item.size || item.color) && (
                          <p className="mt-0.5 text-xs text-ink-500">
                            {[item.size, item.color].filter(Boolean).join(" / ")}
                          </p>
                        )}
                        <p className="mt-1 text-sm font-semibold text-gold-700">
                          {formatPrice(item.price, locale)}
                        </p>
                        <div className="mt-2 flex items-center justify-between">
                          <div className="flex items-center rounded-full border border-navy-200">
                            <button
                              className="p-1.5 text-navy-900 disabled:opacity-30"
                              onClick={() => updateQuantity(key, item.quantity - 1)}
                              aria-label="Decrease quantity"
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <span className="w-6 text-center text-sm">{item.quantity}</span>
                            <button
                              className="p-1.5 text-navy-900 disabled:opacity-30"
                              onClick={() => updateQuantity(key, item.quantity + 1)}
                              disabled={item.quantity >= item.stock}
                              aria-label="Increase quantity"
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <button
                            className="text-xs font-medium text-ink-500 hover:text-sale-600"
                            onClick={() => removeItem(key)}
                          >
                            {t("cart.remove")}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="border-t border-navy-100 px-5 py-5 space-y-4">
                <div className="flex items-center justify-between text-base font-semibold text-navy-900">
                  <span>{t("cart.subtotal")}</span>
                  <span>{formatPrice(subtotal, locale)}</span>
                </div>
                <p className="text-xs text-ink-500">{t("cart.orderNote")}</p>
                <Dialog.Close asChild>
                  <Link href={`/${locale}/checkout`} className="block">
                    <Button className="w-full" size="lg">{t("cart.checkout")}</Button>
                  </Link>
                </Dialog.Close>
                <Dialog.Close asChild>
                  <Link href={`/${locale}/cart`} className="block text-center text-sm font-medium text-ink-700 hover:text-gold-700">
                    {t("cart.title")}
                  </Link>
                </Dialog.Close>
              </div>
            </>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
