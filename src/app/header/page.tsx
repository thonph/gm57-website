import React from 'react';
import Image from 'next/image';
import Style from './styles.module.css';
import "../globals.css";

function Header() {
  return (
    <header className={`${Style.header} bg-white shadow`}>
      <div className={`${Style.container} max-w-7xl mx-auto flex justify-between items-center py-4 px-4`}>
        {/* Logo bên trái */}
        <div className={`${Style.logo} w-24 h-10 bg-gray-100 flex items-center justify-center`}>
          <Image src="/images/logo.png" alt="Nội dung bên trái" width={100} height={100}  />
        </div>

        {/* Menu ở giữa */}
        <nav className={`${Style.nav_menu} hidden md:flex space-x-8 flex-1 justify-center`}>
          <a href="#" className="text-green-600 hover:text-green-600  border-b-3 border-green-600">
            Trang chủ
          </a>
          <a href="#" className="transition-colors relative text-black hover:text-green-600 mr-8 ">
            Giải pháp công nghệ
          </a>
          <a href="#" className="transition-colors relative text-black hover:text-green-600 mr-8 ">
            Tính năng nổi bật
          </a>
          <a href="#" className="transition-colors relative text-black hover:text-green-600 mr-8 ">
            Điểm mạnh
          </a>
          <a href="#" className="transition-colors relative text-black hover:text-green-600 mr-8 ">
            Cơ hội
          </a>
          <a href="#" className="transition-colors relative text-black hover:text-green-600 mr-8 ">
            Liên hệ
          </a>
        </nav>
      </div>
    </header>
  );
}

export default Header;
