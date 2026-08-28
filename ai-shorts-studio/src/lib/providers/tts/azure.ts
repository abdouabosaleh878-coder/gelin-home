import { mkdir, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import { TTSProvider, TTSSynthesisInput, TTSSynthesisResult, VoiceOption, TTSProviderError } from "./types";
import { getMediaDurationSec } from "@/lib/media/ffprobe";

const VOICES: VoiceOption[] = [
  { id: "en-US-JennyNeural", name: "Jenny", provider: "azure", language: "en-US", gender: "female" },
  { id: "en-US-GuyNeural", name: "Guy", provider: "azure", language: "en-US", gender: "male" },
  { id: "en-GB-SoniaNeural", name: "Sonia (UK)", provider: "azure", language: "en-GB", gender: "female" },
];

function escapeXml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export class AzureTTSProvider implements TTSProvider {
  id = "azure";
  name = "Azure Speech";

  constructor(
    private apiKey: string,
    private region: string
  ) {}

  voices(): VoiceOption[] {
    return VOICES;
  }

  async synthesize({ text, voiceId, outPath }: TTSSynthesisInput): Promise<TTSSynthesisResult> {
    const mp3Path = outPath.endsWith(".mp3") ? outPath : `${outPath}.mp3`;
    await mkdir(dirname(mp3Path), { recursive: true });

    const voice = VOICES.find((v) => v.id === voiceId) ?? VOICES[0];
    const ssml = `<speak version="1.0" xml:lang="${voice.language}"><voice name="${voiceId}">${escapeXml(text)}</voice></speak>`;

    const res = await fetch(`https://${this.region}.tts.speech.microsoft.com/cognitiveservices/v1`, {
      method: "POST",
      headers: {
        "Ocp-Apim-Subscription-Key": this.apiKey,
        "Content-Type": "application/ssml+xml",
        "X-Microsoft-OutputFormat": "audio-16khz-128kbitrate-mono-mp3",
      },
      body: ssml,
    });

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      throw new TTSProviderError(this.id, `Azure Speech API error ${res.status}: ${body}`);
    }

    const buffer = Buffer.from(await res.arrayBuffer());
    await writeFile(mp3Path, buffer);
    const durationSec = await getMediaDurationSec(mp3Path);
    return { filePath: mp3Path, durationSec, mimeType: "audio/mpeg" };
  }
}
