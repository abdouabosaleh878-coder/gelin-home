import { mkdir, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import { TTSProvider, TTSSynthesisInput, TTSSynthesisResult, VoiceOption, TTSProviderError } from "./types";
import { getMediaDurationSec } from "@/lib/media/ffprobe";

const DEFAULT_VOICES: VoiceOption[] = [
  { id: "21m00Tcm4TlvDq8ikWAM", name: "Rachel", provider: "elevenlabs", language: "en-US", gender: "female" },
  { id: "TxGEqnHWrfWFTfGW9XjX", name: "Josh", provider: "elevenlabs", language: "en-US", gender: "male" },
  { id: "EXAVITQu4vr4xnSDxMaL", name: "Bella", provider: "elevenlabs", language: "en-US", gender: "female" },
];

export class ElevenLabsTTSProvider implements TTSProvider {
  id = "elevenlabs";
  name = "ElevenLabs";

  constructor(private apiKey: string) {}

  voices(): VoiceOption[] {
    return DEFAULT_VOICES;
  }

  async synthesize({ text, voiceId, outPath }: TTSSynthesisInput): Promise<TTSSynthesisResult> {
    const mp3Path = outPath.endsWith(".mp3") ? outPath : `${outPath}.mp3`;
    await mkdir(dirname(mp3Path), { recursive: true });

    const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
      method: "POST",
      headers: {
        "xi-api-key": this.apiKey,
        "content-type": "application/json",
        accept: "audio/mpeg",
      },
      body: JSON.stringify({
        text,
        model_id: process.env.ELEVENLABS_MODEL || "eleven_multilingual_v2",
      }),
    });

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      throw new TTSProviderError(this.id, `ElevenLabs API error ${res.status}: ${body}`);
    }

    const buffer = Buffer.from(await res.arrayBuffer());
    await writeFile(mp3Path, buffer);

    const durationSec = await getMediaDurationSec(mp3Path);
    return { filePath: mp3Path, durationSec, mimeType: "audio/mpeg" };
  }
}
