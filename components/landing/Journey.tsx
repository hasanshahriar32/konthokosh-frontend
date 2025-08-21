import { Button } from "../ui/button";
import { journey } from "@/constants/landing";

const Journey = () => {
  return (
    <section className="py-20 overflow-hidden bg-background">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="w-full animate-fade-in-left">
            <img
              src="/images/train-station.jpg"
              alt={journey.imageAlt}
              className="w-full h-64 md:h-80 lg:h-96 object-cover rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300"
            />
          </div>
          <div className="max-w-full animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-kalpurush font-bold text-primary mb-4 lg:mb-6">
              {journey.title}
            </h2>
            <p className="text-base lg:text-lg font-bengali text-foreground leading-relaxed mb-6 lg:mb-8">
              {journey.description}
            </p>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-bengali px-6 lg:px-8 py-2 lg:py-3 hover:scale-105 transition-transform duration-200">
              {journey.button}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Journey;