import React from "react";
import Image from "next/image";
import { Button } from "../ui/button";

interface AdvantageItem {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  buttonText: string;
  reverse?: boolean; // For zigzag layout
}

const AdvantageItem: React.FC<AdvantageItem> = ({
  title,
  description,
  imageSrc,
  imageAlt,
  buttonText,
  reverse = false,
}) => {
  return (
    <section className="py-20 overflow-hidden bg-background">
      <div className="container mx-auto px-4 max-w-7xl">
        <div
          className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
            reverse ? "lg:flex-row-reverse" : ""
          }`}
        >
          <div className={`w-full ${reverse ? "order-2" : "order-1"} animate-fade-in-left`}>
            <Image
              src={imageSrc}
              alt={imageAlt}
              height={0}
              width={0}
              sizes="full"
              className="w-full h-64 md:h-80 lg:h-96 object-cover rounded-lg"
            />
          </div>
          <div className={`max-w-full ${reverse ? "order-1" : "order-2"} animate-fade-in-up`}>
            <h2 className="heading-secondary">{title}</h2>
            <p className="text-x18 mb-6 lg:mb-8">{description}</p>
            <Button size={"lg"} className="font-semibold">{buttonText}</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdvantageItem;
