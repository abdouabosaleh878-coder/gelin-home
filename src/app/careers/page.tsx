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
  description: "Explore open roles and life at Beltone Holding across our financial-services businesses.",
  alternates: { canonical: "/careers" },
};

export default function CareersPage() {
  return (
    <>
      <section className="border-b border-navy-100 bg-navy-50">
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
              title="Build your career across financial services"
              description="From investment banking to data science, our teams work across markets and business lines. We look for people who want real ownership early in their careers."
            />
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-navy-100">
            <Image
              src="https://images.unsplash.com/photo-1690378820474-b468b8ee64d3?q=80&w=1000&auto=format&fit=crop"
              alt="A team collaborating around laptops in a bright modern office"
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
                  <h3 className="text-lg font-semibold text-navy-900">{value.title}</h3>
                  <p className="mt-2 text-base text-ink-500">{value.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Open Roles" title="Current openings" />
        <div className="mt-8 divide-y divide-navy-100 rounded-xl border border-navy-100 bg-white">
          {jobOpenings.map((job) => (
            <div key={job.id} className="flex flex-col gap-3 p-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-lg font-semibold text-navy-900">{job.title}</h3>
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
                <Badge variant="navy">{job.type}</Badge>
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
