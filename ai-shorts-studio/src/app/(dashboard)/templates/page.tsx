import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/session";
import { Card, CardContent } from "@/components/ui/card";

export default async function TemplatesPage() {
  await requireUser();
  const templates = await prisma.template.findMany({ orderBy: { category: "asc" } });

  return (
    <div className="px-5 sm:px-6 py-8 max-w-6xl mx-auto">
      <h1 className="text-2xl font-semibold tracking-tight mb-1">Templates</h1>
      <p className="text-sm text-muted mb-6">Each template sets its own script structure, caption style, visual style, music, and transitions.</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map((t) => (
          <Link key={t.id} href={`/new?template=${t.key}`}>
            <Card className="h-full hover:border-violet-500/40 transition-colors">
              <CardContent className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="font-medium">{t.name}</p>
                  <span className="text-[10px] rounded-full bg-violet-500/10 text-violet-300 px-2 py-0.5">{t.category}</span>
                </div>
                <p className="text-xs text-muted">{t.description}</p>
                <div className="flex flex-wrap gap-1 pt-1">
                  {[t.captionStyle, t.visualStyle, t.musicStyle, t.transitionStyle].map((tag) => (
                    <span key={tag} className="text-[10px] rounded-full bg-surface-2 border border-border px-2 py-0.5 text-muted-2">
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
