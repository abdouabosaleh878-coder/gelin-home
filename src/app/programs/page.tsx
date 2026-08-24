import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { SectionHeading } from "@/components/shared/section-heading";
import { ProgramFilter } from "@/components/shared/program-filter";
import { CtaButton } from "@/components/shared/cta-button";
import { Reveal } from "@/components/shared/reveal";

export const metadata: Metadata = {
  title: "Programs",
  description:
    "Explore Current Swim Academy's programs — youth lessons, adult lessons, competitive teams, and fitness & wellness classes.",
  alternates: { canonical: "/programs" },
};

export default function ProgramsPage() {
  return (
    <>
      <section className="border-b border-aqua-100 bg-aqua-50">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Programs" }]} />
          <div className="mt-6 max-w-3xl">
            <SectionHeading
              as="h1"
              eyebrow="Our Programs"
              title="Swim lessons and training for every age"
              description="From Parent & Baby Swim to competitive team training and adult fitness — 11 programs across four categories, all taught by certified coaches."
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <ProgramFilter />
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col items-center gap-6 rounded-3xl bg-aqua-900 px-6 py-14 text-center text-white sm:px-12">
            <h2 className="max-w-2xl text-3xl font-semibold text-balance sm:text-4xl">
              Not sure which program is right for your swimmer?
            </h2>
            <p className="max-w-xl text-lg text-aqua-200 text-pretty">
              Reach out and we&apos;ll help you find the right class based on age and current
              skill level.
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
