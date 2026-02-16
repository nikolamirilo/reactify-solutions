import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Reactify Solutions",
    short_name: "Reactify Solutions",
    description:
      "We provide cutting-edge digital solutions by utilizing the latest technologies to develop innovative and intuitive software that enhances your online presence and drives substantial growth. Integrating AI insights, we optimize your site for search engines and craft impactful marketing campaigns to maximize visibility and engagement.",
    theme_color: "#000000",
    categories: ["business", "productivity", "utilities"],
    background_color: "#1D2144",
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
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
