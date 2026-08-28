"use server";

import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/session";
import { runRenderPipeline } from "@/lib/media/pipeline";
import { revalidatePath } from "next/cache";

export async function triggerRenderAction(shortId: string): Promise<{ error?: string; jobId?: string }> {
  const user = await requireUser();
  const short = await prisma.short.findFirst({ where: { id: shortId, userId: user.id }, include: { scenes: true } });
  if (!short) return { error: "Short not found." };
  if (short.scenes.length === 0) return { error: "This short has no scenes yet — generate a concept first." };

  const existingActive = await prisma.renderJob.findFirst({
    where: { shortId, status: { in: ["QUEUED", "RUNNING"] } },
  });
  if (existingActive) return { jobId: existingActive.id };

  const job = await prisma.renderJob.create({ data: { shortId, status: "QUEUED" } });

  // Fire-and-forget: the pipeline updates RenderJob + Short rows as it progresses.
  // Requires a long-lived Node process (not a serverless/edge deployment) — see README.
  void runRenderPipeline(shortId, job.id);

  revalidatePath(`/shorts/${shortId}`);
  return { jobId: job.id };
}

export async function getLatestRenderJobAction(shortId: string) {
  const user = await requireUser();
  const short = await prisma.short.findFirst({ where: { id: shortId, userId: user.id } });
  if (!short) return null;

  return prisma.renderJob.findFirst({ where: { shortId }, orderBy: { createdAt: "desc" } });
}
