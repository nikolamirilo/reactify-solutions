import AboutSectionOne from "@/components/About/AboutSectionOne";
import AboutSectionTwo from "@/components/About/AboutSectionTwo";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
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
