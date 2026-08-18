import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  as?: "h1" | "h2" | "h3";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  as: Heading = "h2",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow ? (
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-teal-700">
          {eyebrow}
        </p>
      ) : null}
      <Heading className="text-3xl sm:text-4xl font-semibold text-navy-900 text-balance">
        {title}
      </Heading>
      {description ? (
        <p className="mt-4 text-lg text-ink-500 text-pretty">{description}</p>
      ) : null}
    </div>
  );
}
