import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { PolicyForm } from "./policy-form";

export const metadata: Metadata = { title: "Policy Pages" };

const PAGES = [
  { slug: "shipping", label: "Shipping Policy" },
  { slug: "returns", label: "Returns & Exchange" },
  { slug: "privacy", label: "Privacy Policy" },
  { slug: "terms", label: "Terms & Conditions" },
];

export default async function AdminPoliciesPage() {
  const existing = await prisma.policyPage.findMany();
  const bySlug = new Map(existing.map((p) => [p.slug, p]));

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="font-display text-3xl text-navy-900">Policy Pages</h1>
        <p className="mt-1 text-sm text-ink-500">Edit the content shown on your storefront policy pages.</p>
      </div>

      <Accordion type="multiple" className="rounded-xl border border-navy-100 bg-white px-6">
        {PAGES.map((page) => {
          const record = bySlug.get(page.slug);
          return (
            <AccordionItem key={page.slug} value={page.slug}>
              <AccordionTrigger>{page.label}</AccordionTrigger>
              <AccordionContent>
                <PolicyForm
                  slug={page.slug}
                  titleEn={record?.titleEn || page.label}
                  titleAr={record?.titleAr || ""}
                  contentEn={record?.contentEn || ""}
                  contentAr={record?.contentAr || ""}
                />
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}
