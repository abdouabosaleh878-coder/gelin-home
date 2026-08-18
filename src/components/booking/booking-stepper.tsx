import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export type BookingStep = {
  id: string;
  label: string;
};

export function BookingStepper({ steps, currentIndex }: { steps: BookingStep[]; currentIndex: number }) {
  return (
    <ol aria-label="Booking progress" className="flex items-center">
      {steps.map((step, index) => {
        const status = index < currentIndex ? "complete" : index === currentIndex ? "current" : "upcoming";
        const isLast = index === steps.length - 1;
        return (
          <li key={step.id} className={cn("flex items-center", !isLast && "flex-1")}>
            <div className="flex flex-col items-center gap-2">
              <span
                aria-current={status === "current" ? "step" : undefined}
                className={cn(
                  "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 text-sm font-semibold",
                  status === "complete" && "border-teal-600 bg-teal-600 text-white",
                  status === "current" && "border-teal-600 bg-white text-teal-700",
                  status === "upcoming" && "border-navy-200 bg-white text-ink-400"
                )}
              >
                {status === "complete" ? <Check className="h-4 w-4" aria-hidden="true" /> : index + 1}
              </span>
              <span
                className={cn(
                  "hidden text-xs font-medium sm:block",
                  status === "upcoming" ? "text-ink-400" : "text-navy-800"
                )}
              >
                {step.label}
              </span>
            </div>
            {!isLast ? (
              <div className={cn("mx-2 h-0.5 flex-1", status === "complete" ? "bg-teal-600" : "bg-navy-200")} />
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}
