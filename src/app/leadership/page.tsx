import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { SectionHeading } from "@/components/shared/section-heading";
import { executiveLeadership, governanceCommittees, trustIndicators } from "@/data/leadership";
import { LeaderCard } from "@/components/shared/leader-card";
import { TrustIndicators } from "@/components/shared/trust-indicators";
import { FinalCta } from "@/components/sections/final-cta";

export const metadata: Metadata = {
  title: "Leadership & Governance",
  description:
    "Meet Beltone Holding's executive leadership and learn about the group's board governance structure.",
  alternates: { canonical: "/leadership" },
};

export default function LeadershipPage() {
  return (
    <>
      <section className="border-b border-navy-100 bg-navy-50">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Leadership" }]} />
          <div className="mt-6 max-w-2xl">
            <SectionHeading
              as="h1"
              eyebrow="Leadership & Governance"
              title="The people steering Beltone Holding"
              description="Our executive leadership sets the group's strategic direction, guided by board committees that oversee risk, audit, and investment decisions."
            />
          </div>
        </div>
      </section>

      <section className="bg-navy-900 py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Executive Leadership"
            title="Chairman & Group CEO"
            align="center"
            className="mx-auto [&_h2]:text-white [&_p]:text-navy-200"
          />
          <div className="mx-auto mt-10 grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2">
            {executiveLeadership.map((leader) => (
              <LeaderCard key={leader.name} leader={leader} />
            ))}
          </div>
          <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-navy-400">
            Additional board members and executive committee profiles to be added once confirmed.
          </p>

          <div className="mt-14 border-t border-navy-800 pt-10">
            <TrustIndicators items={trustIndicators} className="[&_dd]:text-white [&_dt]:text-navy-300" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Governance" title="Board committees" />
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {governanceCommittees.map((committee) => (
            <div key={committee.name} className="rounded-xl border border-navy-100 bg-white p-6">
              <h3 className="text-lg font-semibold text-navy-900">{committee.name}</h3>
              <p className="mt-2 text-base text-ink-500">{committee.description}</p>
            </div>
          ))}
        </div>
      </section>

      <FinalCta />
    </>
  );
}
