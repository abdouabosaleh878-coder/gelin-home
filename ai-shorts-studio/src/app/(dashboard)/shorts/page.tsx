import Link from "next/link";
import { PlusCircle } from "lucide-react";
import { requireUser } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { ShortsGrid } from "@/components/dashboard/shorts-grid";

export default async function MyShortsPage() {
  const user = await requireUser();
  const shorts = await prisma.short.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    include: { thumbnailAsset: true },
  });

  return (
    <div className="px-5 sm:px-6 py-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">My Shorts</h1>
        <Button asChild>
          <Link href="/new">
            <PlusCircle className="h-4 w-4" /> New Short
          </Link>
        </Button>
      </div>
      <ShortsGrid shorts={shorts} emptyMessage="You haven't created any shorts yet." />
    </div>
  );
}
