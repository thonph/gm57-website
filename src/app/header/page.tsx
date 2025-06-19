'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Style from './styles.module.css';
import "../globals.css";
import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const sections = [
  { id: "home", label: "Trang chủ" },
  { id: "solutions", label: "Giải pháp công nghệ" },
  { id: "features", label: "Tính năng nổi bật" },
  { id: "strengths", label: "Điểm mạnh" },
  { id: "opportunities", label: "Cơ hội" },
  { id: "contact", label: "Liên hệ" },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Header() {
  const [active, setActive] = useState("home");

  // Scroll spy effect
  useEffect(() => {
    const handleScroll = () => {
      let current = "home";
      for (const sec of sections) {
        const el = document.getElementById(sec.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 80) current = sec.id;
        }
      }
      setActive(current);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll handler
  const handleMenuClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({
        top: el.offsetTop - 72, 
        behavior: "smooth",
      });
    }
  };

  return (
    <Disclosure as="nav" className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      {({ open }) => (
        <>
          <div className={`${Style.container}`}>
            <div className={`${Style.menu} max-w-7xl mx-auto flex justify-between items-center py-4 px-4`}>
              {/* Logo bên trái */}
              <div className="w-24 h-10 bg-gray-100 flex items-center justify-center">
                <Image src="/images/logo.png" alt="Logo" width={100} height={100} className="rounded mr-2" />
              </div>
              {/* Menu desktop */}
              <nav className="hidden md:flex flex-1 justify-center space-x-8">
                {sections.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={e => handleMenuClick(e, item.id)}
                    className={classNames(
                      Style.nav_menu,
                      active === item.id
                        ? 'text-green-600 font-semibold border-b-2 border-green-600'
                        : 'text-black',
                      'px-2 py-1 text-lg hover:text-green-600 transition-colors'
                    )}
                  >
                    {item.label}
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
            <nav className={`${Style.container} ${Style.mobile} flex flex-col space-y-6 border-t border-gray-200 py-4`}>
              {sections.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={e => handleMenuClick(e, item.id)}
                  className={classNames(
                    active === item.id
                      ? 'text-green-600 py-4 font-bold text-lg border-b-2 border-green-600'
                      : 'text-black text-lg',
                    "hover:text-green-600 transition-colors"
                  )}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}