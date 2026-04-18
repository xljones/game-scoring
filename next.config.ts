import type { NextConfig } from "next";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "/out";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
};

export default nextConfig;
