"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { ArrowUp, ArrowDown, RefreshCw, Loader2, ImageIcon, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { updateSceneAction, regenerateSceneAction, reorderScenesAction, regenerateAllAction } from "@/lib/actions/short-actions";
import { TRANSITION_OPTIONS, SFX_OPTIONS } from "@/lib/media-options";

export interface SceneData {
  id: string;
  order: number;
  durationSec: number;
  narration: string;
  visualDesc: string;
  onScreenText: string | null;
  transition: string;
  soundEffect: string | null;
  visualAsset: { url: string } | null;
}

function SceneCard({
  scene,
  index,
  total,
  onMove,
  movePending,
}: {
  scene: SceneData;
  index: number;
  total: number;
  onMove: (direction: -1 | 1) => void;
  movePending: boolean;
}) {
  const [narration, setNarration] = useState(scene.narration);
  const [visualDesc, setVisualDesc] = useState(scene.visualDesc);
  const [onScreenText, setOnScreenText] = useState(scene.onScreenText ?? "");
  const [transition, setTransition] = useState(scene.transition);
  const [soundEffect, setSoundEffect] = useState(scene.soundEffect ?? "pop");
  const [pending, startTransition] = useTransition();
  const [regenPending, startRegen] = useTransition();
  const router = useRouter();

  function save() {
    startTransition(async () => {
      await updateSceneAction(scene.id, { narration, visualDesc, onScreenText, transition, soundEffect });
      router.refresh();
    });
  }

  function regenerate() {
    startRegen(async () => {
      await regenerateSceneAction(scene.id);
      router.refresh();
    });
  }

  return (
    <div className="rounded-xl border border-border bg-surface p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-violet-500/15 text-violet-300 text-xs font-semibold">
            {index + 1}
          </span>
          <span className="text-xs text-muted">{scene.durationSec.toFixed(1)}s</span>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" disabled={index === 0 || movePending} onClick={() => onMove(-1)} title="Move up">
            <ArrowUp className="h-3.5 w-3.5" />
          </Button>
          <Button variant="ghost" size="icon" disabled={index === total - 1 || movePending} onClick={() => onMove(1)} title="Move down">
            <ArrowDown className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      <div className="grid sm:grid-cols-[100px_1fr] gap-3">
        <div className="aspect-[9/16] rounded-lg bg-surface-2 overflow-hidden flex items-center justify-center">
          {scene.visualAsset ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={scene.visualAsset.url} alt="" className="h-full w-full object-cover" />
          ) : (
            <ImageIcon className="h-5 w-5 text-muted-2" />
          )}
        </div>
        <div className="space-y-2">
          <div>
            <Label className="mb-1">Narration / caption</Label>
            <Textarea value={narration} onChange={(e) => setNarration(e.target.value)} rows={2} />
          </div>
          <div>
            <Label className="mb-1">Visual description</Label>
            <Input value={visualDesc} onChange={(e) => setVisualDesc(e.target.value)} />
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <Label className="mb-1">On-screen text</Label>
              <Input value={onScreenText} onChange={(e) => setOnScreenText(e.target.value)} />
            </div>
            <div>
              <Label className="mb-1">Transition</Label>
              <Select value={transition} onChange={(e) => setTransition(e.target.value)}>
                {TRANSITION_OPTIONS.map((t) => (
                  <option key={t.key} value={t.key}>
                    {t.label}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <Label className="mb-1">Sound effect</Label>
              <Select value={soundEffect} onChange={(e) => setSoundEffect(e.target.value)}>
                {SFX_OPTIONS.map((s) => (
                  <option key={s.key} value={s.key}>
                    {s.label}
                  </option>
                ))}
              </Select>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 mt-3">
        <Button size="sm" variant="secondary" onClick={save} disabled={pending}>
          {pending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />} Save scene
        </Button>
        <Button size="sm" variant="ghost" onClick={regenerate} disabled={regenPending}>
          {regenPending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <RefreshCw className="h-3.5 w-3.5" />} Regenerate scene
        </Button>
      </div>
    </div>
  );
}

export function ScenesPanel({ shortId, scenes }: { shortId: string; scenes: SceneData[] }) {
  const [regenAllPending, startRegenAll] = useTransition();
  const [reorderPending, startReorder] = useTransition();
  const router = useRouter();

  function handleRegenerateAll() {
    if (!confirm("Regenerate the entire script and all scenes? This replaces the current script.")) return;
    startRegenAll(async () => {
      await regenerateAllAction(shortId);
      router.refresh();
    });
  }

  function moveScene(index: number, direction: -1 | 1) {
    const target = index + direction;
    if (target < 0 || target >= scenes.length) return;
    const ids = scenes.map((s) => s.id);
    [ids[index], ids[target]] = [ids[target], ids[index]];
    startReorder(async () => {
      await reorderScenesAction(shortId, ids);
      router.refresh();
    });
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted">{scenes.length} scenes</p>
        <Button size="sm" variant="secondary" onClick={handleRegenerateAll} disabled={regenAllPending}>
          {regenAllPending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <RefreshCw className="h-3.5 w-3.5" />}
          Regenerate entire video
        </Button>
      </div>
      {scenes.map((scene, index) => (
        <SceneCard
          key={scene.id}
          scene={scene}
          index={index}
          total={scenes.length}
          movePending={reorderPending}
          onMove={(direction) => moveScene(index, direction)}
        />
      ))}
    </div>
  );
}
