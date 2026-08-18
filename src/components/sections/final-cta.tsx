import { CtaButton } from "@/components/shared/cta-button";
import { Reveal } from "@/components/shared/reveal";

export function FinalCta() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-24 pt-4 sm:px-6 lg:px-8">
      <Reveal>
        <div className="rounded-3xl bg-navy-900 px-6 py-14 text-center text-white sm:px-12">
          <h2 className="mx-auto max-w-2xl text-3xl font-semibold text-balance sm:text-4xl">
            Let&apos;s talk about what we can build together.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-navy-200 text-pretty">
            Whether you&apos;re a client, an investor, or exploring a career with us, we&apos;d
            like to hear from you.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <CtaButton
              href="/contact"
              icon="none"
              size="lg"
              variant="secondary"
              className="bg-gold-500 text-navy-950 hover:bg-gold-400"
            >
              Contact Us
            </CtaButton>
            <CtaButton href="/careers" icon="arrow" size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-navy-900">
              Explore Careers
            </CtaButton>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
