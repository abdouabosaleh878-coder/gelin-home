import Link from "next/link";
import { requireUser } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { Card, CardContent } from "@/components/ui/card";
import { StatusBadge } from "@/components/dashboard/status-badge";

const COLUMNS = [
  { status: "DRAFT", label: "Draft" },
  { status: "SCHEDULED", label: "Scheduled" },
  { status: "PUBLISHED", label: "Published" },
  { status: "FAILED", label: "Failed" },
] as const;

export default async function CalendarPage() {
  const user = await requireUser();
  const entries = await prisma.calendarEntry.findMany({
    where: { short: { userId: user.id } },
    include: { short: { include: { thumbnailAsset: true } } },
    orderBy: [{ scheduledAt: "asc" }, { createdAt: "desc" }],
  });

  return (
    <div className="px-5 sm:px-6 py-8 max-w-6xl mx-auto">
      <h1 className="text-2xl font-semibold tracking-tight mb-1">Content Calendar</h1>
      <p className="text-sm text-muted mb-6">
        Track drafts, scheduled posts, and what&apos;s published. Schedule or mark a short published from its editor page.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {COLUMNS.map((col) => {
          const items = entries.filter((e) => e.status === col.status);
          return (
            <div key={col.status}>
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted">{col.label}</p>
                <span className="text-xs text-muted-2">{items.length}</span>
              </div>
              <div className="space-y-2">
                {items.map((entry) => (
                  <Link key={entry.id} href={`/shorts/${entry.short.id}`}>
                    <Card className="hover:border-violet-500/40 transition-colors">
                      <CardContent className="p-3 space-y-1">
                        <p className="text-sm font-medium line-clamp-2">{entry.short.topic}</p>
                        <div className="flex items-center justify-between">
                          <StatusBadge status={entry.short.status} />
                          {entry.platform ? <span className="text-[10px] text-muted-2">{entry.platform}</span> : null}
                        </div>
                        {entry.scheduledAt ? (
                          <p className="text-[11px] text-muted-2">{new Date(entry.scheduledAt).toLocaleString()}</p>
                        ) : null}
                      </CardContent>
                    </Card>
                  </Link>
                ))}
                {items.length === 0 ? <p className="text-xs text-muted-2 py-6 text-center border border-dashed border-border rounded-lg">Empty</p> : null}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
