import type { Locale } from "@/i18n/config";

/** Pick the Arabic value when locale is "ar" and it's set, else fall back to English. */
export function localize(en: string, ar: string | null | undefined, locale: Locale) {
  if (locale === "ar" && ar && ar.trim().length > 0) return ar;
  return en;
}
