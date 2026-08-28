import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function getCurrentUser() {
  const session = await auth();
  return session?.user ?? null;
}

export async function requireUser() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }
  return user;
}

/**
 * Every short belongs to a project. Most users never think about projects,
 * so we lazily ensure a default one exists instead of forcing a setup step.
 */
export async function requireUserWithDefaultProject() {
  const user = await requireUser();

  let project = await prisma.project.findFirst({
    where: { userId: user.id },
    orderBy: { createdAt: "asc" },
  });

  if (!project) {
    const brandKit = await prisma.brandKit.upsert({
      where: { id: `default-${user.id}` },
      create: { id: `default-${user.id}`, userId: user.id, name: "My Brand" },
      update: {},
    });
    project = await prisma.project.create({
      data: { userId: user.id, name: "My Channel", brandKitId: brandKit.id },
    });
  }

  return { user, project };
}
