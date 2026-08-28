import { mkdir, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import { TTSProvider, TTSSynthesisInput, TTSSynthesisResult, VoiceOption, TTSProviderError } from "./types";
import { getMediaDurationSec } from "@/lib/media/ffprobe";

const VOICES: VoiceOption[] = [
  { id: "en-US-Neural2-C", name: "Neural2-C", provider: "google", language: "en-US", gender: "female" },
  { id: "en-US-Neural2-D", name: "Neural2-D", provider: "google", language: "en-US", gender: "male" },
  { id: "en-GB-Neural2-A", name: "Neural2-A (UK)", provider: "google", language: "en-GB", gender: "female" },
];

export class GoogleTTSProvider implements TTSProvider {
  id = "google";
  name = "Google Cloud TTS";

  constructor(private apiKey: string) {}

  voices(): VoiceOption[] {
    return VOICES;
  }

  async synthesize({ text, voiceId, outPath }: TTSSynthesisInput): Promise<TTSSynthesisResult> {
    const mp3Path = outPath.endsWith(".mp3") ? outPath : `${outPath}.mp3`;
    await mkdir(dirname(mp3Path), { recursive: true });

    const voice = VOICES.find((v) => v.id === voiceId) ?? VOICES[0];
    const res = await fetch(`https://texttospeech.googleapis.com/v1/text:synthesize?key=${this.apiKey}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        input: { text },
        voice: { languageCode: voice.language, name: voiceId },
        audioConfig: { audioEncoding: "MP3" },
      }),
    });

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      throw new TTSProviderError(this.id, `Google TTS API error ${res.status}: ${body}`);
    }

    const data = (await res.json()) as { audioContent?: string };
    if (!data.audioContent) {
      throw new TTSProviderError(this.id, "Google TTS API returned no audio content");
    }

    await writeFile(mp3Path, Buffer.from(data.audioContent, "base64"));
    const durationSec = await getMediaDurationSec(mp3Path);
    return { filePath: mp3Path, durationSec, mimeType: "audio/mpeg" };
  }
}
