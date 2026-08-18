export type Office = {
  country: string;
  city: string;
  isHeadquarters?: boolean;
};

/**
 * Illustrative placeholder list — verify the actual eight countries and
 * office cities against internal records before publishing.
 */
export const offices: Office[] = [
  { country: "Egypt", city: "Cairo", isHeadquarters: true },
  { country: "Kenya", city: "Nairobi" },
  { country: "Nigeria", city: "Lagos" },
  { country: "Morocco", city: "Casablanca" },
  { country: "Côte d'Ivoire", city: "Abidjan" },
  { country: "Uganda", city: "Kampala" },
  { country: "Rwanda", city: "Kigali" },
  { country: "Tanzania", city: "Dar es Salaam" },
];
