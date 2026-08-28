"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Save, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { updateScriptAction } from "@/lib/actions/short-actions";
import { applyScriptAssistantAction } from "@/lib/actions/assistant-actions";
import type { AssistantAction } from "@/lib/generation/concept";

const ASSISTANT_BUTTONS: { action: AssistantAction; label: string; target: "hook" | "body" | "cta" }[] = [
  { action: "stronger-hook", label: "Make hook stronger", target: "hook" },
  { action: "more-viral", label: "Make it more viral", target: "body" },
  { action: "shorter", label: "Make it shorter", target: "body" },
  { action: "more-dramatic", label: "Make it more dramatic", target: "body" },
  { action: "funnier", label: "Make it funnier", target: "body" },
  { action: "rewrite", label: "Rewrite script", target: "body" },
  { action: "improve-retention", label: "Improve retention", target: "body" },
  { action: "stronger-cta", label: "Add stronger CTA", target: "cta" },
];

export function ScriptPanel({
  shortId,
  initialHook,
  initialBody,
  initialCta,
}: {
  shortId: string;
  initialHook: string;
  initialBody: string;
  initialCta: string;
}) {
  const [hook, setHook] = useState(initialHook);
  const [body, setBody] = useState(initialBody);
  const [cta, setCta] = useState(initialCta);
  const [savePending, startSave] = useTransition();
  const [assistantAction, setAssistantAction] = useState<AssistantAction | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  function handleSave() {
    setError(null);
    startSave(async () => {
      const result = await updateScriptAction(shortId, { hook, body, cta });
      if (result?.error) setError(result.error);
      else router.refresh();
    });
  }

  function handleAssistant(action: AssistantAction, target: "hook" | "body" | "cta") {
    setAssistantAction(action);
    setError(null);
    startSave(async () => {
      const result = await applyScriptAssistantAction(shortId, action, target);
      setAssistantAction(null);
      if (result?.error) {
        setError(result.error);
      } else {
        router.refresh();
      }
    });
  }

  return (
    <div className="space-y-5">
      <div>
        <Label htmlFor="hook">Hook</Label>
        <Textarea id="hook" value={hook} onChange={(e) => setHook(e.target.value)} rows={2} />
      </div>
      <div>
        <Label htmlFor="body">Script body (curiosity → value/story → payoff)</Label>
        <Textarea id="body" value={body} onChange={(e) => setBody(e.target.value)} rows={4} />
      </div>
      <div>
        <Label htmlFor="cta">Call to action</Label>
        <Textarea id="cta" value={cta} onChange={(e) => setCta(e.target.value)} rows={2} />
      </div>

      {error ? <p className="text-xs text-rose-400">{error}</p> : null}

      <Button onClick={handleSave} disabled={savePending} variant="secondary" size="sm">
        {savePending && !assistantAction ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />}
        Save changes
      </Button>

      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-muted mb-2 flex items-center gap-1.5">
          <Sparkles className="h-3.5 w-3.5 text-violet-400" /> AI assistant
        </p>
        <div className="flex flex-wrap gap-2">
          {ASSISTANT_BUTTONS.map((btn) => (
            <button
              key={btn.action}
              type="button"
              onClick={() => handleAssistant(btn.action, btn.target)}
              disabled={savePending}
              className="text-xs rounded-full border border-border bg-surface-2 px-3 py-1.5 text-muted hover:text-foreground hover:border-violet-500/50 disabled:opacity-50 flex items-center gap-1.5"
            >
              {assistantAction === btn.action ? <Loader2 className="h-3 w-3 animate-spin" /> : null}
              {btn.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
