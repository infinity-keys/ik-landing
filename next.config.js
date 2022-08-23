const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["images.unsplash.com", "tailwindui.com", "res.cloudinary.com"],
  },
  async redirects() {
    return [
      {
        source: "/puzzles/16/1",
        destination: "/puzzles",
        permanent: true,
      },
      {
        source: "/packs/16/1",
        destination: "/packs",
        permanent: true,
      },
      {
        source: "/avalanche",
        destination: "/puzzle/avalanche",
        permanent: true,
      },
    ];
  },
};

module.exports = withBundleAnalyzer(nextConfig);
