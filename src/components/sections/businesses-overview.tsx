import { businessLines } from "@/data/business-lines";
import { SectionHeading } from "@/components/shared/section-heading";
import { BusinessLineGrid } from "@/components/shared/business-line-grid";
import { CtaButton } from "@/components/shared/cta-button";
import { Reveal } from "@/components/shared/reveal";

export function BusinessesOverview() {
  const featured = businessLines.filter((line) => line.featured);

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <Reveal>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Our Businesses"
            title="One group, many capabilities"
            description="From capital markets to financing and advisory services, our businesses work together to serve clients across the region."
          />
          <CtaButton href="/businesses" variant="outline" className="shrink-0">
            View All Businesses
          </CtaButton>
        </div>
      </Reveal>
      <Reveal delay={100} className="mt-10">
        <BusinessLineGrid businesses={featured} />
      </Reveal>
    </section>
  );
}
