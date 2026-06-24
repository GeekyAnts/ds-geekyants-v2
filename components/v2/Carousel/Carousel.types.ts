import type { HTMLAttributes } from "react";
import type useEmblaCarousel from "embla-carousel-react";
import type { ButtonProps } from "../Button/Button.types";

// Derive embla's types from the hook itself — the core `embla-carousel` package
// is only a transitive dep, so we never import from it directly.
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type EmblaOptionsType = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];
type CarouselApi = NonNullable<ReturnType<typeof useEmblaCarousel>[1]>;

export interface CarouselProps extends HTMLAttributes<HTMLDivElement> {
  /** Embla options (loop, align, etc.). */
  opts?: EmblaOptionsType;
  /** Embla plugins (autoplay, etc.). */
  plugins?: CarouselPlugin;
  /** Scroll axis. Defaults to horizontal. */
  orientation?: "horizontal" | "vertical";
  /** Receive the embla API instance once initialized. */
  setApi?: (api: CarouselApi) => void;
}

export interface CarouselContextValue {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: ReturnType<typeof useEmblaCarousel>[1];
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
  orientation: "horizontal" | "vertical";
  opts?: EmblaOptionsType;
}

export type CarouselContentProps = HTMLAttributes<HTMLDivElement>;
export type CarouselItemProps = HTMLAttributes<HTMLDivElement>;
export type CarouselPreviousProps = ButtonProps;
export type CarouselNextProps = ButtonProps;

export type { CarouselApi };
