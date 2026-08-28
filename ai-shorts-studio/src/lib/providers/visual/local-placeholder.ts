import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { mkdir, writeFile, rm } from "node:fs/promises";
import { dirname } from "node:path";
import { VisualProvider, VisualFetchInput, VisualAsset } from "./types";

const execFileAsync = promisify(execFile);

const PALETTES: [string, string][] = [
  ["#2b1055", "#7597de"],
  ["#0f2027", "#2c5364"],
  ["#3a1c71", "#d76d77"],
  ["#134e5e", "#71b280"],
  ["#41295a", "#2f0743"],
  ["#1f4037", "#99f2c8"],
  ["#4b134f", "#c94b4b"],
  ["#0f0c29", "#302b63"],
];

const FONT_PATH = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf";

function hashString(input: string): number {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash * 31 + input.charCodeAt(i)) >>> 0;
  }
  return hash;
}

function wrapText(text: string, maxChars: number): string {
  const words = text.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    if ((current + " " + word).trim().length > maxChars) {
      if (current) lines.push(current.trim());
      current = word;
    } else {
      current = `${current} ${word}`.trim();
    }
  }
  if (current) lines.push(current);
  return lines.slice(0, 6).join("\n");
}

/**
 * Generates a real 1080x1920 image entirely offline via ffmpeg (gradient
 * background + wrapped label). Works with zero API keys so the pipeline is
 * fully functional out of the box; swap in a stock/AI provider for real
 * photography or footage.
 */
export class LocalPlaceholderVisualProvider implements VisualProvider {
  id = "local";
  name = "Local generated visuals (offline)";

  async fetchVisual({ prompt, outPath }: VisualFetchInput): Promise<VisualAsset> {
    const pngPath = outPath.endsWith(".png") ? outPath : `${outPath}.png`;
    await mkdir(dirname(pngPath), { recursive: true });

    const index = hashString(prompt) % PALETTES.length;
    const [c0, c1] = PALETTES[index];
    const label = wrapText(prompt, 26);

    const textFilePath = `${pngPath}.label.txt`;
    await writeFile(textFilePath, label, "utf8");

    const filter = [
      `drawtext=fontfile=${FONT_PATH}:textfile=${textFilePath}:fontcolor=white@0.92:fontsize=52`,
      "line_spacing=14:x=(w-text_w)/2:y=(h-text_h)/2",
      "box=1:boxcolor=black@0.28:boxborderw=28",
    ].join(":");

    try {
      await execFileAsync("ffmpeg", [
        "-y",
        "-f",
        "lavfi",
        "-i",
        `gradients=s=1080x1920:c0=${c0}:c1=${c1}:x0=0:y0=0:x1=1080:y1=1920`,
        "-vf",
        filter,
        "-frames:v",
        "1",
        "-update",
        "1",
        pngPath,
      ]);
    } finally {
      await rm(textFilePath, { force: true });
    }

    return { filePath: pngPath, type: "image", width: 1080, height: 1920, mimeType: "image/png" };
  }
}
