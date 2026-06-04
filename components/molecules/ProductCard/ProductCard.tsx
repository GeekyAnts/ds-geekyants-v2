'use client';

import { forwardRef, memo, useMemo } from 'react';
import { ShoppingCart } from 'lucide-react';
import { Button } from '../../atoms/Button/Button';
import { Badge } from '../../atoms/Badge/Badge';
import { Rating } from '../../atoms/Rating/Rating';
import { Image } from '../../atoms/Image/Image';
import { sanitizeHref } from '../../utils/security/sanitize';
import { useComponentI18n } from '../../utils/i18n/useGeeklegoI18n';
import type { ProductCardProps, ProductCardVariant, ProductCardSize } from './ProductCard.types';

const DEFAULT_I18N = {
  addToCart: 'Add to cart',
  reviewsLabel: 'reviews',
  salePriceLabel: 'Sale price',
  originalPriceLabel: 'Original price',
};

const variantClasses: Record<ProductCardVariant, string> = {
  elevated: [
    'bg-[var(--product-card-elevated-bg)]',
    'border-[var(--product-card-elevated-border)]',
  ].join(' '),
  outlined: [
    'bg-[var(--product-card-outlined-bg)]',
    'border-[var(--product-card-outlined-border)]',
  ].join(' '),
  filled: [
    'bg-[var(--product-card-filled-bg)]',
    'border-[var(--product-card-filled-border)]',
  ].join(' '),
  ghost: [
    'bg-[var(--product-card-ghost-bg)]',
    'border-[var(--product-card-ghost-border)]',
  ].join(' '),
};

type SizeTokens = {
  bodyPx: string;
  bodyPt: string;
  bodyGap: string;
  footerPx: string;
  footerPt: string;
  footerPb: string;
  titleText: string;
  priceText: string;
  originalText: string;
  ratingSize: 'sm' | 'md' | 'lg';
  ctaSize: 'sm' | 'md' | 'lg';
};

const sizeTokens: Record<ProductCardSize, SizeTokens> = {
  sm: {
    bodyPx: 'px-[var(--product-card-body-padding-x-sm)]',
    bodyPt: 'pt-[var(--product-card-body-padding-top-sm)]',
    bodyGap: 'gap-[var(--product-card-body-gap-sm)]',
    footerPx: 'px-[var(--product-card-footer-padding-x-sm)]',
    footerPt: 'pt-[var(--product-card-footer-padding-top-sm)]',
    footerPb: 'pb-[var(--product-card-footer-padding-bottom-sm)]',
    titleText: 'text-body-sm',
    priceText: 'text-label-sm',
    originalText: 'text-label-sm',
    ratingSize: 'sm',
    ctaSize: 'sm',
  },
  md: {
    bodyPx: 'px-[var(--product-card-body-padding-x)]',
    bodyPt: 'pt-[var(--product-card-body-padding-top)]',
    bodyGap: 'gap-[var(--product-card-body-gap)]',
    footerPx: 'px-[var(--product-card-footer-padding-x)]',
    footerPt: 'pt-[var(--product-card-footer-padding-top)]',
    footerPb: 'pb-[var(--product-card-footer-padding-bottom)]',
    titleText: 'text-body-md',
    priceText: 'text-label-md',
    originalText: 'text-label-md',
    ratingSize: 'sm',
    ctaSize: 'md',
  },
  lg: {
    bodyPx: 'px-[var(--product-card-body-padding-x-lg)]',
    bodyPt: 'pt-[var(--product-card-body-padding-top-lg)]',
    bodyGap: 'gap-[var(--product-card-body-gap-lg)]',
    footerPx: 'px-[var(--product-card-footer-padding-x-lg)]',
    footerPt: 'pt-[var(--product-card-footer-padding-top-lg)]',
    footerPb: 'pb-[var(--product-card-footer-padding-bottom-lg)]',
    titleText: 'text-body-lg',
    priceText: 'text-label-lg',
    originalText: 'text-label-lg',
    ratingSize: 'md',
    ctaSize: 'lg',
  },
};

export const ProductCard = memo(
  forwardRef<HTMLElement, ProductCardProps>(
    (
      {
        image,
        imageAlt,
        title,
        price,
        originalPrice,
        badge,
        rating,
        ratingCount,
        onAddToCart,
        ctaLabel,
        loading = false,
        disabled = false,
        href,
        schema = false,
        variant = 'elevated',
        size = 'md',
        i18nStrings,
        className,
        ...rest
      },
      ref,
    ) => {
      const i18n = useComponentI18n('productCard', i18nStrings ?? DEFAULT_I18N);

      const safeHref = useMemo(
        () => (href ? sanitizeHref(href) : undefined),
        [href],
      );

      const s = sizeTokens[size];

      const rootClasses = useMemo(
        () =>
          [
            'card-shell',
            'relative flex flex-col overflow-hidden',
            'rounded-[var(--product-card-radius)]',
            'border-[length:var(--product-card-border-width)]',
            variantClasses[variant],
            'transition-default',
            disabled
              ? 'opacity-50 cursor-not-allowed pointer-events-none'
              : 'cursor-pointer',
            className,
          ]
            .filter(Boolean)
            .join(' '),
        [variant, disabled, className],
      );

      const resolvedCtaLabel = ctaLabel ?? i18n.addToCart ?? DEFAULT_I18N.addToCart;

      return (
        <article
          ref={ref}
          className={rootClasses}
          aria-disabled={disabled || undefined}
          aria-busy={loading || undefined}
          {...(schema && {
            itemScope: true,
            itemType: 'https://schema.org/Product',
          })}
          {...rest}
        >
          {/* Image area */}
          <div className="relative">
            <Image
              src={image}
              alt={imageAlt}
              aspectRatio="landscape"
              fit="cover"
              radius="md"
              className="w-full"
              {...(schema && { itemProp: 'image' })}
            />

            {/* Badge overlay */}
            {badge && (
              <div
                className="absolute top-[var(--product-card-badge-inset-top)] start-[var(--product-card-badge-inset-start)]"
                aria-hidden="true"
              >
                {badge}
              </div>
            )}

            {/* Loading skeleton overlay */}
            {loading && (
              <div
                className="skeleton absolute inset-0 rounded-[var(--product-card-image-radius)]"
                aria-hidden="true"
              />
            )}
          </div>

          {/* Body */}
          <div
            className={[
              'flex flex-col',
              s.bodyPx,
              s.bodyPt,
              s.bodyGap,
            ].join(' ')}
          >
            {/* Title */}
            <h3
              className={[
                s.titleText,
                'font-semibold',
                'text-[var(--product-card-title-color)]',
                href
                  ? 'hover:text-[var(--product-card-title-color-hover)] transition-default'
                  : '',
              ]
                .filter(Boolean)
                .join(' ')}
              {...(schema && { itemProp: 'name' })}
            >
              {safeHref ? (
                <a
                  href={safeHref}
                  className="focus-visible:outline-none focus-visible:focus-ring rounded-[var(--radius-component-sm)]"
                  tabIndex={disabled ? -1 : undefined}
                >
                  <span className="truncate-label">{title}</span>
                </a>
              ) : (
                <span className="truncate-label">{title}</span>
              )}
            </h3>

            {/* Price row */}
            <div
              className={[
                'flex items-baseline',
                'gap-[var(--product-card-price-gap)]',
              ].join(' ')}
            >
              <span
                className={[
                  s.priceText,
                  'font-semibold',
                  'text-[var(--product-card-price-color)]',
                ].join(' ')}
                aria-label={`${i18n.salePriceLabel ?? DEFAULT_I18N.salePriceLabel} ${price}`}
                {...(schema && {
                  itemProp: 'offers',
                  itemScope: true,
                  itemType: 'https://schema.org/Offer',
                })}
              >
                <span {...(schema && { itemProp: 'price' })}>{price}</span>
              </span>

              {originalPrice !== undefined && (
                <del
                  className={[
                    s.originalText,
                    'text-[var(--product-card-original-price-color)]',
                  ].join(' ')}
                  aria-label={`${i18n.originalPriceLabel ?? DEFAULT_I18N.originalPriceLabel} ${originalPrice}`}
                >
                  {originalPrice}
                </del>
              )}
            </div>

            {/* Rating row */}
            {rating !== undefined && (
              <div
                className="flex items-center gap-[var(--product-card-rating-gap)]"
                {...(schema && {
                  itemProp: 'aggregateRating',
                  itemScope: true,
                  itemType: 'https://schema.org/AggregateRating',
                })}
              >
                <Rating
                  value={rating}
                  readOnly
                  size={s.ratingSize}
                  schema={schema}
                />
                {ratingCount !== undefined && (
                  <span
                    className={[
                      'text-caption-md',
                      'text-[var(--product-card-rating-count-color)]',
                    ].join(' ')}
                    {...(schema && { itemProp: 'reviewCount' })}
                  >
                    ({ratingCount}{' '}
                    {i18n.reviewsLabel ?? DEFAULT_I18N.reviewsLabel})
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Footer / CTA */}
          <div
            className={[
              'mt-auto',
              s.footerPx,
              s.footerPt,
              s.footerPb,
            ].join(' ')}
          >
            <Button
              variant="primary"
              size={s.ctaSize}
              disabled={disabled}
              loading={loading}
              onClick={onAddToCart}
              leftIcon={
                <ShoppingCart
                  size="var(--size-icon-sm)"
                  aria-hidden="true"
                />
              }
              className="w-full"
              aria-label={`${resolvedCtaLabel} — ${title}`}
            >
              {resolvedCtaLabel}
            </Button>
          </div>
        </article>
      );
    },
  ),
);

ProductCard.displayName = 'ProductCard';
