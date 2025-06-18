import ItemServiceRent from "./ItemServiceRent";

interface ServiceItem {
  icon?: React.ReactNode;
  iconText?: string;
  content: string;
}

function ListServiceRent() {
  // Dữ liệu có thể lấy từ API hoặc định nghĩa tại đây
  const services: ServiceItem[] = [
    {
      iconText: "💰",
      content: "Tiết kiệm chi phí vận hành nhưng vẫn đảm bảo hiệu quả",
    },
    {
      iconText: "👥",
      content: "Tiếp cận đội ngũ IT giàu kinh nghiệm theo yêu cầu",
    },
    {
      iconText: "⚡",
      content: "Đáp ứng nhanh, linh hoạt về thời gian và chuyên môn",
    },
  ];

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {services.map((service, index) => (
        <ItemServiceRent
          key={index}
          iconText={service.iconText}
          content={service.content}
          icon={service.icon}
        />
      ))}
    </div>
  );
}

export default ListServiceRent;
