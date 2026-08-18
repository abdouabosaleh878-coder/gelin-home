export type JobOpening = {
  id: string;
  title: string;
  department: string;
  location: string;
  type: "Full-time" | "Internship";
};

/**
 * Placeholder openings — replace with live listings from the applicant tracking system.
 */
export const jobOpenings: JobOpening[] = [
  { id: "placeholder-1", title: "Investment Banking Analyst", department: "Investment Banking", location: "Cairo, Egypt", type: "Full-time" },
  { id: "placeholder-2", title: "Equity Research Associate", department: "Securities Brokerage & Research", location: "Cairo, Egypt", type: "Full-time" },
  { id: "placeholder-3", title: "Credit Risk Analyst", department: "Consumer Finance", location: "Cairo, Egypt", type: "Full-time" },
  { id: "placeholder-4", title: "Data Scientist", department: "Data Science & AI", location: "Cairo, Egypt", type: "Full-time" },
  { id: "placeholder-5", title: "Summer Analyst Program", department: "Group-wide", location: "Multiple locations", type: "Internship" },
];

export type CareerValue = {
  title: string;
  description: string;
};

export const careerValues: CareerValue[] = [
  { title: "Ownership", description: "We give people real responsibility early, and back their decisions with support." },
  { title: "Rigor", description: "We hold our analysis, our risk decisions, and our client work to a high standard." },
  { title: "Regional perspective", description: "We think and build across markets, not just from a single headquarters." },
  { title: "Long-term thinking", description: "We build careers, client relationships, and businesses meant to last." },
];
