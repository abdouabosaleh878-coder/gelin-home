export type ProductCategory = "receiver-in-canal" | "in-the-ear" | "completely-in-canal" | "behind-the-ear";

export type ProductFeature =
  | "Bluetooth Streaming"
  | "Rechargeable Battery"
  | "Discreet Fit"
  | "Smartphone App Control"
  | "Tinnitus Relief"
  | "Made for iPhone & Android"
  | "Water Resistant"
  | "Fall Alert";

export type Product = {
  slug: string;
  name: string;
  tagline: string;
  category: ProductCategory;
  categoryLabel: string;
  shortDescription: string;
  description: string;
  image: string;
  gallery: string[];
  price: "Essential" | "Advanced" | "Premium";
  features: ProductFeature[];
  benefits: string[];
  technicalFeatures: { label: string; value: string }[];
  compatibility: string[];
  colors: { name: string; hex: string }[];
  bestFor: string[];
  batteryLife: string;
  featured?: boolean;
};

export const products: Product[] = [
  {
    slug: "beltone-serene-rie",
    name: "Beltone Serene",
    tagline: "Effortless hearing, beautifully discreet.",
    category: "receiver-in-canal",
    categoryLabel: "Receiver-in-Canal",
    shortDescription:
      "Our most popular everyday hearing aid — small, rechargeable, and built for natural, all-day sound.",
    description:
      "Beltone Serene pairs a slim receiver-in-canal design with our clearest sound processing yet. It's tuned to pick out the voice you're listening to in a crowded room, then fade the rest into the background — so conversation feels natural again, not amplified.",
    image:
      "https://images.unsplash.com/photo-1692160756374-6f68339df7cd?q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1692160756374-6f68339df7cd?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1639195612006-b78f028c552a?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1667581278300-a4035a2a5cd8?q=80&w=1200&auto=format&fit=crop",
    ],
    price: "Premium",
    features: [
      "Bluetooth Streaming",
      "Rechargeable Battery",
      "Discreet Fit",
      "Smartphone App Control",
      "Made for iPhone & Android",
    ],
    benefits: [
      "Follow conversations in noisy restaurants and family gatherings",
      "Stream calls, music, and podcasts directly from your phone",
      "One charge lasts a full day, including streaming time",
      "Nearly invisible fit behind the ear",
    ],
    technicalFeatures: [
      { label: "Processing channels", value: "24-channel adaptive sound processor" },
      { label: "Connectivity", value: "Bluetooth LE, Made for iPhone & Android" },
      { label: "Charging", value: "Wireless charging case, 30-minute quick charge" },
      { label: "Environments", value: "6 automatic sound environments" },
    ],
    compatibility: ["iOS 15+", "Android 10+", "Beltone HearMax app", "TV Streamer accessory"],
    colors: [
      { name: "Graphite", hex: "#2b3138" },
      { name: "Champagne", hex: "#cbb89d" },
      { name: "Silver Mist", hex: "#b7bdc4" },
      { name: "Warm Brown", hex: "#5c4433" },
    ],
    bestFor: ["Active lifestyles", "Frequent phone calls", "Restaurants & social settings"],
    batteryLife: "Up to 24 hours, including 5 hours of streaming",
    featured: true,
  },
  {
    slug: "beltone-imagine-custom",
    name: "Beltone Imagine",
    tagline: "Custom-molded comfort, made for you.",
    category: "in-the-ear",
    categoryLabel: "In-the-Ear",
    shortDescription:
      "A custom-molded design shaped from an impression of your ear for a secure, all-day comfortable fit.",
    description:
      "Beltone Imagine is custom-built from a precise impression of your ear canal, so it sits securely and comfortably from the first day. It's an excellent option if you want a self-contained device with straightforward controls and dependable performance.",
    image:
      "https://images.unsplash.com/photo-1623376550324-d406ae677c04?q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1623376550324-d406ae677c04?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1709136494912-ab178d0d85c9?q=80&w=1200&auto=format&fit=crop",
    ],
    price: "Advanced",
    features: ["Bluetooth Streaming", "Discreet Fit", "Water Resistant", "Made for iPhone & Android"],
    benefits: [
      "Custom shell molded to your unique ear shape",
      "Simple push-button controls, no fine motor skills required",
      "Sweat and weather resistant for daily wear",
      "Long battery life on a single size 312 battery",
    ],
    technicalFeatures: [
      { label: "Processing channels", value: "20-channel sound processor" },
      { label: "Connectivity", value: "Bluetooth LE audio streaming" },
      { label: "Power", value: "Size 312 replaceable battery, ~7 days" },
      { label: "Durability", value: "IP68 water and dust resistance" },
    ],
    compatibility: ["iOS 14+", "Android 10+", "Beltone HearMax app"],
    colors: [
      { name: "Soft Beige", hex: "#e8d3b8" },
      { name: "Cocoa", hex: "#6b4a34" },
      { name: "Slate", hex: "#4c5561" },
    ],
    bestFor: ["First-time wearers", "Simple, tactile controls", "Active or outdoor days"],
    batteryLife: "Approximately 7 days per battery",
  },
  {
    slug: "beltone-quietus-cic",
    name: "Beltone Quietus",
    tagline: "The nearly invisible choice.",
    category: "completely-in-canal",
    categoryLabel: "Completely-in-Canal",
    shortDescription:
      "Our smallest custom device, sitting deep in the ear canal for a virtually invisible profile.",
    description:
      "For those who want their hearing aid to go unnoticed, Beltone Quietus sits deep within the ear canal, using your ear's natural shape to help capture sound the way it was meant to be heard — clear, directional, and remarkably discreet.",
    image:
      "https://images.unsplash.com/photo-1596088728260-08a654466a00?q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1596088728260-08a654466a00?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1692160756374-6f68339df7cd?q=80&w=1200&auto=format&fit=crop",
    ],
    price: "Advanced",
    features: ["Discreet Fit", "Water Resistant"],
    benefits: [
      "Virtually invisible, even to those close to you",
      "Uses the natural shape of your outer ear to localize sound",
      "No visible tubing, wires, or behind-the-ear components",
      "Comfortable for glasses and mask wearers",
    ],
    technicalFeatures: [
      { label: "Processing channels", value: "16-channel sound processor" },
      { label: "Fit", value: "Fully custom shell, deep canal placement" },
      { label: "Power", value: "Size 10 replaceable battery, ~5 days" },
      { label: "Durability", value: "IP67 water and dust resistance" },
    ],
    compatibility: ["Remote control accessory", "In-clinic programming"],
    colors: [
      { name: "Skin Tone Light", hex: "#e3c4a1" },
      { name: "Skin Tone Deep", hex: "#8a5a3b" },
    ],
    bestFor: ["Discretion-first wearers", "Glasses & mask wearers", "Mild to moderate hearing loss"],
    batteryLife: "Approximately 5 days per battery",
  },
  {
    slug: "beltone-amplify-bte",
    name: "Beltone Amplify",
    tagline: "Powerful support for every hearing level.",
    category: "behind-the-ear",
    categoryLabel: "Behind-the-Ear",
    shortDescription:
      "A robust behind-the-ear design with the widest power range, plus large, easy-to-use controls.",
    description:
      "Beltone Amplify is built for power and durability. Its behind-the-ear design accommodates a wide range of hearing loss levels, from mild to severe, and its larger housing means bigger, easier-to-use buttons and a battery that lasts.",
    image:
      "https://images.unsplash.com/photo-1639195612006-b78f028c552a?q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1639195612006-b78f028c552a?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1667581278300-a4035a2a5cd8?q=80&w=1200&auto=format&fit=crop",
    ],
    price: "Essential",
    features: ["Rechargeable Battery", "Made for iPhone & Android", "Fall Alert", "Water Resistant"],
    benefits: [
      "Wide power range supports mild to severe hearing loss",
      "Large, tactile buttons that are easy to find and press",
      "Optional fall-detection alert shared with a trusted contact",
      "Rechargeable option removes the need for tiny batteries",
    ],
    technicalFeatures: [
      { label: "Processing channels", value: "18-channel sound processor" },
      { label: "Connectivity", value: "Bluetooth LE, Made for iPhone & Android" },
      { label: "Charging", value: "Rechargeable or size 13 battery options" },
      { label: "Safety", value: "Optional fall alert with caregiver notification" },
    ],
    compatibility: ["iOS 14+", "Android 10+", "Beltone HearMax app", "Caregiver companion app"],
    colors: [
      { name: "Classic Beige", hex: "#dcc7a8" },
      { name: "Charcoal", hex: "#33383f" },
    ],
    bestFor: ["Severe hearing loss", "Caregiver support needs", "Easy handling & large controls"],
    batteryLife: "Up to 30 hours rechargeable, or 10 days on battery",
    featured: true,
  },
  {
    slug: "beltone-align-rie",
    name: "Beltone Align",
    tagline: "Smart sound that adapts as you move.",
    category: "receiver-in-canal",
    categoryLabel: "Receiver-in-Canal",
    shortDescription:
      "An entry-friendly receiver-in-canal hearing aid with smart environment detection and app control.",
    description:
      "Beltone Align is designed for people newer to hearing aids who still want smart features. It automatically senses whether you're in a quiet room, a busy street, or a windy park, and gently adjusts so you rarely need to touch a control.",
    image:
      "https://images.unsplash.com/photo-1709136494912-ab178d0d85c9?q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1709136494912-ab178d0d85c9?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1623376550324-d406ae677c04?q=80&w=1200&auto=format&fit=crop",
    ],
    price: "Essential",
    features: ["Rechargeable Battery", "Discreet Fit", "Smartphone App Control"],
    benefits: [
      "Automatic environment detection — no manual switching",
      "Lightweight, comfortable fit for all-day wear",
      "Simple companion app for volume and settings",
      "Friendly price point for first-time wearers",
    ],
    technicalFeatures: [
      { label: "Processing channels", value: "12-channel sound processor" },
      { label: "Connectivity", value: "Bluetooth LE app control" },
      { label: "Charging", value: "Rechargeable, 20-hour battery life" },
      { label: "Environments", value: "4 automatic sound environments" },
    ],
    compatibility: ["iOS 15+", "Android 11+", "Beltone HearMax app"],
    colors: [
      { name: "Silver Mist", hex: "#b7bdc4" },
      { name: "Warm Brown", hex: "#5c4433" },
    ],
    bestFor: ["First-time wearers", "Everyday comfort", "Value-conscious buyers"],
    batteryLife: "Up to 20 hours per charge",
  },
  {
    slug: "beltone-horizon-tinnitus",
    name: "Beltone Horizon",
    tagline: "Relief for hearing loss and tinnitus, together.",
    category: "receiver-in-canal",
    categoryLabel: "Receiver-in-Canal",
    shortDescription:
      "Combines advanced hearing support with built-in tinnitus-relief sound therapy.",
    description:
      "Beltone Horizon is built for people managing both hearing loss and tinnitus. Alongside clear, natural amplification, it offers customizable soothing sound therapy that can be layered in whenever ringing or buzzing becomes distracting.",
    image:
      "https://images.unsplash.com/photo-1667581278300-a4035a2a5cd8?q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1667581278300-a4035a2a5cd8?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1596088728260-08a654466a00?q=80&w=1200&auto=format&fit=crop",
    ],
    price: "Premium",
    features: ["Tinnitus Relief", "Bluetooth Streaming", "Rechargeable Battery", "Made for iPhone & Android"],
    benefits: [
      "Built-in, customizable tinnitus sound therapy",
      "Clear amplification tuned to your hearing profile",
      "Track and adjust relief sounds from your phone",
      "Rechargeable for effortless daily use",
    ],
    technicalFeatures: [
      { label: "Processing channels", value: "24-channel adaptive sound processor" },
      { label: "Tinnitus therapy", value: "Customizable broadband and nature sounds" },
      { label: "Connectivity", value: "Bluetooth LE, Made for iPhone & Android" },
      { label: "Charging", value: "Wireless charging case" },
    ],
    compatibility: ["iOS 15+", "Android 10+", "Beltone HearMax app"],
    colors: [
      { name: "Graphite", hex: "#2b3138" },
      { name: "Champagne", hex: "#cbb89d" },
    ],
    bestFor: ["Tinnitus management", "Combined hearing loss & tinnitus", "Streaming & connectivity"],
    batteryLife: "Up to 22 hours, including streaming and sound therapy",
    featured: true,
  },
];

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getRelatedProducts(slug: string, count = 3) {
  const current = getProductBySlug(slug);
  if (!current) return products.slice(0, count);
  return products
    .filter((product) => product.slug !== slug)
    .sort((a, b) => {
      const aScore = a.category === current.category ? 1 : 0;
      const bScore = b.category === current.category ? 1 : 0;
      return bScore - aScore;
    })
    .slice(0, count);
}

export const categoryFilters: { value: ProductCategory | "all"; label: string }[] = [
  { value: "all", label: "All Styles" },
  { value: "receiver-in-canal", label: "Receiver-in-Canal" },
  { value: "in-the-ear", label: "In-the-Ear" },
  { value: "completely-in-canal", label: "Completely-in-Canal" },
  { value: "behind-the-ear", label: "Behind-the-Ear" },
];
