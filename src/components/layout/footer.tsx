import Link from "next/link";
import { Waves, Phone, Mail, MapPin } from "lucide-react";
import { Facebook, Instagram } from "@/components/shared/social-icons";
import { footerNav } from "@/data/nav";

export function Footer() {
  return (
    <footer className="border-t border-aqua-100 bg-aqua-950 text-aqua-100">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="flex items-center gap-2 text-white">
              <span className="flex h-10 w-10 items-center justify-center rounded-md bg-sky-500 text-aqua-950">
                <Waves className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="font-display text-2xl font-semibold">Current Swim Academy</span>
            </Link>
            <p className="mt-4 max-w-sm text-base text-aqua-300">
              Swim lessons and training for every age and ability, across five pool locations
              in the Austin area — from a baby&apos;s first splash to competitive racing and
              adult fitness.
            </p>
            <div className="mt-6 space-y-3 text-base">
              <a href="tel:+15125550100" className="flex items-center gap-2.5 text-aqua-100 hover:text-sky-300">
                <Phone className="h-5 w-5 text-sky-400" aria-hidden="true" />
                +1 (512) 555-0100
              </a>
              <a href="mailto:hello@currentswimacademy-demo.com" className="flex items-center gap-2.5 text-aqua-100 hover:text-sky-300">
                <Mail className="h-5 w-5 text-sky-400" aria-hidden="true" />
                hello@currentswimacademy-demo.com
              </a>
              <p className="flex items-center gap-2.5 text-aqua-100">
                <MapPin className="h-5 w-5 text-sky-400" aria-hidden="true" />
                Downtown Aquatic Center, Austin, TX (Headquarters)
              </p>
            </div>
            <div className="mt-6 flex gap-3">
              <a
                href="#"
                aria-label="Current Swim Academy on Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-aqua-700 text-aqua-200 hover:border-sky-400 hover:text-sky-300"
              >
                <Instagram className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href="#"
                aria-label="Current Swim Academy on Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-aqua-700 text-aqua-200 hover:border-sky-400 hover:text-sky-300"
              >
                <Facebook className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          <FooterColumn title="Academy" links={footerNav.company} />
          <FooterColumn title="Schedule" links={footerNav.schedule} />
          <FooterColumn title="Support" links={footerNav.support} />
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-aqua-800 pt-8 text-sm text-aqua-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Current Swim Academy. All rights reserved. (Demonstration site.)</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link href="/contact" className="hover:text-sky-300">
              Privacy Policy
            </Link>
            <Link href="/contact" className="hover:text-sky-300">
              Terms of Use
            </Link>
            <Link href="/schedule#policies" className="hover:text-sky-300">
              Pool Policies
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
      <h2 className="text-sm font-semibold uppercase tracking-wide text-aqua-400">{title}</h2>
      <ul className="mt-4 space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <Link href={link.href} className="text-base text-aqua-100 hover:text-sky-300">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
