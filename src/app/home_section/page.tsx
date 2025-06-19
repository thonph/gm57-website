import React from 'react';
import Image from 'next/image';
import Style from './styles.module.css';
import "../globals.css";
function HomeSection() {
  return (
    <section
      className={`${Style.main} relative py-20 px-4 bg-gradient-to-br from-green-50 to-white`}
    >
      <div className={`${Style.container} max-w-5xl mx-auto px-4`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
          {/* Cột 1 */}
          <div>
           <div className={`${Style.badge} inline-flex items-center rounded-full border text-xs font-semibold transition-colors focus:outline-none border-transparent bg-green-600 hover:bg-green-700 text-white`}>
               Giải pháp quản lý toàn diện
            </div>
            <h1 className="text-4xl md:text-6xl font-semibold text-black mb-6">
              HCM57 <span className="text-green-600">SOLUTION</span>
            </h1>
            <p className={`${Style.text} text-xl text-gray-600 mb-8`}>
              Phần mềm quản lý đa ngành nghề – Từ khách sạn, nhà hàng, spa đến các dịch vụ chăm sóc sức khỏe. Tích hợp AI, mobile app và hệ thống CRM hoàn chỉnh.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className={`${Style.button} inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium rounded border border-transparent bg-green-600 text-white hover:bg-green-700 transition`}>
                Liên hệ
              </button>
              <button className={`${Style.button} inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border h-11 rounded-md px-8 border-black text-black hover:bg-black hover:text-white`}>
                Tìm hiểu thêm
              </button>
            </div>
          </div>
          {/* Cột 2 */}
          <div className="w-full flex justify-center">
           <img
            src="/images/vg.jpg"
            alt="HCM57 Solution Dashboard"
            width={600}
            height={500}
            className="rounded-lg shadow-xl w-full max-w-[500px] h-auto"
          />
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomeSection;
