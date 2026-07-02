import * as react from 'react';
import { ComponentPropsWithoutRef, HTMLAttributes, LiHTMLAttributes, OlHTMLAttributes, ButtonHTMLAttributes, ComponentProps, ReactNode, InputHTMLAttributes, ImgHTMLAttributes, AnchorHTMLAttributes, TableHTMLAttributes, TdHTMLAttributes, ThHTMLAttributes } from 'react';
import * as RadixAccordion from '@radix-ui/react-accordion';
import * as class_variance_authority_types from 'class-variance-authority/types';
import { VariantProps } from 'class-variance-authority';
import * as react_jsx_runtime from 'react/jsx-runtime';
import * as RadixAlertDialog from '@radix-ui/react-alert-dialog';
import * as RadixAspectRatio from '@radix-ui/react-aspect-ratio';
import * as RadixAvatar from '@radix-ui/react-avatar';
import { DayPicker } from 'react-day-picker';
import useEmblaCarousel from 'embla-carousel-react';
import * as recharts from 'recharts';
import { ResponsiveContainer, Tooltip as Tooltip$1 } from 'recharts';
import * as RadixCheckbox from '@radix-ui/react-checkbox';
import * as RadixCollapsible from '@radix-ui/react-collapsible';
import { Command as Command$1 } from 'cmdk';
import * as RadixContextMenu from '@radix-ui/react-context-menu';
import { ColumnDef } from '@tanstack/react-table';
import * as RadixDialog from '@radix-ui/react-dialog';
import * as vaul from 'vaul';
import { Drawer as Drawer$1 } from 'vaul';
import * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu';
import * as react_hook_form from 'react-hook-form';
import { FieldValues, FieldPath, ControllerProps } from 'react-hook-form';
import * as RadixLabel from '@radix-ui/react-label';
import * as RadixHoverCard from '@radix-ui/react-hover-card';
import { OTPInput } from 'input-otp';
import * as RadixMenubar from '@radix-ui/react-menubar';
import * as RadixNavigationMenu from '@radix-ui/react-navigation-menu';
import * as RadixPopover from '@radix-ui/react-popover';
import * as RadixProgress from '@radix-ui/react-progress';
import { Separator as Separator$1, Panel, Group } from 'react-resizable-panels';
import * as RadixScrollArea from '@radix-ui/react-scroll-area';
import * as RadixSelect from '@radix-ui/react-select';
import * as RadixSeparator from '@radix-ui/react-separator';
import { Toaster as Toaster$1 } from 'sonner';
export { toast } from 'sonner';
import * as RadixSwitch from '@radix-ui/react-switch';
import * as RadixTabs from '@radix-ui/react-tabs';
import * as RadixToggle from '@radix-ui/react-toggle';
import * as RadixToggleGroup from '@radix-ui/react-toggle-group';
import * as RadixTooltip from '@radix-ui/react-tooltip';

/**
 * Accordion — ShadCN/Radix compound component on geeklego's 2-tier tokens.
 *
 * Radix owns ALL behavior — single/multiple open, `collapsible`, the
 * aria-expanded / aria-controls wiring, keyboard nav (arrows/Home/End), and the
 * --radix-accordion-content-height measurement that drives the open/close
 * animation. We only supply the look, via standard semantic utilities
 * (border-border, text-foreground, text-muted-foreground, ring-ring …).
 *
 * Styling note: no component-token tier and no --ext-* tokens — disclosure is
 * plain ShadCN vocabulary. The expand/collapse motion animates off Radix's
 * data-[state] attributes + the height CSS var, so no animation library.
 */
declare const Accordion: react.ForwardRefExoticComponent<(RadixAccordion.AccordionSingleProps | RadixAccordion.AccordionMultipleProps) & react.RefAttributes<HTMLDivElement>>;
declare const AccordionItem: react.ForwardRefExoticComponent<Omit<RadixAccordion.AccordionItemProps & react.RefAttributes<HTMLDivElement>, "ref"> & react.RefAttributes<HTMLDivElement>>;
declare const AccordionTrigger: react.ForwardRefExoticComponent<Omit<RadixAccordion.AccordionTriggerProps & react.RefAttributes<HTMLButtonElement>, "ref"> & react.RefAttributes<HTMLButtonElement>>;
declare const AccordionContent: react.ForwardRefExoticComponent<Omit<RadixAccordion.AccordionContentProps & react.RefAttributes<HTMLDivElement>, "ref"> & react.RefAttributes<HTMLDivElement>>;

/**
 * Props extend the matching Radix Accordion part, so every native + Radix prop
 * flows through unchanged — `type` ("single" | "multiple"), `collapsible`,
 * `value` / `defaultValue` / `onValueChange`, `disabled`, `orientation`, etc.
 * We add nothing of our own; Accordion is pure restyle over the Radix behavior.
 */
type AccordionProps = ComponentPropsWithoutRef<typeof RadixAccordion.Root>;
type AccordionItemProps = ComponentPropsWithoutRef<typeof RadixAccordion.Item>;
type AccordionTriggerProps = ComponentPropsWithoutRef<typeof RadixAccordion.Trigger>;
type AccordionContentProps = ComponentPropsWithoutRef<typeof RadixAccordion.Content>;

/**
 * Alert variants — ShadCN pattern on geeklego's 2-tier semantics.
 *
 * Both variants use ONLY standard ShadCN/Tailwind semantic utilities — zero
 * custom vocabulary. `default` reads as a quiet bordered surface on the page
 * background; `destructive` recolors text, border, and icon via the standard
 * --destructive role.
 *
 * The grid layout reserves an optional leading-icon column: when an <svg> is
 * the first child it occupies the col-start-1 track, and the title/description
 * flow in column 2 — matching the canonical ShadCN Alert composition.
 */
declare const alertVariants: (props?: ({
    variant?: "default" | "destructive" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type AlertVariantProps = VariantProps<typeof alertVariants>;

interface AlertProps extends HTMLAttributes<HTMLDivElement>, AlertVariantProps {
}
type AlertTitleProps = HTMLAttributes<HTMLDivElement>;
type AlertDescriptionProps = HTMLAttributes<HTMLDivElement>;

/**
 * Alert — ShadCN/Radix pattern on geeklego's 2-tier token system.
 *
 * A static, non-interactive callout: a `role="alert"` region with an optional
 * leading icon (pass any <svg> as the first child) plus AlertTitle /
 * AlertDescription slots. Styled entirely with standard semantic utilities
 * (bg-background, text-foreground, text-destructive, border-border) — no
 * focus/keyboard surface, so no Radix primitive is needed.
 *
 * Compound: <Alert><AlertIcon/><AlertTitle/><AlertDescription/></Alert>, using
 * named sub-component exports rather than a hand-rolled context.
 */
declare const Alert: react.ForwardRefExoticComponent<AlertProps & react.RefAttributes<HTMLDivElement>>;
/**
 * AlertTitle — the heading line of an Alert. Renders a styled <div> (not a
 * heading element) so it never disrupts the page's heading outline; emphasis
 * comes from weight, not semantics.
 */
declare const AlertTitle: react.ForwardRefExoticComponent<AlertTitleProps & react.RefAttributes<HTMLDivElement>>;
/**
 * AlertDescription — the supporting body text of an Alert, rendered at the
 * muted-foreground role so it sits below the title in emphasis.
 */
declare const AlertDescription: react.ForwardRefExoticComponent<AlertDescriptionProps & react.RefAttributes<HTMLDivElement>>;

/**
 * Props extend the matching Radix AlertDialog parts, so every native + Radix
 * prop (onOpenChange, onEscapeKeyDown, etc.) flows through unchanged. No variant
 * axis — each part is a thin styled wrapper; Radix owns the modal behavior.
 *
 * Note: an alert dialog deliberately has NO dismiss-on-click-outside and NO
 * close-X — it requires an explicit Action or Cancel choice (role=alertdialog).
 */
type AlertDialogOverlayProps = ComponentPropsWithoutRef<typeof RadixAlertDialog.Overlay>;
type AlertDialogContentProps = ComponentPropsWithoutRef<typeof RadixAlertDialog.Content>;
type AlertDialogTitleProps = ComponentPropsWithoutRef<typeof RadixAlertDialog.Title>;
type AlertDialogDescriptionProps = ComponentPropsWithoutRef<typeof RadixAlertDialog.Description>;
type AlertDialogActionProps = ComponentPropsWithoutRef<typeof RadixAlertDialog.Action>;
type AlertDialogCancelProps = ComponentPropsWithoutRef<typeof RadixAlertDialog.Cancel>;
type AlertDialogHeaderProps = HTMLAttributes<HTMLDivElement>;
type AlertDialogFooterProps = HTMLAttributes<HTMLDivElement>;

/**
 * AlertDialog — ShadCN/Radix compound component on geeklego's 2-tier tokens.
 *
 * A confirmation prompt: Radix owns ALL behavior — focus trap, escape, scroll
 * lock, portal, and the role="alertdialog" / aria-labelledby / aria-describedby
 * wiring (the last via Title/Description). Unlike Dialog it does NOT dismiss on
 * click-outside and has no close-X: the user must pick Action or Cancel. We only
 * supply the look via standard semantic utilities (bg-popover, border-border).
 * The Action/Cancel buttons reuse Button's buttonVariants so they match the
 * library's buttons exactly (Action = default, Cancel = outline).
 */
declare const AlertDialog: react.FC<RadixAlertDialog.AlertDialogProps>;
declare const AlertDialogTrigger: react.ForwardRefExoticComponent<RadixAlertDialog.AlertDialogTriggerProps & react.RefAttributes<HTMLButtonElement>>;
declare const AlertDialogPortal: react.FC<RadixAlertDialog.AlertDialogPortalProps>;
declare const AlertDialogOverlay: react.ForwardRefExoticComponent<Omit<RadixAlertDialog.AlertDialogOverlayProps & react.RefAttributes<HTMLDivElement>, "ref"> & react.RefAttributes<HTMLDivElement>>;
declare const AlertDialogContent: react.ForwardRefExoticComponent<Omit<RadixAlertDialog.AlertDialogContentProps & react.RefAttributes<HTMLDivElement>, "ref"> & react.RefAttributes<HTMLDivElement>>;
declare const AlertDialogHeader: {
    ({ className, ...props }: AlertDialogHeaderProps): react_jsx_runtime.JSX.Element;
    displayName: string;
};
declare const AlertDialogFooter: {
    ({ className, ...props }: AlertDialogFooterProps): react_jsx_runtime.JSX.Element;
    displayName: string;
};
declare const AlertDialogTitle: react.ForwardRefExoticComponent<Omit<RadixAlertDialog.AlertDialogTitleProps & react.RefAttributes<HTMLHeadingElement>, "ref"> & react.RefAttributes<HTMLHeadingElement>>;
declare const AlertDialogDescription: react.ForwardRefExoticComponent<Omit<RadixAlertDialog.AlertDialogDescriptionProps & react.RefAttributes<HTMLParagraphElement>, "ref"> & react.RefAttributes<HTMLParagraphElement>>;
declare const AlertDialogAction: react.ForwardRefExoticComponent<Omit<RadixAlertDialog.AlertDialogActionProps & react.RefAttributes<HTMLButtonElement>, "ref"> & react.RefAttributes<HTMLButtonElement>>;
declare const AlertDialogCancel: react.ForwardRefExoticComponent<Omit<RadixAlertDialog.AlertDialogCancelProps & react.RefAttributes<HTMLButtonElement>, "ref"> & react.RefAttributes<HTMLButtonElement>>;

/**
 * AspectRatio — ShadCN/Radix pattern on geeklego's 2-tier token system.
 *
 * Constrains its content to a given width/height ratio (the `ratio` prop, e.g.
 * 16 / 9). Radix owns the padding-bottom layout technique; there's nothing to
 * style by default — the consumer styles the child (an <img>, <video>, etc.).
 *
 * A pure pass-through of Radix's single Root part, so no wrapper, no variants,
 * no token work.
 */
declare const AspectRatio: react.ForwardRefExoticComponent<RadixAspectRatio.AspectRatioProps & react.RefAttributes<HTMLDivElement>>;

/**
 * Props extend the Radix AspectRatio.Root part, so `ratio` and every native div
 * prop flow through unchanged. No variant axis — Radix owns the layout behavior,
 * the consumer supplies the ratio.
 */
type AspectRatioProps = ComponentPropsWithoutRef<typeof RadixAspectRatio.Root>;

/**
 * Avatar — ShadCN/Radix pattern on geeklego's 2-tier token system.
 *
 * Radix owns the image load/fallback state machine: AvatarImage renders only
 * once the image loads, otherwise AvatarFallback shows (after an optional
 * delay). We only supply the look via standard semantic utilities (bg-muted,
 * text-muted-foreground). No variant axis — size comes from consumer className
 * (the root defaults to size-10).
 *
 * Compound: <Avatar><AvatarImage src alt/><AvatarFallback>AB</AvatarFallback></Avatar>
 */
declare const Avatar: react.ForwardRefExoticComponent<Omit<RadixAvatar.AvatarProps & react.RefAttributes<HTMLSpanElement>, "ref"> & react.RefAttributes<HTMLSpanElement>>;
/** The avatar image; Radix hides it until it loads, revealing the fallback. */
declare const AvatarImage: react.ForwardRefExoticComponent<Omit<RadixAvatar.AvatarImageProps & react.RefAttributes<HTMLImageElement>, "ref"> & react.RefAttributes<HTMLImageElement>>;
/** Shown while the image is loading or if it fails — typically initials. */
declare const AvatarFallback: react.ForwardRefExoticComponent<Omit<RadixAvatar.AvatarFallbackProps & react.RefAttributes<HTMLSpanElement>, "ref"> & react.RefAttributes<HTMLSpanElement>>;

/**
 * Props extend the matching Radix Avatar parts, so the image load/fallback state
 * machine props (onLoadingStatusChange, delayMs, etc.) flow through unchanged.
 * No variant axis — each part is a thin styled wrapper.
 */
type AvatarProps = ComponentPropsWithoutRef<typeof RadixAvatar.Root>;
type AvatarImageProps = ComponentPropsWithoutRef<typeof RadixAvatar.Image>;
type AvatarFallbackProps = ComponentPropsWithoutRef<typeof RadixAvatar.Fallback>;

/**
 * Badge variants — ShadCN pattern on geeklego's 2-tier semantics.
 *
 * Small inline status/label pill. Core variants use ONLY standard ShadCN/Tailwind
 * semantic utilities (bg-primary, bg-secondary, bg-destructive, border-border …)
 * — zero custom vocabulary. `outline` is a low-emphasis, fill-less variant.
 */
declare const badgeVariants: (props?: ({
    variant?: "default" | "destructive" | "secondary" | "outline" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type BadgeVariantProps = VariantProps<typeof badgeVariants>;

interface BadgeProps extends HTMLAttributes<HTMLSpanElement>, BadgeVariantProps {
    /**
     * Render as the child element instead of a <span>, merging props onto it
     * (Radix Slot). Use for a badge that is itself a link: `<Badge asChild><a …/></Badge>`.
     */
    asChild?: boolean;
}

/**
 * Badge — ShadCN pattern on geeklego's 2-tier token system.
 *
 * A static inline status/label pill — no focus/keyboard/portal surface, so it's
 * styled markup (rung 3), hand-rolled with cva + cn. Styled entirely with
 * standard semantic utilities. `asChild` lets it render as a link or button via
 * Radix Slot while keeping a single source of styling.
 */
declare const Badge: react.ForwardRefExoticComponent<BadgeProps & react.RefAttributes<HTMLSpanElement>>;

/**
 * Breadcrumb is semantic navigation markup (a <nav> → <ol> → <li> tree) with no
 * focus/keyboard/portal/state surface — styled markup (rung 3). No variant axis;
 * each sub-part is a thin styled wrapper, per-instance tweaks via consumer
 * className. Compound: Breadcrumb > BreadcrumbList > BreadcrumbItem >
 * (BreadcrumbLink | BreadcrumbPage) with BreadcrumbSeparator / BreadcrumbEllipsis.
 */
type BreadcrumbProps = ComponentPropsWithoutRef<"nav">;
type BreadcrumbListProps = OlHTMLAttributes<HTMLOListElement>;
type BreadcrumbItemProps = LiHTMLAttributes<HTMLLIElement>;
interface BreadcrumbLinkProps extends ComponentPropsWithoutRef<"a"> {
    /**
     * Render as the child element instead of an <a> (Radix Slot) — e.g. to wrap a
     * router <Link>: `<BreadcrumbLink asChild><Link to="/x">…</Link></BreadcrumbLink>`.
     */
    asChild?: boolean;
}
type BreadcrumbPageProps = ComponentPropsWithoutRef<"span">;
type BreadcrumbSeparatorProps = LiHTMLAttributes<HTMLLIElement>;
type BreadcrumbEllipsisProps = HTMLAttributes<HTMLSpanElement>;

/**
 * Breadcrumb — ShadCN pattern on geeklego's 2-tier token system.
 *
 * A navigation trail built from semantic markup (<nav aria-label> → <ol> → <li>)
 * — no focus trap / keyboard / portal surface, so no Radix primitive; it's
 * styled markup (rung 3). The current page is marked with BreadcrumbPage
 * (aria-current="page"), not a link. Styled with standard semantic utilities
 * (text-muted-foreground, text-foreground).
 *
 * Compound: <Breadcrumb><BreadcrumbList>
 *   <BreadcrumbItem><BreadcrumbLink href>…</BreadcrumbLink></BreadcrumbItem>
 *   <BreadcrumbSeparator/>
 *   <BreadcrumbItem><BreadcrumbPage>…</BreadcrumbPage></BreadcrumbItem>
 * </BreadcrumbList></Breadcrumb>
 */
declare const Breadcrumb: react.ForwardRefExoticComponent<Omit<react.DetailedHTMLProps<react.HTMLAttributes<HTMLElement>, HTMLElement>, "ref"> & react.RefAttributes<HTMLElement>>;
/** Ordered list of crumbs; wraps and stays horizontally readable. */
declare const BreadcrumbList: react.ForwardRefExoticComponent<BreadcrumbListProps & react.RefAttributes<HTMLOListElement>>;
/** A single crumb cell (holds a link, the page, an ellipsis, or a separator). */
declare const BreadcrumbItem: react.ForwardRefExoticComponent<BreadcrumbItemProps & react.RefAttributes<HTMLLIElement>>;
/** A navigable crumb. `asChild` lets it wrap a router Link via Radix Slot. */
declare const BreadcrumbLink: react.ForwardRefExoticComponent<BreadcrumbLinkProps & react.RefAttributes<HTMLAnchorElement>>;
/** The current page — not a link; carries aria-current="page". */
declare const BreadcrumbPage: react.ForwardRefExoticComponent<Omit<react.DetailedHTMLProps<react.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, "ref"> & react.RefAttributes<HTMLSpanElement>>;
/**
 * Separator between crumbs — decorative (aria-hidden), so it's skipped by screen
 * readers. Defaults to a chevron; override by passing children.
 */
declare const BreadcrumbSeparator: {
    ({ children, className, ...props }: BreadcrumbSeparatorProps): react_jsx_runtime.JSX.Element;
    displayName: string;
};
/**
 * Collapsed-crumbs indicator (decorative). Use in place of the middle crumbs
 * when the trail is long; pair with a DropdownMenu to reveal them if needed.
 */
declare const BreadcrumbEllipsis: {
    ({ className, ...props }: BreadcrumbEllipsisProps): react_jsx_runtime.JSX.Element;
    displayName: string;
};

/**
 * Button variants — ShadCN pattern on geeklego's 2-tier semantics.
 *
 * Core variants use ONLY standard ShadCN/Tailwind semantic utilities
 * (bg-primary, text-primary-foreground, border-input, ring-ring …) — zero
 * custom vocabulary, paste-and-go.
 *
 * `gamified` is the custom-variant canary: it consumes the namespaced
 * --ext-button-gamified-* tokens and nothing from the core semantic set,
 * keeping brand variants structurally contained.
 */
declare const buttonVariants: (props?: ({
    variant?: "link" | "default" | "destructive" | "secondary" | "outline" | "ghost" | "gamified" | null | undefined;
    size?: "sm" | "md" | "lg" | "icon" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type ButtonVariantProps = VariantProps<typeof buttonVariants>;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, ButtonVariantProps {
    /**
     * Render as the child element instead of a <button>, merging props onto it
     * (Radix Slot). Use for links styled as buttons: `<Button asChild><a …/></Button>`.
     */
    asChild?: boolean;
}

/**
 * Button — ShadCN/Radix pattern on geeklego's 2-tier token system.
 *
 * - Styled entirely with standard semantic utilities (bg-primary, …); the only
 *   non-standard surface is the namespaced `gamified` variant (--ext-* tokens).
 * - `asChild` delegates rendering to its child via Radix Slot (e.g. an <a>),
 *   keeping a single source of styling.
 */
declare const Button: react.ForwardRefExoticComponent<ButtonProps & react.RefAttributes<HTMLButtonElement>>;

/**
 * Calendar props = react-day-picker's DayPicker props, verbatim. The lib owns
 * ALL behavior — date math, the keyboard-navigable day grid, single/range/
 * multiple selection modes, disabled days, etc. We only restyle it with
 * standard semantic utilities. No variant axis.
 */
type CalendarProps = ComponentProps<typeof DayPicker>;

/**
 * Calendar — ShadCN pattern on geeklego's 2-tier token system, built on
 * react-day-picker (category B). The library owns the date math, the
 * keyboard-navigable day grid, and the selection modes; we only restyle it with
 * standard semantic utilities (text-foreground, bg-primary, text-muted-
 * foreground, ring-ring …) and reuse Button's variants for the nav + day
 * buttons so the calendar matches the rest of the library.
 *
 * react-day-picker v10: nav icons are consolidated into a single `Chevron`
 * component (orientation-aware); class overrides merge onto getDefaultClassNames().
 */
declare function Calendar({ className, classNames, showOutsideDays, ...props }: CalendarProps): react_jsx_runtime.JSX.Element;
declare namespace Calendar {
    var displayName: string;
}

/**
 * Card is a compound component with no variant axis — each sub-part is a thin
 * styled wrapper over a native element, so every part shares the same prop
 * shape: native <div>/heading attributes plus the standard `className` merge.
 * Per-instance differences come from consumer `className` (merged via cn()),
 * not a cva variant — hence no *-variants.ts file.
 */
type CardProps = HTMLAttributes<HTMLDivElement>;
type CardHeaderProps = HTMLAttributes<HTMLDivElement>;
type CardTitleProps = HTMLAttributes<HTMLHeadingElement>;
type CardDescriptionProps = HTMLAttributes<HTMLParagraphElement>;
type CardContentProps = HTMLAttributes<HTMLDivElement>;
type CardFooterProps = HTMLAttributes<HTMLDivElement>;

/**
 * Card — ShadCN pattern on geeklego's 2-tier token system.
 *
 * A static surface container: it carries the `--card` / `--card-foreground`
 * semantics, a border, radius and shadow. No focus/keyboard/portal surface, so
 * no Radix primitive is needed — it's styled markup (rung 3).
 *
 * Compound: <Card><CardHeader><CardTitle/><CardDescription/></CardHeader>
 * <CardContent/><CardFooter/></Card>, built from named sub-component exports
 * rather than a hand-rolled context. No variant axis — each part has fixed
 * classes; per-instance tweaks come through consumer `className` (cn() merge).
 */
declare const Card: react.ForwardRefExoticComponent<CardProps & react.RefAttributes<HTMLDivElement>>;
/**
 * CardHeader — top section of the card; stacks title + description with a
 * consistent gap and the card's standard inset padding.
 */
declare const CardHeader: react.ForwardRefExoticComponent<CardHeaderProps & react.RefAttributes<HTMLDivElement>>;
/**
 * CardTitle — the card heading. Renders an <h3> by default; override the level
 * with `asChild`-free consumer markup if a different outline level is needed.
 */
declare const CardTitle: react.ForwardRefExoticComponent<CardTitleProps & react.RefAttributes<HTMLHeadingElement>>;
/**
 * CardDescription — supporting text under the title, at the muted-foreground
 * role so it sits below the title in emphasis.
 */
declare const CardDescription: react.ForwardRefExoticComponent<CardDescriptionProps & react.RefAttributes<HTMLParagraphElement>>;
/**
 * CardContent — the main body region. Inset padding matches the header but
 * drops the top padding so it tucks under CardHeader cleanly.
 */
declare const CardContent: react.ForwardRefExoticComponent<CardContentProps & react.RefAttributes<HTMLDivElement>>;
/**
 * CardFooter — bottom action/meta row. Lays actions out in a horizontal,
 * vertically-centered row; same inset, no top padding.
 */
declare const CardFooter: react.ForwardRefExoticComponent<CardFooterProps & react.RefAttributes<HTMLDivElement>>;

type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type EmblaOptionsType = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];
type CarouselApi = NonNullable<ReturnType<typeof useEmblaCarousel>[1]>;
interface CarouselProps extends HTMLAttributes<HTMLDivElement> {
    /** Embla options (loop, align, etc.). */
    opts?: EmblaOptionsType;
    /** Embla plugins (autoplay, etc.). */
    plugins?: CarouselPlugin;
    /** Scroll axis. Defaults to horizontal. */
    orientation?: "horizontal" | "vertical";
    /** Receive the embla API instance once initialized. */
    setApi?: (api: CarouselApi) => void;
}
interface CarouselContextValue {
    carouselRef: ReturnType<typeof useEmblaCarousel>[0];
    api: ReturnType<typeof useEmblaCarousel>[1];
    scrollPrev: () => void;
    scrollNext: () => void;
    canScrollPrev: boolean;
    canScrollNext: boolean;
    orientation: "horizontal" | "vertical";
    opts?: EmblaOptionsType;
}
type CarouselContentProps = HTMLAttributes<HTMLDivElement>;
type CarouselItemProps = HTMLAttributes<HTMLDivElement>;
type CarouselPreviousProps = ButtonProps;
type CarouselNextProps = ButtonProps;

declare const Carousel: react.ForwardRefExoticComponent<CarouselProps & react.RefAttributes<HTMLDivElement>>;
declare const CarouselContent: react.ForwardRefExoticComponent<CarouselContentProps & react.RefAttributes<HTMLDivElement>>;
declare const CarouselItem: react.ForwardRefExoticComponent<CarouselItemProps & react.RefAttributes<HTMLDivElement>>;
declare const CarouselPrevious: react.ForwardRefExoticComponent<ButtonProps & react.RefAttributes<HTMLButtonElement>>;
declare const CarouselNext: react.ForwardRefExoticComponent<ButtonProps & react.RefAttributes<HTMLButtonElement>>;

/**
 * Chart config — maps each data series key to a label + color. Colors should be
 * one of the chart semantics (`var(--color-chart-1)` … `-5`), so series re-theme
 * for free. ChartContainer injects these as `--color-<key>` CSS vars on its root
 * so recharts SVG fill/stroke can read them.
 */
interface ChartSeriesConfig {
    label?: ReactNode;
    /** A chart semantic, e.g. "var(--color-chart-1)". Chains to a primitive. */
    color?: string;
}
type ChartConfig = Record<string, ChartSeriesConfig>;
interface ChartContainerProps extends HTMLAttributes<HTMLDivElement> {
    config: ChartConfig;
    /** A single recharts chart element (BarChart, LineChart, …). */
    children: ComponentProps<typeof ResponsiveContainer>["children"];
}
interface ChartTooltipContentProps extends HTMLAttributes<HTMLDivElement> {
    /** recharts passes these when used as a Tooltip `content`. */
    active?: boolean;
    payload?: Array<{
        name?: string;
        dataKey?: string | number;
        value?: number | string;
        color?: string;
        payload?: Record<string, unknown>;
    }>;
    label?: ReactNode;
    /** Hide the leading color swatch. */
    hideIndicator?: boolean;
    /** Hide the top label row (e.g. donut/pie tooltips that show only the value). */
    hideLabel?: boolean;
    /** Look up the per-item label from this chart config (keyed by name/dataKey). */
    config?: ChartConfig;
}
interface ChartLegendContentProps extends HTMLAttributes<HTMLDivElement> {
    /** recharts passes its computed legend payload here. */
    payload?: Array<{
        value?: string;
        color?: string;
        dataKey?: string | number;
        payload?: Record<string, unknown>;
    }>;
    /** Field on each payload item that keys into `config` for the label. */
    nameKey?: string;
    /** Chart config supplying human-readable labels per series key. */
    config?: ChartConfig;
    /** Hide the leading color swatch. */
    hideIcon?: boolean;
}

declare const ChartContainer: react.ForwardRefExoticComponent<ChartContainerProps & react.RefAttributes<HTMLDivElement>>;
/** Re-export recharts' Tooltip as ChartTooltip (use with ChartTooltipContent). */
declare const ChartTooltip: typeof Tooltip$1;
/**
 * ChartTooltipContent — a themed tooltip body. Pass as `content` to ChartTooltip:
 * `<ChartTooltip content={<ChartTooltipContent />} />`.
 */
declare const ChartTooltipContent: react.ForwardRefExoticComponent<ChartTooltipContentProps & react.RefAttributes<HTMLDivElement>>;
/** Re-export recharts' Legend as ChartLegend (use with ChartLegendContent). */
declare const ChartLegend: react.MemoExoticComponent<(outsideProps: recharts.LegendProps) => React.ReactPortal | null>;
/**
 * ChartLegendContent — a themed legend row. Pass as `content` to ChartLegend:
 * `<ChartLegend content={<ChartLegendContent nameKey="browser" config={…} />} />`.
 * Each item reads its label from `config` (keyed by `nameKey`) and its swatch
 * from the recharts-computed `color`.
 */
declare const ChartLegendContent: react.ForwardRefExoticComponent<ChartLegendContentProps & react.RefAttributes<HTMLDivElement>>;

/**
 * Checkbox — ShadCN/Radix pattern on geeklego's 2-tier token system.
 *
 * Radix owns the behavior — keyboard toggle, the role/aria-checked wiring, the
 * indeterminate tri-state, and form integration. We only supply the look via
 * standard semantic utilities (border-input, bg-primary, text-primary-foreground,
 * ring-ring). The Indicator renders a check (checked) or a minus (indeterminate),
 * switching off Radix's data-state attribute.
 *
 * No variant axis — size comes from consumer className (defaults to size-4).
 */
declare const Checkbox: react.ForwardRefExoticComponent<Omit<RadixCheckbox.CheckboxProps & react.RefAttributes<HTMLButtonElement>, "ref"> & react.RefAttributes<HTMLButtonElement>>;

/**
 * Props extend the Radix Checkbox.Root part, so every native + Radix prop
 * (checked, defaultChecked, onCheckedChange, disabled, required, the
 * indeterminate `checked="indeterminate"` value, etc.) flows through unchanged.
 * No variant axis — size via consumer className.
 */
type CheckboxProps = ComponentPropsWithoutRef<typeof RadixCheckbox.Root>;

/**
 * Collapsible — ShadCN/Radix compound component on geeklego's 2-tier tokens.
 *
 * A single open/close disclosure. Radix owns the behavior — aria-expanded /
 * aria-controls wiring, keyboard toggle, and the
 * --radix-collapsible-content-height measurement that drives the open/close
 * animation. We only supply the look; the expand/collapse motion animates off
 * Radix's data-[state] attributes via the animate-collapsible-* utilities
 * registered in semantics.css (no animation library).
 *
 * Root + Trigger are pass-through; Content adds the height animation + overflow
 * clip. Per-instance look comes from consumer className (cn() merge).
 *
 * Compound: <Collapsible><CollapsibleTrigger/><CollapsibleContent/></Collapsible>
 */
declare const Collapsible: react.ForwardRefExoticComponent<RadixCollapsible.CollapsibleProps & react.RefAttributes<HTMLDivElement>>;
declare const CollapsibleTrigger: react.ForwardRefExoticComponent<Omit<RadixCollapsible.CollapsibleTriggerProps & react.RefAttributes<HTMLButtonElement>, "ref"> & react.RefAttributes<HTMLButtonElement>>;
declare const CollapsibleContent: react.ForwardRefExoticComponent<Omit<RadixCollapsible.CollapsibleContentProps & react.RefAttributes<HTMLDivElement>, "ref"> & react.RefAttributes<HTMLDivElement>>;

/**
 * Props extend the matching Radix Collapsible parts, so every native + Radix
 * prop (open, defaultOpen, onOpenChange, disabled, etc.) flows through
 * unchanged. No variant axis — each part is a thin styled wrapper.
 */
type CollapsibleProps = ComponentPropsWithoutRef<typeof RadixCollapsible.Root>;
type CollapsibleTriggerProps = ComponentPropsWithoutRef<typeof RadixCollapsible.Trigger>;
type CollapsibleContentProps = ComponentPropsWithoutRef<typeof RadixCollapsible.Content>;

interface ComboboxOption {
    value: string;
    label: string;
    disabled?: boolean;
}
interface ComboboxProps {
    /** Selectable options. */
    options: ComboboxOption[];
    /** Controlled selected value. */
    value?: string;
    /** Fires with the new value (or "" when the selected item is toggled off). */
    onChange?: (value: string) => void;
    /** Trigger text shown when nothing is selected. */
    placeholder?: string;
    /** Placeholder inside the filter input. */
    searchPlaceholder?: string;
    /** Message when the filter matches nothing. */
    emptyText?: string;
    /** Disable the whole control. */
    disabled?: boolean;
    /** Width utility for the trigger + panel (they share a width). Default w-64. */
    className?: string;
}

/**
 * Combobox — the Step-4 high-a11y-surface validation component.
 *
 * It is a COMPOSITION, not one primitive: a Radix Popover (positioning,
 * click-outside, escape, portal) wrapping a cmdk Command (the listbox —
 * role/aria-activedescendant/aria-selected, arrow-key nav, type-to-filter),
 * triggered by our own Button via asChild. Every hard piece comes from a
 * library; this file only wires data (options/value/onChange) and the
 * selected-state checkmark. This is the real test of "does Radix earn its
 * place" — answer: the listbox a11y the old 3-tier had to hand-roll is free.
 *
 * Controlled or uncontrolled: pass `value` + `onChange` to control, or omit
 * both to let it manage its own selection.
 */
declare const Combobox: react.ForwardRefExoticComponent<ComboboxProps & react.RefAttributes<HTMLButtonElement>>;

/**
 * Command — ShadCN/cmdk command palette / filterable listbox.
 *
 * cmdk owns ALL the hard a11y surface: role="listbox"/"option", the active
 * descendant tracking (aria-activedescendant / aria-selected), arrow-key
 * navigation, type-to-filter, and the empty state. We only style its parts
 * with standard semantic utilities. This is the listbox engine that Combobox
 * drops inside a Popover — proving Radix + cmdk earn their place vs. the old
 * hand-rolled utils/keyboard + aria-activedescendant bookkeeping.
 */
declare const Command: react.ForwardRefExoticComponent<Omit<{
    children?: React.ReactNode;
} & Pick<Pick<react.DetailedHTMLProps<react.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "key" | keyof react.HTMLAttributes<HTMLDivElement>> & {
    ref?: React.Ref<HTMLDivElement>;
} & {
    asChild?: boolean;
}, "key" | keyof react.HTMLAttributes<HTMLDivElement> | "asChild"> & {
    label?: string;
    shouldFilter?: boolean;
    filter?: (value: string, search: string, keywords?: string[]) => number;
    defaultValue?: string;
    value?: string;
    onValueChange?: (value: string) => void;
    loop?: boolean;
    disablePointerSelection?: boolean;
    vimBindings?: boolean;
} & react.RefAttributes<HTMLDivElement>, "ref"> & react.RefAttributes<HTMLDivElement>>;
declare const CommandInput: react.ForwardRefExoticComponent<Omit<Omit<Pick<Pick<react.DetailedHTMLProps<react.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, "key" | keyof react.InputHTMLAttributes<HTMLInputElement>> & {
    ref?: React.Ref<HTMLInputElement>;
} & {
    asChild?: boolean;
}, "key" | "asChild" | keyof react.InputHTMLAttributes<HTMLInputElement>>, "onChange" | "type" | "value"> & {
    value?: string;
    onValueChange?: (search: string) => void;
} & react.RefAttributes<HTMLInputElement>, "ref"> & react.RefAttributes<HTMLInputElement>>;
declare const CommandList: react.ForwardRefExoticComponent<Omit<{
    children?: React.ReactNode;
} & Pick<Pick<react.DetailedHTMLProps<react.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "key" | keyof react.HTMLAttributes<HTMLDivElement>> & {
    ref?: React.Ref<HTMLDivElement>;
} & {
    asChild?: boolean;
}, "key" | keyof react.HTMLAttributes<HTMLDivElement> | "asChild"> & {
    label?: string;
} & react.RefAttributes<HTMLDivElement>, "ref"> & react.RefAttributes<HTMLDivElement>>;
declare const CommandEmpty: react.ForwardRefExoticComponent<Omit<{
    children?: React.ReactNode;
} & Pick<Pick<react.DetailedHTMLProps<react.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "key" | keyof react.HTMLAttributes<HTMLDivElement>> & {
    ref?: React.Ref<HTMLDivElement>;
} & {
    asChild?: boolean;
}, "key" | keyof react.HTMLAttributes<HTMLDivElement> | "asChild"> & react.RefAttributes<HTMLDivElement>, "ref"> & react.RefAttributes<HTMLDivElement>>;
declare const CommandGroup: react.ForwardRefExoticComponent<Omit<{
    children?: React.ReactNode;
} & Omit<Pick<Pick<react.DetailedHTMLProps<react.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "key" | keyof react.HTMLAttributes<HTMLDivElement>> & {
    ref?: React.Ref<HTMLDivElement>;
} & {
    asChild?: boolean;
}, "key" | keyof react.HTMLAttributes<HTMLDivElement> | "asChild">, "heading" | "value"> & {
    heading?: React.ReactNode;
    value?: string;
    forceMount?: boolean;
} & react.RefAttributes<HTMLDivElement>, "ref"> & react.RefAttributes<HTMLDivElement>>;
declare const CommandSeparator: react.ForwardRefExoticComponent<Omit<Pick<Pick<react.DetailedHTMLProps<react.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "key" | keyof react.HTMLAttributes<HTMLDivElement>> & {
    ref?: React.Ref<HTMLDivElement>;
} & {
    asChild?: boolean;
}, "key" | keyof react.HTMLAttributes<HTMLDivElement> | "asChild"> & {
    alwaysRender?: boolean;
} & react.RefAttributes<HTMLDivElement>, "ref"> & react.RefAttributes<HTMLDivElement>>;
declare const CommandItem: react.ForwardRefExoticComponent<Omit<{
    children?: React.ReactNode;
} & Omit<Pick<Pick<react.DetailedHTMLProps<react.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "key" | keyof react.HTMLAttributes<HTMLDivElement>> & {
    ref?: React.Ref<HTMLDivElement>;
} & {
    asChild?: boolean;
}, "key" | keyof react.HTMLAttributes<HTMLDivElement> | "asChild">, "onSelect" | "value" | "disabled"> & {
    disabled?: boolean;
    onSelect?: (value: string) => void;
    value?: string;
    keywords?: string[];
    forceMount?: boolean;
} & react.RefAttributes<HTMLDivElement>, "ref"> & react.RefAttributes<HTMLDivElement>>;

/**
 * Each prop type extends the matching cmdk part, so cmdk's own props
 * (value, onValueChange, filter, shouldFilter, loop, onSelect, etc.)
 * pass straight through — we add nothing but styling.
 */
type CommandProps = ComponentPropsWithoutRef<typeof Command$1>;
type CommandInputProps = ComponentPropsWithoutRef<typeof Command$1.Input>;
type CommandListProps = ComponentPropsWithoutRef<typeof Command$1.List>;
type CommandEmptyProps = ComponentPropsWithoutRef<typeof Command$1.Empty>;
type CommandGroupProps = ComponentPropsWithoutRef<typeof Command$1.Group>;
type CommandItemProps = ComponentPropsWithoutRef<typeof Command$1.Item>;
type CommandSeparatorProps = ComponentPropsWithoutRef<typeof Command$1.Separator>;

/**
 * Props extend the matching Radix ContextMenu parts, so every native + Radix
 * prop flows through unchanged. The `inset` flag (item/label/subtrigger) adds
 * left padding to align with checkbox/radio rows. No variant axis — each part is
 * a thin styled wrapper; Radix owns the menu behavior.
 */
interface ContextMenuItemProps extends ComponentPropsWithoutRef<typeof RadixContextMenu.Item> {
    inset?: boolean;
}
type ContextMenuContentProps = ComponentPropsWithoutRef<typeof RadixContextMenu.Content>;
type ContextMenuCheckboxItemProps = ComponentPropsWithoutRef<typeof RadixContextMenu.CheckboxItem>;
type ContextMenuRadioItemProps = ComponentPropsWithoutRef<typeof RadixContextMenu.RadioItem>;
interface ContextMenuLabelProps extends ComponentPropsWithoutRef<typeof RadixContextMenu.Label> {
    inset?: boolean;
}
type ContextMenuSeparatorProps = ComponentPropsWithoutRef<typeof RadixContextMenu.Separator>;
interface ContextMenuSubTriggerProps extends ComponentPropsWithoutRef<typeof RadixContextMenu.SubTrigger> {
    inset?: boolean;
}
type ContextMenuSubContentProps = ComponentPropsWithoutRef<typeof RadixContextMenu.SubContent>;
type ContextMenuShortcutProps = React.HTMLAttributes<HTMLSpanElement>;

/**
 * ContextMenu — ShadCN/Radix compound component on geeklego's 2-tier tokens.
 *
 * The same menu surface as DropdownMenu, but opened by right-click on its
 * Trigger (Radix wires the contextmenu event, positioning at the cursor). Radix
 * owns ALL behavior — roving tabindex, typeahead, arrow-key nav, escape,
 * click-outside, submenus, portal, and the role=menu / menuitem ARIA wiring. We
 * only supply the look via standard semantic utilities (bg-popover, focus:bg-
 * accent …). `accent` is the highlighted-item semantic; Radix moves DOM focus to
 * the highlighted item, so items use `focus:bg-accent`.
 */
declare const ContextMenu: react.FC<RadixContextMenu.ContextMenuProps>;
declare const ContextMenuTrigger: react.ForwardRefExoticComponent<RadixContextMenu.ContextMenuTriggerProps & react.RefAttributes<HTMLSpanElement>>;
declare const ContextMenuGroup: react.ForwardRefExoticComponent<RadixContextMenu.ContextMenuGroupProps & react.RefAttributes<HTMLDivElement>>;
declare const ContextMenuPortal: react.FC<RadixContextMenu.ContextMenuPortalProps>;
declare const ContextMenuSub: react.FC<RadixContextMenu.ContextMenuSubProps>;
declare const ContextMenuRadioGroup: react.ForwardRefExoticComponent<RadixContextMenu.ContextMenuRadioGroupProps & react.RefAttributes<HTMLDivElement>>;
declare const ContextMenuContent: react.ForwardRefExoticComponent<Omit<RadixContextMenu.ContextMenuContentProps & react.RefAttributes<HTMLDivElement>, "ref"> & react.RefAttributes<HTMLDivElement>>;
declare const ContextMenuItem: react.ForwardRefExoticComponent<ContextMenuItemProps & react.RefAttributes<HTMLDivElement>>;
declare const ContextMenuCheckboxItem: react.ForwardRefExoticComponent<Omit<RadixContextMenu.ContextMenuCheckboxItemProps & react.RefAttributes<HTMLDivElement>, "ref"> & react.RefAttributes<HTMLDivElement>>;
declare const ContextMenuRadioItem: react.ForwardRefExoticComponent<Omit<RadixContextMenu.ContextMenuRadioItemProps & react.RefAttributes<HTMLDivElement>, "ref"> & react.RefAttributes<HTMLDivElement>>;
declare const ContextMenuLabel: react.ForwardRefExoticComponent<ContextMenuLabelProps & react.RefAttributes<HTMLDivElement>>;
declare const ContextMenuSeparator: react.ForwardRefExoticComponent<Omit<RadixContextMenu.ContextMenuSeparatorProps & react.RefAttributes<HTMLDivElement>, "ref"> & react.RefAttributes<HTMLDivElement>>;
declare const ContextMenuSubTrigger: react.ForwardRefExoticComponent<ContextMenuSubTriggerProps & react.RefAttributes<HTMLDivElement>>;
declare const ContextMenuSubContent: react.ForwardRefExoticComponent<Omit<RadixContextMenu.ContextMenuSubContentProps & react.RefAttributes<HTMLDivElement>, "ref"> & react.RefAttributes<HTMLDivElement>>;
declare const ContextMenuShortcut: {
    ({ className, ...props }: ContextMenuShortcutProps): react_jsx_runtime.JSX.Element;
    displayName: string;
};

/**
 * DataTable is a COMPOSITION on @tanstack/react-table (category B): the lib owns
 * the headless table model — sorting, filtering, pagination, row state — and our
 * Table primitives render it. Generic over the row shape; consumers pass column
 * defs + data, exactly like the ShadCN recipe.
 */
interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    /** Show prev/next pagination controls. Default true. */
    pagination?: boolean;
    /** Rows per page when pagination is enabled. Default 10. */
    pageSize?: number;
    /** Text shown when there are no rows. */
    emptyText?: string;
}

/**
 * DataTable — the ShadCN data-table recipe on geeklego's 2-tier tokens.
 *
 * A COMPOSITION on @tanstack/react-table (category B): the library owns the
 * headless table model (sorting, pagination, row state); our Table primitives
 * render it; our Pagination primitive drives page navigation (its Previous/Next
 * links wired to tanstack's previousPage()/nextPage() — disabled at the ends via
 * aria-disabled + pointer-events). This file wires only the model setup and the
 * rows→cells render. Header cells are clickable to toggle sorting.
 *
 * Generic over the row shape — pass `columns` (ColumnDef[]) + `data`, just like
 * the ShadCN recipe. Styling is standard semantics throughout.
 */
declare function DataTable<TData, TValue>({ columns, data, pagination, pageSize, emptyText, }: DataTableProps<TData, TValue>): react_jsx_runtime.JSX.Element;
declare namespace DataTable {
    var displayName: string;
}

/**
 * DatePicker is a COMPOSITION (the ShadCN recipe), not a new primitive: our
 * Button (trigger) + Popover (positioning/dismiss/portal) + Calendar
 * (react-day-picker date grid). It wires only the selected-date state and the
 * trigger label; every behavioral piece comes from an already-shipped component.
 */
interface DatePickerProps {
    /** Controlled selected date. Omit (with onChange) for uncontrolled use. */
    value?: Date;
    /** Called when a day is selected (or cleared). */
    onChange?: (date: Date | undefined) => void;
    /** Initial date when uncontrolled. */
    defaultValue?: Date;
    /** Trigger placeholder shown when no date is selected. */
    placeholder?: string;
    /** Disable the trigger. */
    disabled?: boolean;
    /** Locale passed to the trigger's date formatting. */
    locale?: string;
    /** Extra classes for the trigger button. */
    className?: string;
}

/**
 * DatePicker — the ShadCN date-picker recipe on geeklego's 2-tier tokens.
 *
 * A COMPOSITION, not one primitive: a Button trigger (showing the formatted
 * date) inside a Popover (positioning, click-outside, escape, portal — all
 * Radix) wrapping our Calendar (react-day-picker date grid + keyboard). This
 * file only wires the selected-date state + the trigger label; every hard piece
 * comes from an already-shipped component. Styled with standard semantics.
 *
 * Controlled (`value` + `onChange`) or uncontrolled (`defaultValue` + optional
 * `onChange`). Closes the popover on selection.
 */
declare const DatePicker: react.ForwardRefExoticComponent<DatePickerProps & react.RefAttributes<HTMLButtonElement>>;

/**
 * Type definitions for Geeklego i18n infrastructure.
 *
 * Architecture: library-agnostic, prop-first with context fallback.
 * Resolution order (most specific wins):
 *   hardcoded English default ← context strings ← i18nStrings prop
 *
 * Consumers wire their own i18n tool (react-intl, i18next, etc.) into
 * GeeklegoI18nProvider. No i18n library is bundled with Geeklego.
 *
 * v2 scope (2026-06-23): pruned to the shipped v2 component set. The shipped
 * components are thin Radix wrappers, so most have no system-generated strings
 * (Radix owns the ARIA). Only components that emit their own English text need
 * an interface here. As new v2 components ship with system strings, add their
 * interface + a key on GeeklegoI18nStrings + a DEFAULT_STRINGS entry, and wire
 * them via the useComponentI18n hook (see Dialog for the reference pattern).
 */
interface LabelI18nStrings {
    /** SR-only text appended when required=true. Default: "(required)" */
    required?: string;
    /** Visible text appended when optional=true. Default: "(Optional)" */
    optional?: string;
}
interface DialogI18nStrings {
    /** aria-label for the close (×) button. Default: "Close" */
    closeLabel?: string;
}
interface PopoverI18nStrings {
    /** aria-label for the close (×) button when a header close is rendered. Default: "Close" */
    closeLabel?: string;
}
interface DropdownMenuI18nStrings {
    /** aria-label for the menu panel when no menuLabel prop is provided. Default: "Menu" */
    defaultMenuLabel?: string;
}
interface ComboboxI18nStrings {
    /** aria-label for the clear (×) button. Default: "Clear" */
    clearLabel?: string;
    /** aria-label for the listbox panel. Default: "Options" */
    listboxLabel?: string;
    /** Text shown when no options match the query. Default: "No results" */
    noResultsMessage?: string;
    /** Text shown in the panel during async option loading. Default: "Loading options…" */
    loadingMessage?: string;
}
interface CommandI18nStrings {
    /** Text shown when no command matches the query. Default: "No results found." */
    emptyMessage?: string;
}
interface AccordionI18nStrings {
    /** SR-only hint appended to trigger text when item is collapsed. Default: "Expand" */
    expandLabel?: string;
    /** SR-only hint appended to trigger text when item is expanded. Default: "Collapse" */
    collapseLabel?: string;
}
interface SelectI18nStrings {
    /** Placeholder text shown when no option is selected. Default: "Select…" */
    placeholder?: string;
}
interface GeeklegoI18nStrings {
    label?: LabelI18nStrings;
    dialog?: DialogI18nStrings;
    popover?: PopoverI18nStrings;
    dropdownMenu?: DropdownMenuI18nStrings;
    combobox?: ComboboxI18nStrings;
    command?: CommandI18nStrings;
    accordion?: AccordionI18nStrings;
    select?: SelectI18nStrings;
}
interface GeeklegoFormatters {
    /**
     * Format a number for metric display.
     * Default: built-in component formatter — not set here.
     */
    formatNumber?: (value: number, options?: Intl.NumberFormatOptions) => string;
    /**
     * Format a number as a percentage string (e.g. "42.1%").
     * Default: `${value.toFixed(1)}%`
     */
    formatPercent?: (value: number, fractionDigits?: number) => string;
    /**
     * Format a Date or ISO string for display.
     * Default: Intl.DateTimeFormat with browser locale.
     */
    formatDate?: (value: Date | string, options?: Intl.DateTimeFormatOptions) => string;
}
interface GeeklegoI18nContextValue {
    strings: GeeklegoI18nStrings;
    formatters: GeeklegoFormatters;
    /** BCP 47 locale tag, e.g. "en-US", "ar", "de". Defaults to navigator.language. */
    locale?: string;
}

/**
 * Props extend the matching Radix part, so every native + Radix prop
 * (onOpenChange, forceMount, onEscapeKeyDown, etc.) flows through unchanged.
 * We only add what's genuinely ours (e.g. DialogContent's `showClose`).
 */
type DialogOverlayProps = ComponentPropsWithoutRef<typeof RadixDialog.Overlay>;
interface DialogContentProps extends ComponentPropsWithoutRef<typeof RadixDialog.Content> {
    /** Render the built-in top-right close button. Default true. */
    showClose?: boolean;
    /**
     * Per-instance i18n overrides for this dialog's system strings
     * (currently the close-button aria-label). Beats the GeeklegoI18nProvider
     * context, which beats the English default ("Close").
     */
    i18nStrings?: DialogI18nStrings;
}
type DialogTitleProps = ComponentPropsWithoutRef<typeof RadixDialog.Title>;
type DialogDescriptionProps = ComponentPropsWithoutRef<typeof RadixDialog.Description>;
type DialogHeaderProps = HTMLAttributes<HTMLDivElement>;
type DialogFooterProps = HTMLAttributes<HTMLDivElement>;

/**
 * Dialog — ShadCN/Radix compound component on geeklego's 2-tier tokens.
 *
 * Radix owns ALL behavior — focus trap, escape-to-dismiss, click-outside,
 * scroll lock, portal, and the aria-modal / aria-labelledby / aria-describedby
 * wiring (the last via Title/Description). We only supply the look, via standard
 * semantic utilities (bg-popover, border-border, text-muted-foreground …).
 *
 * This is the Step-4 validation that Radix earns its place: the old 3-tier Modal
 * hand-rolled useFocusTrap / useEscapeDismiss / useClickOutside / a createContext
 * for open state / cloneElement trigger injection / --modal-* component tokens.
 * None of that is reimplemented here.
 */
declare const Dialog: react.FC<RadixDialog.DialogProps>;
declare const DialogTrigger: react.ForwardRefExoticComponent<RadixDialog.DialogTriggerProps & react.RefAttributes<HTMLButtonElement>>;
declare const DialogClose: react.ForwardRefExoticComponent<RadixDialog.DialogCloseProps & react.RefAttributes<HTMLButtonElement>>;
declare const DialogPortal: react.FC<RadixDialog.DialogPortalProps>;
declare const DialogOverlay: react.ForwardRefExoticComponent<Omit<RadixDialog.DialogOverlayProps & react.RefAttributes<HTMLDivElement>, "ref"> & react.RefAttributes<HTMLDivElement>>;
declare const DialogContent: react.ForwardRefExoticComponent<DialogContentProps & react.RefAttributes<HTMLDivElement>>;
declare const DialogHeader: {
    ({ className, ...props }: DialogHeaderProps): react_jsx_runtime.JSX.Element;
    displayName: string;
};
declare const DialogFooter: {
    ({ className, ...props }: DialogFooterProps): react_jsx_runtime.JSX.Element;
    displayName: string;
};
declare const DialogTitle: react.ForwardRefExoticComponent<Omit<RadixDialog.DialogTitleProps & react.RefAttributes<HTMLHeadingElement>, "ref"> & react.RefAttributes<HTMLHeadingElement>>;
declare const DialogDescription: react.ForwardRefExoticComponent<Omit<RadixDialog.DialogDescriptionProps & react.RefAttributes<HTMLParagraphElement>, "ref"> & react.RefAttributes<HTMLParagraphElement>>;

/**
 * Props extend the matching vaul Drawer parts. vaul owns the drag-to-dismiss
 * sheet physics, the snap points, scroll lock, and the focus/escape behavior;
 * we only restyle. No variant axis — each part is a thin styled wrapper. The
 * Root's `shouldScaleBackground` + `direction` props flow through.
 */
type DrawerProps = ComponentPropsWithoutRef<typeof Drawer$1.Root>;
type DrawerContentProps = ComponentPropsWithoutRef<typeof Drawer$1.Content>;
type DrawerOverlayProps = ComponentPropsWithoutRef<typeof Drawer$1.Overlay>;
type DrawerTitleProps = ComponentPropsWithoutRef<typeof Drawer$1.Title>;
type DrawerDescriptionProps = ComponentPropsWithoutRef<typeof Drawer$1.Description>;
type DrawerHeaderProps = HTMLAttributes<HTMLDivElement>;
type DrawerFooterProps = HTMLAttributes<HTMLDivElement>;

/**
 * Drawer — ShadCN pattern on geeklego's 2-tier token system, built on vaul
 * (category B). vaul owns the drag-to-dismiss sheet physics, snap points, scroll
 * lock, and the focus/escape behavior — Radix Dialog can't do the drag gesture.
 * We only supply the look via standard semantic utilities (bg-background,
 * border-border, bg-muted for the drag handle …). A bottom sheet by default.
 *
 * Compound: <Drawer><DrawerTrigger/><DrawerContent><DrawerHeader>
 *   <DrawerTitle/><DrawerDescription/></DrawerHeader>…<DrawerFooter/>
 * </DrawerContent></Drawer>
 */
declare const Drawer: {
    ({ shouldScaleBackground, ...props }: DrawerProps): react_jsx_runtime.JSX.Element;
    displayName: string;
};
declare const DrawerTrigger: react.ForwardRefExoticComponent<RadixDialog.DialogTriggerProps & react.RefAttributes<HTMLButtonElement>>;
declare const DrawerPortal: typeof vaul.Portal;
declare const DrawerClose: react.ForwardRefExoticComponent<RadixDialog.DialogCloseProps & react.RefAttributes<HTMLButtonElement>>;
declare const DrawerOverlay: react.ForwardRefExoticComponent<Omit<Omit<RadixDialog.DialogOverlayProps & react.RefAttributes<HTMLDivElement>, "ref"> & react.RefAttributes<HTMLDivElement>, "ref"> & react.RefAttributes<HTMLDivElement>>;
declare const DrawerContent: react.ForwardRefExoticComponent<Omit<Omit<RadixDialog.DialogContentProps & react.RefAttributes<HTMLDivElement>, "ref"> & react.RefAttributes<HTMLDivElement>, "ref"> & react.RefAttributes<HTMLDivElement>>;
declare const DrawerHeader: {
    ({ className, ...props }: DrawerHeaderProps): react_jsx_runtime.JSX.Element;
    displayName: string;
};
declare const DrawerFooter: {
    ({ className, ...props }: DrawerFooterProps): react_jsx_runtime.JSX.Element;
    displayName: string;
};
declare const DrawerTitle: react.ForwardRefExoticComponent<Omit<RadixDialog.DialogTitleProps & react.RefAttributes<HTMLHeadingElement>, "ref"> & react.RefAttributes<HTMLHeadingElement>>;
declare const DrawerDescription: react.ForwardRefExoticComponent<Omit<RadixDialog.DialogDescriptionProps & react.RefAttributes<HTMLParagraphElement>, "ref"> & react.RefAttributes<HTMLParagraphElement>>;

/**
 * Props extend the matching Radix part, so every native + Radix prop
 * (onSelect, onOpenChange, sideOffset, checked, value, etc.) flows through
 * unchanged. We only add what's genuinely ours (`inset` on items/labels).
 */
type DropdownMenuContentProps = ComponentPropsWithoutRef<typeof RadixDropdownMenu.Content>;
interface DropdownMenuItemProps extends ComponentPropsWithoutRef<typeof RadixDropdownMenu.Item> {
    /** Indent the item to align with sibling items that carry a leading icon/check. */
    inset?: boolean;
}
type DropdownMenuCheckboxItemProps = ComponentPropsWithoutRef<typeof RadixDropdownMenu.CheckboxItem>;
type DropdownMenuRadioItemProps = ComponentPropsWithoutRef<typeof RadixDropdownMenu.RadioItem>;
interface DropdownMenuLabelProps extends ComponentPropsWithoutRef<typeof RadixDropdownMenu.Label> {
    /** Indent the label to align with inset items. */
    inset?: boolean;
}
type DropdownMenuSeparatorProps = ComponentPropsWithoutRef<typeof RadixDropdownMenu.Separator>;
interface DropdownMenuSubTriggerProps extends ComponentPropsWithoutRef<typeof RadixDropdownMenu.SubTrigger> {
    /** Indent the sub-trigger to align with inset items. */
    inset?: boolean;
}
type DropdownMenuSubContentProps = ComponentPropsWithoutRef<typeof RadixDropdownMenu.SubContent>;
type DropdownMenuShortcutProps = React.HTMLAttributes<HTMLSpanElement>;

/**
 * DropdownMenu — ShadCN/Radix compound component on geeklego's 2-tier tokens.
 *
 * Radix owns ALL behavior — roving tabindex, typeahead, arrow-key nav,
 * escape-to-dismiss, click-outside, submenus, portal, and the full role=menu /
 * menuitem(checkbox|radio) ARIA wiring. We only supply the look, via standard
 * semantic utilities (bg-popover, text-popover-foreground, focus:bg-accent …).
 *
 * Styling note: no component-token tier and no --ext-* tokens — a menu is plain
 * ShadCN vocabulary. `accent` is the hovered/highlighted-item semantic; items use
 * `focus:bg-accent` because Radix moves DOM focus to the highlighted item.
 */
declare const DropdownMenu: react.FC<RadixDropdownMenu.DropdownMenuProps>;
declare const DropdownMenuTrigger: react.ForwardRefExoticComponent<RadixDropdownMenu.DropdownMenuTriggerProps & react.RefAttributes<HTMLButtonElement>>;
declare const DropdownMenuGroup: react.ForwardRefExoticComponent<RadixDropdownMenu.DropdownMenuGroupProps & react.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuPortal: react.FC<RadixDropdownMenu.DropdownMenuPortalProps>;
declare const DropdownMenuSub: react.FC<RadixDropdownMenu.DropdownMenuSubProps>;
declare const DropdownMenuRadioGroup: react.ForwardRefExoticComponent<RadixDropdownMenu.DropdownMenuRadioGroupProps & react.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuContent: react.ForwardRefExoticComponent<Omit<RadixDropdownMenu.DropdownMenuContentProps & react.RefAttributes<HTMLDivElement>, "ref"> & react.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuItem: react.ForwardRefExoticComponent<DropdownMenuItemProps & react.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuCheckboxItem: react.ForwardRefExoticComponent<Omit<RadixDropdownMenu.DropdownMenuCheckboxItemProps & react.RefAttributes<HTMLDivElement>, "ref"> & react.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuRadioItem: react.ForwardRefExoticComponent<Omit<RadixDropdownMenu.DropdownMenuRadioItemProps & react.RefAttributes<HTMLDivElement>, "ref"> & react.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuLabel: react.ForwardRefExoticComponent<DropdownMenuLabelProps & react.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuSeparator: react.ForwardRefExoticComponent<Omit<RadixDropdownMenu.DropdownMenuSeparatorProps & react.RefAttributes<HTMLDivElement>, "ref"> & react.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuSubTrigger: react.ForwardRefExoticComponent<DropdownMenuSubTriggerProps & react.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuSubContent: react.ForwardRefExoticComponent<Omit<RadixDropdownMenu.DropdownMenuSubContentProps & react.RefAttributes<HTMLDivElement>, "ref"> & react.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuShortcut: {
    ({ className, ...props }: DropdownMenuShortcutProps): react_jsx_runtime.JSX.Element;
    displayName: string;
};

/**
 * Label variants — ShadCN pattern on geeklego's 2-tier semantics.
 *
 * Styled with standard semantic utilities only (text-foreground). The
 * peer-disabled rules let a Label dim itself when its associated control is
 * disabled, the standard ShadCN affordance — no custom vocabulary.
 */
declare const labelVariants: (props?: class_variance_authority_types.ClassProp | undefined) => string;
type LabelVariantProps = VariantProps<typeof labelVariants>;

/**
 * Label props — the Radix Label part's props (which include native <label>
 * attributes like `htmlFor`) plus the cva variant axes.
 */
interface LabelProps extends ComponentPropsWithoutRef<typeof RadixLabel.Root>, LabelVariantProps {
}

/**
 * Label — ShadCN/Radix pattern on geeklego's 2-tier tokens.
 *
 * Wraps @radix-ui/react-label, which adds the one piece a bare <label> lacks:
 * it forwards clicks/focus to the associated control even when that control is
 * a non-native widget (e.g. our Radix Select trigger). We only supply the look
 * via standard semantic utilities. Reusable on its own; FormField composes it.
 */
declare const Label: react.ForwardRefExoticComponent<LabelProps & react.RefAttributes<HTMLLabelElement>>;

/**
 * Field (ShadCN Form recipe) prop types.
 *
 * The behavior/state engine is react-hook-form — these types only describe the
 * thin styled wrappers around it. `FormField` is a render-prop over RHF's
 * `Controller`, so it borrows `Controller`'s generics verbatim; the remaining
 * parts are plain styled elements.
 */
/** `FormField` = a typed pass-through of RHF's `Controller`. */
type FormFieldProps<TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>> = ControllerProps<TFieldValues, TName>;
/** `FormItem` — layout wrapper that owns the generated field id (a <div>). */
type FormItemProps = HTMLAttributes<HTMLDivElement>;
/** `FormLabel` — same surface as our Label; auto-wires `htmlFor` + error state. */
type FormLabelProps = ComponentPropsWithoutRef<typeof Label>;
/** `FormDescription` — helper text under the control (a <p>). */
type FormDescriptionProps = HTMLAttributes<HTMLParagraphElement>;
/** `FormMessage` — validation message; renders the field error or `children`. */
type FormMessageProps = HTMLAttributes<HTMLParagraphElement>;

/**
 * Field — the ShadCN Form recipe on geeklego's 2-tier tokens.
 *
 * The behavior/state engine is **react-hook-form** (Radix has no form-state
 * primitive). We own only the look (standard semantic utilities) + the ARIA
 * wiring that connects label ↔ control ↔ description ↔ error message. The parts:
 *
 *   <Form {...form}>                         // RHF FormProvider
 *     <FormField name="email" control={...}  // render-prop over RHF Controller
 *       render={({ field }) => (
 *         <FormItem>                          // owns the generated id
 *           <FormLabel>Email</FormLabel>      // htmlFor + error state, auto
 *           <FormControl><Input {...field}/></FormControl>  // Slot: aria-* wiring
 *           <FormDescription>…</FormDescription>
 *           <FormMessage />                   // renders the field's RHF error
 *         </FormItem>
 *       )} />
 *   </Form>
 *
 * No manual `error` boolean is threaded by hand — `useFormField` reads RHF's
 * field state, so the label's error styling, `aria-invalid`, `aria-describedby`,
 * and the message text all derive from validation automatically.
 */
/** Root provider — a direct alias of RHF's FormProvider. */
declare const Form: <TFieldValues extends FieldValues, TContext = any, TTransformedValues = TFieldValues>({ children, watch, getValues, getFieldState, setError, clearErrors, setValue, setValues, trigger, formState, resetField, reset, handleSubmit, unregister, control, register, setFocus, subscribe, }: react_hook_form.FormProviderProps<TFieldValues, TContext, TTransformedValues>) => React.JSX.Element;
/**
 * useFormField — derives everything a field's parts need from RHF state +
 * the two contexts. Single source of truth for ids, error, and ARIA wiring.
 */
declare function useFormField(): {
    invalid: boolean;
    isDirty: boolean;
    isTouched: boolean;
    isValidating: boolean;
    error?: react_hook_form.FieldError;
    id: string;
    name: string;
    formItemId: string;
    formDescriptionId: string;
    formMessageId: string;
};
declare const FormField: <TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>(props: FormFieldProps<TFieldValues, TName>) => react_jsx_runtime.JSX.Element;
declare const FormItem: react.ForwardRefExoticComponent<FormItemProps & react.RefAttributes<HTMLDivElement>>;
declare const FormLabel: react.ForwardRefExoticComponent<Omit<LabelProps & react.RefAttributes<HTMLLabelElement>, "ref"> & react.RefAttributes<HTMLLabelElement>>;
declare const FormControl: react.ForwardRefExoticComponent<Omit<react.HTMLAttributes<HTMLElement> & {
    children?: React.ReactNode;
} & react.RefAttributes<HTMLElement>, "ref"> & react.RefAttributes<HTMLElement>>;
declare const FormDescription: react.ForwardRefExoticComponent<FormDescriptionProps & react.RefAttributes<HTMLParagraphElement>>;
declare const FormMessage: react.ForwardRefExoticComponent<FormMessageProps & react.RefAttributes<HTMLParagraphElement>>;

/**
 * HoverCard — ShadCN/Radix compound component on geeklego's 2-tier tokens.
 *
 * Radix owns ALL behavior — the open-on-hover/focus intent with open/close
 * delays, the portal, the popper positioning, and the data-[state]/data-[side]
 * attributes. We supply only the look via standard semantic utilities
 * (bg-popover, text-popover-foreground, border-border …) and animate off the
 * data-state/data-side attributes — no animation library needed.
 *
 * Compound: <HoverCard><HoverCardTrigger/><HoverCardContent>…</HoverCardContent></HoverCard>
 */
declare const HoverCard: react.FC<RadixHoverCard.HoverCardProps>;
declare const HoverCardTrigger: react.ForwardRefExoticComponent<RadixHoverCard.HoverCardTriggerProps & react.RefAttributes<HTMLAnchorElement>>;
declare const HoverCardContent: react.ForwardRefExoticComponent<Omit<RadixHoverCard.HoverCardContentProps & react.RefAttributes<HTMLDivElement>, "ref"> & react.RefAttributes<HTMLDivElement>>;

type HoverCardContentProps = ComponentPropsWithoutRef<typeof RadixHoverCard.Content>;

/**
 * Input variants — ShadCN pattern on geeklego's 2-tier semantics.
 *
 * Styled entirely with standard ShadCN/Tailwind semantic utilities
 * (border-input, bg-background, ring-ring, text-foreground …) — zero custom
 * vocabulary. The `error` variant reuses the standard --destructive semantics
 * rather than inventing brand tokens, so it themes for free.
 */
declare const inputVariants: (props?: ({
    variant?: "default" | "error" | null | undefined;
    inputSize?: "sm" | "md" | "lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type InputVariantProps = VariantProps<typeof inputVariants>;

/**
 * Input props — native <input> attributes plus the cva variant axes.
 *
 * Note the size axis is exposed as `inputSize`, not `size`: the native input
 * `size` attribute (a number — visible character width) would otherwise collide
 * with a cva `size` variant. Keeping them separate preserves the HTML attribute.
 */
interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size">, InputVariantProps {
    /** Native input `size` attribute (visible character width). Rarely needed. */
    size?: number;
}

/**
 * Input — ShadCN/Radix pattern on geeklego's 2-tier token system.
 *
 * A styled native <input>; there is no Radix Input primitive and a text field
 * has no a11y/keyboard/portal surface to delegate, so this is a leaf component.
 * Styled entirely with standard semantic utilities (border-input, bg-background,
 * ring-ring …); the `error` variant reuses --destructive, so it themes for free.
 *
 * No `asChild`: <input> is a void element with no children to slot into.
 */
declare const Input: react.ForwardRefExoticComponent<InputProps & react.RefAttributes<HTMLInputElement>>;

/**
 * InputOTP — a one-time-passcode field built on the `input-otp` headless library
 * (category B: the lib owns caret/paste/keyboard/state, we own the look).
 *
 * Props mirror `OTPInput`'s public API (maxLength, value, onChange, …); we add
 * a styling-only `containerClassName` separate from the hidden input's
 * `className`, matching the ShadCN recipe.
 */
interface InputOTPProps extends Omit<ComponentPropsWithoutRef<typeof OTPInput>, "render" | "children"> {
    /** The slot/group markup (InputOTPGroup + InputOTPSlot). Required. */
    children: ReactNode;
    /** className applied to the slot container (the visible row). */
    containerClassName?: string;
}
type InputOTPGroupProps = HTMLAttributes<HTMLDivElement>;
interface InputOTPSlotProps extends HTMLAttributes<HTMLDivElement> {
    /** Index into the OTPInput context's slots array. */
    index: number;
}
type InputOTPSeparatorProps = HTMLAttributes<HTMLDivElement>;

/**
 * InputOTP — ShadCN pattern on geeklego's 2-tier token system, built on the
 * `input-otp` library (category B). The library owns the hard parts — a single
 * hidden input that drives caret position, paste handling, mobile autofill and
 * keyboard nav — exposing per-slot render state via OTPInputContext. We own the
 * styling: each slot is standard semantic markup (border-input, ring-ring, …).
 *
 * Compound: <InputOTP maxLength={6}><InputOTPGroup><InputOTPSlot index={0}/>…
 * </InputOTPGroup></InputOTP>. No cva variants — slots have fixed classes and
 * per-instance tweaks come through consumer `className` (cn() merge).
 */
declare const InputOTP: react.ForwardRefExoticComponent<InputOTPProps & react.RefAttributes<HTMLInputElement>>;
/** InputOTPGroup — a visual cluster of adjacent slots (e.g. 3 + separator + 3). */
declare const InputOTPGroup: react.ForwardRefExoticComponent<InputOTPGroupProps & react.RefAttributes<HTMLDivElement>>;
/**
 * InputOTPSlot — one character cell. Reads its char / fake-caret / active state
 * from OTPInputContext (provided by InputOTP) by `index`. Active slot lifts to
 * the ring semantics; the blinking caret is rendered from the same theme color.
 */
declare const InputOTPSlot: react.ForwardRefExoticComponent<InputOTPSlotProps & react.RefAttributes<HTMLDivElement>>;
/** InputOTPSeparator — a non-interactive divider between groups (a dash). */
declare const InputOTPSeparator: react.ForwardRefExoticComponent<InputOTPSeparatorProps & react.RefAttributes<HTMLDivElement>>;

/**
 * Props extend the matching Radix Menubar parts, so every native + Radix prop
 * flows through unchanged. The `inset` flag (item/label/subtrigger) adds left
 * padding to align with checkbox/radio rows. No variant axis — each part is a
 * thin styled wrapper; Radix owns the menu behaviour.
 */
type MenubarProps = ComponentPropsWithoutRef<typeof RadixMenubar.Root>;
type MenubarTriggerProps = ComponentPropsWithoutRef<typeof RadixMenubar.Trigger>;
type MenubarContentProps = ComponentPropsWithoutRef<typeof RadixMenubar.Content>;
interface MenubarItemProps extends ComponentPropsWithoutRef<typeof RadixMenubar.Item> {
    inset?: boolean;
}
type MenubarCheckboxItemProps = ComponentPropsWithoutRef<typeof RadixMenubar.CheckboxItem>;
type MenubarRadioItemProps = ComponentPropsWithoutRef<typeof RadixMenubar.RadioItem>;
interface MenubarLabelProps extends ComponentPropsWithoutRef<typeof RadixMenubar.Label> {
    inset?: boolean;
}
type MenubarSeparatorProps = ComponentPropsWithoutRef<typeof RadixMenubar.Separator>;
interface MenubarSubTriggerProps extends ComponentPropsWithoutRef<typeof RadixMenubar.SubTrigger> {
    inset?: boolean;
}
type MenubarSubContentProps = ComponentPropsWithoutRef<typeof RadixMenubar.SubContent>;
type MenubarShortcutProps = React.HTMLAttributes<HTMLSpanElement>;

/**
 * Menubar — ShadCN/Radix compound component on geeklego's 2-tier tokens.
 *
 * A desktop-app-style menu bar (File / Edit / View …). Radix owns ALL behaviour
 * — moving focus between menus with arrow keys, roving tabindex, typeahead,
 * escape, click-outside, submenus, portal, and the role=menubar/menu/menuitem
 * ARIA wiring. We only supply the look via standard semantic utilities. `accent`
 * is the highlighted-item semantic; Radix moves DOM focus to the highlighted
 * item, so items use `focus:bg-accent`.
 */
declare const MenubarMenu: {
    (props: ComponentProps<typeof RadixMenubar.Menu>): react_jsx_runtime.JSX.Element;
    displayName: string;
};
declare const MenubarGroup: react.ForwardRefExoticComponent<RadixMenubar.MenubarGroupProps & react.RefAttributes<HTMLDivElement>>;
declare const MenubarPortal: react.FC<RadixMenubar.MenubarPortalProps>;
declare const MenubarSub: react.FC<RadixMenubar.MenubarSubProps>;
declare const MenubarRadioGroup: react.ForwardRefExoticComponent<RadixMenubar.MenubarRadioGroupProps & react.RefAttributes<HTMLDivElement>>;
declare const Menubar: react.ForwardRefExoticComponent<Omit<RadixMenubar.MenubarProps & react.RefAttributes<HTMLDivElement>, "ref"> & react.RefAttributes<HTMLDivElement>>;
declare const MenubarTrigger: react.ForwardRefExoticComponent<Omit<RadixMenubar.MenubarTriggerProps & react.RefAttributes<HTMLButtonElement>, "ref"> & react.RefAttributes<HTMLButtonElement>>;
declare const MenubarContent: react.ForwardRefExoticComponent<Omit<RadixMenubar.MenubarContentProps & react.RefAttributes<HTMLDivElement>, "ref"> & react.RefAttributes<HTMLDivElement>>;
declare const MenubarItem: react.ForwardRefExoticComponent<MenubarItemProps & react.RefAttributes<HTMLDivElement>>;
declare const MenubarCheckboxItem: react.ForwardRefExoticComponent<Omit<RadixMenubar.MenubarCheckboxItemProps & react.RefAttributes<HTMLDivElement>, "ref"> & react.RefAttributes<HTMLDivElement>>;
declare const MenubarRadioItem: react.ForwardRefExoticComponent<Omit<RadixMenubar.MenubarRadioItemProps & react.RefAttributes<HTMLDivElement>, "ref"> & react.RefAttributes<HTMLDivElement>>;
declare const MenubarLabel: react.ForwardRefExoticComponent<MenubarLabelProps & react.RefAttributes<HTMLDivElement>>;
declare const MenubarSeparator: react.ForwardRefExoticComponent<Omit<RadixMenubar.MenubarSeparatorProps & react.RefAttributes<HTMLDivElement>, "ref"> & react.RefAttributes<HTMLDivElement>>;
declare const MenubarSubTrigger: react.ForwardRefExoticComponent<MenubarSubTriggerProps & react.RefAttributes<HTMLDivElement>>;
declare const MenubarSubContent: react.ForwardRefExoticComponent<Omit<RadixMenubar.MenubarSubContentProps & react.RefAttributes<HTMLDivElement>, "ref"> & react.RefAttributes<HTMLDivElement>>;
declare const MenubarShortcut: {
    ({ className, ...props }: MenubarShortcutProps): react_jsx_runtime.JSX.Element;
    displayName: string;
};

/**
 * navigationMenuTriggerStyle — the shared trigger/link look for the navigation
 * menu, exported as a cva so a plain NavigationMenuLink can adopt the exact same
 * style as a Trigger (the ShadCN pattern). Standard semantic utilities only;
 * `accent` is the hovered/focused/open highlight.
 *
 * No variant axis — it's a single style bundle, so it's a parameterless cva
 * rather than a true variants table.
 */
declare const navigationMenuTriggerStyle: (props?: class_variance_authority_types.ClassProp | undefined) => string;

/**
 * Props extend the matching Radix NavigationMenu parts, so every native + Radix
 * prop flows through unchanged. The Root carries a `viewport` toggle so a
 * consumer can opt out of the shared animated viewport. No variant axis.
 */
interface NavigationMenuProps extends ComponentPropsWithoutRef<typeof RadixNavigationMenu.Root> {
    /** Render the shared animated viewport that hosts open content. Default true. */
    viewport?: boolean;
}
type NavigationMenuListProps = ComponentPropsWithoutRef<typeof RadixNavigationMenu.List>;
type NavigationMenuItemProps = ComponentPropsWithoutRef<typeof RadixNavigationMenu.Item>;
type NavigationMenuTriggerProps = ComponentPropsWithoutRef<typeof RadixNavigationMenu.Trigger>;
type NavigationMenuContentProps = ComponentPropsWithoutRef<typeof RadixNavigationMenu.Content>;
type NavigationMenuLinkProps = ComponentPropsWithoutRef<typeof RadixNavigationMenu.Link>;
type NavigationMenuIndicatorProps = ComponentPropsWithoutRef<typeof RadixNavigationMenu.Indicator>;
type NavigationMenuViewportProps = ComponentPropsWithoutRef<typeof RadixNavigationMenu.Viewport>;

/**
 * NavigationMenu — ShadCN/Radix compound component on geeklego's 2-tier tokens.
 *
 * A site-nav primitive with dropdown panels. Radix owns ALL behaviour — the
 * open/close intent with pointer + keyboard, focus management, the shared
 * viewport that morphs between panels, the position indicator (arrow), and the
 * role/aria wiring. We only supply the look via standard semantic utilities
 * (bg-popover panels, accent highlights) and animate off the data-[state]/
 * data-[motion] attributes.
 *
 * Compound: <NavigationMenu><NavigationMenuList><NavigationMenuItem>
 *   <NavigationMenuTrigger/><NavigationMenuContent/></NavigationMenuItem>
 * </NavigationMenuList></NavigationMenu>. The Root renders a shared Viewport by
 * default (set `viewport={false}` to render content in place instead).
 */
declare const NavigationMenu: react.ForwardRefExoticComponent<NavigationMenuProps & react.RefAttributes<HTMLElement>>;
declare const NavigationMenuItem: react.ForwardRefExoticComponent<RadixNavigationMenu.NavigationMenuItemProps & react.RefAttributes<HTMLLIElement>>;
declare const NavigationMenuList: react.ForwardRefExoticComponent<Omit<RadixNavigationMenu.NavigationMenuListProps & react.RefAttributes<HTMLUListElement>, "ref"> & react.RefAttributes<HTMLUListElement>>;
declare const NavigationMenuTrigger: react.ForwardRefExoticComponent<Omit<RadixNavigationMenu.NavigationMenuTriggerProps & react.RefAttributes<HTMLButtonElement>, "ref"> & react.RefAttributes<HTMLButtonElement>>;
declare const NavigationMenuContent: react.ForwardRefExoticComponent<Omit<RadixNavigationMenu.NavigationMenuContentProps & react.RefAttributes<HTMLDivElement>, "ref"> & react.RefAttributes<HTMLDivElement>>;
declare const NavigationMenuLink: react.ForwardRefExoticComponent<Omit<RadixNavigationMenu.NavigationMenuLinkProps & react.RefAttributes<HTMLAnchorElement>, "ref"> & react.RefAttributes<HTMLAnchorElement>>;
declare const NavigationMenuIndicator: react.ForwardRefExoticComponent<Omit<RadixNavigationMenu.NavigationMenuIndicatorProps & react.RefAttributes<HTMLDivElement>, "ref"> & react.RefAttributes<HTMLDivElement>>;
declare const NavigationMenuViewport: react.ForwardRefExoticComponent<Omit<RadixNavigationMenu.NavigationMenuViewportProps & react.RefAttributes<HTMLDivElement>, "ref"> & react.RefAttributes<HTMLDivElement>>;

/**
 * Pagination is semantic navigation markup (<nav> → <ul> → <li> with page <a>
 * links) — styled markup (rung 3), no focus-trap/keyboard/state surface beyond
 * native links. No cva variants of its own; the page links reuse Button's
 * variant/size axes to stay visually identical to the library's buttons.
 *
 * Compound: Pagination > PaginationContent > PaginationItem >
 *   (PaginationLink | PaginationPrevious | PaginationNext | PaginationEllipsis)
 */
type PaginationProps = ComponentProps<"nav">;
type PaginationContentProps = HTMLAttributes<HTMLUListElement>;
type PaginationItemProps = HTMLAttributes<HTMLLIElement>;
interface PaginationLinkProps extends ComponentProps<"a"> {
    /** Marks the current page (aria-current="page") and uses the outline look. */
    isActive?: boolean;
    /** Reuse Button's size axis. Default "icon" for number links. */
    size?: ButtonVariantProps["size"];
}
type PaginationPreviousProps = PaginationLinkProps;
type PaginationNextProps = PaginationLinkProps;
type PaginationEllipsisProps = HTMLAttributes<HTMLSpanElement>;

/**
 * Pagination — ShadCN pattern on geeklego's 2-tier token system.
 *
 * Semantic navigation markup (<nav aria-label> → <ul> → <li> → page <a> links)
 * — no focus-trap/keyboard/state surface beyond native links, so it's styled
 * markup (rung 3). The page links reuse Button's variants so they match the
 * library's buttons exactly: the active page uses the `outline` look, others
 * `ghost`. PaginationLink renders an <a> by default; pass a router Link or a
 * <button> via the standard child props for app integration / DataTable wiring.
 *
 * Compound: <Pagination><PaginationContent>
 *   <PaginationItem><PaginationPrevious href/></PaginationItem>
 *   <PaginationItem><PaginationLink href isActive>1</PaginationLink></PaginationItem>
 *   <PaginationItem><PaginationEllipsis/></PaginationItem>
 *   <PaginationItem><PaginationNext href/></PaginationItem>
 * </PaginationContent></Pagination>
 */
declare const Pagination: {
    ({ className, ...props }: PaginationProps): react_jsx_runtime.JSX.Element;
    displayName: string;
};
declare const PaginationContent: react.ForwardRefExoticComponent<PaginationContentProps & react.RefAttributes<HTMLUListElement>>;
declare const PaginationItem: react.ForwardRefExoticComponent<PaginationItemProps & react.RefAttributes<HTMLLIElement>>;
declare const PaginationLink: react.ForwardRefExoticComponent<Omit<PaginationLinkProps, "ref"> & react.RefAttributes<HTMLAnchorElement>>;
declare const PaginationPrevious: react.ForwardRefExoticComponent<Omit<PaginationLinkProps, "ref"> & react.RefAttributes<HTMLAnchorElement>>;
declare const PaginationNext: react.ForwardRefExoticComponent<Omit<PaginationLinkProps, "ref"> & react.RefAttributes<HTMLAnchorElement>>;
declare const PaginationEllipsis: {
    ({ className, ...props }: PaginationEllipsisProps): react_jsx_runtime.JSX.Element;
    displayName: string;
};

/** One pie slice. `name` keys into `config` for color + label; `value` sizes it. */
interface PieChartDatum {
    name: string;
    value: number;
    [key: string]: unknown;
}
interface PieChartProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
    /** Slice data — each datum's `name` keys into `config` for color + label. */
    data: PieChartDatum[];
    /**
     * Series config keyed by datum `name`: { label, color }. Colors should be a
     * chart semantic (`var(--color-chart-1)` … `-5`) so slices re-theme for free.
     */
    config: ChartConfig;
    /** Card header title. Omit to render no header. */
    title?: ReactNode;
    /** Card header description (e.g. a date range). */
    description?: ReactNode;
    /** Card footer content (e.g. a trend line). Omit to render no footer. */
    footer?: ReactNode;
    /** Donut hole radius (px). 0 = a full pie. Default 60 (donut). */
    innerRadius?: number;
    /** Outer radius of the pie (px). */
    outerRadius?: number;
    /** Show the themed legend below the chart. */
    showLegend?: boolean;
    /** Show the themed tooltip on hover. */
    showTooltip?: boolean;
    /** Render slice-name labels on the slices (a LabelList in the background fill). */
    showLabels?: boolean;
    /**
     * Big centered total rendered as an SVG label in the donut hole (ShadCN
     * "donut with text" pattern). Ignored when innerRadius is 0.
     */
    centerValue?: string | number;
    /** Caption under `centerValue` (e.g. "Visitors"). */
    centerLabel?: string | number;
}

/**
 * PieChart — ShadCN pattern on geeklego's 2-tier token system, built on recharts
 * (category B). Mirrors the ShadCN pie-chart blocks: a pre-composed Card with a
 * centered header (title/description), the pie/donut body, an optional legend or
 * on-slice labels, and an optional footer (trend line). recharts owns the
 * geometry; we own the look.
 *
 * The Card + Chart leaves do the work — this composes them:
 *   Card → CardHeader/Content/Footer  ·  ChartContainer (injects --color-<name>
 *   series vars + themes axis/grid)  ·  ChartTooltip/ChartTooltipContent  ·
 *   ChartLegend/ChartLegendContent.
 *
 * Center text uses a recharts SVG <Label content> positioned off the pie's
 * viewBox cx/cy (the ShadCN technique) — NOT a DOM overlay — so it scales and
 * stays centered with the chart. Slice fills read `var(--color-<name>)` injected
 * by ChartContainer; the one place a var() arbitrary is unavoidable (SVG paint
 * has no Tailwind className path), exactly as the base Chart does.
 */
declare const PieChart: react.ForwardRefExoticComponent<PieChartProps & react.RefAttributes<HTMLDivElement>>;

/**
 * Popover — ShadCN/Radix pattern on geeklego's 2-tier tokens.
 *
 * Radix owns positioning, click-outside, escape-to-dismiss, focus management,
 * and the portal. We only style Content with standard semantic utilities.
 * Reusable on its own; also the floating surface that Combobox composes.
 */
declare const Popover: react.FC<RadixPopover.PopoverProps>;
declare const PopoverTrigger: react.ForwardRefExoticComponent<RadixPopover.PopoverTriggerProps & react.RefAttributes<HTMLButtonElement>>;
declare const PopoverAnchor: react.ForwardRefExoticComponent<RadixPopover.PopoverAnchorProps & react.RefAttributes<HTMLDivElement>>;
declare const PopoverContent: react.ForwardRefExoticComponent<Omit<RadixPopover.PopoverContentProps & react.RefAttributes<HTMLDivElement>, "ref"> & react.RefAttributes<HTMLDivElement>>;

/** Extends the Radix Content part — all align/side/collision props pass through. */
type PopoverContentProps = ComponentPropsWithoutRef<typeof RadixPopover.Content>;

interface ProgressProps extends ComponentPropsWithoutRef<typeof RadixProgress.Root> {
    /**
     * Current progress value (0–100). Omit / pass `null` for an indeterminate
     * bar (no known completion), which Radix flags via data-state="indeterminate".
     */
    value?: number | null;
    /** Upper bound of the scale. Defaults to 100. */
    max?: number;
}

/**
 * Progress — ShadCN/Radix pattern on geeklego's 2-tier token system.
 *
 * Radix owns the accessibility surface — role="progressbar", aria-valuenow /
 * aria-valuemax, and the data-state (complete / loading / indeterminate). We
 * supply only the look via standard semantic utilities: a `secondary` track
 * with a `primary` fill that we slide in with a translateX off the value.
 *
 * No variant axis — width/height come from consumer className.
 */
declare const Progress: react.ForwardRefExoticComponent<ProgressProps & react.RefAttributes<HTMLDivElement>>;

/**
 * ProductCard variants — ShadCN pattern on geeklego's 2-tier semantics.
 *
 * ProductCard is composed markup (rung 3) on the Card primitives, so its only
 * variant axis is layout: `orientation` switches between a stacked (vertical)
 * and side-by-side (horizontal) arrangement. All classes are standard semantic
 * / layout utilities — zero custom vocabulary.
 */
declare const productCardVariants: (props?: ({
    orientation?: "horizontal" | "vertical" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type ProductCardVariantProps = VariantProps<typeof productCardVariants>;

interface ProductCardProps extends HTMLAttributes<HTMLDivElement>, ProductCardVariantProps {
}
interface ProductCardMediaProps extends HTMLAttributes<HTMLDivElement>, ProductCardVariantProps {
    /** Image source; rendered into a ratio-constrained <img>. */
    src?: string;
    alt?: string;
    /** Width/height ratio for the media frame (e.g. 4 / 3). */
    ratio?: number;
    /** Pass-through to the underlying <img> (loading, sizes, …). */
    imgProps?: ImgHTMLAttributes<HTMLImageElement>;
    /** Overlay content (e.g. a sale Badge), absolutely positioned over the image. */
    children?: ReactNode;
}
type ProductCardBodyProps = HTMLAttributes<HTMLDivElement>;
type ProductCardTitleProps = HTMLAttributes<HTMLHeadingElement>;
type ProductCardDescriptionProps = HTMLAttributes<HTMLParagraphElement>;
interface ProductCardPriceProps extends HTMLAttributes<HTMLDivElement> {
    /** Current price, pre-formatted (e.g. "$49.00"). */
    price: ReactNode;
    /** Optional struck-through original price for a discount. */
    originalPrice?: ReactNode;
}
type ProductCardFooterProps = HTMLAttributes<HTMLDivElement>;

/**
 * ProductCard — ShadCN pattern on geeklego's 2-tier token system.
 *
 * Composed markup (rung 3) over the shipped Card surface: it reuses Card for the
 * bordered/elevated container and AspectRatio (Radix) for the media frame, then
 * lays out product-specific slots. No focus/keyboard/portal surface of its own,
 * so no new Radix primitive — only its `orientation` layout variant.
 *
 * Compound: <ProductCard><ProductCardMedia/><ProductCardBody><ProductCardTitle/>
 * <ProductCardDescription/><ProductCardPrice/></ProductCardBody>
 * <ProductCardFooter/></ProductCard>. Each part is a thin styled wrapper; the
 * `orientation` prop is threaded to the media so the side-by-side layout sizes
 * the image column correctly.
 */
declare const ProductCard: react.ForwardRefExoticComponent<ProductCardProps & react.RefAttributes<HTMLDivElement>>;
/**
 * ProductCardMedia — the product image frame. Vertical orientation gives a
 * ratio-constrained full-width image; horizontal gives a fixed-width side
 * column. `children` overlay (e.g. a sale Badge) is positioned over the image.
 */
declare const ProductCardMedia: react.ForwardRefExoticComponent<ProductCardMediaProps & react.RefAttributes<HTMLDivElement>>;
/** ProductCardBody — the text region (title, description, price). */
declare const ProductCardBody: react.ForwardRefExoticComponent<ProductCardBodyProps & react.RefAttributes<HTMLDivElement>>;
/** ProductCardTitle — the product name. Renders an <h3>. */
declare const ProductCardTitle: react.ForwardRefExoticComponent<ProductCardTitleProps & react.RefAttributes<HTMLHeadingElement>>;
/** ProductCardDescription — supporting copy at the muted-foreground role. */
declare const ProductCardDescription: react.ForwardRefExoticComponent<ProductCardDescriptionProps & react.RefAttributes<HTMLParagraphElement>>;
/**
 * ProductCardPrice — the price line. The current price reads at full emphasis;
 * an optional `originalPrice` is struck through at the muted role for discounts.
 */
declare const ProductCardPrice: react.ForwardRefExoticComponent<ProductCardPriceProps & react.RefAttributes<HTMLDivElement>>;
/** ProductCardFooter — the action row (e.g. an Add-to-cart Button). */
declare const ProductCardFooter: react.ForwardRefExoticComponent<ProductCardFooterProps & react.RefAttributes<HTMLDivElement>>;

/**
 * Props extend the matching react-resizable-panels parts (v4 API: Group / Panel
 * / Separator), so every prop (orientation, minSize, collapsible, onLayoutChange
 * …) flows through unchanged. We only add `withHandle` to the handle.
 */
type ResizablePanelGroupProps = ComponentProps<typeof Group>;
type ResizablePanelProps = ComponentProps<typeof Panel>;
interface ResizableHandleProps extends ComponentProps<typeof Separator$1> {
    /**
     * Match the parent group's orientation so the handle sizes along the correct
     * axis ("horizontal" group → vertical divider). Defaults to "horizontal".
     */
    orientation?: "horizontal" | "vertical";
    /** Render a visible centered grip affordance on the handle. */
    withHandle?: boolean;
}

/**
 * Resizable — ShadCN pattern on geeklego's 2-tier tokens, built on
 * react-resizable-panels (category B). The library owns ALL behaviour — the
 * drag-resize math, layout persistence, keyboard resizing, collapse/expand, and
 * the role="separator" / aria-orientation wiring. We only supply the look via
 * standard semantic utilities (bg-border for the divider, ring-ring on focus).
 *
 * Compound: <ResizablePanelGroup orientation="horizontal">
 *   <ResizablePanel/><ResizableHandle orientation="horizontal"/><ResizablePanel/>
 * </ResizablePanelGroup>. v4 of the lib exports Group / Panel / Separator; we
 * re-export them under the familiar ShadCN names.
 */
declare const ResizablePanelGroup: {
    ({ className, orientation, ...props }: ResizablePanelGroupProps): react_jsx_runtime.JSX.Element;
    displayName: string;
};
declare const ResizablePanel: {
    (props: ResizablePanelProps): react_jsx_runtime.JSX.Element;
    displayName: string;
};
declare const ResizableHandle: {
    ({ className, orientation, withHandle, ...props }: ResizableHandleProps): react_jsx_runtime.JSX.Element;
    displayName: string;
};

/**
 * ScrollArea — ShadCN/Radix pattern on geeklego's 2-tier token system.
 *
 * Radix owns the cross-browser custom-scrollbar behavior — it hides the native
 * scrollbar, renders a styled thumb/track, and keeps the keyboard/wheel/touch
 * scrolling native on the Viewport. We supply only the look via standard
 * semantic utilities (border for the thumb, transparent track).
 *
 * Compound: <ScrollArea>…content…<ScrollBar/></ScrollArea>. The vertical
 * ScrollBar is rendered by default; add `<ScrollBar orientation="horizontal"/>`
 * for horizontal overflow.
 */
declare const ScrollArea: react.ForwardRefExoticComponent<Omit<RadixScrollArea.ScrollAreaProps & react.RefAttributes<HTMLDivElement>, "ref"> & react.RefAttributes<HTMLDivElement>>;
declare const ScrollBar: react.ForwardRefExoticComponent<Omit<RadixScrollArea.ScrollAreaScrollbarProps & react.RefAttributes<HTMLDivElement>, "ref"> & react.RefAttributes<HTMLDivElement>>;

type ScrollAreaProps = ComponentPropsWithoutRef<typeof RadixScrollArea.Root>;
type ScrollBarProps = ComponentPropsWithoutRef<typeof RadixScrollArea.ScrollAreaScrollbar>;

/**
 * Props extend the matching Radix part, so every native + Radix prop
 * (value, onValueChange, position, side, disabled, etc.) flows through
 * unchanged. We add only what's genuinely ours (`inset` on the label).
 */
type SelectTriggerProps = ComponentPropsWithoutRef<typeof RadixSelect.Trigger>;
type SelectContentProps = ComponentPropsWithoutRef<typeof RadixSelect.Content>;
interface SelectLabelProps extends ComponentPropsWithoutRef<typeof RadixSelect.Label> {
    /** Indent the label to align with items (which carry a leading check slot). */
    inset?: boolean;
}
type SelectItemProps = ComponentPropsWithoutRef<typeof RadixSelect.Item>;
type SelectSeparatorProps = ComponentPropsWithoutRef<typeof RadixSelect.Separator>;
type SelectScrollUpButtonProps = ComponentPropsWithoutRef<typeof RadixSelect.ScrollUpButton>;
type SelectScrollDownButtonProps = ComponentPropsWithoutRef<typeof RadixSelect.ScrollDownButton>;

/**
 * Select — ShadCN/Radix compound component on geeklego's 2-tier tokens.
 *
 * Radix owns ALL behavior — the listbox, typeahead, arrow-key nav,
 * aria-activedescendant, escape/click-outside dismiss, portal, scroll buttons,
 * and the role=listbox / option ARIA wiring. We only supply the look, via
 * standard semantic utilities (border-input, bg-popover, focus:bg-accent …).
 *
 * Styling note: no component-token tier and no --ext-* tokens — a select is
 * plain ShadCN vocabulary. The trigger reuses the same border-input / ring-ring
 * affordances as Input so the two controls match in a FormField.
 */
declare const Select: react.FC<RadixSelect.SelectProps>;
declare const SelectGroup: react.ForwardRefExoticComponent<RadixSelect.SelectGroupProps & react.RefAttributes<HTMLDivElement>>;
declare const SelectValue: react.ForwardRefExoticComponent<RadixSelect.SelectValueProps & react.RefAttributes<HTMLSpanElement>>;
declare const SelectTrigger: react.ForwardRefExoticComponent<Omit<RadixSelect.SelectTriggerProps & react.RefAttributes<HTMLButtonElement>, "ref"> & react.RefAttributes<HTMLButtonElement>>;
declare const SelectScrollUpButton: react.ForwardRefExoticComponent<Omit<RadixSelect.SelectScrollUpButtonProps & react.RefAttributes<HTMLDivElement>, "ref"> & react.RefAttributes<HTMLDivElement>>;
declare const SelectScrollDownButton: react.ForwardRefExoticComponent<Omit<RadixSelect.SelectScrollDownButtonProps & react.RefAttributes<HTMLDivElement>, "ref"> & react.RefAttributes<HTMLDivElement>>;
declare const SelectContent: react.ForwardRefExoticComponent<Omit<RadixSelect.SelectContentProps & react.RefAttributes<HTMLDivElement>, "ref"> & react.RefAttributes<HTMLDivElement>>;
declare const SelectLabel: react.ForwardRefExoticComponent<SelectLabelProps & react.RefAttributes<HTMLDivElement>>;
declare const SelectItem: react.ForwardRefExoticComponent<Omit<RadixSelect.SelectItemProps & react.RefAttributes<HTMLDivElement>, "ref"> & react.RefAttributes<HTMLDivElement>>;
declare const SelectSeparator: react.ForwardRefExoticComponent<Omit<RadixSelect.SelectSeparatorProps & react.RefAttributes<HTMLDivElement>, "ref"> & react.RefAttributes<HTMLDivElement>>;

/**
 * Separator — ShadCN/Radix pattern on geeklego's 2-tier tokens.
 *
 * Radix owns the semantics: a decorative separator is hidden from the
 * accessibility tree, a non-decorative one gets role="separator" + the right
 * aria-orientation. We only supply the look (a 1px border-coloured line) via
 * standard semantic utilities. Orientation flips width/height off the prop.
 *
 * No variant axis — orientation is a Radix prop, not a cva variant.
 */
declare const Separator: react.ForwardRefExoticComponent<Omit<RadixSeparator.SeparatorProps & react.RefAttributes<HTMLDivElement>, "ref"> & react.RefAttributes<HTMLDivElement>>;

/**
 * Props extend the Radix Separator.Root part, so `orientation`
 * ("horizontal" | "vertical") and `decorative` flow through unchanged.
 * No variant axis.
 */
type SeparatorProps = ComponentPropsWithoutRef<typeof RadixSeparator.Root>;

/**
 * Sheet content variants — ShadCN pattern on geeklego's 2-tier semantics.
 *
 * The `side` axis pins the panel to one edge and sets the matching slide-in
 * transform (off Radix Dialog's data-[state]). Core utilities only
 * (bg-background, border-border). Top/bottom panels span the full width; left/
 * right span the full height at a capped width.
 */
declare const sheetVariants: (props?: ({
    side?: "left" | "right" | "bottom" | "top" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type SheetVariantProps = VariantProps<typeof sheetVariants>;

/**
 * Sheet props extend the matching Radix Dialog part, so every native + Radix
 * prop (onOpenChange, onEscapeKeyDown, forceMount …) flows through unchanged.
 * Sheet IS a Radix Dialog positioned as an edge panel — we only add the `side`
 * axis and the built-in close affordance.
 */
type SheetOverlayProps = ComponentPropsWithoutRef<typeof RadixDialog.Overlay>;
interface SheetContentProps extends ComponentPropsWithoutRef<typeof RadixDialog.Content>, SheetVariantProps {
    /** Render the built-in top-right close button. Default true. */
    showClose?: boolean;
    /**
     * Per-instance i18n override for the close-button aria-label. Beats the
     * GeeklegoI18nProvider context, which beats the English default ("Close").
     */
    i18nStrings?: DialogI18nStrings;
}
type SheetTitleProps = ComponentPropsWithoutRef<typeof RadixDialog.Title>;
type SheetDescriptionProps = ComponentPropsWithoutRef<typeof RadixDialog.Description>;
type SheetHeaderProps = HTMLAttributes<HTMLDivElement>;
type SheetFooterProps = HTMLAttributes<HTMLDivElement>;

/**
 * Sheet — ShadCN/Radix compound component on geeklego's 2-tier tokens.
 *
 * A Sheet IS a Radix Dialog rendered as an edge-anchored panel. Radix owns ALL
 * behavior — focus trap, escape-to-dismiss, click-outside, scroll lock, portal,
 * and the aria-modal / aria-labelledby / aria-describedby wiring (the last via
 * Title/Description). We only supply the look via standard semantic utilities
 * and the `side` slide-in transform (sheetVariants), animated off Radix's
 * data-[state] — no animation library needed.
 *
 * Compound: <Sheet><SheetTrigger/><SheetContent side="right"><SheetHeader>
 *   <SheetTitle/><SheetDescription/></SheetHeader>…<SheetFooter/></SheetContent></Sheet>
 */
declare const Sheet: react.FC<RadixDialog.DialogProps>;
declare const SheetTrigger: react.ForwardRefExoticComponent<RadixDialog.DialogTriggerProps & react.RefAttributes<HTMLButtonElement>>;
declare const SheetClose: react.ForwardRefExoticComponent<RadixDialog.DialogCloseProps & react.RefAttributes<HTMLButtonElement>>;
declare const SheetPortal: react.FC<RadixDialog.DialogPortalProps>;
declare const SheetOverlay: react.ForwardRefExoticComponent<Omit<RadixDialog.DialogOverlayProps & react.RefAttributes<HTMLDivElement>, "ref"> & react.RefAttributes<HTMLDivElement>>;
declare const SheetContent: react.ForwardRefExoticComponent<SheetContentProps & react.RefAttributes<HTMLDivElement>>;
declare const SheetHeader: {
    ({ className, ...props }: SheetHeaderProps): react_jsx_runtime.JSX.Element;
    displayName: string;
};
declare const SheetFooter: {
    ({ className, ...props }: SheetFooterProps): react_jsx_runtime.JSX.Element;
    displayName: string;
};
declare const SheetTitle: react.ForwardRefExoticComponent<Omit<RadixDialog.DialogTitleProps & react.RefAttributes<HTMLHeadingElement>, "ref"> & react.RefAttributes<HTMLHeadingElement>>;
declare const SheetDescription: react.ForwardRefExoticComponent<Omit<RadixDialog.DialogDescriptionProps & react.RefAttributes<HTMLParagraphElement>, "ref"> & react.RefAttributes<HTMLParagraphElement>>;

/**
 * sidebarMenuButtonVariants — the one real variant axis in the Sidebar slice.
 *
 * Menu buttons are the interactive rows in the nav. They render on the sidebar
 * surface (--ext-sidebar-*), so hover/active use the sidebar accent tokens
 * rather than the core --accent (the panel is its own surface). The collapsed
 * icon-mode width is driven by the data-[collapsible=icon] selector on the
 * sidebar root, handled in the component classes — these variants only own the
 * look and size of the button itself.
 */
declare const sidebarMenuButtonVariants: (props?: ({
    variant?: "default" | "outline" | null | undefined;
    size?: "sm" | "md" | "lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;

/** Shared shape of the sidebar context (provided by SidebarProvider). */
interface SidebarContextValue {
    /** Expanded/collapsed state on desktop. */
    state: "expanded" | "collapsed";
    /** Whether the (desktop) sidebar is open. */
    open: boolean;
    setOpen: (open: boolean) => void;
    /** Whether the mobile (Sheet) sidebar is open. */
    openMobile: boolean;
    setOpenMobile: (open: boolean) => void;
    /** True when the viewport is below the mobile breakpoint. */
    isMobile: boolean;
    /** Toggle the appropriate sidebar for the current viewport. */
    toggleSidebar: () => void;
}
interface SidebarProviderProps extends ComponentProps<"div"> {
    /** Controlled open state (desktop). */
    open?: boolean;
    /** Uncontrolled initial open state (desktop). Defaults to true. */
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
}
interface SidebarProps extends ComponentProps<"div"> {
    /** Which edge the sidebar anchors to. */
    side?: "left" | "right";
    /** Visual treatment of the panel. */
    variant?: "sidebar" | "floating" | "inset";
    /**
     * How the sidebar collapses on desktop. Defaults to `icon` (shrinks to a
     * visible icon rail). `offcanvas` slides the whole panel off-screen; `none`
     * disables collapsing.
     */
    collapsible?: "offcanvas" | "icon" | "none";
}
type SidebarHeaderProps = ComponentProps<"div">;
type SidebarFooterProps = ComponentProps<"div">;
type SidebarContentProps = ComponentProps<"div">;
type SidebarGroupProps = ComponentProps<"div">;
type SidebarGroupLabelProps = ComponentProps<"div">;
type SidebarGroupContentProps = ComponentProps<"div">;
type SidebarMenuProps = ComponentProps<"ul">;
type SidebarMenuItemProps = ComponentProps<"li">;
type SidebarMenuSubProps = ComponentProps<"ul">;
type SidebarTriggerProps = ButtonHTMLAttributes<HTMLButtonElement>;
type SidebarMenuButtonVariantProps = VariantProps<typeof sidebarMenuButtonVariants>;
interface SidebarMenuButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, SidebarMenuButtonVariantProps {
    /** Render as the child element (e.g. an <a> or a router Link). */
    asChild?: boolean;
    /** Highlight as the active page. */
    isActive?: boolean;
    /**
     * Tooltip shown when the sidebar is collapsed to icon mode. A plain string
     * label; pass nothing to disable. Hidden unless `collapsible="icon"` and
     * the sidebar is collapsed (or on mobile, where it's always hidden).
     */
    tooltip?: string;
}
interface SidebarMenuSubButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
    asChild?: boolean;
    isActive?: boolean;
    size?: "sm" | "md";
}
type SidebarInsetProps = ComponentProps<"main">;
type SidebarRailProps = ButtonHTMLAttributes<HTMLButtonElement>;
type SidebarSeparatorProps = ComponentProps<"div">;

declare function useSidebar(): SidebarContextValue;
declare const SidebarProvider: react.ForwardRefExoticComponent<Omit<SidebarProviderProps, "ref"> & react.RefAttributes<HTMLDivElement>>;
declare const Sidebar: react.ForwardRefExoticComponent<Omit<SidebarProps, "ref"> & react.RefAttributes<HTMLDivElement>>;
declare const SidebarTrigger: react.ForwardRefExoticComponent<SidebarTriggerProps & react.RefAttributes<HTMLButtonElement>>;
/** Rail — a thin click target along the panel edge that toggles the sidebar. */
declare const SidebarRail: react.ForwardRefExoticComponent<SidebarRailProps & react.RefAttributes<HTMLButtonElement>>;
/** Inset — the main content region that sits beside the sidebar. */
declare const SidebarInset: react.ForwardRefExoticComponent<Omit<react.DetailedHTMLProps<react.HTMLAttributes<HTMLElement>, HTMLElement>, "ref"> & react.RefAttributes<HTMLDivElement>>;
declare const SidebarHeader: react.ForwardRefExoticComponent<Omit<react.DetailedHTMLProps<react.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & react.RefAttributes<HTMLDivElement>>;
declare const SidebarFooter: react.ForwardRefExoticComponent<Omit<react.DetailedHTMLProps<react.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & react.RefAttributes<HTMLDivElement>>;
declare const SidebarContent: react.ForwardRefExoticComponent<Omit<react.DetailedHTMLProps<react.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & react.RefAttributes<HTMLDivElement>>;
declare const SidebarSeparator: react.ForwardRefExoticComponent<Omit<react.DetailedHTMLProps<react.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & react.RefAttributes<HTMLDivElement>>;
declare const SidebarGroup: react.ForwardRefExoticComponent<Omit<react.DetailedHTMLProps<react.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & react.RefAttributes<HTMLDivElement>>;
declare const SidebarGroupLabel: react.ForwardRefExoticComponent<Omit<react.DetailedHTMLProps<react.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & react.RefAttributes<HTMLDivElement>>;
declare const SidebarGroupContent: react.ForwardRefExoticComponent<Omit<react.DetailedHTMLProps<react.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & react.RefAttributes<HTMLDivElement>>;
declare const SidebarMenu: react.ForwardRefExoticComponent<Omit<react.DetailedHTMLProps<react.HTMLAttributes<HTMLUListElement>, HTMLUListElement>, "ref"> & react.RefAttributes<HTMLUListElement>>;
declare const SidebarMenuItem: react.ForwardRefExoticComponent<Omit<react.DetailedHTMLProps<react.LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>, "ref"> & react.RefAttributes<HTMLLIElement>>;
declare const SidebarMenuButton: react.ForwardRefExoticComponent<SidebarMenuButtonProps & react.RefAttributes<HTMLButtonElement>>;
declare const SidebarMenuSub: react.ForwardRefExoticComponent<Omit<react.DetailedHTMLProps<react.HTMLAttributes<HTMLUListElement>, HTMLUListElement>, "ref"> & react.RefAttributes<HTMLUListElement>>;
declare const SidebarMenuSubButton: react.ForwardRefExoticComponent<SidebarMenuSubButtonProps & react.RefAttributes<HTMLAnchorElement>>;

/**
 * Skeleton is a styled <div> — no variant axis. Shape/size are supplied via
 * consumer className; all native div attributes pass through.
 */
type SkeletonProps = HTMLAttributes<HTMLDivElement>;

/**
 * Skeleton — pure-presentation placeholder for loading states (category C:
 * no a11y/keyboard/state surface, so hand-rolled with cn + forwardRef, no Radix).
 *
 * A muted rounded block with a pulse animation. Shape/size come from the
 * consumer's className (h-*, w-*, rounded-*, size-*), merged last-wins via cn().
 */
declare const Skeleton: react.ForwardRefExoticComponent<SkeletonProps & react.RefAttributes<HTMLDivElement>>;

/**
 * Props extend sonner's Toaster, so every prop (position, richColors, expand,
 * duration, closeButton …) flows through unchanged. We only preset the styling
 * via toastOptions.classNames in the component.
 */
type ToasterProps = ComponentProps<typeof Toaster$1>;

/**
 * Sonner (Toaster) — ShadCN pattern on geeklego's 2-tier tokens, built on the
 * `sonner` library (category B). Sonner owns ALL behaviour — the toast queue,
 * stacking, swipe-to-dismiss, timers, promise toasts, and the ARIA live-region
 * announcements. We only restyle its parts via toastOptions.classNames using
 * standard semantic utilities (bg-popover, text-popover-foreground, border-border
 * …) so toasts match the rest of the system in both light and dark.
 *
 * Render <Toaster /> once near the app root, then fire toasts imperatively with
 * the re-exported `toast()` (toast.success / .error / .promise / …). Theming
 * follows the host's `.dark` / data-theme since the portalled surface uses the
 * same semantic tokens.
 */
declare const Toaster: {
    ({ ...props }: ToasterProps): react_jsx_runtime.JSX.Element;
    displayName: string;
};

/**
 * Switch — ShadCN/Radix pattern on geeklego's 2-tier token system.
 *
 * Radix owns the behavior — role="switch", keyboard toggle, aria-checked,
 * and form integration. We supply only the look via standard semantic
 * utilities: the track fills with `primary` when checked and `input` when
 * off, and the thumb (a `background` circle) slides between the two ends
 * off Radix's data-state attribute.
 *
 * No variant axis — size via consumer className.
 */
declare const Switch: react.ForwardRefExoticComponent<Omit<RadixSwitch.SwitchProps & react.RefAttributes<HTMLButtonElement>, "ref"> & react.RefAttributes<HTMLButtonElement>>;

/**
 * Props extend the Radix Switch.Root part, so every native + Radix prop
 * (checked, defaultChecked, onCheckedChange, disabled, required, name, value)
 * flows through unchanged. No variant axis — size via consumer className.
 */
type SwitchProps = ComponentPropsWithoutRef<typeof RadixSwitch.Root>;

/**
 * Table is semantic table markup (<table>/<thead>/<tbody>/<tr>/<th>/<td>) with
 * no focus/keyboard/state surface — styled markup (rung 3). No variant axis;
 * each sub-part is a thin styled wrapper, per-instance tweaks via consumer
 * className. The root wraps the <table> in an overflow container.
 */
type TableProps = TableHTMLAttributes<HTMLTableElement>;
type TableSectionProps = HTMLAttributes<HTMLTableSectionElement>;
type TableRowProps = HTMLAttributes<HTMLTableRowElement>;
type TableHeadProps = ThHTMLAttributes<HTMLTableCellElement>;
type TableCellProps = TdHTMLAttributes<HTMLTableCellElement>;
type TableCaptionProps = HTMLAttributes<HTMLTableCaptionElement>;

/**
 * Table — ShadCN pattern on geeklego's 2-tier token system.
 *
 * Semantic table markup with no a11y/keyboard/state surface, so it's styled
 * markup (rung 3) — hand-rolled with cn + forwardRef. Styled entirely with
 * standard semantic utilities (border-border, bg-muted, text-muted-foreground).
 * The root wraps the <table> in a horizontal-overflow container so wide tables
 * scroll instead of breaking layout.
 *
 * Compound: <Table><TableHeader><TableRow><TableHead/></TableRow></TableHeader>
 *   <TableBody><TableRow><TableCell/></TableRow></TableBody></Table>
 */
declare const Table: react.ForwardRefExoticComponent<TableProps & react.RefAttributes<HTMLTableElement>>;
declare const TableHeader: react.ForwardRefExoticComponent<TableSectionProps & react.RefAttributes<HTMLTableSectionElement>>;
declare const TableBody: react.ForwardRefExoticComponent<TableSectionProps & react.RefAttributes<HTMLTableSectionElement>>;
declare const TableFooter: react.ForwardRefExoticComponent<TableSectionProps & react.RefAttributes<HTMLTableSectionElement>>;
declare const TableRow: react.ForwardRefExoticComponent<TableRowProps & react.RefAttributes<HTMLTableRowElement>>;
declare const TableHead: react.ForwardRefExoticComponent<TableHeadProps & react.RefAttributes<HTMLTableCellElement>>;
declare const TableCell: react.ForwardRefExoticComponent<TableCellProps & react.RefAttributes<HTMLTableCellElement>>;
declare const TableCaption: react.ForwardRefExoticComponent<TableCaptionProps & react.RefAttributes<HTMLTableCaptionElement>>;

/**
 * Each prop type extends its Radix Tabs part, so all native + Radix props
 * (value, defaultValue, onValueChange, orientation, dir on Root; value on
 * Trigger/Content; disabled on Trigger) flow through unchanged. No variant axis.
 */
type TabsProps = ComponentPropsWithoutRef<typeof RadixTabs.Root>;
type TabsListProps = ComponentPropsWithoutRef<typeof RadixTabs.List>;
type TabsTriggerProps = ComponentPropsWithoutRef<typeof RadixTabs.Trigger>;
type TabsContentProps = ComponentPropsWithoutRef<typeof RadixTabs.Content>;

/**
 * Tabs — ShadCN/Radix compound on geeklego's 2-tier tokens.
 *
 * Radix owns the behavior — roving tabindex, arrow-key navigation,
 * aria-selected / aria-controls wiring, and the active panel toggle. We only
 * style each part with standard semantic utilities. No cva variants: each
 * sub-part has fixed classes, and per-instance differences come from consumer
 * className merged via cn().
 *
 * Parts: Tabs (Root) · TabsList · TabsTrigger · TabsContent.
 */
declare const Tabs: React.FC<TabsProps>;
declare const TabsList: react.ForwardRefExoticComponent<Omit<RadixTabs.TabsListProps & react.RefAttributes<HTMLDivElement>, "ref"> & react.RefAttributes<HTMLDivElement>>;
declare const TabsTrigger: react.ForwardRefExoticComponent<Omit<RadixTabs.TabsTriggerProps & react.RefAttributes<HTMLButtonElement>, "ref"> & react.RefAttributes<HTMLButtonElement>>;
declare const TabsContent: react.ForwardRefExoticComponent<Omit<RadixTabs.TabsContentProps & react.RefAttributes<HTMLDivElement>, "ref"> & react.RefAttributes<HTMLDivElement>>;

/**
 * Toggle variants — ShadCN pattern on geeklego's 2-tier semantics.
 *
 * A two-state pressable. The "on" look comes from Radix's data-[state=on]
 * (a quiet `accent` highlight — the role-appropriate semantic for a
 * selected/active control, not a loud `primary` fill). Core variants use ONLY
 * standard semantic utilities.
 *
 * Shared by Toggle and ToggleGroupItem (ShadCN reuses this cva for both).
 */
declare const toggleVariants: (props?: ({
    variant?: "default" | "outline" | null | undefined;
    size?: "sm" | "md" | "lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type ToggleVariantProps = VariantProps<typeof toggleVariants>;

interface ToggleProps extends ComponentPropsWithoutRef<typeof RadixToggle.Root>, ToggleVariantProps {
}

/**
 * Toggle — ShadCN/Radix pattern on geeklego's 2-tier token system.
 *
 * A standalone two-state pressable (bold / italic / mute …). Radix owns the
 * pressed-state behavior — aria-pressed, keyboard toggle, and the
 * data-[state=on|off] attribute the `toggleVariants` style off. We supply only
 * the look via standard semantic utilities.
 */
declare const Toggle: react.ForwardRefExoticComponent<ToggleProps & react.RefAttributes<HTMLButtonElement>>;

type ToggleGroupProps = ComponentPropsWithoutRef<typeof RadixToggleGroup.Root> & ToggleVariantProps;
type ToggleGroupItemProps = ComponentPropsWithoutRef<typeof RadixToggleGroup.Item> & ToggleVariantProps;

declare const ToggleGroup: react.ForwardRefExoticComponent<ToggleGroupProps & react.RefAttributes<HTMLDivElement>>;
declare const ToggleGroupItem: react.ForwardRefExoticComponent<Omit<RadixToggleGroup.ToggleGroupItemProps & react.RefAttributes<HTMLButtonElement>, "ref"> & ToggleVariantProps & react.RefAttributes<HTMLButtonElement>>;

/**
 * Tooltip — ShadCN/Radix compound on geeklego's 2-tier tokens.
 *
 * Radix owns the behavior — hover/focus open delay, positioning, the portal,
 * aria-describedby wiring, and escape/pointer dismissal. We only style Content
 * with standard semantic utilities. Content is PORTALLED to <body>, so dark
 * stories use the withDarkPortalRoot decorator.
 *
 * Parts: TooltipProvider · Tooltip (Root) · TooltipTrigger · TooltipContent.
 * Wrap the app (or the story) in a single TooltipProvider so the open/close
 * delays are shared — the ShadCN convention.
 */
declare const TooltipProvider: react.FC<RadixTooltip.TooltipProviderProps>;
declare const Tooltip: react.FC<RadixTooltip.TooltipProps>;
declare const TooltipTrigger: react.ForwardRefExoticComponent<RadixTooltip.TooltipTriggerProps & react.RefAttributes<HTMLButtonElement>>;
declare const TooltipContent: react.ForwardRefExoticComponent<Omit<RadixTooltip.TooltipContentProps & react.RefAttributes<HTMLDivElement>, "ref"> & react.RefAttributes<HTMLDivElement>>;

/**
 * TooltipContent props extend the Radix Tooltip.Content part, so positioning
 * props (side, align, sideOffset, alignOffset, avoidCollisions) flow through
 * unchanged. The other parts (Provider/Root/Trigger) are re-exported as-is.
 * No variant axis.
 */
type TooltipContentProps = ComponentPropsWithoutRef<typeof RadixTooltip.Content>;

/**
 * Typography variants — ShadCN-style cva on geeklego's 2-tier tokens.
 *
 * Each variant is a NAMED BUNDLE of standard type-scale utilities
 * (text-*, font-*, leading-*, tracking-*) + a semantic colour. It hardcodes
 * NOTHING — every utility resolves to a Tier-1 primitive the Token Editor owns
 * (--text-4xl, --font-weight-bold, --tracking-tight, …). Retune the scale in the
 * cockpit and every <Typography variant="h1"> re-sizes live; this file only
 * decides *which* tokens compose a heading vs. body vs. caption.
 *
 * The default DOM element per variant is resolved in Typography.tsx (h1→h1,
 * body→p, …); `asChild` / the `as` prop can override it.
 */
declare const typographyVariants: (props?: ({
    variant?: "h2" | "h3" | "blockquote" | "body" | "code" | "h1" | "h4" | "small" | "large" | "lead" | "muted" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type TypographyVariantProps = VariantProps<typeof typographyVariants>;

interface TypographyProps extends HTMLAttributes<HTMLElement>, TypographyVariantProps {
    /**
     * Render as the child element instead of the variant's default tag, merging
     * props onto it (Radix Slot). Use to keep the type style while changing the
     * element: `<Typography variant="h1" asChild><a href="…">…</a></Typography>`.
     */
    asChild?: boolean;
}

declare const Typography: react.ForwardRefExoticComponent<TypographyProps & react.RefAttributes<HTMLElement>>;

/**
 * Shared ARIA pattern types for Geeklego components.
 *
 * These interfaces enforce correct ARIA attribute combinations at the
 * TypeScript level. Components import the relevant type and spread the
 * result of a helper function onto their elements.
 */
/** Props for the trigger element of a disclosure (button that toggles a panel). */
interface AriaDisclosureTriggerProps {
    'aria-expanded': boolean;
    'aria-controls': string;
}
/** Props for the panel element of a disclosure (the revealed content). */
interface AriaDisclosurePanelProps {
    id: string;
    role: 'region';
}
/** Props for a navigation item (link or button in a nav list). */
interface AriaNavigationItemProps {
    'aria-current'?: 'page' | 'step' | 'location' | 'date' | 'time' | 'true';
    'aria-disabled'?: true;
    tabIndex?: 0 | -1;
}
/** Props for a live region that announces dynamic content changes. */
interface AriaLiveRegionProps {
    'aria-live': 'polite' | 'assertive' | 'off';
    'aria-atomic'?: boolean;
    role?: 'status' | 'alert' | 'log';
}
/** Props for a loading/busy element. */
interface AriaLoadingProps {
    'aria-busy': true;
}
/** Props for a disabled interactive element (both HTML + ARIA). */
interface AriaDisabledProps {
    'aria-disabled': true;
    disabled: true;
}
/** Props for a form field in an error state. */
interface AriaErrorFieldProps {
    'aria-invalid': 'true';
    'aria-describedby': string;
}
/** Props for a decorative icon (hidden from assistive tech). */
interface AriaDecorativeIconProps {
    'aria-hidden': true;
}
/** Props for a meaningful icon (provides its own label). */
interface AriaMeaningfulIconProps {
    role: 'img';
    'aria-label': string;
}
/** Union of decorative or meaningful icon props. */
type AriaIconProps = AriaDecorativeIconProps | AriaMeaningfulIconProps;

/**
 * Pure helper functions that return correct ARIA attribute objects.
 *
 * These are stateless — no hooks, no side effects. They compute the correct
 * ARIA props for common patterns so components don't hand-roll them.
 */

/**
 * Returns ARIA props for a disclosure trigger + panel pair.
 *
 * @example
 * const [triggerProps, panelProps] = getDisclosureProps(isOpen, panelId)
 * <button {...triggerProps}>Toggle</button>
 * <div {...panelProps}>Content</div>
 */
declare function getDisclosureProps(isExpanded: boolean, panelId: string): [AriaDisclosureTriggerProps, AriaDisclosurePanelProps];
/**
 * Returns ARIA props for a navigation item.
 *
 * @example
 * <a {...getNavigationItemProps({ isActive: true })}>Dashboard</a>
 */
declare function getNavigationItemProps(options: {
    isActive?: boolean;
    disabled?: boolean;
}): AriaNavigationItemProps;
/**
 * Returns ARIA props for a live region.
 *
 * @param type - 'polite' for non-urgent updates, 'assertive' for critical alerts, 'status' for status bars
 *
 * @example
 * <div {...getLiveRegionProps('polite')}>3 results found</div>
 */
declare function getLiveRegionProps(type: 'polite' | 'assertive' | 'status'): AriaLiveRegionProps;
/**
 * Returns `{ 'aria-busy': true }` when loading, empty object when not.
 *
 * @example
 * <button {...getLoadingProps(isLoading)}>Save</button>
 */
declare function getLoadingProps(isLoading: boolean): AriaLoadingProps | Record<string, never>;
/**
 * Returns disabled + aria-disabled when disabled, empty object when not.
 *
 * @example
 * <button {...getDisabledProps(isDisabled)}>Submit</button>
 */
declare function getDisabledProps(isDisabled: boolean): AriaDisabledProps | Record<string, never>;
/**
 * Returns error field ARIA props when in error state.
 *
 * @param hasError - whether the field has a validation error
 * @param errorId - the id of the error message element
 *
 * @example
 * <input {...getErrorFieldProps(hasError, errorId)} />
 * <span id={errorId}>This field is required</span>
 */
declare function getErrorFieldProps(hasError: boolean, errorId: string): AriaErrorFieldProps | Record<string, never>;
/**
 * Returns correct ARIA props for an icon wrapper.
 *
 * Decorative icons (alongside visible text) get `aria-hidden="true"`.
 * Meaningful icons (sole content of a control) get `role="img"` + `aria-label`.
 *
 * @example
 * // Decorative (next to text label)
 * <span {...getIconProps(true)}><SearchIcon /></span> Search
 *
 * // Meaningful (icon-only button — label goes on the button, not the icon)
 * <button aria-label="Search"><span {...getIconProps(true)}><SearchIcon /></span></button>
 */
declare function getIconProps(isDecorative: true): {
    'aria-hidden': true;
};
declare function getIconProps(isDecorative: false, label: string): {
    role: 'img';
    'aria-label': string;
};

type VisuallyHiddenElement = 'span' | 'div' | 'p';
interface VisuallyHiddenProps extends HTMLAttributes<HTMLElement> {
    as?: VisuallyHiddenElement;
    children: ReactNode;
}

declare const VisuallyHidden: react.NamedExoticComponent<VisuallyHiddenProps & react.RefAttributes<HTMLElement>>;

/**
 * Types for Geeklego security utilities.
 *
 * All helpers are pure functions — no DOM dependency, runs in SSR.
 */
/**
 * Protocols considered unsafe for use in href attributes.
 * These are stripped and replaced with '#' by sanitizeHref.
 */
type UnsafeProtocol = 'javascript:' | 'data:text/html' | 'vbscript:';
/**
 * Props returned by getSafeExternalLinkProps.
 * Always safe to spread onto an <a> element.
 */
interface SafeExternalLinkProps {
    href: string;
    target?: string;
    rel?: string;
}

/**
 * Geeklego security utilities.
 *
 * Pure functions — no DOM dependency, no side effects.
 * Safe to use in SSR environments (no window/document access).
 *
 * Component import pattern (use relative path, not the barrel):
 *   import { sanitizeHref, getSafeExternalLinkProps } from '../../utils/security/sanitize';
 */

/**
 * Strips unsafe URI protocols from an href value.
 *
 * Returns '#' when:
 * - The trimmed href starts with a blocked protocol (case-insensitive, whitespace-tolerant)
 * - The value is undefined or empty
 *
 * Returns the original value unchanged when:
 * - It is a fragment:      '#section-id'
 * - It is a relative path: '/page', './page', '../page'
 * - It is an HTTP(S) URL:  'https://example.com'
 * - It is a mailto/tel:    'mailto:hi@ex.com', 'tel:+1234'
 *
 * @example
 * sanitizeHref('javascript:alert(1)')  // → '#'
 * sanitizeHref('JavaScript:alert(1)') // → '#'   (case-insensitive)
 * sanitizeHref(' javascript:alert(1)')// → '#'   (leading whitespace)
 * sanitizeHref('https://example.com') // → 'https://example.com'
 * sanitizeHref('#section')            // → '#section'
 * sanitizeHref(undefined)             // → '#'
 *
 * @pure — no DOM, no side effects, runs in SSR
 */
declare function sanitizeHref(href: string | undefined): string;
/**
 * Returns safe anchor props, automatically adding rel="noopener noreferrer"
 * when target="_blank". Always sanitizes href via sanitizeHref.
 *
 * Consumer-supplied rel values are preserved and de-duplicated against
 * the mandatory safety directives.
 *
 * @example
 * getSafeExternalLinkProps('https://example.com', '_blank')
 * // → { href: 'https://example.com', target: '_blank', rel: 'noopener noreferrer' }
 *
 * getSafeExternalLinkProps('/about')
 * // → { href: '/about' }
 *
 * getSafeExternalLinkProps('https://example.com', '_blank', 'sponsored')
 * // → { href: 'https://example.com', target: '_blank', rel: 'noopener noreferrer sponsored' }
 *
 * @pure — no DOM, no side effects, runs in SSR
 */
declare function getSafeExternalLinkProps(href: string | undefined, target?: string, rel?: string): SafeExternalLinkProps;

interface GeeklegoI18nProviderProps {
    children: ReactNode;
    /**
     * Partial string overrides applied library-wide.
     * Components merge these with their own defaults; per-instance `i18nStrings`
     * props override these.
     *
     * @example
     * <GeeklegoI18nProvider
     *   strings={{ label: { required: '(obligatoire)' }, sidebar: { navLabel: 'Navigation' } }}
     * >
     *   <App />
     * </GeeklegoI18nProvider>
     */
    strings?: GeeklegoI18nStrings;
    /**
     * Locale-aware formatters for number, percentage, and date display.
     * Affects AreaChart Y-axis and BarChart percentage values when provided.
     */
    formatters?: GeeklegoFormatters;
    /**
     * BCP 47 locale tag passed through to formatters that accept it.
     * Does not affect Geeklego itself — available for consumer formatter logic.
     */
    locale?: string;
}
/**
 * Optional library-wide i18n provider for Geeklego.
 *
 * Wrap your application (or a subtree) with this provider to apply
 * locale-specific strings and formatters to all Geeklego components.
 * Per-instance `i18nStrings` props on individual components override
 * anything set here.
 *
 * Geeklego is library-agnostic — wire your own i18n tool here:
 *
 * @example
 * // With react-intl
 * <GeeklegoI18nProvider
 *   strings={{ barChart: { deltaLabel: intl.formatMessage({ id: 'chart.delta' }) } }}
 * >
 *   <App />
 * </GeeklegoI18nProvider>
 */
declare function GeeklegoI18nProvider({ children, strings, formatters, locale, }: GeeklegoI18nProviderProps): react_jsx_runtime.JSX.Element;

interface StructuredDataProps {
    /** JSON-LD structured data object. Must include @context and @type. */
    data: Record<string, unknown>;
}

/**
 * Injects a JSON-LD `<script type="application/ld+json">` into `document.head`.
 * Removes the script on unmount. Renders nothing visible (returns `null`).
 *
 * Use at the template/page level for Schema.org types that don't map to a
 * single component's DOM (e.g., WebPage, WebApplication, FAQPage).
 *
 * @example
 * <StructuredData data={{
 *   '@context': 'https://schema.org',
 *   '@type': 'WebPage',
 *   name: 'Dashboard',
 *   description: 'Application dashboard',
 * }} />
 */
declare function StructuredData({ data }: StructuredDataProps): null;

export { Accordion, AccordionContent, type AccordionContentProps, type AccordionI18nStrings, AccordionItem, type AccordionItemProps, type AccordionProps, AccordionTrigger, type AccordionTriggerProps, Alert, AlertDescription, type AlertDescriptionProps, AlertDialog, AlertDialogAction, type AlertDialogActionProps, AlertDialogCancel, type AlertDialogCancelProps, AlertDialogContent, type AlertDialogContentProps, AlertDialogDescription, type AlertDialogDescriptionProps, AlertDialogFooter, type AlertDialogFooterProps, AlertDialogHeader, type AlertDialogHeaderProps, AlertDialogOverlay, type AlertDialogOverlayProps, AlertDialogPortal, AlertDialogTitle, type AlertDialogTitleProps, AlertDialogTrigger, type AlertProps, AlertTitle, type AlertTitleProps, type AriaDecorativeIconProps, type AriaDisabledProps, type AriaDisclosurePanelProps, type AriaDisclosureTriggerProps, type AriaErrorFieldProps, type AriaIconProps, type AriaLiveRegionProps, type AriaLoadingProps, type AriaMeaningfulIconProps, type AriaNavigationItemProps, AspectRatio, type AspectRatioProps, Avatar, AvatarFallback, type AvatarFallbackProps, AvatarImage, type AvatarImageProps, type AvatarProps, Badge, type BadgeProps, Breadcrumb, BreadcrumbEllipsis, type BreadcrumbEllipsisProps, BreadcrumbItem, type BreadcrumbItemProps, BreadcrumbLink, type BreadcrumbLinkProps, BreadcrumbList, type BreadcrumbListProps, BreadcrumbPage, type BreadcrumbPageProps, type BreadcrumbProps, BreadcrumbSeparator, type BreadcrumbSeparatorProps, Button, type ButtonProps, Calendar, type CalendarProps, Card, CardContent, type CardContentProps, CardDescription, type CardDescriptionProps, CardFooter, type CardFooterProps, CardHeader, type CardHeaderProps, type CardProps, CardTitle, type CardTitleProps, Carousel, type CarouselApi, CarouselContent, type CarouselContentProps, type CarouselContextValue, CarouselItem, type CarouselItemProps, CarouselNext, type CarouselNextProps, CarouselPrevious, type CarouselPreviousProps, type CarouselProps, type ChartConfig, ChartContainer, type ChartContainerProps, ChartLegend, ChartLegendContent, type ChartLegendContentProps, type ChartSeriesConfig, ChartTooltip, ChartTooltipContent, type ChartTooltipContentProps, Checkbox, type CheckboxProps, Collapsible, CollapsibleContent, type CollapsibleContentProps, type CollapsibleProps, CollapsibleTrigger, type CollapsibleTriggerProps, Combobox, type ComboboxI18nStrings, type ComboboxOption, type ComboboxProps, Command, CommandEmpty, type CommandEmptyProps, CommandGroup, type CommandGroupProps, type CommandI18nStrings, CommandInput, type CommandInputProps, CommandItem, type CommandItemProps, CommandList, type CommandListProps, type CommandProps, CommandSeparator, type CommandSeparatorProps, ContextMenu, ContextMenuCheckboxItem, type ContextMenuCheckboxItemProps, ContextMenuContent, type ContextMenuContentProps, ContextMenuGroup, ContextMenuItem, type ContextMenuItemProps, ContextMenuLabel, type ContextMenuLabelProps, ContextMenuPortal, ContextMenuRadioGroup, ContextMenuRadioItem, type ContextMenuRadioItemProps, ContextMenuSeparator, type ContextMenuSeparatorProps, ContextMenuShortcut, type ContextMenuShortcutProps, ContextMenuSub, ContextMenuSubContent, type ContextMenuSubContentProps, ContextMenuSubTrigger, type ContextMenuSubTriggerProps, ContextMenuTrigger, DataTable, type DataTableProps, DatePicker, type DatePickerProps, Dialog, DialogClose, DialogContent, type DialogContentProps, DialogDescription, type DialogDescriptionProps, DialogFooter, type DialogFooterProps, DialogHeader, type DialogHeaderProps, type DialogI18nStrings, DialogOverlay, type DialogOverlayProps, DialogPortal, DialogTitle, type DialogTitleProps, DialogTrigger, Drawer, DrawerClose, DrawerContent, type DrawerContentProps, DrawerDescription, type DrawerDescriptionProps, DrawerFooter, type DrawerFooterProps, DrawerHeader, type DrawerHeaderProps, DrawerOverlay, type DrawerOverlayProps, DrawerPortal, type DrawerProps, DrawerTitle, type DrawerTitleProps, DrawerTrigger, DropdownMenu, DropdownMenuCheckboxItem, type DropdownMenuCheckboxItemProps, DropdownMenuContent, type DropdownMenuContentProps, DropdownMenuGroup, type DropdownMenuI18nStrings, DropdownMenuItem, type DropdownMenuItemProps, DropdownMenuLabel, type DropdownMenuLabelProps, DropdownMenuPortal, DropdownMenuRadioGroup, DropdownMenuRadioItem, type DropdownMenuRadioItemProps, DropdownMenuSeparator, type DropdownMenuSeparatorProps, DropdownMenuShortcut, type DropdownMenuShortcutProps, DropdownMenuSub, DropdownMenuSubContent, type DropdownMenuSubContentProps, DropdownMenuSubTrigger, type DropdownMenuSubTriggerProps, DropdownMenuTrigger, Form, FormControl, FormDescription, type FormDescriptionProps, FormField, type FormFieldProps, FormItem, type FormItemProps, FormLabel, type FormLabelProps, FormMessage, type FormMessageProps, type GeeklegoFormatters, type GeeklegoI18nContextValue, GeeklegoI18nProvider, type GeeklegoI18nProviderProps, type GeeklegoI18nStrings, HoverCard, HoverCardContent, type HoverCardContentProps, HoverCardTrigger, Input, InputOTP, InputOTPGroup, type InputOTPGroupProps, type InputOTPProps, InputOTPSeparator, type InputOTPSeparatorProps, InputOTPSlot, type InputOTPSlotProps, type InputProps, Label, type LabelI18nStrings, type LabelProps, Menubar, MenubarCheckboxItem, type MenubarCheckboxItemProps, MenubarContent, type MenubarContentProps, MenubarGroup, MenubarItem, type MenubarItemProps, MenubarLabel, type MenubarLabelProps, MenubarMenu, MenubarPortal, type MenubarProps, MenubarRadioGroup, MenubarRadioItem, type MenubarRadioItemProps, MenubarSeparator, type MenubarSeparatorProps, MenubarShortcut, type MenubarShortcutProps, MenubarSub, MenubarSubContent, type MenubarSubContentProps, MenubarSubTrigger, type MenubarSubTriggerProps, MenubarTrigger, type MenubarTriggerProps, NavigationMenu, NavigationMenuContent, type NavigationMenuContentProps, NavigationMenuIndicator, type NavigationMenuIndicatorProps, NavigationMenuItem, type NavigationMenuItemProps, NavigationMenuLink, type NavigationMenuLinkProps, NavigationMenuList, type NavigationMenuListProps, type NavigationMenuProps, NavigationMenuTrigger, type NavigationMenuTriggerProps, NavigationMenuViewport, type NavigationMenuViewportProps, Pagination, PaginationContent, type PaginationContentProps, PaginationEllipsis, type PaginationEllipsisProps, PaginationItem, type PaginationItemProps, PaginationLink, type PaginationLinkProps, PaginationNext, type PaginationNextProps, PaginationPrevious, type PaginationPreviousProps, type PaginationProps, PieChart, type PieChartDatum, type PieChartProps, Popover, PopoverAnchor, PopoverContent, type PopoverContentProps, type PopoverI18nStrings, PopoverTrigger, ProductCard, ProductCardBody, type ProductCardBodyProps, ProductCardDescription, type ProductCardDescriptionProps, ProductCardFooter, type ProductCardFooterProps, ProductCardMedia, type ProductCardMediaProps, ProductCardPrice, type ProductCardPriceProps, type ProductCardProps, ProductCardTitle, type ProductCardTitleProps, Progress, type ProgressProps, ResizableHandle, type ResizableHandleProps, ResizablePanel, ResizablePanelGroup, type ResizablePanelGroupProps, type ResizablePanelProps, type SafeExternalLinkProps, ScrollArea, type ScrollAreaProps, ScrollBar, type ScrollBarProps, Select, SelectContent, type SelectContentProps, SelectGroup, type SelectI18nStrings, SelectItem, type SelectItemProps, SelectLabel, type SelectLabelProps, SelectScrollDownButton, type SelectScrollDownButtonProps, SelectScrollUpButton, type SelectScrollUpButtonProps, SelectSeparator, type SelectSeparatorProps, SelectTrigger, type SelectTriggerProps, SelectValue, Separator, type SeparatorProps, Sheet, SheetClose, SheetContent, type SheetContentProps, SheetDescription, type SheetDescriptionProps, SheetFooter, type SheetFooterProps, SheetHeader, type SheetHeaderProps, SheetOverlay, type SheetOverlayProps, SheetPortal, SheetTitle, type SheetTitleProps, SheetTrigger, Sidebar, SidebarContent, type SidebarContentProps, type SidebarContextValue, SidebarFooter, type SidebarFooterProps, SidebarGroup, SidebarGroupContent, type SidebarGroupContentProps, SidebarGroupLabel, type SidebarGroupLabelProps, type SidebarGroupProps, SidebarHeader, type SidebarHeaderProps, SidebarInset, type SidebarInsetProps, SidebarMenu, SidebarMenuButton, type SidebarMenuButtonProps, type SidebarMenuButtonVariantProps, SidebarMenuItem, type SidebarMenuItemProps, type SidebarMenuProps, SidebarMenuSub, SidebarMenuSubButton, type SidebarMenuSubButtonProps, type SidebarMenuSubProps, type SidebarProps, SidebarProvider, type SidebarProviderProps, SidebarRail, type SidebarRailProps, SidebarSeparator, type SidebarSeparatorProps, SidebarTrigger, type SidebarTriggerProps, Skeleton, type SkeletonProps, StructuredData, type StructuredDataProps, Switch, type SwitchProps, Table, TableBody, TableCaption, type TableCaptionProps, TableCell, type TableCellProps, TableFooter, TableHead, type TableHeadProps, TableHeader, type TableProps, TableRow, type TableRowProps, type TableSectionProps, Tabs, TabsContent, type TabsContentProps, TabsList, type TabsListProps, type TabsProps, TabsTrigger, type TabsTriggerProps, Toaster, type ToasterProps, Toggle, ToggleGroup, ToggleGroupItem, type ToggleGroupItemProps, type ToggleGroupProps, type ToggleProps, Tooltip, TooltipContent, type TooltipContentProps, TooltipProvider, TooltipTrigger, Typography, type TypographyProps, type UnsafeProtocol, VisuallyHidden, type VisuallyHiddenElement, type VisuallyHiddenProps, alertVariants, badgeVariants, buttonVariants, getDisabledProps, getDisclosureProps, getErrorFieldProps, getIconProps, getLiveRegionProps, getLoadingProps, getNavigationItemProps, getSafeExternalLinkProps, inputVariants, labelVariants, navigationMenuTriggerStyle, sanitizeHref, sheetVariants, sidebarMenuButtonVariants, toggleVariants, typographyVariants, useFormField, useSidebar };
