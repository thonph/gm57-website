import Image from 'next/image';

function StrengthsSection() {
  return (
    <section id="strengths" className="py-16 px-4 bg-green-50">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-circle-check-big h-8 w-8 text-green-600"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <path d="m9 11 3 3L22 4"></path>
              </svg>
              <h2 className="text-3xl md:text-4xl font-bold text-black">Điểm mạnh</h2>
            </div>
            <p className="text-lg text-black mb-8">
              HCM57 Solution sở hữu nhiều ưu điểm vượt trội giúp doanh nghiệp tối ưu hóa quy trình quản lý.
            </p>
            <div className="grid gap-4">
              {[
                "Thiết kế đa ngành, không chỉ gói gọn ở khách sạn mà còn sử dụng được cho cả SPA, Nhà hàng, bệnh viện/phòng khám, Karaoke...",
                "Hỗ trợ đa ngôn ngữ: Tiếng Việt, Anh, Trung.",
                "Tích hợp mobile App, điều hành mọi lúc mọi nơi, đặc biệt phù hợp mô hình chuỗi",
                "Gói tích hợp với CRM chăm sóc khách hàng, tích hợp MISA, Fast, hoá đơn điện tử cho bộ phận kế toán",
                "Giao diện tùy chỉnh theo thương hiệu của doanh nghiệp từ logo, màu sắc thương hiệu...phù hợp với mô hình khách sạn/quán/chuỗi dịch vụ",
                "Tích hợp AI check-in tự xa, tự động phân ca"
              ].map((text, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm border border-green-200">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-3 flex-shrink-0"></div>
                  <p className="text-black">{text}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Image
              alt="Điểm mạnh của HCM57 Solution"
              loading="lazy"
              width={500}
              height={600}
              src="/HCM57.jpg"
              className="rounded-lg shadow-xl w-full"
              style={{ color: "transparent" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default StrengthsSection;
