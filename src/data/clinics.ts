export type Clinic = {
  id: string;
  name: string;
  city: string;
  state: string;
  address: string;
  phone: string;
  hours: { day: string; time: string }[];
  services: string[];
  lat: number;
  lng: number;
  rating: number;
  reviewCount: number;
};

export const clinics: Clinic[] = [
  {
    id: "downtown-riverside",
    name: "Beltone Downtown Riverside",
    city: "Riverside",
    state: "CA",
    address: "482 Market Street, Suite 100, Riverside, CA 92501",
    phone: "(951) 555-0142",
    hours: [
      { day: "Mon–Fri", time: "9:00 AM – 5:30 PM" },
      { day: "Saturday", time: "9:00 AM – 1:00 PM" },
      { day: "Sunday", time: "Closed" },
    ],
    services: ["Free hearing assessment", "Hearing aid fitting", "Repairs & maintenance", "Tinnitus consultation"],
    lat: 33.9806,
    lng: -117.3755,
    rating: 4.9,
    reviewCount: 214,
  },
  {
    id: "lakeview-plaza",
    name: "Beltone Lakeview Plaza",
    city: "Chicago",
    state: "IL",
    address: "1215 Lakeview Avenue, Chicago, IL 60614",
    phone: "(312) 555-0198",
    hours: [
      { day: "Mon–Fri", time: "8:30 AM – 5:00 PM" },
      { day: "Saturday", time: "10:00 AM – 2:00 PM" },
      { day: "Sunday", time: "Closed" },
    ],
    services: ["Free hearing assessment", "Hearing aid fitting", "Custom ear protection", "Pediatric hearing care"],
    lat: 41.9295,
    lng: -87.6389,
    rating: 4.8,
    reviewCount: 356,
  },
  {
    id: "harborview",
    name: "Beltone Harborview",
    city: "Seattle",
    state: "WA",
    address: "77 Harbor Way, Seattle, WA 98101",
    phone: "(206) 555-0176",
    hours: [
      { day: "Mon–Fri", time: "9:00 AM – 6:00 PM" },
      { day: "Saturday", time: "9:00 AM – 12:00 PM" },
      { day: "Sunday", time: "Closed" },
    ],
    services: ["Free hearing assessment", "Hearing aid fitting", "Repairs & maintenance", "Bluetooth device setup"],
    lat: 47.6062,
    lng: -122.3321,
    rating: 4.9,
    reviewCount: 189,
  },
  {
    id: "midtown-atlanta",
    name: "Beltone Midtown",
    city: "Atlanta",
    state: "GA",
    address: "930 Peachtree Street NE, Atlanta, GA 30309",
    phone: "(404) 555-0163",
    hours: [
      { day: "Mon–Fri", time: "8:00 AM – 5:00 PM" },
      { day: "Saturday", time: "By appointment" },
      { day: "Sunday", time: "Closed" },
    ],
    services: ["Free hearing assessment", "Hearing aid fitting", "Tinnitus consultation", "House-call visits"],
    lat: 33.7838,
    lng: -84.3833,
    rating: 4.7,
    reviewCount: 142,
  },
  {
    id: "brookline-village",
    name: "Beltone Brookline Village",
    city: "Boston",
    state: "MA",
    address: "58 Boylston Street, Boston, MA 02116",
    phone: "(617) 555-0119",
    hours: [
      { day: "Mon–Fri", time: "9:00 AM – 5:30 PM" },
      { day: "Saturday", time: "9:00 AM – 1:00 PM" },
      { day: "Sunday", time: "Closed" },
    ],
    services: ["Free hearing assessment", "Hearing aid fitting", "Custom ear protection", "Repairs & maintenance"],
    lat: 42.3505,
    lng: -71.0810,
    rating: 4.9,
    reviewCount: 268,
  },
  {
    id: "sunset-district",
    name: "Beltone Sunset District",
    city: "San Francisco",
    state: "CA",
    address: "2140 Irving Street, San Francisco, CA 94122",
    phone: "(415) 555-0184",
    hours: [
      { day: "Mon–Fri", time: "9:00 AM – 5:00 PM" },
      { day: "Saturday", time: "10:00 AM – 2:00 PM" },
      { day: "Sunday", time: "Closed" },
    ],
    services: ["Free hearing assessment", "Hearing aid fitting", "Bluetooth device setup", "Pediatric hearing care"],
    lat: 37.7633,
    lng: -122.4764,
    rating: 4.8,
    reviewCount: 176,
  },
];

export function searchClinics(query: string) {
  if (!query.trim()) return clinics;
  const q = query.trim().toLowerCase();
  return clinics.filter(
    (clinic) =>
      clinic.city.toLowerCase().includes(q) ||
      clinic.state.toLowerCase().includes(q) ||
      clinic.name.toLowerCase().includes(q) ||
      clinic.address.toLowerCase().includes(q)
  );
}

export function getClinicById(id: string) {
  return clinics.find((clinic) => clinic.id === id);
}
