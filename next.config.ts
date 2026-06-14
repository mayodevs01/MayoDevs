import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",
  basePath: process.env.NODE_ENV === "production" ? "/MayoDevs" : "",
  assetPrefix: process.env.NODE_ENV === "production" ? "/MayoDevs/" : ""
};

export default nextConfig;
