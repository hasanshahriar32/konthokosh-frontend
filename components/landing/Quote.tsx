import React from "react";

const Quote: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-red-600 to-orange-600 text-white">
      <div className="container mx-auto px-4 text-center">
        <blockquote className="text-3xl lg:text-4xl font-kalpurush font-medium mb-8 bengali-text-shadow">
          "যেখানে দেখিবে ছাই, উড়াইয়া দেখ তাই,
          <br />
          পাইলেও পাইতে পার অমূল্য রতন।"
        </blockquote>
        <cite className="text-xl font-bengali opacity-90">
          - কবি নজরুল ইসলাম
        </cite>
      </div>
    </section>
  );
};

export default Quote;
