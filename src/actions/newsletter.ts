"use server";

import { z } from "zod";
import { prisma } from "@/lib/db";

const schema = z.object({ email: z.string().email() });

export async function subscribeNewsletter(_prevState: unknown, formData: FormData) {
  const parsed = schema.safeParse({ email: formData.get("email") });
  if (!parsed.success) {
    return { ok: false, error: "invalid_email" as const };
  }
  try {
    await prisma.newsletterSubscriber.upsert({
      where: { email: parsed.data.email },
      update: {},
      create: { email: parsed.data.email },
    });
    return { ok: true as const };
  } catch {
    return { ok: false, error: "server_error" as const };
  }
}
