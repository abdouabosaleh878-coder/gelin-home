export const siteConfig = {
  name: "Beltone Holding",
  url: "https://www.beltoneholding-demo.com",
  phone: "+20 2 0000 0000",
  description:
    "Beltone Holding is a Cairo-headquartered financial-services group listed on the Egyptian Exchange (EGX: BTFH), operating across investment banking, asset management, financing, and advisory businesses in multiple African markets.",
};

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: siteConfig.url,
  logo: `${siteConfig.url}/icon.svg`,
  description: siteConfig.description,
  tickerSymbol: "BTFH",
  sameAs: [],
};

export function buildBreadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.path}`,
    })),
  };
}
