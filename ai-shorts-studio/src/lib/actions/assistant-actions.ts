"use server";

import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/session";
import { generateIdeas, applyAssistantAction, AssistantAction } from "@/lib/generation/concept";
import { revalidatePath } from "next/cache";

export async function generateViralIdeasAction(niche: string, count = 5) {
  await requireUser();
  const safeCount = Math.min(10, Math.max(1, count));
  const ideas = await generateIdeas(niche || "general", safeCount);
  return { ideas };
}

const ASSISTANT_TARGETS = ["hook", "body", "cta"] as const;
type AssistantTarget = (typeof ASSISTANT_TARGETS)[number];

export async function applyScriptAssistantAction(
  shortId: string,
  action: AssistantAction,
  target: AssistantTarget = "body"
): Promise<{ error?: string }> {
  const user = await requireUser();
  const short = await prisma.short.findFirst({ where: { id: shortId, userId: user.id }, include: { script: true } });
  if (!short || !short.script) return { error: "Short not found." };

  const source = target === "hook" ? short.script.hook : target === "cta" ? short.script.cta : short.script.body;

  const result = await applyAssistantAction(action, source, { topic: short.topic, niche: short.niche ?? "", tone: short.tone });

  const updates: Record<string, string> = {};
  if (action === "shorter" && target === "body") {
    updates.body = result.text;
  } else if (target === "hook") {
    updates.hook = result.text;
  } else if (target === "cta") {
    updates.cta = result.text;
  } else {
    updates.body = result.text;
  }

  const next = {
    hook: updates.hook ?? short.script.hook,
    body: updates.body ?? short.script.body,
    cta: updates.cta ?? short.script.cta,
  };

  await prisma.script.update({
    where: { shortId },
    data: { ...next, fullText: `${next.hook} ${next.body} ${next.cta}` },
  });
  if (updates.hook) {
    await prisma.short.update({ where: { id: shortId }, data: { hook: updates.hook } });
  }

  revalidatePath(`/shorts/${shortId}`);
  return {};
}
