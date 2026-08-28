import { requireUser } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { LibraryBrowser } from "./library-browser";

export default async function LibraryPage() {
  const user = await requireUser();

  const [assets, templates, scripts] = await Promise.all([
    prisma.asset.findMany({ where: { userId: user.id }, orderBy: { createdAt: "desc" }, take: 300 }),
    prisma.template.findMany({ orderBy: { name: "asc" } }),
    prisma.script.findMany({ where: { short: { userId: user.id } }, include: { short: true }, orderBy: { createdAt: "desc" }, take: 100 }),
  ]);

  return (
    <div className="px-5 sm:px-6 py-8 max-w-6xl mx-auto">
      <h1 className="text-2xl font-semibold tracking-tight mb-1">Content Library</h1>
      <p className="text-sm text-muted mb-6">Every generated script, video, image, and audio clip in one searchable place.</p>
      <LibraryBrowser
        assets={assets.map((a) => ({ id: a.id, type: a.type, source: a.source, url: a.url, createdAt: a.createdAt.toISOString(), mimeType: a.mimeType }))}
        templates={templates.map((t) => ({ id: t.id, name: t.name, category: t.category }))}
        scripts={scripts.map((s) => ({ id: s.id, shortId: s.shortId, hook: s.hook, topic: s.short.topic }))}
      />
    </div>
  );
}
