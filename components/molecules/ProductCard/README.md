# ProductCard

A product display card for e-commerce and catalog UIs. Combines an image, title, price, optional badge overlay, star rating, and a primary call-to-action button.

**Level:** L2 Molecule — imports `Image`, `Badge`, `Rating`, `Button` atoms.

---

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `image` | `string` | — | Product image URL |
| `imageAlt` | `string` | — | Alt text for the image (required) |
| `title` | `string` | — | Product name, rendered as `<h3>` |
| `price` | `string \| number` | — | Current price |
| `originalPrice` | `string \| number` | — | Struck-through was-price |
| `badge` | `ReactNode` | — | Badge atom overlaid on the image |
| `rating` | `number` | — | Star rating 0–5; omit to hide |
| `ratingCount` | `number` | — | Review count shown beside stars |
| `onAddToCart` | `() => void` | — | CTA button handler |
| `ctaLabel` | `string` | `"Add to cart"` | Override CTA text |
| `loading` | `boolean` | `false` | Shows skeleton overlay |
| `disabled` | `boolean` | `false` | Mutes card and disables CTA |
| `href` | `string` | — | Wraps the title in a safe `<a>` link |
| `schema` | `boolean` | `false` | Enables Schema.org `Product` microdata |
| `variant` | `ProductCardVariant` | `'elevated'` | Visual style |
| `size` | `ProductCardSize` | `'md'` | Padding and typography scale |
| `i18nStrings` | `ProductCardI18nStrings` | — | Override system-generated strings |

---

## Variants

| Variant | Treatment |
|---|---|
| `elevated` | Raised surface (`--color-surface-raised`), no border |
| `outlined` | Primary background, visible border |
| `filled` | Secondary background, no border |
| `ghost` | Fully transparent — blends with any background |

---

## Sizes

| Size | Use case |
|---|---|
| `sm` | Compact grids, 3–4 columns |
| `md` | Standard catalog grid, 2–3 columns |
| `lg` | Featured products, single or 2-column |

---

## States

| State | Behaviour |
|---|---|
| Default | Resting appearance, flat surface |
| Loading | Skeleton overlays the image; CTA shows spinner |
| Disabled | 50% opacity, `cursor-not-allowed`, CTA disabled |
| With `href` | Title becomes a focusable link; `sanitizeHref` strips unsafe protocols |

---

## Tokens Used

| Token | Role |
|---|---|
| `--product-card-radius` | Container border radius |
| `--product-card-elevated-bg` | Elevated variant background |
| `--product-card-outlined-bg/border` | Outlined variant surface + border |
| `--product-card-filled-bg` | Filled variant background |
| `--product-card-image-radius` | Image corner radius |
| `--product-card-image-bg` | Image placeholder background |
| `--product-card-badge-inset-*` | Badge overlay position |
| `--product-card-body-padding-*` | Body section spacing (per size) |
| `--product-card-footer-padding-*` | Footer section spacing (per size) |
| `--product-card-title-color` | Title text colour |
| `--product-card-title-color-hover` | Title hover colour when linked |
| `--product-card-price-color` | Current price text colour |
| `--product-card-original-price-color` | Struck-through price colour |
| `--product-card-rating-count-color` | Review count text colour |

---

## Accessibility

**Semantic element:** `<article>` — a self-contained content unit. Screen readers announce it as a distinct item when inside a list or grid.

**Heading:** `<h3>` — assumes the card sits below a page `<h2>` category heading. Adjust via CSS if the heading level needs to differ.

**Link title:** When `href` is provided, the `<a>` carries a `focus-visible` focus ring and is keyboard reachable. The `sanitizeHref` utility strips `javascript:`, `data:text/html`, and `vbscript:` protocols.

**CTA button:** Has an `aria-label` combining the action and product name (e.g. "Add to cart — Premium Minimalist Watch") so screen readers announce full context.

**Loading state:** Root `<article>` receives `aria-busy="true"`. CTA button also receives `aria-busy` via the Button atom.

**Disabled state:** Root `<article>` receives `aria-disabled="true"`. CTA button receives both `disabled` and `aria-disabled`.

**Rating:** Rendered via the Rating atom which uses `<input type="radio">` elements with accessible labels.

**Badge overlay:** Marked `aria-hidden="true"` — decorative; the price differential conveys the sale information textually.

**Original price:** Uses `<del>` element — semantically communicates "removed/old value" to screen readers.

### Keyboard Interaction

| Key | Action |
|---|---|
| `Tab` | Move focus to title link (if `href` set), then CTA button |
| `Enter` / `Space` | Activate focused link or button |

---

## Schema.org

When `schema={true}`, the component renders `Product` microdata:

| Element | `itemProp` | Schema type |
|---|---|---|
| `<article>` | — | `https://schema.org/Product` |
| Title `<h3>` | `name` | — |
| Image `<img>` | `image` | — |
| Price `<span>` | `price` inside `offers` | `https://schema.org/Offer` |
| Rating container | — | `https://schema.org/AggregateRating` |
| Review count | `reviewCount` | — |

```tsx
<ProductCard
  schema
  image="/watch.jpg"
  imageAlt="Watch"
  title="Minimalist Watch"
  price="$149.00"
  rating={4.5}
  ratingCount={128}
/>
```

---

## Usage

```tsx
import { ProductCard } from '@geeklego/ui/components/molecules/ProductCard';
import { Badge } from '@geeklego/ui/components/atoms/Badge';

// Basic
<ProductCard
  image="/products/watch.jpg"
  imageAlt="Minimalist watch on white background"
  title="Premium Minimalist Watch"
  price="$149.00"
  originalPrice="$199.00"
  rating={4}
  ratingCount={128}
  onAddToCart={() => handleAddToCart('watch-1')}
/>

// With badge and link
<ProductCard
  image="/products/sneaker.jpg"
  imageAlt="White sneakers"
  title="Classic Runner Sneaker"
  price="$89.00"
  href="/products/sneaker-classic"
  badge={<Badge variant="soft" color="error" size="sm">20% Off</Badge>}
  onAddToCart={() => handleAddToCart('sneaker-1')}
/>

// In a responsive grid
<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[var(--spacing-layout-sm)]">
  {products.map((p) => (
    <ProductCard key={p.id} {...p} onAddToCart={() => addToCart(p.id)} />
  ))}
</div>
```
