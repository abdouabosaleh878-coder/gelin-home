import { programs } from "@/data/programs";
import { SectionHeading } from "@/components/shared/section-heading";
import { ProgramGrid } from "@/components/shared/program-grid";
import { CtaButton } from "@/components/shared/cta-button";
import { Reveal } from "@/components/shared/reveal";

export function ProgramsOverview() {
  const featured = programs.filter((program) => program.featured);

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <Reveal>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Our Programs"
            title="A program for every swimmer"
            description="From a baby's first splash to competitive racing, our leveled curriculum meets swimmers exactly where they are."
          />
          <CtaButton href="/programs" variant="outline" className="shrink-0">
            View All Programs
          </CtaButton>
        </div>
      </Reveal>
      <Reveal delay={100} className="mt-10">
        <ProgramGrid programs={featured} />
      </Reveal>
    </section>
  );
}
