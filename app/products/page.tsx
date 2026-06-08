import { Metadata } from "next";
import Breadcrumb from "@/components/Common/Breadcrumb";
import ProductGridCard from "@/components/Products/ProductGridCard";
import productsData from "@/components/Products/productsData";

export const metadata: Metadata = {
  title: "Products",
  description:
    "The production-grade products Reactify Solutions has designed, built, and shipped - from AI catalog tools to privacy-first mobile apps. Explore what we've launched and the impact each one delivers.",
  alternates: { canonical: "/products" },
  openGraph: {
    title: "Products | Reactify Solutions",
    description:
      "The production-grade products Reactify Solutions has designed, built, and shipped. Explore what we've launched and the impact each one delivers.",
    url: "/products",
    images: ["/opengraph-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Products | Reactify Solutions",
    description:
      "The production-grade products Reactify Solutions has designed, built, and shipped.",
  },
};

export default function ProductsPage() {
  const products = productsData.filter((product) => product.visible);

  const baseUrl = "https://www.reactify-solutions.com";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
      {
        "@type": "ListItem",
        position: 2,
        name: "Products",
        item: `${baseUrl}/products`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Breadcrumb
        pageName="Products"
        description="We don't just ship client work - we build and run our own production-grade products. Explore the platforms we've launched, the problems they solve, and the impact they deliver."
      />

      <section className="pb-16 pt-2 md:pb-24">
        <div className="container">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
            {products.map((product) => (
              <ProductGridCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
