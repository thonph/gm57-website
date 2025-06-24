"use client";
import { useEffect, useState } from "react";
import { httpGet } from "../../utils/http";

interface ErrorPageData {
  id: number;
  title: string;
  description: string;
  button_text?: string;
  button_link?: string;
  primary_color: string;
  error_type: string;
}

export const useErrorPage = (errorType: string) => {
  const [data, setData] = useState<ErrorPageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching error page data...");
        const endpoint = `error_page?filter[error_type][_eq]=${errorType}`;
        console.log("API Endpoint:", endpoint);

        const response = await httpGet<{ data: ErrorPageData[] }>(endpoint);
        console.log("API Response:", response);

        if (!response) {
          throw new Error("No response from server");
        }

        if (response.data && response.data.length > 0) {
          setData(response.data[0]);
        } else {
          setError("No error page configuration found");
        }
      } catch (err) {
        console.error("Error details:", err);
        setError(
          `Failed to fetch: ${err instanceof Error ? err.message : String(err)}`
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [errorType]);

  return { data, loading, error };
};
