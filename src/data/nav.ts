export type NavLink = {
  label: string;
  href: string;
  description?: string;
};

export const primaryNav: NavLink[] = [
  { label: "Our Firm", href: "/about", description: "Our story, mission, and presence" },
  { label: "Businesses", href: "/businesses", description: "Our lines of business across financial services" },
  { label: "Investor Relations", href: "/investor-relations", description: "Financial highlights, disclosures, and share information" },
  { label: "Leadership", href: "/leadership", description: "Board of Directors and executive management" },
  { label: "News", href: "/news", description: "Announcements and media coverage" },
  { label: "Careers", href: "/careers", description: "Open roles and life at Beltone Holding" },
];

export const footerNav = {
  company: [
    { label: "Our Firm", href: "/about" },
    { label: "Businesses", href: "/businesses" },
    { label: "Leadership", href: "/leadership" },
    { label: "Careers", href: "/careers" },
  ],
  investors: [
    { label: "Investor Relations", href: "/investor-relations" },
    { label: "Financial Highlights", href: "/investor-relations#highlights" },
    { label: "Disclosures & Announcements", href: "/investor-relations#announcements" },
    { label: "Share Information", href: "/investor-relations#share-info" },
  ],
  support: [
    { label: "News", href: "/news" },
    { label: "Contact Us", href: "/contact" },
    { label: "FAQs", href: "/contact#faq" },
  ],
};
