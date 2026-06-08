"use client";

import { ReactNode, useEffect, useRef } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { Product } from "./productsData";

interface ProductSelectorProps {
  products: Product[];
  active: number;
  onSelect: (index: number) => void;
  onPrev: () => void;
  onNext: () => void;
  /** Rendered as the auto-advance progress bar beneath the active tab. */
  progressSlot?: ReactNode;
}

/**
 * Horizontal rail of product tabs. Scrolls horizontally when there are more
 * products than fit, so the section stays compact no matter how many we add.
 * The active tab carries the auto-advance progress bar.
 */
const ProductSelector = ({
  products,
  active,
  onSelect,
  onPrev,
  onNext,
  progressSlot,
}: ProductSelectorProps) => {
  const railRef = useRef<HTMLDivElement>(null);
  const activeTabRef = useRef<HTMLButtonElement>(null);

  // Keep the active tab centered in the rail without ever scrolling the page.
  useEffect(() => {
    const tab = activeTabRef.current;
    const rail = railRef.current;
    if (!tab || !rail) return;
    const left = tab.offsetLeft - rail.clientWidth / 2 + tab.clientWidth / 2;
    rail.scrollTo({ left, behavior: "smooth" });
  }, [active]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      onNext();
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      onPrev();
    }
  };

  return (
    <div className="mt-5 flex items-center gap-2 md:mt-6 md:gap-3">
      <button
        type="button"
        onClick={onPrev}
        aria-label="Previous product"
        className="hidden h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-darkBorder bg-darkSurface/70 text-textSecondary transition-colors hover:border-primaryColor/40 hover:text-white sm:flex"
      >
        <HiChevronLeft className="h-5 w-5" />
      </button>

      <div
        ref={railRef}
        role="tablist"
        aria-label="Choose a product"
        onKeyDown={handleKeyDown}
        className="flex flex-1 gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] md:gap-3 [&::-webkit-scrollbar]:hidden"
      >
        {products.map((product, index) => {
          const selected = index === active;
          return (
            <button
              key={product.id}
              ref={selected ? activeTabRef : undefined}
              type="button"
              role="tab"
              aria-selected={selected}
              tabIndex={selected ? 0 : -1}
              onClick={() => onSelect(index)}
              className={`group relative flex-shrink-0 overflow-hidden rounded-xl border px-4 py-2.5 text-left transition-colors duration-300 ${
                selected
                  ? "border-primaryColor/40 bg-darkElevated"
                  : "border-darkBorder bg-darkSurface/50 hover:border-primaryColor/25 hover:bg-darkSurface"
              }`}
            >
              <span className="flex items-center gap-2">
                <span
                  className="h-2 w-2 flex-shrink-0 rounded-full"
                  style={{
                    backgroundColor: product.accentFrom,
                    boxShadow: selected ? `0 0 8px ${product.accentFrom}` : "none",
                  }}
                />
                <span
                  className={`whitespace-nowrap font-display text-sm font-medium ${
                    selected ? "text-white" : "text-textSecondary"
                  }`}
                >
                  {product.name}
                </span>
              </span>
              {selected && progressSlot ? (
                <span className="absolute inset-x-0 bottom-0 block h-[3px] bg-darkBorder/60">
                  {progressSlot}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={onNext}
        aria-label="Next product"
        className="hidden h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-darkBorder bg-darkSurface/70 text-textSecondary transition-colors hover:border-primaryColor/40 hover:text-white sm:flex"
      >
        <HiChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
};

export default ProductSelector;
