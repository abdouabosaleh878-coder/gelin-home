import { CtaButton } from "@/components/shared/cta-button";
import { Reveal } from "@/components/shared/reveal";

export function FinalCta() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-24 pt-4 sm:px-6 lg:px-8">
      <Reveal>
        <div className="rounded-3xl bg-aqua-900 px-6 py-14 text-center text-white sm:px-12">
          <h2 className="mx-auto max-w-2xl text-3xl font-semibold text-balance sm:text-4xl">
            Ready to get your swimmer in the water?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-aqua-200 text-pretty">
            Whether you&apos;re booking a first lesson, joining the competitive team, or
            exploring a coaching career with us, we&apos;d like to hear from you.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <CtaButton
              href="/contact"
              icon="none"
              size="lg"
              variant="secondary"
              className="bg-sky-500 text-aqua-950 hover:bg-sky-400"
            >
              Book a Free Trial
            </CtaButton>
            <CtaButton href="/careers" icon="arrow" size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-aqua-900">
              Explore Careers
            </CtaButton>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
