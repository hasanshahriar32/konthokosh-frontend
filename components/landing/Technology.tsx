import { technology } from "@/constants/landing";
import Image from "next/image";
import React from "react";

const Technology: React.FC = () => {
  return (
    <section className="py-20 overflow-hidden bg-background">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="order-2 lg:order-1 max-w-full animate-fade-in-up">
            <h2 className="heading-secondary">{technology.title}</h2>
            <p className="text-x18">{technology.description}</p>
            <div className="p-6 lg:p-8">
              <h3 className="heading-tertiary mb-4">
                {technology.blockchainTitle}
              </h3>
              <ul className="font-bengali text-muted-foreground space-y-2 text-sm lg:text-base">
                {technology.features.map((feature, index) => (
                  <li key={index}>• {feature}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="order-1 lg:order-2 w-full animate-fade-in-left">
            <Image
              src={technology.imageSrc}
              alt={technology.imageAlt}
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

export default Technology;
