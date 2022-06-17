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

module.exports = nextConfig;
