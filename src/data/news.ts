export type NewsCategory = "Company News" | "Financial Results" | "Market Insights" | "CSR & Community";

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

export const newsCategories: NewsCategory[] = ["Company News", "Financial Results", "Market Insights", "CSR & Community"];

/**
 * Placeholder editorial content — replace with real press releases before publishing.
 */
export const newsArticles: NewsArticle[] = [
  {
    slug: "placeholder-group-expansion",
    title: "Placeholder — Beltone Holding expands regional footprint",
    excerpt: "Replace with a real announcement about the group's expansion or new subsidiary launch.",
    category: "Company News",
    readingTime: "4 min read",
    publishedAt: "2026-06-01",
    author: "Beltone Holding Communications",
    image: "https://images.unsplash.com/photo-1470075801209-17f9ec0cada6?q=80&w=1200&auto=format&fit=crop",
    content: [
      "This is placeholder body copy. Replace with the approved press release text before this page is published externally.",
      "Structure each paragraph as it would appear in the final release — headline, context, quote from leadership, and closing boilerplate.",
    ],
  },
  {
    slug: "placeholder-quarterly-results",
    title: "Placeholder — Quarterly financial results announcement",
    excerpt: "Replace with the summary of the latest board-approved quarterly results.",
    category: "Financial Results",
    readingTime: "5 min read",
    publishedAt: "2026-05-10",
    author: "Investor Relations",
    image: "https://images.unsplash.com/photo-1560221328-12fe60f83ab8?q=80&w=1200&auto=format&fit=crop",
    content: [
      "This is placeholder body copy for a financial results announcement. Replace with verified, board-approved figures and commentary.",
    ],
  },
  {
    slug: "placeholder-market-insight",
    title: "Placeholder — Market insight from our research desk",
    excerpt: "Replace with a real market commentary piece from the securities research team.",
    category: "Market Insights",
    readingTime: "6 min read",
    publishedAt: "2026-04-18",
    author: "Beltone Research",
    image: "https://images.unsplash.com/photo-1649003515353-c58a239cf662?q=80&w=1200&auto=format&fit=crop",
    content: [
      "This is placeholder body copy for a market insights article. Replace with real analysis before publishing.",
    ],
  },
  {
    slug: "placeholder-community-initiative",
    title: "Placeholder — Community and CSR initiative",
    excerpt: "Replace with details of a real community, sustainability, or CSR initiative.",
    category: "CSR & Community",
    readingTime: "3 min read",
    publishedAt: "2026-03-22",
    author: "Beltone Holding Communications",
    image: "https://images.unsplash.com/photo-1560220604-1985ebfe28b1?q=80&w=1200&auto=format&fit=crop",
    content: [
      "This is placeholder body copy describing a CSR or community initiative. Replace with the real program details.",
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
