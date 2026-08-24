import type { Metadata } from "next";
import Image from "next/image";
import { Briefcase, MapPin } from "lucide-react";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { SectionHeading } from "@/components/shared/section-heading";
import { jobOpenings, careerValues } from "@/data/careers";
import { Badge } from "@/components/ui/badge";
import { CtaButton } from "@/components/shared/cta-button";
import { Reveal } from "@/components/shared/reveal";

export const metadata: Metadata = {
  title: "Careers",
  description: "Explore open coaching and lifeguard roles and life at Current Swim Academy.",
  alternates: { canonical: "/careers" },
};

export default function CareersPage() {
  return (
    <>
      <section className="border-b border-aqua-100 bg-aqua-50">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Careers" }]} />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              as="h1"
              eyebrow="Careers"
              title="Teach the next generation of swimmers"
              description="From swim instructors to lifeguards to competitive coaches, our team works across five pools. We look for people who are patient, dependable, and genuinely enjoy the water."
            />
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-aqua-100">
            <Image
              src="https://images.unsplash.com/photo-1541689186060-3b08be2fd22f?q=80&w=1000&auto=format&fit=crop"
              alt="A coach directing a group swim class from the pool deck"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-slate-100 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Our Values" title="What we look for" align="center" className="mx-auto" />
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {careerValues.map((value, index) => (
              <Reveal key={value.title} delay={index * 70}>
                <div className="h-full rounded-2xl bg-white p-6 text-center shadow-sm">
                  <h3 className="text-lg font-semibold text-aqua-900">{value.title}</h3>
                  <p className="mt-2 text-base text-ink-500">{value.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Open Roles" title="Current openings" />
        <div className="mt-8 divide-y divide-aqua-100 rounded-xl border border-aqua-100 bg-white">
          {jobOpenings.map((job) => (
            <div key={job.id} className="flex flex-col gap-3 p-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-lg font-semibold text-aqua-900">{job.title}</h3>
                <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-ink-500">
                  <span className="flex items-center gap-1.5">
                    <Briefcase className="h-4 w-4" aria-hidden="true" />
                    {job.department}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4" aria-hidden="true" />
                    {job.location}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="aqua">{job.type}</Badge>
                <CtaButton href="/contact" icon="none" size="sm" variant="outline">
                  Apply
                </CtaButton>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-ink-500">
          Listings shown are illustrative placeholders — connect this page to your applicant
          tracking system for live openings.
        </p>
      </section>
    </>
  );
}
