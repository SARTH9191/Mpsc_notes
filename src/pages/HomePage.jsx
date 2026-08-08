import React from "react";
import { Hero } from "../components/home/Hero";
import { TrustStats } from "../components/home/TrustStats";
import { PopularExams } from "../components/home/PopularExams";
import { FeaturedNotes } from "../components/home/FeaturedNotes";
import { WhyExamVault } from "../components/home/WhyExamVault";
import { HowItWorks } from "../components/home/HowItWorks";
import { Testimonials } from "../components/home/Testimonials";
import { FAQAccordion } from "../components/home/FAQAccordion";
import { HomeCTA } from "../components/home/HomeCTA";
import { AdBanner } from "../components/common/AdBanner";

export function HomePage() {
  return (
    <div>
      <Hero />
      <TrustStats />
      
      {/* Top Banner Ad Placement */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <AdBanner placement="home_top" />
      </div>

      <PopularExams />
      <FeaturedNotes />

      {/* Middle Banner Ad Placement */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <AdBanner placement="home_middle" />
      </div>

      <WhyExamVault />
      <HowItWorks />
      <Testimonials />
      <HomeCTA />
      <FAQAccordion />
    </div>
  );
}
