import Link from "next/link";
import { PlusCircle, Clapperboard, FileEdit, CheckCircle2, Layers } from "lucide-react";
import { requireUserWithDefaultProject } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShortCard } from "@/components/dashboard/short-card";

export default async function DashboardPage() {
  const { user } = await requireUserWithDefaultProject();

  const [total, drafts, ready, published, recent] = await Promise.all([
    prisma.short.count({ where: { userId: user.id } }),
    prisma.short.count({ where: { userId: user.id, status: "DRAFT" } }),
    prisma.short.count({ where: { userId: user.id, status: "READY" } }),
    prisma.calendarEntry.count({ where: { status: "PUBLISHED", short: { userId: user.id } } }),
    prisma.short.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      take: 8,
      include: { thumbnailAsset: true },
    }),
  ]);

  const stats = [
    { label: "Total shorts", value: total, icon: Clapperboard },
    { label: "Drafts", value: drafts, icon: FileEdit },
    { label: "Rendered", value: ready, icon: Layers },
    { label: "Published", value: published, icon: CheckCircle2 },
  ];

  return (
    <div className="px-5 sm:px-6 py-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Welcome back{user.name ? `, ${user.name.split(" ")[0]}` : ""}</h1>
          <p className="text-muted text-sm mt-1">Here&apos;s what&apos;s happening with your shorts.</p>
        </div>
        <Button asChild>
          <Link href="/new">
            <PlusCircle className="h-4 w-4" /> New Short
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardContent className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-500/10 text-violet-400">
                <s.icon className="h-4 w-4" />
              </span>
              <div>
                <p className="text-xl font-semibold leading-tight">{s.value}</p>
                <p className="text-xs text-muted">{s.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-muted uppercase tracking-wide">Recent shorts</h2>
          <Link href="/shorts" className="text-sm text-violet-400 hover:underline">
            View all
          </Link>
        </div>

        {recent.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <Clapperboard className="h-8 w-8 text-muted-2 mx-auto mb-3" />
              <p className="text-sm text-muted">No shorts yet. Create your first one to get started.</p>
              <Button asChild className="mt-4">
                <Link href="/new">
                  <PlusCircle className="h-4 w-4" /> New Short
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {recent.map((short) => (
              <ShortCard key={short.id} short={short} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
