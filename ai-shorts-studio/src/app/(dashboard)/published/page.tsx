import { requireUser } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { ShortsGrid } from "@/components/dashboard/shorts-grid";

export default async function PublishedPage() {
  const user = await requireUser();
  const entries = await prisma.calendarEntry.findMany({
    where: { status: "PUBLISHED", short: { userId: user.id } },
    orderBy: { publishedAt: "desc" },
    include: { short: { include: { thumbnailAsset: true } } },
  });

  return (
    <div className="px-5 sm:px-6 py-8 max-w-6xl mx-auto">
      <h1 className="text-2xl font-semibold tracking-tight mb-1">Published</h1>
      <p className="text-sm text-muted mb-6">
        Shorts marked published from the Calendar. AI Shorts Studio doesn&apos;t auto-publish — connect a social account and confirm posting to move a short here automatically.
      </p>
      <ShortsGrid shorts={entries.map((e) => e.short)} emptyMessage="Nothing published yet." />
    </div>
  );
}
