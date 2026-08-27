"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({
  locale,
  className,
}: {
  locale: Locale;
  className?: string;
}) {
  const pathname = usePathname();
  const rest = pathname.split("/").slice(2).join("/");
  const target: Locale = locale === "en" ? "ar" : "en";
  const href = `/${target}${rest ? `/${rest}` : ""}`;

  return (
    <Link
      href={href}
      className={cn(
        "text-sm font-semibold tracking-wide text-ink-700 hover:text-gold-700 transition-colors",
        className
      )}
    >
      {target === "ar" ? "العربية" : "English"}
    </Link>
  );
}
