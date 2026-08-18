import { products } from "@/data/products";
import { SectionHeading } from "@/components/shared/section-heading";
import { ProductGrid } from "@/components/shared/product-grid";
import { CtaButton } from "@/components/shared/cta-button";
import { Reveal } from "@/components/shared/reveal";

export function FeaturedProducts() {
  const featured = products.filter((product) => product.featured);

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <Reveal>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Featured Hearing Aids"
            title="Technology that fits your life"
            description="From nearly invisible custom fits to powerful, easy-to-handle designs, explore a few of our most-loved hearing aids."
          />
          <CtaButton href="/hearing-aids" variant="outline" className="shrink-0">
            View All Hearing Aids
          </CtaButton>
        </div>
      </Reveal>
      <Reveal delay={100} className="mt-10">
        <ProductGrid products={featured} />
      </Reveal>
    </section>
  );
}
