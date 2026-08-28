"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireUserWithDefaultProject } from "@/lib/session";
import { TEMPLATES } from "@/lib/templates";
import { generateIdeas } from "@/lib/generation/concept";
import { Tone } from "@/generated/prisma/enums";
import { revalidatePath } from "next/cache";

const batchSchema = z.object({
  topic: z.string().min(3).max(300),
  niche: z.string().max(100).default(""),
  count: z.coerce.number().int().min(2).max(10).default(5),
  lengthSeconds: z.coerce.number().int().default(30),
  tone: z
    .enum(["DRAMATIC", "FUNNY", "EDUCATIONAL", "MOTIVATIONAL", "STORYTELLING", "LUXURY", "DOCUMENTARY"])
    .default("EDUCATIONAL"),
  voiceId: z.string().default("local-default"),
});

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export async function batchGenerateAction(input: z.infer<typeof batchSchema>): Promise<{ error?: string }> {
  const parsed = batchSchema.safeParse(input);
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Invalid input." };

  const { user, project } = await requireUserWithDefaultProject();
  const { topic, niche, count, lengthSeconds, tone, voiceId } = parsed.data;

  const ideas = await generateIdeas(niche || topic, count);
  const templatesRotation = shuffle(TEMPLATES).slice(0, count);
  while (templatesRotation.length < count) {
    templatesRotation.push(TEMPLATES[templatesRotation.length % TEMPLATES.length]);
  }

  const { generateConcept } = await import("@/lib/generation/concept");

  const createdIds: string[] = [];
  for (let i = 0; i < count; i++) {
    const template = templatesRotation[i];
    const idea = ideas[i % ideas.length];
    const templateRecord = await prisma.template.findUnique({ where: { key: template.key } });

    const short = await prisma.short.create({
      data: {
        userId: user.id,
        projectId: project.id,
        templateId: templateRecord?.id,
        topic: `${topic} — ${idea.angle}`,
        niche: niche || null,
        lengthSeconds,
        tone: tone as Tone,
        voiceId,
        visualStyle: template.visualStyle,
        captionStyle: template.captionStyle,
        musicStyle: template.musicStyle,
        status: "DRAFT",
      },
    });
    createdIds.push(short.id);

    try {
      const concept = await generateConcept({
        topic: `${topic} (${idea.angle})`,
        niche: niche || "",
        tone: tone as Tone,
        lengthSeconds,
        template,
      });

      await prisma.script.create({
        data: { shortId: short.id, hook: concept.script.hook, body: concept.script.body, cta: concept.script.cta, fullText: concept.script.fullText },
      });
      await prisma.scene.createMany({
        data: concept.scenes.map((s) => ({
          shortId: short.id,
          order: s.order,
          durationSec: s.durationSec,
          narration: s.narration,
          visualDesc: s.visualDesc,
          onScreenText: s.onScreenText,
          caption: s.caption,
          transition: s.transition,
          soundEffect: s.soundEffect,
        })),
      });
      await prisma.short.update({ where: { id: short.id }, data: { idea: concept.idea, hook: concept.hook } });
    } catch (error) {
      await prisma.short.update({
        where: { id: short.id },
        data: { status: "FAILED", errorMessage: error instanceof Error ? error.message : "Generation failed." },
      });
    }
  }

  revalidatePath("/shorts");
  redirect("/shorts");
}
