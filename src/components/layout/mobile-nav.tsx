"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Grid2x2, Heart, ShoppingBag } from "lucide-react";
import { useI18n } from "@/i18n/provider";
import { useCartStore, cartCount } from "@/store/cart";
import { useWishlistStore } from "@/store/wishlist";
import { useMounted } from "@/hooks/use-mounted";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const { t, locale } = useI18n();
  const pathname = usePathname();
  const mounted = useMounted();
  const items = useCartStore((s) => s.items);
  const openCart = useCartStore((s) => s.open);
  const wishlistIds = useWishlistStore((s) => s.ids);

  const count = mounted ? cartCount(items) : 0;
  const wishCount = mounted ? wishlistIds.length : 0;

  const isActive = (href: string) => pathname === href;

  const tabs = [
    { href: `/${locale}`, icon: Home, label: t("breadcrumb.home") },
    { href: `/${locale}/shop`, icon: Grid2x2, label: t("nav.shop") },
    { href: `/${locale}/wishlist`, icon: Heart, label: t("nav.wishlist"), badge: wishCount },
  ];

  return (
    <nav className="fixed bottom-0 inset-x-0 z-30 grid grid-cols-4 border-t border-navy-100 bg-slate-50/95 backdrop-blur md:hidden pb-[env(safe-area-inset-bottom)]">
      {tabs.map((tab) => (
        <Link
          key={tab.href}
          href={tab.href}
          className={cn(
            "relative flex flex-col items-center justify-center gap-0.5 py-2.5 text-[11px] font-medium text-ink-500",
            isActive(tab.href) && "text-gold-700"
          )}
        >
          <tab.icon className="h-5 w-5" />
          {tab.label}
          {"badge" in tab && tab.badge! > 0 && (
            <span className="absolute top-1.5 right-1/2 -mr-4 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold-600 px-1 text-[9px] font-semibold text-white">
              {tab.badge}
            </span>
          )}
        </Link>
      ))}
      <button
        onClick={openCart}
        className="relative flex flex-col items-center justify-center gap-0.5 py-2.5 text-[11px] font-medium text-ink-500"
      >
        <ShoppingBag className="h-5 w-5" />
        {t("nav.cart")}
        {count > 0 && (
          <span className="absolute top-1.5 right-1/2 -mr-4 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold-600 px-1 text-[9px] font-semibold text-white">
            {count}
          </span>
        )}
      </button>
    </nav>
  );
}
