import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { SectionHeading } from "@/components/shared/section-heading";
import { ContactForm } from "@/components/contact/contact-form";
import { FaqAccordion } from "@/components/shared/faq-accordion";
import { contactFaqs } from "@/data/faqs";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Beltone Holding for business, investor relations, careers, or media inquiries.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <section className="border-b border-navy-100 bg-navy-50">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Contact" }]} />
          <div className="mt-6 max-w-2xl">
            <SectionHeading
              as="h1"
              eyebrow="Contact"
              title="We're here to help"
              description="Whether you have a question for a specific business line, our investor relations team, or press inquiries, reach out below."
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.3fr]">
          <div className="space-y-6">
            <div className="rounded-2xl border border-navy-100 bg-white p-6">
              <Phone className="h-6 w-6 text-gold-600" aria-hidden="true" />
              <h2 className="mt-3 text-lg font-semibold text-navy-900">Call us</h2>
              <a href="tel:+20200000000" className="mt-1 block text-lg text-gold-700 hover:underline">
                +20 2 0000 0000
              </a>
              <p className="mt-1 text-sm text-ink-500">Mon–Fri, 9 AM–5 PM Cairo time</p>
            </div>
            <div className="rounded-2xl border border-navy-100 bg-white p-6">
              <Mail className="h-6 w-6 text-gold-600" aria-hidden="true" />
              <h2 className="mt-3 text-lg font-semibold text-navy-900">Email us</h2>
              <a href="mailto:info@beltoneholding-demo.com" className="mt-1 block text-lg text-gold-700 hover:underline">
                info@beltoneholding-demo.com
              </a>
              <p className="mt-1 text-sm text-ink-500">We typically reply within one to two business days</p>
            </div>
            <div className="rounded-2xl border border-navy-100 bg-white p-6">
              <MapPin className="h-6 w-6 text-gold-600" aria-hidden="true" />
              <h2 className="mt-3 text-lg font-semibold text-navy-900">Headquarters</h2>
              <p className="mt-1 text-sm text-ink-500">Cairo, Egypt</p>
            </div>
            <div className="rounded-2xl border border-navy-100 bg-white p-6">
              <Clock className="h-6 w-6 text-gold-600" aria-hidden="true" />
              <h2 className="mt-3 text-lg font-semibold text-navy-900">Response time</h2>
              <p className="mt-1 text-sm text-ink-500">Contact form messages: within 1–2 business days</p>
            </div>
          </div>

          <div className="rounded-2xl border border-navy-100 bg-white p-6 sm:p-10">
            <h2 className="text-2xl font-semibold text-navy-900">Send us a message</h2>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="bg-slate-100 py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="FAQ" title="Frequently asked questions" align="center" className="mx-auto" />
          <div className="mt-10 rounded-2xl border border-navy-100 bg-white px-6 sm:px-8">
            <FaqAccordion faqs={contactFaqs} idPrefix="contact-faq" />
          </div>
        </div>
      </section>
    </>
  );
}
