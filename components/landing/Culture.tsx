import { culture } from "@/constants/landing";
import React from "react";
import CulturalCard from "../landing/CulturalCard";

const Culture: React.FC = () => {
  return (
    <section className="py-20 bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-kalpurush font-bold text-center text-primary mb-8">
          {culture.title}
        </h2>
        <p className="text-xl font-bengali text-center text-foreground mb-16 max-w-4xl mx-auto leading-relaxed">
          {culture.description}
        </p>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {culture.categories.map((category, index) => (
            <CulturalCard
              key={index}
              icon={category.icon}
              title={category.title}
              description={category.description}
            />
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {culture.shortCategories.map((category, index) => (
            <CulturalCard
              key={index}
              icon={category.icon}
              title={category.title}
              bg={category.bg}
              description={category.description}
              variant="short"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Culture;