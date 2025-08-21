"use client";

import CommunityPower from "@/components/landing/CommunityPower";
import Cta from "@/components/landing/Cta";
import Culture from "@/components/landing/Culture";
import FeatureSection from "@/components/landing/FeatureSection";
import Footer from "@/components/landing/Footer";
import FreeThinking from "@/components/landing/FreeThinking";
import Hero from "@/components/landing/Hero";
import Journey from "@/components/landing/Journey";
import OurPlatform from "@/components/landing/OurPlatform";
import Quote from "@/components/landing/Quote";
import SafePlatform from "@/components/landing/SafePlatform";
import Technology from "@/components/landing/Technology";
import { featureSections } from "@/constants/landing";

export default function BengaliCulturalLandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50 cultural-pattern">
      <Hero />

      <Culture />

      <SafePlatform />

      <Journey />

      <FreeThinking />

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
