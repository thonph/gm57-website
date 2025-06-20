import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL("http://10.208.50.7:8058/assets**"),

      // {
      //   protocol: "https",
      //   hostname: "ftpdev.hcm57.vn",
      //   pathname: "/news-cms/**",
      // },
    ],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
