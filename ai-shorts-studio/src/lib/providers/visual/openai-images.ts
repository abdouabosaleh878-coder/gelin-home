import { mkdir, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import { VisualProvider, VisualFetchInput, VisualAsset, VisualProviderError } from "./types";

export class OpenAIImageVisualProvider implements VisualProvider {
  id = "openai-images";
  name = "OpenAI (AI-generated images)";

  constructor(private apiKey: string) {}

  async fetchVisual({ prompt, outPath }: VisualFetchInput): Promise<VisualAsset> {
    const res = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        authorization: `Bearer ${this.apiKey}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.OPENAI_IMAGE_MODEL || "gpt-image-1",
        prompt: `${prompt}. Cinematic, high detail, vertical composition.`,
        size: "1024x1536",
      }),
    });

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      throw new VisualProviderError(this.id, `OpenAI Images API error ${res.status}: ${body}`);
    }

    const data = (await res.json()) as { data?: { b64_json?: string }[] };
    const b64 = data.data?.[0]?.b64_json;
    if (!b64) {
      throw new VisualProviderError(this.id, "OpenAI Images API returned no image data");
    }

    const pngPath = outPath.endsWith(".png") ? outPath : `${outPath}.png`;
    await mkdir(dirname(pngPath), { recursive: true });
    await writeFile(pngPath, Buffer.from(b64, "base64"));

    return { filePath: pngPath, type: "image", width: 1024, height: 1536, mimeType: "image/png" };
  }
}
