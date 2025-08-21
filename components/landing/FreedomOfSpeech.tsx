import React from "react";
import { Button } from "../ui/button";

const FreedomOfSpeech = () => {
  return (
    <section className="py-20 overflow-hidden bg-gradient-to-br from-pink-50 to-red-50">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="w-full animate-fade-in-right">
            <img
              src="/images/freedom-speech.jpg"
              alt="বাক স্বাধীনতা"
              className="w-full h-64 md:h-80 lg:h-96 object-cover rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300"
            />
          </div>
          <div className="max-w-full animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-kalpurush font-bold text-pink-800 mb-4 lg:mb-6">
              বাক স্বাধীনতার গুরুত্ব
            </h2>
            <p className="text-base lg:text-lg font-bengali text-gray-700 leading-relaxed mb-6 lg:mb-8">
              মত প্রকাশের স্বাধীনতা আমাদের মৌলিক অধিকার। আমাদের প্ল্যাটফর্মে
              আপনি নিরাপদে আপনার মতামত প্রকাশ করতে পারবেন। কোনো ভয় বা দ্বিধা
              ছাড়াই আপনার কথা বলুন।
            </p>
            <Button className="bg-pink-600 hover:bg-pink-700 text-white font-bengali px-6 lg:px-8 py-2 lg:py-3 hover:scale-105 transition-transform duration-200">
              মতামত প্রকাশ করুন
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FreedomOfSpeech;
