"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/session";
import { revalidatePath } from "next/cache";

const scheduleSchema = z.object({
  scheduledAt: z.string().min(1),
  platform: z.enum(["YOUTUBE", "TIKTOK", "INSTAGRAM"]),
});

export async function scheduleShortAction(shortId: string, input: z.infer<typeof scheduleSchema>): Promise<{ error?: string }> {
  const user = await requireUser();
  const short = await prisma.short.findFirst({ where: { id: shortId, userId: user.id } });
  if (!short) return { error: "Short not found." };

  const parsed = scheduleSchema.safeParse(input);
  if (!parsed.success) return { error: "Invalid schedule." };

  await prisma.calendarEntry.upsert({
    where: { shortId },
    create: { shortId, status: "SCHEDULED", scheduledAt: new Date(parsed.data.scheduledAt), platform: parsed.data.platform },
    update: { status: "SCHEDULED", scheduledAt: new Date(parsed.data.scheduledAt), platform: parsed.data.platform, publishError: null },
  });

  revalidatePath("/calendar");
  revalidatePath(`/shorts/${shortId}`);
  return {};
}

export async function unscheduleShortAction(shortId: string): Promise<{ error?: string }> {
  const user = await requireUser();
  const short = await prisma.short.findFirst({ where: { id: shortId, userId: user.id } });
  if (!short) return { error: "Short not found." };

  await prisma.calendarEntry.upsert({
    where: { shortId },
    create: { shortId, status: "DRAFT" },
    update: { status: "DRAFT", scheduledAt: null, platform: null },
  });

  revalidatePath("/calendar");
  revalidatePath(`/shorts/${shortId}`);
  return {};
}

/**
 * No YouTube/TikTok/Instagram API is integrated in this build, so we never
 * claim automated publication. This records a user-asserted "I posted this
 * myself" status instead of pretending the app published it.
 */
export async function markManuallyPublishedAction(shortId: string, platform: "YOUTUBE" | "TIKTOK" | "INSTAGRAM"): Promise<{ error?: string }> {
  const user = await requireUser();
  const short = await prisma.short.findFirst({ where: { id: shortId, userId: user.id } });
  if (!short) return { error: "Short not found." };

  await prisma.calendarEntry.upsert({
    where: { shortId },
    create: { shortId, status: "PUBLISHED", platform, publishedAt: new Date() },
    update: { status: "PUBLISHED", platform, publishedAt: new Date(), publishError: null },
  });

  revalidatePath("/calendar");
  revalidatePath(`/shorts/${shortId}`);
  return {};
}
