import { TTSProvider, TTSSynthesisInput, TTSSynthesisResult, VoiceOption } from "./types";
import { LocalEspeakTTSProvider } from "./local-espeak";
import { ElevenLabsTTSProvider } from "./elevenlabs";
import { OpenAITTSProvider } from "./openai";
import { GoogleTTSProvider } from "./google";
import { AzureTTSProvider } from "./azure";

const local = new LocalEspeakTTSProvider();

function configuredProviders(): TTSProvider[] {
  const providers: TTSProvider[] = [local];
  if (process.env.ELEVENLABS_API_KEY) providers.push(new ElevenLabsTTSProvider(process.env.ELEVENLABS_API_KEY));
  if (process.env.OPENAI_API_KEY) providers.push(new OpenAITTSProvider(process.env.OPENAI_API_KEY));
  if (process.env.GOOGLE_TTS_API_KEY) providers.push(new GoogleTTSProvider(process.env.GOOGLE_TTS_API_KEY));
  if (process.env.AZURE_SPEECH_KEY && process.env.AZURE_SPEECH_REGION) {
    providers.push(new AzureTTSProvider(process.env.AZURE_SPEECH_KEY, process.env.AZURE_SPEECH_REGION));
  }
  return providers;
}

export function getTTSProviderForVoice(voiceId: string): TTSProvider {
  for (const provider of configuredProviders()) {
    if (provider.voices().some((v) => v.id === voiceId)) return provider;
  }
  return local;
}

export function listAvailableVoices(): VoiceOption[] {
  return configuredProviders().flatMap((p) => p.voices());
}

/** Synthesizes with the voice's provider; falls back to the local voice on any failure. */
export async function synthesizeWithFallback(
  input: TTSSynthesisInput
): Promise<TTSSynthesisResult & { providerId: string }> {
  const provider = getTTSProviderForVoice(input.voiceId);
  try {
    const result = await provider.synthesize(input);
    return { ...result, providerId: provider.id };
  } catch (error) {
    console.error(`[tts] Provider "${provider.id}" failed, falling back to local voice:`, error);
    if (provider.id === local.id) throw error;
    const result = await local.synthesize({ ...input, voiceId: "local-default" });
    return { ...result, providerId: local.id };
  }
}
