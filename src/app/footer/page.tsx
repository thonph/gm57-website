import React from "react";
import Style from "./styles.module.css";
import "../globals.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Image from "next/image";
function Footer() {
  return (
    <div className={`bg-green-600 text-white`}>
      <div className={`${Style.container} mx-auto px-4 py-12`}>
        <div className="grid md:grid-cols-4 gap-8">
          {/* Item 1 */}
          <div>
            <div className={`${Style.box} flex items-center mb-4`}>
              {/* Nội dung bên trái */}
              <Image
                src="/images/logo.png"
                alt="Nội dung bên trái"
                width={100}
                height={100}
              />
              {/* Nội dung bên phải */}
              <span></span>
            </div>
            <p className={`${Style.box} text-green-100 mb-4`}>
              Phần mềm quản lý đa ngành nghề hàng đầu Việt Nam. Tích hợp AI,
              mobile app và hệ thống CRM hoàn chỉnh.
            </p>
            <div className=" h-25 flex space-x-4">
              <a
                href="#"
                aria-label="Facebook"
                className="text-green-100 hover:text-white"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className={`${Style.icon} text-green-100 hover:text-white`}
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className={`${Style.icon} text-green-100 hover:text-white`}
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
          {/* Item 2 */}
          <div className={Style.item}>
            <h4 className="text-lg font-semibold mb-4 text-white">Dịch vụ</h4>
            <ul className="space-y-2">
              <li>Quản lý khách sạn</li>
              <li className={Style.item1}>Quản lý nhà hàng</li>
              <li className={Style.item1}>Quản lý SPA</li>
              <li className={Style.item1}>Quản lý phòng khám</li>
              <li className={Style.item1}>Tích hợp CRM</li>
            </ul>
          </div>
          {/* Item 3 */}
          <div className={Style.item}>
            <h4 className="text-lg font-semibold mb-4 text-white">Hỗ trợ</h4>
            <ul className="space-y-2">
              <li>Hướng dẫn sử dụng</li>
              <li className={Style.item1}>Video tutorial</li>
              <li className={Style.item1}>FAQ</li>
              <li className={Style.item1}>Liên hệ hỗ trợ</li>
              <li className={Style.item1}>Báo lỗi</li>
            </ul>
          </div>
          {/* Item 4 */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Liên hệ</h4>
            <ul className="space-y-2">
              <li className={`flex items-center text-white text-lg`}>
                <i className={`${Style.icon1} fas fa-phone-alt mr-3`}></i>
                +84 123 456 789
              </li>
              <li
                className={`${Style.item2} flex items-center text-white text-lg`}
              >
                <i className={`${Style.icon1} fas fa-envelope mr-3`}></i>
                info@hcm57solution.com
              </li>
              <li
                className={`${Style.item2} flex items-center text-white text-lg`}
              >
                <i className={`${Style.icon1} fas fa-map-marker-alt mr-3`}></i>
                TP. Hồ Chí Minh, Việt Nam
              </li>
            </ul>
          </div>
        </div>
        <div
          className={`${Style.copyright} border-t border-green-500 mt-8 pt-8 text-center text-green-100`}
        >
          © 2024 HCM57 Solution. Tất cả quyền được bảo lưu.
        </div>
      </div>
    </div>
  );
}

export default Footer;
