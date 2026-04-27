import Breadcrumb from "@/components/Common/Breadcrumb";
import Support from "@/components/Support";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Product Support",
  description:
    "Get product support from Reactify Solutions. Report a bug, request a feature, or ask a question about Quicktalog, unbg, or any of our other products and we'll get back to you by email.",
  alternates: { canonical: "/support" },
  openGraph: {
    title: "Product Support",
    description:
      "Report a bug, request a feature, or ask a question about any Reactify Solutions product. We'll respond by email.",
    url: "/support",
  },
  twitter: {
    card: "summary_large_image",
    title: "Product Support | Reactify Solutions",
    description:
      "Report a bug, request a feature, or ask a question about any Reactify Solutions product.",
  },
};

export default function page() {
  return (
    <>
      <Breadcrumb
        pageName="Product Support"
        description="Pick the product you're using, tell us what's going on, and we'll respond by email. For general enquiries that aren't product-specific, use our contact page instead."
      />
      <Support />
    </>
  );
}
