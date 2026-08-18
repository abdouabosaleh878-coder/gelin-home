import type { Metadata } from "next";
import { Ear, MessageCircleQuestion, ClipboardCheck, Timer } from "lucide-react";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { SectionHeading } from "@/components/shared/section-heading";
import { HearingQuestionnaire } from "@/components/hearing-test/hearing-questionnaire";

export const metadata: Metadata = {
  title: "Free Online Hearing Test | 5-Minute Hearing Check",
  description:
    "Take Beltone's free 5-minute online hearing questionnaire to get a personalized recommendation. Not a substitute for a professional hearing evaluation.",
  alternates: { canonical: "/hearing-test" },
};

const steps = [
  {
    icon: MessageCircleQuestion,
    title: "Answer 8 short questions",
    description: "Tell us about everyday listening situations, like conversations and background noise.",
  },
  {
    icon: Timer,
    title: "Takes about 5 minutes",
    description: "No sign-up required. Go at your own pace and go back to change an answer anytime.",
  },
  {
    icon: ClipboardCheck,
    title: "Get a personalized result",
    description: "See a summary of your responses and a recommended next step.",
  },
];

export default function HearingTestPage() {
  return (
    <>
      <section className="border-b border-navy-100 bg-navy-50">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Hearing Test" }]} />
          <div className="mt-6 flex items-start gap-4">
            <span className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-full bg-teal-600 text-white sm:flex">
              <Ear className="h-7 w-7" aria-hidden="true" />
            </span>
            <SectionHeading
              as="h1"
              eyebrow="Hearing Test"
              title="A quick, free hearing check"
              description="This short questionnaire looks at common everyday signs of hearing difficulty and gives you a personalized starting point — no equipment or appointment required."
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {steps.map((step) => (
            <div key={step.title} className="rounded-xl border border-navy-100 bg-white p-6">
              <step.icon className="h-7 w-7 text-teal-600" aria-hidden="true" />
              <h2 className="mt-3 text-base font-semibold text-navy-900">{step.title}</h2>
              <p className="mt-1.5 text-sm text-ink-500">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-24 sm:px-6 lg:px-8">
        <HearingQuestionnaire />
      </section>
    </>
  );
}
