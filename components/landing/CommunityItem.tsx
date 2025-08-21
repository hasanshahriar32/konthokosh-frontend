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
    <div className="bg-card p-4 lg:p-6 rounded-lg hover:bg-muted transition-colors duration-300">
      <h3 className="text-lg lg:text-xl font-kalpurush font-semibold text-primary mb-2">
        {title}
      </h3>
      <p className="font-bengali text-muted-foreground text-sm lg:text-base">
        {description}
      </p>
    </div>
  );
};

export default CommunityItem;