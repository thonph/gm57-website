"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Style from "./styles.module.css";
import "../globals.css";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { httpGet } from "../../../utils/http";

// const sections = [
//   { id: "home", label: "Trang chủ" },
//   { id: "solutions", label: "Giải pháp công nghệ" },
//   { id: "features", label: "Tính năng nổi bật" },
//   { id: "strengths", label: "Điểm mạnh" },
//   { id: "opportunities", label: "Cơ hội" },
//   { id: "contact", label: "Liên hệ" },
// ];

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

        console.log("tesst header: ", response);

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

  // Scroll spy effect
  useEffect(() => {
    if (!headerData) return;

    const handleScroll = () => {
      let current = "home";
      for (const item of headerData.items) {
        const el = document.getElementById(item.id_menu);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 80) current = item.id_menu;
        }
      }
      setActive(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [headerData]);

  // Smooth scroll handler
  const handleMenuClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({
        top: el.offsetTop - 72,
        behavior: "smooth",
      });
    }
  };

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
              className={`${Style.menu} max-w-7xl mx-auto flex justify-between items-center py-4 px-4`}
            >
              {/* Logo */}
              <div className="w-24 h-10 bg-gray-100 flex items-center justify-center">
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
              <nav className="hidden md:flex flex-1 justify-center space-x-8">
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
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-200 focus:outline-none">
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
