import path from "node:path";

export const STORAGE_ROOT = path.join(process.cwd(), "storage");

export function shortStorageDir(userId: string, shortId: string): string {
  return path.join(STORAGE_ROOT, userId, shortId);
}

export function shortAssetPath(userId: string, shortId: string, filename: string): string {
  return path.join(shortStorageDir(userId, shortId), filename);
}

/** Converts an absolute path under STORAGE_ROOT into the URL served by /api/media/[...path]. */
export function toMediaUrl(absolutePath: string): string {
  const rel = path.relative(STORAGE_ROOT, absolutePath);
  return `/api/media/${rel.split(path.sep).join("/")}`;
}
