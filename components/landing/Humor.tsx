import React from "react";
import { Button } from "../ui/button";

const Humor = () => {
  return (
    <section className="py-20 overflow-hidden bg-gradient-to-br from-teal-50 to-blue-50">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="w-full animate-fade-in-right">
            <img
              src="/images/bengali-comic.jpg"
              alt="বাংলা কমিক"
              className="w-full h-64 md:h-80 lg:h-96 object-cover rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300"
            />
          </div>
          <div className="max-w-full animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-kalpurush font-bold text-teal-800 mb-4 lg:mb-6">
              হাস্যরসের জগৎ
            </h2>
            <p className="text-base lg:text-lg font-bengali text-gray-700 leading-relaxed mb-6 lg:mb-8">
              বাংলার হাস্যরস, কমিক্স এবং ব্যঙ্গচিত্রের ঐতিহ্য অনেক পুরানো।
              আমাদের প্ল্যাটফর্মে আপনি আপনার মজার গল্প, কার্টুন এবং হাস্যকর
              অভিজ্ঞতা শেয়ার করতে পারেন।
            </p>
            <Button className="bg-teal-600 hover:bg-teal-700 text-white font-bengali px-6 lg:px-8 py-2 lg:py-3 hover:scale-105 transition-transform duration-200">
              হাসির গল্প শেয়ার করুন
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Humor;
