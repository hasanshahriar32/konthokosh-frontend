"use client";

import CommunityPower from "@/components/landing/CommunityPower";
import Cta from "@/components/landing/Cta";
import Culture from "@/components/landing/Culture";
import FeatureSection from "@/components/landing/FeatureSection";
import Footer from "@/components/landing/Footer";
import Hero from "@/components/landing/Hero";
import OurPlatform from "@/components/landing/OurPlatform";
import Quote from "@/components/landing/Quote";
import SafePlatform from "@/components/landing/SafePlatform";
import Technology from "@/components/landing/Technology";
import AdvantageItem from "@/components/landing/AdvantageItem";
import { featureSections, alternatingContentSections } from "@/constants/landing";

export default function BengaliCulturalLandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50 cultural-pattern">
      <Hero />

      <Culture />

      <SafePlatform />

      {alternatingContentSections.map((section, index) => (
        <AdvantageItem
          key={index}
          title={section.title}
          description={section.description}
          imageSrc={section.imageSrc}
          imageAlt={section.imageAlt}
          buttonText={section.button}
          reverse={section.reverse}
        />
      ))}

      <CommunityPower />

      {featureSections.map((section, index) => (
        <FeatureSection
          key={index}
          imageSrc={section.imageSrc}
          imageAlt={section.imageAlt}
          title={section.title}
          description={section.description}
          buttonText={section.button}
          reverse={section.reverse}
          colorScheme={section.colorScheme}
        />
      ))}

      <Technology />

      <OurPlatform />

      <Cta />

      <Quote />

      <Footer />
    </div>
  );
}
