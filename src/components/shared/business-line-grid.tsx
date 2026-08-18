import type { BusinessLine } from "@/data/business-lines";
import { BusinessLineCard } from "@/components/shared/business-line-card";

export function BusinessLineGrid({ businesses }: { businesses: BusinessLine[] }) {
  if (businesses.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-navy-200 bg-white p-12 text-center">
        <p className="text-lg font-semibold text-navy-900">No businesses match these filters</p>
        <p className="mt-2 text-ink-500">Try selecting a different category.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {businesses.map((business) => (
        <BusinessLineCard key={business.slug} business={business} />
      ))}
    </div>
  );
}
