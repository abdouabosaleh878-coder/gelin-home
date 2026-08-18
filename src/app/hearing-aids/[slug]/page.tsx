import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check, Bluetooth, BatteryCharging, EyeOff, Smartphone, Ear, Droplets, Bell } from "lucide-react";
import { products, getProductBySlug, getRelatedProducts, type ProductFeature } from "@/data/products";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { ProductGallery } from "@/components/shared/product-gallery";
import { ProductGrid } from "@/components/shared/product-grid";
import { SectionHeading } from "@/components/shared/section-heading";
import { Badge } from "@/components/ui/badge";
import { CtaButton } from "@/components/shared/cta-button";
import { buildBreadcrumbJsonLd } from "@/lib/seo";

const featureIcons: Record<ProductFeature, React.ComponentType<{ className?: string }>> = {
  "Bluetooth Streaming": Bluetooth,
  "Rechargeable Battery": BatteryCharging,
  "Discreet Fit": EyeOff,
  "Smartphone App Control": Smartphone,
  "Tinnitus Relief": Ear,
  "Made for iPhone & Android": Smartphone,
  "Water Resistant": Droplets,
  "Fall Alert": Bell,
};

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: `${product.name} | ${product.categoryLabel} Hearing Aid`,
    description: product.shortDescription,
    alternates: { canonical: `/hearing-aids/${product.slug}` },
    openGraph: {
      title: `${product.name} — Beltone`,
      description: product.shortDescription,
      images: [{ url: product.image }],
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getRelatedProducts(slug);
  const breadcrumbItems = [
    { name: "Home", path: "/" },
    { name: "Hearing Aids", path: "/hearing-aids" },
    { name: product.name, path: `/hearing-aids/${product.slug}` },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildBreadcrumbJsonLd(breadcrumbItems)) }}
      />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "Hearing Aids", href: "/hearing-aids" },
            { name: product.name },
          ]}
        />
      </div>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <ProductGallery images={product.gallery} alt={`${product.name} hearing aid`} />

          <div>
            <Badge variant="navy">{product.categoryLabel}</Badge>
            <h1 className="mt-3 text-4xl font-semibold text-navy-900">{product.name}</h1>
            <p className="mt-2 text-xl font-medium text-teal-700">{product.tagline}</p>
            <p className="mt-5 text-lg text-ink-600 text-pretty">{product.description}</p>

            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Key features">
              {product.features.map((feature) => {
                const Icon = featureIcons[feature];
                return (
                  <li key={feature}>
                    <Badge variant="sand">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                      {feature}
                    </Badge>
                  </li>
                );
              })}
            </ul>

            <dl className="mt-8 grid grid-cols-2 gap-4 rounded-xl border border-navy-100 bg-white p-5">
              <div>
                <dt className="text-sm text-ink-400">Technology Tier</dt>
                <dd className="text-base font-semibold text-navy-900">{product.price}</dd>
              </div>
              <div>
                <dt className="text-sm text-ink-400">Battery Life</dt>
                <dd className="text-base font-semibold text-navy-900">{product.batteryLife}</dd>
              </div>
            </dl>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <CtaButton href={`/book-appointment?product=${product.slug}`} icon="calendar" size="lg">
                Book an Appointment
              </CtaButton>
              <CtaButton href="/find-a-clinic" icon="map" size="lg" variant="outline">
                Find a Clinic
              </CtaButton>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-navy-100 bg-navy-50 py-16">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <h2 className="text-2xl font-semibold text-navy-900">Key Benefits</h2>
            <ul className="mt-5 space-y-3">
              {product.benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-teal-600" aria-hidden="true" />
                  <span className="text-base text-ink-700">{benefit}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm font-semibold text-navy-800">Best for:</p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {product.bestFor.map((tag) => (
                <li key={tag}>
                  <Badge variant="teal">{tag}</Badge>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-navy-900">Technical Features</h2>
            <dl className="mt-5 divide-y divide-navy-200 rounded-xl border border-navy-200 bg-white">
              {product.technicalFeatures.map((feature) => (
                <div key={feature.label} className="grid grid-cols-2 gap-4 p-4">
                  <dt className="text-sm font-medium text-ink-500">{feature.label}</dt>
                  <dd className="text-sm text-navy-900">{feature.value}</dd>
                </div>
              ))}
            </dl>

            <h2 className="mt-8 text-2xl font-semibold text-navy-900">Compatibility</h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {product.compatibility.map((item) => (
                <li key={item} className="rounded-full bg-navy-100 px-3 py-1.5 text-sm text-navy-800">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold text-navy-900">Available Styles & Colors</h2>
        <p className="mt-2 max-w-2xl text-base text-ink-500">
          {product.name} comes in the following finishes. Your hearing care provider can help you
          choose a shade that matches your hair or skin tone for a natural, discreet look.
        </p>
        <ul className="mt-6 flex flex-wrap gap-6" aria-label="Available colors">
          {product.colors.map((color) => (
            <li key={color.name} className="flex flex-col items-center gap-2">
              <span
                className="h-12 w-12 rounded-full border border-navy-200 shadow-sm"
                style={{ backgroundColor: color.hex }}
                aria-hidden="true"
              />
              <span className="text-sm font-medium text-navy-800">{color.name}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-t border-navy-100 bg-sand-100 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading title="You might also like" description="Other Beltone hearing aids worth exploring." />
          <div className="mt-8">
            <ProductGrid products={related} />
          </div>
        </div>
      </section>
    </>
  );
}
