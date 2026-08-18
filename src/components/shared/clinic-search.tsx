"use client";

import { useMemo, useState } from "react";
import { Search, MapPin } from "lucide-react";
import { clinics as allClinics, searchClinics } from "@/data/clinics";
import { ClinicCard } from "@/components/shared/clinic-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function ClinicSearch() {
  const [query, setQuery] = useState("");
  const results = useMemo(() => searchClinics(query), [query]);

  return (
    <div>
      <div className="mx-auto max-w-xl">
        <Label htmlFor="clinic-search">Search by city, state, or clinic name</Label>
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-400" aria-hidden="true" />
          <Input
            id="clinic-search"
            type="search"
            placeholder="Try “Seattle” or “Chicago”"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="pl-12"
          />
        </div>
        <p className="mt-2 text-sm text-ink-500" role="status" aria-live="polite">
          {results.length} clinic{results.length === 1 ? "" : "s"} found
        </p>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          {results.length === 0 ? (
            <div className="rounded-xl border border-dashed border-navy-200 bg-white p-12 text-center">
              <p className="text-lg font-semibold text-navy-900">No clinics match “{query}”</p>
              <p className="mt-2 text-ink-500">
                Try a nearby city or state, or call 1-800-555-0182 and we&apos;ll help you find one.
              </p>
            </div>
          ) : (
            results.map((clinic) => <ClinicCard key={clinic.id} clinic={clinic} />)
          )}
        </div>

        <div
          className="sticky top-24 hidden h-fit overflow-hidden rounded-xl border border-navy-100 bg-navy-50 lg:block"
          role="img"
          aria-label={`Map showing ${results.length} Beltone clinic locations`}
        >
          <div className="relative aspect-[4/5] w-full bg-[radial-gradient(circle_at_1px_1px,var(--color-navy-200)_1px,transparent_0)] [background-size:18px_18px]">
            {(results.length ? results : allClinics).map((clinic, index) => {
              const left = 15 + ((index * 37) % 70);
              const top = 12 + ((index * 53) % 76);
              return (
                <div
                  key={clinic.id}
                  className="absolute -translate-x-1/2 -translate-y-full"
                  style={{ left: `${left}%`, top: `${top}%` }}
                >
                  <div className="flex flex-col items-center">
                    <div className="rounded-full bg-teal-600 p-2 shadow-md">
                      <MapPin className="h-4 w-4 text-white" aria-hidden="true" />
                    </div>
                    <span className="mt-1 rounded bg-white px-2 py-0.5 text-xs font-medium text-navy-800 shadow-sm">
                      {clinic.city}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
