export const siteConfig = {
  name: "Current Swim Academy",
  url: "https://www.currentswimacademy-demo.com",
  phone: "+1 (512) 555-0100",
  description:
    "Current Swim Academy offers swim lessons and training for every age and ability across five Austin-area locations — from Parent & Baby Swim to competitive team training and adult fitness.",
};

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "SportsActivityLocation",
  name: siteConfig.name,
  url: siteConfig.url,
  logo: `${siteConfig.url}/icon.svg`,
  description: siteConfig.description,
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
