"use client";

import Link from "next/link";
import Image from "next/image";
import { HiArrowRight } from "react-icons/hi2";
import { FaCircleCheck } from "react-icons/fa6";
import { FaExternalLinkAlt } from "react-icons/fa";
import { Product } from "./productsData";

const statusLabel = (status: Product["status"]) => {
  if (status === "live") return "live · in production";
  if (status === "beta") return "beta";
  return "coming soon";
};

/**
 * The featured panel for a single product. Purely presentational - the parent
 * decides which product is active. Kept light on purpose: no scroll parallax,
 * no heavy blur filters, and a static status dot instead of an animated ping.
 */
const ProductShowcaseCard = ({
  product,
  priority = false,
}: {
  product: Product;
  priority?: boolean;
}) => {
  const previewStats = product.stats.slice(0, 3);
  const previewFeatures = product.keyFeatures.slice(0, 4);
  const isPortrait = product.imageOrientation === "portrait";

  return (
    <article className="relative overflow-hidden rounded-3xl border border-darkBorder bg-darkSurface/70 p-5 sm:p-6 md:min-h-[460px] md:p-8">
      <div className="grid grid-cols-1 gap-6 md:gap-10 lg:grid-cols-5 lg:items-center">
        <Link
          href={`/products/${product.id}`}
          aria-label={`View ${product.name} details`}
          className="group relative block overflow-hidden rounded-2xl border border-darkBorder bg-darkElevated lg:col-span-3"
        >
          <div className="relative aspect-[16/9] w-full overflow-hidden">
            {isPortrait ? (
              <>
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background: `radial-gradient(circle at 50% 45%, ${product.accentFrom}26, ${product.accentTo}10 45%, transparent 70%)`,
                  }}
                />
                <div className="relative flex h-full w-full items-center justify-center gap-3 p-4 sm:gap-4 sm:p-6">
                  {product.logo && (
                    <div className="hidden aspect-square h-[78%] overflow-hidden rounded-2xl border border-white/10 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)] sm:block">
                      <div className="relative h-full w-full">
                        <Image
                          src={product.logo}
                          alt={`${product.name} logo`}
                          fill
                          sizes="220px"
                          className="object-cover"
                          quality={95}
                        />
                      </div>
                    </div>
                  )}
                  <div className="relative aspect-[9/16] h-[92%]">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 200px, 260px"
                      className="rounded-2xl object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
                      quality={95}
                      priority={priority}
                    />
                  </div>
                </div>
              </>
            ) : (
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 820px"
                className="object-cover object-center"
                quality={95}
                priority={priority}
              />
            )}

            <div
              aria-hidden
              className={`absolute inset-0 ${
                isPortrait
                  ? "bg-gradient-to-t from-dark/70 via-transparent to-transparent"
                  : "bg-gradient-to-t from-dark via-dark/30 to-transparent"
              }`}
            />

            <div className="absolute left-4 top-4 flex items-center gap-2">
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

            <div className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full bg-black/60 px-3 py-1.5 text-xs font-medium text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100 md:text-sm">
              View case study <HiArrowRight className="h-3.5 w-3.5" />
            </div>
          </div>
        </Link>

        <div className="flex flex-col gap-4 lg:col-span-2">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-darkBorder bg-darkSurface/80 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-textSecondary">
              {product.category}
            </div>
            <h3 className="font-display text-2xl font-semibold leading-tight text-white sm:text-3xl md:text-4xl">
              {product.name}
            </h3>
            <p
              className="mt-2 text-base font-medium md:text-lg"
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

          <p className="line-clamp-3 text-sm leading-relaxed text-textSecondary md:text-base">
            {product.briefDescription}
          </p>

          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {previewStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-darkBorder bg-darkElevated/60 px-3 py-2.5 text-center"
              >
                <div className="text-base font-semibold text-white sm:text-lg md:text-xl">
                  {stat.value}
                </div>
                <div className="font-mono text-[9px] uppercase tracking-[0.1em] text-textColor sm:text-[10px]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          <ul className="grid grid-cols-1 gap-1.5 text-sm text-textSecondary sm:grid-cols-2">
            {previewFeatures.map((feat) => (
              <li key={feat} className="flex items-start gap-2">
                <FaCircleCheck
                  className="mt-0.5 h-3.5 w-3.5 flex-shrink-0"
                  style={{ color: product.accentFrom }}
                />
                <span className="leading-snug">{feat}</span>
              </li>
            ))}
          </ul>

          <div className="mt-1 flex flex-col gap-2 sm:flex-row sm:items-center">
            <Link
              href={`/products/${product.id}`}
              className="group/btn inline-flex items-center justify-center gap-2 rounded-xl bg-primaryColor px-5 py-3 text-sm font-semibold text-accentContrast shadow-glowSoft transition-colors duration-300 hover:bg-primaryDark md:text-base"
            >
              View case study
              <HiArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
            </Link>
            {product.productUrl && (
              <Link
                href={product.productUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-darkBorder bg-darkSurface/60 px-5 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:border-primaryColor/40 hover:bg-darkSurface md:text-base"
              >
                Visit site
                <FaExternalLinkAlt className="h-3.5 w-3.5" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProductShowcaseCard;
