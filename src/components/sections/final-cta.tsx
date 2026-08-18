import { CtaButton } from "@/components/shared/cta-button";
import { Reveal } from "@/components/shared/reveal";

export function FinalCta() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-24 pt-4 sm:px-6 lg:px-8">
      <Reveal>
        <div className="rounded-3xl bg-teal-600 px-6 py-14 text-center text-white sm:px-12">
          <h2 className="mx-auto max-w-2xl text-3xl font-semibold text-balance sm:text-4xl">
            Ready to hear more of what matters?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-teal-50 text-pretty">
            Book your free hearing assessment today. It takes less than a minute to schedule.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <CtaButton
              href="/book-appointment"
              icon="calendar"
              size="lg"
              variant="secondary"
              className="bg-white text-teal-800 hover:bg-teal-50"
            >
              Book an Appointment
            </CtaButton>
            <CtaButton href="/hearing-test" icon="arrow" size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-teal-800">
              Take the Hearing Test
            </CtaButton>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
