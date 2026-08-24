export type JobOpening = {
  id: string;
  title: string;
  department: string;
  location: string;
  type: "Full-time" | "Part-time" | "Seasonal";
};

/**
 * Placeholder openings — replace with live listings from the applicant tracking system.
 */
export const jobOpenings: JobOpening[] = [
  { id: "placeholder-1", title: "Swim Instructor — Youth Programs", department: "Youth Programs", location: "Downtown Austin", type: "Part-time" },
  { id: "placeholder-2", title: "Competitive Team Assistant Coach", department: "Competitive Teams", location: "Downtown Austin", type: "Full-time" },
  { id: "placeholder-3", title: "Certified Lifeguard", department: "Aquatics Safety", location: "Multiple locations", type: "Part-time" },
  { id: "placeholder-4", title: "Aqua Fitness Instructor", department: "Fitness & Wellness", location: "Cedar Park", type: "Part-time" },
  { id: "placeholder-5", title: "Summer Camp Counselor", department: "Youth Programs", location: "Multiple locations", type: "Seasonal" },
];

export type CareerValue = {
  title: string;
  description: string;
};

export const careerValues: CareerValue[] = [
  { title: "Water safety first", description: "Every decision on deck starts with the safety of the swimmers in front of us." },
  { title: "Real coaching development", description: "We invest in certification, mentorship, and in-service training so coaches keep growing." },
  { title: "Patience & encouragement", description: "We look for people who can meet a nervous first-timer and a competitive racer with equal care." },
  { title: "Team over individual", description: "Our coaches back each other up and share what works across programs and pools." },
];
