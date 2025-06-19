import Image from "next/image";
import img from "../../public/placeholder.svg";

interface ItemServiceSolutionProps {
  imageUrl?: string;
  imageAlt?: string;
  title: string;
  features: string[];
  imageWidth?: number;
  imageHeight?: number;
}

function ItemServiceSolution({
  imageUrl = img,
  imageAlt = "Service illustration",
  title,
  features,
  imageWidth = 402,
  imageHeight = 402,
}: ItemServiceSolutionProps) {
  return (
    <div className="bg-white p-6 rounded-lg border border-green-300 shadow-lg">
      <div className="mb-4">
        <Image
          src={imageUrl}
          alt={imageAlt}
          width={imageWidth}
          height={imageHeight}
          className="rounded-lg shadow-lg object-cover"
        />
      </div>
      <h4 className="text-lg font-bold text-black mb-3">{title}</h4>
      <ul className="space-y-2 text-sm text-black">
        {features.map((feature, index) => (
          <li key={index}>• {feature}</li>
        ))}
      </ul>
    </div>
  );
}

export default ItemServiceSolution;
