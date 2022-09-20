const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // chain icons
  images: {
    domains: [
      "images.unsplash.com",
      "tailwindui.com",
      "res.cloudinary.com",
      "imgs.search.brave.com",
    ],
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
  async headers() {
    return [
      // caches fonts for 1yr
      {
        source: "/fonts/poppins-400.woff2",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/fonts/poppins-500.woff2",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/fonts/poppins-700.woff2",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

module.exports = withBundleAnalyzer(nextConfig);
