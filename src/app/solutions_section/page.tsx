import CardSolution from "@/components/CardSolution";
import HeadingSolution from "@/components/HeadingSolution";
import ListServiceRent from "@/components/ListServiceRent";
import ListServiceSolution from "@/components/ListServiceSolution";
import TitleSolution from "@/components/TitleSolution";

function SolutionSection() {
  return (
    <section id="solutions" className="py-16 px-4 bg-white">
      <div className="container mx-auto">
        <TitleSolution />
        <div className="mb-16">
          <div className="bg-green-50 rounded-lg p-8 border border-green-200">
            <CardSolution
              icon="globe"
              title="1. Website chuyên nghiệp"
              description="Chúng tôi thiết kế và phát triển Website chuyên biệt cho doanh nghiệp chỉ từ 2 triệu/đồng"
              features={[
                "Chuẩn SEO, tốc độ tải nhanh, hỗ trợ đa ngôn ngữ",
                "Giao diện tối ưu trải nghiệm người dùng trên mọi thiết bị",
                "Thiết kế trực tiếp theo nhu cầu cụ thể của doanh nghiệp",
              ]}
            />
          </div>
        </div>

        <div className="mb-16">
          <div className="text-center mb-8">
            <HeadingSolution title="2. Dịch vụ phần mềm" />
          </div>

          <ListServiceSolution />
        </div>

        <div className="mb-8">
          <div className="bg-green-50 rounded-lg p-8 border border-green-200">
            <HeadingSolution
              iconName="briefcase"
              title="3. Giải pháp Cho thuê dịch vụ IT - Outsourcing"
            />

            <div className="max-w-4xl mx-auto">
              <p className="text-black mb-6 text-center">
                Ngoài ra, HCM57 Technology còn cung cấp dịch vụ outsourcing IT
                chất lượng cao giúp doanh nghiệp:
              </p>

              <ListServiceRent />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SolutionSection;
