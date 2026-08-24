"use client";

import { useMemo, useState } from "react";
import { programs, programCategoryFilters, type ProgramCategory } from "@/data/programs";
import { ProgramGrid } from "@/components/shared/program-grid";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ProgramFilter() {
  const [active, setActive] = useState<ProgramCategory | "all">("all");

  const filtered = useMemo(
    () => (active === "all" ? programs : programs.filter((program) => program.category === active)),
    [active]
  );

  return (
    <div>
      <div role="group" aria-label="Filter programs by category" className="flex flex-wrap gap-3">
        {programCategoryFilters.map((filter) => (
          <Button
            key={filter.value}
            type="button"
            variant={active === filter.value ? "secondary" : "outline"}
            size="sm"
            aria-pressed={active === filter.value}
            onClick={() => setActive(filter.value)}
            className={cn("rounded-full")}
          >
            {filter.label}
          </Button>
        ))}
      </div>

      <p className="mt-4 text-sm text-ink-500" role="status" aria-live="polite">
        Showing {filtered.length} of {programs.length} programs
      </p>

      <div className="mt-6">
        <ProgramGrid programs={filtered} />
      </div>
    </div>
  );
}
