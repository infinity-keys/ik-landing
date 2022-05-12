/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["images.unsplash.com", "tailwindui.com"],
  },
  async rewrites() {
    return [
      // The root page is just a puzzle
      { source: "/", destination: "/puzzle/landing" },
      // Forward old avalanche page to new
      { source: "/avalanche", destination: "/puzzle/avalanche" },
    ];
  },
};

module.exports = nextConfig;
