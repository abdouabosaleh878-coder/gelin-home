export type Location = {
  name: string;
  area: string;
  isHeadquarters?: boolean;
};

export const locations: Location[] = [
  { name: "Downtown Aquatic Center", area: "Downtown Austin", isHeadquarters: true },
  { name: "Cedar Park Branch", area: "Cedar Park" },
  { name: "Round Rock Branch", area: "Round Rock" },
  { name: "South Austin Branch", area: "South Austin" },
  { name: "Westlake Branch", area: "Westlake" },
];
