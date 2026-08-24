import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { SectionHeading } from "@/components/shared/section-heading";
import { leadCoaches, staffCredentials, trustIndicators } from "@/data/coaches";
import { CoachCard } from "@/components/shared/coach-card";
import { TrustIndicators } from "@/components/shared/trust-indicators";
import { FinalCta } from "@/components/sections/final-cta";

export const metadata: Metadata = {
  title: "Coaches",
  description: "Meet Current Swim Academy's lead coaches and learn about our staff certification standards.",
  alternates: { canonical: "/coaches" },
};

export default function CoachesPage() {
  return (
    <>
      <section className="border-b border-aqua-100 bg-aqua-50">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Coaches" }]} />
          <div className="mt-6 max-w-2xl">
            <SectionHeading
              as="h1"
              eyebrow="Coaches"
              title="The coaches behind every lesson"
              description="Our lead coaches set the curriculum and coaching standards that every instructor across all five locations is trained to."
            />
          </div>
        </div>
      </section>

      <section className="bg-aqua-900 py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Lead Coaches"
            title="Program Director & Competitive Head Coach"
            align="center"
            className="mx-auto [&_h2]:text-white [&_p]:text-aqua-200"
          />
          <div className="mx-auto mt-10 grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2">
            {leadCoaches.map((coach) => (
              <CoachCard key={coach.name} coach={coach} />
            ))}
          </div>
          <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-aqua-400">
            Full instructor and lifeguard staff profiles are available at each location.
          </p>

          <div className="mt-14 border-t border-aqua-800 pt-10">
            <TrustIndicators items={trustIndicators} className="[&_dd]:text-white [&_dt]:text-aqua-300" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Standards" title="What every coach is certified in" />
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {staffCredentials.map((credential) => (
            <div key={credential.name} className="rounded-xl border border-aqua-100 bg-white p-6">
              <h3 className="text-lg font-semibold text-aqua-900">{credential.name}</h3>
              <p className="mt-2 text-base text-ink-500">{credential.description}</p>
            </div>
          ))}
        </div>
      </section>

      <FinalCta />
    </>
  );
}
