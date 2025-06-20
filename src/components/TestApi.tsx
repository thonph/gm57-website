// "use client";
// import React from "react";
// import { useEffect } from "react";
// import { httpGet } from "../../utils/http";

// interface Category {
//   id: string;
//   title: string;
// }

// interface ApiResponse {
//   message: string;
//   data: {
//     categories: Category[];
//   };
// }

// const TestApi = () => {
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Gọi API và chỉ định kiểu trả về là ApiResponse
//         const response = await httpGet<ApiResponse>("all-posts-it");

//         // Lấy dữ liệu categories từ response
//         const categories = response.data;
//         console.log("Categories data:", categories);
//       } catch (error) {
//         console.error("Fetch error:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div>
//       <h2>Đã gọi API và log ra console</h2>
//       <p>Mở Developer Tools (F12) để xem kết quả trong tab Console</p>
//     </div>
//   );
// };

// export default TestApi;
