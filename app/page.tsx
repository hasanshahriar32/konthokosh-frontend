"use client";

import CityAlley from "@/components/landing/CityAlley";
import CommunityPower from "@/components/landing/CommunityPower";
import Cta from "@/components/landing/Cta";
import Culture from "@/components/landing/Culture";
import Footer from "@/components/landing/Footer";
import FreedomOfSpeech from "@/components/landing/FreedomOfSpeech";
import FreeThinking from "@/components/landing/FreeThinking";
import Hero from "@/components/landing/Hero";
import Humor from "@/components/landing/Humor";
import Journey from "@/components/landing/Journey";
import OurPlatform from "@/components/landing/OurPlatform";
import Quote from "@/components/landing/Quote";
import RainyDay from "@/components/landing/RainyDay";
import SafePlatform from "@/components/landing/SafePlatform";
import Technology from "@/components/landing/Technology";

export default function BengaliCulturalLandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50 cultural-pattern">
      <Hero />

      <Culture />

      <SafePlatform />

      <Journey />

      <FreeThinking />

      <CommunityPower />

      <RainyDay />

      <Humor />

      <CityAlley />

      <FreedomOfSpeech />

      {/* Technology Section */}
      <Technology />

      {/* Promotional Video Section */}
      <OurPlatform />

      {/* Call to Action Section */}
      <Cta />

      {/* Quote Section */}
      <Quote />

      {/* Footer */}
    <Footer/>
    </div>
  );
}
