import type { Metadata } from "next";
import Image from "next/image";
import { Microscope, HeartHandshake, Users, LifeBuoy, Award } from "lucide-react";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { SectionHeading } from "@/components/shared/section-heading";
import { TrustIndicators } from "@/components/shared/trust-indicators";
import { Testimonials } from "@/components/sections/testimonials";
import { FinalCta } from "@/components/sections/final-cta";
import { Reveal } from "@/components/shared/reveal";

export const metadata: Metadata = {
  title: "Why Beltone | Our Approach to Hearing Care",
  description:
    "Discover why patients trust Beltone: 85+ years of expertise, personalized care, advanced technology, and lifelong support at clinics nationwide.",
  alternates: { canonical: "/why-beltone" },
};

const pillars = [
  {
    icon: Microscope,
    title: "Expertise you can trust",
    description:
      "Our clinics are staffed by licensed audiologists and hearing instrument specialists who complete ongoing clinical training every year.",
  },
  {
    icon: Award,
    title: "Technology that keeps improving",
    description:
      "We partner closely with hearing aid manufacturers to bring the latest sound processing, connectivity, and rechargeable technology to every clinic.",
  },
  {
    icon: HeartHandshake,
    title: "Personalized, unhurried care",
    description:
      "No two ears — or lives — are the same. Every recommendation starts with your specific hearing profile and daily routine.",
  },
  {
    icon: Users,
    title: "A face you'll recognize",
    description:
      "You'll build a relationship with the same local provider over time, not a rotating cast of unfamiliar faces.",
  },
  {
    icon: LifeBuoy,
    title: "Support that never really ends",
    description:
      "Free follow-up visits, cleanings, and adjustments are included for as long as you wear your Beltone hearing aids.",
  },
];

export default function WhyBeltonePage() {
  return (
    <>
      <section className="border-b border-navy-100 bg-navy-50">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Why Beltone" }]} />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              as="h1"
              eyebrow="Why Beltone"
              title="Hearing care that puts people first"
              description="Since 1940, Beltone has helped people reconnect with the voices and moments that matter. Here's what sets our approach apart."
            />
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-navy-100">
            <Image
              src="https://images.unsplash.com/photo-1667581278300-a4035a2a5cd8?q=80&w=1000&auto=format&fit=crop"
              alt="A hearing care provider fitting a hearing aid for a patient"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((pillar, index) => (
            <Reveal key={pillar.title} delay={index * 70}>
              <div className="h-full rounded-2xl border border-navy-100 bg-white p-6">
                <pillar.icon className="h-8 w-8 text-teal-600" aria-hidden="true" />
                <h2 className="mt-4 text-xl font-semibold text-navy-900">{pillar.title}</h2>
                <p className="mt-2 text-base text-ink-500">{pillar.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-y border-navy-100 bg-navy-900 py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Trusted Nationwide"
            title="A network built on results"
            align="center"
            className="mx-auto [&_h2]:text-white"
          />
          <TrustIndicators className="mt-10 [&_dd]:text-white [&_dt]:text-navy-300" />
        </div>
      </section>

      <Testimonials />
      <FinalCta />
    </>
  );
}
