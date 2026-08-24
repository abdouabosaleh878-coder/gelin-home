import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { SectionHeading } from "@/components/shared/section-heading";
import { NewsExplorer } from "@/components/news/news-explorer";

export const metadata: Metadata = {
  title: "News",
  description: "Academy announcements, team results, and swim tips from Current Swim Academy.",
  alternates: { canonical: "/news" },
};

export default function NewsPage() {
  return (
    <>
      <section className="border-b border-aqua-100 bg-aqua-50">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "News" }]} />
          <div className="mt-6 max-w-2xl">
            <SectionHeading
              as="h1"
              eyebrow="News"
              title="Newsroom"
              description="Academy announcements, team results, swim tips, and community updates from across Current Swim Academy."
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <NewsExplorer />
      </section>
    </>
  );
}
