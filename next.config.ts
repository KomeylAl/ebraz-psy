import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [{ protocol: "https", hostname: "api.ebrazclinic.ir" }],
  },
};

export default nextConfig;
