import React from "react";
import { Button } from "../ui/button";
import { cta } from "@/constants/landing";

const Cta = () => {
  return (
    <section className="relative py-20 overflow-hidden bg-primary">
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto animate-fade-in-up">
          <h2 className="text-4xl md:text-6xl font-kalpurush font-bold text-primary-foreground mb-8 bengali-text-shadow">
            {cta.title}
          </h2>
          <p className="text-xl font-bengali text-primary-foreground/90 leading-relaxed mb-12 bengali-text-shadow">
            {cta.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bengali px-8 py-4 text-lg hover:scale-105 transition-transform duration-200">
              {cta.registerButton}
            </Button>
            <Button
              variant="outline"
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary font-bengali px-8 py-4 text-lg bg-transparent hover:scale-105 transition-transform duration-200"
            >
              {cta.learnMoreButton}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cta;