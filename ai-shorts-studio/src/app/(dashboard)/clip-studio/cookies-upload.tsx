"use client";

import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Upload, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { uploadCookiesAction } from "@/lib/actions/clip-actions";

export function CookiesUpload({ hasCookies }: { hasCookies: boolean }) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  function handleFile(file: File) {
    setError(null);
    const formData = new FormData();
    formData.set("cookies", file);
    startTransition(async () => {
      const result = await uploadCookiesAction(formData);
      if (result.error) setError(result.error);
      else router.refresh();
    });
  }

  return (
    <div className="rounded-lg border border-border bg-surface-2 p-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm">
          {hasCookies ? <ShieldCheck className="h-4 w-4 text-emerald-400" /> : <Upload className="h-4 w-4 text-muted" />}
          <span>{hasCookies ? "Cookies file connected" : "No cookies file uploaded"}</span>
        </div>
        <Button type="button" size="sm" variant="ghost" disabled={pending} onClick={() => inputRef.current?.click()}>
          {pending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : null}
          {hasCookies ? "Replace" : "Upload"}
        </Button>
        <input
          ref={inputRef}
          type="file"
          accept=".txt"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
          }}
        />
      </div>
      <p className="text-[11px] text-muted-2 mt-2">
        Only needed for private/age-restricted/members-only videos, or if downloads get blocked as bot traffic. Export a Netscape-format{" "}
        <code className="text-muted">cookies.txt</code> from a browser logged into the source site (e.g. the &quot;Get cookies.txt&quot; extension) and
        upload it here. Stored privately per-account, used only for your own downloads.
      </p>
      {error ? <p className="text-xs text-rose-400 mt-1">{error}</p> : null}
    </div>
  );
}
