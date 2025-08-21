import React from "react";

const Technology: React.FC = () => {
  return (
    <section className="py-20 overflow-hidden bg-gradient-to-br from-purple-50 to-indigo-50">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="order-2 lg:order-1 max-w-full animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-kalpurush font-bold text-purple-800 mb-4 lg:mb-6">
              আধুনিক প্রযুক্তি
            </h2>
            <p className="text-base lg:text-lg font-bengali text-gray-700 leading-relaxed mb-6 lg:mb-8">
              ব্লকচেইন প্রযুক্তি ব্যবহার করে আমরা নিশ্চিত করি যে আপনার প্রতিটি
              লেখা সুরক্ষিত থাকে। কেউ আপনার লেখা চুরি করতে পারবে না এবং আপনি
              সর্বদা আপনার কাজের মালিকানা প্রমাণ করতে পারবেন।
            </p>
            <div className="bg-white/80 backdrop-blur-sm p-6 lg:p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl lg:text-2xl font-kalpurush font-semibold text-purple-700 mb-4">
                ব্লকচেইন সুরক্ষা
              </h3>
              <ul className="font-bengali text-gray-600 space-y-2 text-sm lg:text-base">
                <li>• প্রতিটি লেখার জন্য অনন্য ডিজিটাল স্বাক্ষর</li>
                <li>• অপরিবর্তনীয় টাইমস্ট্যাম্প</li>
                <li>• বিকেন্দ্রীভূত সংরক্ষণ ব্যবস্থা</li>
                <li>• স্বচ্ছ মালিকানা প্রমাণ</li>
              </ul>
            </div>
          </div>
          <div className="order-1 lg:order-2 w-full animate-fade-in-left">
            <img
              src="/images/bengali-typography.webp"
              alt="বাংলা টাইপোগ্রাফি"
              className="w-full h-64 md:h-80 lg:h-96 object-cover rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Technology;
