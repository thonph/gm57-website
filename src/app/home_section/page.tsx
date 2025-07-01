"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Style from "./styles.module.css";
import { httpGet } from "../../../utils/http";
import "../globals.css";

interface HeroSection {
  id: number;
  title: string;
  solution: string;
  description: string;
  image: {
    id: string;
    filename_download: string;
  };
  buttons: {
    id: number;
    content: string;
  }[];
}

function HomeSection() {
  const [data, setData] = useState<HeroSection | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await httpGet<{ data: HeroSection[] }>(
          "/hero_section?fields=*.*"
        );

        console.log("Response Data Home: ", response);

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

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (error)
    return <div className="text-center text-red-500 py-20">{error}</div>;
  if (!data) return <div className="text-center py-20">No data available</div>;

  return (
    <section
      className={`${Style.main} relative py-20 px-4 bg-gradient-to-br from-green-50 to-white`}
      id="home"
    >
      <div className="max-w-[1400px] w-full mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Cột trái */}
          <div>
            <div className="inline-flex items-center rounded-full border text-xs font-semibold transition-colors focus:outline-none border-transparent bg-green-600 hover:bg-green-700 text-white mb-6 px-6 py-2">
              {data.solution}
            </div>
            <h1 className="text-4xl md:text-6xl font-semibold text-black mb-6 whitespace-nowrap">
              {data.title.split(" ")[0]}{" "}
              <span className="solution-heading-span text-green-600">
                {data.title.split(" ")[1]}
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">{data.description}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              {data.buttons.map((button) => (
                <button
                  key={button.id}
                  className={`inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium rounded border h-11 px-8 ${
                    button.id === 1
                      ? "border-transparent bg-green-600 text-white hover:bg-green-700"
                      : "border-black text-black hover:bg-black hover:text-white"
                  }`}
                >
                  {button.content}
                </button>
              ))}
            </div>
          </div>
          {/* Cột phải */}
          <div className="w-full flex justify-center">
            <img
              src={`http://10.208.50.7:8058/assets/${data.image.id}`}
              alt="HCM57 Solution Dashboard"
              width={600}
              height={500}
              className="rounded-lg shadow-xl w-full max-w-[500px] h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomeSection;
