import type { Meta, StoryObj } from "@storybook/react-vite";
import { withDarkPortalRoot } from "../lib/dark-portal-decorator";
// v2 prototype uses its own 2-tier stylesheet, imported here so the slice is
// self-contained and independent of the stale 3-tier geeklego.css.
import "../../../design-system/v2/index.css";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "./Dialog";
import { Button } from "../Button/Button";

const meta: Meta<typeof Dialog> = {
  title: "v2/Dialog",
  component: Dialog,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj<typeof Dialog>;

/* ── Default — trigger + titled, described content with a footer ─────────────── */
export const Default: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button>Save changes</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

/* ── Destructive confirmation — AlertDialog-shaped use of Dialog ─────────────── */
export const Destructive: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Delete project</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete project?</DialogTitle>
          <DialogDescription>
            This permanently deletes the project and all of its data. This
            action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button variant="destructive">Delete</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

/* ── Long content — Radix scroll lock + the dialog scrolls internally ────────── */
export const ScrollableContent: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Open terms</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Terms of service</DialogTitle>
          <DialogDescription>Please read carefully.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 text-sm text-foreground">
          {Array.from({ length: 12 }).map((_, i) => (
            <p key={i}>
              Section {i + 1}. Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua.
            </p>
          ))}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button>Accept</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

/* ── No built-in close button (showClose={false}) ───────────────────────────── */
export const WithoutCloseButton: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">Open</Button>
      </DialogTrigger>
      <DialogContent showClose={false}>
        <DialogHeader>
          <DialogTitle>Choose an option</DialogTitle>
          <DialogDescription>
            There's no X here — close via a footer action.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button>Got it</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

/* ── Dark theme — semantic override set (the .dark / data-theme test) ─────────
   The portal renders to <body>, so the dark wrapper alone wouldn't reach it.
   Setting both selectors on a wrapper AND keeping the trigger inside it is fine
   for the trigger; for the portalled content we also flag .dark on <html> via
   the parameters below so the popover surface re-themes. */
export const DarkMode: Story = {
  render: () => (
    <div
      data-theme="dark"
      className="dark max-w-2xl rounded-lg bg-background p-8"
    >
      <Dialog>
        <DialogTrigger asChild>
          <Button>Open dialog (dark)</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              The portalled content re-themes from the semantic overrides on the
              documentElement.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="ghost">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button>Save</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Dialog content is portalled to `<body>`, so this story sets `data-theme=\"dark\"` and `.dark` on the document root (decorator) as well as the wrapper, proving the portalled popover surface re-themes from the same Tier-2 semantic overrides.",
      },
    },
  },
  decorators: [withDarkPortalRoot],
};
