"use client";
import TitleSolution from "@/components/TitleSolution";
import { useState, useEffect } from "react";
import Image from "next/image";
import img from "../../../public/placeholder.svg";

function FeaturesSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Dữ liệu slider
  const slides = [
    {
      id: 1,
      image: img,
      title: "Tính năng 1",
      description:
        "Hệ thống tích hợp AI giúp tự động hóa quy trình check-in, quản lý phòng và dịch vụ khách hàng.",
    },
    {
      id: 2,
      image: img,
      title: "Tính năng 2",
      description:
        "Công nghệ quản lý phòng thông minh với cảm biến IoT và điều khiển từ xa.",
    },
    {
      id: 3,
      image: img,
      title: "Tính năng 3",
      description:
        "Hệ thống báo cáo thời gian thực giúp theo dõi hiệu suất kinh doanh mọi lúc.",
    },
  ];

  // Tự động chuyển slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  // Chuyển đến slide cụ thể
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Chuyển slide tiếp theo
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  // Chuyển slide trước đó
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <section id="features" className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto">
        <TitleSolution
          title="Tính năng nổi bật"
          description="Khám phá những tính năng vượt trội của HCM57 Solution"
        />

        {/* Slider Container */}
        <div className="relative w-full h-96 overflow-hidden rounded-lg bg-white shadow-lg mt-8">
          {/* Slides */}
          <div
            className="flex transition-transform duration-500 ease-in-out h-full"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {slides.map((slide) => (
              <div key={slide.id} className="w-full flex-shrink-0 relative">
                <div></div>
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-cover"
                  placeholder="blur"
                  style={{
                    position: "absolute",
                    height: "100%",
                    width: "100%",
                    inset: "0px",
                    color: "transparent",
                  }}
                  blurDataURL={img.src}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-opacity-40"></div>
                <div className="absolute inset-0 flex items-center justify-center bg-black opacity-40">
                  <div className="text-center text-white p-6">
                    <h3 className="text-2xl font-bold mb-4">{slide.title}</h3>
                    <p className="text-lg">{slide.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="border-none inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input hover:text-accent-foreground h-10 w-10 absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
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
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input hover:text-accent-foreground h-10 w-10 absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white border-none"
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
                  currentSlide === index
                    ? "bg-white w-3 h-3"
                    : "bg-[#c6c6c6] w-3 h-3"
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
