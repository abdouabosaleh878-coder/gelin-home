"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  PlusCircle,
  Clapperboard,
  FileEdit,
  CheckCircle2,
  LayoutTemplate,
  FolderOpen,
  CalendarDays,
  BarChart3,
  Palette,
  Settings,
  Sparkles,
  Layers,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/new", label: "New Short", icon: PlusCircle, highlight: true },
  { href: "/shorts", label: "My Shorts", icon: Clapperboard },
  { href: "/drafts", label: "Drafts", icon: FileEdit },
  { href: "/published", label: "Published", icon: CheckCircle2 },
  { href: "/batch", label: "Generate 10 Shorts", icon: Layers },
  { href: "/templates", label: "Templates", icon: LayoutTemplate },
  { href: "/library", label: "Library", icon: FolderOpen },
  { href: "/calendar", label: "Calendar", icon: CalendarDays },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/brand-kit", label: "Brand Kit", icon: Palette },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex md:w-60 md:flex-col border-r border-border bg-surface/60 shrink-0">
      <div className="h-16 flex items-center gap-2 px-5 border-b border-border">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg gradient-accent">
          <Sparkles className="h-3.5 w-3.5 text-white" />
        </span>
        <span className="font-semibold tracking-tight text-sm">AI Shorts Studio</span>
      </div>
      <nav className="flex-1 overflow-y-auto scrollbar-thin py-4 px-3 space-y-1">
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href + "/"));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                active ? "bg-white/8 text-foreground" : "text-muted hover:text-foreground hover:bg-white/5",
                item.highlight && !active && "text-violet-400"
              )}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
