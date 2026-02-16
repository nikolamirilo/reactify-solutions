import AboutSectionOne from "@/components/About/AboutSectionOne";
import ScrollUp from "@/components/Common/ScrollUp";
import Services from "@/components/Services";
import Hero from "@/components/Hero";
import Technologies from "@/components/Technologies";
import { Metadata } from "next";
import Testimonials from "@/components/Testimonials";
import Solutions from "@/components/Solutions";
import CTA from "@/components/CTA/CTA";

export const metadata: Metadata = {
  title: { absolute: "Reactify Solutions | Intelligence Behind Your Digital Success" },
  description:
    "Reactify Solutions - Your Partner in Cutting-Edge Web Development and Digital Transformation. We specialize in crafting innovative web solutions using the latest technologies to drive your business forward.",
  openGraph: {
    title: "Reactify Solutions | Intelligence Behind Your Digital Success",
    description:
      "Reactify Solutions - Your Partner in Cutting-Edge Web Development and Digital Transformation. We specialize in crafting innovative web solutions using the latest technologies to drive your business forward.",
    url: "/",
    images: ["/opengraph-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Reactify Solutions | Intelligence Behind Your Digital Success",
    description:
      "Your Partner in Cutting-Edge Web Development and Digital Transformation.",
  },
};

export default async function page() {
  return (
    <>
      <ScrollUp />
      <Hero />
      <AboutSectionOne />
      <Services />
      <Solutions />
      <Technologies />
      {/* <Video /> */}
      {/* <Clients /> */}
      <Testimonials />
      <CTA />
    </>
  );
}
