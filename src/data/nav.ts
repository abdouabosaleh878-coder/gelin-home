export type NavLink = {
  label: string;
  href: string;
  description?: string;
};

export const primaryNav: NavLink[] = [
  { label: "Our Academy", href: "/about", description: "Our story, coaches, and pools" },
  { label: "Programs", href: "/programs", description: "Swim lessons and training for every age and level" },
  { label: "Schedule & Pricing", href: "/schedule", description: "Weekly class times and membership plans" },
  { label: "Coaches", href: "/coaches", description: "Meet our certified coaching staff" },
  { label: "News", href: "/news", description: "Academy announcements and swim tips" },
  { label: "Careers", href: "/careers", description: "Open roles and life at Current Swim Academy" },
];

export const footerNav = {
  company: [
    { label: "Our Academy", href: "/about" },
    { label: "Programs", href: "/programs" },
    { label: "Coaches", href: "/coaches" },
    { label: "Careers", href: "/careers" },
  ],
  schedule: [
    { label: "Schedule & Pricing", href: "/schedule" },
    { label: "Weekly Class Schedule", href: "/schedule#schedule" },
    { label: "Membership Plans", href: "/schedule#pricing" },
    { label: "Pool Policies", href: "/schedule#policies" },
  ],
  support: [
    { label: "News", href: "/news" },
    { label: "Contact Us", href: "/contact" },
    { label: "FAQs", href: "/contact#faq" },
  ],
};
