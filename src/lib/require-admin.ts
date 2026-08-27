import "server-only";
import { redirect } from "next/navigation";
import { getSession } from "./auth";

/** Call at the top of every protected admin page / Server Action. The
 * proxy already blocks page navigation, but Server Actions can be invoked
 * directly, so we re-check server-side on every mutation (defense in depth). */
export async function requireAdmin() {
  const session = await getSession();
  if (!session) redirect("/admin/login");
  return session;
}
