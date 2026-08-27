"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/require-admin";
import { saveImage, deleteImage } from "@/lib/storage";

export async function updateSettings(
  _prevState: { success?: boolean },
  formData: FormData
): Promise<{ success?: boolean }> {
  await requireAdmin();
  const raw = Object.fromEntries(formData.entries());

  const current = await prisma.siteSettings.upsert({ where: { id: "main" }, update: {}, create: { id: "main" } });

  async function resolveImage(field: "logoUrl" | "faviconUrl") {
    const file = formData.get(field === "logoUrl" ? "logo" : "favicon");
    if (file instanceof File && file.size > 0) {
      const url = await saveImage(file, "site");
      if (current[field]) await deleteImage(current[field]);
      return url;
    }
    return current[field];
  }

  const [logoUrl, faviconUrl] = await Promise.all([resolveImage("logoUrl"), resolveImage("faviconUrl")]);

  await prisma.siteSettings.update({
    where: { id: "main" },
    data: {
      brandName: String(raw.brandName || current.brandName),
      logoUrl,
      faviconUrl,
      phone: String(raw.phone || ""),
      whatsapp: String(raw.whatsapp || ""),
      email: String(raw.email || ""),
      addressEn: String(raw.addressEn || ""),
      addressAr: String(raw.addressAr || ""),
      googleMapsUrl: String(raw.googleMapsUrl || ""),
      openingHoursEn: String(raw.openingHoursEn || ""),
      openingHoursAr: String(raw.openingHoursAr || ""),
      instagram: String(raw.instagram || ""),
      facebook: String(raw.facebook || ""),
      tiktok: String(raw.tiktok || ""),
      deliveryFee: Number(raw.deliveryFee) || 0,
      freeShippingThreshold: Number(raw.freeShippingThreshold) || 0,
      deliveryInfoEn: String(raw.deliveryInfoEn || ""),
      deliveryInfoAr: String(raw.deliveryInfoAr || ""),
    },
  });

  revalidatePath("/[locale]", "layout");
  revalidatePath("/admin", "layout");
  return { success: true };
}

export async function updatePolicy(
  _prevState: { success?: boolean },
  formData: FormData
): Promise<{ success?: boolean }> {
  await requireAdmin();
  const slug = String(formData.get("slug") || "");
  if (!slug) return { success: false };

  await prisma.policyPage.upsert({
    where: { slug },
    update: {
      titleEn: String(formData.get("titleEn") || ""),
      titleAr: String(formData.get("titleAr") || ""),
      contentEn: String(formData.get("contentEn") || ""),
      contentAr: String(formData.get("contentAr") || ""),
    },
    create: {
      slug,
      titleEn: String(formData.get("titleEn") || ""),
      titleAr: String(formData.get("titleAr") || ""),
      contentEn: String(formData.get("contentEn") || ""),
      contentAr: String(formData.get("contentAr") || ""),
    },
  });

  revalidatePath("/[locale]/policies/[slug]", "page");
  revalidatePath("/admin/policies");
  return { success: true };
}
