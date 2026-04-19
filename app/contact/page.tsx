import Breadcrumb from "@/components/Common/Breadcrumb";
import Contact from "@/components/Contact";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Reactify Solutions. Whether you have a question, need support, or want to learn more about how we can assist you, please don't hesitate to reach out.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Us",
    description:
      "Get in touch with Reactify Solutions. Whether you have a question, need support, or want to learn more about how we can assist you, please don't hesitate to reach out.",
    url: "/contact",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | Reactify Solutions",
    description:
      "Get in touch with Reactify Solutions for your digital needs.",
  },
};

export default function page() {
  return (
    <>
      <Breadcrumb
        pageName="Contact Us"
        description="At Reactify Solutions, we're always here to help you with your digital needs. Whether you have a question, need support, or want to learn more about how we can assist you, please don't hesitate to reach out."
      />
      <Contact />
    </>
  );
};

