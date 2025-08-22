import React from "react";
import { Button } from "../ui/button";
import { cta } from "@/constants/landing";

const Cta = () => {
  return (
    <section className="relative py-20 overflow-hidden bg-secondary/80">
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto animate-fade-in-up">
          <h2 className="text-4xl md:text-6xl font-kalpurush font-bold mb-8 bengali-text-shadow">
            {cta.title}
          </h2>
          <p className="text-xl font-bengali leading-relaxed mb-12 bengali-text-shadow">
            {cta.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              style={{
                backgroundColor: "oklch(41% 0 0)",
                color: "oklch(41% 0 0 / 0.9)",
              }}
              className="font-bengali px-8 py-4 text-lg !text-white hover:scale-105 transition-transform duration-200 rounded-full border-none"
            >
              {cta.registerButton}
            </Button>
            <Button
              variant="outline"
              style={{ borderColor: "oklch(41% 0 0)", color: "oklch(41% 0 0)" }}
              className="font-bengali px-8 py-4 text-lg bg-transparent hover:bg-transparent hover:scale-105 transition-transform duration-200 rounded-full"
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
