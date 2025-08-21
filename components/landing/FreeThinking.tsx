import React from "react";
import { Button } from "../ui/button";

const FreeThinking: React.FC = () => {
  return (
    <section className="py-20 overflow-hidden bg-gradient-to-br from-red-100 to-orange-100">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="order-2 lg:order-1 max-w-full animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-kalpurush font-bold text-red-800 mb-6 lg:mb-8">
              মুক্ত চিন্তার স্বাধীনতা
            </h2>
            <p className="text-base lg:text-lg font-bengali text-gray-700 leading-relaxed mb-6 lg:mb-8">
              আমাদের পূর্বপুরুষরা যে স্বাধীনতার জন্য লড়াই করেছেন, সেই
              স্বাধীনতার চেতনায় আমরা আপনাকে মুক্ত চিন্তা প্রকাশের সুযোগ দিচ্ছি।
            </p>
            <Button className="bg-red-600 hover:bg-red-700 text-white font-bengali px-6 lg:px-8 py-2 lg:py-3 hover:scale-105 transition-transform duration-200">
              স্বাধীনভাবে লিখুন
            </Button>
          </div>
          <div className="order-1 lg:order-2 w-full animate-fade-in-left">
            <img
              src="/images/independence-art.jpg"
              alt="স্বাধীনতার শিল্প"
              className="w-full h-64 md:h-80 lg:h-96 object-cover rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FreeThinking;
