import Image from "next/image";
import { Button } from "../ui/button";

type FeatureSectionProps = {
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
  buttonText?: string;
  reverse?: boolean;
  colorScheme: {
    gradient: string;
    title: string;
    button: string;
    buttonHover: string;
  };
};

const FeatureSection: React.FC<FeatureSectionProps> = ({
  imageSrc,
  imageAlt,
  title,
  description,
  buttonText,
  reverse = false,
  colorScheme,
}) => {
  return (
    <section className={`py-20 overflow-hidden ${colorScheme.gradient}`}>
      <div className="container mx-auto px-4 max-w-7xl">
        <div
          className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
            reverse ? "lg:grid-flow-col-dense" : ""
          }`}
        >
          {!reverse && (
            <div className="w-full animate-fade-in-right">
              <Image
                src={imageSrc}
                alt={imageAlt}
                width={800}
                height={400}
                className="w-full h-64 md:h-80 lg:h-96 object-cover rounded-lg"
                priority
              />
            </div>
          )}
          <div className="max-w-full animate-fade-in-up">
            <h2 className={`heading-secondary ${colorScheme.title}`}>{title}</h2>
            <p className="text-x18 mb-6 lg:mb-8">{description}</p>
            {buttonText && (
              <Button
                className={`${colorScheme.button} ${colorScheme.buttonHover} font-semibold`}
              >
                {buttonText}
              </Button>
            )}
          </div>
          {reverse && (
            <div className="w-full animate-fade-in-left">
              <Image
                src={imageSrc}
                alt={imageAlt}
                width={800}
                height={400}
                className="w-full h-64 md:h-80 lg:h-96 object-cover rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300"
                priority
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
