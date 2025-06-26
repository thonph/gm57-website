"use client";
import { useEffect, useState } from "react";
import { httpGet } from "../../utils/http";
import ItemServiceRent from "./ItemServiceRent";

interface ServiceItem {
  id: string;
  title: string;
  features: string[];
}

interface ApiResponse {
  data: ServiceItem[];
}

function ListServiceRent() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await httpGet<ApiResponse>(
          "solution_items?filter[category][_eq]=44e55562-55ab-4c76-9e0a-3d1191038ed6"
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
    <div className="grid md:grid-cols-3 gap-6">
      {services.map((service) => (
        <ItemServiceRent
          key={service.id}
          iconText={service.features[0]} // Lấy icon từ features[0]
          content={service.title}
        />
      ))}
    </div>
  );
}

export default ListServiceRent;
