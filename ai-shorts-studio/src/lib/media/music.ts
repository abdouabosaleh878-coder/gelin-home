import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { mkdir } from "node:fs/promises";
import { dirname } from "node:path";

const execFileAsync = promisify(execFile);

interface MusicMood {
  /** lavfi audio sources mixed together to form a simple ambient bed */
  sources: string[];
  filters: string;
}

const MUSIC_LIBRARY: Record<string, MusicMood> = {
  upbeat: {
    sources: ["sine=frequency=392:beep_factor=0", "sine=frequency=523.25", "sine=frequency=659.25"],
    filters: "afftdn=nf=-40,tremolo=f=4:d=0.35,volume=0.5",
  },
  "cinematic-build": {
    sources: ["sine=frequency=110", "sine=frequency=164.81"],
    filters: "tremolo=f=0.15:d=0.6,volume=0.55",
  },
  "corporate-uplifting": {
    sources: ["sine=frequency=261.63", "sine=frequency=329.63", "sine=frequency=392"],
    filters: "tremolo=f=2:d=0.2,volume=0.45",
  },
  "electronic-pulse": {
    sources: ["sine=frequency=110", "sine=frequency=220"],
    filters: "tremolo=f=6:d=0.5,volume=0.5",
  },
  "orchestral-tension": {
    sources: ["sine=frequency=98", "sine=frequency=146.83"],
    filters: "tremolo=f=0.1:d=0.5,volume=0.5",
  },
  "ambient-luxury": {
    sources: ["sine=frequency=220", "sine=frequency=277.18"],
    filters: "tremolo=f=0.2:d=0.3,volume=0.35",
  },
  "sports-hype": {
    sources: ["sine=frequency=130.81", "sine=frequency=196"],
    filters: "tremolo=f=5:d=0.5,volume=0.55",
  },
  "suspense-drone": {
    sources: ["sine=frequency=55", "sine=frequency=58"],
    filters: "tremolo=f=0.05:d=0.4,volume=0.5",
  },
  "emotional-piano": {
    sources: ["sine=frequency=261.63", "sine=frequency=392"],
    filters: "tremolo=f=0.3:d=0.25,volume=0.4",
  },
  "lofi-ambient": {
    sources: ["sine=frequency=196", "sine=frequency=246.94"],
    filters: "afftdn=nf=-35,tremolo=f=1:d=0.2,volume=0.4",
  },
  "curious-playful": {
    sources: ["sine=frequency=349.23", "sine=frequency=440"],
    filters: "tremolo=f=3:d=0.3,volume=0.45",
  },
};

export const MUSIC_STYLES = Object.keys(MUSIC_LIBRARY);

/**
 * Procedurally synthesizes a short ambient music bed loop via ffmpeg (no
 * external assets needed). Swap in a real royalty-free track by pointing
 * BrandKit/Short at a stock music URL in a future provider — this keeps the
 * pipeline fully functional without one.
 */
export async function generateMusicLoop(style: string, loopDurationSec: number, outPath: string): Promise<string> {
  const mood = MUSIC_LIBRARY[style] ?? MUSIC_LIBRARY.upbeat;
  const wavPath = outPath.endsWith(".wav") ? outPath : `${outPath}.wav`;
  await mkdir(dirname(wavPath), { recursive: true });

  const inputs = mood.sources.flatMap((src) => ["-f", "lavfi", "-i", `${src}:duration=${loopDurationSec}`]);
  const mixFilter = `${mood.sources.map((_, i) => `[${i}:a]`).join("")}amix=inputs=${mood.sources.length}:duration=first:normalize=1,${mood.filters},afade=t=in:d=1,afade=t=out:st=${Math.max(
    0,
    loopDurationSec - 1
  )}:d=1`;

  await execFileAsync("ffmpeg", [
    "-y",
    ...inputs,
    "-filter_complex",
    mixFilter,
    "-ar",
    "44100",
    "-ac",
    "2",
    wavPath,
  ]);

  return wavPath;
}
