"use client";
import { useState, useEffect } from "react";
import { httpGet } from "../../../utils/http";
import Image from "next/image";
import img from "../../../public/placeholder.svg";
import FeaturesTitle from "@/components/FeaturesTitle";
import { getImageUrl } from "../../../utils/image";

interface FeatureItem {
  id: string;
  title: string;
  description: string;
  image: string | null;
}

interface ApiResponse {
  data: FeatureItem[];
}

function FeaturesSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState<FeatureItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from API
  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        const response = await httpGet<ApiResponse>("features_item");
        if (response.data) {
          // console.log("Fetched features:", response.data);
          setSlides(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch features:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeatures();
  }, []);

  // Auto slide transition
  useEffect(() => {
    if (slides.length === 0) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  if (loading)
    return <div className="py-16 px-4 bg-gray-50 text-center">Loading...</div>;
  if (slides.length === 0)
    return (
      <div className="py-16 px-4 bg-gray-50 text-center">
        No features available
      </div>
    );

  return (
    <section id="features" className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto">
        <FeaturesTitle />

        {/* Slider Container */}
        <div className="relative w-full h-96 overflow-hidden rounded-lg bg-white shadow-lg mt-8">
          {/* Slides */}
          <div
            className="flex transition-transform duration-500 ease-in-out h-full"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {slides.map((slide) => {
              const imageUrl = getImageUrl(slide.image, {
                quality: 90,
                fit: "cover",
                format: "webp",
              });
              return (
                <div key={slide.id} className="w-full flex-shrink-0 relative">
                  <img
                    style={{
                      position: "absolute",
                      inset: 0,
                      color: "transparent",
                      width: "100%",
                      height: "100%",
                    }}
                    src={imageUrl}
                    alt={slide.title}
                    className="object-cover w-full h-full"
                  />
                  <div
                    style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
                    className="absolute inset-0 flex items-center justify-center bg-black"
                  >
                    <div className="text-center text-white p-6 max-w-2xl">
                      <h3 className="text-2xl font-bold mb-4">{slide.title}</h3>
                      <p className="text-lg">{slide.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white h-10 w-10 rounded-full flex items-center justify-center transition-all"
            aria-label="Previous slide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white h-10 w-10 rounded-full flex items-center justify-center transition-all"
            aria-label="Next slide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Pagination Dots */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  currentSlide === index ? "bg-white" : "bg-gray-400"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;
