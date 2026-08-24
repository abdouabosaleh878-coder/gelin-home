import { MapPin } from "lucide-react";
import { locations } from "@/data/locations";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";

export function Locations() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <Reveal>
        <SectionHeading
          eyebrow="Our Locations"
          title="Five pools across the Austin area"
          description="Current Swim Academy operates five locations, each offering the full range of programs and open swim hours."
          align="center"
          className="mx-auto"
        />
      </Reveal>
      <Reveal delay={100} className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-5">
        {locations.map((location) => (
          <div
            key={location.name}
            className="flex flex-col items-center gap-2 rounded-xl border border-aqua-100 bg-white p-6 text-center"
          >
            <MapPin
              className={location.isHeadquarters ? "h-6 w-6 text-sky-600" : "h-6 w-6 text-aqua-400"}
              aria-hidden="true"
            />
            <span className="font-semibold text-aqua-900">{location.name}</span>
            <span className="text-sm text-ink-500">{location.area}</span>
            {location.isHeadquarters ? (
              <span className="rounded-full bg-sky-50 px-2 py-0.5 text-xs font-medium text-sky-800">
                Headquarters
              </span>
            ) : null}
          </div>
        ))}
      </Reveal>
    </section>
  );
}
