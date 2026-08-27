"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";

const reviewSchema = z.object({
  productId: z.string().min(1),
  customerName: z.string().min(1).max(80),
  rating: z.coerce.number().int().min(1).max(5),
  comment: z.string().min(3).max(1000),
  productSlug: z.string().min(1),
});

export async function createReview(
  _prevState: { error?: string; success?: boolean },
  formData: FormData
): Promise<{ error?: string; success?: boolean }> {
  const parsed = reviewSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) return { error: "Please fill in all fields with a rating between 1 and 5." };

  await prisma.review.create({
    data: {
      productId: parsed.data.productId,
      customerName: parsed.data.customerName,
      rating: parsed.data.rating,
      comment: parsed.data.comment,
    },
  });

  revalidatePath(`/[locale]/products/${parsed.data.productSlug}`, "page");
  return { success: true };
}
