"use server";

import { z } from "zod";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { prisma } from "@/lib/prisma";
import { requireUserWithDefaultProject, requireUser } from "@/lib/session";
import { STORAGE_ROOT } from "@/lib/storage";
import { runClipSourceJob } from "@/lib/media/clip-pipeline";
import { revalidatePath } from "next/cache";

const startJobSchema = z.object({
  sourceUrl: z.string().url("Enter a valid video URL"),
  clipCount: z.coerce.number().int().min(1).max(20).default(10),
  minClipSec: z.coerce.number().int().min(10).max(90).default(20),
  maxClipSec: z.coerce.number().int().min(15).max(120).default(60),
});

export async function startClipJobAction(input: z.infer<typeof startJobSchema>): Promise<{ error?: string; jobId?: string }> {
  const parsed = startJobSchema.safeParse(input);
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Invalid input." };
  if (parsed.data.minClipSec >= parsed.data.maxClipSec) return { error: "Min length must be less than max length." };

  const { user, project } = await requireUserWithDefaultProject();

  const job = await prisma.clipSourceJob.create({
    data: {
      userId: user.id,
      projectId: project.id,
      sourceUrl: parsed.data.sourceUrl,
      clipCount: parsed.data.clipCount,
      minClipSec: parsed.data.minClipSec,
      maxClipSec: parsed.data.maxClipSec,
    },
  });

  void runClipSourceJob(job.id);

  revalidatePath("/clip-studio");
  return { jobId: job.id };
}

export async function getClipJobAction(jobId: string) {
  const user = await requireUser();
  const job = await prisma.clipSourceJob.findFirst({ where: { id: jobId, userId: user.id } });
  return job;
}

export async function uploadCookiesAction(formData: FormData): Promise<{ error?: string; success?: boolean }> {
  const user = await requireUser();
  const file = formData.get("cookies");
  if (!(file instanceof File) || file.size === 0) return { error: "Choose a cookies.txt file." };
  if (file.size > 512 * 1024) return { error: "That file looks too large to be a cookies.txt export." };

  const text = await file.text();
  if (!text.includes("\t")) return { error: "That doesn't look like a Netscape-format cookies.txt file." };

  const dir = path.join(STORAGE_ROOT, user.id);
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, "cookies.txt"), text, "utf8");

  revalidatePath("/clip-studio");
  return { success: true };
}

export async function updateClipHashtagsAction(shortId: string, hashtags: string[]): Promise<{ error?: string }> {
  const user = await requireUser();
  const short = await prisma.short.findFirst({ where: { id: shortId, userId: user.id } });
  if (!short) return { error: "Short not found." };

  await prisma.short.update({ where: { id: shortId }, data: { hashtags: JSON.stringify(hashtags) } });
  revalidatePath(`/shorts/${shortId}`);
  return {};
}

export async function hasCookiesAction(): Promise<boolean> {
  const user = await requireUser();
  try {
    await import("node:fs/promises").then((fs) => fs.access(path.join(STORAGE_ROOT, user.id, "cookies.txt")));
    return true;
  } catch {
    return false;
  }
}
