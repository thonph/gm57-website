'use client';

import React from 'react';
import Image from 'next/image';
import Style from './styles.module.css';
import "../globals.css";
import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Trang chủ', href: '#', current: true },
  { name: 'Giải pháp công nghệ', href: '#', current: false },
  { name: 'Tính năng nổi bật', href: '#', current: false },
  { name: 'Điểm mạnh', href: '#', current: false },
  { name: 'Cơ hội', href: '#', current: false },
  { name: 'Liên hệ', href: '#', current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Header() {
  return (
    <Disclosure as="nav" className={`fixed top-0 left-0 w-full bg-white shadow-md z-50`}>
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
              {navigation.map((item, idx) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={classNames( `${Style.nav_menu}`,
                    idx === 0
                      ? 'text-green-600 font-semibold border-b-2 border-green-600'
                      : 'text-black ',
                    'px-2 py-1 text-lg hover:text-green-600 transition-colors'
                  )}
                  style={idx === 0 ? { textUnderlineOffset: 4 } : {}}
                >
                  {item.name}
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
          
          {/* Mobile menu panel - chỉ chứa menu, không lặp lại logo và nút X */}
          <Disclosure.Panel className="md:hidden bg-white px-4 pb-4 pt-2">
            <nav className={`${Style.container} ${Style.mobile}  flex flex-col space-y-6 border-t border-gray-200 py-4`}>
              {navigation.map((item, idx) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    idx === 0
                      ? 'text-green-600 py-4 font-bold text-lg'
                      : 'text-black text-lg',
                    "hover:text-green-600 transition-colors"
                  )}
                >
                  {item.name}
                </a>
              ))}
            </nav>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}