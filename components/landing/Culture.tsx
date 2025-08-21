import { culture } from "@/constants/landing";
import { Icon } from "@/types";
import { Card, CardContent } from "../ui/card";

const CulturalItem: React.FC<{
  icon: Icon;
  title: string;
  description: string;
}> = ({ icon: Icon, title, description }) => {
  return (
    <Card className="bg-gradient-to-br from-red-50 to-orange-50 border-red-200 hover:shadow-lg transition-shadow">
      <CardContent className="p-8 text-center">
        <Icon className="size-9 mb-4 mx-auto" />
        <h3 className="text-2xl font-kalpurush font-semibold text-red-700 mb-4">
          {title}
        </h3>
        <p className="font-bengali text-gray-700 leading-relaxed">
          {description}
        </p>
      </CardContent>
    </Card>
  );
};

const CulturalItemShort: React.FC<{
  icon: Icon;
  title: string;
  description: string;
  bg: string;
}> = ({ icon: Icon, title, description, bg }) => {
  return (
    <div
      className={`bg-gradient-to-br ${bg} p-6 rounded-lg text-center hover:shadow-lg transition-shadow`}
    >
      <Icon className="size-[30px] mb-3 mx-auto" />
      <h4 className="text-lg font-kalpurush font-semibold text-green-700 mb-2">
        {title}
      </h4>
      <p className="font-bengali text-gray-600 text-sm">{description}</p>
    </div>
  );
};

const Culture: React.FC = () => {
  return (
    <section className="py-20 bg-white/80 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-kalpurush font-bold text-center text-red-800 mb-8">
          {culture.title}
        </h2>
        <p className="text-xl font-bengali text-center text-gray-700 mb-16 max-w-4xl mx-auto leading-relaxed">
          {culture.description}
        </p>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {culture.categories.map((category, index) => (
            <CulturalItem
              key={index}
              icon={category.icon}
              title={category.title}
              description={category.description}
            />
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {culture.shortCategories.map((category, index) => (
            <CulturalItemShort
              key={index}
              icon={category.icon}
              title={category.title}
              bg={category.bg}
              description={category.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Culture;
