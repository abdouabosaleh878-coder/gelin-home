/**
 * Deterministic, keyless copywriting engine. Used whenever no LLM provider
 * is configured (or a real provider call fails) so the product still works
 * end-to-end without API keys — quality is naturally lower than a real LLM.
 */

import { Tone } from "@/generated/prisma/enums";

function pickUnique<T>(pool: T[], usedSet: Set<T>): T {
  const remaining = pool.filter((item) => !usedSet.has(item));
  const source = remaining.length > 0 ? remaining : pool;
  const choice = source[Math.floor(Math.random() * source.length)];
  usedSet.add(choice);
  return choice;
}

function fill(template: string, vars: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (_, key) => vars[key] ?? "");
}

const HOOK_TEMPLATES: Record<string, string[]> = {
  "shocking-claim": [
    "Nobody tells you this about {topic}.",
    "Scientists just confirmed something insane about {topic}.",
    "This {niche} fact sounds fake, but it's real.",
    "99% of people get {topic} completely wrong.",
  ],
  "challenge": [
    "Stop scrolling if you've ever struggled with {topic}.",
    "If you want {topic} to change, watch this.",
    "You are one decision away from mastering {topic}.",
  ],
  "contrarian-take": [
    "Everything you were taught about {topic} is outdated.",
    "The way most people approach {topic} is quietly failing.",
    "Here's the {niche} advice nobody wants to give you.",
  ],
  "future-shock": [
    "This {topic} breakthrough changes everything.",
    "In five years, {topic} won't look anything like this.",
    "You are not ready for what {topic} just did.",
  ],
  "strange-claim": [
    "This is one of the strangest stories in {niche} history.",
    "Historians tried to bury what happened with {topic}.",
    "Nobody believed this about {topic} — until now.",
  ],
  "aspirational-image": [
    "This is what {topic} actually looks like behind closed doors.",
    "Money can't buy this — but {topic} comes close.",
  ],
  "breaking-news": [
    "Breaking: {topic} just changed the game.",
    "This {niche} update dropped and nobody is talking about it.",
  ],
  "record-breaking": [
    "No one has ever done this in {niche} before.",
    "This {topic} moment broke every record.",
  ],
  "unanswered-question": [
    "Nobody has ever explained {topic} — until this.",
    "This {niche} mystery still doesn't have an answer.",
  ],
  "in-medias-res": [
    "The moment everything changed started with {topic}.",
    "She didn't know it yet, but {topic} was about to ruin everything.",
  ],
  "confession-hook": [
    "AITA for what I did about {topic}?",
    "I never told anyone this about {topic} — until now.",
  ],
  "ranked-promise": [
    "These are the {topic} facts that will blow your mind.",
    "You won't believe what's #1 on this {niche} list.",
  ],
  "did-you-know": [
    "Did you know this about {topic}?",
    "Here's a {niche} fact that sounds made up.",
  ],
  "scene-setting": [
    "This is the story of {topic}, and how it changed {niche} forever.",
  ],
  generic: [
    "You won't believe what happens when {topic} goes right.",
    "This is one of the strangest things about {topic}.",
    "Stop scrolling if you care about {niche}.",
    "Nobody tells you this about {topic}.",
  ],
};

const TONE_CONNECTORS: Record<Tone, string[]> = {
  DRAMATIC: ["And then everything changed.", "But nothing could prepare them for this.", "It was never supposed to happen this way."],
  FUNNY: ["Yeah. It's exactly as ridiculous as it sounds.", "I know, I didn't believe it either.", "Plot twist: it gets weirder."],
  EDUCATIONAL: ["Here's the part most people skip.", "Let's break down why that matters.", "This is where it gets interesting."],
  MOTIVATIONAL: ["This is your sign to keep going.", "Every expert was once a beginner at this.", "The only failure is quitting too early."],
  STORYTELLING: ["That's when everything shifted.", "What happened next changed everything.", "Nobody saw the next part coming."],
  LUXURY: ["Understated. Effortless. Unmistakable.", "This is what quiet luxury actually looks like.", "Not for everyone — and that's the point."],
  DOCUMENTARY: ["The evidence tells a different story.", "What we found next was unexpected.", "The record shows something else entirely."],
};

const VALUE_SENTENCES: Record<Tone, string[]> = {
  DRAMATIC: [
    "What started as a small detail about {topic} spiraled into something no one predicted.",
    "The deeper people looked into {topic}, the more it unraveled.",
  ],
  FUNNY: [
    "So naturally, {topic} decided to make everything ten times more chaotic.",
    "Turns out {topic} has main character energy and nobody warned us.",
  ],
  EDUCATIONAL: [
    "The key thing about {topic} is that most explanations skip the actual mechanism.",
    "Once you understand how {topic} really works, the rest clicks into place.",
  ],
  MOTIVATIONAL: [
    "{topic} isn't about talent — it's about showing up when it's hardest.",
    "The people who succeed at {topic} aren't smarter, they just didn't stop.",
  ],
  STORYTELLING: [
    "It all came down to one moment involving {topic} that no one expected.",
    "{topic} was never the plan — but it became the whole story.",
  ],
  LUXURY: [
    "Every detail of {topic} is deliberate, from the material to the finish.",
    "{topic} isn't loud about it. It doesn't have to be.",
  ],
  DOCUMENTARY: [
    "Records show {topic} unfolded differently than the official story suggests.",
    "Investigators traced {topic} back further than anyone expected.",
  ],
};

const PAYOFF_SENTENCES: Record<Tone, string[]> = {
  DRAMATIC: ["And that single moment changed {niche} forever.", "Nobody expected {topic} to end this way."],
  FUNNY: ["And honestly? {topic} was never the same again.", "That's the story. Make of {topic} what you will."],
  EDUCATIONAL: ["Once you see {topic} this way, you can't unsee it.", "That's the piece most people miss about {topic}."],
  MOTIVATIONAL: ["That's proof {topic} rewards the people who don't quit.", "{topic} is proof that consistency beats talent."],
  STORYTELLING: ["And that's how {topic} became the turning point.", "In the end, {topic} was the answer all along."],
  LUXURY: ["That's the standard {topic} is held to.", "{topic}, done properly, speaks for itself."],
  DOCUMENTARY: ["The full picture of {topic} is still being uncovered.", "What began with {topic} reshaped how we understand {niche}."],
};

const CTA_TEMPLATES: Record<string, string[]> = {
  "follow-for-more": ["Follow for more {niche} stories like this one.", "Follow if you want more of this."],
  "call-to-action-strong": ["Save this. You'll need it.", "Share this with someone who needs to hear it."],
  "save-and-share": ["Save this before you forget it.", "Send this to someone in {niche}."],
  "curiosity-loop": ["Comment if you want part two.", "Follow to find out what happened next."],
  "soft-brand-cta": ["Follow along for more.", "More like this, every week."],
  "comment-bait": ["Would you have done the same? Comment below.", "Tell me I'm not the only one — comment below."],
  "comment-your-pick": ["Comment your #1 pick.", "Which one surprised you? Comment below."],
  "zoom-punch": ["Follow for the next one.", "Like if that surprised you."],
  generic: ["Follow for more.", "Save this for later."],
};

export interface GeneratedIdea {
  idea: string;
  angle: string;
}

export function generateViralIdeas(niche: string, count: number): GeneratedIdea[] {
  const angles = [
    "a shocking statistic nobody talks about",
    "a myth vs. reality breakdown",
    "a personal-story angle",
    "a countdown of the most surprising examples",
    "a before/after transformation",
    "a controversial hot take",
    "a beginner mistake to avoid",
    "an insider secret from the industry",
  ];
  const used = new Set<string>();
  const ideas: GeneratedIdea[] = [];
  for (let i = 0; i < count; i++) {
    const angle = pickUnique(angles, used);
    ideas.push({
      idea: `${capitalize(niche)}: ${angle}`,
      angle,
    });
  }
  return ideas;
}

export function generateHook(topic: string, niche: string, hookStyle: string, avoid: string[] = []): string {
  const pool = HOOK_TEMPLATES[hookStyle] ?? HOOK_TEMPLATES.generic;
  const usedSet = new Set(avoid);
  const template = pickUnique(pool, usedSet);
  return fill(template, { topic, niche: niche || "this" });
}

export interface GeneratedScript {
  hook: string;
  body: string;
  cta: string;
  fullText: string;
}

export function generateScript(params: {
  topic: string;
  niche: string;
  tone: Tone;
  hook: string;
  ctaStyle: string;
}): GeneratedScript {
  const { topic, niche, tone, hook, ctaStyle } = params;
  const connectors = TONE_CONNECTORS[tone] ?? TONE_CONNECTORS.EDUCATIONAL;
  const valueBank = VALUE_SENTENCES[tone] ?? VALUE_SENTENCES.EDUCATIONAL;
  const payoffBank = PAYOFF_SENTENCES[tone] ?? PAYOFF_SENTENCES.EDUCATIONAL;
  const ctaBank = CTA_TEMPLATES[ctaStyle] ?? CTA_TEMPLATES.generic;

  const curiosity = fill(pickRandom(connectors), { topic, niche });
  const value = fill(pickRandom(valueBank), { topic, niche });
  const payoff = fill(pickRandom(payoffBank), { topic, niche });
  const cta = fill(pickRandom(ctaBank), { topic, niche });

  const body = [curiosity, value, payoff].join(" ");
  const fullText = [hook, body, cta].join(" ");

  return { hook, body, cta, fullText };
}

export interface RewriteActionInput {
  text: string;
  tone: Tone;
  topic: string;
  niche: string;
}

const STRONGER_PREFIXES = ["Listen carefully:", "Here's the truth:", "Pay attention —", "This matters:"];
const DRAMATIC_BOOSTERS = ["absolutely", "completely", "without question", "in every possible way"];
const FUNNY_ASIDES = ["(no, seriously)", "— I'm not making this up", "— yes, really", "and it's chaos"];

export function localRewrite(action: string, input: RewriteActionInput): string {
  const { text, topic, niche } = input;

  switch (action) {
    case "stronger-hook":
      return `${pickRandom(STRONGER_PREFIXES)} ${text}`;
    case "more-viral":
      return `${text} ${pickRandom(["Everyone is talking about this.", "This is blowing up right now.", "You need to see this."])}`;
    case "shorter":
      return shortenText(text);
    case "more-dramatic":
      return text.replace(/\.$/, "") + `, ${pickRandom(DRAMATIC_BOOSTERS)}.`;
    case "funnier":
      return `${text} ${pickRandom(FUNNY_ASIDES)}`;
    case "rewrite":
      return generateScript({ topic, niche, tone: input.tone, hook: text, ctaStyle: "generic" }).fullText;
    case "improve-retention":
      return `${text} But here's the part most people miss...`;
    case "stronger-cta":
      return text.replace(/\s*(Follow|Save|Share|Comment)[^.]*\.?\s*$/i, "") + ` ${pickRandom(CTA_TEMPLATES["call-to-action-strong"])}`;
    default:
      return text;
  }
}

const FACT_TEMPLATES = [
  "One thing about {topic} that surprises almost everyone: it's rarely what you'd expect.",
  "Here's a detail about {topic} most sources leave out entirely.",
  "This part of {topic} sounds made up, but it checks out.",
  "Most people assume the opposite is true about {topic} — it isn't.",
];

/** One narration line per script beat, for the local (keyless) pipeline. */
export function generateBeatLines(
  beats: string[],
  topic: string,
  niche: string,
  tone: Tone
): { beat: string; narration: string }[] {
  const connectors = TONE_CONNECTORS[tone] ?? TONE_CONNECTORS.EDUCATIONAL;
  const valueBank = VALUE_SENTENCES[tone] ?? VALUE_SENTENCES.EDUCATIONAL;
  const payoffBank = PAYOFF_SENTENCES[tone] ?? PAYOFF_SENTENCES.EDUCATIONAL;
  const combined = [...connectors, ...valueBank, ...payoffBank, ...FACT_TEMPLATES];
  const used = new Set<string>();

  return beats.map((beat) => {
    const upper = beat.toUpperCase();
    const pool = upper.startsWith("FACT") || upper.startsWith("ITEM") ? FACT_TEMPLATES : combined;
    const template = pickUnique(pool, used);
    return { beat, narration: fill(template, { topic, niche: niche || "this" }) };
  });
}

function shortenText(text: string): string {
  const sentences = text.split(/(?<=[.!?])\s+/);
  const keep = Math.max(1, Math.ceil(sentences.length * 0.6));
  return sentences.slice(0, keep).join(" ");
}

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function capitalize(s: string): string {
  if (!s) return s;
  return s.charAt(0).toUpperCase() + s.slice(1);
}
