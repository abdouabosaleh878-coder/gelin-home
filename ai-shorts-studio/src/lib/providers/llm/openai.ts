import { LLMProvider, LLMProviderError } from "./types";

export class OpenAILLMProvider implements LLMProvider {
  id = "openai";
  name = "OpenAI";

  constructor(
    private apiKey: string,
    private model: string = process.env.OPENAI_MODEL || "gpt-4.1-mini"
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
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model: this.model,
        temperature,
        max_tokens: maxTokens,
        messages: [
          ...(system ? [{ role: "system", content: system }] : []),
          { role: "user", content: prompt },
        ],
      }),
    });

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      throw new LLMProviderError(this.id, `OpenAI API error ${res.status}: ${body}`);
    }

    const data = (await res.json()) as { choices?: { message?: { content?: string } }[] };
    const text = data.choices?.[0]?.message?.content;
    if (!text) {
      throw new LLMProviderError(this.id, "OpenAI API returned no content");
    }
    return text;
  }
}
