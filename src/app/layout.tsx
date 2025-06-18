// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono, Readex_Pro } from "next/font/google";
import "./globals.css";
import Home from "./page";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HCM57-Tin tức",
  description: "Trang tin tức",
};

const readexPro = Readex_Pro({
  variable: "--font-readex-pro",
  subsets: ["latin"],
  weight: ["400", "700"], // có thể thêm weights bạn muốn
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${readexPro.variable} antialiased`}>
        <Home />
      </body>
    </html>
  );
}
