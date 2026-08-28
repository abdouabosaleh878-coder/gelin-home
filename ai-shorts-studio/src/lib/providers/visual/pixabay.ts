import { mkdir, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import { VisualProvider, VisualFetchInput, VisualAsset, VisualProviderError } from "./types";

interface PixabayHit {
  duration: number;
  videos: Record<string, { url: string; width: number; height: number }>;
}

export class PixabayVisualProvider implements VisualProvider {
  id = "pixabay";
  name = "Pixabay (stock video)";

  constructor(private apiKey: string) {}

  async fetchVisual({ prompt, outPath }: VisualFetchInput): Promise<VisualAsset> {
    const res = await fetch(
      `https://pixabay.com/api/videos/?key=${this.apiKey}&q=${encodeURIComponent(prompt)}&orientation=vertical&per_page=5`
    );
    if (!res.ok) {
      const body = await res.text().catch(() => "");
      throw new VisualProviderError(this.id, `Pixabay API error ${res.status}: ${body}`);
    }
    const data = (await res.json()) as { hits?: PixabayHit[] };
    const hit = data.hits?.[0];
    const file = hit?.videos.medium ?? hit?.videos.small ?? Object.values(hit?.videos ?? {})[0];

    if (!hit || !file) {
      throw new VisualProviderError(this.id, `No Pixabay video results for "${prompt}"`);
    }

    const mp4Path = outPath.endsWith(".mp4") ? outPath : `${outPath}.mp4`;
    await mkdir(dirname(mp4Path), { recursive: true });

    const videoRes = await fetch(file.url);
    if (!videoRes.ok) throw new VisualProviderError(this.id, `Failed to download Pixabay video: ${videoRes.status}`);
    await writeFile(mp4Path, Buffer.from(await videoRes.arrayBuffer()));

    return {
      filePath: mp4Path,
      type: "video",
      width: file.width,
      height: file.height,
      durationSec: hit.duration,
      mimeType: "video/mp4",
    };
  }
}
