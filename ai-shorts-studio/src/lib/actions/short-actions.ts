"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireUserWithDefaultProject, requireUser } from "@/lib/session";
import { getTemplate, TEMPLATES } from "@/lib/templates";
import { generateConcept } from "@/lib/generation/concept";
import { cleanupShortStorage } from "@/lib/media/pipeline";
import { Tone } from "@/generated/prisma/enums";

const TONE_VALUES = ["DRAMATIC", "FUNNY", "EDUCATIONAL", "MOTIVATIONAL", "STORYTELLING", "LUXURY", "DOCUMENTARY"] as const;

const createShortSchema = z.object({
  topic: z.string().min(3, "Give it a bit more detail").max(300),
  niche: z.string().max(100).optional().default(""),
  targetAudience: z.string().max(200).optional().default(""),
  lengthSeconds: z.coerce.number().int().refine((v) => [15, 30, 45, 60].includes(v), "Invalid length"),
  language: z.string().min(2).max(10).default("en"),
  voiceId: z.string().min(1).default("local-default"),
  tone: z.enum(TONE_VALUES).default("EDUCATIONAL"),
  visualStyle: z.string().min(1).default("cinematic-stock"),
  captionStyle: z.string().min(1).default("bold-highlight"),
  musicStyle: z.string().min(1).default("upbeat"),
  templateKey: z.string().min(1).default("facts"),
});

export type CreateShortInput = z.infer<typeof createShortSchema>;
export type ActionResult<T = undefined> = { error?: string; data?: T };

async function generateAndPersistConcept(shortId: string) {
  const short = await prisma.short.findUniqueOrThrow({ where: { id: shortId } });
  const templateRecord = short.templateId ? await prisma.template.findUnique({ where: { id: short.templateId } }) : null;
  const template = getTemplate(templateRecord?.key ?? "facts") ?? TEMPLATES[0];

  const concept = await generateConcept({
    topic: short.topic,
    niche: short.niche ?? "",
    tone: short.tone,
    lengthSeconds: short.lengthSeconds,
    template,
    targetAudience: short.targetAudience ?? undefined,
  });

  await prisma.scene.deleteMany({ where: { shortId } });
  await prisma.script.deleteMany({ where: { shortId } });

  await prisma.script.create({
    data: { shortId, hook: concept.script.hook, body: concept.script.body, cta: concept.script.cta, fullText: concept.script.fullText },
  });

  await prisma.scene.createMany({
    data: concept.scenes.map((s) => ({
      shortId,
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

  await prisma.short.update({
    where: { id: shortId },
    data: {
      idea: concept.idea,
      hook: concept.hook,
      status: "DRAFT",
      finalVideoAssetId: null,
      thumbnailAssetId: null,
      errorMessage: concept.warning ?? null,
    },
  });

  return concept;
}

export async function createShortAction(input: CreateShortInput): Promise<ActionResult<{ shortId: string }>> {
  const parsed = createShortSchema.safeParse(input);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }
  const { user, project } = await requireUserWithDefaultProject();
  const data = parsed.data;

  const template = await prisma.template.findUnique({ where: { key: data.templateKey } });

  const short = await prisma.short.create({
    data: {
      userId: user.id,
      projectId: project.id,
      templateId: template?.id,
      topic: data.topic,
      niche: data.niche || null,
      targetAudience: data.targetAudience || null,
      lengthSeconds: data.lengthSeconds,
      language: data.language,
      voiceId: data.voiceId,
      tone: data.tone as Tone,
      visualStyle: data.visualStyle,
      captionStyle: data.captionStyle,
      musicStyle: data.musicStyle,
      status: "DRAFT",
    },
  });

  try {
    await generateAndPersistConcept(short.id);
  } catch (error) {
    console.error("[shorts] concept generation failed:", error);
    await prisma.short.update({
      where: { id: short.id },
      data: { status: "FAILED", errorMessage: error instanceof Error ? error.message : "Generation failed." },
    });
  }

  revalidatePath("/shorts");
  redirect(`/shorts/${short.id}`);
}

export async function regenerateAllAction(shortId: string): Promise<ActionResult> {
  const user = await requireUser();
  const short = await prisma.short.findFirst({ where: { id: shortId, userId: user.id } });
  if (!short) return { error: "Short not found." };

  try {
    await generateAndPersistConcept(shortId);
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Regeneration failed." };
  }

  revalidatePath(`/shorts/${shortId}`);
  return {};
}

const updateScriptSchema = z.object({
  hook: z.string().min(1).max(1000),
  body: z.string().min(1).max(4000),
  cta: z.string().min(1).max(500),
});

export async function updateScriptAction(shortId: string, input: z.infer<typeof updateScriptSchema>): Promise<ActionResult> {
  const user = await requireUser();
  const short = await prisma.short.findFirst({ where: { id: shortId, userId: user.id } });
  if (!short) return { error: "Short not found." };

  const parsed = updateScriptSchema.safeParse(input);
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Invalid input." };

  const { hook, body, cta } = parsed.data;
  await prisma.script.update({ where: { shortId }, data: { hook, body, cta, fullText: `${hook} ${body} ${cta}` } });
  await prisma.short.update({ where: { id: shortId }, data: { hook } });

  revalidatePath(`/shorts/${shortId}`);
  return {};
}

const updateSceneSchema = z.object({
  narration: z.string().min(1).max(1000).optional(),
  visualDesc: z.string().min(1).max(500).optional(),
  onScreenText: z.string().max(200).optional(),
  transition: z.string().max(50).optional(),
  soundEffect: z.string().max(50).optional(),
  durationSec: z.coerce.number().min(0.5).max(30).optional(),
});

export async function updateSceneAction(sceneId: string, input: z.infer<typeof updateSceneSchema>): Promise<ActionResult> {
  const user = await requireUser();
  const scene = await prisma.scene.findUnique({ where: { id: sceneId }, include: { short: true } });
  if (!scene || scene.short.userId !== user.id) return { error: "Scene not found." };

  const parsed = updateSceneSchema.safeParse(input);
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Invalid input." };

  const visualChanged = parsed.data.visualDesc && parsed.data.visualDesc !== scene.visualDesc;

  await prisma.scene.update({
    where: { id: sceneId },
    data: {
      ...parsed.data,
      // a changed visual description invalidates the cached generated visual
      ...(visualChanged ? { visualAssetId: null } : {}),
    },
  });

  revalidatePath(`/shorts/${scene.shortId}`);
  return {};
}

export async function regenerateSceneAction(sceneId: string): Promise<ActionResult> {
  const user = await requireUser();
  const scene = await prisma.scene.findUnique({ where: { id: sceneId }, include: { short: { include: { scenes: true } } } });
  if (!scene || scene.short.userId !== user.id) return { error: "Scene not found." };

  const templateRecord = scene.short.templateId
    ? await prisma.template.findUnique({ where: { id: scene.short.templateId } })
    : null;
  const template = getTemplate(templateRecord?.key ?? "facts") ?? TEMPLATES[0];

  const { generateBeatLines } = await import("@/lib/generation/local-copy");
  const [line] = generateBeatLines([scene.narration.slice(0, 20) || "VALUE"], scene.short.topic, scene.short.niche ?? "", scene.short.tone);

  await prisma.scene.update({
    where: { id: sceneId },
    data: {
      narration: line.narration,
      visualDesc: `${template.visualStyle.replace(/-/g, " ")} shot related to "${scene.short.topic}"`,
      caption: line.narration,
      visualAssetId: null,
      voiceoverId: null,
    },
  });

  revalidatePath(`/shorts/${scene.shortId}`);
  return {};
}

const reorderSchema = z.array(z.string().min(1));

export async function reorderScenesAction(shortId: string, orderedSceneIds: string[]): Promise<ActionResult> {
  const user = await requireUser();
  const short = await prisma.short.findFirst({ where: { id: shortId, userId: user.id }, include: { scenes: true } });
  if (!short) return { error: "Short not found." };

  const parsed = reorderSchema.safeParse(orderedSceneIds);
  if (!parsed.success || parsed.data.length !== short.scenes.length) return { error: "Invalid scene order." };

  await prisma.$transaction(
    parsed.data.map((id, index) => prisma.scene.update({ where: { id }, data: { order: 1000 + index } }))
  );
  await prisma.$transaction(
    parsed.data.map((id, index) => prisma.scene.update({ where: { id }, data: { order: index } }))
  );

  revalidatePath(`/shorts/${shortId}`);
  return {};
}

export async function updateShortSettingsAction(
  shortId: string,
  input: { voiceId?: string; captionStyle?: string; musicStyle?: string; visualStyle?: string }
): Promise<ActionResult> {
  const user = await requireUser();
  const short = await prisma.short.findFirst({ where: { id: shortId, userId: user.id } });
  if (!short) return { error: "Short not found." };

  await prisma.short.update({ where: { id: shortId }, data: input });
  revalidatePath(`/shorts/${shortId}`);
  return {};
}

export async function deleteShortAction(shortId: string): Promise<ActionResult> {
  const user = await requireUser();
  const short = await prisma.short.findFirst({ where: { id: shortId, userId: user.id } });
  if (!short) return { error: "Short not found." };

  await prisma.short.delete({ where: { id: shortId } });
  await cleanupShortStorage(user.id, shortId).catch(() => undefined);

  revalidatePath("/shorts");
  return {};
}
