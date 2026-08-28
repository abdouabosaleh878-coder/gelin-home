"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, FileText, ImageIcon, Music, Video as VideoIcon, LayoutTemplate } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

interface AssetItem {
  id: string;
  type: string;
  source: string;
  url: string;
  createdAt: string;
  mimeType: string | null;
}
interface TemplateItem {
  id: string;
  name: string;
  category: string;
}
interface ScriptItem {
  id: string;
  shortId: string;
  hook: string;
  topic: string;
}

const FILTERS = ["all", "video", "image", "audio", "scripts", "templates"] as const;
type Filter = (typeof FILTERS)[number];

function assetBucket(type: string): Filter {
  if (type === "RENDERED_VIDEO" || type === "VIDEO") return "video";
  if (type === "IMAGE" || type === "THUMBNAIL") return "image";
  if (type.startsWith("AUDIO")) return "audio";
  return "all";
}

export function LibraryBrowser({ assets, templates, scripts }: { assets: AssetItem[]; templates: TemplateItem[]; scripts: ScriptItem[] }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");

  const filteredAssets = useMemo(
    () => assets.filter((a) => (filter === "all" || filter === assetBucket(a.type)) && a.url.toLowerCase().includes(query.toLowerCase())),
    [assets, filter, query]
  );
  const filteredScripts = useMemo(
    () =>
      (filter === "all" || filter === "scripts") &&
      scripts.filter((s) => s.hook.toLowerCase().includes(query.toLowerCase()) || s.topic.toLowerCase().includes(query.toLowerCase())),
    [scripts, filter, query]
  );
  const filteredTemplates = useMemo(
    () => (filter === "all" || filter === "templates") && templates.filter((t) => t.name.toLowerCase().includes(query.toLowerCase())),
    [templates, filter, query]
  );

  return (
    <div>
      <div className="flex gap-3 mb-5">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-2" />
          <Input className="pl-9" placeholder="Search library…" value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
        <div className="w-40 shrink-0">
          <Select value={filter} onChange={(e) => setFilter(e.target.value as Filter)}>
            {FILTERS.map((f) => (
              <option key={f} value={f}>
                {f[0].toUpperCase() + f.slice(1)}
              </option>
            ))}
          </Select>
        </div>
      </div>

      {filteredTemplates && filteredTemplates.length > 0 ? (
        <Section title="Templates" icon={LayoutTemplate}>
          <div className="grid sm:grid-cols-3 gap-3">
            {filteredTemplates.map((t) => (
              <div key={t.id} className="rounded-lg border border-border bg-surface p-3 text-sm">
                <p className="font-medium">{t.name}</p>
                <p className="text-xs text-muted-2">{t.category}</p>
              </div>
            ))}
          </div>
        </Section>
      ) : null}

      {filteredScripts && filteredScripts.length > 0 ? (
        <Section title="Scripts" icon={FileText}>
          <div className="space-y-2">
            {filteredScripts.map((s) => (
              <Link key={s.id} href={`/shorts/${s.shortId}`} className="block rounded-lg border border-border bg-surface p-3 text-sm hover:border-violet-500/40">
                <p className="font-medium line-clamp-1">{s.topic}</p>
                <p className="text-xs text-muted line-clamp-1">{s.hook}</p>
              </Link>
            ))}
          </div>
        </Section>
      ) : null}

      {filteredAssets.length > 0 ? (
        <Section title="Assets" icon={ImageIcon}>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {filteredAssets.map((a) => (
              <a key={a.id} href={a.url} target="_blank" rel="noreferrer" className="rounded-lg border border-border bg-surface-2 aspect-square flex items-center justify-center overflow-hidden">
                {assetBucket(a.type) === "image" ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={a.url} alt="" className="h-full w-full object-cover" />
                ) : assetBucket(a.type) === "video" ? (
                  <VideoIcon className="h-5 w-5 text-muted-2" />
                ) : assetBucket(a.type) === "audio" ? (
                  <Music className="h-5 w-5 text-muted-2" />
                ) : (
                  <ImageIcon className="h-5 w-5 text-muted-2" />
                )}
              </a>
            ))}
          </div>
        </Section>
      ) : null}

      {filteredAssets.length === 0 && !filteredScripts?.length && !filteredTemplates?.length ? (
        <p className="text-sm text-muted text-center py-16">Nothing matches yet — generate a short to fill your library.</p>
      ) : null}
    </div>
  );
}

function Section({ title, icon: Icon, children }: { title: string; icon: typeof FileText; children: React.ReactNode }) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-3 text-xs font-semibold uppercase tracking-wide text-muted">
        <Icon className="h-3.5 w-3.5" /> {title}
      </div>
      {children}
    </div>
  );
}
