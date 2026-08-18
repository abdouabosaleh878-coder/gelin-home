import * as React from "react";
import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      type={type}
      className={cn(
        "flex h-12 w-full rounded-md border border-navy-200 bg-white px-4 text-base text-ink-900 placeholder:text-ink-400",
        "focus-visible:border-teal-500 focus-visible:outline-none",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "aria-[invalid=true]:border-red-500",
        className
      )}
      {...props}
    />
  );
}

export { Input };
