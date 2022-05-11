/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["images.unsplash.com", "tailwindui.com"],
  },
  exportPathMap: () => ({
    // The root page is just a puzzle
    "/": { page: "/puzzle/landing" },
  }),
};

module.exports = nextConfig;
