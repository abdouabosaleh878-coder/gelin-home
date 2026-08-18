import type { Metadata } from "next";
import { Bluetooth, BatteryCharging, EyeOff, Smartphone } from "lucide-react";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { SectionHeading } from "@/components/shared/section-heading";
import { ProductFilter } from "@/components/shared/product-filter";
import { ProductComparison } from "@/components/shared/product-comparison";
import { CtaButton } from "@/components/shared/cta-button";
import { Reveal } from "@/components/shared/reveal";

export const metadata: Metadata = {
  title: "Hearing Aids | Modern, Discreet, Connected Devices",
  description:
    "Explore Beltone hearing aids — from nearly invisible custom fits to powerful, easy-to-use designs. Compare styles, features, and technology levels.",
  alternates: { canonical: "/hearing-aids" },
};

const useCases = [
  {
    icon: Bluetooth,
    title: "Stay connected",
    description: "Stream calls, music, and TV audio directly to your ears with Bluetooth-enabled devices.",
  },
  {
    icon: BatteryCharging,
    title: "Skip the tiny batteries",
    description: "Rechargeable options mean a simple overnight charge, not fumbling with small batteries.",
  },
  {
    icon: EyeOff,
    title: "Wear with confidence",
    description: "Discreet, custom-fit styles sit comfortably out of sight for all-day, worry-free wear.",
  },
  {
    icon: Smartphone,
    title: "Control from your phone",
    description: "Adjust volume, switch programs, and check battery life from the Beltone HearMax app.",
  },
];

export default function HearingAidsPage() {
  return (
    <>
      <section className="border-b border-navy-100 bg-navy-50">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Hearing Aids" }]} />
          <div className="mt-6 max-w-3xl">
            <SectionHeading
              as="h1"
              eyebrow="Hearing Aids"
              title="Technology built around real life"
              description="Every Beltone hearing aid is designed to help you follow conversation naturally — not just make things louder. Explore styles below, or take our hearing test to get a personalized recommendation."
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {useCases.map((item) => (
            <div key={item.title} className="rounded-xl border border-navy-100 bg-white p-6">
              <item.icon className="h-8 w-8 text-teal-600" aria-hidden="true" />
              <h2 className="mt-4 text-lg font-semibold text-navy-900">{item.title}</h2>
              <p className="mt-2 text-base text-ink-500">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <SectionHeading title="Browse by style" description="Filter by fit to find the design that suits your hearing needs and preferences." />
        <div className="mt-8">
          <ProductFilter />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <SectionHeading title="Compare features side by side" description="See how our most popular models stack up." />
        <div className="mt-8">
          <ProductComparison />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col items-center gap-6 rounded-3xl bg-navy-900 px-6 py-14 text-center text-white sm:px-12">
            <h2 className="max-w-2xl text-3xl font-semibold text-balance sm:text-4xl">
              Not sure which hearing aid is right for you?
            </h2>
            <p className="max-w-xl text-lg text-navy-200 text-pretty">
              Talk with a licensed hearing care professional. They&apos;ll walk you through your
              options based on your hearing profile, lifestyle, and budget — no pressure.
            </p>
            <CtaButton href="/book-appointment" icon="calendar" size="lg" variant="primary">
              Speak with a Hearing Care Professional
            </CtaButton>
          </div>
        </Reveal>
      </section>
    </>
  );
}
