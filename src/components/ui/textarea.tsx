import * as React from "react";
import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "flex min-h-32 w-full rounded-md border border-navy-200 bg-white px-4 py-3 text-base text-ink-900 placeholder:text-ink-400",
        "focus-visible:border-teal-500 focus-visible:outline-none",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "aria-[invalid=true]:border-red-500",
        className
      )}
      {...props}
    />
  );
}

export { Textarea };
