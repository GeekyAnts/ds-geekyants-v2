import type { HTMLAttributes, ImgHTMLAttributes, ReactNode } from "react";
import type { ProductCardVariantProps } from "./product-card-variants";

export interface ProductCardProps
  extends HTMLAttributes<HTMLDivElement>,
    ProductCardVariantProps {}

export interface ProductCardMediaProps
  extends HTMLAttributes<HTMLDivElement>,
    ProductCardVariantProps {
  /** Image source; rendered into a ratio-constrained <img>. */
  src?: string;
  alt?: string;
  /** Width/height ratio for the media frame (e.g. 4 / 3). */
  ratio?: number;
  /** Pass-through to the underlying <img> (loading, sizes, …). */
  imgProps?: ImgHTMLAttributes<HTMLImageElement>;
  /** Overlay content (e.g. a sale Badge), absolutely positioned over the image. */
  children?: ReactNode;
}

export type ProductCardBodyProps = HTMLAttributes<HTMLDivElement>;
export type ProductCardTitleProps = HTMLAttributes<HTMLHeadingElement>;
export type ProductCardDescriptionProps = HTMLAttributes<HTMLParagraphElement>;

export interface ProductCardPriceProps extends HTMLAttributes<HTMLDivElement> {
  /** Current price, pre-formatted (e.g. "$49.00"). */
  price: ReactNode;
  /** Optional struck-through original price for a discount. */
  originalPrice?: ReactNode;
}

export type ProductCardFooterProps = HTMLAttributes<HTMLDivElement>;
