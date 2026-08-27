import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { translate } from "@/i18n/translate";
import { getSiteSettings } from "@/lib/settings";
import { localize } from "@/lib/localize";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = { title: "Contact Us" };

export default async function ContactPage({ params }: PageProps<"/[locale]/contact">) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale as Locale;

  const [dict, settings] = await Promise.all([getDictionary(locale), getSiteSettings()]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20">
      <div className="text-center max-w-xl mx-auto">
        <h1 className="font-display text-4xl text-navy-900">{translate(dict, "contact.title")}</h1>
        <p className="mt-4 text-ink-500">{translate(dict, "contact.subtitle")}</p>
      </div>

      <div className="mt-14 grid gap-12 lg:grid-cols-2">
        <div className="space-y-8">
          <div>
            <h2 className="font-display text-xl text-navy-900">{translate(dict, "contact.getInTouch")}</h2>
            <ul className="mt-5 space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 shrink-0 text-gold-600" />
                <span className="text-ink-700">{localize(settings.addressEn, settings.addressAr, locale)}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 shrink-0 text-gold-600" />
                <a href={`tel:${settings.phone}`} className="text-ink-700 hover:text-gold-700">{settings.phone}</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 shrink-0 text-gold-600" />
                <a href={`mailto:${settings.email}`} className="text-ink-700 hover:text-gold-700">{settings.email}</a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="h-5 w-5 shrink-0 text-gold-600" />
                <span className="text-ink-700">{localize(settings.openingHoursEn, settings.openingHoursAr, locale)}</span>
              </li>
            </ul>
          </div>

          <div className="aspect-video w-full overflow-hidden rounded-lg border border-navy-100">
            <iframe
              title="Gelin Home location"
              src={`https://www.google.com/maps?q=${encodeURIComponent(settings.addressEn)}&output=embed`}
              className="h-full w-full"
              loading="lazy"
            />
          </div>
          <a
            href={settings.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-sm font-semibold text-gold-700 hover:underline"
          >
            {translate(dict, "contact.ourStore")} &rarr;
          </a>
        </div>

        <div className="rounded-xl border border-navy-100 bg-white p-6 md:p-8 h-fit">
          <h2 className="font-display text-xl text-navy-900 mb-5">{translate(dict, "contact.sendMessage")}</h2>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
