import { culture } from "@/constants/landing";
import React from "react";
import CulturalCard from "../landing/CulturalCard";

const Culture: React.FC = () => {
  return (
    <section className="py-24 bg-background backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <h2 className="heading-primary">{culture.title}</h2>
        <p className="text-subtitle">{culture.description}</p>

        <div className="grid md:grid-cols-3 gap-8">
          {culture.categories.map((category, index) => (
            <CulturalCard
              key={index}
              icon={category.icon}
              title={category.title}
              description={category.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Culture;
