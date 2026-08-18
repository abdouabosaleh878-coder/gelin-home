import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { SectionHeading } from "@/components/shared/section-heading";
import { BusinessLineFilter } from "@/components/shared/business-line-filter";
import { CtaButton } from "@/components/shared/cta-button";
import { Reveal } from "@/components/shared/reveal";

export const metadata: Metadata = {
  title: "Our Businesses",
  description:
    "Explore Beltone Holding's businesses across capital markets, financing, investments, and advisory services.",
  alternates: { canonical: "/businesses" },
};

export default function BusinessesPage() {
  return (
    <>
      <section className="border-b border-navy-100 bg-navy-50">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Businesses" }]} />
          <div className="mt-6 max-w-3xl">
            <SectionHeading
              as="h1"
              eyebrow="Our Businesses"
              title="A diversified financial-services platform"
              description="Beltone Holding operates across capital markets, financing, investments, and advisory services — 20+ subsidiaries working together across the region."
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <BusinessLineFilter />
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col items-center gap-6 rounded-3xl bg-navy-900 px-6 py-14 text-center text-white sm:px-12">
            <h2 className="max-w-2xl text-3xl font-semibold text-balance sm:text-4xl">
              Looking for the right team to work with?
            </h2>
            <p className="max-w-xl text-lg text-navy-200 text-pretty">
              Reach out and we&apos;ll connect you with the right business line for your needs.
            </p>
            <CtaButton href="/contact" icon="none" size="lg" variant="primary">
              Get in Touch
            </CtaButton>
          </div>
        </Reveal>
      </section>
    </>
  );
}
