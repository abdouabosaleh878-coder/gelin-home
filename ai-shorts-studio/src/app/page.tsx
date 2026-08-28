import Link from "next/link";
import { Sparkles, Wand2, Mic2, Captions, Clapperboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function LandingPage() {
  const user = await getCurrentUser();
  if (user) redirect("/dashboard");

  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[32rem] w-[48rem] rounded-full bg-violet-600/20 blur-3xl" />
      </div>

      <header className="mx-auto max-w-6xl flex items-center justify-between px-6 py-6">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg gradient-accent">
            <Sparkles className="h-4 w-4 text-white" />
          </span>
          <span className="text-lg font-semibold tracking-tight">AI Shorts Studio</span>
        </div>
        <nav className="flex items-center gap-3">
          <Button variant="ghost" asChild>
            <Link href="/login">Sign in</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">Get started</Link>
          </Button>
        </nav>
      </header>

      <main className="mx-auto max-w-4xl px-6 pt-16 pb-24 text-center">
        <p className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted mb-6">
          <Sparkles className="h-3 w-3 text-violet-400" /> Idea to 9:16 export, fully automated
        </p>
        <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight text-balance">
          Turn one idea into a <span className="gradient-text">viral short</span> in minutes
        </h1>
        <p className="mt-5 text-lg text-muted max-w-2xl mx-auto text-balance">
          Type a topic. AI Shorts Studio writes the hook and script, generates voiceover, visuals,
          animated captions and music, then renders a ready-to-post 1080×1920 MP4.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <Button size="lg" asChild>
            <Link href="/signup">Create your first short</Link>
          </Button>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/login">I have an account</Link>
          </Button>
        </div>

        <div className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
          {[
            { icon: Wand2, title: "Script + hook", desc: "Retention-optimized structure" },
            { icon: Mic2, title: "AI voiceover", desc: "Pluggable TTS providers" },
            { icon: Captions, title: "Animated captions", desc: "Mobile-safe, word highlights" },
            { icon: Clapperboard, title: "9:16 export", desc: "H.264, 1080×1920, 30fps" },
          ].map((f) => (
            <div key={f.title} className="rounded-xl border border-border bg-surface p-4">
              <f.icon className="h-5 w-5 text-violet-400 mb-3" />
              <p className="text-sm font-medium">{f.title}</p>
              <p className="text-xs text-muted mt-1">{f.desc}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
