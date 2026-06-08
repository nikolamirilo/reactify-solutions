import Link from "next/link";
import Image from "next/image";
import { HiArrowRight } from "react-icons/hi2";
import { Product } from "./productsData";

const statusLabel = (status: Product["status"]) => {
  if (status === "live") return "live · in production";
  if (status === "beta") return "beta";
  return "coming soon";
};

/**
 * Compact product card for the /products listing grid. Server-rendered and
 * intentionally light - a single hover transition, no parallax or blur filters.
 */
const ProductGridCard = ({ product }: { product: Product }) => {
  const isPortrait = product.imageOrientation === "portrait";
  const previewStats = product.stats.slice(0, 3);

  return (
    <Link
      href={`/products/${product.id}`}
      aria-label={`View ${product.name} details`}
      className="group flex flex-col overflow-hidden rounded-3xl border border-darkBorder bg-darkSurface/70 transition-colors duration-300 hover:border-primaryColor/40"
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-darkBorder bg-darkElevated">
        {isPortrait ? (
          <>
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background: `radial-gradient(circle at 50% 45%, ${product.accentFrom}26, ${product.accentTo}10 45%, transparent 70%)`,
              }}
            />
            <div className="relative flex h-full w-full items-center justify-center p-4">
              <div className="relative aspect-[9/16] h-[88%]">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 200px, 240px"
                  className="rounded-xl object-contain drop-shadow-[0_16px_32px_rgba(0,0,0,0.5)]"
                  quality={75}
                />
              </div>
            </div>
          </>
        ) : (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 560px"
            className="object-cover object-center"
            quality={75}
          />
        )}

        <div
          aria-hidden
          className={`absolute inset-0 ${
            isPortrait
              ? "bg-gradient-to-t from-dark/60 via-transparent to-transparent"
              : "bg-gradient-to-t from-dark via-dark/20 to-transparent"
          }`}
        />

        <div className="absolute left-4 top-4">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/50 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-white backdrop-blur-sm">
            <span
              className="inline-flex h-1.5 w-1.5 rounded-full"
              style={{
                backgroundColor: product.accentFrom,
                boxShadow: `0 0 6px ${product.accentFrom}`,
              }}
            />
            {statusLabel(product.status)}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5 md:p-6">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-darkBorder bg-darkSurface/80 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-textSecondary">
            {product.category}
          </div>
          <h3 className="font-display text-2xl font-semibold leading-tight text-white">
            {product.name}
          </h3>
          <p
            className="mt-1.5 text-base font-medium"
            style={{
              backgroundImage: `linear-gradient(90deg, ${product.accentFrom} 0%, ${product.accentTo} 100%)`,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            {product.tagline}
          </p>
        </div>

        <p className="line-clamp-3 text-sm leading-relaxed text-textSecondary">
          {product.briefDescription}
        </p>

        <div className="grid grid-cols-3 gap-2">
          {previewStats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-darkBorder bg-darkElevated/60 px-2 py-2 text-center"
            >
              <div className="text-sm font-semibold text-white sm:text-base">
                {stat.value}
              </div>
              <div className="font-mono text-[9px] uppercase tracking-[0.1em] text-textColor">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-auto inline-flex items-center gap-2 pt-1 text-sm font-semibold text-primaryColor">
          View case study
          <HiArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
};

export default ProductGridCard;
