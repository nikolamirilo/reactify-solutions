/** @type {import('next').NextConfig} */
const nextConfig = {
  // Stamp every asset request with the deployment that produced it. With Skew
  // Protection enabled in the Vercel project settings, a browser still holding
  // HTML from an older deployment keeps getting that deployment's chunks
  // instead of a 404 - which is what turns a mid-rollout page view into
  // "Application error: a client-side exception has occurred". Undefined off
  // Vercel, where it is a no-op.
  deploymentId: process.env.VERCEL_DEPLOYMENT_ID,
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
