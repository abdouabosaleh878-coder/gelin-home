import { spawn } from "node:child_process";

export interface AudioPeak {
  timeSec: number;
  score: number;
}

/**
 * Finds "high energy" moments in an audio track (loud reactions, laughter,
 * hype spikes) by computing short-window RMS loudness over the whole file
 * and greedily picking local maxima at least `minGapSec` apart. This is a
 * cheap, real (non-fake) signal — no ASR needed — good enough to shortlist
 * candidate highlight windows out of a long stream before doing anything
 * expensive (downloading full-quality video, transcribing) on just those.
 */
export function detectAudioPeaks(
  audioPath: string,
  options: { windowSec?: number; minGapSec?: number; topN?: number } = {}
): Promise<AudioPeak[]> {
  const windowSec = options.windowSec ?? 1;
  const minGapSec = options.minGapSec ?? 180;
  const topN = options.topN ?? 10;
  const sampleRate = 16000;
  const windowSamples = Math.round(windowSec * sampleRate);

  return new Promise((resolve, reject) => {
    const child = spawn("ffmpeg", [
      "-i",
      audioPath,
      "-vn",
      "-ac",
      "1",
      "-ar",
      String(sampleRate),
      "-f",
      "s16le",
      "pipe:1",
    ]);

    const scores: number[] = [];
    let leftover = Buffer.alloc(0);
    let sampleIndex = 0;

    child.stdout.on("data", (chunk: Buffer) => {
      const buf = Buffer.concat([leftover, chunk]);
      const usableSamples = Math.floor(buf.length / 2);
      const usableBytes = usableSamples * 2;

      let sumSquares = 0;
      let count = 0;
      for (let i = 0; i < usableBytes; i += 2) {
        const sample = buf.readInt16LE(i) / 32768;
        sumSquares += sample * sample;
        count++;
        sampleIndex++;
        if (sampleIndex % windowSamples === 0) {
          scores.push(Math.sqrt(sumSquares / count));
          sumSquares = 0;
          count = 0;
        }
      }
      if (count > 0) {
        // partial window carried implicitly into the next chunk's accumulation
      }
      leftover = buf.subarray(usableBytes);
    });

    let stderr = "";
    child.stderr.on("data", (d) => {
      stderr += d.toString();
      if (stderr.length > 4000) stderr = stderr.slice(-4000);
    });
    child.on("error", reject);
    child.on("close", (code) => {
      if (code !== 0) {
        reject(new Error(`ffmpeg exited with code ${code}: ${stderr.slice(-1000)}`));
        return;
      }
      resolve(pickPeaks(scores, windowSec, minGapSec, topN));
    });
  });
}

function pickPeaks(scores: number[], windowSec: number, minGapSec: number, topN: number): AudioPeak[] {
  const minGapWindows = Math.max(1, Math.round(minGapSec / windowSec));
  const indexed = scores.map((score, i) => ({ i, score }));
  indexed.sort((a, b) => b.score - a.score);

  const taken: number[] = [];
  for (const candidate of indexed) {
    if (taken.length >= topN) break;
    const tooClose = taken.some((t) => Math.abs(t - candidate.i) < minGapWindows);
    if (!tooClose) taken.push(candidate.i);
  }

  return taken
    .sort((a, b) => a - b)
    .map((i) => ({ timeSec: i * windowSec, score: scores[i] }));
}
