import type { Meta, StoryObj } from "@storybook/react-vite";
import { CalendarDays } from "lucide-react";
import { withDarkPortalRoot } from "../lib/dark-portal-decorator";
// v2 prototype uses its own 2-tier stylesheet, imported here so the slice is
// self-contained and independent of the stale 3-tier geeklego.css.
import "../../../design-system/v2/index.css";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "./HoverCard";
import { Button } from "../Button/Button";
import { Avatar, AvatarFallback, AvatarImage } from "../Avatar/Avatar";

const meta: Meta<typeof HoverCard> = {
  title: "v2/HoverCard",
  component: HoverCard,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj<typeof HoverCard>;

/* ── Default — a user-preview card on a link-styled trigger ──────────────────── */
export const Default: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link">@geekyants</Button>
      </HoverCardTrigger>
      <HoverCardContent>
        <div className="flex gap-3">
          <Avatar>
            <AvatarImage src="https://github.com/geekyants.png" alt="GeekyAnts" />
            <AvatarFallback>GA</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">GeekyAnts</h4>
            <p className="text-sm text-muted-foreground">
              Design-system-first engineering studio.
            </p>
            <div className="flex items-center gap-1 pt-1 text-xs text-muted-foreground">
              <CalendarDays className="size-3" />
              <span>Joined December 2006</span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
};

/* ── Plain text trigger ──────────────────────────────────────────────────────── */
export const TextTrigger: Story = {
  render: () => (
    <p className="max-w-sm text-sm text-foreground">
      Built with{" "}
      <HoverCard>
        <HoverCardTrigger asChild>
          <span className="cursor-default font-medium text-primary underline underline-offset-4">
            GeekLego
          </span>
        </HoverCardTrigger>
        <HoverCardContent className="w-72">
          <p className="text-sm text-muted-foreground">
            An open-source, design-system-first React component library on a
            2-tier token model.
          </p>
        </HoverCardContent>
      </HoverCard>{" "}
      — hover the underlined word.
    </p>
  ),
};

/* ── Placement — content forced above the trigger ────────────────────────────── */
export const TopPlacement: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="outline">Hover me</Button>
      </HoverCardTrigger>
      <HoverCardContent side="top">
        <p className="text-sm">This card opens above its trigger.</p>
      </HoverCardContent>
    </HoverCard>
  ),
};

/* ── Dark theme — content is portalled, so flag the root too ─────────────────── */
export const DarkMode: Story = {
  render: () => (
    <div className="dark max-w-2xl rounded-lg bg-background p-8 text-foreground" data-theme="dark">
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant="link">@geekyants</Button>
        </HoverCardTrigger>
        <HoverCardContent>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">GeekyAnts</h4>
            <p className="text-sm text-muted-foreground">
              The portalled card re-themes from the document-root overrides.
            </p>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "HoverCard content is portalled to `<body>`, so this story sets `data-theme=\"dark\"` and `.dark` on the document root (decorator) as well as the wrapper, proving the portalled surface re-themes from the same Tier-2 semantic overrides.",
      },
    },
  },
  decorators: [withDarkPortalRoot],
};
