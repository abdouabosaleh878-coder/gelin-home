import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { programs, getProgramBySlug, getRelatedPrograms } from "@/data/programs";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { ProgramGrid } from "@/components/shared/program-grid";
import { SectionHeading } from "@/components/shared/section-heading";
import { Badge } from "@/components/ui/badge";
import { CtaButton } from "@/components/shared/cta-button";
import { buildBreadcrumbJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return programs.map((program) => ({ slug: program.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const program = getProgramBySlug(slug);
  if (!program) return {};
  return {
    title: program.name,
    description: program.shortDescription,
    alternates: { canonical: `/programs/${program.slug}` },
    openGraph: {
      title: `${program.name} — Current Swim Academy`,
      description: program.shortDescription,
      images: [{ url: program.image }],
    },
  };
}

export default async function ProgramDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const program = getProgramBySlug(slug);
  if (!program) notFound();

  const related = getRelatedPrograms(slug);
  const breadcrumbItems = [
    { name: "Home", path: "/" },
    { name: "Programs", path: "/programs" },
    { name: program.name, path: `/programs/${program.slug}` },
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
            { name: "Programs", href: "/programs" },
            { name: program.name },
          ]}
        />
      </div>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-aqua-50">
            <Image
              src={program.image}
              alt=""
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          <div>
            <Badge variant="aqua">{program.categoryLabel}</Badge>
            <h1 className="mt-3 text-4xl font-semibold text-aqua-900">{program.name}</h1>
            <p className="mt-2 text-xl font-medium text-sky-700">{program.tagline}</p>
            <p className="mt-5 text-lg text-ink-600 text-pretty">{program.description}</p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <CtaButton href="/contact" icon="none" size="lg">
                Book a Trial Class
              </CtaButton>
              <CtaButton href="/schedule" icon="none" size="lg" variant="outline">
                View Schedule & Pricing
              </CtaButton>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-aqua-100 bg-aqua-50 py-16">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <h2 className="text-2xl font-semibold text-aqua-900">Program Highlights</h2>
            <ul className="mt-5 space-y-3">
              {program.highlights.map((highlight) => (
                <li key={highlight} className="flex items-start gap-3">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-sky-600" aria-hidden="true" />
                  <span className="text-base text-ink-700">{highlight}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-aqua-900">Ideal For</h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {program.idealFor.map((audience) => (
                <li key={audience}>
                  <Badge variant="sky">{audience}</Badge>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t border-aqua-100 bg-slate-100 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Related programs" description="Other programs worth exploring." />
          <div className="mt-8">
            <ProgramGrid programs={related} />
          </div>
        </div>
      </section>
    </>
  );
}
