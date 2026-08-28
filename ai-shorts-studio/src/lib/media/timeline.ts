export interface TimelineInput {
  durationSec: number;
  transition: string; // transition applied when entering this scene ("hard-cut" disables the crossfade)
}

export interface TimedScene {
  startSec: number;
  durationSec: number;
  overlapBefore: number;
}

const MAX_OVERLAP = 0.35;
const HARD_CUT_OVERLAP = 0.04; // xfade requires a non-zero duration; this reads as an instant cut

/**
 * Computes exact cumulative start times for scenes that will be joined with
 * ffmpeg's xfade filter, so burned-in captions line up with the final,
 * shortened (overlap-adjusted) timeline instead of the naive sum of durations.
 */
export function computeTimeline(scenes: TimelineInput[]): { scenes: TimedScene[]; totalDurationSec: number } {
  const result: TimedScene[] = [];
  let outputCursor = 0;

  scenes.forEach((scene, i) => {
    if (i === 0) {
      result.push({ startSec: 0, durationSec: scene.durationSec, overlapBefore: 0 });
      outputCursor = scene.durationSec;
      return;
    }
    const prev = scenes[i - 1];
    const overlap =
      scene.transition === "hard-cut"
        ? HARD_CUT_OVERLAP
        : Math.max(HARD_CUT_OVERLAP, Math.min(MAX_OVERLAP, prev.durationSec * 0.3, scene.durationSec * 0.3));
    const start = outputCursor - overlap;
    result.push({ startSec: start, durationSec: scene.durationSec, overlapBefore: overlap });
    outputCursor = start + scene.durationSec;
  });

  return { scenes: result, totalDurationSec: outputCursor };
}
