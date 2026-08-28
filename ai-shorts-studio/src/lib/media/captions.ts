import { writeFile } from "node:fs/promises";

export interface CaptionPreset {
  fontName: string;
  fontSize: number;
  primaryColor: string;
  highlightColor: string;
  outlineColor: string;
  bold: boolean;
  marginV: number;
}

export const CAPTION_PRESETS: Record<string, CaptionPreset> = {
  "bold-highlight": { fontName: "DejaVu Sans", fontSize: 84, primaryColor: "#FFFFFF", highlightColor: "#FFD400", outlineColor: "#000000", bold: true, marginV: 420 },
  "impact-caps": { fontName: "DejaVu Sans", fontSize: 96, primaryColor: "#FFFFFF", highlightColor: "#FF3B30", outlineColor: "#000000", bold: true, marginV: 420 },
  "clean-minimal": { fontName: "DejaVu Sans", fontSize: 66, primaryColor: "#FFFFFF", highlightColor: "#7C4DFF", outlineColor: "#000000", bold: false, marginV: 400 },
  "tech-glow": { fontName: "DejaVu Sans Mono", fontSize: 70, primaryColor: "#E6F9FF", highlightColor: "#3AF0FF", outlineColor: "#001018", bold: true, marginV: 420 },
  "documentary-serif": { fontName: "DejaVu Serif", fontSize: 68, primaryColor: "#F5F0E6", highlightColor: "#E4C97A", outlineColor: "#000000", bold: false, marginV: 400 },
  "elegant-serif": { fontName: "DejaVu Serif", fontSize: 64, primaryColor: "#FFFFFF", highlightColor: "#D3AE66", outlineColor: "#000000", bold: false, marginV: 380 },
  "news-ticker": { fontName: "DejaVu Sans", fontSize: 60, primaryColor: "#FFFFFF", highlightColor: "#FF3B30", outlineColor: "#0A0A0A", bold: true, marginV: 360 },
  "dark-suspense": { fontName: "DejaVu Serif", fontSize: 72, primaryColor: "#E8E8EC", highlightColor: "#B23AFF", outlineColor: "#000000", bold: true, marginV: 420 },
  "chat-bubble": { fontName: "DejaVu Sans", fontSize: 62, primaryColor: "#0B0B14", highlightColor: "#7C4DFF", outlineColor: "#FFFFFF", bold: true, marginV: 420 },
};

export function getCaptionPreset(key: string): CaptionPreset {
  return CAPTION_PRESETS[key] ?? CAPTION_PRESETS["bold-highlight"];
}

export interface WordTiming {
  word: string;
  start: number;
  end: number;
}

/** Approximates per-word timing by weighting each word's share of the clip's actual duration by length. */
export function estimateWordTimings(text: string, durationSec: number): WordTiming[] {
  const words = text.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return [];
  const weights = words.map((w) => Math.max(w.replace(/[^\w]/g, "").length, 1) + 1);
  const totalWeight = weights.reduce((a, b) => a + b, 0);

  let t = 0;
  return words.map((word, i) => {
    const dur = (weights[i] / totalWeight) * durationSec;
    const start = t;
    const end = t + dur;
    t = end;
    return { word, start, end };
  });
}

function chunk<T>(items: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < items.length; i += size) out.push(items.slice(i, i + size));
  return out;
}

function toAssColor(hex: string): string {
  const clean = hex.replace("#", "").padEnd(6, "0");
  const r = clean.slice(0, 2);
  const g = clean.slice(2, 4);
  const b = clean.slice(4, 6);
  return `&H00${b}${g}${r}`.toUpperCase();
}

function toAssTime(sec: number): string {
  const clamped = Math.max(0, sec);
  const cs = Math.round(clamped * 100);
  const h = Math.floor(cs / 360000);
  const m = Math.floor((cs % 360000) / 6000);
  const s = Math.floor((cs % 6000) / 100);
  const c = cs % 100;
  const pad = (n: number, len = 2) => String(n).padStart(len, "0");
  return `${h}:${pad(m)}:${pad(s)}.${pad(c)}`;
}

function escapeAss(text: string): string {
  return text.replace(/\\/g, "\\\\").replace(/\{/g, "(").replace(/\}/g, ")").replace(/\n/g, " ");
}

export interface ScenedNarration {
  narration: string;
  onScreenText?: string | null;
  startSec: number;
  durationSec: number;
}

export interface CaptionBuildOptions {
  presetKey: string;
  watermarkText?: string | null;
  totalDurationSec: number;
  wordsPerChunk?: number;
}

/** Builds one .ass subtitle track covering animated word-highlight captions, on-screen text cards, and a watermark. */
export function buildCaptionsAss(scenes: ScenedNarration[], options: CaptionBuildOptions): string {
  const preset = getCaptionPreset(options.presetKey);
  const wordsPerChunk = options.wordsPerChunk ?? 4;

  const header = `[Script Info]
ScriptType: v4.00+
PlayResX: 1080
PlayResY: 1920
WrapStyle: 0
ScaledBorderAndShadow: yes

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: Default,${preset.fontName},${preset.fontSize},${toAssColor(preset.primaryColor)},${toAssColor(preset.primaryColor)},${toAssColor(preset.outlineColor)},&H00000000,${preset.bold ? -1 : 0},0,0,0,100,100,0,0,1,5,2,2,60,60,${preset.marginV},1
Style: OnScreen,${preset.fontName},52,&H00FFFFFF,&H00FFFFFF,&H00000000,&H64000000,-1,0,0,0,100,100,0,0,3,3,0,8,60,60,140,1
Style: Watermark,${preset.fontName},34,&H88FFFFFF,&H88FFFFFF,&H88000000,&H00000000,0,0,0,0,100,100,0,0,1,2,0,3,40,40,60,1

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
`;

  const lines: string[] = [];

  for (const scene of scenes) {
    const timings = estimateWordTimings(scene.narration, scene.durationSec);
    for (const wordChunk of chunk(timings, wordsPerChunk)) {
      for (let i = 0; i < wordChunk.length; i++) {
        const parts = wordChunk.map((w, j) => {
          const word = escapeAss(w.word);
          return j === i
            ? `{\\c${toAssColor(preset.highlightColor)}}${word}{\\c${toAssColor(preset.primaryColor)}}`
            : word;
        });
        const start = scene.startSec + wordChunk[i].start;
        const end = scene.startSec + wordChunk[i].end;
        lines.push(`Dialogue: 0,${toAssTime(start)},${toAssTime(end)},Default,,0,0,0,,${parts.join(" ")}`);
      }
    }

    if (scene.onScreenText) {
      const cardEnd = Math.min(scene.durationSec, 1.8);
      lines.push(
        `Dialogue: 1,${toAssTime(scene.startSec)},${toAssTime(scene.startSec + cardEnd)},OnScreen,,0,0,0,,${escapeAss(
          scene.onScreenText
        )}`
      );
    }
  }

  if (options.watermarkText) {
    lines.push(
      `Dialogue: 2,${toAssTime(0)},${toAssTime(options.totalDurationSec)},Watermark,,0,0,0,,${escapeAss(
        options.watermarkText
      )}`
    );
  }

  return header + lines.join("\n") + "\n";
}

export async function writeCaptionsFile(scenes: ScenedNarration[], options: CaptionBuildOptions, outPath: string): Promise<string> {
  const ass = buildCaptionsAss(scenes, options);
  await writeFile(outPath, ass, "utf8");
  return outPath;
}
