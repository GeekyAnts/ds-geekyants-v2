import type { Meta, StoryObj } from "@storybook/react-vite";
// v2 prototype uses its own 2-tier stylesheet, imported here so the slice is
// self-contained and independent of the stale 3-tier geeklego.css.
import "../../../design-system/v2/index.css";
import { ShoppingCart } from "lucide-react";
import {
  ProductCard,
  ProductCardMedia,
  ProductCardBody,
  ProductCardTitle,
  ProductCardDescription,
  ProductCardPrice,
  ProductCardFooter,
} from "./ProductCard";
import { Badge } from "../Badge/Badge";
import { Button } from "../Button/Button";

const meta: Meta<typeof ProductCard> = {
  title: "v2/ProductCard",
  component: ProductCard,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj<typeof ProductCard>;

const IMG = "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80";

/* ── Default — vertical card ─────────────────────────────────────────────────── */
export const Default: Story = {
  render: () => (
    <ProductCard className="w-72">
      <ProductCardMedia src={IMG} alt="Red running shoe" />
      <ProductCardBody>
        <ProductCardTitle>Aero Runner</ProductCardTitle>
        <ProductCardDescription>
          Lightweight everyday running shoe with responsive cushioning.
        </ProductCardDescription>
        <ProductCardPrice price="$129.00" />
      </ProductCardBody>
      <ProductCardFooter>
        <Button className="w-full">
          <ShoppingCart /> Add to cart
        </Button>
      </ProductCardFooter>
    </ProductCard>
  ),
};

/* ── On sale — overlay Badge + struck-through original price ──────────────────── */
export const OnSale: Story = {
  render: () => (
    <ProductCard className="w-72">
      <ProductCardMedia src={IMG} alt="Red running shoe">
        <Badge variant="destructive">-30%</Badge>
      </ProductCardMedia>
      <ProductCardBody>
        <ProductCardTitle>Aero Runner</ProductCardTitle>
        <ProductCardDescription>
          Lightweight everyday running shoe with responsive cushioning.
        </ProductCardDescription>
        <ProductCardPrice price="$90.30" originalPrice="$129.00" />
      </ProductCardBody>
      <ProductCardFooter>
        <Button className="w-full">
          <ShoppingCart /> Add to cart
        </Button>
      </ProductCardFooter>
    </ProductCard>
  ),
};

/* ── Horizontal — side-by-side media column ──────────────────────────────────── */
export const Horizontal: Story = {
  render: () => (
    <ProductCard orientation="horizontal" className="w-full max-w-md">
      <ProductCardMedia orientation="horizontal" src={IMG} alt="Red running shoe" />
      <div className="flex flex-1 flex-col">
        <ProductCardBody>
          <ProductCardTitle>Aero Runner</ProductCardTitle>
          <ProductCardDescription>
            Lightweight everyday running shoe with responsive cushioning.
          </ProductCardDescription>
          <ProductCardPrice price="$129.00" />
        </ProductCardBody>
        <ProductCardFooter>
          <Button size="sm">
            <ShoppingCart /> Add to cart
          </Button>
        </ProductCardFooter>
      </div>
    </ProductCard>
  ),
};

/* ── Grid — a row of products ────────────────────────────────────────────────── */
export const Grid: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4">
      {["Aero Runner", "Trail Blazer", "City Walker", "Court Ace"].map((name, i) => (
        <ProductCard key={name} className="w-56">
          <ProductCardMedia src={IMG} alt={name} />
          <ProductCardBody>
            <ProductCardTitle>{name}</ProductCardTitle>
            <ProductCardPrice price={`$${99 + i * 10}.00`} />
          </ProductCardBody>
          <ProductCardFooter>
            <Button size="sm" variant="outline" className="w-full">
              View
            </Button>
          </ProductCardFooter>
        </ProductCard>
      ))}
    </div>
  ),
};

/* ── Dark theme ──────────────────────────────────────────────────────────────── */
export const DarkMode: Story = {
  render: () => (
    <div className="dark max-w-2xl rounded-lg bg-background p-8 text-foreground" data-theme="dark">
      <ProductCard className="w-72">
        <ProductCardMedia src={IMG} alt="Red running shoe">
          <Badge variant="destructive">-30%</Badge>
        </ProductCardMedia>
        <ProductCardBody>
          <ProductCardTitle>Aero Runner</ProductCardTitle>
          <ProductCardDescription>
            Lightweight everyday running shoe with responsive cushioning.
          </ProductCardDescription>
          <ProductCardPrice price="$90.30" originalPrice="$129.00" />
        </ProductCardBody>
        <ProductCardFooter>
          <Button className="w-full">
            <ShoppingCart /> Add to cart
          </Button>
        </ProductCardFooter>
      </ProductCard>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'ProductCard under a dark theme. The wrapper sets both `data-theme="dark"` and `.dark`; the card surface, text and price re-theme from the standard card/foreground/muted semantics. ProductCard is not portalled, so a plain dark wrapper is sufficient.',
      },
    },
  },
};
