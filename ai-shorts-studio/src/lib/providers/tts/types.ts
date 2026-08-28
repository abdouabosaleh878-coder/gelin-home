export interface VoiceOption {
  id: string;
  name: string;
  provider: string;
  language: string;
  gender?: "male" | "female" | "neutral";
  description?: string;
}

export interface TTSSynthesisInput {
  text: string;
  voiceId: string;
  outPath: string; // absolute path, extension decides container (provider may override)
}

export interface TTSSynthesisResult {
  filePath: string;
  durationSec: number;
  mimeType: string;
}

export interface TTSProvider {
  id: string;
  name: string;
  voices(): VoiceOption[];
  synthesize(input: TTSSynthesisInput): Promise<TTSSynthesisResult>;
}

export class TTSProviderError extends Error {
  constructor(
    public providerId: string,
    message: string,
    public cause?: unknown
  ) {
    super(message);
    this.name = "TTSProviderError";
  }
}
