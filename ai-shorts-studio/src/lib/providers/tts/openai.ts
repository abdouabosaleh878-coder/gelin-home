import { mkdir, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import { TTSProvider, TTSSynthesisInput, TTSSynthesisResult, VoiceOption, TTSProviderError } from "./types";
import { getMediaDurationSec } from "@/lib/media/ffprobe";

const VOICES: VoiceOption[] = [
  { id: "alloy", name: "Alloy", provider: "openai", language: "en-US", gender: "neutral" },
  { id: "verse", name: "Verse", provider: "openai", language: "en-US", gender: "male" },
  { id: "aria", name: "Aria", provider: "openai", language: "en-US", gender: "female" },
];

export class OpenAITTSProvider implements TTSProvider {
  id = "openai";
  name = "OpenAI";

  constructor(private apiKey: string) {}

  voices(): VoiceOption[] {
    return VOICES;
  }

  async synthesize({ text, voiceId, outPath }: TTSSynthesisInput): Promise<TTSSynthesisResult> {
    const mp3Path = outPath.endsWith(".mp3") ? outPath : `${outPath}.mp3`;
    await mkdir(dirname(mp3Path), { recursive: true });

    const res = await fetch("https://api.openai.com/v1/audio/speech", {
      method: "POST",
      headers: {
        authorization: `Bearer ${this.apiKey}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.OPENAI_TTS_MODEL || "tts-1",
        voice: voiceId,
        input: text,
        format: "mp3",
      }),
    });

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      throw new TTSProviderError(this.id, `OpenAI TTS API error ${res.status}: ${body}`);
    }

    const buffer = Buffer.from(await res.arrayBuffer());
    await writeFile(mp3Path, buffer);

    const durationSec = await getMediaDurationSec(mp3Path);
    return { filePath: mp3Path, durationSec, mimeType: "audio/mpeg" };
  }
}
