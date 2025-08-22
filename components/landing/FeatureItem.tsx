import { Icon } from "@/types";
import React from "react";

const FeatureItem: React.FC<{
  icon: Icon;
  title: string;
  description: string;
}> = ({ icon: Icon, title, description }) => {
  return (
    <div className="flex flex-col items-center justify-start">
      <div className="flex items-center justify-center p-4 bg-primary/10 rounded-full mb-3 lg:mb-4">
        <Icon className="size-5 lg:size-7 text-primary" />
      </div>
      <h3 className="text-lg lg:text-xl font-kalpurush font-semibold text-foreground mb-2">
        {title}
      </h3>
      <p className="text-x16 text-center text-muted-foreground">
        {description}
      </p>
    </div>
  );
};

export default FeatureItem;
