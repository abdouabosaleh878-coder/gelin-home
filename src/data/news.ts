export type NewsCategory = "Academy News" | "Team Results" | "Swim Tips" | "Community";

export type NewsArticle = {
  slug: string;
  title: string;
  excerpt: string;
  category: NewsCategory;
  readingTime: string;
  publishedAt: string;
  author: string;
  image: string;
  content: string[];
};

export const newsCategories: NewsCategory[] = ["Academy News", "Team Results", "Swim Tips", "Community"];

/**
 * Placeholder editorial content — replace with real announcements before publishing.
 */
export const newsArticles: NewsArticle[] = [
  {
    slug: "placeholder-new-downtown-pool",
    title: "Placeholder — Downtown Aquatic Center completes lane expansion",
    excerpt: "Replace with a real announcement about facility updates at any of our five locations.",
    category: "Academy News",
    readingTime: "4 min read",
    publishedAt: "2026-06-01",
    author: "Current Swim Academy",
    image: "https://images.unsplash.com/photo-1560090995-01632a28895b?q=80&w=1200&auto=format&fit=crop",
    content: [
      "This is placeholder body copy. Replace with the real announcement text before this page is published externally.",
      "Structure each paragraph as it would appear in the final release — headline, context, quote from a coach or director, and closing details.",
    ],
  },
  {
    slug: "placeholder-team-regional-championship",
    title: "Placeholder — Age Group Swim Team wins regional championship",
    excerpt: "Replace with real meet results and swimmer highlights from the competitive team.",
    category: "Team Results",
    readingTime: "3 min read",
    publishedAt: "2026-05-10",
    author: "Coach Devon Walsh",
    image: "https://images.unsplash.com/photo-1560090947-5307abc46ffc?q=80&w=1200&auto=format&fit=crop",
    content: [
      "This is placeholder body copy for a meet-results recap. Replace with verified results, times, and swimmer names before publishing.",
    ],
  },
  {
    slug: "placeholder-toddler-water-comfort-tips",
    title: "Placeholder — Five tips for helping toddlers feel comfortable in the water",
    excerpt: "Replace with real coaching advice from our Youth Programs team.",
    category: "Swim Tips",
    readingTime: "5 min read",
    publishedAt: "2026-04-18",
    author: "Coach Marisol Reyes",
    image: "https://images.unsplash.com/photo-1651614158095-b98b6c1da74b?q=80&w=1200&auto=format&fit=crop",
    content: [
      "This is placeholder body copy for a swim-tips article. Replace with real coaching guidance before publishing.",
    ],
  },
  {
    slug: "placeholder-masters-program-launch",
    title: "Placeholder — Academy launches expanded Masters Swimming schedule",
    excerpt: "Replace with details of a real program launch or schedule change.",
    category: "Community",
    readingTime: "3 min read",
    publishedAt: "2026-03-22",
    author: "Current Swim Academy",
    image: "https://images.unsplash.com/photo-1572565408388-cdd3afe23e82?q=80&w=1200&auto=format&fit=crop",
    content: [
      "This is placeholder body copy describing a program or community update. Replace with the real details.",
    ],
  },
];

export function getArticleBySlug(slug: string) {
  return newsArticles.find((article) => article.slug === slug);
}

export function getRelatedArticles(slug: string, count = 3) {
  const current = getArticleBySlug(slug);
  if (!current) return newsArticles.slice(0, count);
  return newsArticles
    .filter((article) => article.slug !== slug)
    .sort((a, b) => (a.category === current.category ? -1 : 0) - (b.category === current.category ? -1 : 0))
    .slice(0, count);
}
