import "server-only";
import { cache } from "react";
import { prisma } from "./db";

export const getSiteSettings = cache(async () => {
  const settings = await prisma.siteSettings.upsert({
    where: { id: "main" },
    update: {},
    create: { id: "main" },
  });
  return settings;
});

export const getHomepageContent = cache(async () => {
  const content = await prisma.homepageContent.upsert({
    where: { id: "main" },
    update: {},
    create: { id: "main" },
  });
  return content;
});
