"use client";
import React, { useEffect, useState } from "react";
import Header from "./header/page";
import SolutionSection from "./solutions_section/page";
import FeaturesSection from "./features_seciton/page";
import StrengthsSection from "./strengths_section/page";
import OpportunitiesSection from "./opportunities_seciton/page";
import Contact from "./contact/page";
import HomeSection from "./home_section/page";
import Footer from "./footer/page";
import { httpGet } from "../../utils/http";
import ErrorComponent from "@/components/ErrorComponent";
import NoInterNet from "@/components/NoInterNet";
import Loading from "@/ui/loading/Loading";

interface SolutionItem {
  title: string;
  description: string;
}

interface ApiResponse {
  message: string;
  data: SolutionItem[];
}

export default function Home() {
  const [data, setData] = useState<SolutionItem | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [fetching, setFetching] = useState(true);
  const [showLoading, setShowLoading] = useState(true); // hiển thị <Loading /> toàn trang

  // Delay 4s để ẩn loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Fetch dữ liệu (song song với loading)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await httpGet<ApiResponse>("solutions_section");

        if (response.data && response.data.length > 0) {
          setData(response.data[0]);
        } else {
          setError("no-data");
        }
      } catch (err) {
        if (!navigator.onLine) {
          setError("no-internet");
        } else {
          setError("fetch-failed");
        }
        console.error("Fetch error:", err);
      } finally {
        setFetching(false);
      }
    };

    fetchData();
  }, []);

  // ✅ Nếu vẫn đang loading 4s → chỉ hiển thị <Loading />
  if (showLoading) {
    return <Loading />;
  }

  // ✅ Sau 4s, xử lý lỗi/fetch/data như bình thường
  if (error === "no-internet") return <NoInterNet />;
  if (error) return <ErrorComponent />;
  if (!data && !fetching)
    return <div className="text-center py-4">No content available</div>;

  return (
    <>
      <Header />
      <HomeSection />
      <SolutionSection />
      <FeaturesSection />
      <StrengthsSection />
      <OpportunitiesSection />
      <Contact />
      <Footer />
    </>
  );
}
