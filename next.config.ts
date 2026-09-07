import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/past-years/:year(\\d{4})",
        destination: "/past-editions/:year",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
