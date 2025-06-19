import Image from 'next/image';

function OpportunitiesSection() {
  const opportunities = [
    "Các mô hình SPA, Homestay, Mini Hotel, nhà hàng,... ở khu vực đang phát triển mạnh → phát sinh nhu cầu sử dụng phần mềm",
    "Chính phủ khuyến khích chuyển đổi số",
    "Nhu cầu tích hợp và nâng cao quy trình Quản lý vận hành, CRM, tích hợp hoá đơn điện tử cho kế toán đang cần thiết",
    "Vẫn còn các cơ hội phát triển tại các tỉnh ở Việt Nam - nơi các phần mềm nước ngoài chưa có cơ hội tiếp cận/chưa tiếp cận hết",
    "Có thể mở rộng sang các ngành khác như các quán cafe, cửa hàng nhỏ... để tiếp cận",
    "Có thể kết nối với các sự kiện dành cho SME để bán H5768"
  ];

  return (
    <section id="opportunities" className="py-16 px-4 bg-white">
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
                className="lucide lucide-trending-up h-8 w-8 text-green-600"
              >
                <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
                <polyline points="16 7 22 7 22 13"></polyline>
              </svg>
              <h2 className="text-3xl md:text-4xl font-bold text-black">Cơ hội</h2>
            </div>
            <p className="text-lg text-black mb-8">
              Thị trường Việt Nam đang mở ra nhiều cơ hội phát triển cho các giải pháp công nghệ quản lý.
            </p>
            <div className="grid gap-4">
              {opportunities.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 bg-green-50 rounded-lg shadow-sm border-l-4 border-green-600"
                >
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-3 flex-shrink-0"></div>
                  <p className="text-black">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Image
              alt="Cơ hội phát triển"
              loading="lazy"
              width={500}
              height={600}
              src="/hcm57.jpg"
              className="rounded-lg shadow-xl w-full"
              style={{ color: "transparent" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default OpportunitiesSection;
