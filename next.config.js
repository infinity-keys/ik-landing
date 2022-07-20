const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["images.unsplash.com", "tailwindui.com"],
  },
  async rewrites() {
    return [
      // Forward old avalanche page to new
      { source: "/avalanche", destination: "/puzzle/avalanche" },
    ];
  },
};

module.exports = withBundleAnalyzer(nextConfig);
