"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Download, PlayCircle, RefreshCw, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { triggerRenderAction, getLatestRenderJobAction } from "@/lib/actions/render-actions";

interface RenderJobData {
  id: string;
  status: string;
  stage: string;
  progress: number;
  errorMessage: string | null;
}

export function RenderPanel({
  shortId,
  finalVideoUrl,
  thumbnailUrl,
  initialJob,
}: {
  shortId: string;
  finalVideoUrl: string | null;
  thumbnailUrl: string | null;
  initialJob: RenderJobData | null;
}) {
  const [job, setJob] = useState<RenderJobData | null>(initialJob);
  const [pending, startTransition] = useTransition();
  const router = useRouter();
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const wasRunning = useRef(false);

  const isActive = job?.status === "QUEUED" || job?.status === "RUNNING";

  useEffect(() => {
    if (!isActive) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (wasRunning.current) {
        wasRunning.current = false;
        router.refresh();
      }
      return;
    }
    wasRunning.current = true;
    intervalRef.current = setInterval(async () => {
      const latest = await getLatestRenderJobAction(shortId);
      if (latest) setJob(latest);
    }, 2000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive, shortId]);

  function handleRender() {
    startTransition(async () => {
      const result = await triggerRenderAction(shortId);
      if (result.jobId) {
        setJob({ id: result.jobId, status: "QUEUED", stage: "IDEA", progress: 0, errorMessage: null });
      }
    });
  }

  return (
    <div className="rounded-xl border border-border bg-surface overflow-hidden">
      <div className="aspect-[9/16] bg-black relative flex items-center justify-center">
        {finalVideoUrl ? (
          <video src={finalVideoUrl} poster={thumbnailUrl ?? undefined} controls className="h-full w-full object-contain" />
        ) : (
          <div className="text-center px-6">
            <PlayCircle className="h-10 w-10 text-muted-2 mx-auto mb-3" />
            <p className="text-sm text-muted">No render yet. Generate the video to preview it here.</p>
          </div>
        )}
      </div>

      <div className="p-4 space-y-3">
        {isActive ? (
          <div>
            <div className="flex items-center justify-between text-xs text-muted mb-1.5">
              <span>{job?.stage}</span>
              <span>{job?.progress ?? 0}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-surface-2 overflow-hidden">
              <div className="h-full gradient-accent transition-all" style={{ width: `${job?.progress ?? 0}%` }} />
            </div>
          </div>
        ) : null}

        {job?.status === "FAILED" ? (
          <p className="rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-xs text-rose-400">
            Render failed: {job.errorMessage}
          </p>
        ) : null}

        <Button className="w-full" onClick={handleRender} disabled={pending || isActive}>
          {isActive ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
          {isActive ? "Rendering…" : finalVideoUrl ? "Re-render video" : "Generate video"}
        </Button>

        {finalVideoUrl ? (
          <Button variant="secondary" className="w-full" asChild>
            <a href={finalVideoUrl} download>
              <Download className="h-4 w-4" /> Download MP4
            </a>
          </Button>
        ) : null}
      </div>
    </div>
  );
}
