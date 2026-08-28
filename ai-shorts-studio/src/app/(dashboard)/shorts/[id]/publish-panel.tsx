"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Loader2, CalendarClock, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { scheduleShortAction, markManuallyPublishedAction } from "@/lib/actions/calendar-actions";

type Platform = "YOUTUBE" | "TIKTOK" | "INSTAGRAM";

export function PublishPanel({
  shortId,
  hasVideo,
  calendarEntry,
}: {
  shortId: string;
  hasVideo: boolean;
  calendarEntry: { status: string; scheduledAt: Date | null; platform: Platform | null } | null;
}) {
  const [platform, setPlatform] = useState<Platform>(calendarEntry?.platform ?? "YOUTUBE");
  const [scheduledAt, setScheduledAt] = useState("");
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  function schedule() {
    if (!scheduledAt) return;
    startTransition(async () => {
      await scheduleShortAction(shortId, { platform, scheduledAt });
      router.refresh();
    });
  }

  function markPublished() {
    startTransition(async () => {
      await markManuallyPublishedAction(shortId, platform);
      router.refresh();
    });
  }

  if (!hasVideo) {
    return <p className="text-xs text-muted">Render the video before scheduling or publishing.</p>;
  }

  return (
    <div className="space-y-3">
      {calendarEntry?.status && calendarEntry.status !== "DRAFT" ? (
        <p className="text-xs text-muted">
          Status: <span className="font-medium text-foreground">{calendarEntry.status}</span>
          {calendarEntry.scheduledAt ? ` · ${new Date(calendarEntry.scheduledAt).toLocaleString()}` : ""}
        </p>
      ) : null}

      <div>
        <Label>Platform</Label>
        <Select value={platform} onChange={(e) => setPlatform(e.target.value as Platform)}>
          <option value="YOUTUBE">YouTube Shorts</option>
          <option value="TIKTOK">TikTok</option>
          <option value="INSTAGRAM">Instagram Reels</option>
        </Select>
      </div>
      <div>
        <Label>Schedule for</Label>
        <Input type="datetime-local" value={scheduledAt} onChange={(e) => setScheduledAt(e.target.value)} />
      </div>
      <Button size="sm" variant="secondary" className="w-full" onClick={schedule} disabled={pending || !scheduledAt}>
        {pending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <CalendarClock className="h-3.5 w-3.5" />}
        Schedule
      </Button>
      <Button size="sm" variant="ghost" className="w-full" onClick={markPublished} disabled={pending}>
        <CheckCircle2 className="h-3.5 w-3.5" /> I&apos;ve posted this manually
      </Button>
      <p className="text-[11px] text-muted-2">
        No social account connected — AI Shorts Studio can&apos;t post for you automatically. This only records what you tell it.
      </p>
    </div>
  );
}
