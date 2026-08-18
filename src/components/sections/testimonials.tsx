import { testimonials } from "@/data/testimonials";
import { SectionHeading } from "@/components/shared/section-heading";
import { TestimonialCard } from "@/components/shared/testimonial-card";
import { Reveal } from "@/components/shared/reveal";

export function Testimonials() {
  return (
    <section className="bg-sand-100 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Real Stories"
            title="Trusted by people like you"
            description="Thousands of patients have rediscovered the conversations, moments, and relationships hearing loss made harder to reach."
            align="center"
            className="mx-auto"
          />
        </Reveal>
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((testimonial, index) => (
            <Reveal key={testimonial.id} delay={index * 80}>
              <TestimonialCard testimonial={testimonial} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
