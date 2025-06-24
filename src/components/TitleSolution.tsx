"use client";
import { useEffect, useState } from "react";
import { httpGet } from "../../utils/http";

interface SolutionItem {
  title: string;
  description: string;
}

interface ApiResponse {
  message: string;
  data: SolutionItem[]; // Giả sử API trả về mảng trực tiếp
}

export default function TitleSolution() {
  const [data, setData] = useState<SolutionItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await httpGet<ApiResponse>("solutions_section");
        console.log("API Response:", response);

        // Kiểm tra và lấy dữ liệu đầu tiên
        if (response.data && response.data.length > 0) {
          setData(response.data[0]);
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

  if (loading) return <div className="text-center py-4">Loading...</div>;
  if (error)
    return <div className="text-center text-red-500 py-4">{error}</div>;
  if (!data)
    return <div className="text-center py-4">No content available</div>;

  return (
    <div className="text-center mb-12">
      <h2 className="text-3xl text-black mb-4 font-bold md:text-4xl">
        {data.title}
      </h2>
      <p className="text-lg text-gray-600">{data.description}</p>
    </div>
  );
}
