import type { Program } from "@/data/programs";
import { ProgramCard } from "@/components/shared/program-card";

export function ProgramGrid({ programs }: { programs: Program[] }) {
  if (programs.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-aqua-200 bg-white p-12 text-center">
        <p className="text-lg font-semibold text-aqua-900">No programs match these filters</p>
        <p className="mt-2 text-ink-500">Try selecting a different category.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {programs.map((program) => (
        <ProgramCard key={program.slug} program={program} />
      ))}
    </div>
  );
}
