import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { mkdir } from "node:fs/promises";
import { dirname } from "node:path";

const execFileAsync = promisify(execFile);

interface SfxDefinition {
  /** ffmpeg lavfi audio source expression */
  source: string;
  durationSec: number;
  filters: string;
}

const SFX_LIBRARY: Record<string, SfxDefinition> = {
  "whoosh-in": {
    source: "anoisesrc=color=pink:duration=0.4",
    durationSec: 0.4,
    filters: "afade=t=in:d=0.05,afade=t=out:st=0.3:d=0.1,bandpass=f=1200:width_type=o:w=2,volume=1.6",
  },
  riser: {
    source: "sine=frequency=220:duration=0.6",
    durationSec: 0.6,
    filters: "asetrate=44100*1.8,afade=t=in:d=0.05,afade=t=out:st=0.45:d=0.15,volume=0.8",
  },
  swipe: {
    source: "anoisesrc=color=white:duration=0.25",
    durationSec: 0.25,
    filters: "afade=t=in:d=0.02,afade=t=out:st=0.15:d=0.1,bandpass=f=2500:width_type=o:w=1.5,volume=1.2",
  },
  pop: {
    source: "sine=frequency=880:duration=0.12",
    durationSec: 0.12,
    filters: "afade=t=in:d=0.005,afade=t=out:st=0.06:d=0.06,volume=1.4",
  },
  click: {
    source: "sine=frequency=1400:duration=0.06",
    durationSec: 0.06,
    filters: "afade=t=in:d=0.002,afade=t=out:st=0.02:d=0.04,volume=1.1",
  },
  ding: {
    source: "sine=frequency=1046:duration=0.5",
    durationSec: 0.5,
    filters: "afade=t=in:d=0.01,afade=t=out:st=0.2:d=0.3,volume=1.0",
  },
  "soft-thud": {
    source: "sine=frequency=110:duration=0.3",
    durationSec: 0.3,
    filters: "afade=t=in:d=0.01,afade=t=out:st=0.15:d=0.15,volume=1.2",
  },
};

export const SFX_NAMES = Object.keys(SFX_LIBRARY);

/** Procedurally synthesizes a short sound-effect clip via ffmpeg (no external assets needed). */
export async function generateSfx(name: string, outPath: string): Promise<string> {
  const def = SFX_LIBRARY[name] ?? SFX_LIBRARY.pop;
  const wavPath = outPath.endsWith(".wav") ? outPath : `${outPath}.wav`;
  await mkdir(dirname(wavPath), { recursive: true });

  await execFileAsync("ffmpeg", [
    "-y",
    "-f",
    "lavfi",
    "-i",
    def.source,
    "-af",
    def.filters,
    "-ar",
    "44100",
    "-ac",
    "1",
    wavPath,
  ]);

  return wavPath;
}
