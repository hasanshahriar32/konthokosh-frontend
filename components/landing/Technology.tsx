import React from "react";
import { technology } from "@/constants/landing";

const Technology: React.FC = () => {
  return (
    <section className="py-20 overflow-hidden bg-background">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="order-2 lg:order-1 max-w-full animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-kalpurush font-bold text-primary mb-4 lg:mb-6">
              {technology.title}
            </h2>
            <p className="text-base lg:text-lg font-bengali text-foreground leading-relaxed mb-6 lg:mb-8">
              {technology.description}
            </p>
            <div className="bg-card/80 backdrop-blur-sm p-6 lg:p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl lg:text-2xl font-kalpurush font-semibold text-primary mb-4">
                ব্লকচেইন সুরক্ষা
              </h3>
              <ul className="font-bengali text-muted-foreground space-y-2 text-sm lg:text-base">
                {technology.features.map((feature, index) => (
                  <li key={index}>• {feature}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="order-1 lg:order-2 w-full animate-fade-in-left">
            <img
              src="/images/bengali-typography.webp"
              alt={technology.imageAlt}
              className="w-full h-64 md:h-80 lg:h-96 object-cover rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Technology;