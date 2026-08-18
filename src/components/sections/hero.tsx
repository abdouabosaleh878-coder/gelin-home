import Image from "next/image";
import { ShieldCheck } from "lucide-react";
import { CtaButton } from "@/components/shared/cta-button";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-navy-50 to-slate-50">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:py-24 lg:px-8">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-gold-700 shadow-sm">
            <ShieldCheck className="h-4 w-4" aria-hidden="true" />
            Listed on the Egyptian Exchange · EGX: BTFH
          </p>
          <h1 className="mt-6 text-4xl font-semibold leading-[1.1] text-navy-900 sm:text-5xl lg:text-6xl text-balance">
            Capital, structured for growth.
          </h1>
          <p className="mt-6 max-w-lg text-lg text-ink-700 sm:text-xl text-pretty">
            Beltone Holding is a diversified financial-services group spanning investment
            banking, asset management, financing, and advisory businesses across Africa.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <CtaButton href="/businesses" icon="arrow" size="lg">
              Explore Our Businesses
            </CtaButton>
            <CtaButton href="/investor-relations" icon="none" size="lg" variant="outline">
              Investor Relations
            </CtaButton>
          </div>
          <p className="mt-6 text-sm text-ink-500">
            Cairo-headquartered · Operating across multiple African markets
          </p>
        </div>

        <div className="relative">
          <div className="relative aspect-[4/5] w-full max-w-md overflow-hidden rounded-2xl bg-navy-100 shadow-xl sm:mx-auto lg:max-w-none">
            <Image
              src="https://images.unsplash.com/photo-1554469384-e58fac16e23a?q=80&w=1000&auto=format&fit=crop"
              alt="Modern glass office towers viewed from below"
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 45vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-6 left-1/2 w-[calc(100%-2rem)] -translate-x-1/2 rounded-2xl bg-white p-5 shadow-lg sm:left-6 sm:w-auto sm:translate-x-0">
            <p className="text-sm font-semibold text-navy-900">20+ Group Subsidiaries</p>
            <p className="mt-1 text-sm text-ink-500">Across capital markets, financing & investments</p>
          </div>
        </div>
      </div>
    </section>
  );
}
