import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { SectionHeading } from "@/components/shared/section-heading";
import { ArticleExplorer } from "@/components/hearing-health/article-explorer";

export const metadata: Metadata = {
  title: "Hearing Health | Articles & Guidance",
  description:
    "Explore articles from Beltone's audiologists on hearing loss, hearing aid technology, tinnitus, and staying connected with the people you love.",
  alternates: { canonical: "/hearing-health" },
};

export default function HearingHealthPage() {
  return (
    <>
      <section className="border-b border-navy-100 bg-navy-50">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Hearing Health" }]} />
          <div className="mt-6 max-w-2xl">
            <SectionHeading
              as="h1"
              eyebrow="Hearing Health"
              title="Guidance from our hearing care experts"
              description="Practical, plain-language articles on hearing loss, technology, and living well — written by Beltone audiologists and specialists."
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <ArticleExplorer />
      </section>
    </>
  );
}
