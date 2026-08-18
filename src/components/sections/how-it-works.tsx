import { Ear, ClipboardList, Wrench, LifeBuoy } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";

const steps = [
  {
    icon: Ear,
    step: "01",
    title: "Assess",
    description: "A free, no-pressure hearing assessment with a licensed provider identifies your specific hearing profile.",
  },
  {
    icon: ClipboardList,
    step: "02",
    title: "Recommend",
    description: "We walk you through the options that fit your hearing needs, lifestyle, and budget — no jargon required.",
  },
  {
    icon: Wrench,
    step: "03",
    title: "Fit",
    description: "Your hearing aids are custom-programmed to your ears and fine-tuned until they feel just right.",
  },
  {
    icon: LifeBuoy,
    step: "04",
    title: "Support",
    description: "Ongoing check-ins, cleanings, and adjustments keep you hearing your best for years to come.",
  },
];

export function HowItWorks() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <Reveal>
        <SectionHeading
          eyebrow="How It Works"
          title="Your path to better hearing"
          description="A simple, guided process from your first conversation to lifelong support."
          align="center"
          className="mx-auto"
        />
      </Reveal>

      <div className="relative mt-14 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div className="absolute top-8 left-0 right-0 hidden h-px bg-navy-200 lg:block" aria-hidden="true" />
        {steps.map((step, index) => (
          <Reveal key={step.title} delay={index * 90}>
            <div className="relative flex flex-col items-center text-center">
              <span className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-teal-600 text-white shadow-md">
                <step.icon className="h-7 w-7" aria-hidden="true" />
              </span>
              <span className="mt-4 text-sm font-semibold text-teal-700">Step {step.step}</span>
              <h3 className="mt-1 text-xl font-semibold text-navy-900">{step.title}</h3>
              <p className="mt-2 text-base text-ink-500 text-pretty">{step.description}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
