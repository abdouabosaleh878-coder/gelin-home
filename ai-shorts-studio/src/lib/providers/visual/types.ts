export interface VisualAsset {
  filePath: string;
  type: "image" | "video";
  width: number;
  height: number;
  durationSec?: number;
  mimeType: string;
}

export interface VisualFetchInput {
  prompt: string;
  outPath: string;
}

export interface VisualProvider {
  id: string;
  name: string;
  fetchVisual(input: VisualFetchInput): Promise<VisualAsset>;
}

export class VisualProviderError extends Error {
  constructor(
    public providerId: string,
    message: string,
    public cause?: unknown
  ) {
    super(message);
    this.name = "VisualProviderError";
  }
}
