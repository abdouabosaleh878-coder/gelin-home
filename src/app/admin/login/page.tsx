import type { Metadata } from "next";
import { LoginForm } from "./login-form";

export const metadata: Metadata = { title: "Sign In" };

export default async function AdminLoginPage({
  searchParams,
}: PageProps<"/admin/login">) {
  const params = await searchParams;
  const next = typeof params.next === "string" ? params.next : "/admin";

  return (
    <div className="flex min-h-screen items-center justify-center bg-navy-900 px-4">
      <div className="w-full max-w-sm rounded-xl bg-white p-8 shadow-2xl">
        <div className="mb-8 text-center">
          <span className="flex h-12 w-12 mx-auto items-center justify-center rounded-full bg-navy-900 font-display text-xl text-gold-300">
            G
          </span>
          <h1 className="mt-4 font-display text-2xl text-navy-900">Gelin Home Admin</h1>
          <p className="mt-1 text-sm text-ink-500">Sign in to manage your store</p>
        </div>
        <LoginForm next={next} />
      </div>
    </div>
  );
}
