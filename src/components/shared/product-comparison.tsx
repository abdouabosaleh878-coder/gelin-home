import Link from "next/link";
import { Check } from "lucide-react";
import { products, type ProductFeature } from "@/data/products";

const compareFeatures: ProductFeature[] = [
  "Bluetooth Streaming",
  "Rechargeable Battery",
  "Discreet Fit",
  "Smartphone App Control",
  "Water Resistant",
  "Tinnitus Relief",
];

export function ProductComparison() {
  return (
    <div className="overflow-x-auto rounded-xl border border-navy-100 bg-white">
      <table className="w-full min-w-[720px] border-collapse text-left">
        <caption className="sr-only">Comparison of Beltone hearing aid features by model</caption>
        <thead>
          <tr className="border-b border-navy-100">
            <th scope="col" className="p-5 text-sm font-semibold uppercase tracking-wide text-ink-400">
              Feature
            </th>
            {products.map((product) => (
              <th key={product.slug} scope="col" className="p-5 text-base font-semibold text-navy-900">
                <Link href={`/hearing-aids/${product.slug}`} className="hover:text-teal-700">
                  {product.name}
                </Link>
                <p className="mt-1 text-xs font-normal text-ink-400">{product.categoryLabel}</p>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {compareFeatures.map((feature, rowIndex) => (
            <tr key={feature} className={rowIndex % 2 === 0 ? "bg-sand-50" : ""}>
              <th scope="row" className="p-5 text-base font-medium text-navy-800">
                {feature}
              </th>
              {products.map((product) => {
                const has = product.features.includes(feature);
                return (
                  <td key={product.slug} className="p-5 text-center">
                    {has ? (
                      <span className="inline-flex items-center gap-1.5 text-teal-700">
                        <Check className="h-5 w-5" aria-hidden="true" />
                        <span className="sr-only">Included</span>
                      </span>
                    ) : (
                      <span className="text-ink-400" aria-hidden="true">
                        —
                      </span>
                    )}
                    {!has ? <span className="sr-only">Not included</span> : null}
                  </td>
                );
              })}
            </tr>
          ))}
          <tr>
            <th scope="row" className="p-5 text-base font-medium text-navy-800">
              Technology Tier
            </th>
            {products.map((product) => (
              <td key={product.slug} className="p-5 text-center text-base font-semibold text-navy-900">
                {product.price}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
