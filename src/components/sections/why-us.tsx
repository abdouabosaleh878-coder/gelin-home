import { LineChart, Landmark, Globe2, ShieldCheck } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { CtaButton } from "@/components/shared/cta-button";
import { Reveal } from "@/components/shared/reveal";

const pillars = [
  {
    icon: Landmark,
    title: "Diversified by design",
    description: "Investment banking, financing, and asset management businesses that balance each other across market cycles.",
  },
  {
    icon: Globe2,
    title: "Regional reach",
    description: "A presence across multiple African markets, giving clients and portfolio companies room to scale.",
  },
  {
    icon: LineChart,
    title: "Data-driven decisions",
    description: "An in-house data science and AI capability supports credit, risk, and investment decisions group-wide.",
  },
  {
    icon: ShieldCheck,
    title: "Public-market discipline",
    description: "Listed on the Egyptian Exchange (EGX: BTFH), held to public disclosure and governance standards.",
  },
];

export function WhyUs() {
  return (
    <section className="bg-navy-900 py-20 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Why Beltone Holding"
            title="A platform built for the long term"
            description="We combine capital markets expertise with on-the-ground financing and advisory businesses."
            className="[&_h2]:text-white [&_p]:text-navy-200"
          />
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar, index) => (
            <Reveal key={pillar.title} delay={index * 80}>
              <div className="h-full rounded-2xl border border-navy-700 bg-navy-800/60 p-6">
                <pillar.icon className="h-8 w-8 text-gold-400" aria-hidden="true" />
                <h3 className="mt-4 text-xl font-semibold text-white">{pillar.title}</h3>
                <p className="mt-2 text-base text-navy-200">{pillar.description}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200} className="mt-10 text-center">
          <CtaButton href="/about" variant="outline" className="border-gold-400 text-gold-300 hover:bg-gold-500 hover:text-navy-950">
            More About Our Firm
          </CtaButton>
        </Reveal>
      </div>
    </section>
  );
}
