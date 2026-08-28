import { LLMProvider, LLMProviderError } from "./types";

export class AnthropicLLMProvider implements LLMProvider {
  id = "anthropic";
  name = "Anthropic Claude";

  constructor(
    private apiKey: string,
    private model: string = process.env.ANTHROPIC_MODEL || "claude-sonnet-5"
  ) {}

  async generateText({
    system,
    prompt,
    maxTokens = 1024,
    temperature = 0.9,
  }: {
    system?: string;
    prompt: string;
    maxTokens?: number;
    temperature?: number;
  }): Promise<string> {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": this.apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: this.model,
        max_tokens: maxTokens,
        temperature,
        system,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      throw new LLMProviderError(this.id, `Anthropic API error ${res.status}: ${body}`);
    }

    const data = (await res.json()) as { content?: { type: string; text?: string }[] };
    const text = data.content?.find((c) => c.type === "text")?.text;
    if (!text) {
      throw new LLMProviderError(this.id, "Anthropic API returned no text content");
    }
    return text;
  }
}
