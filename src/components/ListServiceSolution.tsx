"use client";
import { useEffect, useState } from "react";
import { httpGet } from "../../utils/http";
import ItemServiceSolution from "./ItemServiceSolution";
import defaultImage from "../../public/placeholder.svg"; // Import ảnh mặc định
import { getImageUrl } from "../../utils/image";

interface ServiceItem {
  id: string;
  title: string;
  features: string[];
  image?: string;
}

interface ApiResponse {
  data: ServiceItem[];
}

function ListServiceSolution() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await httpGet<ApiResponse>(
          "solution_items?filter[category][_eq]=1e4e2b4f-2d51-4965-851b-478e96b04cbb"
        );

        if (response.data) {
          setServices(response.data);
        } else {
          setError("No services found");
        }
      } catch (err) {
        setError("Failed to fetch services");
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error)
    return <div className="text-center text-red-500 py-8">{error}</div>;

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map((service) => {
        // Tạo URL ảnh cho mỗi service
        const imageUrl = service.image
          ? getImageUrl(service.image, {
              width: 402,
              height: 402,
              quality: 90,
              fit: "cover",
              format: "webp",
            })
          : defaultImage.src; // Sử dụng ảnh mặc định nếu không có image

        return (
          <ItemServiceSolution
            key={service.id}
            title={service.title}
            features={service.features}
            imageUrl={imageUrl} // Truyền URL đã xử lý
          />
        );
      })}
    </div>
  );
}

export default ListServiceSolution;
