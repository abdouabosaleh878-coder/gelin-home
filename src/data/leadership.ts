export type Leader = {
  name: string;
  role: string;
  bio: string;
  initials: string;
};

/**
 * Only individuals publicly confirmed in company materials are listed here.
 * Photos are intentionally omitted (initials avatar used instead) until
 * official headshots are supplied — do not attach a stock photo to a real
 * person's name.
 */
export const executiveLeadership: Leader[] = [
  {
    name: "Syed Basar Shueb",
    role: "Chairman",
    bio: "Chairman of Beltone Holding, overseeing the Board's strategic direction across the group's financial services businesses.",
    initials: "SS",
  },
  {
    name: "Dalia Khorshid",
    role: "Group CEO & Managing Director",
    bio: "Leads Beltone Holding's day-to-day operations and execution across the group's investment banking, asset management, and financing businesses.",
    initials: "DK",
  },
];

export type GovernanceCommittee = {
  name: string;
  description: string;
};

export const governanceCommittees: GovernanceCommittee[] = [
  {
    name: "Audit Committee",
    description: "Oversees financial reporting integrity, internal controls, and the external audit relationship.",
  },
  {
    name: "Risk Committee",
    description: "Reviews the group's risk appetite and monitors credit, market, and operational risk exposure.",
  },
  {
    name: "Nomination & Remuneration Committee",
    description: "Guides board composition, succession planning, and executive compensation policy.",
  },
  {
    name: "Investment Committee",
    description: "Reviews and approves investment decisions across the group's asset management and private equity businesses.",
  },
];

export const trustIndicators = [
  { label: "Countries of operation", value: "8" },
  { label: "Group subsidiaries", value: "20+" },
  { label: "Years in financial services", value: "—" },
  { label: "Listed on", value: "EGX: BTFH" },
];
