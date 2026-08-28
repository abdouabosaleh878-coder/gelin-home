import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/session";
import { listAvailableVoices } from "@/lib/providers/tts/registry";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { RenderPanel } from "./render-panel";
import { ScriptPanel } from "./script-panel";
import { ScenesPanel } from "./scenes-panel";
import { SettingsPanel } from "./settings-panel";
import { PublishPanel } from "./publish-panel";
import { DeleteButton } from "./delete-button";

export default async function ShortEditorPage({ params }: PageProps<"/shorts/[id]">) {
  const { id } = await params;
  const user = await requireUser();

  const short = await prisma.short.findFirst({
    where: { id, userId: user.id },
    include: {
      script: true,
      scenes: { orderBy: { order: "asc" }, include: { visualAsset: true } },
      finalVideoAsset: true,
      thumbnailAsset: true,
      calendarEntry: true,
      renderJobs: { orderBy: { createdAt: "desc" }, take: 1 },
    },
  });

  if (!short) notFound();

  const voices = listAvailableVoices();

  return (
    <div className="px-5 sm:px-6 py-8 max-w-6xl mx-auto">
      <div className="flex items-start justify-between gap-4 flex-wrap mb-6">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <StatusBadge status={short.status} />
            <span className="text-xs text-muted">{short.lengthSeconds}s · {short.tone}</span>
          </div>
          <h1 className="text-xl font-semibold tracking-tight mt-1 truncate">{short.topic}</h1>
          {short.idea ? <p className="text-sm text-muted mt-1">{short.idea}</p> : null}
          {short.errorMessage ? <p className="text-xs text-amber-400 mt-1">{short.errorMessage}</p> : null}
        </div>
        <DeleteButton shortId={short.id} />
      </div>

      <div className="grid lg:grid-cols-[320px_1fr] gap-6">
        <div className="space-y-4">
          <RenderPanel
            shortId={short.id}
            finalVideoUrl={short.finalVideoAsset?.url ?? null}
            thumbnailUrl={short.thumbnailAsset?.url ?? null}
            initialJob={short.renderJobs[0] ?? null}
          />
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Publish</CardTitle>
            </CardHeader>
            <CardContent>
              <PublishPanel shortId={short.id} hasVideo={!!short.finalVideoAsset} calendarEntry={short.calendarEntry} />
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="script">
          <TabsList>
            <TabsTrigger value="script">Script</TabsTrigger>
            <TabsTrigger value="scenes">Scenes ({short.scenes.length})</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="script">
            <Card>
              <CardContent>
                {short.script ? (
                  <ScriptPanel shortId={short.id} initialHook={short.script.hook} initialBody={short.script.body} initialCta={short.script.cta} />
                ) : (
                  <p className="text-sm text-muted">No script yet.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="scenes">
            <ScenesPanel
              shortId={short.id}
              scenes={short.scenes.map((s) => ({
                id: s.id,
                order: s.order,
                durationSec: s.durationSec,
                narration: s.narration,
                visualDesc: s.visualDesc,
                onScreenText: s.onScreenText,
                transition: s.transition,
                soundEffect: s.soundEffect,
                visualAsset: s.visualAsset ? { url: s.visualAsset.url } : null,
              }))}
            />
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardContent>
                <SettingsPanel
                  shortId={short.id}
                  voices={voices}
                  initial={{
                    voiceId: short.voiceId,
                    captionStyle: short.captionStyle,
                    musicStyle: short.musicStyle,
                    visualStyle: short.visualStyle,
                  }}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
