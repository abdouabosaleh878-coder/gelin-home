"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Search, Ear } from "lucide-react";
import { primaryNav } from "@/data/nav";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const [lastPathname, setLastPathname] = useState(pathname);

  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-navy-100 bg-sand-50/95 backdrop-blur supports-[backdrop-filter]:bg-sand-50/80">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-2 text-navy-900">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-navy-900 text-white">
            <Ear className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="font-display text-2xl font-semibold">Beltone</span>
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {primaryNav.map((link) => {
              const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "rounded-full px-4 py-2 text-base font-medium transition-colors",
                      active ? "text-teal-700" : "text-navy-800 hover:text-teal-700"
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/hearing-health"
            aria-label="Search hearing health articles"
            className="hidden h-11 w-11 items-center justify-center rounded-full text-navy-800 hover:bg-navy-50 sm:flex"
          >
            <Search className="h-5 w-5" aria-hidden="true" />
          </Link>
          <Button asChild size="default" className="hidden sm:inline-flex">
            <Link href="/book-appointment">Book an Appointment</Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
          </Button>
        </div>
      </div>

      {open ? (
        <div id="mobile-menu" className="border-t border-navy-100 bg-sand-50 lg:hidden">
          <nav aria-label="Mobile" className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
            <ul className="space-y-1">
              {primaryNav.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block rounded-lg px-3 py-3 text-lg font-medium text-navy-900 hover:bg-navy-50"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Button asChild size="lg" className="mt-4 w-full sm:hidden">
              <Link href="/book-appointment">Book an Appointment</Link>
            </Button>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
