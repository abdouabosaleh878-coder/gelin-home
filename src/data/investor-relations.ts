/**
 * Placeholder financial figures. Replace every "—" with verified figures
 * from official, board-approved financial statements before publishing —
 * do not fill these from unverified web sources.
 */
export type FinancialHighlight = {
  label: string;
  value: string;
  period: string;
};

export const financialHighlights: FinancialHighlight[] = [
  { label: "Operating Revenue", value: "—", period: "FY placeholder" },
  { label: "Net Profit After Tax & Minority Interest", value: "—", period: "FY placeholder" },
  { label: "Lending Portfolio", value: "—", period: "FY placeholder" },
  { label: "Assets Under Management", value: "—", period: "FY placeholder" },
];

export type ShareInfo = {
  label: string;
  value: string;
};

export const shareInfo: ShareInfo[] = [
  { label: "Ticker", value: "BTFH" },
  { label: "Exchange", value: "Egyptian Exchange (EGX)" },
  { label: "Sector", value: "Financial Services" },
  { label: "Share Price", value: "—" },
];

export type Announcement = {
  id: string;
  title: string;
  category: "Financial Results" | "Corporate Action" | "Regulatory Disclosure" | "General";
  date: string;
  summary: string;
};

export const announcements: Announcement[] = [
  {
    id: "placeholder-1",
    title: "Placeholder — Quarterly financial results",
    category: "Financial Results",
    date: "—",
    summary: "Replace with the latest board-approved quarterly or annual results disclosure once available.",
  },
  {
    id: "placeholder-2",
    title: "Placeholder — Capital markets disclosure",
    category: "Regulatory Disclosure",
    date: "—",
    summary: "Replace with the relevant EGX/FRA regulatory filing or disclosure.",
  },
  {
    id: "placeholder-3",
    title: "Placeholder — Corporate action notice",
    category: "Corporate Action",
    date: "—",
    summary: "Replace with details of any capital increase, dividend, or other corporate action.",
  },
];
