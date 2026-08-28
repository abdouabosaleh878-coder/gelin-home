import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { LoginForm } from "./login-form";

export default async function LoginPage({ searchParams }: PageProps<"/login">) {
  const params = await searchParams;
  const resetSuccess = params.reset === "success";

  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome back</CardTitle>
        <CardDescription>Sign in to keep creating shorts.</CardDescription>
      </CardHeader>
      <CardContent>
        <LoginForm resetSuccess={resetSuccess} />
      </CardContent>
      <div className="px-5 pb-5 text-center text-sm text-muted">
        No account?{" "}
        <Link href="/signup" className="text-violet-400 hover:underline">
          Create one
        </Link>
      </div>
    </Card>
  );
}
