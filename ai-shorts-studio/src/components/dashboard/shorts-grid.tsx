import Link from "next/link";
import { Clapperboard, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShortCard, ShortCardData } from "./short-card";

export function ShortsGrid({ shorts, emptyMessage }: { shorts: ShortCardData[]; emptyMessage: string }) {
  if (shorts.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <Clapperboard className="h-8 w-8 text-muted-2 mx-auto mb-3" />
          <p className="text-sm text-muted">{emptyMessage}</p>
          <Button asChild className="mt-4">
            <Link href="/new">
              <PlusCircle className="h-4 w-4" /> New Short
            </Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {shorts.map((short) => (
        <ShortCard key={short.id} short={short} />
      ))}
    </div>
  );
}
