import { Users, Heart, GraduationCap, ShieldCheck } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { CtaButton } from "@/components/shared/cta-button";
import { Reveal } from "@/components/shared/reveal";

const pillars = [
  {
    icon: Users,
    title: "Small class sizes",
    description: "Low swimmer-to-coach ratios in every group class, so no swimmer gets lost in the crowd.",
  },
  {
    icon: GraduationCap,
    title: "Certified coaching staff",
    description: "Every coach holds a nationally recognized instructor certification and current CPR / First Aid / AED training.",
  },
  {
    icon: Heart,
    title: "Patient, encouraging teaching",
    description: "We meet nervous first-timers and competitive racers with the same care, at whatever pace they need.",
  },
  {
    icon: ShieldCheck,
    title: "Safety-first culture",
    description: "Background-checked staff, lifeguard supervision, and clear water-safety protocols at every pool.",
  },
];

export function WhyUs() {
  return (
    <section className="bg-aqua-900 py-20 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Why Current Swim Academy"
            title="Coaching built around your swimmer"
            description="We combine a structured, level-based curriculum with coaches who genuinely enjoy teaching every age and ability."
            className="[&_h2]:text-white [&_p]:text-aqua-200"
          />
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar, index) => (
            <Reveal key={pillar.title} delay={index * 80}>
              <div className="h-full rounded-2xl border border-aqua-700 bg-aqua-800/60 p-6">
                <pillar.icon className="h-8 w-8 text-sky-400" aria-hidden="true" />
                <h3 className="mt-4 text-xl font-semibold text-white">{pillar.title}</h3>
                <p className="mt-2 text-base text-aqua-200">{pillar.description}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200} className="mt-10 text-center">
          <CtaButton href="/about" variant="outline" className="border-sky-400 text-sky-300 hover:bg-sky-500 hover:text-aqua-950">
            More About Our Academy
          </CtaButton>
        </Reveal>
      </div>
    </section>
  );
}
