"use client";
import { useEffect, useState } from "react";
import { httpGet } from "../../utils/http";

interface SolutionItem {
  id: string;
  title: string;
  icon?: string;
  description?: string | null;
}

interface ApiResponse {
  data: SolutionItem;
}

interface HeadingSolutionProps {
  icon?: React.ReactNode;
  iconName?: string;
  iconClass?: string;
  titleClass?: string;
}

export default function HeadingSolutionRent({
  icon,
  iconName = "code",
  iconClass = "h-8 w-8 text-green-600",
  titleClass = "text-2xl font-bold text-black",
}: HeadingSolutionProps) {
  const [data, setData] = useState<SolutionItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await httpGet<ApiResponse>(
          "solution_categories/44e55562-55ab-4c76-9e0a-3d1191038ed6"
        );

        if (response.data) {
          setData(response.data);
        } else {
          setError("No data available");
        }
      } catch (error) {
        setError("Failed to fetch data");
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Các icon mặc định
  const defaultIcons: Record<string, React.ReactNode> = {
    code: (
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
        className={`lucide lucide-code ${iconClass}`}
      >
        <polyline points="16 18 22 12 16 6"></polyline>
        <polyline points="8 6 2 12 8 18"></polyline>
      </svg>
    ),
    globe: (
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
        className={`lucide lucide-globe ${iconClass}`}
      >
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
        <path d="M2 12h20"></path>
      </svg>
    ),
    briefcase: (
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
        className={`lucide lucide-briefcase ${iconClass}`}
      >
        <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
        <rect width="20" height="14" x="2" y="6" rx="2"></rect>
      </svg>
    ),
    // Có thể thêm các icon khác tại đây
  };

  if (loading) return <div className="text-center py-4">Loading...</div>;
  if (error)
    return <div className="text-center text-red-500 py-4">{error}</div>;
  if (!data) return <div className="text-center py-4">No data available</div>;

  const selectedIcon = icon || defaultIcons[iconName] || defaultIcons.code;

  return (
    <div>
      <div className="flex items-center justify-center gap-3 mb-4">
        {selectedIcon}
        <h3 className={titleClass}>{data.title}</h3>
      </div>
      <div className="max-w-4xl mx-auto">
        <p className="text-black mb-6 text-center">{data.description}</p>
      </div>
    </div>
  );
}
