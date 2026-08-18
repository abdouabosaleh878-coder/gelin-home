import Link from "next/link";
import { Ear, Phone, MapPin } from "lucide-react";
import { Facebook, Instagram, Youtube } from "@/components/shared/social-icons";
import { footerNav } from "@/data/nav";

export function Footer() {
  return (
    <footer className="border-t border-navy-100 bg-navy-950 text-navy-100">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="flex items-center gap-2 text-white">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-500 text-navy-950">
                <Ear className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="font-display text-2xl font-semibold">Beltone</span>
            </Link>
            <p className="mt-4 max-w-sm text-base text-navy-300">
              Personalized hearing care, close to home. Helping people hear more of what matters since 1940.
            </p>
            <div className="mt-6 space-y-3 text-base">
              <a href="tel:18005550182" className="flex items-center gap-2.5 text-navy-100 hover:text-teal-300">
                <Phone className="h-5 w-5 text-teal-400" aria-hidden="true" />
                1-800-555-0182
              </a>
              <Link href="/find-a-clinic" className="flex items-center gap-2.5 text-navy-100 hover:text-teal-300">
                <MapPin className="h-5 w-5 text-teal-400" aria-hidden="true" />
                Find a clinic near you
              </Link>
            </div>
            <div className="mt-6 flex gap-3">
              {[
                { icon: Facebook, label: "Facebook" },
                { icon: Instagram, label: "Instagram" },
                { icon: Youtube, label: "YouTube" },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={`Beltone on ${label}`}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-navy-700 text-navy-200 hover:border-teal-400 hover:text-teal-300"
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <FooterColumn title="Solutions" links={footerNav.solutions} />
          <FooterColumn title="Company" links={footerNav.company} />
          <FooterColumn title="Support" links={footerNav.support} />
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-navy-800 pt-8 text-sm text-navy-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Beltone Hearing Care. All rights reserved. (Demonstration site.)</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link href="/contact" className="hover:text-teal-300">
              Privacy Policy
            </Link>
            <Link href="/contact" className="hover:text-teal-300">
              Terms of Use
            </Link>
            <Link href="/contact" className="hover:text-teal-300">
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h2 className="text-sm font-semibold uppercase tracking-wide text-navy-400">{title}</h2>
      <ul className="mt-4 space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <Link href={link.href} className="text-base text-navy-100 hover:text-teal-300">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
