import type { Metadata } from "next";
import { AlertTriangle, Check } from "lucide-react";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { SectionHeading } from "@/components/shared/section-heading";
import { weeklySchedule, pricingPlans, poolPolicies } from "@/data/schedule";
import { CtaButton } from "@/components/shared/cta-button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Schedule & Pricing",
  description:
    "Weekly class schedule, membership pricing, and pool policies for Current Swim Academy's programs.",
  alternates: { canonical: "/schedule" },
};

export default function SchedulePage() {
  return (
    <>
      <section className="border-b border-aqua-100 bg-aqua-50">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Schedule & Pricing" }]} />
          <div className="mt-6 max-w-2xl">
            <SectionHeading
              as="h1"
              eyebrow="Schedule & Pricing"
              title="Class times and membership plans"
              description="A sample of our weekly class schedule and current pricing. Exact times vary by location — confirm at booking."
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" aria-hidden="true" />
          <p className="text-sm text-amber-900">
            This is a demonstration page. Class times and prices shown are illustrative
            placeholders — replace with live schedule and pricing data for each location
            before publication.
          </p>
        </div>
      </section>

      <section id="schedule" className="mx-auto max-w-7xl scroll-mt-24 px-4 pb-16 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Weekly Schedule" title="A sample week at a glance" />
        <div className="mt-8 overflow-hidden rounded-xl border border-aqua-100 bg-white">
          <div className="divide-y divide-aqua-100">
            {weeklySchedule.map((slot, index) => (
              <div key={index} className="flex flex-col gap-1 p-5 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-4">
                  <span className="w-24 shrink-0 text-sm font-semibold text-aqua-900">{slot.day}</span>
                  <span className="text-sm text-ink-500">{slot.time}</span>
                </div>
                <div className="flex flex-wrap items-center gap-2 sm:justify-end">
                  <span className="text-base font-medium text-aqua-900">{slot.className}</span>
                  <span className="rounded-full bg-sky-50 px-2.5 py-0.5 text-xs font-medium text-sky-800">{slot.level}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="scroll-mt-24 border-y border-aqua-100 bg-aqua-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Membership Plans" title="Pricing for every program" />
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {pricingPlans.map((plan) => (
              <div
                key={plan.name}
                className={cn(
                  "flex flex-col rounded-2xl border bg-white p-6",
                  plan.highlighted ? "border-sky-400 shadow-lg ring-1 ring-sky-400" : "border-aqua-100"
                )}
              >
                {plan.highlighted ? (
                  <span className="mb-3 w-fit rounded-full bg-sky-500 px-3 py-1 text-xs font-semibold text-white">
                    Most Popular
                  </span>
                ) : null}
                <h3 className="text-lg font-semibold text-aqua-900">{plan.name}</h3>
                <p className="mt-2">
                  <span className="text-3xl font-display font-semibold text-aqua-900">{plan.price}</span>
                  <span className="ml-1 text-sm text-ink-400">{plan.period}</span>
                </p>
                <p className="mt-3 text-sm text-ink-500">{plan.description}</p>
                <ul className="mt-5 flex-1 space-y-2.5">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-ink-700">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-sky-600" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="policies" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Policies" title="Pool policies" />
        <div className="mt-8 divide-y divide-aqua-100 rounded-xl border border-aqua-100 bg-white">
          {poolPolicies.map((policy) => (
            <div key={policy.title} className="flex flex-col gap-2 p-6">
              <h3 className="text-lg font-semibold text-aqua-900">{policy.title}</h3>
              <p className="text-base text-ink-500">{policy.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-aqua-900 px-6 py-12 text-center text-white sm:px-12">
          <h2 className="text-2xl font-semibold sm:text-3xl">Ready to book a class?</h2>
          <p className="mt-3 text-aqua-200">Our team can help you find the right program, level, and location.</p>
          <CtaButton href="/contact" icon="none" size="lg" className="mt-6 bg-sky-500 text-aqua-950 hover:bg-sky-400">
            Contact Us to Enroll
          </CtaButton>
        </div>
      </section>
    </>
  );
}
