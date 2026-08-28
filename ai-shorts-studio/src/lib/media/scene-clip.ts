import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { mkdir } from "node:fs/promises";
import { dirname } from "node:path";
import { getMediaDurationSec } from "./ffprobe";

const execFileAsync = promisify(execFile);
const FPS = 30;
const WIDTH = 1080;
const HEIGHT = 1920;

export interface SceneClipInput {
  visualPath: string;
  visualType: "image" | "video";
  durationSec: number;
  outPath: string;
}

/** Renders a silent, exact-duration 1080x1920@30fps clip from a scene's visual asset. */
export async function buildSceneClip({ visualPath, visualType, durationSec, outPath }: SceneClipInput): Promise<string> {
  await mkdir(dirname(outPath), { recursive: true });

  if (visualType === "image") {
    const frames = Math.max(1, Math.round(durationSec * FPS));
    const filter = [
      `scale=${WIDTH}:${HEIGHT}:force_original_aspect_ratio=increase`,
      `crop=${WIDTH}:${HEIGHT}`,
      "scale=2160:-2",
      `zoompan=z='min(zoom+0.0015,1.2)':d=${frames}:s=${WIDTH}x${HEIGHT}:fps=${FPS}`,
      "format=yuv420p",
    ].join(",");

    await execFileAsync("ffmpeg", [
      "-y",
      "-loop",
      "1",
      "-i",
      visualPath,
      "-vf",
      filter,
      "-t",
      String(durationSec),
      "-an",
      outPath,
    ]);
    return outPath;
  }

  const srcDuration = await getMediaDurationSec(visualPath).catch(() => durationSec);
  const args = ["-y"];
  if (srcDuration < durationSec) args.push("-stream_loop", "-1");
  args.push(
    "-i",
    visualPath,
    "-t",
    String(durationSec),
    "-vf",
    `scale=${WIDTH}:${HEIGHT}:force_original_aspect_ratio=increase,crop=${WIDTH}:${HEIGHT},fps=${FPS},format=yuv420p`,
    "-an",
    outPath
  );
  await execFileAsync("ffmpeg", args);
  return outPath;
}
