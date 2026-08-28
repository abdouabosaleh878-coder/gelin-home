import { spawn } from "node:child_process";
import { mkdir } from "node:fs/promises";
import { dirname } from "node:path";
import { computeTimeline, TimelineInput } from "./timeline";

const TRANSITION_MAP: Record<string, string> = {
  crossfade: "fade",
  "slow-crossfade": "fade",
  "hard-cut": "fade",
  slide: "slideleft",
  glitch: "pixelize",
  "flash-cut": "fadewhite",
  "zoom-punch": "zoomin",
};

function mapTransition(style: string): string {
  return TRANSITION_MAP[style] ?? "fade";
}

export interface ComposeScene {
  clipPath: string;
  durationSec: number;
  transition: string;
  voicePath: string;
  sfxPath: string;
}

export interface ComposeParams {
  scenes: ComposeScene[];
  musicPath: string;
  captionsAssPath: string;
  outPath: string;
  onProgress?: (ratio: number) => void;
}

function escapeFilterPath(path: string): string {
  return path.replace(/\\/g, "\\\\").replace(/:/g, "\\:").replace(/'/g, "\\'");
}

export async function composeFinalVideo({ scenes, musicPath, captionsAssPath, outPath, onProgress }: ComposeParams): Promise<{
  outPath: string;
  totalDurationSec: number;
}> {
  await mkdir(dirname(outPath), { recursive: true });

  const timelineInputs: TimelineInput[] = scenes.map((s) => ({ durationSec: s.durationSec, transition: s.transition }));
  const { scenes: timed, totalDurationSec } = computeTimeline(timelineInputs);
  const n = scenes.length;

  const inputArgs: string[] = [];
  scenes.forEach((s) => inputArgs.push("-i", s.clipPath));
  scenes.forEach((s) => inputArgs.push("-i", s.voicePath));
  scenes.forEach((s) => inputArgs.push("-i", s.sfxPath));
  inputArgs.push("-i", musicPath);

  const musicIndex = n * 3;
  const filters: string[] = [];

  // --- video: chained crossfades ---
  let videoLabel = `${0}:v`;
  if (n === 1) {
    videoLabel = "0:v";
  } else {
    for (let i = 1; i < n; i++) {
      const outLabel = i === n - 1 ? "vchain_final" : `vchain${i}`;
      filters.push(
        `[${videoLabel}][${i}:v]xfade=transition=${mapTransition(scenes[i].transition)}:duration=${timed[i].overlapBefore.toFixed(
          3
        )}:offset=${Math.max(0, timed[i].startSec).toFixed(3)}[${outLabel}]`
      );
      videoLabel = outLabel;
    }
  }
  filters.push(`[${videoLabel}]subtitles='${escapeFilterPath(captionsAssPath)}'[vout]`);

  // --- audio: voice + sfx placed on the same timeline, mixed with a music bed ---
  const voiceLabels: string[] = [];
  const sfxLabels: string[] = [];
  scenes.forEach((_, i) => {
    const ms = Math.max(0, Math.round(timed[i].startSec * 1000));
    const voiceIn = n + i;
    const sfxIn = n * 2 + i;
    filters.push(`[${voiceIn}:a]adelay=${ms}|${ms},aformat=sample_rates=44100:channel_layouts=stereo[voice${i}]`);
    filters.push(`[${sfxIn}:a]adelay=${ms}|${ms},aformat=sample_rates=44100:channel_layouts=stereo,volume=0.5[sfx${i}]`);
    voiceLabels.push(`[voice${i}]`);
    sfxLabels.push(`[sfx${i}]`);
  });

  filters.push(`${voiceLabels.join("")}amix=inputs=${n}:duration=longest:normalize=0[voicemix]`);
  filters.push(`${sfxLabels.join("")}amix=inputs=${n}:duration=longest:normalize=0[sfxmix]`);
  filters.push(`[${musicIndex}:a]aformat=sample_rates=44100:channel_layouts=stereo,volume=0.45[musicbed]`);
  filters.push(
    `[voicemix][sfxmix][musicbed]amix=inputs=3:duration=longest:normalize=0,atrim=0:${totalDurationSec.toFixed(
      3
    )},asetpts=PTS-STARTPTS,loudnorm=I=-16:TP=-1.5:LRA=11[aout]`
  );

  const args = [
    "-y",
    ...inputArgs,
    "-filter_complex",
    filters.join(";\n"),
    "-map",
    "[vout]",
    "-map",
    "[aout]",
    "-r",
    "30",
    "-pix_fmt",
    "yuv420p",
    "-c:v",
    "libx264",
    "-profile:v",
    "high",
    "-preset",
    "veryfast",
    "-c:a",
    "aac",
    "-ar",
    "44100",
    "-b:a",
    "192k",
    "-movflags",
    "+faststart",
    "-t",
    totalDurationSec.toFixed(3),
    outPath,
  ];

  await runFfmpeg(args, totalDurationSec, onProgress);

  return { outPath, totalDurationSec };
}

function runFfmpeg(args: string[], totalDurationSec: number, onProgress?: (ratio: number) => void): Promise<void> {
  return new Promise((resolve, reject) => {
    const child = spawn("ffmpeg", ["-progress", "pipe:1", "-nostats", ...args]);
    let stderr = "";

    child.stdout.on("data", (chunk: Buffer) => {
      if (!onProgress) return;
      const text = chunk.toString();
      const match = text.match(/out_time_ms=(\d+)/);
      if (match) {
        const outTimeSec = Number(match[1]) / 1_000_000;
        onProgress(Math.min(1, outTimeSec / Math.max(totalDurationSec, 0.01)));
      }
    });
    child.stderr.on("data", (chunk) => {
      stderr += chunk.toString();
      if (stderr.length > 20000) stderr = stderr.slice(-20000);
    });
    child.on("error", (error) => reject(error));
    child.on("close", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`ffmpeg exited with code ${code}\n${stderr.slice(-4000)}`));
    });
  });
}
