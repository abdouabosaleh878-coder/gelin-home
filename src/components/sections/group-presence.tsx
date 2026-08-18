import { MapPin } from "lucide-react";
import { offices } from "@/data/offices";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";

export function GroupPresence() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <Reveal>
        <SectionHeading
          eyebrow="Regional Presence"
          title="Operating across Africa"
          description="Beltone Holding and its subsidiaries operate across multiple African markets, headquartered in Cairo."
          align="center"
          className="mx-auto"
        />
      </Reveal>
      <Reveal delay={100} className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {offices.map((office) => (
          <div
            key={office.country}
            className="flex flex-col items-center gap-2 rounded-xl border border-navy-100 bg-white p-6 text-center"
          >
            <MapPin
              className={office.isHeadquarters ? "h-6 w-6 text-gold-600" : "h-6 w-6 text-navy-400"}
              aria-hidden="true"
            />
            <span className="font-semibold text-navy-900">{office.country}</span>
            <span className="text-sm text-ink-500">{office.city}</span>
            {office.isHeadquarters ? (
              <span className="rounded-full bg-gold-50 px-2 py-0.5 text-xs font-medium text-gold-800">
                Headquarters
              </span>
            ) : null}
          </div>
        ))}
      </Reveal>
    </section>
  );
}
