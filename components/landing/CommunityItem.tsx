import React from "react";

interface CommunityItemProps {
  title: string;
  description: string;
}

const CommunityItem: React.FC<CommunityItemProps> = ({
  title,
  description,
}) => {
  return (
    <div className="bg-green-50 p-4 lg:p-6 rounded-lg hover:bg-green-100 transition-colors duration-300">
      <h3 className="text-lg lg:text-xl font-kalpurush font-semibold text-green-700 mb-2">
        {title}
      </h3>
      <p className="font-bengali text-gray-600 text-sm lg:text-base">
        {description}
      </p>
    </div>
  );
};

export default CommunityItem;
