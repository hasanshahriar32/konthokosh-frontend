import Image from "next/image";
import { Suspense, useEffect, useState } from "react";

import { hero } from "@/constants/landing";
import Navbar from "../Navbar";

const Hero: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative w-full h-[72vw] max-h-[90vh] md:h-[54vw] md:max-h-screen overflow-hidden">
      <Suspense fallback={<></>}>
        <Navbar isHero />
      </Suspense>

      <div
        className="absolute inset-0 -z-10"
        style={{
          transform: `translateY(${scrollY * 0.5}px)`,
          backgroundImage: `linear-gradient(135deg, rgba(0,0,0,0.75), rgba(0,0,0,0.45)), url(${hero.imageSrc})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        aria-label={hero.imageAlt}
      />

      <div className="relative h-full max-w-lg flex flex-col justify-center px-10">
        <h1
          className="text-3xl md:text-5xl xl:text-6xl font-bold text-primary-foreground mb-4 bengali-text-shadow"
          style={{ fontFamily: "var(--font-baloo-da-2)" }}
        >
          {hero.title}
        </h1>
        <p
          className="text-lg md:text-xl lg:text-2xl xl:text-3xl text-primary-foreground/95 leading-relaxed bengali-text-shadow mb-3"
          style={{ fontFamily: "var(--font-tiro-bangla)" }}
        >
          {hero.subtitle}
        </p>
        <p
          className="text-sm md:text-base lg:text-lg xl:text-xl text-primary-foreground/90"
          style={{ fontFamily: "var(--font-kalpurush)" }}
        >
          {hero.categories}
        </p>
      </div>

      {/* Cherry Blossom Overlay with Parallax Effect */}
      <div
        className="absolute -bottom-2 -right-8 z-20 w-[60%]"
        style={{
          transform: `translateY(${scrollY * 0.7}px) translateX(${
            scrollY * 0.2
          }px)`,
          opacity: Math.max(0, 1 - scrollY / 400),
        }}
      >
        <Image
          src={hero.bottomImageSrc}
          alt={hero.bottomImageAlt}
          height={0}
          width={0}
          sizes="full"
          className="w-full h-auto object-contain drop-shadow-lg"
        />
      </div>
    </section>
  );
};

export default Hero;
