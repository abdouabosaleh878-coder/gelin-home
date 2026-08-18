import { ClipboardCheck } from "lucide-react";
import { CtaButton } from "@/components/shared/cta-button";
import { Reveal } from "@/components/shared/reveal";

export function HearingAssessmentCta() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <Reveal>
        <div className="flex flex-col items-center gap-6 rounded-3xl bg-teal-700 px-6 py-12 text-center text-white sm:px-12">
          <ClipboardCheck className="h-10 w-10 text-teal-200" aria-hidden="true" />
          <h2 className="max-w-2xl text-3xl font-semibold text-balance sm:text-4xl">
            Not sure where to start? Take our 5-minute hearing check.
          </h2>
          <p className="max-w-xl text-lg text-teal-50 text-pretty">
            Answer a few short questions about your everyday hearing to get a personalized
            recommendation — no appointment needed.
          </p>
          <CtaButton href="/hearing-test" icon="arrow" size="lg" variant="secondary" className="bg-white text-teal-800 hover:bg-teal-50">
            Take the Hearing Test
          </CtaButton>
        </div>
      </Reveal>
    </section>
  );
}
