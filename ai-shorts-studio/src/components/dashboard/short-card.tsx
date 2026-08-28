import Link from "next/link";
import { Clapperboard } from "lucide-react";
import { StatusBadge } from "./status-badge";

export interface ShortCardData {
  id: string;
  topic: string;
  status: string;
  lengthSeconds: number;
  createdAt: Date;
  thumbnailAsset?: { url: string } | null;
}

export function ShortCard({ short }: { short: ShortCardData }) {
  return (
    <Link
      href={`/shorts/${short.id}`}
      className="group rounded-xl border border-border bg-surface overflow-hidden hover:border-violet-500/40 transition-colors"
    >
      <div className="aspect-[9/16] bg-surface-2 relative overflow-hidden">
        {short.thumbnailAsset ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={short.thumbnailAsset.url} alt={short.topic} className="h-full w-full object-cover" />
        ) : (
          <div className="h-full w-full flex items-center justify-center text-muted-2">
            <Clapperboard className="h-8 w-8" />
          </div>
        )}
        <div className="absolute top-2 left-2">
          <StatusBadge status={short.status} />
        </div>
        <div className="absolute bottom-2 right-2 rounded-full bg-black/60 px-2 py-0.5 text-[10px] text-white">
          {short.lengthSeconds}s
        </div>
      </div>
      <div className="p-3">
        <p className="text-sm font-medium line-clamp-2 group-hover:text-violet-400 transition-colors">{short.topic}</p>
        <p className="text-[11px] text-muted-2 mt-1">{new Date(short.createdAt).toLocaleDateString()}</p>
      </div>
    </Link>
  );
}
