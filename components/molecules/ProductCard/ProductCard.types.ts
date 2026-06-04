import type { HTMLAttributes, ReactNode } from 'react';

export type ProductCardVariant = 'elevated' | 'outlined' | 'filled' | 'ghost';
export type ProductCardSize = 'sm' | 'md' | 'lg';

export interface ProductCardI18nStrings {
  /** Label for the add-to-cart button when no ctaLabel is provided. Defaults to "Add to cart". */
  addToCart?: string;
  /** Screen reader label for the review count. e.g. "reviews". Defaults to "reviews". */
  reviewsLabel?: string;
  /** Screen reader label for the sale price. Defaults to "Sale price". */
  salePriceLabel?: string;
  /** Screen reader label for the original price. Defaults to "Original price". */
  originalPriceLabel?: string;
}

export interface ProductCardProps extends HTMLAttributes<HTMLElement> {
  /** Product image URL. */
  image: string;
  /** Alt text for the product image. Required for accessibility. */
  imageAlt: string;
  /** Product name. Rendered as an <h3>. */
  title: string;
  /** Current price, displayed prominently. */
  price: string | number;
  /** Original / was-price. Renders struck-through next to the current price. */
  originalPrice?: string | number;
  /** Optional Badge node overlaid on the image (e.g. "Sale", "New"). */
  badge?: ReactNode;
  /** Star rating 0–5. Omit to hide the rating row. */
  rating?: number;
  /** Number of reviews shown alongside the rating. */
  ratingCount?: number;
  /** Called when the CTA button is activated. */
  onAddToCart?: () => void;
  /** Overrides the default "Add to cart" button label. Also accepts an i18nStrings override. */
  ctaLabel?: string;
  /** Loading state — shows skeleton overlay on the card. */
  loading?: boolean;
  /** Disabled state — mutes the card and disables the CTA. */
  disabled?: boolean;
  /**
   * When provided, wraps the title in a sanitized <a> link.
   * Unsafe protocols (javascript:, data:) are stripped automatically.
   */
  href?: string;
  /** Enables Schema.org Product microdata. Defaults to false. */
  schema?: boolean;
  /** Visual style variant. Defaults to 'elevated'. */
  variant?: ProductCardVariant;
  /** Overall size — controls padding and typography scale. Defaults to 'md'. */
  size?: ProductCardSize;
  /** i18n string overrides for system-generated text. */
  i18nStrings?: ProductCardI18nStrings;
}
