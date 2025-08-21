import React from "react";
import { ourPlatform } from "@/constants/landing";

const OurPlatform = () => {
  return (
    <section className="py-20 overflow-hidden bg-gradient-to-br from-emerald-50 to-teal-50">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-kalpurush font-bold text-emerald-800 mb-6">
            {ourPlatform.title}
          </h2>
          <p className="text-lg lg:text-xl font-bengali text-gray-700 leading-relaxed max-w-3xl mx-auto">
            {ourPlatform.description}
          </p>
        </div>
        <div className="max-w-4xl mx-auto animate-fade-in-up">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow duration-500">
            <video
              className="w-full h-auto"
              autoPlay
              muted
              loop
              playsInline
              controls={false}
            >
              <source
                src={ourPlatform.videoSrc}
                type="video/mp4"
              />
              {ourPlatform.videoAlt}
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurPlatform;
