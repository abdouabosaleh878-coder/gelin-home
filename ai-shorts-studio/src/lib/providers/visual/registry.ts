import { VisualProvider, VisualFetchInput, VisualAsset } from "./types";
import { LocalPlaceholderVisualProvider } from "./local-placeholder";
import { PexelsVisualProvider } from "./pexels";
import { PixabayVisualProvider } from "./pixabay";
import { OpenAIImageVisualProvider } from "./openai-images";

const local = new LocalPlaceholderVisualProvider();

/**
 * Ordered by preference: real stock/AI providers first (when configured),
 * local generated visuals last as the always-available fallback.
 */
export function getConfiguredVisualProviders(): VisualProvider[] {
  const providers: VisualProvider[] = [];
  if (process.env.PEXELS_API_KEY) providers.push(new PexelsVisualProvider(process.env.PEXELS_API_KEY));
  if (process.env.PIXABAY_API_KEY) providers.push(new PixabayVisualProvider(process.env.PIXABAY_API_KEY));
  if (process.env.OPENAI_API_KEY && process.env.VISUAL_PROVIDER === "openai-images") {
    providers.push(new OpenAIImageVisualProvider(process.env.OPENAI_API_KEY));
  }
  providers.push(local);
  return providers;
}

export function getPrimaryVisualProvider(): VisualProvider {
  return getConfiguredVisualProviders()[0] ?? local;
}

/** Tries each configured provider in order, always succeeding via the local fallback. */
export async function fetchVisualWithFallback(input: VisualFetchInput): Promise<VisualAsset & { providerId: string }> {
  const providers = getConfiguredVisualProviders();
  for (const provider of providers) {
    try {
      const asset = await provider.fetchVisual(input);
      return { ...asset, providerId: provider.id };
    } catch (error) {
      console.error(`[visual] Provider "${provider.id}" failed, trying next:`, error);
    }
  }
  const asset = await local.fetchVisual(input);
  return { ...asset, providerId: local.id };
}
