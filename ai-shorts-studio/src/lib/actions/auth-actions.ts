"use server";

import { randomBytes } from "crypto";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { signIn, signOut } from "@/lib/auth";
import { sendEmail } from "@/lib/mailer";

export type ActionState = { error?: string; success?: boolean } | undefined;

const emailSchema = z.string().email().max(200);
const passwordSchema = z.string().min(8, "Password must be at least 8 characters").max(200);

const signupSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  email: emailSchema,
  password: passwordSchema,
});

export async function signupAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const parsed = signupSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  const { name, password } = parsed.data;
  const email = parsed.data.email.toLowerCase().trim();

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return { error: "An account with this email already exists." };
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: { email, name, passwordHash },
  });

  const brandKit = await prisma.brandKit.create({
    data: { userId: user.id, name: `${name}'s Brand` },
  });

  await prisma.project.create({
    data: { userId: user.id, name: "My Channel", brandKitId: brandKit.id },
  });

  const result = await signIn("credentials", { email, password, redirect: false });
  if (result?.error) {
    return { error: "Account created, but sign-in failed. Try logging in." };
  }

  redirect("/dashboard");
}

export async function loginAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const email = String(formData.get("email") ?? "").toLowerCase().trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  const result = await signIn("credentials", { email, password, redirect: false });
  if (result?.error) {
    return { error: "Invalid email or password." };
  }

  redirect("/dashboard");
}

export async function logoutAction() {
  await signOut({ redirect: false });
  redirect("/login");
}

const resetRequestSchema = z.object({ email: emailSchema });

export type ResetRequestState = { error?: string; success?: boolean; devResetUrl?: string } | undefined;

export async function requestPasswordResetAction(
  _prev: ResetRequestState,
  formData: FormData
): Promise<ResetRequestState> {
  const parsed = resetRequestSchema.safeParse({ email: formData.get("email") });
  if (!parsed.success) {
    return { error: "Enter a valid email address." };
  }
  const email = parsed.data.email.toLowerCase().trim();

  const user = await prisma.user.findUnique({ where: { email } });

  // Always respond the same way whether or not the account exists, to avoid
  // leaking which emails are registered.
  let devResetUrl: string | undefined;

  if (user) {
    const token = randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60);
    await prisma.passwordResetToken.create({ data: { token, userId: user.id, expiresAt } });

    const resetUrl = `${process.env.APP_URL ?? "http://localhost:3000"}/reset-password/${token}`;
    const result = await sendEmail({
      to: email,
      subject: "Reset your AI Shorts Studio password",
      text: `Reset your password by visiting: ${resetUrl}\n\nThis link expires in 1 hour.`,
    });

    if (result.mode === "console") {
      devResetUrl = resetUrl;
    }
  }

  return { success: true, devResetUrl };
}

const resetPasswordSchema = z.object({
  token: z.string().min(1),
  password: passwordSchema,
});

export async function resetPasswordAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const parsed = resetPasswordSchema.safeParse({
    token: formData.get("token"),
    password: formData.get("password"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }
  const { token, password } = parsed.data;

  const record = await prisma.passwordResetToken.findUnique({ where: { token } });
  if (!record || record.usedAt || record.expiresAt < new Date()) {
    return { error: "This reset link is invalid or has expired." };
  }

  const passwordHash = await bcrypt.hash(password, 12);
  await prisma.$transaction([
    prisma.user.update({ where: { id: record.userId }, data: { passwordHash } }),
    prisma.passwordResetToken.update({ where: { id: record.id }, data: { usedAt: new Date() } }),
  ]);

  redirect("/login?reset=success");
}
