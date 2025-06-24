import { NextRequest, NextResponse } from "next/server";

const API_BASE_URL = process.env.API_BASE_URL;

export async function handleProxyRequest(
  request: NextRequest,
  params: Promise<{ path: string | string[] }>, // Nhận params là promise
  method: string
): Promise<NextResponse> {
  try {
    // 1. Await params để lấy giá trị thực
    const resolvedParams = await params;

    // 2. Xử lý path để đảm bảo là mảng chuỗi
    const pathSegments = Array.isArray(resolvedParams.path)
      ? resolvedParams.path
      : [resolvedParams.path];
    const pathSegment = pathSegments.join("/"); // Dòng này an toàn vì pathSegments luôn là mảng

    // 3. Xây dựng URL đích
    const targetUrl = new URL(`${API_BASE_URL}/${pathSegment}`);

    // 4. Thêm query parameters từ request gốc
    request.nextUrl.searchParams.forEach((value, key) => {
      targetUrl.searchParams.append(key, value);
    });

    console.log(`Proxying ${method} request to: ${targetUrl.toString()}`);

    // 5. Chuẩn bị headers
    const headers = new Headers();
    const excludeHeaders = ["host", "content-length"];

    request.headers.forEach((value, key) => {
      if (!excludeHeaders.includes(key)) {
        headers.append(key, value);
      }
    });

    // 6. Thêm xác thực nếu cần
    if (process.env.API_SECRET) {
      headers.append("Authorization", `Bearer ${process.env.API_SECRET}`);
    }

    // 7. Chuẩn bị request init
    const init: RequestInit = {
      method,
      headers,
      cache: "no-store",
    };

    // 8. Xử lý body cho các method POST/PUT/PATCH
    if (["POST", "PUT", "PATCH"].includes(method)) {
      headers.append("Content-Type", "application/json");
      init.body = JSON.stringify(await request.json());
    }

    // 9. Thực hiện fetch request
    const res = await fetch(targetUrl.toString(), init);

    // 10. Xử lý response
    if (!res.ok) {
      throw new Error(`API request failed with status ${res.status}`);
    }

    // 11. Xử lý các loại response khác nhau
    const contentType = res.headers.get("content-type");
    let data;

    if (contentType?.includes("application/json")) {
      data = await res.json();
    } else {
      data = await res.text();
    }

    // 12. Trả về response
    return new NextResponse(JSON.stringify(data), {
      status: res.status,
      headers: {
        "Content-Type": "application/json",
        ...(res.headers.get("cache-control") && {
          "Cache-Control": res.headers.get("cache-control")!,
        }),
      },
    });
  } catch (error) {
    console.error("Proxy request error:", error);
    return new NextResponse(
      JSON.stringify({ error: "Internal Server Error" }),
      {
        status: 500,
      }
    );
  }
}
