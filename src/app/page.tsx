import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { HearingAssessmentCta } from "@/components/sections/hearing-assessment-cta";
import { FeaturedProducts } from "@/components/sections/featured-products";
import { WhyBeltone } from "@/components/sections/why-beltone";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Testimonials } from "@/components/sections/testimonials";
import { EducationalContent } from "@/components/sections/educational-content";
import { ClinicLocatorCta } from "@/components/sections/clinic-locator-cta";
import { FinalCta } from "@/components/sections/final-cta";

export const metadata: Metadata = {
  title: "Beltone Hearing Care | Personalized Hearing Solutions",
  description:
    "Hear more of what matters. Book a free hearing assessment, explore modern Beltone hearing aids, and find a hearing-care clinic near you.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <HearingAssessmentCta />
      <FeaturedProducts />
      <WhyBeltone />
      <HowItWorks />
      <Testimonials />
      <EducationalContent />
      <ClinicLocatorCta />
      <FinalCta />
    </>
  );
}
