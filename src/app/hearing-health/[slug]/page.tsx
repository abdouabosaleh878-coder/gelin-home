import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CalendarDays, Clock, User } from "lucide-react";
import { articles, getArticleBySlug, getRelatedArticles } from "@/data/articles";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { ArticleCard } from "@/components/shared/article-card";
import { SectionHeading } from "@/components/shared/section-heading";
import { CtaButton } from "@/components/shared/cta-button";
import { buildBreadcrumbJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `/hearing-health/${article.slug}` },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [{ url: article.image }],
      type: "article",
      publishedTime: article.publishedAt,
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const related = getRelatedArticles(slug);
  const breadcrumbItems = [
    { name: "Home", path: "/" },
    { name: "Hearing Health", path: "/hearing-health" },
    { name: article.title, path: `/hearing-health/${article.slug}` },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildBreadcrumbJsonLd(breadcrumbItems)) }}
      />
      <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "Hearing Health", href: "/hearing-health" },
            { name: article.title },
          ]}
        />

        <Badge variant="teal" className="mt-6">
          {article.category}
        </Badge>
        <h1 className="mt-4 text-3xl font-semibold text-navy-900 sm:text-4xl text-balance">
          {article.title}
        </h1>

        <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-ink-500">
          <span className="flex items-center gap-1.5">
            <User className="h-4 w-4" aria-hidden="true" />
            {article.author}
          </span>
          <span className="flex items-center gap-1.5">
            <CalendarDays className="h-4 w-4" aria-hidden="true" />
            <time dateTime={article.publishedAt}>
              {new Date(article.publishedAt).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" aria-hidden="true" />
            {article.readingTime}
          </span>
        </div>

        <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-2xl bg-navy-50">
          <Image
            src={article.image}
            alt=""
            fill
            priority
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
          />
        </div>

        <div className="prose-content mt-8 space-y-5 text-lg leading-relaxed text-ink-700">
          {article.content.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        <div className="mt-10 rounded-2xl bg-teal-50 p-6 text-center">
          <p className="text-lg font-medium text-teal-900">
            Have questions about your own hearing health?
          </p>
          <CtaButton href="/book-appointment" icon="calendar" size="lg" className="mt-4">
            Book a Free Hearing Assessment
          </CtaButton>
        </div>
      </article>

      <section className="border-t border-navy-100 bg-sand-100 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading title="More from Hearing Health" />
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {related.map((item) => (
              <ArticleCard key={item.slug} article={item} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
