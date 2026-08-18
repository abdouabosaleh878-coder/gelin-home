export const siteConfig = {
  name: "Beltone Hearing Care",
  url: "https://www.beltone-demo.com",
  phone: "1-800-555-0182",
  description:
    "Beltone helps you hear more of what matters. Book a free hearing assessment, explore modern hearing aids, and find a hearing-care clinic near you.",
};

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  name: siteConfig.name,
  url: siteConfig.url,
  logo: `${siteConfig.url}/icon.svg`,
  description: siteConfig.description,
  telephone: siteConfig.phone,
  medicalSpecialty: "Audiology",
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
