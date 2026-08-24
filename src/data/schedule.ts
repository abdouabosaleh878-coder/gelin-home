/**
 * Placeholder class schedule and pricing. Replace with live times and rates
 * for each location before publishing.
 */
export type ScheduleSlot = {
  day: string;
  time: string;
  className: string;
  level: string;
};

export const weeklySchedule: ScheduleSlot[] = [
  { day: "Monday", time: "9:00 – 9:30 AM", className: "Parent & Baby Swim", level: "Infants" },
  { day: "Monday", time: "4:00 – 4:45 PM", className: "Youth Learn-to-Swim", level: "Levels 1–3" },
  { day: "Monday", time: "6:00 – 7:15 PM", className: "Age Group Swim Team", level: "Practice" },
  { day: "Tuesday", time: "9:30 – 10:15 AM", className: "Aqua Fitness & Water Aerobics", level: "All levels" },
  { day: "Tuesday", time: "5:00 – 5:45 PM", className: "Preschool Swim", level: "Ages 3–5" },
  { day: "Wednesday", time: "6:00 – 6:45 AM", className: "Masters Swimming", level: "Pace groups" },
  { day: "Wednesday", time: "4:30 – 5:15 PM", className: "Adult Beginner Lessons", level: "Beginner" },
  { day: "Thursday", time: "4:00 – 4:45 PM", className: "Youth Learn-to-Swim", level: "Levels 4–6" },
  { day: "Thursday", time: "6:00 – 7:15 PM", className: "High School & Club Prep Training", level: "Practice" },
  { day: "Saturday", time: "9:00 AM – 12:00 PM", className: "Private & Semi-Private Lessons", level: "By appointment" },
  { day: "Saturday", time: "10:00 – 10:45 AM", className: "Youth Learn-to-Swim", level: "Levels 1–3" },
  { day: "Sunday", time: "1:00 – 1:45 PM", className: "Aqua Fitness & Water Aerobics", level: "All levels" },
];

export type PricingPlan = {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  highlighted?: boolean;
};

export const pricingPlans: PricingPlan[] = [
  {
    name: "Group Lessons",
    price: "$99",
    period: "per month",
    description: "One weekly group class in Parent & Baby, Preschool, Youth Learn-to-Swim, or Adult Beginner.",
    features: ["1 class per week", "Skill assessments & level-ups", "Access to open swim hours"],
  },
  {
    name: "Semi-Private",
    price: "$189",
    period: "per month",
    description: "Weekly coaching in a group of 3 or fewer, matched to your swimmer's goals.",
    features: ["1 class per week, group of ≤3", "Personalized progress notes", "Priority scheduling"],
    highlighted: true,
  },
  {
    name: "Private Lessons",
    price: "$65",
    period: "per session",
    description: "One-on-one coaching booked by the session — ideal for focused, goal-driven progress.",
    features: ["Fully 1-on-1", "Book by the session, no monthly commitment", "Available at all 5 locations"],
  },
  {
    name: "Competitive Team",
    price: "$149",
    period: "per month",
    description: "Full Age Group Swim Team or Club Prep membership, including meet entries.",
    features: ["3–5 practices per week", "Meet entry fees included", "Team suit & cap included"],
  },
];

export type PoolPolicy = {
  title: string;
  description: string;
};

export const poolPolicies: PoolPolicy[] = [
  { title: "Makeup classes", description: "Missed group classes can be made up in another class at the same level within the same session, based on availability." },
  { title: "Cancellations", description: "Private and semi-private lessons cancelled with at least 24 hours' notice can be rescheduled at no charge." },
  { title: "What to bring", description: "Swimsuit, towel, and goggles (recommended for ages 4+). Swim diapers are required for non-toilet-trained children." },
  { title: "Guardian supervision", description: "A parent or guardian must remain on-site for all swimmers under age 8, and in the water for Parent & Baby Swim." },
];
