import React from "react";
import { Button } from "../ui/button";

const RainyDay = () => {
  return (
    <section className="py-20 overflow-hidden bg-gradient-to-br from-yellow-50 to-orange-50">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="order-2 lg:order-1 max-w-full animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-kalpurush font-bold text-orange-800 mb-4 lg:mb-6">
              বৃষ্টির দিনের গল্প
            </h2>
            <p className="text-base lg:text-lg font-bengali text-gray-700 leading-relaxed mb-6 lg:mb-8">
              বর্ষার দিনে রিকশায় চড়ে যাওয়ার সেই অনুভূতি, বৃষ্টিতে ভিজে
              যাওয়ার আনন্দ - এসব গল্প আমাদের প্ল্যাটফর্মে শেয়ার করুন। প্রতিটি
              বৃষ্টির ফোঁটায় লুকিয়ে আছে অসংখ্য স্মৃতি।
            </p>
            <Button className="bg-orange-600 hover:bg-orange-700 text-white font-bengali px-6 lg:px-8 py-2 lg:py-3 hover:scale-105 transition-transform duration-200">
              বৃষ্টির গল্প লিখুন
            </Button>
          </div>
          <div className="order-1 lg:order-2 w-full animate-fade-in-left">
            <img
              src="/images/rainy-street.jpg"
              alt="বৃষ্টির রাস্তা"
              className="w-full h-64 md:h-80 lg:h-96 object-cover rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default RainyDay;
