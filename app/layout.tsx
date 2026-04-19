import ClientLayout from "@/components/ClientLayout";
import { inter, josefinSans, roboto, spaceGrotesk, jetbrainsMono } from "@/fonts";
import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.reactify-solutions.com"),
  title: {
    default: "Reactify Solutions",
    template: "%s | Reactify Solutions",
  },
  description:
    "Reactify Solutions - Your Partner in Cutting-Edge Web Development and Digital Transformation. We specialize in crafting innovative web solutions using the latest technologies to drive your business forward.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Reactify Solutions",
    images: ["/opengraph-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/twitter-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en" className={`dark ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(!t||t==='"dark"'||t==='dark'){document.documentElement.classList.add('dark')}else{document.documentElement.classList.remove('dark')}}catch(e){document.documentElement.classList.add('dark')}})()`,
          }}
        />
      </head>
      <body className={`bg-dark overflow-x-hidden ${roboto.className}`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id":
                    "https://www.reactify-solutions.com/#organization",
                  name: "Reactify Solutions",
                  url: "https://www.reactify-solutions.com",
                  logo: "https://www.reactify-solutions.com/icon.png",
                  description:
                    "Cutting-edge digital solutions using the latest technologies to develop innovative software that enhances your online presence and drives growth.",
                  contactPoint: {
                    "@type": "ContactPoint",
                    contactType: "customer support",
                    email: "reactify.developer@gmail.com",
                    availableLanguage: ["English"],
                  },
                  makesOffer: [
                    {
                      "@type": "Offer",
                      itemOffered: {
                        "@type": "Service",
                        name: "Web & Mobile Development",
                        description:
                          "High-performance Progressive Web Apps and cross-platform mobile applications.",
                      },
                    },
                    {
                      "@type": "Offer",
                      itemOffered: {
                        "@type": "Service",
                        name: "AI Development",
                        description:
                          "LLM integration, AI agents, chatbots, and custom AI automation.",
                      },
                    },
                    {
                      "@type": "Offer",
                      itemOffered: {
                        "@type": "Service",
                        name: "Data Analytics",
                        description:
                          "End-to-end analytics with Microsoft Fabric dataflows and Power BI dashboards.",
                      },
                    },
                    {
                      "@type": "Offer",
                      itemOffered: {
                        "@type": "Service",
                        name: "Automations",
                        description:
                          "Workflow automation, system integrations, and data synchronization.",
                      },
                    },
                    {
                      "@type": "Offer",
                      itemOffered: {
                        "@type": "Service",
                        name: "Business Consulting",
                        description:
                          "Process optimization and strategy aligned with long-term growth.",
                      },
                    },
                  ],
                },
                {
                  "@type": "WebSite",
                  "@id": "https://www.reactify-solutions.com/#website",
                  name: "Reactify Solutions",
                  url: "https://www.reactify-solutions.com",
                  publisher: {
                    "@id":
                      "https://www.reactify-solutions.com/#organization",
                  },
                  inLanguage: "en-US",
                },
              ],
            }),
          }}
        />
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
