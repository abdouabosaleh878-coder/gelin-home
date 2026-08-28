import { stat, readFile } from "node:fs/promises";
import path from "node:path";
import { getCurrentUser } from "@/lib/session";
import { STORAGE_ROOT } from "@/lib/storage";

const MIME_TYPES: Record<string, string> = {
  ".mp4": "video/mp4",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".wav": "audio/wav",
  ".mp3": "audio/mpeg",
  ".ass": "text/plain; charset=utf-8",
};

function guessMime(filePath: string): string {
  return MIME_TYPES[path.extname(filePath).toLowerCase()] ?? "application/octet-stream";
}

export async function GET(_req: Request, ctx: RouteContext<"/api/media/[...path]">) {
  const user = await getCurrentUser();
  if (!user) return new Response("Unauthorized", { status: 401 });

  const { path: segments } = await ctx.params;
  if (!segments || segments.length < 2) return new Response("Not found", { status: 404 });

  // Every stored file lives at storage/<userId>/<shortId>/<file> — the owning user must match.
  if (segments[0] !== user.id) return new Response("Forbidden", { status: 403 });

  const resolvedRoot = path.resolve(STORAGE_ROOT);
  const resolved = path.resolve(path.join(STORAGE_ROOT, ...segments));
  if (!resolved.startsWith(resolvedRoot + path.sep)) {
    return new Response("Forbidden", { status: 403 });
  }

  try {
    const stats = await stat(resolved);
    if (!stats.isFile()) return new Response("Not found", { status: 404 });
    const buffer = await readFile(resolved);
    return new Response(new Uint8Array(buffer), {
      headers: {
        "content-type": guessMime(resolved),
        "content-length": String(stats.size),
        "cache-control": "private, max-age=3600",
      },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
