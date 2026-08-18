import { HeartHandshake, Microscope, Users, LifeBuoy } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { TrustIndicators } from "@/components/shared/trust-indicators";
import { CtaButton } from "@/components/shared/cta-button";
import { Reveal } from "@/components/shared/reveal";

const pillars = [
  {
    icon: Microscope,
    title: "Proven expertise",
    description: "85+ years perfecting hearing care, backed by licensed audiologists and hearing instrument specialists.",
  },
  {
    icon: HeartHandshake,
    title: "Personalized care",
    description: "Every recommendation starts with your hearing, your lifestyle, and what matters most to you.",
  },
  {
    icon: Users,
    title: "A local, human team",
    description: "Meet face-to-face with the same trusted provider at a clinic near you, visit after visit.",
  },
  {
    icon: LifeBuoy,
    title: "Support that doesn't stop",
    description: "Free follow-up adjustments, cleanings, and check-ins for as long as you own your devices.",
  },
];

export function WhyBeltone() {
  return (
    <section className="bg-navy-900 py-20 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Why Beltone"
            title="Hearing care built around trust"
            description="We combine advanced technology with the kind of personal attention that makes a real difference."
            className="[&_h2]:text-white [&_p]:text-navy-200"
          />
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar, index) => (
            <Reveal key={pillar.title} delay={index * 80}>
              <div className="h-full rounded-2xl border border-navy-700 bg-navy-800/60 p-6">
                <pillar.icon className="h-8 w-8 text-teal-400" aria-hidden="true" />
                <h3 className="mt-4 text-xl font-semibold text-white">{pillar.title}</h3>
                <p className="mt-2 text-base text-navy-200">{pillar.description}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200} className="mt-14 border-t border-navy-800 pt-10">
          <TrustIndicators className="[&_dd]:text-white [&_dt]:text-navy-300" />
        </Reveal>

        <Reveal delay={260} className="mt-10 text-center">
          <CtaButton href="/why-beltone" variant="outline" className="border-teal-400 text-teal-300 hover:bg-teal-500 hover:text-navy-950">
            Learn More About Beltone
          </CtaButton>
        </Reveal>
      </div>
    </section>
  );
}
