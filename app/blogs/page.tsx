import Blog from "@/components/Blogs";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Technical write-ups, product case studies, and practical lessons from building AI-powered software, digital catalogs, and automation tooling.",
  alternates: { canonical: "/blogs" },
  openGraph: {
    title: "Blog | Reactify Solutions",
    description:
      "Technical write-ups, product case studies, and lessons from building AI-powered software for real businesses.",
    url: "/blogs",
    images: ["/opengraph-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Reactify Solutions",
    description:
      "Technical write-ups and product case studies from Reactify Solutions.",
  },
};

export default function page() {
  return (
    <>
      <Breadcrumb
        pageName="Blog"
        description="Technical write-ups, product case studies, and practical lessons from building AI-powered software, digital catalogs, and automation tooling."
      />
      <Blog variant="blogs" />
    </>
  );
}
