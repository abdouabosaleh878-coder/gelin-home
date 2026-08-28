import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { SignupForm } from "./signup-form";

export default function SignupPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Create your account</CardTitle>
        <CardDescription>Start turning ideas into shorts in minutes.</CardDescription>
      </CardHeader>
      <CardContent>
        <SignupForm />
      </CardContent>
      <div className="px-5 pb-5 text-center text-sm text-muted">
        Already have an account?{" "}
        <Link href="/login" className="text-violet-400 hover:underline">
          Sign in
        </Link>
      </div>
    </Card>
  );
}
