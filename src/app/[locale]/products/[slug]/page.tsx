import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { translate } from "@/i18n/translate";
import { prisma } from "@/lib/db";
import { getSiteSettings } from "@/lib/settings";
import { parseProduct, toCardData } from "@/lib/products";
import { localize } from "@/lib/localize";
import { productJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { ProductGallery } from "@/components/product/product-gallery";
import { ProductPurchasePanel } from "@/components/product/product-purchase-panel";
import { ReviewsSection } from "@/components/product/reviews-section";
import { ProductCard } from "@/components/product/product-card";
import { TrackRecentlyViewed } from "@/components/product/track-recently-viewed";
import { RecentlyViewedSection } from "@/components/product/recently-viewed-section";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/products/[slug]">): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale = isLocale(rawLocale) ? (rawLocale as Locale) : "en";
  const product = await prisma.product.findUnique({ where: { slug }, include: { images: true, category: true } });
  if (!product) return {};
  const parsed = parseProduct(product);
  const name = localize(product.name, product.nameAr, locale);
  const description = localize(
    product.shortDescription || product.description,
    product.shortDescriptionAr || product.descriptionAr,
    locale
  );
  return {
    title: name,
    description,
    alternates: { canonical: `/${locale}/products/${slug}` },
    openGraph: { title: name, description, images: parsed.imageUrls.slice(0, 1) },
  };
}

export default async function ProductDetailPage({
  params,
}: PageProps<"/[locale]/products/[slug]">) {
  const { locale: rawLocale, slug } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale as Locale;

  const product = await prisma.product.findUnique({
    where: { slug },
    include: {
      images: { orderBy: { sortOrder: "asc" } },
      category: true,
      reviews: { where: { approved: true }, orderBy: { createdAt: "desc" } },
    },
  });
  if (!product || !product.active) notFound();

  const [dict, settings, related] = await Promise.all([
    getDictionary(locale),
    getSiteSettings(),
    prisma.product.findMany({
      where: { categoryId: product.categoryId, active: true, id: { not: product.id } },
      include: { images: true, category: true },
      take: 4,
    }),
  ]);

  const parsed = parseProduct(product);
  const name = localize(product.name, product.nameAr, locale);
  const description = localize(product.description, product.descriptionAr, locale);
  const categoryName = localize(product.category.name, product.category.nameAr, locale);

  const breadcrumbs = [
    { name: translate(dict, "breadcrumb.home"), url: `/${locale}` },
    { name: translate(dict, "breadcrumb.shop"), url: `/${locale}/shop` },
    { name, url: `/${locale}/products/${slug}` },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-6 md:py-14">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd(parsed, locale)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(breadcrumbs)) }} />
      <TrackRecentlyViewed productId={product.id} />

      <nav className="mb-6 flex flex-wrap items-center gap-1.5 text-xs text-ink-500">
        {breadcrumbs.map((b, i) => (
          <span key={b.url} className="flex items-center gap-1.5">
            {i > 0 && <span>/</span>}
            {i === breadcrumbs.length - 1 ? (
              <span className="text-navy-900">{b.name}</span>
            ) : (
              <Link href={b.url} className="hover:text-gold-700">{b.name}</Link>
            )}
          </span>
        ))}
      </nav>

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <ProductGallery images={parsed.imageUrls} name={name} />
        <ProductPurchasePanel
          productId={product.id}
          slug={product.slug}
          name={name}
          price={product.price}
          salePrice={product.onSale ? product.salePrice : null}
          stock={product.stock}
          sku={product.sku}
          sizeList={parsed.sizeList}
          colorList={parsed.colorList}
          image={parsed.primaryImage}
          whatsapp={settings.whatsapp}
        />
      </div>

      <div className="mt-16 grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
          <div>
            <h2 className="font-display text-2xl text-navy-900">{translate(dict, "product.description")}</h2>
            <p className="mt-3 whitespace-pre-line text-ink-700 leading-relaxed">{description}</p>
          </div>
          {(product.material || product.dimensions) && (
            <div>
              <h2 className="font-display text-2xl text-navy-900">{translate(dict, "product.specifications")}</h2>
              <dl className="mt-3 divide-y divide-navy-100 border-y border-navy-100">
                {product.material && (
                  <div className="flex justify-between py-3 text-sm">
                    <dt className="text-ink-500">{translate(dict, "product.material")}</dt>
                    <dd className="text-navy-900">{product.material}</dd>
                  </div>
                )}
                {product.dimensions && (
                  <div className="flex justify-between py-3 text-sm">
                    <dt className="text-ink-500">{translate(dict, "product.dimensions")}</dt>
                    <dd className="text-navy-900">{product.dimensions}</dd>
                  </div>
                )}
              </dl>
            </div>
          )}
        </div>
        <div className="rounded-xl bg-navy-50 p-6 h-fit">
          <p className="text-xs uppercase tracking-wide text-ink-400">{categoryName}</p>
          <p className="mt-2 text-sm text-ink-700">{translate(dict, "trust.qualityBody")}</p>
        </div>
      </div>

      <div className="mt-16 border-t border-navy-100 pt-12">
        <ReviewsSection
          productId={product.id}
          productSlug={product.slug}
          reviews={product.reviews.map((r) => ({ ...r, createdAt: r.createdAt.toISOString() }))}
        />
      </div>

      {related.length > 0 && (
        <section className="mt-16 border-t border-navy-100 pt-12">
          <h2 className="font-display text-2xl text-navy-900 mb-6">{translate(dict, "product.relatedProducts")}</h2>
          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={toCardData(p, locale)} />
            ))}
          </div>
        </section>
      )}

      <RecentlyViewedSection excludeId={product.id} />
    </div>
  );
}
