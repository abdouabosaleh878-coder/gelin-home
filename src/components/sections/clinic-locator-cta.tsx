import Image from "next/image";
import { MapPin } from "lucide-react";
import { CtaButton } from "@/components/shared/cta-button";
import { Reveal } from "@/components/shared/reveal";

export function ClinicLocatorCta() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <Reveal>
        <div className="grid grid-cols-1 items-center gap-10 overflow-hidden rounded-3xl bg-navy-50 lg:grid-cols-2">
          <div className="px-6 py-12 sm:px-12">
            <MapPin className="h-10 w-10 text-teal-600" aria-hidden="true" />
            <h2 className="mt-5 text-3xl font-semibold text-navy-900 sm:text-4xl text-balance">
              Hearing care close to home
            </h2>
            <p className="mt-4 max-w-md text-lg text-ink-600 text-pretty">
              With 1,500+ clinics nationwide, expert hearing care is likely just a short drive
              away. Find your nearest location and see real-time hours and services.
            </p>
            <CtaButton href="/find-a-clinic" icon="map" size="lg" className="mt-8">
              Find a Clinic Near You
            </CtaButton>
          </div>
          <div className="relative h-64 lg:h-full lg:min-h-[380px]">
            <Image
              src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1000&auto=format&fit=crop"
              alt="Exterior of a modern Beltone hearing care clinic storefront"
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
