"use client";

import React, { useEffect, useState } from "react";
import Style from "./styles.module.css";
import "../globals.css";
import Image from "next/image";

// Định nghĩa lại kiểu dữ liệu cho item_contact
interface ContactItem {
  id: number;
  title: string;
  icon_contact: string;
  href: string;
}

interface FooterIcon {
  id: number;
  logo: string | { id: string }; // Có thể là string hoặc object (tùy API)
  url: string;
}
interface FooterItemChild {
  id: number;
  title: string;
  href: string;
}
interface FooterItem {
  id: number;
  title: string;
  items: FooterItemChild[];
  item_contact: ContactItem[];
}
interface FooterData {
  id: number;
  description: string;
  copyright?: string;
  logo?: { id: string };
  icons: FooterIcon[];
  items: FooterItem[];
}

function Footer() {
  const [footer, setFooter] = useState<FooterData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFooter = async () => {
      try {
        const res = await fetch(
          "http://10.208.50.7:8058/items/footer_section?fields=id,description,copyright,logo.id,icons.id,icons.url,icons.logo.id,items.id,items.title,items.items.id,items.items.title,items.items.href,items.item_contact.id,items.item_contact.title,items.item_contact.icon_contact,items.item_contact.href"
        );
        const json = await res.json();
        if (json.data && json.data.length > 0) setFooter(json.data[0]);
      } finally {
        setLoading(false);
      }
    };
    fetchFooter();
  }, []);

  if (loading) return <div>Đang tải footer...</div>;
  if (!footer)
    return <div className="text-red-500">Không có dữ liệu footer</div>;

  return (
    <div className={`bg-green-600 text-white`}>
      <div className={`container mx-auto py-12 pl-4 md:pl-0`}>
        <div className="grid md:grid-cols-4 gap-8">
          {/* Item 1: Logo + mô tả + social */}
          <div>
            <div className={`${Style.box} flex items-center mb-4`}>
              {footer.logo?.id && (
                <img
                  src={`http://10.208.50.7:8058/assets/${footer.logo.id}`}
                  alt="Logo"
                  width={100}
                  height={100}
                  style={{ objectFit: "contain" }}
                />
              )}
            </div>
            <p className={`${Style.box} text-green-100 mb-4`}>
              {footer.description}
            </p>
            <div className="h-25 flex space-x-4">
              {footer.icons.map((icon) => (
                <a
                  key={icon.id}
                  href={icon.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-100 hover:text-white"
                >
                  <img
                    src={`http://10.208.50.7:8058/assets/${
                      typeof icon.logo === "string" ? icon.logo : icon.logo?.id
                    }`}
                    alt="icon"
                    width={28}
                    height={28}
                    className="rounded-full"
                  />
                </a>
              ))}
            </div>
          </div>
          {/* Item 2 & 3: Dịch vụ, Hỗ trợ */}
          {footer.items
            .filter((item) => item.items.length > 0)
            .map((item) => (
              <div className={Style.item} key={item.id}>
                <h4 className="text-lg font-semibold mb-4 text-white">
                  {item.title}
                </h4>
                <ul className="space-y-2">
                  {item.items.map((child) => (
                    <li key={child.id}>
                      <a
                        style={{ fontSize: "16px", fontWeight: "normal" }}
                        href={child.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {child.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          {/* Item 4: Liên hệ */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Liên hệ</h4>
            <ul className="space-y-2">
              {footer.items
                .find((item) => item.title === "Liên hệ")
                ?.item_contact.map((contact) => (
                  <li
                    key={contact.id}
                    className="flex items-center text-white text-lg"
                  >
                    {contact.icon_contact && (
                      <img
                        src={`http://10.208.50.7:8058/assets/${contact.icon_contact}`}
                        alt="icon"
                        width={22}
                        height={22}
                        className="mr-3"
                      />
                    )}
                    <a
                      style={{ fontSize: "16px", fontWeight: "normal" }}
                      href={contact.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {contact.title}
                    </a>
                  </li>
                ))}
            </ul>
          </div>
        </div>
        <div
          className={`${Style.copyright} border-t border-green-500 mt-8 pt-8 text-center text-green-100`}
        >
          {footer.copyright ||
            "© 2024 HCM57 Solution. Tất cả quyền được bảo lưu."}
        </div>
      </div>
    </div>
  );
}

export default Footer;
