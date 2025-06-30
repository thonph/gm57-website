"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Style from "./styles.module.css";
import "../globals.css";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { httpGet } from "../../../utils/http";

interface MenuItem {
  id_menu: string;
  heading_menu: string;
}

interface HeaderData {
  id: number;
  logo: string;
  items: MenuItem[];
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  const [active, setActive] = useState("home");
  const [headerData, setHeaderData] = useState<HeaderData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch header data from API
  useEffect(() => {
    const fetchHeaderData = async () => {
      try {
        const response = await httpGet<{ data: HeaderData[] }>(
          "heading_section?fields=id,logo,items.id_menu,items.heading_menu"
        );

        if (response.data && response.data.length > 0) {
          setHeaderData(response.data[0]);
        } else {
          setError("No header data found");
        }
      } catch (err) {
        setError("Failed to fetch header data");
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHeaderData();
  }, []);

  // Smooth scroll handler
  const handleMenuClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({
        top: el.offsetTop - 16, // 72 là chiều cao header
        behavior: "smooth",
      });
    }
  };

  // Hàm debounce
  function debounce(func: Function, wait: number) {
    let timeout: NodeJS.Timeout;
    return function executedFunction(...args: any[]) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // useEffect(() => {
  //   if (!headerData) return;

  //   const handleScroll = () => {
  //     const sections = headerData.items
  //       .map((item) => ({
  //         id: item.id_menu,
  //         element: document.getElementById(item.id_menu),
  //       }))
  //       .filter((section) => section.element !== null);

  //     let current = "";
  //     const offsetBottom = 64;

  //     for (const section of sections) {
  //       const element = section.element;
  //       if (!element) continue;

  //       const rect = element.getBoundingClientRect();
  //       const elementTop = rect.top;
  //       const elementBottom = rect.bottom;
  //       const viewportHeight = window.innerHeight;

  //       // Điều kiện mới: phần tử phải nằm trong khoảng từ 1/3 màn hình đến cách bottom 64px
  //       if (elementTop <= viewportHeight / 3 && elementBottom >= offsetBottom) {
  //         current = section.id;
  //         break;
  //       }
  //     }

  //     // Nếu không có section nào active, kiểm tra xem có đang ở đầu trang không
  //     if (!current && window.scrollY < 100) {
  //       current = "home"; // Hoặc section đầu tiên nếu bạn muốn
  //     }

  //     setActive(current);
  //   };

  //   // Thêm debounce để tối ưu hiệu suất
  //   const debouncedScroll = debounce(handleScroll, 100);
  //   window.addEventListener("scroll", debouncedScroll);

  //   // Gọi ngay lần đầu để xác định trạng thái ban đầu
  //   handleScroll();

  //   return () => window.removeEventListener("scroll", debouncedScroll);
  // }, [headerData]);

  useEffect(() => {
    if (!headerData) return;

    const handleScroll = () => {
      const sections = headerData.items
        .map((item) => ({
          id: item.id_menu,
          element: document.getElementById(item.id_menu),
        }))
        .filter((section) => section.element !== null);

      let current = "";
      const viewportHeight = window.innerHeight;

      for (const section of sections) {
        const element = section.element;
        if (!element) continue;

        const rect = element.getBoundingClientRect();
        const elementMiddle = rect.top + rect.height / 2 + 64; // Vị trí giữa section

        // Active khi vị trí giữa section nằm trong khoảng 30%-70% viewport
        if (
          elementMiddle >= viewportHeight * 0.5 &&
          elementMiddle <= viewportHeight * 0.5
        ) {
          current = section.id;
          break;
        }
      }

      // Nếu không có section nào active, kiểm tra xem có đang ở đầu trang không
      if (!current && window.scrollY < 100) {
        current = "home";
      }

      setActive(current);
    };

    const debouncedScroll = debounce(handleScroll, 10);
    window.addEventListener("scroll", debouncedScroll);
    handleScroll(); // Gọi ngay lần đầu

    return () => window.removeEventListener("scroll", debouncedScroll);
  }, [headerData]);

  if (loading) return <div className="h-16 bg-white"></div>;
  if (error || !headerData)
    return (
      <div className="h-16 bg-white text-red-500 p-4">Error loading header</div>
    );

  return (
    <Disclosure
      as="nav"
      className="fixed top-0 left-0 w-full bg-white shadow-md z-50"
    >
      {({ open }) => (
        <>
          <div className={`${Style.container}`}>
            <div
              className={`${Style.menu} container mx-auto flex justify-between items-center py-4 px-4`}
            >
              {/* Logo */}
              <div className="w-24 h-10flex items-center justify-center pl-4 pr-4 md:pl-0  md:ml-0">
                {headerData.logo && (
                  <img
                    src={`http://10.208.50.7:8058/assets/${headerData.logo}`}
                    alt="Logo"
                    width={100}
                    height={100}
                    className="rounded mr-2"
                  />
                )}
              </div>

              {/* Menu desktop */}
              <nav className="hidden md:flex flex-1 justify-end space-x-8">
                {headerData.items.map((item) => (
                  <a
                    key={item.id_menu}
                    href={`#${item.id_menu}`}
                    onClick={(e) => handleMenuClick(e, item.id_menu)}
                    className={classNames(
                      Style.nav_menu,
                      active === item.id_menu
                        ? "text-green-600 font-semibold border-b-2 border-green-600"
                        : "text-black",
                      "px-2 py-1 text-lg hover:text-green-600 transition-colors"
                    )}
                  >
                    {item.heading_menu}
                  </a>
                ))}
              </nav>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 pr-4 text-gray-700 hover:bg-gray-200 focus:outline-none">
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          {/* Mobile menu panel */}
          <Disclosure.Panel className="md:hidden bg-white px-4 pb-4 pt-2">
            <nav
              className={`${Style.container} ${Style.mobile} flex flex-col space-y-6 border-t border-gray-200 py-4`}
            >
              {headerData.items.map((item) => (
                <a
                  key={item.id_menu}
                  href={`#${item.id_menu}`}
                  onClick={(e) => handleMenuClick(e, item.id_menu)}
                  className={classNames(
                    active === item.id_menu
                      ? "text-green-600 py-4 font-bold text-lg border-b-2 border-green-600"
                      : "text-black text-lg",
                    "hover:text-green-600 transition-colors"
                  )}
                >
                  {item.heading_menu}
                </a>
              ))}
            </nav>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
