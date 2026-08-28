"use client";

import { useState, useTransition } from "react";
import { Sparkles, Wand2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { createShortAction } from "@/lib/actions/short-actions";
import { generateViralIdeasAction } from "@/lib/actions/assistant-actions";
import {
  TONE_OPTIONS,
  VISUAL_STYLE_OPTIONS,
  CAPTION_STYLE_OPTIONS,
  MUSIC_STYLE_OPTIONS,
  LANGUAGE_OPTIONS,
  VIDEO_LENGTH_OPTIONS,
} from "@/lib/style-options";

interface TemplateOption {
  id: string;
  key: string;
  name: string;
  category: string;
  visualStyle: string;
  captionStyle: string;
  musicStyle: string;
}

interface VoiceOption {
  id: string;
  name: string;
  provider: string;
}

export function CreateShortForm({
  templates,
  voices,
  initialTemplateKey,
}: {
  templates: TemplateOption[];
  voices: VoiceOption[];
  initialTemplateKey?: string;
}) {
  const [topic, setTopic] = useState("");
  const [niche, setNiche] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [lengthSeconds, setLengthSeconds] = useState(30);
  const [language, setLanguage] = useState("en");
  const [voiceId, setVoiceId] = useState(voices[0]?.id ?? "local-default");
  const [tone, setTone] = useState<(typeof TONE_OPTIONS)[number]["key"]>("EDUCATIONAL");
  const startingTemplate = templates.find((t) => t.key === initialTemplateKey) ?? templates[0];
  const [visualStyle, setVisualStyle] = useState(startingTemplate?.visualStyle ?? "cinematic-stock");
  const [captionStyle, setCaptionStyle] = useState(startingTemplate?.captionStyle ?? "bold-highlight");
  const [musicStyle, setMusicStyle] = useState(startingTemplate?.musicStyle ?? "upbeat");
  const [templateKey, setTemplateKey] = useState(startingTemplate?.key ?? "facts");

  const [ideas, setIdeas] = useState<{ idea: string; angle: string }[]>([]);
  const [ideasPending, startIdeasTransition] = useTransition();
  const [submitPending, startSubmitTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function applyTemplate(key: string) {
    setTemplateKey(key);
    const template = templates.find((t) => t.key === key);
    if (template) {
      setVisualStyle(template.visualStyle);
      setCaptionStyle(template.captionStyle);
      setMusicStyle(template.musicStyle);
    }
  }

  function handleGenerateIdeas() {
    startIdeasTransition(async () => {
      const result = await generateViralIdeasAction(niche || topic || "general content", 5);
      setIdeas(result.ideas);
    });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    startSubmitTransition(async () => {
      const result = await createShortAction({
        topic,
        niche,
        targetAudience,
        lengthSeconds,
        language,
        voiceId,
        tone,
        visualStyle,
        captionStyle,
        musicStyle,
        templateKey,
      });
      if (result?.error) setError(result.error);
    });
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-6">
      <Card>
        <CardContent className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <Label htmlFor="topic" className="mb-0">
                Topic / idea
              </Label>
              <Button type="button" variant="ghost" size="sm" onClick={handleGenerateIdeas} disabled={ideasPending}>
                {ideasPending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Wand2 className="h-3.5 w-3.5" />}
                Generate viral idea
              </Button>
            </div>
            <Input
              id="topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="5 unbelievable facts about space"
              required
              minLength={3}
            />
            {ideas.length > 0 ? (
              <div className="mt-2 flex flex-wrap gap-2">
                {ideas.map((idea) => (
                  <button
                    type="button"
                    key={idea.idea}
                    onClick={() => setTopic(idea.idea)}
                    className="text-xs rounded-full border border-border bg-surface-2 px-3 py-1.5 text-muted hover:text-foreground hover:border-violet-500/50 text-left"
                  >
                    {idea.idea}
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="niche">Niche</Label>
              <Input id="niche" value={niche} onChange={(e) => setNiche(e.target.value)} placeholder="Space & science" />
            </div>
            <div>
              <Label htmlFor="audience">Target audience</Label>
              <Input id="audience" value={targetAudience} onChange={(e) => setTargetAudience(e.target.value)} placeholder="Curious teens & adults" />
            </div>
          </div>

          <div>
            <Label>Template</Label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {templates.map((t) => (
                <button
                  type="button"
                  key={t.key}
                  onClick={() => applyTemplate(t.key)}
                  className={`rounded-lg border px-3 py-2 text-left text-xs transition-colors ${
                    templateKey === t.key ? "border-violet-500 bg-violet-500/10 text-foreground" : "border-border text-muted hover:text-foreground"
                  }`}
                >
                  <p className="font-medium">{t.name}</p>
                  <p className="text-[10px] text-muted-2">{t.category}</p>
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="grid grid-cols-2 gap-4">
          <div>
            <Label>Video length</Label>
            <Select value={lengthSeconds} onChange={(e) => setLengthSeconds(Number(e.target.value))}>
              {VIDEO_LENGTH_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {s} sec
                </option>
              ))}
            </Select>
          </div>
          <div>
            <Label>Language</Label>
            <Select value={language} onChange={(e) => setLanguage(e.target.value)}>
              {LANGUAGE_OPTIONS.map((l) => (
                <option key={l.key} value={l.key}>
                  {l.label}
                </option>
              ))}
            </Select>
          </div>
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
            <Label>Tone</Label>
            <Select value={tone} onChange={(e) => setTone(e.target.value as typeof tone)}>
              {TONE_OPTIONS.map((t) => (
                <option key={t.key} value={t.key}>
                  {t.label}
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
          <div className="col-span-2">
            <Label>Background music</Label>
            <Select value={musicStyle} onChange={(e) => setMusicStyle(e.target.value)}>
              {MUSIC_STYLE_OPTIONS.map((m) => (
                <option key={m.key} value={m.key}>
                  {m.label}
                </option>
              ))}
            </Select>
          </div>
        </CardContent>
      </Card>

      {error ? <p className="rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-400">{error}</p> : null}

      <Button type="submit" size="lg" className="w-full" disabled={submitPending}>
        {submitPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
        {submitPending ? "Generating…" : "Generate"}
      </Button>
    </form>
  );
}
