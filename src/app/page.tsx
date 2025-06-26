"use client";
import { usePathname } from "next/navigation";
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
import NotFound from "@/components/NotFound";

interface SolutionItem {
  title: string;
  description: string;
}

interface ApiResponse {
  message: string;
  data: SolutionItem[];
}

export default function Home() {
  const pathname = usePathname(); // Di chuyển lên đầu component
  const [data, setData] = useState<SolutionItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Kiểm tra pathname trước các điều kiện khác
  if (pathname !== "/") {
    return <NotFound />;
  }

  if (loading) return <div className="text-center py-4">Loading...</div>;

  if (error === "no-internet") return <NoInterNet />;
  if (error) return <ErrorComponent />;

  if (!data)
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
