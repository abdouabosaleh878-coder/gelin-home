export type ArticleCategory = "Hearing Basics" | "Living with Hearing Loss" | "Technology" | "Family & Relationships" | "Tinnitus";

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  category: ArticleCategory;
  readingTime: string;
  publishedAt: string;
  author: string;
  image: string;
  content: string[];
};

export const articleCategories: ArticleCategory[] = [
  "Hearing Basics",
  "Living with Hearing Loss",
  "Technology",
  "Family & Relationships",
  "Tinnitus",
];

export const articles: Article[] = [
  {
    slug: "signs-of-hearing-loss",
    title: "7 Everyday Signs You Might Be Losing Your Hearing",
    excerpt:
      "Hearing loss is often gradual, which makes it easy to miss. Here are the everyday moments that can be early clues.",
    category: "Hearing Basics",
    readingTime: "5 min read",
    publishedAt: "2026-06-02",
    author: "Dr. Elena Marsh, Au.D.",
    image:
      "https://images.unsplash.com/photo-1751977979267-91d412aeeda2?q=80&w=1200&auto=format&fit=crop",
    content: [
      "Hearing loss rarely arrives all at once. For most people, it develops slowly over years, which means the people around us often notice before we do.",
      "One of the earliest signs is asking others to repeat themselves, especially in group settings or over the phone. Another is turning the television volume higher than family members prefer.",
      "Difficulty following conversations in restaurants or other noisy environments is extremely common — background noise makes it harder for a weakened ear to separate speech from clutter.",
      "Other signs include feeling like people are mumbling, avoiding social situations because conversation feels exhausting, and ringing or buzzing in the ears (tinnitus).",
      "If any of this sounds familiar, a free hearing assessment is a simple, no-pressure way to find out where you stand. It takes about 45 minutes and gives you clear answers.",
    ],
  },
  {
    slug: "how-hearing-aids-work",
    title: "How Modern Hearing Aids Actually Work",
    excerpt:
      "Today's hearing aids are miniature computers. Here's a plain-language look at what happens inside the device.",
    category: "Technology",
    readingTime: "6 min read",
    publishedAt: "2026-05-18",
    author: "James Ruiz, Hearing Instrument Specialist",
    image:
      "https://images.unsplash.com/photo-1596088728260-08a654466a00?q=80&w=1200&auto=format&fit=crop",
    content: [
      "A modern hearing aid has three core parts: a microphone that captures sound, a processor that analyzes and shapes it, and a receiver that delivers the adjusted sound into your ear.",
      "The processor is where the real intelligence lives. It can distinguish speech from background noise, automatically adjust for different environments, and stream audio directly from your phone.",
      "Rechargeable batteries have also changed the experience significantly — most people simply place their devices in a charging case overnight, the same way they would a phone.",
      "Fitting is not one-size-fits-all. Your hearing care provider programs the device to your specific hearing profile, then fine-tunes it over a series of short follow-up visits.",
    ],
  },
  {
    slug: "hearing-loss-and-relationships",
    title: "Talking to a Loved One About Their Hearing",
    excerpt:
      "Bringing up hearing loss with a parent or partner can feel delicate. Here's how to start the conversation with care.",
    category: "Family & Relationships",
    readingTime: "4 min read",
    publishedAt: "2026-04-30",
    author: "Dr. Priya Nair, Au.D.",
    image:
      "https://images.unsplash.com/photo-1761393268200-6ae672b5556a?q=80&w=1200&auto=format&fit=crop",
    content: [
      "It's common to notice a loved one's hearing changing before they do. Approaching the topic gently — and privately — tends to go much better than raising it in front of others.",
      "Try focusing on specific moments rather than generalizations: 'I noticed you had a hard time hearing Dad at dinner' lands differently than 'you never listen.'",
      "Offering to go together to a free hearing assessment can lower the stakes considerably. It's a low-commitment first step, not an immediate decision to buy anything.",
      "Above all, patience matters. Accepting hearing loss can take time, and your support along the way makes a real difference.",
    ],
  },
  {
    slug: "understanding-tinnitus",
    title: "Understanding Tinnitus: Causes and Relief Options",
    excerpt:
      "That ringing or buzzing sound has a name — and there are proven ways to manage it.",
    category: "Tinnitus",
    readingTime: "6 min read",
    publishedAt: "2026-04-12",
    author: "Dr. Elena Marsh, Au.D.",
    image:
      "https://images.unsplash.com/photo-1602703651892-7f0e73a14302?q=80&w=1200&auto=format&fit=crop",
    content: [
      "Tinnitus is the perception of sound — often ringing, buzzing, or hissing — without an external source. It affects millions of people and is frequently linked to hearing loss.",
      "While there is no single cure, many people find meaningful relief through sound therapy, counseling, and properly fitted hearing aids with built-in tinnitus features.",
      "Managing stress and limiting exposure to loud noise can also reduce how noticeable tinnitus feels day to day.",
      "A hearing care professional can help identify likely contributing factors and build a relief plan tailored to you.",
    ],
  },
  {
    slug: "living-well-with-hearing-loss",
    title: "5 Ways to Stay Socially Connected with Hearing Loss",
    excerpt:
      "Hearing loss doesn't have to mean stepping back from the people and activities you love.",
    category: "Living with Hearing Loss",
    readingTime: "5 min read",
    publishedAt: "2026-03-22",
    author: "James Ruiz, Hearing Instrument Specialist",
    image:
      "https://images.unsplash.com/photo-1764173039543-f9f197744e1b?q=80&w=1200&auto=format&fit=crop",
    content: [
      "It's natural to withdraw a little when conversations feel like work. But small adjustments can make staying connected much easier.",
      "Choose well-lit settings when possible — being able to see facial expressions and lip movement provides helpful context.",
      "Let friends and family know what helps, whether that's facing you when speaking or reducing background noise.",
      "Modern hearing aids with directional microphones and Bluetooth streaming can make phone calls and group settings noticeably easier.",
      "Most importantly, don't wait. The longer hearing loss goes untreated, the more effort the brain spends trying to fill in gaps — treating it early tends to make adjustment easier.",
    ],
  },
  {
    slug: "choosing-your-first-hearing-aid",
    title: "A First-Timer's Guide to Choosing a Hearing Aid",
    excerpt:
      "Overwhelmed by styles and features? Here's a simple framework for narrowing down your options.",
    category: "Hearing Basics",
    readingTime: "7 min read",
    publishedAt: "2026-02-27",
    author: "Dr. Priya Nair, Au.D.",
    image:
      "https://images.unsplash.com/photo-1709136494912-ab178d0d85c9?q=80&w=1200&auto=format&fit=crop",
    content: [
      "Start with your hearing profile. A professional assessment identifies the degree and pattern of your hearing loss, which narrows your options considerably.",
      "Next, think about lifestyle. Frequent phone calls and streaming favor Bluetooth-enabled devices; active, hands-on days favor durable, simple-control designs.",
      "Consider handling. If dexterity is a concern, larger devices with tactile buttons or app control may be easier than very small, custom-fit styles.",
      "Finally, budget is a real factor — and that's normal. A good provider will walk you through options at different price points without any pressure.",
      "The best next step is almost always the same: book a free assessment and try devices in person before deciding.",
    ],
  },
];

export function getArticleBySlug(slug: string) {
  return articles.find((article) => article.slug === slug);
}

export function getRelatedArticles(slug: string, count = 3) {
  const current = getArticleBySlug(slug);
  if (!current) return articles.slice(0, count);
  return articles
    .filter((article) => article.slug !== slug)
    .sort((a, b) => (a.category === current.category ? -1 : 0) - (b.category === current.category ? -1 : 0))
    .slice(0, count);
}
