"use client";

import { useMemo, useState } from "react";
import { products, categoryFilters, type ProductCategory } from "@/data/products";
import { ProductGrid } from "@/components/shared/product-grid";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ProductFilter() {
  const [active, setActive] = useState<ProductCategory | "all">("all");

  const filtered = useMemo(
    () => (active === "all" ? products : products.filter((product) => product.category === active)),
    [active]
  );

  return (
    <div>
      <div role="group" aria-label="Filter hearing aids by style" className="flex flex-wrap gap-3">
        {categoryFilters.map((filter) => (
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
        Showing {filtered.length} of {products.length} hearing aids
      </p>

      <div className="mt-6">
        <ProductGrid products={filtered} />
      </div>
    </div>
  );
}
