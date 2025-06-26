"use client";
import { useEffect, useState } from "react";
import { httpGet } from "../../utils/http";

interface StrengthsSection {
    strengths_title: string;
    strengths_subtitle: string;
    id: string;
    image: string;
}

interface StrengthsItems {
    content: string;
}

export default function StrengthsSection() {
    const [section, setSection] = useState<StrengthsSection | null>(null);
    const [items, setItems] = useState<StrengthsItems[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);

                const [sectionRes, itemsRes,] = await Promise.all([
                    httpGet<{ message: string; data: StrengthsSection[] }>("strengths_section"),
                    httpGet<{ message: string; data: StrengthsItems[] }>("strengths_items"),
                ]);

                if (!sectionRes || !itemsRes) {
                    throw new Error("Không thể tải dữ liệu");
                }

                if (sectionRes.data.length > 0) setSection(sectionRes.data[0]);
                if (itemsRes.data.length > 0) setItems(itemsRes.data);
            } catch (err) {
                console.error(err);
                setError(err instanceof Error ? err.message : "Lỗi không xác định");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div className="text-center py-4">Đang tải...</div>;
    if (error) return <div className="text-center text-red-500 py-4">{error}</div>;
    if (!section) return <div className="text-center py-4">Không có dữ liệu</div>;
    const imageUrl = `http://10.208.50.7:8058/assets/${section.image}`;
    return (
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
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                            <path d="m9 11 3 3L22 4" />
                        </svg>
                        <h2 className="text-3xl md:text-4xl font-bold text-black">
                            {section.strengths_title}
                        </h2>
                    </div>
                    <p className="text-lg text-black mb-8">{section.strengths_subtitle}</p>

                    <div className="grid gap-4">
                        {items.map((item, index) => (
                            <div
                                key={index}
                                className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm border border-green-200"
                            >
                                <div className="w-2 h-2 bg-green-600 rounded-full mt-3 flex-shrink-0"></div>
                                <p className="text-black">{item.content}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-8">
                    <img
                        src={imageUrl}
                        alt={section.strengths_title}
                        className="rounded-lg shadow-xl w-full"
                        style={{ color: "transparent" }}
                        loading="lazy"
                        width={500}
                        height={600}
                    />
                </div>
            </div>
        </div>
    );
}
