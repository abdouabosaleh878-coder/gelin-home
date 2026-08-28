import { spawn } from "node:child_process";
import { mkdir } from "node:fs/promises";
import { dirname } from "node:path";
import { TTSProvider, TTSSynthesisInput, TTSSynthesisResult, VoiceOption, TTSProviderError } from "./types";
import { getMediaDurationSec } from "@/lib/media/ffprobe";

interface LocalVoiceConfig {
  espeakVoice: string;
  pitch: number;
  speed: number;
}

const LOCAL_VOICES: Record<string, LocalVoiceConfig> = {
  "local-default": { espeakVoice: "en-us", pitch: 50, speed: 165 },
  "local-warm": { espeakVoice: "en-us", pitch: 38, speed: 155 },
  "local-energetic": { espeakVoice: "en-us", pitch: 62, speed: 180 },
  "local-british": { espeakVoice: "en-gb", pitch: 45, speed: 160 },
};

export class LocalEspeakTTSProvider implements TTSProvider {
  id = "local";
  name = "Local (offline, espeak-ng)";

  voices(): VoiceOption[] {
    return [
      { id: "local-default", name: "Default", provider: this.id, language: "en-US", gender: "neutral" },
      { id: "local-warm", name: "Warm & Calm", provider: this.id, language: "en-US", gender: "neutral" },
      { id: "local-energetic", name: "Energetic", provider: this.id, language: "en-US", gender: "neutral" },
      { id: "local-british", name: "British", provider: this.id, language: "en-GB", gender: "neutral" },
    ];
  }

  async synthesize({ text, voiceId, outPath }: TTSSynthesisInput): Promise<TTSSynthesisResult> {
    const config = LOCAL_VOICES[voiceId] ?? LOCAL_VOICES["local-default"];
    const wavPath = outPath.endsWith(".wav") ? outPath : `${outPath}.wav`;
    await mkdir(dirname(wavPath), { recursive: true });

    await new Promise<void>((resolve, reject) => {
      const child = spawn("espeak-ng", [
        "-v",
        config.espeakVoice,
        "-p",
        String(config.pitch),
        "-s",
        String(config.speed),
        "-w",
        wavPath,
      ]);

      let stderr = "";
      child.stderr.on("data", (chunk) => (stderr += chunk.toString()));
      child.on("error", (error) => reject(new TTSProviderError(this.id, "Failed to launch espeak-ng", error)));
      child.on("close", (code) => {
        if (code === 0) resolve();
        else reject(new TTSProviderError(this.id, `espeak-ng exited with code ${code}: ${stderr}`));
      });

      child.stdin.write(text);
      child.stdin.end();
    });

    const durationSec = await getMediaDurationSec(wavPath);
    return { filePath: wavPath, durationSec, mimeType: "audio/wav" };
  }
}
