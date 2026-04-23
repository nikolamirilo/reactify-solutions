import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Reactify Solutions",
    short_name: "Reactify Solutions",
    description:
      "We provide cutting-edge digital solutions by utilizing the latest technologies to develop innovative and intuitive software that enhances your online presence and drives substantial growth. Integrating AI insights, we optimize your site for search engines and craft impactful marketing campaigns to maximize visibility and engagement.",
    theme_color: "#0a0e1a",
    categories: [
      "business",
      "productivity",
      "utilities",
      "ai",
      "software",
      "development",
      "solutions",
    ],
    background_color: "#0a0e1a",
    start_url: "/",
    display: "standalone",
    orientation: "portrait",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "48x48",
        type: "image/x-icon",
      },
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/opengraph-image.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/apple-icon.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/twitter-image.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
