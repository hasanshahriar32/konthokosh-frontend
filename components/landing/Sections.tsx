import {
    cityAlley,
    freedomOfSpeech,
    humor,
    rainyDay,
} from "@/constants/landing";
import React from "react";
import FeatureSection from "./FeatureSection";

const Sections: React.FC = () => {
  return (
    <>
      <FeatureSection
        imageSrc="/images/rainy-street.jpg"
        imageAlt={rainyDay.imageAlt}
        title={rainyDay.title}
        description={rainyDay.description}
        buttonText={rainyDay.button}
        reverse={true}
        colorScheme={{
          gradient: "bg-gradient-to-br from-yellow-50 to-orange-50",
          title: "text-orange-800",
          button: "bg-orange-600",
          buttonHover: "hover:bg-orange-700",
        }}
      />

      <FeatureSection
        imageSrc="/images/bengali-comic.jpg"
        imageAlt={humor.imageAlt}
        title={humor.title}
        description={humor.description}
        buttonText={humor.button}
        colorScheme={{
          gradient: "bg-gradient-to-br from-teal-50 to-blue-50",
          title: "text-teal-800",
          button: "bg-teal-600",
          buttonHover: "hover:bg-teal-700",
        }}
      />

      <FeatureSection
        imageSrc="/images/covered-walkway.jpg"
        imageAlt={cityAlley.imageAlt}
        title={cityAlley.title}
        description={cityAlley.description}
        buttonText={cityAlley.button}
        reverse={true}
        colorScheme={{
          gradient: "bg-gradient-to-br from-indigo-50 to-purple-50",
          title: "text-indigo-800",
          button: "bg-indigo-600",
          buttonHover: "hover:bg-indigo-700",
        }}
      />

      <FeatureSection
        imageSrc="/images/freedom-speech.jpg"
        imageAlt={freedomOfSpeech.imageAlt}
        title={freedomOfSpeech.title}
        description={freedomOfSpeech.description}
        buttonText={freedomOfSpeech.button}
        colorScheme={{
          gradient: "bg-gradient-to-br from-pink-50 to-red-50",
          title: "text-pink-800",
          button: "bg-pink-600",
          buttonHover: "hover:bg-pink-700",
        }}
      />
    </>
  );
};

export default Sections;
