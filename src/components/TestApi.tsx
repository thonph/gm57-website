"use client";
import React, { useState } from "react";
import { useEffect } from "react";
import { httpGet } from "../../utils/http";

interface SolutionItem {
  title: string;
  description: string;
}

interface ApiResponse {
  message: string;
  data: SolutionItem[]; // Giả sử API trả về mảng trực tiếp
}

const TestApi = () => {
  const [data, setData] = useState<SolutionItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await httpGet<ApiResponse>("solutions_section");

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

  return (
    <div>
      <h2>Đã gọi API và log ra console</h2>
      <p>Mở Developer Tools (F12) để xem kết quả trong tab Console</p>
    </div>
  );
};

export default TestApi;
