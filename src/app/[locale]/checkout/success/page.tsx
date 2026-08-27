import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { prisma } from "@/lib/db";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { translate } from "@/i18n/translate";
import { formatOrderNumber, formatPrice } from "@/lib/format";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "Order Confirmed" };

export default async function CheckoutSuccessPage({
  params,
  searchParams,
}: PageProps<"/[locale]/checkout/success">) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale as Locale;
  const search = await searchParams;
  const orderId = Number(search.order);

  const dict = await getDictionary(locale);
  const order = Number.isFinite(orderId) ? await prisma.order.findUnique({ where: { id: orderId } }) : null;

  if (!order) {
    return (
      <div className="mx-auto max-w-lg px-4 py-24 text-center">
        <p className="text-ink-500">{translate(dict, "notFound.body")}</p>
        <Link href={`/${locale}/shop`} className="mt-4 inline-block">
          <Button>{translate(dict, "checkout.backToShop")}</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-20 text-center md:py-28">
      <CheckCircle2 className="mx-auto h-14 w-14 text-green-600" />
      <h1 className="mt-6 font-display text-3xl text-navy-900">{translate(dict, "checkout.orderSuccessTitle")}</h1>
      <p className="mt-3 text-ink-500">{translate(dict, "checkout.orderSuccessBody")}</p>
      <div className="mt-8 inline-flex flex-col gap-1 rounded-xl border border-navy-100 bg-white px-8 py-5">
        <span className="text-xs uppercase tracking-wide text-ink-400">{translate(dict, "checkout.orderNumber")}</span>
        <span className="font-display text-xl text-navy-900">{formatOrderNumber(order.id)}</span>
        <span className="text-sm text-ink-500">{formatPrice(order.total, locale)}</span>
      </div>
      <div className="mt-10">
        <Link href={`/${locale}/shop`}>
          <Button size="lg">{translate(dict, "checkout.backToShop")}</Button>
        </Link>
      </div>
    </div>
  );
}
