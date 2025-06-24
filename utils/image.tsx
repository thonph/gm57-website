// utils/images.ts

const DIRECTUS_BASE_URL = process.env.NEXT_PUBLIC_DIRECTUS_BASE_URL;

/**
 * Hàm tạo URL ảnh từ Directus
 * @param imageId - ID ảnh hoặc đường dẫn ảnh từ Directus
 * @param options - Các tùy chọn xử lý ảnh
 * @returns URL hoàn chỉnh của ảnh
 */
export function getImageUrl(
  imageId: string | null | undefined,
  options: {
    width?: number;
    height?: number;
    quality?: number;
    fit?: "cover" | "contain" | "inside" | "outside";
    format?: "webp" | "jpg" | "png" | "avif";
  } = {}
): string {
  if (!imageId) {
    return "/placeholder-image.jpg"; // Hoặc URL ảnh mặc định của bạn
  }

  // Nếu imageId đã là URL đầy đủ thì trả về luôn
  if (imageId.startsWith("http")) {
    return imageId;
  }

  // Xử lý trường hợp imageId là UUID hoặc path
  const assetPath = imageId.startsWith("assets/")
    ? imageId
    : `assets/${imageId}`;

  const url = new URL(`${DIRECTUS_BASE_URL}/${assetPath}`);

  // Thêm các tham số xử lý ảnh nếu có
  if (options.width) url.searchParams.append("width", options.width.toString());
  if (options.height)
    url.searchParams.append("height", options.height.toString());
  if (options.quality)
    url.searchParams.append("quality", options.quality.toString());
  if (options.fit) url.searchParams.append("fit", options.fit);
  if (options.format) url.searchParams.append("format", options.format);

  return url.toString();
}
