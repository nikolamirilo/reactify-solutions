import AboutSectionOne from "@/components/About/AboutSectionOne";
import AboutSectionTwo from "@/components/About/AboutSectionTwo";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn more about Reactify Solutions - the team behind Quicktalog and unbg. We build web apps, AI solutions, data analytics, and automations for small and medium-sized businesses.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Us",
    description:
      "Meet the team behind Quicktalog, unbg, and custom digital solutions for modern businesses.",
    url: "/about",
    images: ["/opengraph-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | Reactify Solutions",
    description:
      "The team building Quicktalog, unbg, and custom AI-powered digital solutions.",
  },
};

export default function page() {
  return (
    <>
      <Breadcrumb
        pageName="About Page"
        description="Learn more about Reactify Solutions - our mission, values, and the team behind cutting-edge web development and digital transformation services."
      />
      <AboutSectionOne />
      <AboutSectionTwo />
    </>
  );
}
