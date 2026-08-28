export interface TemplateScriptStructure {
  hookStyle: string;
  beats: string[];
  ctaStyle: string;
  avgSceneCount: [number, number];
}

export interface TemplateDefinition {
  key: string;
  name: string;
  category: string;
  description: string;
  scriptStructure: TemplateScriptStructure;
  captionStyle: string;
  visualStyle: string;
  musicStyle: string;
  transitionStyle: string;
}

export const TEMPLATES: TemplateDefinition[] = [
  {
    key: "facts",
    name: "Facts",
    category: "Facts",
    description: "Rapid-fire surprising facts with a countdown-free, punchy rhythm.",
    scriptStructure: {
      hookStyle: "shocking-claim",
      beats: ["HOOK", "CURIOSITY", "FACT_1", "FACT_2", "FACT_3", "PAYOFF", "CTA"],
      ctaStyle: "follow-for-more",
      avgSceneCount: [5, 7],
    },
    captionStyle: "bold-highlight",
    visualStyle: "cinematic-stock",
    musicStyle: "upbeat",
    transitionStyle: "crossfade",
  },
  {
    key: "motivation",
    name: "Motivation",
    category: "Motivation",
    description: "High-energy motivational speech style with a strong emotional arc.",
    scriptStructure: {
      hookStyle: "challenge",
      beats: ["HOOK", "STRUGGLE", "TURNING_POINT", "LESSON", "CTA"],
      ctaStyle: "call-to-action-strong",
      avgSceneCount: [4, 6],
    },
    captionStyle: "impact-caps",
    visualStyle: "dramatic-lighting",
    musicStyle: "cinematic-build",
    transitionStyle: "hard-cut",
  },
  {
    key: "business",
    name: "Business",
    category: "Business",
    description: "Sharp business insight or case study with a practical takeaway.",
    scriptStructure: {
      hookStyle: "contrarian-take",
      beats: ["HOOK", "CONTEXT", "INSIGHT", "PROOF", "TAKEAWAY", "CTA"],
      ctaStyle: "save-and-share",
      avgSceneCount: [5, 7],
    },
    captionStyle: "clean-minimal",
    visualStyle: "corporate-modern",
    musicStyle: "corporate-uplifting",
    transitionStyle: "slide",
  },
  {
    key: "technology",
    name: "Technology",
    category: "Technology",
    description: "Fast-paced explainer for a tech concept, product, or trend.",
    scriptStructure: {
      hookStyle: "future-shock",
      beats: ["HOOK", "PROBLEM", "HOW_IT_WORKS", "IMPLICATIONS", "CTA"],
      ctaStyle: "follow-for-more",
      avgSceneCount: [5, 7],
    },
    captionStyle: "tech-glow",
    visualStyle: "futuristic-ui",
    musicStyle: "electronic-pulse",
    transitionStyle: "glitch",
  },
  {
    key: "history",
    name: "History",
    category: "History",
    description: "A forgotten or shocking piece of history retold as a mini-story.",
    scriptStructure: {
      hookStyle: "strange-claim",
      beats: ["HOOK", "SETUP", "ESCALATION", "TWIST", "LESSON", "CTA"],
      ctaStyle: "curiosity-loop",
      avgSceneCount: [5, 8],
    },
    captionStyle: "documentary-serif",
    visualStyle: "archival-cinematic",
    musicStyle: "orchestral-tension",
    transitionStyle: "crossfade",
  },
  {
    key: "luxury",
    name: "Luxury",
    category: "Luxury",
    description: "Aspirational, slow-motion luxury lifestyle showcase.",
    scriptStructure: {
      hookStyle: "aspirational-image",
      beats: ["HOOK", "SHOWCASE", "DETAIL", "STATUS", "CTA"],
      ctaStyle: "soft-brand-cta",
      avgSceneCount: [4, 6],
    },
    captionStyle: "elegant-serif",
    visualStyle: "luxury-slow-motion",
    musicStyle: "ambient-luxury",
    transitionStyle: "slow-crossfade",
  },
  {
    key: "ai-news",
    name: "AI News",
    category: "AI News",
    description: "Breaking AI/tech news summary with a clear stakes-driven hook.",
    scriptStructure: {
      hookStyle: "breaking-news",
      beats: ["HOOK", "WHAT_HAPPENED", "WHY_IT_MATTERS", "REACTION", "CTA"],
      ctaStyle: "follow-for-more",
      avgSceneCount: [4, 6],
    },
    captionStyle: "news-ticker",
    visualStyle: "futuristic-ui",
    musicStyle: "electronic-pulse",
    transitionStyle: "hard-cut",
  },
  {
    key: "sports",
    name: "Sports",
    category: "Sports",
    description: "High-energy sports highlight or stat breakdown.",
    scriptStructure: {
      hookStyle: "record-breaking",
      beats: ["HOOK", "BUILD_UP", "MOMENT", "STAKES", "CTA"],
      ctaStyle: "call-to-action-strong",
      avgSceneCount: [4, 6],
    },
    captionStyle: "impact-caps",
    visualStyle: "high-energy-action",
    musicStyle: "sports-hype",
    transitionStyle: "zoom-punch",
  },
  {
    key: "mystery",
    name: "Mystery",
    category: "Mystery",
    description: "Unsolved mystery or eerie phenomenon told with suspense.",
    scriptStructure: {
      hookStyle: "unanswered-question",
      beats: ["HOOK", "CLUES", "THEORIES", "UNRESOLVED_TWIST", "CTA"],
      ctaStyle: "curiosity-loop",
      avgSceneCount: [5, 7],
    },
    captionStyle: "dark-suspense",
    visualStyle: "moody-dark",
    musicStyle: "suspense-drone",
    transitionStyle: "flash-cut",
  },
  {
    key: "storytelling",
    name: "Storytelling",
    category: "Storytelling",
    description: "Narrative mini-story with a clear character and emotional payoff.",
    scriptStructure: {
      hookStyle: "in-medias-res",
      beats: ["HOOK", "CHARACTER", "CONFLICT", "CLIMAX", "RESOLUTION", "CTA"],
      ctaStyle: "curiosity-loop",
      avgSceneCount: [6, 8],
    },
    captionStyle: "bold-highlight",
    visualStyle: "cinematic-stock",
    musicStyle: "emotional-piano",
    transitionStyle: "crossfade",
  },
  {
    key: "reddit-stories",
    name: "Reddit-Style Stories",
    category: "Storytelling",
    description: "First-person confession/story format, reads like a viral Reddit post.",
    scriptStructure: {
      hookStyle: "confession-hook",
      beats: ["HOOK", "BACKSTORY", "INCITING_INCIDENT", "ESCALATION", "TWIST_ENDING", "CTA"],
      ctaStyle: "comment-bait",
      avgSceneCount: [6, 9],
    },
    captionStyle: "chat-bubble",
    visualStyle: "phone-screen-mockup",
    musicStyle: "lofi-ambient",
    transitionStyle: "hard-cut",
  },
  {
    key: "top-5-10",
    name: "Top 5 / Top 10",
    category: "Lists",
    description: "Ranked countdown list format with a number bumper each scene.",
    scriptStructure: {
      hookStyle: "ranked-promise",
      beats: ["HOOK", "ITEM_N", "ITEM_N-1", "ITEM_...", "ITEM_1", "CTA"],
      ctaStyle: "comment-your-pick",
      avgSceneCount: [6, 11],
    },
    captionStyle: "bold-highlight",
    visualStyle: "cinematic-stock",
    musicStyle: "upbeat",
    transitionStyle: "slide",
  },
  {
    key: "did-you-know",
    name: "Did You Know?",
    category: "Facts",
    description: "Single deep-dive fact explored with a satisfying reveal.",
    scriptStructure: {
      hookStyle: "did-you-know",
      beats: ["HOOK", "SETUP", "EXPLANATION", "REVEAL", "CTA"],
      ctaStyle: "follow-for-more",
      avgSceneCount: [4, 6],
    },
    captionStyle: "clean-minimal",
    visualStyle: "cinematic-stock",
    musicStyle: "curious-playful",
    transitionStyle: "crossfade",
  },
  {
    key: "documentary",
    name: "Documentary",
    category: "Documentary",
    description: "Measured, authoritative documentary narration style.",
    scriptStructure: {
      hookStyle: "scene-setting",
      beats: ["HOOK", "CONTEXT", "EVIDENCE", "ANALYSIS", "CONCLUSION", "CTA"],
      ctaStyle: "soft-brand-cta",
      avgSceneCount: [6, 8],
    },
    captionStyle: "documentary-serif",
    visualStyle: "archival-cinematic",
    musicStyle: "orchestral-tension",
    transitionStyle: "slow-crossfade",
  },
];

export function getTemplate(key: string): TemplateDefinition | undefined {
  return TEMPLATES.find((t) => t.key === key);
}
