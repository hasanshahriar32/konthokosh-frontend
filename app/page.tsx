"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export default function BengaliCulturalLandingPage() {
  const [scrollY, setScrollY] = useState(0)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50 cultural-pattern">
      {/* Hero Section with Full Width Image and Logo Overlay */}
      <section className="relative w-full h-[72vw] max-h-[90vh] md:h-[54vw] md:max-h-[90vh] overflow-hidden">
        <nav className="absolute top-0 left-0 right-0 z-30 bg-black/20 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="text-white font-kalpurush text-xl font-semibold">বাংলার সংস্কৃতি</div>
              <div className="hidden md:flex items-center space-x-8">
                <a href="/" className="text-white/90 hover:text-white font-bengali transition-colors">
                  প্রচ্ছদ
                </a>
                <a href="/feed" className="text-white/90 hover:text-white font-bengali transition-colors">
                  ফিড
                </a>
                <a href="/write" className="text-white/90 hover:text-white font-bengali transition-colors">
                  লিখুন
                </a>
                <a href="/my-posts" className="text-white/90 hover:text-white font-bengali transition-colors">
                  আমার পোস্ট
                </a>
              </div>
              <Button
                variant="ghost"
                className="md:hidden text-white hover:bg-white/20"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </Button>
            </div>

            {isMobileMenuOpen && (
              <div className="md:hidden mt-4 pb-4 border-t border-white/20">
                <div className="flex flex-col space-y-4 pt-4">
                  <a
                    href="/"
                    className="text-white/90 hover:text-white font-bengali transition-colors block py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    প্রচ্ছদ
                  </a>
                  <a
                    href="/feed"
                    className="text-white/90 hover:text-white font-bengali transition-colors block py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    ফিড
                  </a>
                  <a
                    href="/write"
                    className="text-white/90 hover:text-white font-bengali transition-colors block py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    লিখুন
                  </a>
                  <a
                    href="/my-posts"
                    className="text-white/90 hover:text-white font-bengali transition-colors block py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    আমার পোস্ট
                  </a>
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Full Width Background Image with Parallax Effect */}
        <div
          className="absolute inset-0"
          style={{
            transform: `translateY(${scrollY * 0.5}px)`,
          }}
        >
          <img
            src="/images/bengali-street-scene.jpg"
            alt="বাংলার রাস্তার দৃশ্য - নতুন চা দোকান"
            className="w-full h-full object-cover hero-hover"
          />
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        {/* Subtitle Text with Parallax Effect */}
        <div
          className="absolute top-20 left-4 md:left-8 z-20 max-w-md"
          style={{
            transform: `translateY(${scrollY * 0.3}px)`,
            opacity: Math.max(0, 1 - scrollY / 300),
          }}
        >
          <h1
            className="text-3xl md:text-5xl xl:text-6xl font-bold text-white mb-4 bengali-text-shadow"
            style={{ fontFamily: "var(--font-baloo-da-2)" }}
          >
            বাংলার ঐতিহ্য
          </h1>
          <p
            className="text-lg md:text-xl lg:text-2xl xl:text-3xl text-white/95 leading-relaxed bengali-text-shadow mb-3"
            style={{ fontFamily: "var(--font-tiro-bangla)" }}
          >
            সহস্র বছরের সাংস্কৃতিক ঐতিহ্যের আলোকবর্তিকা
          </p>
          <p
            className="text-sm md:text-base lg:text-lg xl:text-xl text-white/90"
            style={{ fontFamily: "var(--font-kalpurush)" }}
          >
            শিল্প • সাহিত্য • সংগীত • ঐতিহ্য
          </p>
        </div>

        {/* Cherry Blossom Overlay with Parallax Effect */}
        <div
          className="absolute -bottom-2 -right-8 z-20 w-[60%]"
          style={{
            transform: `translateY(${scrollY * 0.7}px) translateX(${scrollY * 0.2}px)`,
            opacity: Math.max(0, 1 - scrollY / 400),
          }}
        >
          <img
            src="/images/bengali-header-logo.png"
            alt="কৃষ্ণ অগ্নি - নায়ের রোহ"
            className="w-full h-auto object-contain drop-shadow-lg"
          />
        </div>
      </section>

      {/* Cultural Elements Section */}
      <section className="py-20 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-kalpurush font-bold text-center text-red-800 mb-8">আমাদের সাংস্কৃতিক ঐতিহ্য</h2>
          <p className="text-xl font-bengali text-center text-gray-700 mb-16 max-w-4xl mx-auto leading-relaxed">
            বাংলার হাজার বছরের সমৃদ্ধ সংস্কৃতি আজও আমাদের জীবনে প্রবাহমান। আমাদের ভাষা, সাহিত্য, সংগীত, নৃত্য, শিল্পকলা - সবকিছুতেই রয়েছে অনন্য
            বৈশিষ্ট্য।
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="bg-gradient-to-br from-red-50 to-orange-50 border-red-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="text-4xl mb-4">🎭</div>
                <h3 className="text-2xl font-kalpurush font-semibold text-red-700 mb-4">নাটক ও যাত্রা</h3>
                <p className="font-bengali text-gray-700 leading-relaxed">
                  বাংলার ঐতিহ্যবাহী নাটক, যাত্রাপালা এবং লোকনাট্যের সমৃদ্ধ ইতিহাস। গ্রামীণ জীবনের গল্প থেকে শুরু করে পৌরাণিক কাহিনী - সবই উঠে
                  এসেছে আমাদের মঞ্চে।
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-50 to-yellow-50 border-orange-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="text-4xl mb-4">🎵</div>
                <h3 className="text-2xl font-kalpurush font-semibold text-orange-700 mb-4">সংগীত ও কবিতা</h3>
                <p className="font-bengali text-gray-700 leading-relaxed">
                  রবীন্দ্রসংগীত, নজরুলগীতি, বাউল গান, ভাটিয়ালি, ভাওয়াইয়া - আমাদের সংগীতের ভাণ্ডার অফুরন্ত। প্রতিটি সুরে লুকিয়ে আছে বাঙালির
                  হৃদয়ের কথা।
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-yellow-50 to-red-50 border-yellow-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="text-4xl mb-4">🎨</div>
                <h3 className="text-2xl font-kalpurush font-semibold text-yellow-700 mb-4">শিল্প ও কারুকাজ</h3>
                <p className="font-bengali text-gray-700 leading-relaxed">
                  কাঁথা, শাড়ি, পটচিত্র, মৃৎশিল্প, কাঠের কাজ, পিতলের কাজ - আমাদের হস্তশিল্পে রয়েছে অপূর্ব কারুকার্য। প্রতিটি নিদর্শনে ফুটে
                  উঠেছে শিল্পীর মনের কথা।
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-green-50 to-teal-50 p-6 rounded-lg text-center hover:shadow-lg transition-shadow">
              <div className="text-3xl mb-3">🏛️</div>
              <h4 className="text-lg font-kalpurush font-semibold text-green-700 mb-2">স্থাপত্য</h4>
              <p className="font-bengali text-gray-600 text-sm">মসজিদ, মন্দির, জমিদার বাড়ি</p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg text-center hover:shadow-lg transition-shadow">
              <div className="text-3xl mb-3">📚</div>
              <h4 className="text-lg font-kalpurush font-semibold text-blue-700 mb-2">সাহিত্য</h4>
              <p className="font-bengali text-gray-600 text-sm">কবিতা, গল্প, উপন্যাস, প্রবন্ধ</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-lg text-center hover:shadow-lg transition-shadow">
              <div className="text-3xl mb-3">🍛</div>
              <h4 className="text-lg font-kalpurush font-semibold text-purple-700 mb-2">খাদ্য সংস্কৃতি</h4>
              <p className="font-bengali text-gray-600 text-sm">ভাত, মাছ, মিষ্টি, পিঠা</p>
            </div>
            <div className="bg-gradient-to-br from-rose-50 to-red-50 p-6 rounded-lg text-center hover:shadow-lg transition-shadow">
              <div className="text-3xl mb-3">🎪</div>
              <h4 className="text-lg font-kalpurush font-semibold text-rose-700 mb-2">উৎসব</h4>
              <p className="font-bengali text-gray-600 text-sm">পহেলা বৈশাখ, দুর্গাপূজা, ঈদ</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 overflow-hidden bg-gradient-to-br from-red-50 to-orange-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="order-2 lg:order-1 max-w-full animate-fade-in-up">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-kalpurush font-bold text-red-800 mb-6 lg:mb-8">
                নিরাপদ লেখালেখির প্ল্যাটফর্ম
              </h2>
              <p className="text-lg lg:text-xl font-bengali text-gray-700 leading-relaxed mb-6 lg:mb-8">
                আমাদের প্ল্যাটফর্মে আপনি নিরাপদে আপনার ব্লগ, প্রবন্ধ, কবিতা এবং গল্প শেয়ার করতে পারবেন। ব্লকচেইন প্রযুক্তির মাধ্যমে আমরা
                নিশ্চিত করি যে আপনার লেখা চুরি হবে না।
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
                <div className="bg-white/80 backdrop-blur-sm p-4 lg:p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="text-2xl lg:text-3xl mb-3 lg:mb-4">🔒</div>
                  <h3 className="text-lg lg:text-xl font-kalpurush font-semibold text-red-700 mb-2">নিরাপত্তা</h3>
                  <p className="font-bengali text-gray-600 text-sm lg:text-base">ব্লকচেইন প্রযুক্তিতে সুরক্ষিত</p>
                </div>
                <div className="bg-white/80 backdrop-blur-sm p-4 lg:p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="text-2xl lg:text-3xl mb-3 lg:mb-4">✍️</div>
                  <h3 className="text-lg lg:text-xl font-kalpurush font-semibold text-red-700 mb-2">স্বাধীনতা</h3>
                  <p className="font-bengali text-gray-600 text-sm lg:text-base">ভয় ছাড়াই লিখুন</p>
                </div>
                <div className="bg-white/80 backdrop-blur-sm p-4 lg:p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="text-2xl lg:text-3xl mb-3 lg:mb-4">🚫</div>
                  <h3 className="text-lg lg:text-xl font-kalpurush font-semibold text-red-700 mb-2">চুরি প্রতিরোধ</h3>
                  <p className="font-bengali text-gray-600 text-sm lg:text-base">প্লেজিয়ারিজম প্রুফ সিস্টেম</p>
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
                প্রতিটি লেখক, কবি এবং গল্পকারের একটি অনন্য যাত্রা রয়েছে। আমাদের প্ল্যাটফর্মে আপনি আপনার চিন্তাভাবনা, অভিজ্ঞতা এবং কল্পনাকে
                নিরাপদে প্রকাশ করতে পারবেন।
              </p>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bengali px-6 lg:px-8 py-2 lg:py-3 hover:scale-105 transition-transform duration-200">
                যাত্রা শুরু করুন
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 overflow-hidden bg-gradient-to-br from-red-100 to-orange-100">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="order-2 lg:order-1 max-w-full animate-fade-in-up">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-kalpurush font-bold text-red-800 mb-6 lg:mb-8">
                মুক্ত চিন্তার স্বাধীনতা
              </h2>
              <p className="text-base lg:text-lg font-bengali text-gray-700 leading-relaxed mb-6 lg:mb-8">
                আমাদের পূর্বপুরুষরা যে স্বাধীনতার জন্য লড়াই করেছেন, সেই স্বাধীনতার চেতনায় আমরা আপনাকে মুক্ত চিন্তা প্রকাশের সুযোগ দিচ্ছি।
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
                আমাদের প্ল্যাটফর্মে লেখক, পাঠক এবং সমালোচকদের একটি সক্রিয় সম্প্রদায় রয়েছে। এখানে আপনি আপনার লেখার উপর মতামত পাবেন এবং
                অন্যদের সাথে আলোচনায় অংশ নিতে পারবেন।
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                <div className="bg-green-50 p-4 lg:p-6 rounded-lg hover:bg-green-100 transition-colors duration-300">
                  <h3 className="text-lg lg:text-xl font-kalpurush font-semibold text-green-700 mb-2">পাঠক সম্প্রদায়</h3>
                  <p className="font-bengali text-gray-600 text-sm lg:text-base">হাজারো পাঠকের সাথে যুক্ত হন</p>
                </div>
                <div className="bg-green-50 p-4 lg:p-6 rounded-lg hover:bg-green-100 transition-colors duration-300">
                  <h3 className="text-lg lg:text-xl font-kalpurush font-semibold text-green-700 mb-2">লেখক নেটওয়ার্ক</h3>
                  <p className="font-bengali text-gray-600 text-sm lg:text-base">অভিজ্ঞ লেখকদের সাথে শিখুন</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 overflow-hidden bg-gradient-to-br from-yellow-50 to-orange-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="order-2 lg:order-1 max-w-full animate-fade-in-up">
              <h2 className="text-3xl md:text-4xl font-kalpurush font-bold text-orange-800 mb-4 lg:mb-6">
                বৃষ্টির দিনের গল্প
              </h2>
              <p className="text-base lg:text-lg font-bengali text-gray-700 leading-relaxed mb-6 lg:mb-8">
                বর্ষার দিনে রিকশায় চড়ে যাওয়ার সেই অনুভূতি, বৃষ্টিতে ভিজে যাওয়ার আনন্দ - এসব গল্প আমাদের প্ল্যাটফর্মে শেয়ার করুন। প্রতিটি
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
              <h2 className="text-3xl md:text-4xl font-kalpurush font-bold text-teal-800 mb-4 lg:mb-6">হাস্যরসের জগৎ</h2>
              <p className="text-base lg:text-lg font-bengali text-gray-700 leading-relaxed mb-6 lg:mb-8">
                বাংলার হাস্যরস, কমিক্স এবং ব্যঙ্গচিত্রের ঐতিহ্য অনেক পুরানো। আমাদের প্ল্যাটফর্মে আপনি আপনার মজার গল্প, কার্টুন এবং হাস্যকর
                অভিজ্ঞতা শেয়ার করতে পারেন।
              </p>
              <Button className="bg-teal-600 hover:bg-teal-700 text-white font-bengali px-6 lg:px-8 py-2 lg:py-3 hover:scale-105 transition-transform duration-200">
                হাসির গল্প শেয়ার করুন
              </Button>
            </div>
          </div>
        </div>
      </section>

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
                পুরান ঢাকার গলিপথ, কলকাতার পাড়া-মহল্লা, চট্টগ্রামের পাহাড়ি এলাকা - প্রতিটি জায়গার নিজস্ব গল্প আছে। আপনার এলাকার গল্প আমাদের সাথে
                শেয়ার করুন।
              </p>
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bengali px-6 lg:px-8 py-2 lg:py-3 hover:scale-105 transition-transform duration-200">
                এলাকার গল্প লিখুন
              </Button>
            </div>
          </div>
        </div>
      </section>

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
                মত প্রকাশের স্বাধীনতা আমাদের মৌলিক অধিকার। আমাদের প্ল্যাটফর্মে আপনি নিরাপদে আপনার মতামত প্রকাশ করতে পারবেন। কোনো ভয় বা দ্বিধা
                ছাড়াই আপনার কথা বলুন।
              </p>
              <Button className="bg-pink-600 hover:bg-pink-700 text-white font-bengali px-6 lg:px-8 py-2 lg:py-3 hover:scale-105 transition-transform duration-200">
                মতামত প্রকাশ করুন
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-20 overflow-hidden bg-gradient-to-br from-purple-50 to-indigo-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="order-2 lg:order-1 max-w-full animate-fade-in-up">
              <h2 className="text-3xl md:text-4xl font-kalpurush font-bold text-purple-800 mb-4 lg:mb-6">
                আধুনিক প্রযুক্তি
              </h2>
              <p className="text-base lg:text-lg font-bengali text-gray-700 leading-relaxed mb-6 lg:mb-8">
                ব্লকচেইন প্রযুক্তি ব্যবহার করে আমরা নিশ্চিত করি যে আপনার প্রতিটি লেখা সুরক্ষিত থাকে। কেউ আপনার লেখা চুরি করতে পারবে না এবং
                আপনি সর্বদা আপনার কাজের মালিকানা প্রমাণ করতে পারবেন।
              </p>
              <div className="bg-white/80 backdrop-blur-sm p-6 lg:p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-xl lg:text-2xl font-kalpurush font-semibold text-purple-700 mb-4">ব্লকচেইন সুরক্ষা</h3>
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

      {/* Promotional Video Section */}
      <section className="py-20 overflow-hidden bg-gradient-to-br from-emerald-50 to-teal-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-kalpurush font-bold text-emerald-800 mb-6">
              আমাদের প্ল্যাটফর্মের পরিচয়
            </h2>
            <p className="text-lg lg:text-xl font-bengali text-gray-700 leading-relaxed max-w-3xl mx-auto">
              এই ভিডিওতে দেখুন কিভাবে আমাদের প্ল্যাটফর্ম আপনার সৃজনশীল কাজকে সুরক্ষিত রাখে এবং বাংলা সাহিত্যের নতুন দিগন্ত উন্মোচন করে।
            </p>
          </div>
          <div className="max-w-4xl mx-auto animate-fade-in-up">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow duration-500">
              <video className="w-full h-auto" autoPlay muted loop playsInline controls={false}>
                <source
                  src="https://pub-91b6dab2710249aebab317bffbbcd649.r2.dev/a7273cd356998459a075dd8dcfff8603.mp4"
                  type="video/mp4"
                />
                আপনার ব্রাউজার ভিডিও সাপোর্ট করে না।
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600">
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto animate-fade-in-up">
            <h2 className="text-4xl md:text-6xl font-kalpurush font-bold text-white mb-8 bengali-text-shadow">
              আজই শুরু করুন
            </h2>
            <p className="text-xl font-bengali text-white/90 leading-relaxed mb-12 bengali-text-shadow">
              আপনার সৃজনশীলতাকে নিরাপদ পরিবেশে প্রকাশ করুন। আমাদের সাথে যোগ দিন এবং বাংলা সাহিত্যের নতুন অধ্যায় রচনা করুন।
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-white text-red-600 hover:bg-gray-100 font-bengali px-8 py-4 text-lg hover:scale-105 transition-transform duration-200">
                নিবন্ধন করুন
              </Button>
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-red-600 font-bengali px-8 py-4 text-lg bg-transparent hover:scale-105 transition-transform duration-200"
              >
                আরও জানুন
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-20 bg-gradient-to-r from-red-600 to-orange-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <blockquote className="text-3xl lg:text-4xl font-kalpurush font-medium mb-8 bengali-text-shadow">
            "যেখানে দেখিবে ছাই, উড়াইয়া দেখ তাই,
            <br />
            পাইলেও পাইতে পার অমূল্য রতন।"
          </blockquote>
          <cite className="text-xl font-bengali opacity-90">- কবি নজরুল ইসলাম</cite>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-kalpurush font-semibold mb-4">বাংলার সংস্কৃতি</h3>
          <p className="font-bengali text-gray-300 mb-6">আমাদের ঐতিহ্য সংরক্ষণ ও প্রচারে আমরা প্রতিশ্রুতিবদ্ধ</p>
          <div className="flex justify-center gap-6">
            <Button variant="ghost" className="text-white hover:text-red-300 font-bengali">
              যোগাযোগ
            </Button>
            <Button variant="ghost" className="text-white hover:text-red-300 font-bengali">
              সম্পর্কে
            </Button>
            <Button variant="ghost" className="text-white hover:text-red-300 font-bengali">
              সংগ্রহ
            </Button>
          </div>
        </div>
      </footer>
    </div>
  )
}
