export type TeamMember = {
  name: string;
  role: string;
  credentials: string;
  bio: string;
  image: string;
};

export const teamMembers: TeamMember[] = [
  {
    name: "Dr. Elena Marsh",
    role: "Chief Audiology Officer",
    credentials: "Au.D., Ph.D.",
    bio: "Elena has spent over 20 years advancing hearing care, leading Beltone's clinical training programs and patient-care standards nationwide.",
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "James Ruiz",
    role: "Director of Hearing Instrument Sciences",
    credentials: "BC-HIS",
    bio: "James works directly with patients and product teams to make sure new hearing technology translates into real, everyday benefit.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Dr. Priya Nair",
    role: "Head of Patient Experience",
    credentials: "Au.D.",
    bio: "Priya designs the patient journey from first assessment through ongoing support, with a focus on comfort, clarity, and trust.",
    image:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Marcus Bell",
    role: "VP of Clinic Operations",
    credentials: "M.B.A.",
    bio: "Marcus oversees the national network of Beltone clinics, ensuring every location delivers the same standard of care.",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600&auto=format&fit=crop",
  },
];

export type Milestone = {
  year: string;
  title: string;
  description: string;
};

export const milestones: Milestone[] = [
  {
    year: "1940",
    title: "Beltone is founded",
    description: "Beltone opens its first hearing care office, built on a simple idea: everyone deserves to hear the people they love.",
  },
  {
    year: "1970",
    title: "Nationwide clinic network",
    description: "Expansion brings personalized hearing care within reach of communities across the country.",
  },
  {
    year: "1998",
    title: "Digital hearing aids",
    description: "Beltone introduces fully digital sound processing, a major leap in clarity and comfort.",
  },
  {
    year: "2015",
    title: "Smartphone connectivity",
    description: "Bluetooth streaming and mobile app control bring hearing aids into the smartphone era.",
  },
  {
    year: "2026",
    title: "Personalized care for every life stage",
    description: "Today, Beltone combines advanced technology with lifelong, human-centered support at every clinic.",
  },
];

export const trustIndicators = [
  { label: "Years of hearing care experience", value: "85+" },
  { label: "Clinics nationwide", value: "1,500+" },
  { label: "Patients helped to hear better", value: "2M+" },
  { label: "Average patient satisfaction", value: "4.8/5" },
];
