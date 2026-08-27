"use client";

import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import { useI18n } from "@/i18n/provider";
import { localize } from "@/lib/localize";
import { InstagramIcon, FacebookIcon } from "@/components/shared/social-icons";

type FooterProps = {
  brandName: string;
  phone: string;
  email: string;
  addressEn: string;
  addressAr: string;
  instagram: string;
  facebook: string;
  categories: { name: string; slug: string }[];
};

export function Footer({
  brandName,
  phone,
  email,
  addressEn,
  addressAr,
  instagram,
  facebook,
  categories,
}: FooterProps) {
  const { t, locale } = useI18n();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-navy-100 bg-navy-900 text-slate-100 pb-20 md:pb-0">
      <div className="mx-auto max-w-7xl px-6 py-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <span className="font-display text-2xl text-gold-300">{brandName}</span>
          <p className="mt-4 text-sm leading-relaxed text-slate-300">{t("footer.about")}</p>
          <div className="mt-5 flex items-center gap-3">
            {instagram && (
              <a href={instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-slate-300 hover:text-gold-300">
                <InstagramIcon className="h-5 w-5" />
              </a>
            )}
            {facebook && (
              <a href={facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-slate-300 hover:text-gold-300">
                <FacebookIcon className="h-5 w-5" />
              </a>
            )}
          </div>
        </div>

        <div>
          <h3 className="font-display text-lg text-slate-50">{t("footer.quickLinks")}</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-slate-300">
            <li><Link href={`/${locale}/shop`} className="hover:text-gold-300">{t("nav.shop")}</Link></li>
            {categories.slice(0, 4).map((c) => (
              <li key={c.slug}>
                <Link href={`/${locale}/category/${c.slug}`} className="hover:text-gold-300">{c.name}</Link>
              </li>
            ))}
            <li><Link href={`/${locale}/contact`} className="hover:text-gold-300">{t("nav.contact")}</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-lg text-slate-50">{t("footer.customerCare")}</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-slate-300">
            <li><Link href={`/${locale}/policies/shipping`} className="hover:text-gold-300">{t("footer.shipping")}</Link></li>
            <li><Link href={`/${locale}/policies/returns`} className="hover:text-gold-300">{t("footer.returns")}</Link></li>
            <li><Link href={`/${locale}/policies/privacy`} className="hover:text-gold-300">{t("footer.privacy")}</Link></li>
            <li><Link href={`/${locale}/policies/terms`} className="hover:text-gold-300">{t("footer.terms")}</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-lg text-slate-50">{t("footer.contactUs")}</h3>
          <ul className="mt-4 space-y-3 text-sm text-slate-300">
            <li className="flex items-start gap-2">
              <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-gold-300" />
              <span>{localize(addressEn, addressAr, locale)}</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0 text-gold-300" />
              <a href={`tel:${phone}`} className="hover:text-gold-300">{phone}</a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 shrink-0 text-gold-300" />
              <a href={`mailto:${email}`} className="hover:text-gold-300">{email}</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-navy-800">
        <div className="mx-auto max-w-7xl px-6 py-5 text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>&copy; {year} {brandName}. {t("footer.allRightsReserved")}</p>
          <p>Nasr City, Cairo, Egypt</p>
        </div>
      </div>
    </footer>
  );
}
