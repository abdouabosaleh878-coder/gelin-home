import type { Metadata } from "next";
import Image from "next/image";
import { Compass, Heart, ShieldCheck, Sparkles } from "lucide-react";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { SectionHeading } from "@/components/shared/section-heading";
import { teamMembers, milestones } from "@/data/team";
import { Reveal } from "@/components/shared/reveal";
import { FinalCta } from "@/components/sections/final-cta";

export const metadata: Metadata = {
  title: "About Beltone | Our Story, Mission & People",
  description:
    "Learn about Beltone's 85+ year history in hearing care, our mission, our values, and the experts behind our clinics nationwide.",
  alternates: { canonical: "/about" },
};

const values = [
  {
    icon: Heart,
    title: "People before products",
    description: "We recommend what genuinely helps you hear better — never what's easiest to sell.",
  },
  {
    icon: ShieldCheck,
    title: "Honesty, always",
    description: "Clear answers, transparent pricing, and no pressure at any point in your journey.",
  },
  {
    icon: Compass,
    title: "Guided, not rushed",
    description: "Every patient moves at their own pace, with a provider who explains each step.",
  },
  {
    icon: Sparkles,
    title: "Continuous improvement",
    description: "We invest in the newest hearing technology and ongoing clinical training.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-navy-100 bg-navy-50">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "About" }]} />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              as="h1"
              eyebrow="About Beltone"
              title="Our story starts with listening"
              description="Beltone was founded in 1940 on a simple belief: hearing well changes lives. Today, that same belief guides every clinic in our nationwide network."
            />
            <p className="mt-6 max-w-xl text-lg text-ink-600 text-pretty">
              What began as a single hearing care office has grown into a network of more than
              1,500 clinics — but our approach hasn&apos;t changed. We still believe the best
              hearing care happens face-to-face, built on trust between a patient and their
              provider.
            </p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-navy-100">
            <Image
              src="https://images.unsplash.com/photo-1608979827489-2b855e79debe?q=80&w=1000&auto=format&fit=crop"
              alt="A bright, modern Beltone clinic reception area"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-sand-100 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Our Mission" title="Helping people hear more of what matters" align="center" className="mx-auto" />
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <Reveal key={value.title} delay={index * 70}>
                <div className="h-full rounded-2xl bg-white p-6 text-center shadow-sm">
                  <value.icon className="mx-auto h-8 w-8 text-teal-600" aria-hidden="true" />
                  <h2 className="mt-4 text-lg font-semibold text-navy-900">{value.title}</h2>
                  <p className="mt-2 text-base text-ink-500">{value.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Milestones" title="85+ years of hearing care" align="center" className="mx-auto" />
        <ol className="relative mt-12 space-y-10 border-l-2 border-navy-100 pl-8 sm:mx-auto sm:max-w-2xl">
          {milestones.map((milestone) => (
            <li key={milestone.year} className="relative">
              <span className="absolute -left-[2.35rem] flex h-6 w-6 items-center justify-center rounded-full bg-teal-600 ring-4 ring-sand-50" aria-hidden="true" />
              <p className="text-sm font-semibold text-teal-700">{milestone.year}</p>
              <h3 className="mt-1 text-xl font-semibold text-navy-900">{milestone.title}</h3>
              <p className="mt-1 text-base text-ink-500">{milestone.description}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-navy-900 py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Our Experts"
            title="Meet the leadership behind Beltone's care standards"
            align="center"
            className="mx-auto [&_h2]:text-white [&_p]:text-navy-200"
          />
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member) => (
              <div key={member.name} className="rounded-2xl border border-navy-700 bg-navy-800/60 p-6 text-center">
                <div className="relative mx-auto h-24 w-24 overflow-hidden rounded-full">
                  <Image src={member.image} alt="" fill sizes="96px" className="object-cover" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-white">{member.name}</h3>
                <p className="text-sm font-medium text-teal-300">{member.role}</p>
                <p className="text-xs text-navy-400">{member.credentials}</p>
                <p className="mt-3 text-sm text-navy-200">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
