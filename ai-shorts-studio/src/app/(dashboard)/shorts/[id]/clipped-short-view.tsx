"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { ExternalLink, Loader2, Save, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { updateClipHashtagsAction } from "@/lib/actions/clip-actions";

export function ClippedShortView({
  shortId,
  sourceUrl,
  sourceTitle,
  sourceStartSec,
  sourceEndSec,
  transcript,
  hashtags,
}: {
  shortId: string;
  sourceUrl: string | null;
  sourceTitle: string | null;
  sourceStartSec: number | null;
  sourceEndSec: number | null;
  transcript: string | null;
  hashtags: string[];
}) {
  const [tagsText, setTagsText] = useState(hashtags.join(" "));
  const [pending, startTransition] = useTransition();
  const [copied, setCopied] = useState(false);
  const router = useRouter();

  function save() {
    startTransition(async () => {
      const tags = tagsText.split(/\s+/).filter(Boolean).map((t) => (t.startsWith("#") ? t : `#${t}`));
      await updateClipHashtagsAction(shortId, tags);
      router.refresh();
    });
  }

  function copyCaption() {
    navigator.clipboard.writeText(tagsText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Source</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1 text-sm">
          <p className="font-medium">{sourceTitle ?? "Untitled source"}</p>
          {sourceUrl ? (
            <a href={sourceUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs text-violet-400 hover:underline">
              View original <ExternalLink className="h-3 w-3" />
            </a>
          ) : null}
          {sourceStartSec != null && sourceEndSec != null ? (
            <p className="text-xs text-muted-2">
              Clipped from {formatTime(sourceStartSec)} to {formatTime(sourceEndSec)}
            </p>
          ) : null}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle className="text-sm">Caption / hashtags for posting</CardTitle>
          <Button size="sm" variant="ghost" onClick={copyCaption}>
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />} Copy
          </Button>
        </CardHeader>
        <CardContent className="space-y-2">
          <Textarea value={tagsText} onChange={(e) => setTagsText(e.target.value)} rows={2} />
          <Button size="sm" variant="secondary" onClick={save} disabled={pending}>
            {pending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />} Save
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Transcript (auto-generated)</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted whitespace-pre-wrap max-h-64 overflow-y-auto scrollbar-thin">
            {transcript || "No speech detected in this clip."}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

function formatTime(sec: number): string {
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = Math.floor(sec % 60);
  return h > 0 ? `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}` : `${m}:${String(s).padStart(2, "0")}`;
}
