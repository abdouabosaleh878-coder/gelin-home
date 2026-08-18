import Image from "next/image";
import { LineChart } from "lucide-react";
import { CtaButton } from "@/components/shared/cta-button";
import { Reveal } from "@/components/shared/reveal";

export function InvestorCta() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <Reveal>
        <div className="grid grid-cols-1 items-center gap-10 overflow-hidden rounded-3xl bg-navy-50 lg:grid-cols-2">
          <div className="px-6 py-12 sm:px-12">
            <LineChart className="h-10 w-10 text-gold-600" aria-hidden="true" />
            <h2 className="mt-5 text-3xl font-semibold text-navy-900 sm:text-4xl text-balance">
              Information for investors
            </h2>
            <p className="mt-4 max-w-md text-lg text-ink-600 text-pretty">
              Explore financial highlights, regulatory disclosures, and share information for
              Beltone Holding (EGX: BTFH).
            </p>
            <CtaButton href="/investor-relations" icon="arrow" size="lg" className="mt-8">
              Visit Investor Relations
            </CtaButton>
          </div>
          <div className="relative h-64 lg:h-full lg:min-h-[380px]">
            <Image
              src="https://images.unsplash.com/photo-1560221328-12fe60f83ab8?q=80&w=1000&auto=format&fit=crop"
              alt="A financial chart showing an upward market trend on a monitor"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
