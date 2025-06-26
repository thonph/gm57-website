"use client";
import React from "react";
import { useEffect } from "react";

const TestApi = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Đang gọi API...");
        const response = await fetch(
          "http://10.208.50.7:8058/items/solution_items"
        );

        if (!response.ok) {
          throw new Error(`Lỗi HTTP! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Dữ liệu nhận được từ API:", data);

        // Lấy danh sách các title và log ra console
        const titles = data.data.map((item: any) => item.title);
        console.log("Danh sách các title:", titles);
      } catch (err) {
        console.error("Lỗi khi gọi API:", err);
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
