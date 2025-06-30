"use client";
import { useEffect, useState } from "react";
import { httpGet } from "../../utils/http";

interface ContactItems {
  full_name: string;
  phone: string;
  placeholder_full_name: string;
  placeholder_phone: string;
  province?: { id: string; name: string; slug: string };
  service: { id: string; name: string; slug: string };
  ["links-oxydzv"]?: string;
  ["notice-aezytp"]: string;
}

interface OptionItem {
  id: string;
  name: string;
  slug: string;
}

export default function ContactForms() {
  const [provinceOptions, setProvinceOptions] = useState<OptionItem[]>([]);
  const [serviceOptions, setServiceOptions] = useState<OptionItem[]>([]);
  const [data, setData] = useState<ContactItems | null>(null);

  const [formData, setFormData] = useState({
    full_name: "",
    phone: "",
    province: "",
    service: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [provinceRes, serviceRes, formRes] = await Promise.all([
          httpGet<{ data: OptionItem[] }>("contact_province"),
          httpGet<{ data: OptionItem[] }>("contact_service"),
          httpGet<{ data: ContactItems[] }>(
            "contact_forms?fields=*,province.*,service.*"
          ),
        ]);

        if (provinceRes?.data) setProvinceOptions(provinceRes.data);
        if (serviceRes?.data) setServiceOptions(serviceRes.data);
        if (formRes?.data?.length > 0) setData(formRes.data[0]);
      } catch (err) {
        console.error("Lỗi lấy dữ liệu:", err);
        setError(err instanceof Error ? err.message : "Lỗi không xác định");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thông tin của bạn đã được ghi nhận!");
  };

  if (loading) return <div className="text-center py-4">Loading...</div>;
  if (error)
    return <div className="text-center text-red-500 py-4">{error}</div>;

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="full_name" className="text-sm text-black font-medium">
            Tên đầy đủ của bạn *
          </label>
          <input
            id="full_name"
            name="full_name"
            required
            value={formData.full_name}
            onChange={handleChange}
            placeholder={
              data?.placeholder_full_name || "Nhập họ và tên của bạn"
            }
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-green-600 focus:ring-green-600"
          />
        </div>

        <div>
          <label htmlFor="phone" className="text-sm text-black font-medium">
            Số điện thoại liên hệ *
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            placeholder={
              data?.placeholder_phone || "Nhập số điện thoại của bạn"
            }
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-green-600 focus:ring-green-600"
          />
        </div>

        <div>
          <label htmlFor="province" className="text-sm text-black font-medium">
            Tỉnh thành
          </label>
          <select
            id="province"
            name="province"
            value={formData.province}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-green-600 focus:ring-green-600"
          >
            <option value="" disabled hidden>
              Chọn tỉnh thành của bạn
            </option>
            {provinceOptions.map((opt) => (
              <option key={opt.id} value={opt.id}>
                {opt.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="service" className="text-sm text-black font-medium">
            Nhu cầu của bạn *
          </label>
          <select
            id="service"
            name="service"
            required
            value={formData.service}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-green-600 focus:ring-green-600"
          >
            <option value="" disabled hidden>
              Chọn dịch vụ bạn quan tâm
            </option>
            {serviceOptions.map((opt) => (
              <option key={opt.id} value={opt.id}>
                {opt.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full px-4 py-3 bg-green-600 hover:bg-green-700 text-white text-lg font-medium rounded-md"
        >
          {data?.["links-oxydzv"] || "Đăng ký tư vấn"}
        </button>
      </form>

      <p className="text-sm text-gray-500 mt-4 text-center">
        {data?.["notice-aezytp"] ||
          "Bằng cách gửi form này, bạn đồng ý để HCM57 Solution liên hệ tư vấn qua thông tin đã cung cấp."}
      </p>
    </div>
  );
}
