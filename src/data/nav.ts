export type NavLink = {
  label: string;
  href: string;
  description?: string;
};

export const primaryNav: NavLink[] = [
  { label: "Hearing Aids", href: "/hearing-aids", description: "Explore devices built around your life" },
  { label: "Hearing Test", href: "/hearing-test", description: "Take our free online hearing check" },
  { label: "Find a Clinic", href: "/find-a-clinic", description: "Locate a hearing-care expert near you" },
  { label: "Why Beltone", href: "/why-beltone", description: "Our approach to lifelong hearing care" },
  { label: "Hearing Health", href: "/hearing-health", description: "Articles and guidance from our experts" },
  { label: "About", href: "/about", description: "Our story, mission, and people" },
];

export const footerNav = {
  solutions: [
    { label: "Hearing Aids", href: "/hearing-aids" },
    { label: "Hearing Test", href: "/hearing-test" },
    { label: "Book an Appointment", href: "/book-appointment" },
    { label: "Find a Clinic", href: "/find-a-clinic" },
  ],
  company: [
    { label: "Why Beltone", href: "/why-beltone" },
    { label: "About Us", href: "/about" },
    { label: "Hearing Health", href: "/hearing-health" },
    { label: "Contact", href: "/contact" },
  ],
  support: [
    { label: "Contact Us", href: "/contact" },
    { label: "FAQs", href: "/contact#faq" },
    { label: "Find a Clinic", href: "/find-a-clinic" },
  ],
};
