"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Scissors } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { startClipJobAction, getClipJobAction } from "@/lib/actions/clip-actions";
import { CookiesUpload } from "./cookies-upload";

interface JobData {
  id: string;
  status: string;
  stage: string;
  progress: number;
  errorMessage: string | null;
  sourceTitle: string | null;
  createdShortIds: string | null;
}

export function ClipJobPanel({ hasCookies, activeJob }: { hasCookies: boolean; activeJob: JobData | null }) {
  const [sourceUrl, setSourceUrl] = useState("");
  const [clipCount, setClipCount] = useState(10);
  const [minClipSec, setMinClipSec] = useState(20);
  const [maxClipSec, setMaxClipSec] = useState(60);
  const [job, setJob] = useState<JobData | null>(activeJob);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const router = useRouter();
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const wasActive = useRef(false);

  const isActive = job?.status === "QUEUED" || job?.status === "RUNNING";

  useEffect(() => {
    if (!isActive) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (wasActive.current) {
        wasActive.current = false;
        router.refresh();
      }
      return;
    }
    wasActive.current = true;
    intervalRef.current = setInterval(async () => {
      if (!job) return;
      const latest = await getClipJobAction(job.id);
      if (latest) setJob(latest);
    }, 3000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive, job?.id]);

  function handleStart(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      const result = await startClipJobAction({ sourceUrl, clipCount, minClipSec, maxClipSec });
      if (result.error) setError(result.error);
      else if (result.jobId) {
        setJob({ id: result.jobId, status: "QUEUED", stage: "DOWNLOAD_AUDIO", progress: 0, errorMessage: null, sourceTitle: null, createdShortIds: null });
      }
    });
  }

  const createdCount = job?.createdShortIds ? (JSON.parse(job.createdShortIds) as string[]).length : 0;

  return (
    <div className="space-y-4">
      <CookiesUpload hasCookies={hasCookies} />

      <form onSubmit={handleStart} className="space-y-3">
        <div>
          <Label htmlFor="sourceUrl">Video or stream URL</Label>
          <Input
            id="sourceUrl"
            value={sourceUrl}
            onChange={(e) => setSourceUrl(e.target.value)}
            placeholder="https://www.youtube.com/watch?v=..."
            required
            disabled={isActive}
          />
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div>
            <Label htmlFor="clipCount">Number of clips</Label>
            <Input id="clipCount" type="number" min={1} max={20} value={clipCount} onChange={(e) => setClipCount(Number(e.target.value))} disabled={isActive} />
          </div>
          <div>
            <Label htmlFor="minClipSec">Min length (s)</Label>
            <Input id="minClipSec" type="number" min={10} max={90} value={minClipSec} onChange={(e) => setMinClipSec(Number(e.target.value))} disabled={isActive} />
          </div>
          <div>
            <Label htmlFor="maxClipSec">Max length (s)</Label>
            <Input id="maxClipSec" type="number" min={15} max={120} value={maxClipSec} onChange={(e) => setMaxClipSec(Number(e.target.value))} disabled={isActive} />
          </div>
        </div>

        {error ? <p className="text-xs text-rose-400">{error}</p> : null}

        <Button type="submit" className="w-full" disabled={pending || isActive}>
          {isActive ? <Loader2 className="h-4 w-4 animate-spin" /> : <Scissors className="h-4 w-4" />}
          {isActive ? "Clipping…" : "Find & clip highlights"}
        </Button>
      </form>

      {job ? (
        <Card>
          <CardContent className="space-y-2">
            <div className="flex items-center justify-between text-xs text-muted">
              <span>{job.sourceTitle ?? "Analyzing source…"}</span>
              <span>{job.progress}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-surface-2 overflow-hidden">
              <div className="h-full gradient-accent transition-all" style={{ width: `${job.progress}%` }} />
            </div>
            <p className="text-[11px] text-muted-2">{isActive ? `Stage: ${job.stage.replace(/_/g, " ").toLowerCase()}` : job.status}</p>
            {job.status === "FAILED" ? (
              <p className="rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-xs text-rose-400">{job.errorMessage}</p>
            ) : null}
            {job.status === "SUCCEEDED" ? (
              <p className="text-xs text-emerald-400">
                {createdCount} clip{createdCount === 1 ? "" : "s"} created — see below.
              </p>
            ) : null}
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
}
