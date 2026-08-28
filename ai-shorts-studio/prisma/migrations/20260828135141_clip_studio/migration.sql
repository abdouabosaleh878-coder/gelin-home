-- CreateTable
CREATE TABLE "ClipSourceJob" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "sourceUrl" TEXT NOT NULL,
    "sourceTitle" TEXT,
    "status" TEXT NOT NULL DEFAULT 'QUEUED',
    "stage" TEXT NOT NULL DEFAULT 'DOWNLOAD_AUDIO',
    "progress" INTEGER NOT NULL DEFAULT 0,
    "clipCount" INTEGER NOT NULL DEFAULT 10,
    "minClipSec" INTEGER NOT NULL DEFAULT 20,
    "maxClipSec" INTEGER NOT NULL DEFAULT 60,
    "usedCookies" BOOLEAN NOT NULL DEFAULT false,
    "errorMessage" TEXT,
    "createdShortIds" TEXT,
    "startedAt" DATETIME,
    "finishedAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ClipSourceJob_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "ClipSourceJob_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Short" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "templateId" TEXT,
    "topic" TEXT NOT NULL,
    "niche" TEXT,
    "targetAudience" TEXT,
    "lengthSeconds" INTEGER NOT NULL DEFAULT 30,
    "language" TEXT NOT NULL DEFAULT 'en',
    "voiceId" TEXT NOT NULL DEFAULT 'local-default',
    "tone" TEXT NOT NULL DEFAULT 'EDUCATIONAL',
    "visualStyle" TEXT NOT NULL DEFAULT 'cinematic',
    "captionStyle" TEXT NOT NULL DEFAULT 'bold-highlight',
    "musicStyle" TEXT NOT NULL DEFAULT 'upbeat',
    "status" TEXT NOT NULL DEFAULT 'DRAFT',
    "idea" TEXT,
    "hook" TEXT,
    "sourceType" TEXT NOT NULL DEFAULT 'GENERATED',
    "sourceUrl" TEXT,
    "sourceTitle" TEXT,
    "sourceStartSec" REAL,
    "sourceEndSec" REAL,
    "transcript" TEXT,
    "hashtags" TEXT,
    "musicAssetId" TEXT,
    "thumbnailAssetId" TEXT,
    "finalVideoAssetId" TEXT,
    "errorMessage" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Short_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Short_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Short_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "Template" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Short_musicAssetId_fkey" FOREIGN KEY ("musicAssetId") REFERENCES "Asset" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Short_thumbnailAssetId_fkey" FOREIGN KEY ("thumbnailAssetId") REFERENCES "Asset" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Short_finalVideoAssetId_fkey" FOREIGN KEY ("finalVideoAssetId") REFERENCES "Asset" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Short" ("captionStyle", "createdAt", "errorMessage", "finalVideoAssetId", "hook", "id", "idea", "language", "lengthSeconds", "musicAssetId", "musicStyle", "niche", "projectId", "status", "targetAudience", "templateId", "thumbnailAssetId", "tone", "topic", "updatedAt", "userId", "visualStyle", "voiceId") SELECT "captionStyle", "createdAt", "errorMessage", "finalVideoAssetId", "hook", "id", "idea", "language", "lengthSeconds", "musicAssetId", "musicStyle", "niche", "projectId", "status", "targetAudience", "templateId", "thumbnailAssetId", "tone", "topic", "updatedAt", "userId", "visualStyle", "voiceId" FROM "Short";
DROP TABLE "Short";
ALTER TABLE "new_Short" RENAME TO "Short";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
