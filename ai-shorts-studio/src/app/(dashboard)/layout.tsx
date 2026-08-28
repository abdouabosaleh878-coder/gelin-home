import { requireUser } from "@/lib/session";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Topbar } from "@/components/dashboard/topbar";
import { MobileNav } from "@/components/dashboard/mobile-nav";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await requireUser();

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar name={user.name} email={user.email ?? ""} />
        <main className="flex-1 overflow-y-auto scrollbar-thin pb-20 md:pb-0">{children}</main>
      </div>
      <MobileNav />
    </div>
  );
}
