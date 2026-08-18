import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { businessLines, getBusinessLineBySlug, getRelatedBusinessLines } from "@/data/business-lines";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { BusinessLineGrid } from "@/components/shared/business-line-grid";
import { SectionHeading } from "@/components/shared/section-heading";
import { Badge } from "@/components/ui/badge";
import { CtaButton } from "@/components/shared/cta-button";
import { buildBreadcrumbJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return businessLines.map((line) => ({ slug: line.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const business = getBusinessLineBySlug(slug);
  if (!business) return {};
  return {
    title: business.name,
    description: business.shortDescription,
    alternates: { canonical: `/businesses/${business.slug}` },
    openGraph: {
      title: `${business.name} — Beltone Holding`,
      description: business.shortDescription,
      images: [{ url: business.image }],
    },
  };
}

export default async function BusinessDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const business = getBusinessLineBySlug(slug);
  if (!business) notFound();

  const related = getRelatedBusinessLines(slug);
  const breadcrumbItems = [
    { name: "Home", path: "/" },
    { name: "Businesses", path: "/businesses" },
    { name: business.name, path: `/businesses/${business.slug}` },
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
            { name: "Businesses", href: "/businesses" },
            { name: business.name },
          ]}
        />
      </div>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-navy-50">
            <Image
              src={business.image}
              alt=""
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          <div>
            <Badge variant="navy">{business.categoryLabel}</Badge>
            <h1 className="mt-3 text-4xl font-semibold text-navy-900">{business.name}</h1>
            <p className="mt-2 text-xl font-medium text-gold-700">{business.tagline}</p>
            <p className="mt-5 text-lg text-ink-600 text-pretty">{business.description}</p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <CtaButton href="/contact" icon="none" size="lg">
                Speak With This Team
              </CtaButton>
              <CtaButton href="/investor-relations" icon="none" size="lg" variant="outline">
                Investor Relations
              </CtaButton>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-navy-100 bg-navy-50 py-16">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <h2 className="text-2xl font-semibold text-navy-900">What We Offer</h2>
            <ul className="mt-5 space-y-3">
              {business.services.map((service) => (
                <li key={service} className="flex items-start gap-3">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-gold-600" aria-hidden="true" />
                  <span className="text-base text-ink-700">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-navy-900">Who We Serve</h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {business.clients.map((client) => (
                <li key={client}>
                  <Badge variant="gold">{client}</Badge>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t border-navy-100 bg-slate-100 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Related businesses" description="Other lines of business worth exploring." />
          <div className="mt-8">
            <BusinessLineGrid businesses={related} />
          </div>
        </div>
      </section>
    </>
  );
}
