import { requireUser } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { ShortsGrid } from "@/components/dashboard/shorts-grid";

export default async function DraftsPage() {
  const user = await requireUser();
  const shorts = await prisma.short.findMany({
    where: { userId: user.id, status: { in: ["DRAFT", "FAILED"] } },
    orderBy: { createdAt: "desc" },
    include: { thumbnailAsset: true },
  });

  return (
    <div className="px-5 sm:px-6 py-8 max-w-6xl mx-auto">
      <h1 className="text-2xl font-semibold tracking-tight mb-1">Drafts</h1>
      <p className="text-sm text-muted mb-6">Shorts that haven&apos;t been rendered yet, or need another render attempt.</p>
      <ShortsGrid shorts={shorts} emptyMessage="No drafts. Everything is rendered!" />
    </div>
  );
}
