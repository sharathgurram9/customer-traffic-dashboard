import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};
module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://literate-space-funicular-69xgvv4j7jgh4qq5-4000.app.github.dev/api/:path*',
      },
    ];
  },
};


export default nextConfig;
