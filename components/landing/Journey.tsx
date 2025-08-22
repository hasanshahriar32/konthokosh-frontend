import { journey } from "@/constants/landing";
import Image from "next/image";
import { Button } from "../ui/button";

const Journey = () => {
  return (
    <section className="py-20 overflow-hidden bg-background">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="w-full animate-fade-in-left">
            <Image
              src={journey.imageSrc}
              alt={journey.imageAlt}
              height={0}
              width={0}
              sizes="full"
              className="w-full h-64 md:h-80 lg:h-96 object-cover rounded-lg"
            />
          </div>
          <div className="max-w-full animate-fade-in-up">
            <h2 className="heading-primary">{journey.title}</h2>
            <p className="text-x18 mb-6 lg:mb-8">{journey.description}</p>
            <Button size={"lg"}>{journey.button}</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Journey;
