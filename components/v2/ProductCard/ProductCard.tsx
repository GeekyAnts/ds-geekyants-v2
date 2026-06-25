"use client";
import { forwardRef } from "react";
import { cn } from "../lib/cn";
import { Card } from "../Card/Card";
import { AspectRatio } from "../AspectRatio/AspectRatio";
import {
  productCardVariants,
  productCardMediaVariants,
} from "./product-card-variants";
import type {
  ProductCardProps,
  ProductCardMediaProps,
  ProductCardBodyProps,
  ProductCardTitleProps,
  ProductCardDescriptionProps,
  ProductCardPriceProps,
  ProductCardFooterProps,
} from "./ProductCard.types";

/**
 * ProductCard — ShadCN pattern on geeklego's 2-tier token system.
 *
 * Composed markup (rung 3) over the shipped Card surface: it reuses Card for the
 * bordered/elevated container and AspectRatio (Radix) for the media frame, then
 * lays out product-specific slots. No focus/keyboard/portal surface of its own,
 * so no new Radix primitive — only its `orientation` layout variant.
 *
 * Compound: <ProductCard><ProductCardMedia/><ProductCardBody><ProductCardTitle/>
 * <ProductCardDescription/><ProductCardPrice/></ProductCardBody>
 * <ProductCardFooter/></ProductCard>. Each part is a thin styled wrapper; the
 * `orientation` prop is threaded to the media so the side-by-side layout sizes
 * the image column correctly.
 */
export const ProductCard = forwardRef<HTMLDivElement, ProductCardProps>(
  ({ className, orientation, ...props }, ref) => (
    <Card
      ref={ref}
      className={cn(productCardVariants({ orientation }), className)}
      {...props}
    />
  ),
);
ProductCard.displayName = "ProductCard";

/**
 * ProductCardMedia — the product image frame. Vertical orientation gives a
 * ratio-constrained full-width image; horizontal gives a fixed-width side
 * column. `children` overlay (e.g. a sale Badge) is positioned over the image.
 */
export const ProductCardMedia = forwardRef<
  HTMLDivElement,
  ProductCardMediaProps
>(
  (
    { className, orientation, src, alt = "", ratio = 4 / 3, imgProps, children, ...props },
    ref,
  ) => {
    const image = src ? (
      <img
        src={src}
        alt={alt}
        {...imgProps}
        className={cn(
          "size-full object-cover transition-transform duration-300 ease-out group-hover:scale-105",
          imgProps?.className,
        )}
      />
    ) : null;

    return (
      <div
        ref={ref}
        className={cn(productCardMediaVariants({ orientation }), className)}
        {...props}
      >
        {orientation === "horizontal" ? (
          <div className="size-full">{image}</div>
        ) : (
          <AspectRatio ratio={ratio}>{image}</AspectRatio>
        )}
        {children != null && <div className="absolute left-3 top-3 z-10">{children}</div>}
      </div>
    );
  },
);
ProductCardMedia.displayName = "ProductCardMedia";

/** ProductCardBody — the text region (title, description, price). */
export const ProductCardBody = forwardRef<HTMLDivElement, ProductCardBodyProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-1 flex-col gap-1.5 p-4", className)}
      {...props}
    />
  ),
);
ProductCardBody.displayName = "ProductCardBody";

/** ProductCardTitle — the product name. Renders an <h3>. */
export const ProductCardTitle = forwardRef<
  HTMLHeadingElement,
  ProductCardTitleProps
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "font-semibold leading-tight tracking-tight text-card-foreground",
      className,
    )}
    {...props}
  />
));
ProductCardTitle.displayName = "ProductCardTitle";

/** ProductCardDescription — supporting copy at the muted-foreground role. */
export const ProductCardDescription = forwardRef<
  HTMLParagraphElement,
  ProductCardDescriptionProps
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
ProductCardDescription.displayName = "ProductCardDescription";

/**
 * ProductCardPrice — the price line. The current price reads at full emphasis;
 * an optional `originalPrice` is struck through at the muted role for discounts.
 */
export const ProductCardPrice = forwardRef<
  HTMLDivElement,
  ProductCardPriceProps
>(({ className, price, originalPrice, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("mt-1 flex items-baseline gap-2", className)}
    {...props}
  >
    <span className="text-lg font-bold text-card-foreground">{price}</span>
    {originalPrice != null && (
      <span className="text-sm text-muted-foreground line-through">
        {originalPrice}
      </span>
    )}
  </div>
));
ProductCardPrice.displayName = "ProductCardPrice";

/** ProductCardFooter — the action row (e.g. an Add-to-cart Button). */
export const ProductCardFooter = forwardRef<
  HTMLDivElement,
  ProductCardFooterProps
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center gap-2 p-4 pt-0", className)}
    {...props}
  />
));
ProductCardFooter.displayName = "ProductCardFooter";
