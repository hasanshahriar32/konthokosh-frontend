import { Card, CardContent } from "../ui/card";

const Culture: React.FC = () => {
  return (
    <section className="py-20 bg-white/80 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-kalpurush font-bold text-center text-red-800 mb-8">
          আমাদের সাংস্কৃতিক ঐতিহ্য
        </h2>
        <p className="text-xl font-bengali text-center text-gray-700 mb-16 max-w-4xl mx-auto leading-relaxed">
          বাংলার হাজার বছরের সমৃদ্ধ সংস্কৃতি আজও আমাদের জীবনে প্রবাহমান। আমাদের
          ভাষা, সাহিত্য, সংগীত, নৃত্য, শিল্পকলা - সবকিছুতেই রয়েছে অনন্য
          বৈশিষ্ট্য।
        </p>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="bg-gradient-to-br from-red-50 to-orange-50 border-red-200 hover:shadow-lg transition-shadow">
            <CardContent className="p-8 text-center">
              <div className="text-4xl mb-4">🎭</div>
              <h3 className="text-2xl font-kalpurush font-semibold text-red-700 mb-4">
                নাটক ও যাত্রা
              </h3>
              <p className="font-bengali text-gray-700 leading-relaxed">
                বাংলার ঐতিহ্যবাহী নাটক, যাত্রাপালা এবং লোকনাট্যের সমৃদ্ধ ইতিহাস।
                গ্রামীণ জীবনের গল্প থেকে শুরু করে পৌরাণিক কাহিনী - সবই উঠে এসেছে
                আমাদের মঞ্চে।
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-yellow-50 border-orange-200 hover:shadow-lg transition-shadow">
            <CardContent className="p-8 text-center">
              <div className="text-4xl mb-4">🎵</div>
              <h3 className="text-2xl font-kalpurush font-semibold text-orange-700 mb-4">
                সংগীত ও কবিতা
              </h3>
              <p className="font-bengali text-gray-700 leading-relaxed">
                রবীন্দ্রসংগীত, নজরুলগীতি, বাউল গান, ভাটিয়ালি, ভাওয়াইয়া -
                আমাদের সংগীতের ভাণ্ডার অফুরন্ত। প্রতিটি সুরে লুকিয়ে আছে বাঙালির
                হৃদয়ের কথা।
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-50 to-red-50 border-yellow-200 hover:shadow-lg transition-shadow">
            <CardContent className="p-8 text-center">
              <div className="text-4xl mb-4">🎨</div>
              <h3 className="text-2xl font-kalpurush font-semibold text-yellow-700 mb-4">
                শিল্প ও কারুকাজ
              </h3>
              <p className="font-bengali text-gray-700 leading-relaxed">
                কাঁথা, শাড়ি, পটচিত্র, মৃৎশিল্প, কাঠের কাজ, পিতলের কাজ - আমাদের
                হস্তশিল্পে রয়েছে অপূর্ব কারুকার্য। প্রতিটি নিদর্শনে ফুটে উঠেছে
                শিল্পীর মনের কথা।
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-green-50 to-teal-50 p-6 rounded-lg text-center hover:shadow-lg transition-shadow">
            <div className="text-3xl mb-3">🏛️</div>
            <h4 className="text-lg font-kalpurush font-semibold text-green-700 mb-2">
              স্থাপত্য
            </h4>
            <p className="font-bengali text-gray-600 text-sm">
              মসজিদ, মন্দির, জমিদার বাড়ি
            </p>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg text-center hover:shadow-lg transition-shadow">
            <div className="text-3xl mb-3">📚</div>
            <h4 className="text-lg font-kalpurush font-semibold text-blue-700 mb-2">
              সাহিত্য
            </h4>
            <p className="font-bengali text-gray-600 text-sm">
              কবিতা, গল্প, উপন্যাস, প্রবন্ধ
            </p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-lg text-center hover:shadow-lg transition-shadow">
            <div className="text-3xl mb-3">🍛</div>
            <h4 className="text-lg font-kalpurush font-semibold text-purple-700 mb-2">
              খাদ্য সংস্কৃতি
            </h4>
            <p className="font-bengali text-gray-600 text-sm">
              ভাত, মাছ, মিষ্টি, পিঠা
            </p>
          </div>
          <div className="bg-gradient-to-br from-rose-50 to-red-50 p-6 rounded-lg text-center hover:shadow-lg transition-shadow">
            <div className="text-3xl mb-3">🎪</div>
            <h4 className="text-lg font-kalpurush font-semibold text-rose-700 mb-2">
              উৎসব
            </h4>
            <p className="font-bengali text-gray-600 text-sm">
              পহেলা বৈশাখ, দুর্গাপূজা, ঈদ
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Culture;
