import React from "react";
import { Button } from "../ui/button";

const CityAlley = () => {
  return (
    <section className="py-20 overflow-hidden bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="w-full animate-fade-in-right">
            <img
              src="/images/covered-walkway.jpg"
              alt="আচ্ছাদিত পথ"
              className="w-full h-64 md:h-80 lg:h-96 object-cover rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300"
            />
          </div>
          <div className="max-w-full animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-kalpurush font-bold text-indigo-800 mb-4 lg:mb-6">
              শহরের গলিপথ
            </h2>
            <p className="text-base lg:text-lg font-bengali text-gray-700 leading-relaxed mb-6 lg:mb-8">
              পুরান ঢাকার গলিপথ, কলকাতার পাড়া-মহল্লা, চট্টগ্রামের পাহাড়ি এলাকা
              - প্রতিটি জায়গার নিজস্ব গল্প আছে। আপনার এলাকার গল্প আমাদের সাথে
              শেয়ার করুন।
            </p>
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bengali px-6 lg:px-8 py-2 lg:py-3 hover:scale-105 transition-transform duration-200">
              এলাকার গল্প লিখুন
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CityAlley;
