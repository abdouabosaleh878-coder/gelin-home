import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "@/lib/utils";

function Progress({
  className,
  value,
  label,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root> & { value: number; label?: string }) {
  return (
    <ProgressPrimitive.Root
      value={value}
      aria-label={label ?? "Progress"}
      className={cn("relative h-2.5 w-full overflow-hidden rounded-full bg-aqua-100", className)}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className="h-full flex-1 rounded-full bg-sky-600 transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  );
}

export { Progress };
