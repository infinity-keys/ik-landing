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
      // Alias default puzzle count and page to /puzzles
      { source: "/puzzles/16/1", destination: "/puzzles" },
    ];
  },
};

module.exports = withBundleAnalyzer(nextConfig);
