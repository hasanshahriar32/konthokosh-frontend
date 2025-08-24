import React from "react";

type Props = {
  title: string;
  subtitle: string;
};

const FeedHeading: React.FC<Props> = ({ title, subtitle }) => {
  return (
    <header className="w-full text-center">
      <h1 className="heading-primary tracking-tight text-primary drop-shadow-lg mb-4 md:mb-6">
        {title}
      </h1>
      <p className="text-subtitle">{subtitle}</p>
    </header>
  );
};

export default FeedHeading;
