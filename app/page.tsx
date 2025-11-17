import AboutSectionOne from "@/components/About/AboutSectionOne";
import Clients from "@/components/Clients";
import ScrollUp from "@/components/Common/ScrollUp";
import Services from "@/components/Services";
import Hero from "@/components/Hero";
import Technologies from "@/components/Technologies";
import { Metadata } from "next";
import Testimonials from "@/components/Testimonials";
import Solutions from "@/components/Solutions";
import CTA from "@/components/CTA/CTA";

export const metadata: Metadata = {
  title: "Reactify Solutions",
  description:
    "Reactify Solutions - Your Partner in Cutting-Edge Web Development and Digital Transformation. We specialize in crafting innovative web solutions using the latest technologies to drive your business forward.",
  openGraph: {
    title: "Reactify Solutions",
    description:
      "Reactify Solutions - Your Partner in Cutting-Edge Web Development and Digital Transformation. We specialize in crafting innovative web solutions using the latest technologies to drive your business forward.",
    url: "https://www.reactify-solutions.com",
    images: ["/opengraph-image.png"],
  },
};

export default async function page() {
  return (
    <>
      <ScrollUp />
      <Hero />
      <AboutSectionOne />
      <Services />
      <Technologies />
      {/* <Solutions /> */}
      {/* <Video /> */}
      {/* <Clients /> */}
      <Testimonials />
      <CTA />
    </>
  );
}
