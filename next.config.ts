import type { NextConfig } from "next";

function normalizeBasePath(input: string) {
  const trimmed = input.trim();
  if (!trimmed || trimmed === "/") return "";
  const withLeading = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
  return withLeading.endsWith("/")
    ? withLeading.slice(0, Math.max(1, withLeading.length - 1))
    : withLeading;
}

const basePath = normalizeBasePath(process.env.NEXT_PUBLIC_BASE_PATH ?? "");

const nextConfig: NextConfig = {
  ...(basePath ? { basePath } : {}),
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
