import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium",
  {
    variants: {
      variant: {
        teal: "bg-teal-50 text-teal-800",
        navy: "bg-navy-50 text-navy-700",
        sand: "bg-sand-200 text-ink-700",
        outline: "border border-navy-200 text-navy-700",
      },
    },
    defaultVariants: {
      variant: "teal",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant, className }))} {...props} />;
}

export { Badge, badgeVariants };
