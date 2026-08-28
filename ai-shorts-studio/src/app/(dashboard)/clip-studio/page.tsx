import { requireUser } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { STORAGE_ROOT } from "@/lib/storage";
import path from "node:path";
import { access } from "node:fs/promises";
import { ClipJobPanel } from "./clip-job-panel";
import { ShortsGrid } from "@/components/dashboard/shorts-grid";

export default async function ClipStudioPage() {
  const user = await requireUser();

  const [hasCookies, activeJob, clippedShorts] = await Promise.all([
    access(path.join(STORAGE_ROOT, user.id, "cookies.txt"))
      .then(() => true)
      .catch(() => false),
    prisma.clipSourceJob.findFirst({
      where: { userId: user.id, status: { in: ["QUEUED", "RUNNING"] } },
      orderBy: { createdAt: "desc" },
    }),
    prisma.short.findMany({
      where: { userId: user.id, sourceType: "CLIPPED" },
      orderBy: { createdAt: "desc" },
      include: { thumbnailAsset: true },
      take: 30,
    }),
  ]);

  return (
    <div className="px-5 sm:px-6 py-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold tracking-tight mb-1">Clip Studio</h1>
      <p className="text-sm text-muted mb-6">
        Paste a long video or livestream URL — we find the highest-energy moments, cut them into vertical shorts with real
        auto-generated captions, and get them ready to post manually.
      </p>

      <ClipJobPanel hasCookies={hasCookies} activeJob={activeJob} />

      <div className="mt-10">
        <h2 className="text-sm font-semibold text-muted uppercase tracking-wide mb-3">Clipped shorts</h2>
        <ShortsGrid shorts={clippedShorts} emptyMessage="No clips yet — paste a source URL above to get started." />
      </div>
    </div>
  );
}
