import type { Metadata } from "next";
import { getHomepageContent } from "@/lib/settings";
import { prisma } from "@/lib/db";
import { HomepageForm } from "./homepage-form";
import { InstagramManager } from "./instagram-manager";

export const metadata: Metadata = { title: "Homepage Editor" };

export default async function AdminHomepagePage() {
  const [content, posts] = await Promise.all([
    getHomepageContent(),
    prisma.instagramPost.findMany({ orderBy: { sortOrder: "asc" } }),
  ]);

  return (
    <div className="max-w-3xl space-y-8">
      <div>
        <h1 className="font-display text-3xl text-navy-900">Homepage Editor</h1>
        <p className="mt-1 text-sm text-ink-500">Update the content shown on your storefront homepage — no code required.</p>
      </div>
      <InstagramManager posts={posts} />
      <HomepageForm content={content} />
    </div>
  );
}
