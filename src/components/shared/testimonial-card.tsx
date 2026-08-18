import Image from "next/image";
import { Star } from "lucide-react";
import type { Testimonial } from "@/data/testimonials";
import { Card } from "@/components/ui/card";

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <Card className="flex h-full flex-col p-6">
      <div className="flex items-center gap-1" role="img" aria-label={`Rated ${testimonial.rating} out of 5 stars`}>
        {Array.from({ length: 5 }).map((_, index) => (
          <Star
            key={index}
            className={
              index < testimonial.rating
                ? "h-4 w-4 fill-teal-500 text-teal-500"
                : "h-4 w-4 text-navy-200"
            }
            aria-hidden="true"
          />
        ))}
      </div>
      <blockquote className="mt-4 flex-1 text-lg text-ink-700">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3">
        <Image
          src={testimonial.image}
          alt=""
          width={48}
          height={48}
          className="h-12 w-12 rounded-full object-cover"
        />
        <div>
          <p className="font-semibold text-navy-900">
            {testimonial.name}
            {testimonial.age ? `, ${testimonial.age}` : ""}
          </p>
          <p className="text-sm text-ink-500">{testimonial.location}</p>
        </div>
      </figcaption>
    </Card>
  );
}
