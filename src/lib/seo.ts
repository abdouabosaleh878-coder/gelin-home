import type { SiteSettings } from "@prisma/client";
import type { ParsedProduct } from "./products";
import { effectivePrice } from "./products";

export function siteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
}

export function organizationJsonLd(settings: SiteSettings) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: settings.brandName,
    url: siteUrl(),
    logo: settings.logoUrl ? `${siteUrl()}${settings.logoUrl}` : undefined,
    telephone: settings.phone,
    email: settings.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: settings.addressEn,
      addressLocality: "Cairo",
      addressCountry: "EG",
    },
    sameAs: [settings.instagram, settings.facebook, settings.tiktok].filter(Boolean),
  };
}

export function productJsonLd(product: ParsedProduct, locale: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.shortDescription || product.description,
    sku: product.sku,
    image: product.imageUrls.map((u) => `${siteUrl()}${u}`),
    offers: {
      "@type": "Offer",
      priceCurrency: "EGP",
      price: effectivePrice(product),
      availability:
        product.stock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      url: `${siteUrl()}/${locale}/products/${product.slug}`,
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${siteUrl()}${item.url}`,
    })),
  };
}
