import type { Product } from "@/data/products";
import { ProductCard } from "@/components/shared/product-card";

export function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-navy-200 bg-white p-12 text-center">
        <p className="text-lg font-semibold text-navy-900">No hearing aids match these filters</p>
        <p className="mt-2 text-ink-500">Try selecting a different style or clearing your filters.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.slug} product={product} />
      ))}
    </div>
  );
}
