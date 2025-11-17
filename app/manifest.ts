import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Reactify Solutions",
    short_name: "Reactify Solutions",
    description:
      "We provide cutting-edge digital solutions by utilizing the latest technologies to develop innovative and intuitive software that enhances your online presence and drives substantial growth. Integrating AI insights, we optimize your site for search engines and craft impactful marketing campaigns to maximize visibility and engagement.",
    theme_color: "#000000",
    categories: [
      "web_development",
      "react",
      "mobile_development",
      "service_provider",
      "node",
      "solutions",
    ],
    background_color: "#1D2144",
    start_url: "/",
    display: "standalone",
    orientation: "portrait",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/icon.png",
        sizes: "any",
        type: "image/png",
      },
      {
        src: "/opengraph-image.png",
        sizes: "any",
        type: "image/png",
      },
      {
        src: "/twitter-image.png",
        sizes: "any",
        type: "image/png",
      },
      {
        src: "/apple-icon.png",
        sizes: "any",
        type: "image/png",
      },
    ],
  };
}
