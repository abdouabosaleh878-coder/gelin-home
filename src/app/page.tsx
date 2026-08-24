import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { ProgramsOverview } from "@/components/sections/programs-overview";
import { WhyUs } from "@/components/sections/why-us";
import { Locations } from "@/components/sections/locations";
import { NewsTeaser } from "@/components/sections/news-teaser";
import { TrialCta } from "@/components/sections/trial-cta";
import { FinalCta } from "@/components/sections/final-cta";

export const metadata: Metadata = {
  title: "Current Swim Academy | Swim Lessons for Every Age",
  description:
    "Current Swim Academy offers swim lessons and training for every age and ability across five Austin-area locations — from Parent & Baby Swim to competitive team training and adult fitness.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProgramsOverview />
      <WhyUs />
      <Locations />
      <NewsTeaser />
      <TrialCta />
      <FinalCta />
    </>
  );
}
