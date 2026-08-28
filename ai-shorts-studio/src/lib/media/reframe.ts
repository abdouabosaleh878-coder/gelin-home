import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { mkdir } from "node:fs/promises";
import { dirname } from "node:path";

const execFileAsync = promisify(execFile);

function escapeFilterPath(path: string): string {
  return path.replace(/\\/g, "\\\\").replace(/:/g, "\\:").replace(/'/g, "\\'");
}

/**
 * Converts a landscape clip into a 1080x1920 vertical short: a blurred,
 * cropped-to-fill copy of the frame as backdrop, with the original frame
 * centered on top (letterboxed, nothing cropped out of the real footage),
 * captions burned in from a prebuilt .ass file.
 */
export async function reframeAndCaption(inputPath: string, assPath: string, outPath: string): Promise<string> {
  await mkdir(dirname(outPath), { recursive: true });

  const filter = [
    "[0:v]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,gblur=sigma=30[bg]",
    "[0:v]scale=1080:-2[fg]",
    `[bg][fg]overlay=(W-w)/2:(H-h)/2:format=auto,subtitles='${escapeFilterPath(assPath)}',format=yuv420p[vout]`,
  ].join(";");

  await execFileAsync("ffmpeg", [
    "-y",
    "-i",
    inputPath,
    "-filter_complex",
    filter,
    "-map",
    "[vout]",
    "-map",
    "0:a?",
    "-r",
    "30",
    "-c:v",
    "libx264",
    "-preset",
    "veryfast",
    "-c:a",
    "aac",
    "-ar",
    "44100",
    "-b:a",
    "160k",
    "-movflags",
    "+faststart",
    outPath,
  ]);

  return outPath;
}
