import Image from "next/image";
import React from "react";

import { communityPower } from "@/constants/landing";
import FeatureItem from "./FeatureItem";

const CommunityPower: React.FC = () => {
  return (
    <section className="py-20 overflow-hidden bg-background">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="w-full animate-fade-in-right">
            <Image
              src={communityPower.imageSrc}
              alt={communityPower.imageAlt}
              width={800}
              height={400}
              className="w-full h-64 md:h-80 lg:h-96 object-cover rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300"
              priority
            />
          </div>
          <div className="max-w-full animate-fade-in-up">
            <h2 className="heading-secondary">{communityPower.title}</h2>
            <p className="text-x18 mb-6 lg:mb-8">
              {communityPower.description}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
              {communityPower.communityItem.map((item, index) => (
                <FeatureItem
                  key={index}
                  icon={item.icon}
                  title={item.title}
                  description={item.description}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunityPower;
