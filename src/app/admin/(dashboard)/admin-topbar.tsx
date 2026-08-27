"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";
import { adminLogout } from "@/actions/auth";
import { cn } from "@/lib/utils";

const mobileLinks = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/categories", label: "Categories" },
  { href: "/admin/orders", label: "Orders" },
  { href: "/admin/customers", label: "Customers" },
  { href: "/admin/homepage", label: "Homepage" },
  { href: "/admin/policies", label: "Policies" },
  { href: "/admin/settings", label: "Settings" },
];

export function AdminTopbar({ name }: { name: string }) {
  const pathname = usePathname();

  return (
    <header className="no-print sticky top-0 z-20 border-b border-navy-100 bg-white">
      <div className="flex items-center justify-between px-4 py-3 md:px-8">
        <span className="font-display text-lg text-navy-900 md:hidden">Gelin Home</span>
        <span className="hidden md:inline text-sm text-ink-500">Signed in as <strong className="text-navy-900">{name}</strong></span>
        <form action={adminLogout}>
          <button className="flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium text-ink-700 hover:bg-navy-50">
            <LogOut className="h-4 w-4" /> Log Out
          </button>
        </form>
      </div>
      <nav className="flex md:hidden gap-1 overflow-x-auto px-4 pb-2 text-sm">
        {mobileLinks.map((link) => {
          const active = link.href === "/admin" ? pathname === "/admin" : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "shrink-0 rounded-full px-3 py-1.5 font-medium text-ink-700",
                active ? "bg-navy-900 text-white" : "bg-navy-50"
              )}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
