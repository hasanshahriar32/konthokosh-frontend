import React from "react";

const SafePlatform: React.FC = () => {
  return (
    <section className="py-20 overflow-hidden bg-gradient-to-br from-red-50 to-orange-50">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="order-2 lg:order-1 max-w-full animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-kalpurush font-bold text-red-800 mb-6 lg:mb-8">
              নিরাপদ লেখালেখির প্ল্যাটফর্ম
            </h2>
            <p className="text-lg lg:text-xl font-bengali text-gray-700 leading-relaxed mb-6 lg:mb-8">
              আমাদের প্ল্যাটফর্মে আপনি নিরাপদে আপনার ব্লগ, প্রবন্ধ, কবিতা এবং
              গল্প শেয়ার করতে পারবেন। ব্লকচেইন প্রযুক্তির মাধ্যমে আমরা নিশ্চিত
              করি যে আপনার লেখা চুরি হবে না।
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
              <div className="bg-white/80 backdrop-blur-sm p-4 lg:p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="text-2xl lg:text-3xl mb-3 lg:mb-4">🔒</div>
                <h3 className="text-lg lg:text-xl font-kalpurush font-semibold text-red-700 mb-2">
                  নিরাপত্তা
                </h3>
                <p className="font-bengali text-gray-600 text-sm lg:text-base">
                  ব্লকচেইন প্রযুক্তিতে সুরক্ষিত
                </p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm p-4 lg:p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="text-2xl lg:text-3xl mb-3 lg:mb-4">✍️</div>
                <h3 className="text-lg lg:text-xl font-kalpurush font-semibold text-red-700 mb-2">
                  স্বাধীনতা
                </h3>
                <p className="font-bengali text-gray-600 text-sm lg:text-base">
                  ভয় ছাড়াই লিখুন
                </p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm p-4 lg:p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="text-2xl lg:text-3xl mb-3 lg:mb-4">🚫</div>
                <h3 className="text-lg lg:text-xl font-kalpurush font-semibold text-red-700 mb-2">
                  চুরি প্রতিরোধ
                </h3>
                <p className="font-bengali text-gray-600 text-sm lg:text-base">
                  প্লেজিয়ারিজম প্রুফ সিস্টেম
                </p>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2 w-full animate-fade-in-left">
            <img
              src="/images/shaheed-minar.jpg"
              alt="শহীদ মিনার"
              className="w-full h-64 md:h-80 lg:h-96 object-cover rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SafePlatform;
