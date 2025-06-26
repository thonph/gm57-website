"use client";
import { useEffect, useState } from "react";
import { httpGet } from "../../utils/http";

interface ContactItem {
    contact_title: string;
    contact_subtitle: string;
}

export default function TitleContact() {
    const [data, setData] = useState<ContactItem | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);

                // Thêm try-catch cụ thể hơn
                const response = await httpGet<{
                    message: string,
                    data: ContactItem[]
                }>("contact_section");

                console.log("API Response:", response);

                if (!response) {
                    throw new Error("Không nhận được phản hồi từ server");
                }

                if (response.data && response.data.length > 0) {
                    setData(response.data[0]);
                } else {
                    throw new Error("Dữ liệu trống");
                }
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu:", error);
                setError(error instanceof Error ? error.message : "Lỗi không xác định");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div className="text-center py-4">Loading...</div>;
    if (error) return <div className="text-center text-red-500 py-4">{error}</div>;
    if (!data) return <div className="text-center py-4">No content available</div>;

    return (
        <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                {data.contact_title}
            </h2>
            <p className="text-lg text-gray-600">
                {data.contact_subtitle}
            </p>
        </div>
    );
}