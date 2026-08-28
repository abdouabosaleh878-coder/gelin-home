import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { access, readdir } from "node:fs/promises";
import path from "node:path";

const execFileAsync = promisify(execFile);

export interface SourceVideoInfo {
  id: string;
  title: string;
  durationSec: number;
}

export class SourceVideoError extends Error {}

function baseArgs(cookiesPath?: string | null): string[] {
  const args = ["--no-warnings", "--extractor-args", "youtube:player_client=android,web,ios"];
  if (cookiesPath) args.push("--cookies", cookiesPath);
  return args;
}

function friendlyError(stderr: string): string {
  if (stderr.includes("Sign in to confirm")) {
    return "The source blocked this download as bot traffic. Try again with a cookies.txt export from a logged-in browser.";
  }
  if (stderr.includes("not available on this app") || stderr.includes("Private video") || stderr.includes("members-only")) {
    return "This video is private, members-only, or otherwise restricted — a cookies.txt export from an account with access is required.";
  }
  return stderr.slice(-500);
}

export async function getSourceVideoInfo(url: string, cookiesPath?: string | null): Promise<SourceVideoInfo> {
  try {
    const { stdout } = await execFileAsync("yt-dlp", [...baseArgs(cookiesPath), "-j", "--no-playlist", url], {
      maxBuffer: 1024 * 1024 * 20,
      timeout: 60_000,
    });
    const line = stdout.trim().split("\n").pop() ?? "{}";
    const data = JSON.parse(line) as { id: string; title: string; duration: number };
    return { id: data.id, title: data.title, durationSec: data.duration };
  } catch (error) {
    const stderr = error && typeof error === "object" && "stderr" in error ? String((error as { stderr: unknown }).stderr) : String(error);
    throw new SourceVideoError(friendlyError(stderr));
  }
}

/** Downloads just the audio track — used to scan the whole source cheaply for highlight moments. */
export async function downloadSourceAudio(url: string, outPathNoExt: string, cookiesPath?: string | null): Promise<string> {
  try {
    await execFileAsync(
      "yt-dlp",
      [...baseArgs(cookiesPath), "-f", "bestaudio[ext=m4a]/bestaudio", "--no-playlist", "-o", `${outPathNoExt}.%(ext)s`, url],
      { maxBuffer: 1024 * 1024 * 20, timeout: 30 * 60 * 1000 }
    );
  } catch (error) {
    const stderr = error && typeof error === "object" && "stderr" in error ? String((error as { stderr: unknown }).stderr) : String(error);
    throw new SourceVideoError(friendlyError(stderr));
  }
  const found = await findByBasename(outPathNoExt);
  if (found) return found;
  throw new SourceVideoError("Audio download finished but the output file could not be found.");
}

/** Downloads just a [startSec, endSec] window of the source at up to 720p — avoids fetching the whole video. */
export async function downloadSourceSection(
  url: string,
  startSec: number,
  endSec: number,
  outPathNoExt: string,
  cookiesPath?: string | null
): Promise<string> {
  const section = `*${startSec.toFixed(2)}-${endSec.toFixed(2)}`;
  try {
    await execFileAsync(
      "yt-dlp",
      [
        ...baseArgs(cookiesPath),
        "-f",
        "best[height<=720]",
        "--remux-video",
        "mp4",
        "--download-sections",
        section,
        "--no-playlist",
        "-o",
        `${outPathNoExt}.%(ext)s`,
        url,
      ],
      { maxBuffer: 1024 * 1024 * 20, timeout: 10 * 60 * 1000 }
    );
  } catch (error) {
    const stderr = error && typeof error === "object" && "stderr" in error ? String((error as { stderr: unknown }).stderr) : String(error);
    throw new SourceVideoError(friendlyError(stderr));
  }
  const mp4Path = `${outPathNoExt}.mp4`;
  if (await fileExists(mp4Path)) return mp4Path;
  const found = await findByBasename(outPathNoExt);
  if (found) return found;
  throw new SourceVideoError("Clip download finished but the output file could not be found.");
}

async function fileExists(p: string): Promise<boolean> {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

/** yt-dlp's chosen extension isn't always predictable (e.g. audio-only streams delivered in an mp4 container) — find whatever it actually wrote. */
async function findByBasename(outPathNoExt: string): Promise<string | null> {
  const dir = path.dirname(outPathNoExt);
  const base = path.basename(outPathNoExt);
  let entries: string[];
  try {
    entries = await readdir(dir);
  } catch {
    return null;
  }
  const match = entries.find((f) => f === base || f.startsWith(`${base}.`));
  return match ? path.join(dir, match) : null;
}
