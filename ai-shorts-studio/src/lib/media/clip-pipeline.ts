import { randomUUID } from "node:crypto";
import { mkdir, rm } from "node:fs/promises";
import path from "node:path";
import { prisma } from "@/lib/prisma";
import { shortStorageDir, toMediaUrl, STORAGE_ROOT } from "@/lib/storage";
import { getSourceVideoInfo, downloadSourceAudio, downloadSourceSection } from "@/lib/media/source-video";
import { detectAudioPeaks } from "@/lib/media/highlight-detect";
import { transcribeAudio } from "@/lib/media/transcribe";
import { writeCaptionsFileFromWords } from "@/lib/media/captions";
import { reframeAndCaption } from "@/lib/media/reframe";
import { getMediaDurationSec } from "@/lib/media/ffprobe";
import { generateClipMetadata } from "@/lib/generation/clip-copy";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

async function updateJob(jobId: string, data: Parameters<typeof prisma.clipSourceJob.update>[0]["data"]) {
  await prisma.clipSourceJob.update({ where: { id: jobId }, data });
}

async function extractThumbnail(videoPath: string, outPath: string, atSec: number) {
  await execFileAsync("ffmpeg", ["-y", "-ss", String(atSec), "-i", videoPath, "-frames:v", "1", "-update", "1", outPath]);
  return outPath;
}

export async function runClipSourceJob(jobId: string): Promise<void> {
  const job = await prisma.clipSourceJob.findUniqueOrThrow({ where: { id: jobId } });
  const workDir = path.join(STORAGE_ROOT, job.userId, "clip-jobs", jobId);
  const createdShortIds: string[] = [];

  try {
    await updateJob(jobId, { status: "RUNNING", stage: "DOWNLOAD_AUDIO", startedAt: new Date(), progress: 2 });
    await mkdir(workDir, { recursive: true });

    const cookiesPath = path.join(STORAGE_ROOT, job.userId, "cookies.txt");
    const hasCookies = await fileExists(cookiesPath);

    const info = await getSourceVideoInfo(job.sourceUrl, hasCookies ? cookiesPath : null);
    await prisma.clipSourceJob.update({ where: { id: jobId }, data: { sourceTitle: info.title, usedCookies: hasCookies } });

    const audioPath = await downloadSourceAudio(job.sourceUrl, path.join(workDir, "source-audio"), hasCookies ? cookiesPath : null);
    await updateJob(jobId, { stage: "ANALYZE", progress: 15 });

    const minGapSec = Math.max(90, Math.floor(info.durationSec / (job.clipCount * 2)));
    const peaks = await detectAudioPeaks(audioPath, { topN: job.clipCount, minGapSec, windowSec: 1 });
    if (peaks.length === 0) throw new Error("Could not find any candidate highlight moments in this source.");

    await updateJob(jobId, { stage: "DOWNLOAD_CLIPS", progress: 20 });

    for (let i = 0; i < peaks.length; i++) {
      const peak = peaks[i];
      const clipLenSec = job.minClipSec + Math.random() * (job.maxClipSec - job.minClipSec);
      const leadInSec = clipLenSec * 0.35;
      const startSec = Math.max(0, peak.timeSec - leadInSec);
      const endSec = Math.min(info.durationSec, startSec + clipLenSec);
      if (endSec - startSec < 5) continue;

      try {
        const short = await produceOneClip({
          job,
          workDir,
          index: i,
          sourceInfo: info,
          startSec,
          endSec,
          cookiesPath: hasCookies ? cookiesPath : null,
        });
        createdShortIds.push(short.id);
      } catch (error) {
        console.error(`[clip-pipeline] clip ${i} failed, skipping:`, error);
      }

      await updateJob(jobId, {
        progress: 20 + Math.round(((i + 1) / peaks.length) * 75),
        createdShortIds: JSON.stringify(createdShortIds),
      });
    }

    if (createdShortIds.length === 0) {
      throw new Error("All candidate clips failed to process — see server logs for details.");
    }

    await updateJob(jobId, {
      status: "SUCCEEDED",
      stage: "DONE",
      progress: 100,
      finishedAt: new Date(),
      createdShortIds: JSON.stringify(createdShortIds),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown clipping error";
    console.error(`[clip-pipeline] job ${jobId} failed:`, error);
    await updateJob(jobId, {
      status: "FAILED",
      errorMessage: message,
      finishedAt: new Date(),
      createdShortIds: JSON.stringify(createdShortIds),
    }).catch(() => undefined);
  } finally {
    await rm(workDir, { recursive: true, force: true }).catch(() => undefined);
  }
}

async function produceOneClip(params: {
  job: Awaited<ReturnType<typeof prisma.clipSourceJob.findUniqueOrThrow>>;
  workDir: string;
  index: number;
  sourceInfo: { id: string; title: string; durationSec: number };
  startSec: number;
  endSec: number;
  cookiesPath: string | null;
}) {
  const { job, workDir, index, sourceInfo, startSec, endSec, cookiesPath } = params;

  const rawPath = await downloadSourceSection(job.sourceUrl, startSec, endSec, path.join(workDir, `raw-${index}`), cookiesPath);
  const clipDurationSec = await getMediaDurationSec(rawPath);

  const transcript = await transcribeAudio(rawPath, path.join(workDir, `transcript-${index}.json`));
  const words = transcript.words.length > 0 ? transcript.words : [{ word: sourceInfo.title, start: 0, end: Math.min(2, clipDurationSec) }];

  const metadata = await generateClipMetadata({ transcript: transcript.text, sourceTitle: sourceInfo.title });

  // Create the Short + Project scoping first so we have a stable id for the storage path.
  const short = await prisma.short.create({
    data: {
      userId: job.userId,
      projectId: job.projectId,
      topic: sourceInfo.title,
      lengthSeconds: Math.round(clipDurationSec),
      status: "GENERATING",
      sourceType: "CLIPPED",
      sourceUrl: job.sourceUrl,
      sourceTitle: sourceInfo.title,
      sourceStartSec: startSec,
      sourceEndSec: endSec,
      transcript: transcript.text,
      hashtags: JSON.stringify(metadata.hashtags),
      captionStyle: "impact-caps",
    },
  });

  try {
    const dir = shortStorageDir(job.userId, short.id);
    await mkdir(dir, { recursive: true });

    const assPath = path.join(dir, "captions.ass");
    await writeCaptionsFileFromWords(
      words,
      { presetKey: short.captionStyle, watermarkText: metadata.hashtags[0], totalDurationSec: clipDurationSec },
      assPath
    );

    const finalPath = path.join(dir, "final.mp4");
    await reframeAndCaption(rawPath, assPath, finalPath);

    const thumbPath = path.join(dir, "thumbnail.png");
    await extractThumbnail(finalPath, thumbPath, Math.min(1, clipDurationSec / 4));

    const finalDurationSec = await getMediaDurationSec(finalPath);

    const [videoAsset, thumbAsset] = await Promise.all([
      prisma.asset.create({
        data: {
          userId: job.userId,
          type: "RENDERED_VIDEO",
          source: "SYSTEM",
          url: toMediaUrl(finalPath),
          localPath: finalPath,
          mimeType: "video/mp4",
          width: 1080,
          height: 1920,
          durationSec: finalDurationSec,
        },
      }),
      prisma.asset.create({
        data: {
          userId: job.userId,
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

    return prisma.short.update({
      where: { id: short.id },
      data: { status: "READY", finalVideoAssetId: videoAsset.id, thumbnailAssetId: thumbAsset.id, lengthSeconds: Math.round(finalDurationSec) },
    });
  } catch (error) {
    await prisma.short.update({
      where: { id: short.id },
      data: { status: "FAILED", errorMessage: error instanceof Error ? error.message : "Clip processing failed." },
    });
    throw error;
  }
}

async function fileExists(p: string): Promise<boolean> {
  try {
    await import("node:fs/promises").then((fs) => fs.access(p));
    return true;
  } catch {
    return false;
  }
}
