import type { Meta, StoryObj } from "@storybook/react-vite";
// v2 prototype uses its own 2-tier stylesheet, imported here so the slice is
// self-contained and independent of the stale 3-tier geeklego.css.
import "../../../design-system/v2/index.css";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "./Carousel";
import { Card, CardContent } from "../Card/Card";

const meta: Meta<typeof Carousel> = {
  title: "v2/Carousel",
  component: Carousel,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj<typeof Carousel>;

const Slide = ({ n }: { n: number }) => (
  <Card>
    <CardContent className="flex aspect-square items-center justify-center p-6 pt-6">
      <span className="text-4xl font-semibold">{n}</span>
    </CardContent>
  </Card>
);

/* ── Default — one slide at a time ────────────────────────────────────────── */
export const Default: Story = {
  render: () => (
    <Carousel className="w-full max-w-xs">
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, i) => (
          <CarouselItem key={i}>
            <Slide n={i + 1} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
};

/* ── Multiple per view ────────────────────────────────────────────────────── */
export const MultipleItems: Story = {
  render: () => (
    <Carousel opts={{ align: "start" }} className="w-full max-w-md">
      <CarouselContent>
        {Array.from({ length: 8 }).map((_, i) => (
          <CarouselItem key={i} className="basis-1/3">
            <Slide n={i + 1} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
};

/* ── Looping ──────────────────────────────────────────────────────────────── */
export const Loop: Story = {
  render: () => (
    <Carousel opts={{ loop: true }} className="w-full max-w-xs">
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, i) => (
          <CarouselItem key={i}>
            <Slide n={i + 1} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
};

/* ── Dark theme — semantic override set (the .dark / data-theme test) ────────── */
export const DarkMode: Story = {
  render: () => (
    <div data-theme="dark" className="dark max-w-2xl rounded-lg bg-background p-12 text-foreground">
      <Carousel className="w-full max-w-xs">
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, i) => (
            <CarouselItem key={i}>
              <Slide n={i + 1} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Carousel under a dark theme. The wrapper sets both data-theme="dark" and .dark; the card slides and outline nav buttons re-theme from Tier-2 semantics. Not portalled, so no document-root toggle is needed.',
      },
    },
  },
};
