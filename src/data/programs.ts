export type ProgramCategory = "youth" | "adult" | "competitive" | "wellness";

export type Program = {
  slug: string;
  name: string;
  category: ProgramCategory;
  categoryLabel: string;
  tagline: string;
  shortDescription: string;
  description: string;
  highlights: string[];
  idealFor: string[];
  image: string;
  featured?: boolean;
};

export const programCategoryFilters: { value: ProgramCategory | "all"; label: string }[] = [
  { value: "all", label: "All Programs" },
  { value: "youth", label: "Youth Programs" },
  { value: "adult", label: "Adult Programs" },
  { value: "competitive", label: "Competitive Teams" },
  { value: "wellness", label: "Fitness & Wellness" },
];

const IMG_KIDS_KICKBOARDS = "https://images.unsplash.com/photo-1651614158095-b98b6c1da74b?q=80&w=1200&auto=format&fit=crop";
const IMG_GIRL_GOGGLES_SPLASH = "https://images.unsplash.com/photo-1574744918163-6cef6f4a31b0?q=80&w=1200&auto=format&fit=crop";
const IMG_BOY_KICKBOARD_SMILE = "https://images.unsplash.com/photo-1542497299-99d5862669b4?q=80&w=1200&auto=format&fit=crop";
const IMG_WOMAN_SPLASH = "https://images.unsplash.com/photo-1602019248763-e75f48b55a2a?q=80&w=1200&auto=format&fit=crop";
const IMG_PRIVATE_COACH = "https://images.unsplash.com/photo-1541689186060-3b08be2fd22f?q=80&w=1200&auto=format&fit=crop";
const IMG_RACE_LANES = "https://images.unsplash.com/photo-1629035019466-0d46b13c2bcf?q=80&w=1200&auto=format&fit=crop";
const IMG_STARTING_BLOCKS = "https://images.unsplash.com/photo-1560090947-5307abc46ffc?q=80&w=1200&auto=format&fit=crop";
const IMG_SOLO_UNDERWATER = "https://images.unsplash.com/photo-1572565408388-cdd3afe23e82?q=80&w=1200&auto=format&fit=crop";
const IMG_AQUA_FITNESS_CLASS = "https://images.unsplash.com/photo-1778137859976-0a59e7d98c4b?q=80&w=1200&auto=format&fit=crop";
const IMG_CAMP_NOODLES = "https://images.unsplash.com/photo-1639477651629-3afd5d79654d?q=80&w=1200&auto=format&fit=crop";
const IMG_LIFEGUARD_WATCH = "https://images.unsplash.com/photo-1495157907198-a5b997c29047?q=80&w=1200&auto=format&fit=crop";

export const programs: Program[] = [
  {
    slug: "parent-baby-swim",
    name: "Parent & Baby Swim",
    category: "youth",
    categoryLabel: "Youth Programs",
    tagline: "Water confidence for the very youngest swimmers.",
    shortDescription:
      "Gentle, guardian-in-the-water classes that introduce infants and toddlers to the pool safely and joyfully.",
    description:
      "Parent & Baby Swim is a guardian-in-the-water class built around songs, floating games, and gentle submersion practice. Our coaches work alongside you to build your child's comfort in the water while teaching parents the fundamentals of safe in-water handling.",
    highlights: ["Small classes of 6 families or fewer", "Warm-water teaching pool (86°F+)", "Guardian required in the water"],
    idealFor: ["Infants 6–36 months", "Parents & caregivers"],
    image: IMG_KIDS_KICKBOARDS,
  },
  {
    slug: "preschool-swim",
    name: "Preschool Swim",
    category: "youth",
    categoryLabel: "Youth Programs",
    tagline: "Building independence, one skill at a time.",
    shortDescription:
      "Skill-based lessons for ages 3–5 that build independent floating, kicking, and breath control.",
    description:
      "Preschool Swim moves young swimmers from guardian-assisted comfort toward independence in the water. Through a structured, skill-based curriculum, children learn to float, kick, blow bubbles, and eventually swim short distances unassisted, all in a low ratio, encouraging setting.",
    highlights: ["Max 4 swimmers per coach", "Skill badges track progress each session", "Runs in 6-week sessions year-round"],
    idealFor: ["Ages 3–5", "First-time independent swimmers"],
    image: IMG_GIRL_GOGGLES_SPLASH,
    featured: true,
  },
  {
    slug: "youth-learn-to-swim",
    name: "Youth Learn-to-Swim",
    category: "youth",
    categoryLabel: "Youth Programs",
    tagline: "From first strokes to all four competitive strokes.",
    shortDescription:
      "Our core levels program for ages 6–12, progressing from basic water safety to freestyle, backstroke, breaststroke, and butterfly.",
    description:
      "Youth Learn-to-Swim is our most popular program, taking kids from their very first strokes through all four competitive strokes across a leveled curriculum. Coaches assess each swimmer's technique every session and promote them through levels as skills are mastered, so no two swimmers move at the same pace.",
    highlights: ["Six leveled stages with clear skill checklists", "Max 5 swimmers per coach", "Level-up assessments every class"],
    idealFor: ["Ages 6–12", "Beginner through pre-competitive swimmers"],
    image: IMG_BOY_KICKBOARD_SMILE,
    featured: true,
  },
  {
    slug: "adult-beginner-lessons",
    name: "Adult Beginner Lessons",
    category: "adult",
    categoryLabel: "Adult Programs",
    tagline: "It's never too late to learn to swim.",
    shortDescription:
      "Patient, judgment-free group lessons for teens and adults who never learned to swim or want to rebuild confidence in the water.",
    description:
      "Our Adult Beginner Lessons are designed for teens and adults who are new to swimming or returning after a long break. Classes move at a comfortable pace, focus on water comfort and breath control first, and build toward independent swimming across the pool.",
    highlights: ["Small groups of adults at a similar level", "Evening and weekend class times", "No experience required"],
    idealFor: ["Teens & adults", "Nervous or first-time swimmers"],
    image: IMG_WOMAN_SPLASH,
  },
  {
    slug: "private-semi-private-lessons",
    name: "Private & Semi-Private Lessons",
    category: "adult",
    categoryLabel: "Adult Programs",
    tagline: "One-on-one coaching, built around your goals.",
    shortDescription:
      "Fully customized instruction for swimmers of any age who want focused, one-on-one or small-group attention.",
    description:
      "Private and semi-private lessons pair a swimmer (or up to three family members) with a dedicated coach for instruction built entirely around their goals — whether that's overcoming a fear of water, refining stroke technique, or preparing for a triathlon.",
    highlights: ["1-on-1 or small groups of up to 3", "Flexible scheduling, including weekends", "Progress notes after every lesson"],
    idealFor: ["All ages and skill levels", "Swimmers with specific goals or timelines"],
    image: IMG_PRIVATE_COACH,
    featured: true,
  },
  {
    slug: "age-group-swim-team",
    name: "Age Group Swim Team",
    category: "competitive",
    categoryLabel: "Competitive Teams",
    tagline: "Where confident swimmers become racers.",
    shortDescription:
      "Structured practice groups for swimmers ready to train competitively and race at local and regional meets.",
    description:
      "Our Age Group Swim Team takes swimmers who have mastered all four competitive strokes and develops them into racers, with structured practice groups organized by age and ability. Swimmers train stroke technique, endurance, starts, and turns, and compete at sanctioned local and regional meets throughout the season.",
    highlights: ["Practice groups organized by age & ability", "Regular local and regional meets", "Certified competitive coaching staff"],
    idealFor: ["Ages 7+", "Swimmers who've completed all four strokes"],
    image: IMG_RACE_LANES,
  },
  {
    slug: "high-school-club-prep",
    name: "High School & Club Prep Training",
    category: "competitive",
    categoryLabel: "Competitive Teams",
    tagline: "Race-ready training for serious swimmers.",
    shortDescription:
      "High-volume, technique-focused training for swimmers preparing for high school or club-level competition.",
    description:
      "High School & Club Prep Training is built for competitive swimmers preparing to make or strengthen a high school or club team roster. Training blends higher-volume conditioning with detailed stroke and race-strategy work, including starts, turns, and pacing under race conditions.",
    highlights: ["Higher-volume training sets", "Dryland conditioning included", "Video stroke analysis each season"],
    idealFor: ["Advanced age-group swimmers", "High school & club team hopefuls"],
    image: IMG_STARTING_BLOCKS,
  },
  {
    slug: "masters-swimming",
    name: "Masters Swimming",
    category: "wellness",
    categoryLabel: "Fitness & Wellness",
    tagline: "Structured, coached workouts for adult swimmers.",
    shortDescription:
      "Coached lane-based workouts for adults who want structured fitness swimming, from lap swimmers to former competitive athletes.",
    description:
      "Masters Swimming offers coached, lane-based workouts for adults 19 and up — whether you swam competitively years ago or simply want a structured, low-impact way to build fitness. Sets are organized by pace group so everyone gets a workout matched to their level.",
    highlights: ["Pace-based lane groups", "Early-morning and evening sessions", "Open to all fitness levels"],
    idealFor: ["Adults 19+", "Former competitive swimmers & fitness swimmers"],
    image: IMG_SOLO_UNDERWATER,
  },
  {
    slug: "aqua-fitness-water-aerobics",
    name: "Aqua Fitness & Water Aerobics",
    category: "wellness",
    categoryLabel: "Fitness & Wellness",
    tagline: "Low-impact, high-energy group fitness in the water.",
    shortDescription:
      "Instructor-led group fitness classes in the water — no swimming ability required.",
    description:
      "Aqua Fitness & Water Aerobics classes bring high-energy, low-impact group fitness to the pool, using water resistance to build strength and cardio endurance while protecting joints. No swimming ability is required — classes take place in chest-deep water.",
    highlights: ["No swimming ability required", "Chest-deep water, standing the whole class", "Equipment provided"],
    idealFor: ["Adults & seniors", "Anyone seeking low-impact fitness"],
    image: IMG_AQUA_FITNESS_CLASS,
  },
  {
    slug: "swim-camps-clinics",
    name: "Swim Camps & Clinics",
    category: "youth",
    categoryLabel: "Youth Programs",
    tagline: "Intensive, focused progress in a single week.",
    shortDescription:
      "Week-long intensives and single-day clinics that give young swimmers focused, rapid skill-building outside of regular sessions.",
    description:
      "Our Swim Camps & Clinics run during school breaks and summer, giving young swimmers an intensive, focused week (or single-day clinic) to build skills faster than once-a-week lessons allow. Each camp targets a specific skill band, from water-safety basics to stroke refinement.",
    highlights: ["Runs during school breaks & summer", "Grouped by skill level, not just age", "Half-day and full-day options"],
    idealFor: ["Ages 4–14", "Families wanting rapid progress in a short window"],
    image: IMG_CAMP_NOODLES,
  },
  {
    slug: "lifeguard-instructor-certification",
    name: "Lifeguard & Instructor Certification",
    category: "wellness",
    categoryLabel: "Fitness & Wellness",
    tagline: "Training the next generation of water safety professionals.",
    shortDescription:
      "Certification courses for lifeguards and swim instructors, taught by our senior coaching staff.",
    description:
      "We train the next generation of water safety professionals through certified lifeguard and swim instructor courses. Courses combine in-water skills testing, CPR/First Aid/AED certification, and classroom instruction, taught by our senior coaching staff.",
    highlights: ["Nationally recognized certification", "CPR / First Aid / AED included", "Small course sizes for hands-on practice"],
    idealFor: ["Ages 15+", "Aspiring lifeguards & swim instructors"],
    image: IMG_LIFEGUARD_WATCH,
  },
];

export function getProgramBySlug(slug: string) {
  return programs.find((program) => program.slug === slug);
}

export function getRelatedPrograms(slug: string, count = 3) {
  const current = getProgramBySlug(slug);
  if (!current) return programs.slice(0, count);
  return programs
    .filter((program) => program.slug !== slug)
    .sort((a, b) => (a.category === current.category ? -1 : 0) - (b.category === current.category ? -1 : 0))
    .slice(0, count);
}
