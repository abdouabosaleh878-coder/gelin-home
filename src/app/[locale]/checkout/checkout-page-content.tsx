"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useI18n } from "@/i18n/provider";
import { useCartStore, cartSubtotal } from "@/store/cart";
import { useMounted } from "@/hooks/use-mounted";
import { formatPrice } from "@/lib/format";
import { localize } from "@/lib/localize";
import { EGYPT_GOVERNORATES } from "@/lib/egypt-governorates";
import { createOrder } from "@/actions/orders";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export function CheckoutPageContent({
  deliveryFee,
  freeShippingThreshold,
}: {
  deliveryFee: number;
  freeShippingThreshold: number;
}) {
  const { t, locale } = useI18n();
  const mounted = useMounted();
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clear);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const subtotal = mounted ? cartSubtotal(items) : 0;
  const shipping = subtotal >= freeShippingThreshold ? 0 : deliveryFee;
  const total = subtotal + shipping;

  if (mounted && items.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="text-ink-500">{t("cart.empty")}</p>
        <Link href={`/${locale}/shop`} className="mt-4 inline-block">
          <Button>{t("cart.continueShopping")}</Button>
        </Link>
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const form = new FormData(e.currentTarget);

    const result = await createOrder({
      fullName: String(form.get("fullName") || ""),
      phone: String(form.get("phone") || ""),
      email: String(form.get("email") || ""),
      governorate: String(form.get("governorate") || ""),
      city: String(form.get("city") || ""),
      address: String(form.get("address") || ""),
      building: String(form.get("building") || ""),
      apartment: String(form.get("apartment") || ""),
      notes: String(form.get("notes") || ""),
      items: items.map((i) => ({
        productId: i.productId,
        quantity: i.quantity,
        size: i.size,
        color: i.color,
      })),
    });

    setSubmitting(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    clearCart();
    router.push(`/${locale}/checkout/success?order=${result.orderId}`);
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-10 lg:grid-cols-3">
      <div className="lg:col-span-2 space-y-8">
        <h1 className="font-display text-3xl text-navy-900">{t("checkout.title")}</h1>

        <section className="space-y-4">
          <h2 className="font-display text-lg text-navy-900">{t("checkout.contactInfo")}</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="fullName">{t("checkout.fullName")}</Label>
              <Input id="fullName" name="fullName" required />
            </div>
            <div>
              <Label htmlFor="phone">{t("checkout.phone")}</Label>
              <Input id="phone" name="phone" type="tel" required placeholder="01xxxxxxxxx" />
            </div>
          </div>
          <div>
            <Label htmlFor="email">{t("checkout.email")}</Label>
            <Input id="email" name="email" type="email" />
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="font-display text-lg text-navy-900">{t("checkout.shippingAddress")}</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="governorate">{t("checkout.governorate")}</Label>
              <select
                id="governorate"
                name="governorate"
                required
                className="flex h-12 w-full rounded-md border border-navy-200 bg-white px-4 text-base focus-visible:border-gold-500 focus-visible:outline-none"
              >
                <option value="">-</option>
                {EGYPT_GOVERNORATES.map((g) => (
                  <option key={g.en} value={g.en}>{localize(g.en, g.ar, locale)}</option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="city">{t("checkout.city")}</Label>
              <Input id="city" name="city" required />
            </div>
          </div>
          <div>
            <Label htmlFor="address">{t("checkout.address")}</Label>
            <Input id="address" name="address" required />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="building">{t("checkout.building")}</Label>
              <Input id="building" name="building" />
            </div>
            <div>
              <Label htmlFor="apartment">{t("checkout.apartment")}</Label>
              <Input id="apartment" name="apartment" />
            </div>
          </div>
          <div>
            <Label htmlFor="notes">{t("checkout.notes")}</Label>
            <Textarea id="notes" name="notes" rows={3} />
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-lg text-navy-900">{t("checkout.paymentMethod")}</h2>
          <div className="flex items-start gap-3 rounded-md border border-gold-300 bg-gold-50 p-4">
            <input type="radio" checked readOnly className="mt-1 h-4 w-4" />
            <div>
              <p className="font-medium text-navy-900">{t("checkout.cod")}</p>
              <p className="text-sm text-ink-500">{t("checkout.codDescription")}</p>
            </div>
          </div>
        </section>
      </div>

      <div className="rounded-xl border border-navy-100 bg-white p-6 h-fit space-y-4">
        <h2 className="font-display text-lg text-navy-900">{t("checkout.orderSummary")}</h2>
        <div className="max-h-64 space-y-3 overflow-y-auto">
          {items.map((item) => (
            <div key={`${item.productId}-${item.size}-${item.color}`} className="flex gap-3">
              <div className="relative h-16 w-14 shrink-0 overflow-hidden rounded bg-slate-100">
                <Image src={item.image} alt={item.name} fill sizes="56px" className="object-cover" />
              </div>
              <div className="flex-1 text-sm">
                <p className="line-clamp-1 text-navy-900">{item.name}</p>
                <p className="text-ink-500">Qty {item.quantity}</p>
              </div>
              <p className="text-sm font-medium text-navy-900">{formatPrice(item.price * item.quantity, locale)}</p>
            </div>
          ))}
        </div>
        <div className="space-y-2 border-t border-navy-100 pt-4 text-sm">
          <div className="flex justify-between text-ink-700">
            <span>{t("cart.subtotal")}</span>
            <span>{formatPrice(subtotal, locale)}</span>
          </div>
          <div className="flex justify-between text-ink-700">
            <span>{t("cart.deliveryFee")}</span>
            <span>{shipping === 0 ? t("cart.freeDelivery") : formatPrice(shipping, locale)}</span>
          </div>
          <div className="flex justify-between text-base font-semibold text-navy-900 pt-2 border-t border-navy-100">
            <span>{t("cart.total")}</span>
            <span>{formatPrice(total, locale)}</span>
          </div>
        </div>
        {error && <p className="rounded-md bg-sale-50 px-3 py-2 text-sm text-sale-600">{error}</p>}
        <Button type="submit" className="w-full" size="lg" disabled={submitting}>
          {submitting ? t("checkout.placingOrder") : t("checkout.placeOrder")}
        </Button>
      </div>
    </form>
  );
}
