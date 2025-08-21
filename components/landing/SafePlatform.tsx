import { safePlatform } from "@/constants/landing";
import React from "react";
import FeatureItem from "../landing/FeatureItem";

const SafePlatform: React.FC = () => {
  return (
    <section className="py-20 overflow-hidden bg-background">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="order-2 lg:order-1 max-w-full animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-kalpurush font-bold text-primary mb-6 lg:mb-8">
              {safePlatform.title}
            </h2>
            <p className="text-lg lg:text-xl font-bengali text-foreground leading-relaxed mb-6 lg:mb-8">
              {safePlatform.description}
            </p>
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
            <img
              src="/images/shaheed-minar.jpg"
              alt={safePlatform.imageAlt}
              className="w-full h-64 md:h-80 lg:h-96 object-cover rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SafePlatform;