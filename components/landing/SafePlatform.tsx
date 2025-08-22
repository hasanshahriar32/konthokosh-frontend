import { safePlatform } from "@/constants/landing";
import Image from "next/image";
import React from "react";
import FeatureItem from "../landing/FeatureItem";

const SafePlatform: React.FC = () => {
  return (
    <section className="py-20 overflow-hidden bg-background">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="order-2 lg:order-1 max-w-full animate-fade-in-up">
            <h2 className="heading-primary">{safePlatform.title}</h2>
            <p className="text-x18 mb-8 lg:mb-12">{safePlatform.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
              {safePlatform.features.map((feature, index) => (
                <FeatureItem
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                />
              ))}
            </div>
          </div>
          <div className="order-1 lg:order-2 w-full animate-fade-in-left">
            <Image
              src={safePlatform.imageSrc}
              alt={safePlatform.imageAlt}
              height={0}
              width={0}
              sizes="full"
              className="w-full h-64 md:h-80 lg:h-96 object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SafePlatform;
