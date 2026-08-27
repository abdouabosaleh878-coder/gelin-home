import "server-only";
import { writeFile, mkdir, unlink } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";

// ---------------------------------------------------------------------------
// Storage adapter: local filesystem for dev / simple deployments.
//
// To move to cloud storage (Vercel Blob, Cloudinary, S3...) later, implement
// the same two functions (`saveImage`, `deleteImage`) against that provider
// and swap the import wherever this module is used — nothing else changes.
// ---------------------------------------------------------------------------

const UPLOAD_ROOT = path.join(process.cwd(), "public", "uploads");

export async function saveImage(file: File, folder: "products" | "categories" | "site") {
  const bytes = Buffer.from(await file.arrayBuffer());
  const ext = (file.name.split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "");
  const filename = `${randomUUID()}.${ext || "jpg"}`;
  const dir = path.join(UPLOAD_ROOT, folder);
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, filename), bytes);
  return `/uploads/${folder}/${filename}`;
}

export async function deleteImage(url: string) {
  if (!url.startsWith("/uploads/")) return;
  const filePath = path.join(process.cwd(), "public", url);
  try {
    await unlink(filePath);
  } catch {
    // already gone — fine
  }
}
