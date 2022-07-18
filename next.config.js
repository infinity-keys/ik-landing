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
      // { source: "/puzzles/8/1", destination: "/puzzles" },
    ];
  },
};

module.exports = nextConfig;
