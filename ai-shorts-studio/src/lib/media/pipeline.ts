import { randomUUID } from "node:crypto";
import { mkdir, rm } from "node:fs/promises";
import { prisma } from "@/lib/prisma";
import { shortStorageDir, toMediaUrl } from "@/lib/storage";
import { synthesizeWithFallback } from "@/lib/providers/tts/registry";
import { fetchVisualWithFallback } from "@/lib/providers/visual/registry";
import { buildSceneClip } from "@/lib/media/scene-clip";
import { generateSfx } from "@/lib/media/sfx";
import { generateMusicLoop } from "@/lib/media/music";
import { writeCaptionsFile } from "@/lib/media/captions";
import { composeFinalVideo } from "@/lib/media/compose";
import { computeTimeline } from "@/lib/media/timeline";
import { getMediaDurationSec } from "@/lib/media/ffprobe";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

async function updateJob(jobId: string, data: Parameters<typeof prisma.renderJob.update>[0]["data"]) {
  await prisma.renderJob.update({ where: { id: jobId }, data });
}

async function ensureSceneVoiceover(userId: string, shortId: string, sceneId: string, voiceId: string) {
  const scene = await prisma.scene.findUniqueOrThrow({ where: { id: sceneId }, include: { voiceover: { include: { asset: true } } } });
  if (scene.voiceover?.asset) return scene;

  const dir = shortStorageDir(userId, shortId);
  await mkdir(dir, { recursive: true });
  const outPath = `${dir}/voice-${scene.order}-${randomUUID()}`;

  const result = await synthesizeWithFallback({ text: scene.narration, voiceId, outPath });

  const asset = await prisma.asset.create({
    data: {
      userId,
      type: "AUDIO_VOICEOVER",
      source: result.providerId === "local" ? "SYSTEM" : "AI_GENERATED",
      url: toMediaUrl(result.filePath),
      localPath: result.filePath,
      mimeType: result.mimeType,
      durationSec: result.durationSec,
      metadata: JSON.stringify({ provider: result.providerId, voiceId }),
    },
  });

  const voiceover = await prisma.voiceover.create({
    data: { provider: result.providerId, voiceId, text: scene.narration, assetId: asset.id, durationSec: result.durationSec },
  });

  return prisma.scene.update({
    where: { id: sceneId },
    data: { voiceoverId: voiceover.id, durationSec: result.durationSec },
    include: { voiceover: { include: { asset: true } } },
  });
}

async function ensureSceneVisual(userId: string, shortId: string, sceneId: string) {
  const scene = await prisma.scene.findUniqueOrThrow({ where: { id: sceneId }, include: { visualAsset: true } });
  if (scene.visualAsset) return scene;

  const dir = shortStorageDir(userId, shortId);
  await mkdir(dir, { recursive: true });
  const outPath = `${dir}/visual-${scene.order}-${randomUUID()}`;

  const result = await fetchVisualWithFallback({ prompt: scene.visualDesc, outPath });

  const asset = await prisma.asset.create({
    data: {
      userId,
      type: result.type === "video" ? "VIDEO" : "IMAGE",
      source: result.providerId === "local" ? "SYSTEM" : "STOCK",
      url: toMediaUrl(result.filePath),
      localPath: result.filePath,
      mimeType: result.mimeType,
      width: result.width,
      height: result.height,
      durationSec: result.durationSec,
      metadata: JSON.stringify({ provider: result.providerId }),
    },
  });

  return prisma.scene.update({ where: { id: sceneId }, data: { visualAssetId: asset.id }, include: { visualAsset: true } });
}

async function extractThumbnail(videoPath: string, outPath: string, atSec: number) {
  await execFileAsync("ffmpeg", ["-y", "-ss", String(atSec), "-i", videoPath, "-frames:v", "1", "-update", "1", outPath]);
  return outPath;
}

export async function runRenderPipeline(shortId: string, jobId: string): Promise<void> {
  try {
    await updateJob(jobId, { status: "RUNNING", stage: "VOICEOVER", startedAt: new Date(), progress: 2 });
    await prisma.short.update({ where: { id: shortId }, data: { status: "GENERATING", errorMessage: null } });

    const short = await prisma.short.findUniqueOrThrow({
      where: { id: shortId },
      include: {
        scenes: { orderBy: { order: "asc" } },
        project: { include: { brandKit: true } },
      },
    });
    if (short.scenes.length === 0) throw new Error("This short has no scenes to render yet.");

    const userId = short.userId;
    const dir = shortStorageDir(userId, shortId);
    await mkdir(dir, { recursive: true });

    // --- voiceover + visuals per scene ---
    const total = short.scenes.length;
    for (let i = 0; i < total; i++) {
      await ensureSceneVoiceover(userId, shortId, short.scenes[i].id, short.voiceId);
      await updateJob(jobId, { progress: Math.round(((i + 0.5) / total) * 30) });
      await ensureSceneVisual(userId, shortId, short.scenes[i].id);
      await updateJob(jobId, { progress: Math.round(((i + 1) / total) * 30) });
    }

    const scenes = await prisma.scene.findMany({
      where: { shortId },
      orderBy: { order: "asc" },
      include: { voiceover: { include: { asset: true } }, visualAsset: true },
    });

    await updateJob(jobId, { stage: "VISUALS", progress: 32 });

    // --- silent per-scene clips ---
    const clipPaths: string[] = [];
    for (let i = 0; i < scenes.length; i++) {
      const scene = scenes[i];
      const visual = scene.visualAsset!;
      const clipPath = `${dir}/clip-${scene.order}.mp4`;
      await buildSceneClip({
        visualPath: visual.localPath!,
        visualType: visual.type === "VIDEO" ? "video" : "image",
        durationSec: scene.durationSec,
        outPath: clipPath,
      });
      clipPaths.push(clipPath);
      await updateJob(jobId, { progress: 32 + Math.round(((i + 1) / scenes.length) * 8) });
    }

    await updateJob(jobId, { stage: "CAPTIONS", progress: 42 });

    const timeline = computeTimeline(scenes.map((s) => ({ durationSec: s.durationSec, transition: s.transition })));
    const assPath = `${dir}/captions.ass`;
    await writeCaptionsFile(
      scenes.map((s, i) => ({
        narration: s.narration,
        onScreenText: s.onScreenText,
        startSec: timeline.scenes[i].startSec,
        durationSec: s.durationSec,
      })),
      {
        presetKey: short.project.brandKit?.captionStyle || short.captionStyle,
        watermarkText: short.project.brandKit?.watermarkText,
        totalDurationSec: timeline.totalDurationSec,
      },
      assPath
    );

    await updateJob(jobId, { progress: 46 });

    // --- music + sfx beds ---
    const musicPath = await generateMusicLoop(short.musicStyle, Math.ceil(timeline.totalDurationSec) + 1, `${dir}/music`);
    const sfxPaths: string[] = [];
    for (const scene of scenes) {
      sfxPaths.push(await generateSfx(scene.soundEffect || "pop", `${dir}/sfx-${scene.order}`));
    }

    await updateJob(jobId, { stage: "RENDER", progress: 50 });

    const finalPath = `${dir}/final.mp4`;
    const composed = await composeFinalVideo({
      scenes: scenes.map((s, i) => ({
        clipPath: clipPaths[i],
        durationSec: s.durationSec,
        transition: s.transition,
        voicePath: s.voiceover!.asset!.localPath!,
        sfxPath: sfxPaths[i],
      })),
      musicPath,
      captionsAssPath: assPath,
      outPath: finalPath,
      onProgress: (ratio) => {
        void updateJob(jobId, { progress: Math.min(95, 50 + Math.round(ratio * 45)) });
      },
    });

    await updateJob(jobId, { stage: "THUMBNAIL", progress: 96 });

    const thumbPath = `${dir}/thumbnail.png`;
    await extractThumbnail(finalPath, thumbPath, Math.min(1.2, composed.totalDurationSec / 4));

    const [videoDurationSec] = await Promise.all([getMediaDurationSec(finalPath)]);

    const [videoAsset, thumbAsset] = await Promise.all([
      prisma.asset.create({
        data: {
          userId,
          type: "RENDERED_VIDEO",
          source: "SYSTEM",
          url: toMediaUrl(finalPath),
          localPath: finalPath,
          mimeType: "video/mp4",
          width: 1080,
          height: 1920,
          durationSec: videoDurationSec,
        },
      }),
      prisma.asset.create({
        data: {
          userId,
          type: "THUMBNAIL",
          source: "SYSTEM",
          url: toMediaUrl(thumbPath),
          localPath: thumbPath,
          mimeType: "image/png",
          width: 1080,
          height: 1920,
        },
      }),
    ]);

    await prisma.short.update({
      where: { id: shortId },
      data: { status: "READY", finalVideoAssetId: videoAsset.id, thumbnailAssetId: thumbAsset.id, errorMessage: null },
    });

    await updateJob(jobId, { status: "SUCCEEDED", stage: "DONE", progress: 100, finishedAt: new Date() });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown render error";
    console.error(`[render] Short ${shortId} failed:`, error);
    await prisma.short.update({ where: { id: shortId }, data: { status: "FAILED", errorMessage: message } }).catch(() => undefined);
    await updateJob(jobId, { status: "FAILED", errorMessage: message, finishedAt: new Date() }).catch(() => undefined);
  }
}

export async function cleanupShortStorage(userId: string, shortId: string): Promise<void> {
  await rm(shortStorageDir(userId, shortId), { recursive: true, force: true });
}
