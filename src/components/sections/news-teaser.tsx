import { newsArticles } from "@/data/news";
import { SectionHeading } from "@/components/shared/section-heading";
import { NewsCard } from "@/components/shared/news-card";
import { CtaButton } from "@/components/shared/cta-button";
import { Reveal } from "@/components/shared/reveal";

export function NewsTeaser() {
  const featured = newsArticles.slice(0, 3);

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <Reveal>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="News"
            title="Latest from Current Swim Academy"
            description="Academy announcements, team results, and swim tips from our coaching staff."
          />
          <CtaButton href="/news" variant="outline" className="shrink-0">
            Visit Newsroom
          </CtaButton>
        </div>
      </Reveal>
      <Reveal delay={100} className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {featured.map((article) => (
          <NewsCard key={article.slug} article={article} />
        ))}
      </Reveal>
    </section>
  );
}
