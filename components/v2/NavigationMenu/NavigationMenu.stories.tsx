import type { Meta, StoryObj } from "@storybook/react-vite";
import { withDarkPortalRoot } from "../lib/dark-portal-decorator";
// v2 prototype uses its own 2-tier stylesheet, imported here so the slice is
// self-contained and independent of the stale 3-tier geeklego.css.
import "../../../design-system/v2/index.css";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "./NavigationMenu";

const meta: Meta<typeof NavigationMenu> = {
  title: "v2/NavigationMenu",
  component: NavigationMenu,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj<typeof NavigationMenu>;

const components = [
  { title: "Alert Dialog", desc: "A modal dialog that interrupts with important content." },
  { title: "Hover Card", desc: "For sighted users to preview content behind a link." },
  { title: "Progress", desc: "Displays a completion indicator for a task." },
  { title: "Tabs", desc: "Layered sections of content shown one at a time." },
];

/* ── Default — a trigger with a panel + a plain styled link ──────────────────── */
export const Default: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Components</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-128 grid-cols-2 gap-3 p-2">
              {components.map((c) => (
                <li key={c.title}>
                  <NavigationMenuLink href="#">
                    <div className="text-sm font-medium text-foreground">
                      {c.title}
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{c.desc}</p>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="w-80 p-2">
              <li>
                <NavigationMenuLink href="#">
                  <div className="text-sm font-medium text-foreground">
                    Introduction
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    A design-system-first React component library.
                  </p>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink href="#">
                  <div className="text-sm font-medium text-foreground">
                    Installation
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    How to install and set up the library.
                  </p>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink href="#" className={navigationMenuTriggerStyle()}>
            Docs
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
};

/* ── Simple link bar — no dropdowns, just styled links ───────────────────────── */
export const LinkBar: Story = {
  render: () => (
    <NavigationMenu viewport={false}>
      <NavigationMenuList>
        {["Home", "Pricing", "Blog", "Contact"].map((label) => (
          <NavigationMenuItem key={label}>
            <NavigationMenuLink href="#" className={navigationMenuTriggerStyle()}>
              {label}
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  ),
};

/* ── Dark theme — the viewport panel is positioned, flag the root too ────────── */
export const DarkMode: Story = {
  render: () => (
    <div className="dark flex min-h-72 max-w-2xl justify-center rounded-lg bg-background p-8 text-foreground" data-theme="dark">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Components</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-128 grid-cols-2 gap-3 p-2">
                {components.map((c) => (
                  <li key={c.title}>
                    <NavigationMenuLink href="#">
                      <div className="text-sm font-medium text-foreground">
                        {c.title}
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {c.desc}
                      </p>
                    </NavigationMenuLink>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="#" className={navigationMenuTriggerStyle()}>
              Docs
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "The open panel renders in a positioned viewport; this story sets `data-theme=\"dark\"` and `.dark` on the document root (decorator) plus the wrapper so the panel re-themes from the same Tier-2 semantic overrides.",
      },
    },
  },
  decorators: [withDarkPortalRoot],
};
