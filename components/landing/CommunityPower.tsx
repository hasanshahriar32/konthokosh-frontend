import React from "react";

const CommunityPower: React.FC = () => {
  return (
    <section className="py-20 overflow-hidden bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="w-full animate-fade-in-right">
            <img
              src="/images/rickshaw-park.jpg"
              alt="রিকশা পার্ক"
              className="w-full h-64 md:h-80 lg:h-96 object-cover rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300"
            />
          </div>
          <div className="max-w-full animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-kalpurush font-bold text-green-800 mb-4 lg:mb-6">
              সম্প্রদায়ের শক্তি
            </h2>
            <p className="text-base lg:text-lg font-bengali text-gray-700 leading-relaxed mb-6 lg:mb-8">
              আমাদের প্ল্যাটফর্মে লেখক, পাঠক এবং সমালোচকদের একটি সক্রিয়
              সম্প্রদায় রয়েছে। এখানে আপনি আপনার লেখার উপর মতামত পাবেন এবং
              অন্যদের সাথে আলোচনায় অংশ নিতে পারবেন।
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
              <div className="bg-green-50 p-4 lg:p-6 rounded-lg hover:bg-green-100 transition-colors duration-300">
                <h3 className="text-lg lg:text-xl font-kalpurush font-semibold text-green-700 mb-2">
                  পাঠক সম্প্রদায়
                </h3>
                <p className="font-bengali text-gray-600 text-sm lg:text-base">
                  হাজারো পাঠকের সাথে যুক্ত হন
                </p>
              </div>
              <div className="bg-green-50 p-4 lg:p-6 rounded-lg hover:bg-green-100 transition-colors duration-300">
                <h3 className="text-lg lg:text-xl font-kalpurush font-semibold text-green-700 mb-2">
                  লেখক নেটওয়ার্ক
                </h3>
                <p className="font-bengali text-gray-600 text-sm lg:text-base">
                  অভিজ্ঞ লেখকদের সাথে শিখুন
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunityPower;
