import Image from "next/image";
import { ShieldCheck } from "lucide-react";
import { CtaButton } from "@/components/shared/cta-button";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-aqua-50 to-slate-50">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:py-24 lg:px-8">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-sky-700 shadow-sm">
            <ShieldCheck className="h-4 w-4" aria-hidden="true" />
            Certified coaches · 5 pool locations across Austin
          </p>
          <h1 className="mt-6 text-4xl font-semibold leading-[1.1] text-aqua-900 sm:text-5xl lg:text-6xl text-balance">
            Swim lessons for every age and ability.
          </h1>
          <p className="mt-6 max-w-lg text-lg text-ink-700 sm:text-xl text-pretty">
            Current Swim Academy teaches confident, capable swimmers — from a baby&apos;s
            first splash to competitive racing and adult fitness — with patient coaching
            and a curriculum that meets every swimmer where they are.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <CtaButton href="/contact" icon="arrow" size="lg">
              Book a Free Trial Class
            </CtaButton>
            <CtaButton href="/programs" icon="none" size="lg" variant="outline">
              Explore Programs
            </CtaButton>
          </div>
          <p className="mt-6 text-sm text-ink-500">
            Austin-based · Serving swimmers ages 6 months and up
          </p>
        </div>

        <div className="relative">
          <div className="relative aspect-[4/5] w-full max-w-md overflow-hidden rounded-2xl bg-aqua-100 shadow-xl sm:mx-auto lg:max-w-none">
            <Image
              src="https://images.unsplash.com/photo-1710739513833-48b074290a8e?q=80&w=1000&auto=format&fit=crop"
              alt="A swimmer mid-stroke, mid-breath, in a competition pool"
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 45vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-6 left-1/2 w-[calc(100%-2rem)] -translate-x-1/2 rounded-2xl bg-white p-5 shadow-lg sm:left-6 sm:w-auto sm:translate-x-0">
            <p className="text-sm font-semibold text-aqua-900">800+ Swimmers Enrolled</p>
            <p className="mt-1 text-sm text-ink-500">Across youth, adult, and competitive programs</p>
          </div>
        </div>
      </div>
    </section>
  );
}
