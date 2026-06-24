import type { Meta, StoryObj } from "@storybook/react-vite";
// v2 prototype uses its own 2-tier stylesheet, imported here so the slice is
// self-contained and independent of the stale 3-tier geeklego.css.
import "../../../design-system/v2/index.css";
import type { ComponentProps } from "react";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
} from "./Drawer";
import { Button } from "../Button/Button";
import { withDarkPortalRoot } from "../lib/dark-portal-decorator";

const meta: Meta<typeof Drawer> = {
  title: "v2/Drawer",
  component: Drawer,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj<typeof Drawer>;

type Direction = ComponentProps<typeof Drawer>["direction"];

/** One reusable drawer demo, parameterized by direction. */
function DrawerDemo({ direction }: { direction?: Direction }) {
  const label = direction ?? "bottom";
  return (
    <Drawer direction={direction}>
      <DrawerTrigger asChild>
        <Button variant="outline">Open {label} drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Move goal</DrawerTitle>
            <DrawerDescription>
              Set your daily activity goal. Drag the {label} edge to dismiss.
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 text-sm text-muted-foreground">
            Drawer body content goes here.
          </div>
          <DrawerFooter>
            <Button>Submit</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

/* ── Bottom (default) ─────────────────────────────────────────────────────── */
export const Bottom: Story = {
  render: () => <DrawerDemo direction="bottom" />,
};

/* ── Top ──────────────────────────────────────────────────────────────────── */
export const Top: Story = {
  render: () => <DrawerDemo direction="top" />,
};

/* ── Left ─────────────────────────────────────────────────────────────────── */
export const Left: Story = {
  render: () => <DrawerDemo direction="left" />,
};

/* ── Right ────────────────────────────────────────────────────────────────── */
export const Right: Story = {
  render: () => <DrawerDemo direction="right" />,
};

/* ── Dark theme — portalled surface themed via the document root ──────────── */
export const DarkMode: Story = {
  render: () => (
    <div data-theme="dark" className="dark max-w-2xl rounded-lg bg-background p-8 text-foreground">
      <DrawerDemo direction="right" />
    </div>
  ),
  decorators: [withDarkPortalRoot],
  parameters: {
    docs: {
      description: {
        story:
          'A right-side drawer under a dark theme. The sheet is portalled to `<body>`, so the dark theme must also be flagged on the document root — `withDarkPortalRoot` does that in a `useEffect`. DrawerContent positions itself off vaul\'s `data-vaul-drawer-direction` attribute, so the same component renders top / bottom / left / right correctly.',
      },
    },
  },
};
