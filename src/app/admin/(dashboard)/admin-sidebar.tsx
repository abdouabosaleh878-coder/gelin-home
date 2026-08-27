"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  FolderTree,
  ShoppingCart,
  Users,
  Home,
  Settings,
  FileText,
  Plus,
  Store,
} from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/categories", label: "Categories", icon: FolderTree },
  { href: "/admin/orders", label: "Orders", icon: ShoppingCart },
  { href: "/admin/customers", label: "Customers", icon: Users },
  { href: "/admin/homepage", label: "Homepage Editor", icon: Home },
  { href: "/admin/policies", label: "Policy Pages", icon: FileText },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="no-print hidden md:flex w-64 shrink-0 flex-col border-r border-navy-100 bg-white">
      <div className="flex items-center gap-2 px-6 py-5 border-b border-navy-100">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-navy-900 font-display text-lg text-gold-300">
          G
        </span>
        <span className="font-display text-lg text-navy-900">Gelin Home</span>
      </div>

      <div className="p-4">
        <Link href="/admin/products/new">
          <button className="flex w-full items-center justify-center gap-2 rounded-md bg-gold-600 py-2.5 text-sm font-semibold text-white hover:bg-gold-700">
            <Plus className="h-4 w-4" /> Add Product
          </button>
        </Link>
      </div>

      <nav className="flex-1 space-y-1 px-3">
        {links.map((link) => {
          const active = link.href === "/admin" ? pathname === "/admin" : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-ink-700 hover:bg-navy-50",
                active && "bg-navy-900 text-white hover:bg-navy-900"
              )}
            >
              <link.icon className="h-4.5 w-4.5" />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-navy-100">
        <a
          href="/en"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-md px-3 py-2.5 text-sm font-medium text-ink-700 hover:bg-navy-50"
        >
          <Store className="h-4 w-4" /> View Store
        </a>
      </div>
    </aside>
  );
}
