import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { BusinessesOverview } from "@/components/sections/businesses-overview";
import { WhyUs } from "@/components/sections/why-us";
import { GroupPresence } from "@/components/sections/group-presence";
import { NewsTeaser } from "@/components/sections/news-teaser";
import { InvestorCta } from "@/components/sections/investor-cta";
import { FinalCta } from "@/components/sections/final-cta";

export const metadata: Metadata = {
  title: "Beltone Holding | Financial Services Group",
  description:
    "Beltone Holding is a Cairo-headquartered financial-services group listed on the Egyptian Exchange (EGX: BTFH), spanning investment banking, asset management, financing, and advisory businesses across Africa.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <BusinessesOverview />
      <WhyUs />
      <GroupPresence />
      <NewsTeaser />
      <InvestorCta />
      <FinalCta />
    </>
  );
}
