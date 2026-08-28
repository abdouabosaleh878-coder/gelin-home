import { z } from "zod";
import { Tone } from "@/generated/prisma/enums";
import { getConfiguredLLMProvider } from "@/lib/providers/llm/registry";
import { TemplateDefinition } from "@/lib/templates";
import { planScenes, beatsForTemplate, PlannedScene } from "@/lib/generation/scenes";
import { generateHook, generateScript, generateBeatLines, generateViralIdeas, GeneratedIdea, localRewrite } from "@/lib/generation/local-copy";

export interface GeneratedConcept {
  idea: string;
  hook: string;
  script: { hook: string; body: string; cta: string; fullText: string };
  scenes: PlannedScene[];
  source: "llm" | "local";
  warning?: string;
}

interface ConceptInput {
  topic: string;
  niche: string;
  tone: Tone;
  lengthSeconds: number;
  template: TemplateDefinition;
  targetAudience?: string;
}

const llmSchema = z.object({
  idea: z.string(),
  hook: z.string(),
  body: z.string(),
  cta: z.string(),
  scenes: z
    .array(
      z.object({
        beat: z.string(),
        narration: z.string(),
        visualDesc: z.string().optional(),
        onScreenText: z.string().optional(),
        soundEffect: z.string().optional(),
      })
    )
    .min(1),
});

function buildPrompt(input: ConceptInput): string {
  const { topic, niche, tone, lengthSeconds, template, targetAudience } = input;
  return `You are a viral short-form video scriptwriter for YouTube Shorts / TikTok / Instagram Reels.

Topic/idea: "${topic}"
Niche: ${niche || "general"}
Target audience: ${targetAudience || "general audience"}
Tone: ${tone}
Target length: ${lengthSeconds} seconds
Template: ${template.name} — beats: ${template.scriptStructure.beats.join(" -> ")}

Write a script following the structure HOOK -> CURIOSITY -> VALUE/STORY -> PAYOFF -> CTA. The hook must grab attention in the first 1-3 seconds and must NOT be a generic cliché. Avoid sounding robotic — write like a real creator talking directly to camera.

Respond with ONLY strict JSON (no markdown fences, no commentary) matching this shape:
{
  "idea": "one sentence concept description",
  "hook": "the hook line",
  "body": "the curiosity + value/story + payoff, as flowing narration (2-4 sentences)",
  "cta": "a short call to action line",
  "scenes": [
    { "beat": "HOOK", "narration": "...", "visualDesc": "...", "onScreenText": "...", "soundEffect": "..." },
    ... one entry per beat in the template, in order, ending with CTA ...
  ]
}`;
}

function stripJsonFences(text: string): string {
  const trimmed = text.trim();
  const fenceMatch = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/i);
  return fenceMatch ? fenceMatch[1].trim() : trimmed;
}

async function tryLLM(input: ConceptInput): Promise<GeneratedConcept | null> {
  const provider = getConfiguredLLMProvider();
  if (!provider) return null;

  try {
    const raw = await provider.generateText({
      system: "You write concise, high-retention short-form video scripts and respond with strict JSON only.",
      prompt: buildPrompt(input),
      maxTokens: 1400,
      temperature: 1,
    });
    const parsed = llmSchema.parse(JSON.parse(stripJsonFences(raw)));

    const scenes = planScenes({
      topic: input.topic,
      hook: parsed.hook,
      cta: parsed.cta,
      lengthSeconds: input.lengthSeconds,
      visualStyle: input.template.visualStyle,
      transitionStyle: input.template.transitionStyle,
      tone: input.tone,
      beatNarrations: parsed.scenes
        .filter((s) => s.beat !== "HOOK" && s.beat !== "CTA")
        .map((s) => ({
          beat: s.beat,
          narration: s.narration,
          visualDesc: s.visualDesc,
          onScreenText: s.onScreenText,
          soundEffect: s.soundEffect,
        })),
    });

    return {
      idea: parsed.idea,
      hook: parsed.hook,
      script: { hook: parsed.hook, body: parsed.body, cta: parsed.cta, fullText: `${parsed.hook} ${parsed.body} ${parsed.cta}` },
      scenes,
      source: "llm",
    };
  } catch (error) {
    console.error("[generation] LLM concept generation failed, falling back to local generator:", error);
    return null;
  }
}

function generateLocal(input: ConceptInput): GeneratedConcept {
  const { topic, niche, tone, lengthSeconds, template } = input;
  const hook = generateHook(topic, niche, template.scriptStructure.hookStyle);
  const script = generateScript({ topic, niche, tone, hook, ctaStyle: template.scriptStructure.ctaStyle });
  const beats = beatsForTemplate(template.scriptStructure);
  const beatLines = generateBeatLines(beats, topic, niche, tone);

  const scenes = planScenes({
    topic,
    hook,
    cta: script.cta,
    lengthSeconds,
    visualStyle: template.visualStyle,
    transitionStyle: template.transitionStyle,
    tone,
    beatNarrations: beatLines,
  });

  return {
    idea: `${topic} — a ${template.name.toLowerCase()} short for ${niche || "a general audience"}`,
    hook,
    script,
    scenes,
    source: "local",
  };
}

export async function generateConcept(input: ConceptInput): Promise<GeneratedConcept> {
  const llmResult = await tryLLM(input);
  if (llmResult) return llmResult;

  const local = generateLocal(input);
  const usedRealProvider = getConfiguredLLMProvider() !== null;
  return usedRealProvider ? { ...local, warning: "AI provider failed; used local fallback generator." } : local;
}

export async function generateIdeas(niche: string, count: number): Promise<GeneratedIdea[]> {
  const provider = getConfiguredLLMProvider();
  if (!provider) return generateViralIdeas(niche, count);

  try {
    const raw = await provider.generateText({
      system: "You brainstorm viral short-form video ideas and respond with strict JSON only.",
      prompt: `Generate ${count} distinct, high-retention short-form video ideas for the niche "${niche}". Each must have a different angle (statistic, myth-busting, personal story, countdown, before/after, hot take, mistake-to-avoid, insider secret). Respond with ONLY strict JSON: { "ideas": [{ "idea": "...", "angle": "..." }] }`,
      maxTokens: 800,
      temperature: 1,
    });
    const parsed = z
      .object({ ideas: z.array(z.object({ idea: z.string(), angle: z.string() })).min(1) })
      .parse(JSON.parse(stripJsonFences(raw)));
    return parsed.ideas;
  } catch (error) {
    console.error("[generation] LLM idea generation failed, falling back to local generator:", error);
    return generateViralIdeas(niche, count);
  }
}

export type AssistantAction =
  | "stronger-hook"
  | "more-viral"
  | "shorter"
  | "more-dramatic"
  | "funnier"
  | "rewrite"
  | "improve-retention"
  | "stronger-cta";

const ASSISTANT_PROMPTS: Record<AssistantAction, string> = {
  "stronger-hook": "Rewrite this so the opening line is a much stronger, higher-retention hook. Keep it concise.",
  "more-viral": "Rewrite this to feel more viral and shareable, using proven short-form patterns.",
  shorter: "Shorten this significantly while keeping the core meaning and the hook.",
  "more-dramatic": "Rewrite this with a more dramatic, tension-filled tone.",
  funnier: "Rewrite this to be funnier while staying on-topic.",
  rewrite: "Rewrite this script from scratch with a fresh angle, same topic.",
  "improve-retention": "Rewrite this to maximize retention — add curiosity gaps and pacing.",
  "stronger-cta": "Rewrite this, replacing the ending with a stronger, more specific call to action.",
};

export async function applyAssistantAction(
  action: AssistantAction,
  text: string,
  context: { topic: string; niche: string; tone: Tone }
): Promise<{ text: string; source: "llm" | "local" }> {
  const provider = getConfiguredLLMProvider();
  if (provider) {
    try {
      const raw = await provider.generateText({
        system: "You edit short-form video scripts. Respond with ONLY the rewritten text, no commentary or quotes.",
        prompt: `${ASSISTANT_PROMPTS[action]}\n\nTopic: ${context.topic}\nTone: ${context.tone}\n\nText:\n${text}`,
        maxTokens: 600,
        temperature: 0.9,
      });
      return { text: raw.trim(), source: "llm" };
    } catch (error) {
      console.error(`[generation] LLM assistant action "${action}" failed, using local fallback:`, error);
    }
  }
  return { text: localRewrite(action, { text, tone: context.tone, topic: context.topic, niche: context.niche }), source: "local" };
}
