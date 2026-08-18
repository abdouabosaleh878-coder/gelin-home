import type { Metadata } from "next";
import Image from "next/image";
import { Compass, Heart, ShieldCheck, Sparkles } from "lucide-react";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { SectionHeading } from "@/components/shared/section-heading";
import { GroupPresence } from "@/components/sections/group-presence";
import { Reveal } from "@/components/shared/reveal";
import { FinalCta } from "@/components/sections/final-cta";

export const metadata: Metadata = {
  title: "Our Firm",
  description:
    "Learn about Beltone Holding's story, mission, values, and regional presence across African financial markets.",
  alternates: { canonical: "/about" },
};

const values = [
  {
    icon: Heart,
    title: "Client interests first",
    description: "We build recommendations and structures around what genuinely serves the client, not what's easiest to sell.",
  },
  {
    icon: ShieldCheck,
    title: "Discipline & governance",
    description: "As a publicly listed group, we hold ourselves to public-market standards of disclosure and governance.",
  },
  {
    icon: Compass,
    title: "Long-term orientation",
    description: "We build businesses, portfolios, and client relationships meant to compound over years, not quarters.",
  },
  {
    icon: Sparkles,
    title: "Continuous investment",
    description: "We invest in data, technology, and talent to keep every business line competitive.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-navy-100 bg-navy-50">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Our Firm" }]} />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              as="h1"
              eyebrow="Our Firm"
              title="A financial-services group built for the region"
              description="Beltone Holding is a Cairo-headquartered financial-services group listed on the Egyptian Exchange under the ticker BTFH, with more than 20 subsidiaries operating across multiple African markets."
            />
            <p className="mt-6 max-w-xl text-lg text-ink-600 text-pretty">
              We bring together capital markets, financing, investment, and advisory businesses
              under one group — combining the reach of a diversified platform with the focus of
              specialist teams in each business line.
            </p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-navy-100">
            <Image
              src="https://images.unsplash.com/photo-1470075801209-17f9ec0cada6?q=80&w=1000&auto=format&fit=crop"
              alt="A modern glass office building at dusk"
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
          <SectionHeading eyebrow="Our Mission" title="Capital and expertise that build lasting value" align="center" className="mx-auto" />
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <Reveal key={value.title} delay={index * 70}>
                <div className="h-full rounded-2xl bg-white p-6 text-center shadow-sm">
                  <value.icon className="mx-auto h-8 w-8 text-gold-600" aria-hidden="true" />
                  <h2 className="mt-4 text-lg font-semibold text-navy-900">{value.title}</h2>
                  <p className="mt-2 text-base text-ink-500">{value.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <GroupPresence />

      <FinalCta />
    </>
  );
}
