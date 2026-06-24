import type { Meta, StoryObj } from "@storybook/react-vite";
// v2 prototype uses its own 2-tier stylesheet, imported here so the slice is
// self-contained and independent of the stale 3-tier geeklego.css.
import "../../../design-system/v2/index.css";
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuSubContent,
  ContextMenuShortcut,
} from "./ContextMenu";
import { withDarkPortalRoot } from "../lib/dark-portal-decorator";

const meta: Meta<typeof ContextMenu> = {
  title: "v2/ContextMenu",
  component: ContextMenu,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj<typeof ContextMenu>;

const Trigger = () => (
  <ContextMenuTrigger className="flex h-40 w-72 items-center justify-center rounded-md border border-dashed border-border text-sm text-muted-foreground">
    Right-click here
  </ContextMenuTrigger>
);

/* ── Default ──────────────────────────────────────────────────────────────── */
export const Default: Story = {
  render: () => (
    <ContextMenu>
      <Trigger />
      <ContextMenuContent className="w-52">
        <ContextMenuItem>
          Back
          <ContextMenuShortcut>⌘[</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem disabled>
          Forward
          <ContextMenuShortcut>⌘]</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
          Reload
          <ContextMenuShortcut>⌘R</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem>Save as…</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
};

/* ── Full — checkbox / radio / submenu ────────────────────────────────────── */
export const Full: Story = {
  render: () => (
    <ContextMenu>
      <Trigger />
      <ContextMenuContent className="w-56">
        <ContextMenuLabel>Appearance</ContextMenuLabel>
        <ContextMenuCheckboxItem checked>
          Show bookmarks
        </ContextMenuCheckboxItem>
        <ContextMenuCheckboxItem>Show full URLs</ContextMenuCheckboxItem>
        <ContextMenuSeparator />
        <ContextMenuRadioGroup value="medium">
          <ContextMenuLabel inset>Text size</ContextMenuLabel>
          <ContextMenuRadioItem value="small">Small</ContextMenuRadioItem>
          <ContextMenuRadioItem value="medium">Medium</ContextMenuRadioItem>
          <ContextMenuRadioItem value="large">Large</ContextMenuRadioItem>
        </ContextMenuRadioGroup>
        <ContextMenuSeparator />
        <ContextMenuSub>
          <ContextMenuSubTrigger inset>More tools</ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-48">
            <ContextMenuItem>Developer tools</ContextMenuItem>
            <ContextMenuItem>Task manager</ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
      </ContextMenuContent>
    </ContextMenu>
  ),
};

/* ── Dark theme — portalled surface themed via the document root ──────────── */
export const DarkMode: Story = {
  render: () => (
    <div data-theme="dark" className="dark max-w-2xl rounded-lg bg-background p-8 text-foreground">
      <ContextMenu>
        <Trigger />
        <ContextMenuContent className="w-52">
          <ContextMenuItem>
            Back
            <ContextMenuShortcut>⌘[</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem>Reload</ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem>Save as…</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </div>
  ),
  decorators: [withDarkPortalRoot],
  parameters: {
    docs: {
      description: {
        story:
          'The menu content is portalled to `<body>`, so the dark theme must also be flagged on the document root — `withDarkPortalRoot` does that in a `useEffect`. The trigger themes from the wrapping `<div>`; the portalled menu themes from the root.',
      },
    },
  },
};
