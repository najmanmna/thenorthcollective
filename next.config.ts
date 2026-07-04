import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const nextConfig: NextConfig = {
  images: {
    // Source images are already static, pre-compressed assets; skip
    // Cloudflare's paid edge image-optimization service for a site this size.
    unoptimized: true,
  },
};

initOpenNextCloudflareForDev();

export default nextConfig;
