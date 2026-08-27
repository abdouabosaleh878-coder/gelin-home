import type { MetadataRoute } from "next";
import { prisma } from "@/lib/db";
import { siteUrl } from "@/lib/seo";
import { locales } from "@/i18n/config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteUrl();
  const [products, categories] = await Promise.all([
    prisma.product.findMany({ where: { active: true }, select: { slug: true, updatedAt: true } }),
    prisma.category.findMany({ where: { active: true }, select: { slug: true, updatedAt: true } }),
  ]);

  const staticPaths = ["", "/shop", "/contact", "/about", "/wishlist", "/policies/shipping", "/policies/returns", "/policies/privacy", "/policies/terms"];

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const path of staticPaths) {
      entries.push({ url: `${base}/${locale}${path}`, changeFrequency: "weekly", priority: path === "" ? 1 : 0.6 });
    }
    for (const category of categories) {
      entries.push({
        url: `${base}/${locale}/category/${category.slug}`,
        lastModified: category.updatedAt,
        changeFrequency: "weekly",
        priority: 0.7,
      });
    }
    for (const product of products) {
      entries.push({
        url: `${base}/${locale}/products/${product.slug}`,
        lastModified: product.updatedAt,
        changeFrequency: "weekly",
        priority: 0.8,
      });
    }
  }

  return entries;
}
