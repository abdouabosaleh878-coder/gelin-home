import { prisma } from "@/lib/prisma";
import { listAvailableVoices } from "@/lib/providers/tts/registry";
import { CreateShortForm } from "./create-short-form";

export default async function NewShortPage({ searchParams }: PageProps<"/new">) {
  const params = await searchParams;
  const templates = await prisma.template.findMany({ orderBy: { name: "asc" } });
  const voices = listAvailableVoices();
  const initialTemplateKey = typeof params.template === "string" ? params.template : undefined;

  return (
    <div className="mx-auto max-w-2xl px-5 sm:px-6 py-8">
      <h1 className="text-2xl font-semibold tracking-tight">Create a new short</h1>
      <p className="text-muted mt-1 text-sm">
        Give us an idea — we&apos;ll write the hook, script, scenes, voice, visuals, and captions.
      </p>
      <CreateShortForm templates={templates} voices={voices} initialTemplateKey={initialTemplateKey} />
    </div>
  );
}
