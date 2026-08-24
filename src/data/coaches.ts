export type Coach = {
  name: string;
  role: string;
  bio: string;
  initials: string;
};

export const leadCoaches: Coach[] = [
  {
    name: "Marisol Reyes",
    role: "Head Coach & Program Director",
    bio: "Sets the coaching philosophy and curriculum across every program, from Parent & Baby Swim through the competitive team. Fifteen years coaching age-group and club swimmers.",
    initials: "MR",
  },
  {
    name: "Devon Walsh",
    role: "Competitive Team Head Coach",
    bio: "Leads the Age Group Swim Team and High School & Club Prep Training, focused on technique, race strategy, and building swimmers who love to compete.",
    initials: "DW",
  },
];

export type StaffCredential = {
  name: string;
  description: string;
};

export const staffCredentials: StaffCredential[] = [
  {
    name: "Certified Instructors",
    description: "Every coach holds a nationally recognized swim instructor certification before teaching a single class.",
  },
  {
    name: "CPR / First Aid / AED",
    description: "All coaching and lifeguard staff maintain current CPR, First Aid, and AED certification year-round.",
  },
  {
    name: "Background-Checked Staff",
    description: "Every staff member who works with swimmers passes a background check before their first day on deck.",
  },
  {
    name: "Ongoing In-Service Training",
    description: "Coaches complete regular in-service training on technique, safety protocol, and working with young swimmers.",
  },
];

export const trustIndicators = [
  { label: "Certified coaches on staff", value: "20+" },
  { label: "Swimmers enrolled", value: "800+" },
  { label: "Years teaching swimmers", value: "15+" },
  { label: "Pool locations", value: "5" },
];
