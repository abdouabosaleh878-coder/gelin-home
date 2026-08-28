"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/session";
import { revalidatePath } from "next/cache";

const brandKitSchema = z.object({
  name: z.string().min(1).max(100),
  primaryColor: z.string().min(4).max(9),
  secondaryColor: z.string().min(4).max(9),
  fontFamily: z.string().min(1).max(60),
  captionStyle: z.string().min(1).max(60),
  logoUrl: z.string().max(500).optional().or(z.literal("")),
  introText: z.string().max(200).optional().or(z.literal("")),
  outroText: z.string().max(200).optional().or(z.literal("")),
  watermarkText: z.string().max(60).optional().or(z.literal("")),
  defaultCta: z.string().max(200).optional().or(z.literal("")),
});

export async function updateBrandKitAction(brandKitId: string, input: z.infer<typeof brandKitSchema>): Promise<{ error?: string }> {
  const user = await requireUser();
  const brandKit = await prisma.brandKit.findFirst({ where: { id: brandKitId, userId: user.id } });
  if (!brandKit) return { error: "Brand kit not found." };

  const parsed = brandKitSchema.safeParse(input);
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Invalid input." };

  const data = parsed.data;
  await prisma.brandKit.update({
    where: { id: brandKitId },
    data: {
      name: data.name,
      primaryColor: data.primaryColor,
      secondaryColor: data.secondaryColor,
      fontFamily: data.fontFamily,
      captionStyle: data.captionStyle,
      logoUrl: data.logoUrl || null,
      introText: data.introText || null,
      outroText: data.outroText || null,
      watermarkText: data.watermarkText || null,
      defaultCta: data.defaultCta || null,
    },
  });

  revalidatePath("/brand-kit");
  return {};
}
