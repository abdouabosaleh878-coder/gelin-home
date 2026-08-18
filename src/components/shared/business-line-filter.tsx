"use client";

import { useMemo, useState } from "react";
import { businessLines, businessCategoryFilters, type BusinessCategory } from "@/data/business-lines";
import { BusinessLineGrid } from "@/components/shared/business-line-grid";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function BusinessLineFilter() {
  const [active, setActive] = useState<BusinessCategory | "all">("all");

  const filtered = useMemo(
    () => (active === "all" ? businessLines : businessLines.filter((line) => line.category === active)),
    [active]
  );

  return (
    <div>
      <div role="group" aria-label="Filter businesses by category" className="flex flex-wrap gap-3">
        {businessCategoryFilters.map((filter) => (
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
        Showing {filtered.length} of {businessLines.length} businesses
      </p>

      <div className="mt-6">
        <BusinessLineGrid businesses={filtered} />
      </div>
    </div>
  );
}
