"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/require-admin";
import { saveImage, deleteImage } from "@/lib/storage";

export async function updateHomepage(
  _prevState: { success?: boolean },
  formData: FormData
): Promise<{ success?: boolean }> {
  await requireAdmin();
  const raw = Object.fromEntries(formData.entries());

  const current = await prisma.homepageContent.upsert({
    where: { id: "main" },
    update: {},
    create: { id: "main" },
  });

  async function resolveImage(field: "heroImage" | "brandStoryImage" | "newCollectionImage", folder: "site") {
    const file = formData.get(field);
    if (file instanceof File && file.size > 0) {
      const url = await saveImage(file, folder);
      if (current[field]) await deleteImage(current[field]);
      return url;
    }
    return current[field];
  }

  const [heroImage, brandStoryImage, newCollectionImage] = await Promise.all([
    resolveImage("heroImage", "site"),
    resolveImage("brandStoryImage", "site"),
    resolveImage("newCollectionImage", "site"),
  ]);

  await prisma.homepageContent.update({
    where: { id: "main" },
    data: {
      heroImage,
      heroTitleEn: String(raw.heroTitleEn || ""),
      heroTitleAr: String(raw.heroTitleAr || ""),
      heroSubtitleEn: String(raw.heroSubtitleEn || ""),
      heroSubtitleAr: String(raw.heroSubtitleAr || ""),
      heroButtonPrimaryEn: String(raw.heroButtonPrimaryEn || ""),
      heroButtonPrimaryAr: String(raw.heroButtonPrimaryAr || ""),
      heroButtonSecondaryEn: String(raw.heroButtonSecondaryEn || ""),
      heroButtonSecondaryAr: String(raw.heroButtonSecondaryAr || ""),
      brandStoryImage,
      brandStoryTitleEn: String(raw.brandStoryTitleEn || ""),
      brandStoryTitleAr: String(raw.brandStoryTitleAr || ""),
      brandStoryBodyEn: String(raw.brandStoryBodyEn || ""),
      brandStoryBodyAr: String(raw.brandStoryBodyAr || ""),
      newCollectionImage,
      newCollectionTitleEn: String(raw.newCollectionTitleEn || ""),
      newCollectionTitleAr: String(raw.newCollectionTitleAr || ""),
      newCollectionSubtitleEn: String(raw.newCollectionSubtitleEn || ""),
      newCollectionSubtitleAr: String(raw.newCollectionSubtitleAr || ""),
      newsletterTitleEn: String(raw.newsletterTitleEn || ""),
      newsletterTitleAr: String(raw.newsletterTitleAr || ""),
      newsletterSubtitleEn: String(raw.newsletterSubtitleEn || ""),
      newsletterSubtitleAr: String(raw.newsletterSubtitleAr || ""),
    },
  });

  revalidatePath("/[locale]", "layout");
  revalidatePath("/admin/homepage");
  return { success: true };
}

export async function addInstagramPost(
  _prevState: { error?: string; success?: boolean },
  formData: FormData
): Promise<{ error?: string; success?: boolean }> {
  await requireAdmin();
  const file = formData.get("image");
  if (!(file instanceof File) || file.size === 0) return { error: "Please choose an image." };

  const url = await saveImage(file, "site");
  const count = await prisma.instagramPost.count();
  await prisma.instagramPost.create({
    data: { imageUrl: url, link: String(formData.get("link") || ""), sortOrder: count },
  });

  revalidatePath("/[locale]", "layout");
  revalidatePath("/admin/homepage");
  return { success: true };
}

export async function deleteInstagramPost(id: string) {
  await requireAdmin();
  const post = await prisma.instagramPost.findUnique({ where: { id } });
  await prisma.instagramPost.delete({ where: { id } });
  if (post) await deleteImage(post.imageUrl);
  revalidatePath("/[locale]", "layout");
  revalidatePath("/admin/homepage");
}
