"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Menu, Search, Heart, ShoppingBag, X } from "lucide-react";
import { useI18n } from "@/i18n/provider";
import { useCartStore, cartCount } from "@/store/cart";
import { useWishlistStore } from "@/store/wishlist";
import { useMounted } from "@/hooks/use-mounted";
import { LanguageSwitcher } from "./language-switcher";
import { cn } from "@/lib/utils";

type NavCategory = { name: string; slug: string };

export function Header({
  brandName,
  logoUrl,
  categories,
}: {
  brandName: string;
  logoUrl: string;
  categories: NavCategory[];
}) {
  const { t, locale } = useI18n();
  const router = useRouter();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const mounted = useMounted();

  const items = useCartStore((s) => s.items);
  const openCart = useCartStore((s) => s.open);
  const wishlistIds = useWishlistStore((s) => s.ids);

  const count = mounted ? cartCount(items) : 0;
  const wishCount = mounted ? wishlistIds.length : 0;

  const navLinks = [
    { href: `/${locale}/shop`, label: t("nav.shop") },
    ...categories.slice(0, 5).map((c) => ({
      href: `/${locale}/category/${c.slug}`,
      label: c.name,
    })),
    { href: `/${locale}/contact`, label: t("nav.contact") },
  ];

  function submitSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/${locale}/shop?q=${encodeURIComponent(query.trim())}`);
    setSearchOpen(false);
  }

  return (
    <header className="sticky top-0 z-30 border-b border-navy-100 bg-slate-50/95 backdrop-blur">
      <div className="hidden md:block border-b border-navy-100 bg-navy-900 text-slate-50">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2 text-xs tracking-wide">
          <p>Nasr City, Cairo, Egypt</p>
          <LanguageSwitcher locale={locale} className="text-slate-50 hover:text-gold-300" />
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 md:px-6">
        <button
          className="md:hidden p-2 -ms-2 text-navy-900"
          aria-label={t("nav.menu")}
          onClick={() => setMenuOpen(true)}
        >
          <Menu className="h-6 w-6" />
        </button>

        <Link href={`/${locale}`} className="flex items-center gap-2 shrink-0">
          {logoUrl ? (
            <Image src={logoUrl} alt={brandName} width={40} height={40} className="h-9 w-9 object-contain" />
          ) : (
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-navy-900 font-display text-lg text-gold-300">
              G
            </span>
          )}
          <span className="font-display text-xl font-semibold text-navy-900 hidden sm:inline">
            {brandName}
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium tracking-wide text-ink-700 hover:text-gold-700 transition-colors",
                pathname === link.href && "text-gold-700"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <button
            aria-label={t("nav.search")}
            className="p-2 text-navy-900 hover:text-gold-700"
            onClick={() => setSearchOpen((v) => !v)}
          >
            <Search className="h-5 w-5" />
          </button>
          <Link
            href={`/${locale}/wishlist`}
            aria-label={t("nav.wishlist")}
            className="relative p-2 text-navy-900 hover:text-gold-700 hidden sm:inline-flex"
          >
            <Heart className="h-5 w-5" />
            {wishCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold-600 px-1 text-[10px] font-semibold text-white">
                {wishCount}
              </span>
            )}
          </Link>
          <button
            aria-label={t("nav.cart")}
            className="relative p-2 text-navy-900 hover:text-gold-700"
            onClick={openCart}
          >
            <ShoppingBag className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold-600 px-1 text-[10px] font-semibold text-white">
                {count}
              </span>
            )}
          </button>
        </div>
      </div>

      {searchOpen && (
        <div className="border-t border-navy-100 bg-slate-50 px-4 py-3 md:px-6">
          <form onSubmit={submitSearch} className="mx-auto flex max-w-2xl items-center gap-2">
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("nav.searchPlaceholder")}
              className="h-11 flex-1 rounded-md border border-navy-200 bg-white px-4 text-sm focus-visible:border-gold-500 focus-visible:outline-none"
            />
            <button
              type="submit"
              className="h-11 rounded-md bg-navy-900 px-5 text-sm font-semibold text-white hover:bg-navy-800"
            >
              {t("nav.search")}
            </button>
          </form>
        </div>
      )}

      {menuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-navy-950/50" onClick={() => setMenuOpen(false)} />
          <div className="absolute inset-y-0 start-0 w-4/5 max-w-xs bg-slate-50 p-6 shadow-xl overflow-y-auto">
            <div className="flex items-center justify-between mb-8">
              <span className="font-display text-lg text-navy-900">{brandName}</span>
              <button onClick={() => setMenuOpen(false)} aria-label={t("common.close")}>
                <X className="h-6 w-6 text-navy-900" />
              </button>
            </div>
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-md px-3 py-3 text-base font-medium text-ink-700 hover:bg-navy-50"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href={`/${locale}/wishlist`}
                onClick={() => setMenuOpen(false)}
                className="rounded-md px-3 py-3 text-base font-medium text-ink-700 hover:bg-navy-50"
              >
                {t("nav.wishlist")}
              </Link>
            </nav>
            <div className="mt-8 border-t border-navy-100 pt-6">
              <LanguageSwitcher locale={locale} />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
