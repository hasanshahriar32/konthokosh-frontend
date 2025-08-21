import React from "react";
import { quote } from "@/constants/landing";

const Quote: React.FC = () => {
  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 text-center">
        <blockquote className="text-3xl lg:text-4xl font-kalpurush font-medium mb-8 bengali-text-shadow">
          "{quote.text}"
        </blockquote>
        <cite className="text-xl font-bengali opacity-90">
          - {quote.author}
        </cite>
      </div>
    </section>
  );
};

export default Quote;