import AboutSectionOne from "@/components/About/AboutSectionOne";
import ScrollUp from "@/components/Common/ScrollUp";
import Services from "@/components/Services";
import Hero from "@/components/HeroV2";
import Technologies from "@/components/Technologies";
import { Metadata } from "next";
import Products from "@/components/Products";
import CTA from "@/components/CTA/CTA";

export const metadata: Metadata = {
  title: {
    absolute: "Reactify Solutions | The Engine Behind Your Digital Growth",
  },
  description:
    "Reactify Solutions - Your Partner in Cutting-Edge Web Development and Digital Transformation. We specialize in crafting innovative web solutions using the latest technologies to drive your business forward.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Reactify Solutions | The Engine Behind Your Digital Growth",
    description:
      "Reactify Solutions - Your Partner in Cutting-Edge Web Development and Digital Transformation. We specialize in crafting innovative web solutions using the latest technologies to drive your business forward.",
    url: "/",
    images: ["/opengraph-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Reactify Solutions | The Engine Behind Your Digital Growth",
    description:
      "Your Partner in Cutting-Edge Web Development and Digital Transformation.",
  },
};

import PreLoader from "@/components/Common/PreLoader";
import RevealOnScroll from "@/components/Common/RevealOnScroll";
import Methodology from "@/components/Methodology";
import DocsPromo from "@/components/DocsPromo";

export default async function page() {
  return (
    <>
      <PreLoader />
      <ScrollUp />
      <Hero />
      <RevealOnScroll>
        <Products />
      </RevealOnScroll>
      <RevealOnScroll>
        <Services />
      </RevealOnScroll>
      <RevealOnScroll>
        <Methodology />
      </RevealOnScroll>
      <RevealOnScroll>
        <Technologies />
      </RevealOnScroll>
      <RevealOnScroll>
        <DocsPromo />
      </RevealOnScroll>
      <RevealOnScroll>
        <CTA />
      </RevealOnScroll>
    </>
  );
}
