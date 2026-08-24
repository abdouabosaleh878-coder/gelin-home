import type { Metadata } from "next";
import Image from "next/image";
import { Heart, ShieldCheck, Sparkles, Trophy } from "lucide-react";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { SectionHeading } from "@/components/shared/section-heading";
import { Locations } from "@/components/sections/locations";
import { Reveal } from "@/components/shared/reveal";
import { FinalCta } from "@/components/sections/final-cta";

export const metadata: Metadata = {
  title: "Our Academy",
  description:
    "Learn about Current Swim Academy's story, coaching philosophy, values, and pool locations across the Austin area.",
  alternates: { canonical: "/about" },
};

const values = [
  {
    icon: Heart,
    title: "Every swimmer's pace",
    description: "We build lesson plans around the swimmer in front of us, not a fixed timeline — some kids need six weeks, some need six months.",
  },
  {
    icon: ShieldCheck,
    title: "Safety without exception",
    description: "Certified coaches, background-checked staff, and lifeguard supervision are non-negotiable at every pool, every session.",
  },
  {
    icon: Trophy,
    title: "Room to compete",
    description: "For swimmers who want to race, our competitive pathway carries them from Learn-to-Swim through club-level training.",
  },
  {
    icon: Sparkles,
    title: "Coaches who keep learning",
    description: "We invest in ongoing certification and in-service training so every coach keeps sharpening their craft.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-aqua-100 bg-aqua-50">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Our Academy" }]} />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              as="h1"
              eyebrow="Our Academy"
              title="A swim school built around real coaching"
              description="Current Swim Academy teaches swimmers of every age across five pool locations in the Austin area, with a leveled curriculum that takes swimmers from their first splash to competitive racing."
            />
            <p className="mt-6 max-w-xl text-lg text-ink-600 text-pretty">
              We started with one pool and a simple idea: swim lessons work best when
              coaches actually know their swimmers. Fifteen years later, that&apos;s still
              how every class is taught — small groups, real progress tracking, and coaches
              who stick around.
            </p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-aqua-100">
            <Image
              src="https://images.unsplash.com/photo-1560090995-01632a28895b?q=80&w=1000&auto=format&fit=crop"
              alt="An indoor competition pool with multiple lanes"
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
          <SectionHeading eyebrow="Our Values" title="What guides every class we teach" align="center" className="mx-auto" />
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <Reveal key={value.title} delay={index * 70}>
                <div className="h-full rounded-2xl bg-white p-6 text-center shadow-sm">
                  <value.icon className="mx-auto h-8 w-8 text-sky-600" aria-hidden="true" />
                  <h2 className="mt-4 text-lg font-semibold text-aqua-900">{value.title}</h2>
                  <p className="mt-2 text-base text-ink-500">{value.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Locations />

      <FinalCta />
    </>
  );
}
