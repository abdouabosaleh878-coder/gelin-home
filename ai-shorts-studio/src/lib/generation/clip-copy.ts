import { getConfiguredLLMProvider } from "@/lib/providers/llm/registry";

export interface ClipMetadata {
  caption: string;
  hashtags: string[];
}

const STOPWORDS = new Set([
  "the","a","an","and","or","but","is","are","was","were","be","been","to","of","in","on","for",
  "with","this","that","it","i","you","we","they","he","she","my","your","our","his","her","its",
  "at","as","by","from","so","just","like","really","get","got","going","gonna","yeah","okay","ok",
]);

function localHashtagsFromText(text: string, extra: string[]): string[] {
  const words = text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 3 && !STOPWORDS.has(w));

  const counts = new Map<string, number>();
  for (const w of words) counts.set(w, (counts.get(w) ?? 0) + 1);

  const ranked = [...counts.entries()].sort((a, b) => b[1] - a[1]).map(([w]) => w);
  const tags = [...new Set([...extra, ...ranked])].slice(0, 6).map((t) => `#${t.replace(/\s+/g, "")}`);

  return [...tags, "#shorts", "#viral", "#fyp"].slice(0, 8);
}

function localCaption(transcript: string, sourceTitle: string): string {
  const snippet = transcript.split(/(?<=[.!?])\s+/)[0]?.slice(0, 100) ?? sourceTitle;
  return `${snippet}${snippet.endsWith(".") ? "" : "..."} 👀`;
}

export async function generateClipMetadata(params: { transcript: string; sourceTitle: string; niche?: string }): Promise<ClipMetadata> {
  const { transcript, sourceTitle, niche } = params;
  const provider = getConfiguredLLMProvider();

  if (provider) {
    try {
      const raw = await provider.generateText({
        system: "You write short, punchy TikTok/Shorts captions and hashtags. Respond with ONLY strict JSON.",
        prompt: `Video title: "${sourceTitle}"\nNiche: ${niche || "general"}\nTranscript snippet: "${transcript.slice(0, 600)}"\n\nWrite a short, scroll-stopping caption (max 150 chars, can include an emoji) and 6-8 relevant hashtags (include #shorts and #fyp). Respond with ONLY: { "caption": "...", "hashtags": ["#...", ...] }`,
        maxTokens: 300,
        temperature: 0.9,
      });
      const trimmed = raw.trim().replace(/```(?:json)?/g, "").trim();
      const parsed = JSON.parse(trimmed) as ClipMetadata;
      if (parsed.caption && Array.isArray(parsed.hashtags)) return parsed;
    } catch (error) {
      console.error("[clip-copy] LLM metadata generation failed, using local fallback:", error);
    }
  }

  return {
    caption: localCaption(transcript, sourceTitle),
    hashtags: localHashtagsFromText(transcript || sourceTitle, niche ? [niche.replace(/\s+/g, "")] : []),
  };
}
