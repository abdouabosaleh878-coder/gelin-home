import { mkdir, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import { VisualProvider, VisualFetchInput, VisualAsset, VisualProviderError } from "./types";

interface PexelsVideoFile {
  link: string;
  width: number;
  height: number;
  quality: string;
  file_type: string;
}

interface PexelsVideo {
  duration: number;
  video_files: PexelsVideoFile[];
}

export class PexelsVisualProvider implements VisualProvider {
  id = "pexels";
  name = "Pexels (stock video)";

  constructor(private apiKey: string) {}

  async fetchVisual({ prompt, outPath }: VisualFetchInput): Promise<VisualAsset> {
    const res = await fetch(
      `https://api.pexels.com/videos/search?query=${encodeURIComponent(prompt)}&orientation=portrait&per_page=5`,
      { headers: { Authorization: this.apiKey } }
    );
    if (!res.ok) {
      const body = await res.text().catch(() => "");
      throw new VisualProviderError(this.id, `Pexels API error ${res.status}: ${body}`);
    }
    const data = (await res.json()) as { videos?: PexelsVideo[] };
    const video = data.videos?.[0];
    const file =
      video?.video_files
        .filter((f) => f.file_type === "video/mp4" && f.height >= f.width)
        .sort((a, b) => a.width - b.width)[0] ?? video?.video_files[0];

    if (!video || !file) {
      throw new VisualProviderError(this.id, `No Pexels video results for "${prompt}"`);
    }

    const mp4Path = outPath.endsWith(".mp4") ? outPath : `${outPath}.mp4`;
    await mkdir(dirname(mp4Path), { recursive: true });

    const videoRes = await fetch(file.link);
    if (!videoRes.ok) throw new VisualProviderError(this.id, `Failed to download Pexels video: ${videoRes.status}`);
    await writeFile(mp4Path, Buffer.from(await videoRes.arrayBuffer()));

    return {
      filePath: mp4Path,
      type: "video",
      width: file.width,
      height: file.height,
      durationSec: video.duration,
      mimeType: "video/mp4",
    };
  }
}
