import { articles } from "@/data/articles";
import { SectionHeading } from "@/components/shared/section-heading";
import { ArticleCard } from "@/components/shared/article-card";
import { CtaButton } from "@/components/shared/cta-button";
import { Reveal } from "@/components/shared/reveal";

export function EducationalContent() {
  const featured = articles.slice(0, 3);

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <Reveal>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Hearing Health"
            title="Learn about hearing, at your own pace"
            description="Practical guidance from our audiologists on hearing loss, technology, and staying connected."
          />
          <CtaButton href="/hearing-health" variant="outline" className="shrink-0">
            Visit Hearing Health
          </CtaButton>
        </div>
      </Reveal>
      <Reveal delay={100} className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {featured.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </Reveal>
    </section>
  );
}
