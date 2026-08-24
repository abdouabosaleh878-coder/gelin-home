import type { MetadataRoute } from "next";
import { programs } from "@/data/programs";
import { newsArticles } from "@/data/news";
import { siteConfig } from "@/lib/seo";

const staticRoutes = [
  "",
  "/about",
  "/programs",
  "/schedule",
  "/coaches",
  "/news",
  "/careers",
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.8,
  }));

  const programEntries: MetadataRoute.Sitemap = programs.map((program) => ({
    url: `${siteConfig.url}/programs/${program.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const newsEntries: MetadataRoute.Sitemap = newsArticles.map((article) => ({
    url: `${siteConfig.url}/news/${article.slug}`,
    lastModified: article.publishedAt,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...staticEntries, ...programEntries, ...newsEntries];
}
