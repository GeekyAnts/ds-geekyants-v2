# Carousel

A slide carousel built on [embla-carousel](https://www.embla-carousel.com/) (category-B headless backbone). Embla owns the drag/snap physics and scroll engine; this component owns only the styling (standard semantic utilities) and keyboard arrows.

## Parts

| Part | Role |
|---|---|
| `Carousel` | Root. Sets up embla, provides context, handles `ArrowLeft`/`ArrowRight`. `role="region"` + `aria-roledescription="carousel"`. |
| `CarouselContent` | The scroll viewport + flex track. |
| `CarouselItem` | One slide. `role="group"` + `aria-roledescription="slide"`. Control how many show per view with basis utilities (`basis-1/3`). |
| `CarouselPrevious` / `CarouselNext` | Nav buttons (reuse `Button` `variant="outline" size="icon"`). Auto-disable at the ends. |

## Props (on `Carousel`)

- `opts?: EmblaOptionsType` — embla options (`{ loop: true }`, `{ align: "start" }`, …).
- `plugins?` — embla plugins (e.g. autoplay).
- `orientation?: "horizontal" | "vertical"` — scroll axis. Default `"horizontal"`.
- `setApi?: (api) => void` — receive the embla API instance (for external control / current-slide tracking).

## Constraints

- `CarouselContent`, `CarouselItem`, `CarouselPrevious`, and `CarouselNext` **must** be rendered inside a `Carousel` — they read its context and throw otherwise.
- Nav buttons are absolutely positioned just outside the track (`-left-12` / `-right-12`); give the `Carousel` enough surrounding space, or restyle the buttons via `className`.

## Example

```tsx
<Carousel opts={{ loop: true }} className="w-full max-w-xs">
  <CarouselContent>
    {items.map((item) => (
      <CarouselItem key={item.id}>{/* slide */}</CarouselItem>
    ))}
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>
```
