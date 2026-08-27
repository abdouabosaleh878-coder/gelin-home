import { isLocale, type Locale } from "@/i18n/config";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { getHomepageContent } from "@/lib/settings";
import { localize } from "@/lib/localize";
import { toCardData } from "@/lib/products";
import { Hero } from "@/components/home/hero";
import { FeaturedCategories } from "@/components/home/featured-categories";
import { ProductSection } from "@/components/home/product-section";
import { BrandStory } from "@/components/home/brand-story";
import { NewCollectionBanner } from "@/components/home/new-collection-banner";
import { InstagramGallery } from "@/components/home/instagram-gallery";
import { Newsletter } from "@/components/home/newsletter";
import { TrustStrip } from "@/components/home/trust-strip";

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale as Locale;

  const [content, categories, featured, bestsellers, instagramPosts] = await Promise.all([
    getHomepageContent(),
    prisma.category.findMany({ where: { active: true }, orderBy: { sortOrder: "asc" }, take: 8 }),
    prisma.product.findMany({
      where: { active: true, featured: true },
      include: { images: true, category: true },
      orderBy: { createdAt: "desc" },
      take: 8,
    }),
    prisma.product.findMany({
      where: { active: true, bestseller: true },
      include: { images: true, category: true },
      orderBy: { createdAt: "desc" },
      take: 10,
    }),
    prisma.instagramPost.findMany({ orderBy: { sortOrder: "asc" }, take: 6 }),
  ]);

  return (
    <>
      <Hero
        locale={locale}
        image={content.heroImage}
        titleEn={content.heroTitleEn}
        titleAr={content.heroTitleAr}
        subtitleEn={content.heroSubtitleEn}
        subtitleAr={content.heroSubtitleAr}
        primaryEn={content.heroButtonPrimaryEn}
        primaryAr={content.heroButtonPrimaryAr}
        secondaryEn={content.heroButtonSecondaryEn}
        secondaryAr={content.heroButtonSecondaryAr}
      />
      <TrustStrip locale={locale} />
      <FeaturedCategories
        locale={locale}
        categories={categories.map((c) => ({
          name: localize(c.name, c.nameAr, locale),
          slug: c.slug,
          image: c.image,
        }))}
      />
      <ProductSection
        locale={locale}
        titleKey="home.featuredProducts"
        subtitleKey="home.featuredProductsSub"
        products={featured.map((p) => toCardData(p, locale))}
      />
      <BrandStory
        locale={locale}
        image={content.brandStoryImage}
        titleEn={content.brandStoryTitleEn}
        titleAr={content.brandStoryTitleAr}
        bodyEn={content.brandStoryBodyEn}
        bodyAr={content.brandStoryBodyAr}
      />
      <ProductSection
        locale={locale}
        titleKey="home.bestSellers"
        subtitleKey="home.bestSellersSub"
        products={bestsellers.map((p) => toCardData(p, locale))}
        scroll
      />
      <NewCollectionBanner
        locale={locale}
        image={content.newCollectionImage}
        titleEn={content.newCollectionTitleEn}
        titleAr={content.newCollectionTitleAr}
        subtitleEn={content.newCollectionSubtitleEn}
        subtitleAr={content.newCollectionSubtitleAr}
      />
      <InstagramGallery
        locale={locale}
        posts={instagramPosts.map((p) => ({ id: p.id, imageUrl: p.imageUrl, link: p.link }))}
      />
      <Newsletter
        titleEn={content.newsletterTitleEn}
        titleAr={content.newsletterTitleAr}
        subtitleEn={content.newsletterSubtitleEn}
        subtitleAr={content.newsletterSubtitleAr}
      />
    </>
  );
}
