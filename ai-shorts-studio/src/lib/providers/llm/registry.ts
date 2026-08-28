import { LLMProvider } from "./types";
import { AnthropicLLMProvider } from "./anthropic";
import { OpenAILLMProvider } from "./openai";

/**
 * Returns a configured real LLM provider, or null when none is configured —
 * callers should fall back to the local deterministic generator in that case.
 * LLM_PROVIDER can force a specific choice ("anthropic" | "openai"); otherwise
 * the first available API key wins.
 */
export function getConfiguredLLMProvider(): LLMProvider | null {
  const forced = process.env.LLM_PROVIDER?.toLowerCase();

  if (forced === "anthropic" && process.env.ANTHROPIC_API_KEY) {
    return new AnthropicLLMProvider(process.env.ANTHROPIC_API_KEY);
  }
  if (forced === "openai" && process.env.OPENAI_API_KEY) {
    return new OpenAILLMProvider(process.env.OPENAI_API_KEY);
  }
  if (forced === "local") {
    return null;
  }

  if (process.env.ANTHROPIC_API_KEY) {
    return new AnthropicLLMProvider(process.env.ANTHROPIC_API_KEY);
  }
  if (process.env.OPENAI_API_KEY) {
    return new OpenAILLMProvider(process.env.OPENAI_API_KEY);
  }
  return null;
}
