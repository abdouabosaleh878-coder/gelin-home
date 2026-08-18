import Link from "next/link";
import { MapPin, Phone, Clock, Navigation, Star } from "lucide-react";
import type { Clinic } from "@/data/clinics";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function ClinicCard({ clinic }: { clinic: Clinic }) {
  const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    clinic.address
  )}`;

  return (
    <Card className="flex flex-col p-6">
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-xl font-semibold text-navy-900">{clinic.name}</h3>
        <div className="flex shrink-0 items-center gap-1 text-sm font-medium text-navy-700">
          <Star className="h-4 w-4 fill-teal-500 text-teal-500" aria-hidden="true" />
          {clinic.rating}
          <span className="text-ink-400">({clinic.reviewCount})</span>
        </div>
      </div>

      <div className="mt-4 space-y-2.5 text-base text-ink-700">
        <p className="flex items-start gap-2.5">
          <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-teal-600" aria-hidden="true" />
          <span>{clinic.address}</span>
        </p>
        <p className="flex items-center gap-2.5">
          <Phone className="h-5 w-5 shrink-0 text-teal-600" aria-hidden="true" />
          <a href={`tel:${clinic.phone.replace(/[^\d+]/g, "")}`} className="hover:text-teal-700">
            {clinic.phone}
          </a>
        </p>
        <div className="flex items-start gap-2.5">
          <Clock className="mt-0.5 h-5 w-5 shrink-0 text-teal-600" aria-hidden="true" />
          <ul>
            {clinic.hours.map((entry) => (
              <li key={entry.day} className="flex gap-2 text-sm">
                <span className="w-20 font-medium text-navy-800">{entry.day}</span>
                <span className="text-ink-500">{entry.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <ul className="mt-4 flex flex-wrap gap-2">
        {clinic.services.map((service) => (
          <li
            key={service}
            className="rounded-full bg-sand-100 px-3 py-1 text-xs font-medium text-ink-700"
          >
            {service}
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Button asChild variant="outline" size="sm" className="flex-1">
          <a href={directionsUrl} target="_blank" rel="noopener noreferrer">
            <Navigation className="h-4 w-4" aria-hidden="true" />
            Get Directions
          </a>
        </Button>
        <Button asChild size="sm" className="flex-1">
          <Link href={`/book-appointment?clinic=${clinic.id}`}>Book Appointment</Link>
        </Button>
      </div>
    </Card>
  );
}
