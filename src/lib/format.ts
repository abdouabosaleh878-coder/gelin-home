import type { Locale } from "@/i18n/config";

export function formatPrice(amount: number, locale: Locale = "en") {
  const rounded = Math.round(amount);
  const formatted = rounded.toLocaleString(locale === "ar" ? "ar-EG" : "en-US");
  return locale === "ar" ? `${formatted} ج.م` : `EGP ${formatted}`;
}

export function formatDate(date: Date | string, locale: Locale = "en") {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString(locale === "ar" ? "ar-EG" : "en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function formatOrderNumber(id: number) {
  return `GH-${String(id).padStart(6, "0")}`;
}
