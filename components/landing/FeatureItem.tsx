import { Icon } from "@/types";
import React from "react";

const FeatureItem: React.FC<{
  icon: Icon;
  title: string;
  description: string;
}> = ({ icon: Icon, title, description }) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm p-4 lg:p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <Icon className="size-6 lg:size-[30px] mb-3 lg:mb-4 mx-auto" />
      <h3 className="text-lg lg:text-xl font-kalpurush font-semibold text-red-700 mb-2">
        {title}
      </h3>
      <p className="font-bengali text-gray-600 text-sm lg:text-base">
        {description}
      </p>
    </div>
  );
};

export default FeatureItem;
