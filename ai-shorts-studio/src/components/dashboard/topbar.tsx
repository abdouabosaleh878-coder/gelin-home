import { LogOut } from "lucide-react";
import { logoutAction } from "@/lib/actions/auth-actions";

export function Topbar({ name, email }: { name?: string | null; email: string }) {
  const initials = (name || email).slice(0, 2).toUpperCase();

  return (
    <header className="h-16 border-b border-border flex items-center justify-between px-5 shrink-0">
      <div className="md:hidden font-semibold text-sm">AI Shorts Studio</div>
      <div className="hidden md:block" />
      <div className="flex items-center gap-3">
        <div className="text-right hidden sm:block">
          <p className="text-sm font-medium leading-tight">{name || email}</p>
          <p className="text-xs text-muted leading-tight">{email}</p>
        </div>
        <div className="h-9 w-9 rounded-full gradient-accent flex items-center justify-center text-xs font-semibold text-white">
          {initials}
        </div>
        <form action={logoutAction}>
          <button
            type="submit"
            className="h-9 w-9 flex items-center justify-center rounded-lg border border-border text-muted hover:text-foreground hover:bg-white/5"
            title="Sign out"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </form>
      </div>
    </header>
  );
}
