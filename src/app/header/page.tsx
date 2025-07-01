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
        top: el.offsetTop - 18, // 72 là chiều cao header
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    if (!headerData) return;

    const handleScroll = () => {
      const viewportHeight = window.innerHeight;
      const triggerPoint = viewportHeight * 0.5; // 50% chiều cao viewport
      const documentHeight = document.documentElement.scrollHeight;
      const scrollPosition = window.scrollY + viewportHeight;

      // Kiểm tra xem đã scroll đến gần cuối trang chưa (cách footer 100px)
      const isNearFooter = scrollPosition > documentHeight - 100;

      if (isNearFooter) {
        setActive(""); // Nếu gần footer, không active phần tử nào
        return;
      }

      let current = "home"; // Nếu không có phần tử nào được kích hoạt, mặc định là home

      // Duyệt qua từng item trong headerData
      for (const item of headerData.items) {
        const el = document.getElementById(item.id_menu);
        if (el) {
          const rect = el.getBoundingClientRect();

          // Kiểm tra phần tử nào đang nằm gần 50% viewport
          if (rect.top <= triggerPoint && rect.bottom >= triggerPoint) {
            current = item.id_menu; // Nếu phần tử này nằm trong viewport, chọn nó
            break;
          }
        }
      }

      setActive(current); // Cập nhật active
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [headerData]);

  if (loading) return <div className="h-16 bg-white"></div>;
  if (error || !headerData)
    return (
      <div className="h-16 bg-white text-red-500 p-4">Error loading header</div>
    );

  return (
    <Disclosure
      as="nav"
      className="fixed lg:pl-2 lg:pr-2 top-0 left-0 w-full bg-white shadow-md z-50"
    >
      {({ open }) => (
        <>
          <div className={`mx-1.5`}>
            <div
              className={`${Style.menu}  container mx-auto flex items-center justify-between py-4 px-4`}
            >
              {/* Logo */}
              <div className="w-24 h-10flex items-center justify-end pl-4 pr-4 md:pl-0 md:ml-0">
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
              <nav className="hidden lg:flex justify-end gap-2 space-x-5">
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
                      " px-2 py-1 text-lg hover:text-green-600 transition-colors"
                    )}
                  >
                    {item.heading_menu}
                  </a>
                ))}
              </nav>

              {/* Mobile menu button */}
              <div className="lg:hidden">
                <Disclosure.Button
                  style={{ cursor: "pointer" }}
                  className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-200 focus:outline-none"
                >
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
          <Disclosure.Panel className="lg:hidden bg-white px-4 pb-4 pt-2">
            <nav
              className={`${Style.container} ${Style.mobile} flex flex-col space-y-6 border-t justify-end border-gray-200 py-4`}
            >
              {headerData.items.map((item) => (
                <a
                  key={item.id_menu}
                  href={`#${item.id_menu}`}
                  onClick={(e) => handleMenuClick(e, item.id_menu)}
                  className={classNames(
                    active === item.id_menu
                      ? "text-green-600 font-bold text-lg border-b-2 border-green-600"
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
