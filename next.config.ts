import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
  turbopack: {
    root: process.cwd(),
    resolveAlias: {
      "@sanity/workbench": "./node_modules/@sanity/sdk-react/node_modules/@sanity/workbench/dist/index.js",
    },
  },
};

export default nextConfig;
