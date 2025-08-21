import { Icon } from "@/types";
import { Card, CardContent } from "../ui/card";
import React from "react";

interface CulturalCardProps {
  icon: Icon;
  title: string;
  description: string;
  variant?: "default" | "short";
  bg?: string;
}

const CulturalCard: React.FC<CulturalCardProps> = ({
  icon: Icon,
  title,
  description,
  variant = "default",
  bg,
}) => {
  if (variant === "short") {
    return (
      <div
        className={`bg-card ${bg} p-6 rounded-lg text-center hover:shadow-lg transition-shadow`}
      >
        <Icon className="size-[30px] mb-3 mx-auto text-primary" />
        <h4 className="text-lg font-kalpurush font-semibold text-foreground mb-2">
          {title}
        </h4>
        <p className="font-bengali text-muted-foreground text-sm">
          {description}
        </p>
      </div>
    );
  }

  return (
    <Card className="bg-card border-border hover:shadow-lg transition-shadow">
      <CardContent className="p-8 text-center">
        <Icon className="size-9 mb-4 mx-auto text-primary" />
        <h3 className="text-2xl font-kalpurush font-semibold text-foreground mb-4">
          {title}
        </h3>
        <p className="font-bengali text-muted-foreground leading-relaxed">
          {description}
        </p>
      </CardContent>
    </Card>
  );
};

export default CulturalCard;