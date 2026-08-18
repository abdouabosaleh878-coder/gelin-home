import Link from "next/link";
import { ArrowRight, Calendar, MapPin } from "lucide-react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type CtaButtonProps = ButtonProps & {
  href: string;
  icon?: "arrow" | "calendar" | "map" | "none";
};

export function CtaButton({ href, icon = "arrow", variant, size, className, children, ...props }: CtaButtonProps) {
  const Icon = icon === "calendar" ? Calendar : icon === "map" ? MapPin : icon === "arrow" ? ArrowRight : null;
  return (
    <Button asChild variant={variant} size={size} className={cn(className)} {...props}>
      <Link href={href}>
        {children}
        {Icon ? <Icon className="h-5 w-5" aria-hidden="true" /> : null}
      </Link>
    </Button>
  );
}
