import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { ShopView } from "@/components/shop/shop-view";
import type { ShopSearchParams } from "@/lib/shop-query";

export const metadata: Metadata = { title: "Shop All" };

export default async function ShopPage({
  params,
  searchParams,
}: PageProps<"/[locale]/shop">) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale as Locale;
  const sp = (await searchParams) as ShopSearchParams;

  return <ShopView locale={locale} searchParams={sp} />;
}
