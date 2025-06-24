"use client";
import { useEffect, useState } from "react";
import { httpGet } from "../../utils/http";

import { Globe, Shield, BarChart, LucideIcon } from "lucide-react";
import { getImageUrl } from "../../utils/image";

interface SolutionItem {
  id: string;
  title: string;
  icon: string;
  description: string;
  features: string[];
  image: string;
}

const iconComponents: Record<string, LucideIcon> = {
  globe: Globe,
  shield: Shield,
  "bar-chart": BarChart,
  // Thêm các icon khác nếu cần
};

export default function CardSolution() {
  const [data, setData] = useState<SolutionItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await httpGet<{ data: SolutionItem }>(
          "/solution_categories/c8ee4e71-243b-48f7-9daa-ea33e4b725a1"
        );

        if (response.data) {
          // console.log("Fix ảnh:", response.data);
          setData(response.data);
        } else {
          setError("No data available");
        }
      } catch (error) {
        setError("Failed to fetch data");
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error)
    return <div className="text-center text-red-500 py-8">{error}</div>;
  if (!data) return <div className="text-center py-8">No data available</div>;

  const IconComponent = iconComponents[data.icon] || Globe;
  // const imageUrl = `http://10.208.50.7:8058/assets/${data.image}`;
  const imageUrl = getImageUrl(data.image, {
    width: 500,
    height: 500,
    quality: 90,
    fit: "cover",
    format: "webp",
  });

  return (
    <div className="grid lg:grid-cols-2 gap-8 items-center">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <IconComponent className="h-8 w-8 text-green-600" />
          <h3 className="text-2xl font-bold text-black">{data.title}</h3>
        </div>
        <p className="text-gray-600">{data.description}</p>

        <ul className="space-y-2">
          {data.features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-gray-600">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        {/* Sửa lại để hiển thị ảnh từ Directus khi có URL ảnh */}
        <img
          src={imageUrl}
          alt={data.title}
          className="rounded-lg shadow-lg object-cover"
          style={{ width: "500px", height: "500px" }}
        />
      </div>
    </div>
  );
}
