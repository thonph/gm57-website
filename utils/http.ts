// src/lib/utils/http.ts
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export async function http<T>(
  endpoint: string,
  method: HttpMethod = "GET",
  body?: any
): Promise<T> {
  const url = `/api/proxy/${endpoint}`;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  const config: RequestInit = {
    method,
    headers,
    cache: "no-store",
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(url, config);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

// Helper methods
export const httpGet = <T>(endpoint: string) => http<T>(endpoint);
export const httpPost = <T>(endpoint: string, body: any) =>
  http<T>(endpoint, "POST", body);
export const httpPut = <T>(endpoint: string, body: any) =>
  http<T>(endpoint, "PUT", body);
export const httpDelete = <T>(endpoint: string) => http<T>(endpoint, "DELETE");
