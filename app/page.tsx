"use client";

import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import AdvantageItem from "@/components/landing/AdvantageItem";
import CommunityPower from "@/components/landing/CommunityPower";
import Cta from "@/components/landing/Cta";
import Culture from "@/components/landing/Culture";
import FeatureSection from "@/components/landing/FeatureSection";
import Footer from "@/components/landing/Footer";
import Hero from "@/components/landing/Hero";
import OurPlatform from "@/components/landing/OurPlatform";
import SafePlatform from "@/components/landing/SafePlatform";
import Technology from "@/components/landing/Technology";
import { paths } from "@/constants";
import {
  alternatingContentSections,
  featureSections,
} from "@/constants/landing";
import PageLoader from "@/components/common/PageLoader";

export default function BengaliCulturalLandingPage() {
  const router = useRouter();
  const { isLoaded, isSignedIn } = useAuth();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.push(paths.feed);
    }
  }, [isLoaded, isSignedIn, router]);

  if (!isLoaded) return <PageLoader />;

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

      <Footer />
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

      <Footer />
    </div>
  );
}
