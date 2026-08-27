import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { prisma } from "@/lib/db";
import { localize } from "@/lib/localize";
import { ShopView } from "@/components/shop/shop-view";
import type { ShopSearchParams } from "@/lib/shop-query";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/category/[slug]">): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale = isLocale(rawLocale) ? (rawLocale as Locale) : "en";
  const category = await prisma.category.findUnique({ where: { slug } });
  if (!category) return {};
  const name = localize(category.name, category.nameAr, locale);
  return {
    title: name,
    description: localize(category.description || "", category.descriptionAr, locale) || undefined,
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: PageProps<"/[locale]/category/[slug]">) {
  const { locale: rawLocale, slug } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale as Locale;
  const sp = (await searchParams) as ShopSearchParams;

  const category = await prisma.category.findUnique({ where: { slug, active: true } });
  if (!category) notFound();

  return (
    <ShopView
      locale={locale}
      searchParams={sp}
      forcedCategorySlug={slug}
      title={localize(category.name, category.nameAr, locale)}
    />
  );
}
