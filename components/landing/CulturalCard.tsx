import { Icon } from "@/types";
import { Card, CardContent } from "../ui/card";
import React from "react";

interface CulturalCardProps {
  icon: Icon;
  title: string;
  description: string;
  bg?: string;
}

const CulturalCard: React.FC<CulturalCardProps> = ({
  icon: Icon,
  title,
  description,
  bg,
}) => {
  return (
    <div className="flex flex-col gap-4 items-center p-8 text-center">
      <div className="flex items-center justify-center p-6 rounded-full bg-primary/15">
        <Icon className="size-9 text-primary" />
      </div>
      <h3 className="heading-tertiary">
        {title}
      </h3>
      <p className="text-x16 text-muted-foreground">
        {description}
      </p>
    </div>
  );
};

export default CulturalCard;
