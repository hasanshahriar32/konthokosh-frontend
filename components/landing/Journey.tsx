import { Button } from "../ui/button";

const Journey = () => {
  return (
    <section className="py-20 overflow-hidden bg-gradient-to-br from-blue-50 to-teal-50">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="w-full animate-fade-in-left">
            <img
              src="/images/train-station.jpg"
              alt="ট্রেন স্টেশন"
              className="w-full h-64 md:h-80 lg:h-96 object-cover rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300"
            />
          </div>
          <div className="max-w-full animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-kalpurush font-bold text-blue-800 mb-4 lg:mb-6">
              আপনার সৃজনশীল যাত্রা
            </h2>
            <p className="text-base lg:text-lg font-bengali text-gray-700 leading-relaxed mb-6 lg:mb-8">
              প্রতিটি লেখক, কবি এবং গল্পকারের একটি অনন্য যাত্রা রয়েছে। আমাদের
              প্ল্যাটফর্মে আপনি আপনার চিন্তাভাবনা, অভিজ্ঞতা এবং কল্পনাকে নিরাপদে
              প্রকাশ করতে পারবেন।
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bengali px-6 lg:px-8 py-2 lg:py-3 hover:scale-105 transition-transform duration-200">
              যাত্রা শুরু করুন
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Journey;
