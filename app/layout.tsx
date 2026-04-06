import ClientLayout from "@/components/ClientLayout";
import { inter, josefinSans, roboto } from "@/fonts";
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
    <html suppressHydrationWarning lang="en" className="dark">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(!t||t==='"dark"'||t==='dark'){document.documentElement.classList.add('dark')}else{document.documentElement.classList.remove('dark')}}catch(e){document.documentElement.classList.add('dark')}})()`,
          }}
        />
      </head>
      <body className={`bg-black/[0.9] overflow-x-hidden ${roboto.className}`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  name: "Reactify Solutions",
                  url: "https://www.reactify-solutions.com",
                  logo: "https://www.reactify-solutions.com/icon.png",
                  description:
                    "Cutting-edge digital solutions using the latest technologies to develop innovative software that enhances your online presence and drives growth.",
                },
                {
                  "@type": "WebSite",
                  name: "Reactify Solutions",
                  url: "https://www.reactify-solutions.com",
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
