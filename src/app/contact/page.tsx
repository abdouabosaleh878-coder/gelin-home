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
    "Contact Current Swim Academy to book a trial class, ask about programs, or apply for a coaching role.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <section className="border-b border-aqua-100 bg-aqua-50">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Contact" }]} />
          <div className="mt-6 max-w-2xl">
            <SectionHeading
              as="h1"
              eyebrow="Contact"
              title="We're here to help"
              description="Whether you're booking a trial class, have a question about a program, or want to apply for a coaching role, reach out below."
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.3fr]">
          <div className="space-y-6">
            <div className="rounded-2xl border border-aqua-100 bg-white p-6">
              <Phone className="h-6 w-6 text-sky-600" aria-hidden="true" />
              <h2 className="mt-3 text-lg font-semibold text-aqua-900">Call us</h2>
              <a href="tel:+15125550100" className="mt-1 block text-lg text-sky-700 hover:underline">
                +1 (512) 555-0100
              </a>
              <p className="mt-1 text-sm text-ink-500">Mon–Sat, 8 AM–7 PM</p>
            </div>
            <div className="rounded-2xl border border-aqua-100 bg-white p-6">
              <Mail className="h-6 w-6 text-sky-600" aria-hidden="true" />
              <h2 className="mt-3 text-lg font-semibold text-aqua-900">Email us</h2>
              <a href="mailto:hello@currentswimacademy-demo.com" className="mt-1 block text-lg text-sky-700 hover:underline">
                hello@currentswimacademy-demo.com
              </a>
              <p className="mt-1 text-sm text-ink-500">We typically reply within one to two business days</p>
            </div>
            <div className="rounded-2xl border border-aqua-100 bg-white p-6">
              <MapPin className="h-6 w-6 text-sky-600" aria-hidden="true" />
              <h2 className="mt-3 text-lg font-semibold text-aqua-900">Locations</h2>
              <p className="mt-1 text-sm text-ink-500">Five pools across the Austin area</p>
            </div>
            <div className="rounded-2xl border border-aqua-100 bg-white p-6">
              <Clock className="h-6 w-6 text-sky-600" aria-hidden="true" />
              <h2 className="mt-3 text-lg font-semibold text-aqua-900">Response time</h2>
              <p className="mt-1 text-sm text-ink-500">Contact form messages: within 1–2 business days</p>
            </div>
          </div>

          <div className="rounded-2xl border border-aqua-100 bg-white p-6 sm:p-10">
            <h2 className="text-2xl font-semibold text-aqua-900">Send us a message</h2>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="bg-slate-100 py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="FAQ" title="Frequently asked questions" align="center" className="mx-auto" />
          <div className="mt-10 rounded-2xl border border-aqua-100 bg-white px-6 sm:px-8">
            <FaqAccordion faqs={contactFaqs} idPrefix="contact-faq" />
          </div>
        </div>
      </section>
    </>
  );
}
