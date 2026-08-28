import { Tone } from "@/generated/prisma/enums";
import { TemplateScriptStructure } from "@/lib/templates";

export const WORDS_PER_SECOND = 2.5;

export function estimateDurationSec(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, +(words / WORDS_PER_SECOND).toFixed(2));
}

export interface PlannedScene {
  order: number;
  beat: string;
  durationSec: number;
  narration: string;
  visualDesc: string;
  onScreenText: string;
  caption: string;
  transition: string;
  soundEffect: string;
}

const SFX_BY_POSITION: Record<"first" | "middle" | "last", string[]> = {
  first: ["whoosh-in", "riser"],
  middle: ["swipe", "pop", "click"],
  last: ["ding", "soft-thud"],
};

function pickSfx(position: "first" | "middle" | "last"): string {
  const pool = SFX_BY_POSITION[position];
  return pool[Math.floor(Math.random() * pool.length)];
}

function beatLabel(beat: string, index: number, total: number): string {
  const upper = beat.toUpperCase();
  if (upper.startsWith("ITEM")) {
    const rank = total - index; // countdown style, hook is index 0
    return `#${Math.max(rank, 1)}`;
  }
  if (upper.startsWith("FACT")) {
    return `FACT ${index}`;
  }
  return beat.replace(/_/g, " ");
}

function visualDescriptionFor(topic: string, visualStyle: string, beat: string): string {
  const styleWord = visualStyle.replace(/-/g, " ");
  return `${styleWord} shot related to "${topic}" — ${beat.toLowerCase().replace(/_/g, " ")} moment`;
}

function onScreenTextFor(narration: string, label: string): string {
  const words = narration.split(/\s+/).filter(Boolean);
  const snippet = words.slice(0, 6).join(" ");
  return label && /^[#A-Z0-9 ]+$/.test(label) ? `${label} — ${snippet}` : snippet;
}

/**
 * Splits a hook + generated per-beat narration lines into timed scenes,
 * then rescales durations so the total matches the requested short length.
 */
interface BeatLine {
  beat: string;
  narration: string;
  visualDesc?: string;
  onScreenText?: string;
  soundEffect?: string;
}

export function planScenes(params: {
  topic: string;
  hook: string;
  beatNarrations: BeatLine[];
  cta: string;
  lengthSeconds: number;
  visualStyle: string;
  transitionStyle: string;
  tone: Tone;
}): PlannedScene[] {
  const { topic, hook, beatNarrations, cta, lengthSeconds, visualStyle, transitionStyle } = params;

  const lines = [
    { beat: "HOOK", narration: hook },
    ...beatNarrations,
    { beat: "CTA", narration: cta },
  ];

  const raw = lines.map((line, index) => ({
    ...line,
    durationSec: estimateDurationSec(line.narration),
    index,
  }));

  const rawTotal = raw.reduce((sum, s) => sum + s.durationSec, 0) || 1;
  const scale = lengthSeconds / rawTotal;

  return raw.map((line, index) => {
    const position: "first" | "middle" | "last" = index === 0 ? "first" : index === raw.length - 1 ? "last" : "middle";
    const label = beatLabel(line.beat, index, raw.length);
    const durationSec = Math.max(1.2, +(line.durationSec * scale).toFixed(2));

    return {
      order: index,
      beat: line.beat,
      durationSec,
      narration: line.narration,
      visualDesc: line.visualDesc || visualDescriptionFor(topic, visualStyle, line.beat),
      onScreenText: line.onScreenText || onScreenTextFor(line.narration, label),
      caption: line.narration,
      transition: index === 0 ? "hard-cut" : transitionStyle,
      soundEffect: line.soundEffect || pickSfx(position),
    };
  });
}

export function beatsForTemplate(structure: TemplateScriptStructure): string[] {
  // Drop HOOK/CTA — those are generated separately and re-added by planScenes.
  return structure.beats.filter((b) => b !== "HOOK" && b !== "CTA");
}
