import Link from "next/link";
import { HiArrowRight } from "react-icons/hi2";
import SectionTitle from "../Common/SectionTitle";
import ProductsCarousel from "./ProductsCarousel";
import productsData from "./productsData";
import { toProductPreview } from "./productPreview";

// Server Component on purpose. `productsData` holds the full case study for
// every product - long descriptions, use cases, pricing, timeline, results and
// FAQ - and importing it from a client component shipped all of that to the
// browser for a carousel that only shows a name, a tagline and a few bullets.
// Projecting to previews here keeps the prose on the server and sends only what
// the carousel renders across the client boundary.
const Products = () => {
  const products = productsData
    .filter((product) => product.visible)
    .map(toProductPreview);

  if (products.length === 0) return null;

  return (
    <section
      id="products"
      className="relative overflow-hidden py-16 md:py-20 lg:py-28"
    >
      {/* Static radial glow - cheaper than a large blur filter on weak GPUs. */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[880px] -translate-x-1/2"
        style={{
          background:
            "radial-gradient(closest-side, rgb(var(--color-accent) / 0.10), transparent)",
        }}
      />

      <div className="container relative flex flex-col items-center justify-center">
        <SectionTitle
          title="Our Products"
          paragraph="We don't just ship client work - we build and run our own production-grade products. Explore the platforms we've launched, the problems they solve, and the impact they deliver."
          center
        />

        <ProductsCarousel products={products} />

        <Link
          href="/products"
          className="group mt-8 inline-flex items-center gap-2 rounded-xl border border-darkBorder bg-darkSurface/60 px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-300 hover:border-primaryColor/40 hover:bg-darkSurface md:mt-10"
        >
          Browse all products
          <HiArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
};

export default Products;
