import type { Product, ProductStat } from "./productsData";

/**
 * The slice of a product the homepage carousel actually renders.
 *
 * `productsData` carries the full case study for every product - the long
 * description, use cases, pricing tiers, timeline, results and FAQ. None of
 * that appears in the carousel, so it has no business crossing into a client
 * component: importing the module from `"use client"` code ships every word of
 * it to the browser. Projecting to this shape on the server keeps the case
 * study prose server-side.
 */
export interface ProductPreview {
  id: string;
  name: string;
  tagline: string;
  category: string;
  status: Product["status"];
  briefDescription: string;
  image: string;
  imageOrientation?: Product["imageOrientation"];
  logo?: string;
  productUrl?: string;
  accentFrom: string;
  accentTo: string;
  stats: ProductStat[];
  keyFeatures: string[];
}

/** Number of stats and features the showcase card shows. */
const STAT_COUNT = 3;
const FEATURE_COUNT = 4;

export const toProductPreview = (product: Product): ProductPreview => ({
  id: product.id,
  name: product.name,
  tagline: product.tagline,
  category: product.category,
  status: product.status,
  briefDescription: product.briefDescription,
  image: product.images[0],
  imageOrientation: product.imageOrientation,
  logo: product.logo,
  productUrl: product.productUrl,
  accentFrom: product.accentFrom,
  accentTo: product.accentTo,
  stats: product.stats.slice(0, STAT_COUNT),
  keyFeatures: product.keyFeatures.slice(0, FEATURE_COUNT),
});
