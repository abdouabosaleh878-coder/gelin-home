"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { updateShortSettingsAction } from "@/lib/actions/short-actions";
import { VISUAL_STYLE_OPTIONS, CAPTION_STYLE_OPTIONS, MUSIC_STYLE_OPTIONS } from "@/lib/style-options";

interface VoiceOption {
  id: string;
  name: string;
  provider: string;
}

export function SettingsPanel({
  shortId,
  voices,
  initial,
}: {
  shortId: string;
  voices: VoiceOption[];
  initial: { voiceId: string; captionStyle: string; musicStyle: string; visualStyle: string };
}) {
  const [voiceId, setVoiceId] = useState(initial.voiceId);
  const [captionStyle, setCaptionStyle] = useState(initial.captionStyle);
  const [musicStyle, setMusicStyle] = useState(initial.musicStyle);
  const [visualStyle, setVisualStyle] = useState(initial.visualStyle);
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  function save() {
    startTransition(async () => {
      await updateShortSettingsAction(shortId, { voiceId, captionStyle, musicStyle, visualStyle });
      router.refresh();
    });
  }

  return (
    <div className="space-y-4">
      <p className="text-xs text-muted">
        Changes apply the next time you regenerate a scene or re-render — existing generated voice/visuals aren&apos;t retroactively replaced.
      </p>
      <div>
        <Label>Voice</Label>
        <Select value={voiceId} onChange={(e) => setVoiceId(e.target.value)}>
          {voices.map((v) => (
            <option key={v.id} value={v.id}>
              {v.name} ({v.provider})
            </option>
          ))}
        </Select>
      </div>
      <div>
        <Label>Caption style</Label>
        <Select value={captionStyle} onChange={(e) => setCaptionStyle(e.target.value)}>
          {CAPTION_STYLE_OPTIONS.map((c) => (
            <option key={c.key} value={c.key}>
              {c.label}
            </option>
          ))}
        </Select>
      </div>
      <div>
        <Label>Background music</Label>
        <Select value={musicStyle} onChange={(e) => setMusicStyle(e.target.value)}>
          {MUSIC_STYLE_OPTIONS.map((m) => (
            <option key={m.key} value={m.key}>
              {m.label}
            </option>
          ))}
        </Select>
      </div>
      <div>
        <Label>Visual style</Label>
        <Select value={visualStyle} onChange={(e) => setVisualStyle(e.target.value)}>
          {VISUAL_STYLE_OPTIONS.map((v) => (
            <option key={v.key} value={v.key}>
              {v.label}
            </option>
          ))}
        </Select>
      </div>
      <Button size="sm" variant="secondary" onClick={save} disabled={pending}>
        {pending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />} Save settings
      </Button>
    </div>
  );
}
