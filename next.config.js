/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    qualities: [75, 95],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  async redirects() {
    // The Solutions section was renamed to Products. Permanently redirect the
    // old URLs so existing inbound links and search rankings carry over.
    return [
      {
        source: "/solutions",
        destination: "/products",
        permanent: true,
      },
      {
        source: "/solutions/:id/privacy-policy",
        destination: "/products/:id/privacy-policy",
        permanent: true,
      },
      {
        source: "/solutions/:id",
        destination: "/products/:id",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
