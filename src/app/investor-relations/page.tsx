import type { Metadata } from "next";
import { AlertTriangle } from "lucide-react";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { SectionHeading } from "@/components/shared/section-heading";
import { financialHighlights, shareInfo, announcements } from "@/data/investor-relations";
import { Badge } from "@/components/ui/badge";
import { CtaButton } from "@/components/shared/cta-button";

export const metadata: Metadata = {
  title: "Investor Relations",
  description:
    "Financial highlights, regulatory disclosures, and share information for Beltone Holding (EGX: BTFH).",
  alternates: { canonical: "/investor-relations" },
};

export default function InvestorRelationsPage() {
  return (
    <>
      <section className="border-b border-navy-100 bg-navy-50">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Investor Relations" }]} />
          <div className="mt-6 max-w-2xl">
            <SectionHeading
              as="h1"
              eyebrow="Investor Relations"
              title="Information for our shareholders"
              description="Beltone Holding trades on the Egyptian Exchange under the ticker BTFH. Explore financial highlights, disclosures, and share information below."
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" aria-hidden="true" />
          <p className="text-sm text-amber-900">
            This is a demonstration page. Figures marked with a dash are placeholders and must be
            replaced with verified, board-approved financial statements before publication.
          </p>
        </div>
      </section>

      <section id="highlights" className="mx-auto max-w-7xl scroll-mt-24 px-4 pb-16 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Financial Highlights" title="Group performance at a glance" />
        <dl className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {financialHighlights.map((item) => (
            <div key={item.label} className="rounded-xl border border-navy-100 bg-white p-6">
              <dt className="text-sm text-ink-400">{item.label}</dt>
              <dd className="mt-2 text-3xl font-display font-semibold text-navy-900">{item.value}</dd>
              <dd className="mt-1 text-xs text-ink-400">{item.period}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section id="share-info" className="scroll-mt-24 border-y border-navy-100 bg-navy-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Share Information" title="BTFH on the Egyptian Exchange" />
          <dl className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {shareInfo.map((item) => (
              <div key={item.label} className="rounded-xl border border-navy-100 bg-white p-6">
                <dt className="text-sm text-ink-400">{item.label}</dt>
                <dd className="mt-2 text-2xl font-display font-semibold text-navy-900">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section id="announcements" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Disclosures" title="Announcements & regulatory disclosures" />
        <div className="mt-8 divide-y divide-navy-100 rounded-xl border border-navy-100 bg-white">
          {announcements.map((item) => (
            <div key={item.id} className="flex flex-col gap-2 p-6 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <Badge variant="navy" className="mb-2">
                  {item.category}
                </Badge>
                <h3 className="text-lg font-semibold text-navy-900">{item.title}</h3>
                <p className="mt-1 text-base text-ink-500">{item.summary}</p>
              </div>
              <span className="shrink-0 text-sm text-ink-400">{item.date}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-navy-900 px-6 py-12 text-center text-white sm:px-12">
          <h2 className="text-2xl font-semibold sm:text-3xl">Have a question for Investor Relations?</h2>
          <p className="mt-3 text-navy-200">Our IR team can help with disclosures, filings, and shareholder inquiries.</p>
          <CtaButton href="/contact" icon="none" size="lg" className="mt-6 bg-gold-500 text-navy-950 hover:bg-gold-400">
            Contact Investor Relations
          </CtaButton>
        </div>
      </section>
    </>
  );
}
