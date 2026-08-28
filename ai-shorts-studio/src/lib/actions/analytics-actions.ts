"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/session";
import { revalidatePath } from "next/cache";

const metricsSchema = z.object({
  platform: z.enum(["YOUTUBE", "TIKTOK", "INSTAGRAM"]),
  views: z.coerce.number().int().min(0).default(0),
  likes: z.coerce.number().int().min(0).default(0),
  comments: z.coerce.number().int().min(0).default(0),
  shares: z.coerce.number().int().min(0).default(0),
  avgWatchTimeSec: z.coerce.number().min(0).optional(),
  completionRate: z.coerce.number().min(0).max(100).optional(),
});

/**
 * No social platform APIs are connected in this build, so analytics has no
 * automated data source yet. This lets a user log real metrics manually
 * (e.g. copied from YouTube Studio / TikTok Analytics) so the dashboard has
 * something real to chart instead of being empty or fabricated.
 */
export async function recordAnalyticsEventAction(shortId: string, input: z.infer<typeof metricsSchema>): Promise<{ error?: string }> {
  const user = await requireUser();
  const short = await prisma.short.findFirst({ where: { id: shortId, userId: user.id } });
  if (!short) return { error: "Short not found." };

  const parsed = metricsSchema.safeParse(input);
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Invalid input." };

  const data = parsed.data;
  const engagementRate = data.views > 0 ? +(((data.likes + data.comments + data.shares) / data.views) * 100).toFixed(2) : 0;

  await prisma.analyticsEvent.create({
    data: {
      shortId,
      platform: data.platform,
      views: data.views,
      likes: data.likes,
      comments: data.comments,
      shares: data.shares,
      avgWatchTimeSec: data.avgWatchTimeSec,
      completionRate: data.completionRate,
      engagementRate,
    },
  });

  revalidatePath("/analytics");
  revalidatePath(`/shorts/${shortId}`);
  return {};
}
