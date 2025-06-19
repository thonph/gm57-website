import ItemServiceSolution from "./ItemServiceSolution";

interface ServiceItem {
  imageUrl?: string;
  title: string;
  features: string[];
}

function ListServiceSolution() {
  const services: ServiceItem[] = [
    {
      title: "H5768 FO - Quản lý Front Office",
      features: [
        "Tối ưu quy trình, đặt lịch hẹn, đặt chỗ,...cho khách sạn",
        "Tự động hoá đặt các loại dịch vụ và phân ca",
        "Kết nối chặt chẽ với bộ phận buồng phòng, nhà hàng",
      ],
    },
    {
      title: "H5768 POS - Quản lý nhà hàng, bars",
      features: [
        "Gọi món nhanh qua PDA, kết nối bếp và kho",
        "Tính tiền linh hoạt theo món, combo, voucher",
        "Báo cáo doanh thu theo từng ca làm, nhân viên",
      ],
    },
    {
      title: "H5768 BO - Kế toán - Tồn kho - Tài sản",
      features: [
        "Tích hợp thanh toán hoá đơn điện tử",
        "Quản lý mua hàng, kiểm soát chi phí theo PO/PR",
        "Báo cáo tài chính theo chuẩn kế toán Việt Nam",
      ],
    },
    {
      title: "H5768 HR - Quản trị nhân sự",
      features: [
        "Quản lý hồ sơ nhân sự, tính lương, chấm công",
        "Hệ thống đánh giá năng lực, KPI",
        "Tích hợp quy trình tuyển dụng - đào tạo",
      ],
    },
    {
      title: "Hệ thống Booking online",
      features: [
        "Giao diện đơn giản, thao tác nhanh chóng",
        "Hỗ trợ khách đặt dịch vụ, thanh toán dễ dàng đa ngôn ngữ",
        "Chatbot tư vấn và gợi ý lịch trình thông minh",
      ],
    },
  ];

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map((service, index) => (
        <ItemServiceSolution
          key={index}
          title={service.title}
          features={service.features}
          imageUrl={service.imageUrl}
        />
      ))}
    </div>
  );
}

export default ListServiceSolution;
