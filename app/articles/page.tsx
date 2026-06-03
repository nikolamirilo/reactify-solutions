import Articles from "@/components/Articles";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Articles",
  description:
    "Technical write-ups, product case studies, and practical lessons from building AI-powered software, digital catalogs, and automation tooling.",
  alternates: { canonical: "/articles" },
  openGraph: {
    title: "Article | Reactify Solutions",
    description:
      "Technical write-ups, product case studies, and lessons from building AI-powered software for real businesses.",
    url: "/articles",
    images: ["/opengraph-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Article | Reactify Solutions",
    description:
      "Technical write-ups and product case studies from Reactify Solutions.",
  },
};

export default function page() {
  return (
    <>
      <Breadcrumb
        pageName="Articles"
        description="Technical write-ups, product case studies, and practical lessons from building AI-powered software, digital catalogs, and automation tooling."
      />
      <Articles variant="articles" />
    </>
  );
}
