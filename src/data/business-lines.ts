export type BusinessCategory = "capital-markets" | "financing" | "investments" | "advisory";

export type BusinessLine = {
  slug: string;
  name: string;
  category: BusinessCategory;
  categoryLabel: string;
  tagline: string;
  shortDescription: string;
  description: string;
  services: string[];
  clients: string[];
  image: string;
  featured?: boolean;
};

export const businessCategoryFilters: { value: BusinessCategory | "all"; label: string }[] = [
  { value: "all", label: "All Businesses" },
  { value: "capital-markets", label: "Capital Markets" },
  { value: "financing", label: "Financing" },
  { value: "investments", label: "Investments" },
  { value: "advisory", label: "Advisory & Services" },
];

const IMG_CAPITAL_MARKETS_1 = "https://images.unsplash.com/photo-1481026469463-66327c86e544?q=80&w=1200&auto=format&fit=crop";
const IMG_CAPITAL_MARKETS_2 = "https://images.unsplash.com/photo-1649003515353-c58a239cf662?q=80&w=1200&auto=format&fit=crop";
const IMG_FINANCING_1 = "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1200&auto=format&fit=crop";
const IMG_FINANCING_2 = "https://images.unsplash.com/photo-1530877872966-40bb5529f558?q=80&w=1200&auto=format&fit=crop";
const IMG_FINANCING_3 = "https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?q=80&w=1200&auto=format&fit=crop";
const IMG_FINANCING_4 = "https://images.unsplash.com/photo-1690378820474-b468b8ee64d3?q=80&w=1200&auto=format&fit=crop";
const IMG_INVESTMENTS_1 = "https://images.unsplash.com/photo-1560221328-12fe60f83ab8?q=80&w=1200&auto=format&fit=crop";
const IMG_INVESTMENTS_2 = "https://images.unsplash.com/photo-1622675363311-3e1904dc1885?q=80&w=1200&auto=format&fit=crop";
const IMG_INVESTMENTS_3 = "https://images.unsplash.com/photo-1600531529272-023c4b821f14?q=80&w=1200&auto=format&fit=crop";
const IMG_ADVISORY_1 = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop";
const IMG_ADVISORY_2 = "https://images.unsplash.com/photo-1622675363311-3e1904dc1885?q=80&w=1200&auto=format&fit=crop";

export const businessLines: BusinessLine[] = [
  {
    slug: "investment-banking",
    name: "Investment Banking",
    category: "capital-markets",
    categoryLabel: "Capital Markets",
    tagline: "Structuring capital for the region's most ambitious companies.",
    shortDescription:
      "Equity and debt capital markets, M&A advisory, and corporate finance for issuers across the region.",
    description:
      "Our investment banking team advises corporates, sponsors, and public-sector clients on capital raising, mergers and acquisitions, and strategic transactions. We combine regional market access with sector expertise to structure deals that hold up under real market conditions.",
    services: ["Equity capital markets (IPOs, rights issues)", "Debt capital markets & securitization", "Mergers & acquisitions advisory", "Corporate restructuring"],
    clients: ["Corporates", "Financial sponsors", "Public sector entities"],
    image: IMG_CAPITAL_MARKETS_1,
    featured: true,
  },
  {
    slug: "securities-brokerage-research",
    name: "Securities Brokerage & Research",
    category: "capital-markets",
    categoryLabel: "Capital Markets",
    tagline: "Execution and insight for institutional and retail investors.",
    shortDescription:
      "Full-service brokerage on the Egyptian Exchange, backed by independent equity research.",
    description:
      "We provide trade execution, custody coordination, and independent research to institutional and retail clients trading on the Egyptian Exchange and regional markets, helping investors act on timely, well-supported analysis.",
    services: ["Equity brokerage execution", "Independent equity research", "Market commentary & sector coverage", "Institutional trading desk"],
    clients: ["Institutional investors", "Retail investors", "Foreign investors"],
    image: IMG_CAPITAL_MARKETS_2,
    featured: true,
  },
  {
    slug: "asset-management",
    name: "Asset Management",
    category: "investments",
    categoryLabel: "Investments",
    tagline: "Managing capital across mandates, funds, and portfolios.",
    shortDescription:
      "Discretionary portfolios and mutual funds spanning equities, fixed income, and money markets.",
    description:
      "Our asset management platform builds and manages investment portfolios and funds across asset classes, tailored to institutional mandates and individual investor objectives, with a disciplined, research-driven process.",
    services: ["Discretionary portfolio management", "Mutual funds", "Money market funds", "Institutional mandates"],
    clients: ["Institutions", "High-net-worth individuals", "Corporates"],
    image: IMG_INVESTMENTS_1,
    featured: true,
  },
  {
    slug: "consumer-finance",
    name: "Consumer Finance",
    category: "financing",
    categoryLabel: "Financing",
    tagline: "Everyday financing, delivered through trusted consumer brands.",
    shortDescription:
      "Consumer lending and installment financing delivered through our group of specialized subsidiaries.",
    description:
      "Through our consumer finance subsidiaries, we extend accessible installment and personal financing to individuals, partnering with merchants and service providers to make everyday purchases more manageable.",
    services: ["Installment financing", "Personal finance", "Point-of-sale lending partnerships"],
    clients: ["Individual consumers", "Retail & merchant partners"],
    image: IMG_FINANCING_1,
  },
  {
    slug: "mortgage-finance",
    name: "Mortgage Finance",
    category: "financing",
    categoryLabel: "Financing",
    tagline: "Financing the path to homeownership.",
    shortDescription:
      "Residential and commercial mortgage financing for homebuyers and developers.",
    description:
      "Our mortgage finance business supports individuals and developers with structured financing for residential and commercial property, working alongside our real estate business to serve the full housing value chain.",
    services: ["Residential mortgage financing", "Developer & commercial financing", "Refinancing solutions"],
    clients: ["Homebuyers", "Real estate developers"],
    image: IMG_FINANCING_2,
  },
  {
    slug: "leasing-factoring",
    name: "Leasing & Factoring",
    category: "financing",
    categoryLabel: "Financing",
    tagline: "Working capital and asset financing for growing businesses.",
    shortDescription:
      "Equipment leasing and receivables factoring that keep businesses' cash flow moving.",
    description:
      "We help businesses acquire the equipment and working capital they need without tying up balance-sheet cash, through structured leasing arrangements and receivables factoring.",
    services: ["Equipment & asset leasing", "Receivables factoring", "Working capital solutions"],
    clients: ["SMEs", "Corporates"],
    image: IMG_FINANCING_3,
  },
  {
    slug: "sme-microfinance",
    name: "SME & Microfinance",
    category: "financing",
    categoryLabel: "Financing",
    tagline: "Capital for entrepreneurs and small businesses.",
    shortDescription:
      "Financing tailored to small and medium enterprises and micro-entrepreneurs.",
    description:
      "Our SME and microfinance business extends financing to small and medium enterprises and individual entrepreneurs who are often underserved by traditional lenders, supporting local economic activity across our markets.",
    services: ["SME term loans", "Microfinance lending", "Business advisory support"],
    clients: ["Small & medium enterprises", "Micro-entrepreneurs"],
    image: IMG_FINANCING_4,
  },
  {
    slug: "private-equity-venture-capital",
    name: "Private Equity & Venture Capital",
    category: "investments",
    categoryLabel: "Investments",
    tagline: "Long-term capital for companies built to scale.",
    shortDescription:
      "Growth and venture capital investments in high-potential private companies.",
    description:
      "We invest growth and venture capital into private companies with strong fundamentals and scalable models, partnering with founders and management teams beyond the initial check.",
    services: ["Growth equity investments", "Venture capital", "Portfolio company support"],
    clients: ["Founders & entrepreneurs", "Co-investors"],
    image: IMG_INVESTMENTS_2,
  },
  {
    slug: "real-estate",
    name: "Real Estate",
    category: "investments",
    categoryLabel: "Investments",
    tagline: "Developing and investing across the real estate value chain.",
    shortDescription:
      "Real estate development and investment spanning residential and commercial assets.",
    description:
      "Our real estate business identifies, develops, and invests in residential and commercial projects, working closely with our mortgage finance business to support end-to-end property solutions.",
    services: ["Residential development", "Commercial real estate investment", "Project & asset management"],
    clients: ["Homebuyers", "Institutional co-investors"],
    image: IMG_INVESTMENTS_3,
  },
  {
    slug: "data-science-ai",
    name: "Data Science & AI",
    category: "advisory",
    categoryLabel: "Advisory & Services",
    tagline: "Turning data into a decision-making advantage.",
    shortDescription:
      "Analytics, credit scoring, and applied AI capabilities that power decisions across the group.",
    description:
      "Our data science and AI team builds the analytical infrastructure behind the group's lending, risk, and investment decisions, and extends those capabilities to clients seeking data-driven advantage.",
    services: ["Credit scoring & risk models", "Predictive analytics", "Applied AI solutions"],
    clients: ["Group subsidiaries", "External enterprise clients"],
    image: IMG_ADVISORY_1,
  },
  {
    slug: "hr-consulting-training",
    name: "HR Consulting & Training",
    category: "advisory",
    categoryLabel: "Advisory & Services",
    tagline: "Building the talent and capability behind great organizations.",
    shortDescription:
      "HR advisory, organizational design, and professional training for businesses across sectors.",
    description:
      "We advise organizations on talent strategy, organizational design, and workforce development, and deliver professional training programs that build capability at every level.",
    services: ["HR & organizational advisory", "Talent strategy", "Professional training programs"],
    clients: ["Corporates", "Public sector organizations"],
    image: IMG_ADVISORY_2,
  },
];

export function getBusinessLineBySlug(slug: string) {
  return businessLines.find((line) => line.slug === slug);
}

export function getRelatedBusinessLines(slug: string, count = 3) {
  const current = getBusinessLineBySlug(slug);
  if (!current) return businessLines.slice(0, count);
  return businessLines
    .filter((line) => line.slug !== slug)
    .sort((a, b) => (a.category === current.category ? -1 : 0) - (b.category === current.category ? -1 : 0))
    .slice(0, count);
}
