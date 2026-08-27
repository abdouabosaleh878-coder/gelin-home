import type { Metadata } from "next";
import { Playfair_Display, Inter, Cairo } from "next/font/google";
import { notFound } from "next/navigation";
import { Toaster } from "sonner";
import "../globals.css";
import { locales, isLocale, dirFor, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { I18nProvider } from "@/i18n/provider";
import { prisma } from "@/lib/db";
import { getSiteSettings } from "@/lib/settings";
import { localize } from "@/lib/localize";
import { organizationJsonLd, siteUrl } from "@/lib/seo";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MobileNav } from "@/components/layout/mobile-nav";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";
import { CartDrawer } from "@/components/cart/cart-drawer";

const bodyFont = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const displayFont = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

const arabicFont = Cairo({
  variable: "--font-arabic",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  const settings = await getSiteSettings();
  const brand = settings.brandName;
  return {
    metadataBase: new URL(siteUrl()),
    title: { default: brand, template: `%s | ${brand}` },
    description:
      locale === "ar"
        ? "منتجات منزلية فاخرة مصنوعة يدويًا من جلين هوم، مدينة نصر، القاهرة."
        : "Premium handmade home textiles and accessories from Hand Made Gelin Home, Nasr City, Cairo.",
    alternates: {
      languages: { en: "/en", ar: "/ar" },
    },
    icons: { icon: "/icon.svg" },
    openGraph: {
      title: brand,
      siteName: brand,
      type: "website",
      locale: locale === "ar" ? "ar_EG" : "en_US",
    },
    twitter: { card: "summary_large_image", title: brand },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale as Locale;

  const [dict, settings, categories] = await Promise.all([
    getDictionary(locale),
    getSiteSettings(),
    prisma.category.findMany({
      where: { active: true },
      orderBy: { sortOrder: "asc" },
    }),
  ]);

  const navCategories = categories.map((c) => ({
    name: localize(c.name, c.nameAr, locale),
    slug: c.slug,
  }));

  return (
    <html lang={locale} dir={dirFor(locale)} className={`${bodyFont.variable} ${displayFont.variable} ${arabicFont.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-slate-50 text-ink-900">
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd(settings)) }}
        />
        <I18nProvider locale={locale} dict={dict}>
          <Header brandName={settings.brandName} logoUrl={settings.logoUrl} categories={navCategories} />
          <main id="main-content" className="flex-1 pb-16 md:pb-0">
            {children}
          </main>
          <Footer
            brandName={settings.brandName}
            phone={settings.phone}
            email={settings.email}
            addressEn={settings.addressEn}
            addressAr={settings.addressAr}
            instagram={settings.instagram}
            facebook={settings.facebook}
            categories={navCategories}
          />
          <MobileNav />
          <CartDrawer />
          <WhatsAppButton phone={settings.whatsapp} />
          <Toaster position={locale === "ar" ? "top-left" : "top-right"} richColors closeButton />
        </I18nProvider>
      </body>
    </html>
  );
}
