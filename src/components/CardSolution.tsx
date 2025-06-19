import Image from "next/image";
import img from "../../public/placeholder.svg";
import { LucideIcon } from "lucide-react";
import { Globe, Shield, BarChart } from "lucide-react";

interface CardSolutionProps {
  icon: string;
  title: string;
  description: string;
  features: string[];
}

const iconComponents: Record<string, LucideIcon> = {
  globe: Globe,
  shield: Shield,
  "bar-chart": BarChart,
};

function CardSolution({
  icon,
  title,
  description,
  features,
}: CardSolutionProps) {
  const IconComponent = iconComponents[icon] || Globe;
  return (
    <div className="grid lg:grid-cols-2 gap-8 items-center">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <IconComponent className="h-8 w-8 text-green-600" />
          <h3 className="text-2xl font-bold text-black">{title}</h3>
        </div>
        <p className="text-gray-600">{description}</p>

        <ul className="space-y-2 ">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-gray-600">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <Image
          src={img}
          alt="Professional website illustration"
          style={{ width: "500px", height: "500px" }}
          className="rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
}

export default CardSolution;
