export interface LLMProvider {
  id: string;
  name: string;
  /** Sends a prompt, returns raw text. Callers are responsible for parsing/validating the result. */
  generateText(input: { system?: string; prompt: string; maxTokens?: number; temperature?: number }): Promise<string>;
}

export class LLMProviderError extends Error {
  constructor(
    public providerId: string,
    message: string,
    public cause?: unknown
  ) {
    super(message);
    this.name = "LLMProviderError";
  }
}
