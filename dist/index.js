// components/v2/Accordion/Accordion.tsx
import { forwardRef } from "react";
import * as RadixAccordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

// components/v2/lib/cn.ts
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// components/v2/Accordion/Accordion.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var Accordion = RadixAccordion.Root;
var AccordionItem = forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx(
    RadixAccordion.Item,
    {
      ref,
      className: cn("border-b border-border", className),
      ...props
    }
  )
);
AccordionItem.displayName = "AccordionItem";
var AccordionTrigger = forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsx(RadixAccordion.Header, { className: "flex", children: /* @__PURE__ */ jsxs(
  RadixAccordion.Trigger,
  {
    ref,
    className: cn(
      "flex flex-1 items-center justify-between gap-4 py-4 text-start text-sm font-medium text-foreground",
      "transition-colors hover:text-muted-foreground",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      "disabled:pointer-events-none disabled:opacity-50",
      "[&[data-state=open]>svg]:rotate-180",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx(
        ChevronDown,
        {
          className: "size-4 shrink-0 text-muted-foreground transition-transform duration-200",
          "aria-hidden": true
        }
      )
    ]
  }
) }));
AccordionTrigger.displayName = "AccordionTrigger";
var AccordionContent = forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsx(
  RadixAccordion.Content,
  {
    ref,
    className: cn(
      "overflow-hidden text-sm text-muted-foreground",
      "data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsx("div", { className: "pb-4 pt-0", children })
  }
));
AccordionContent.displayName = "AccordionContent";

// components/v2/Alert/Alert.tsx
import { forwardRef as forwardRef2 } from "react";

// components/v2/Alert/alert-variants.ts
import { cva } from "class-variance-authority";
var alertVariants = cva(
  [
    "relative w-full rounded-lg border px-4 py-3 text-sm",
    // Any first-child <svg> is absolutely positioned in the top-left; when an
    // icon is present the whole alert is inset (pl-11) so the text clears it.
    // Uses only registered spacing utilities — no arbitrary track math.
    "[&>svg]:absolute [&>svg]:left-4 [&>svg]:top-3.5 [&>svg]:size-4 [&>svg]:text-current",
    "[&:has(>svg)]:pl-11"
  ].join(" "),
  {
    variants: {
      variant: {
        default: "bg-background text-foreground border-border",
        destructive: "bg-background text-destructive border-destructive/50 [&>svg]:text-current"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);

// components/v2/Alert/Alert.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
var Alert = forwardRef2(
  ({ className, variant, children, ...props }, ref) => /* @__PURE__ */ jsx2(
    "div",
    {
      ref,
      role: "alert",
      className: cn(alertVariants({ variant }), className),
      ...props,
      children
    }
  )
);
Alert.displayName = "Alert";
var AlertTitle = forwardRef2(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx2(
    "div",
    {
      ref,
      className: cn(
        "mb-1 font-medium leading-none tracking-tight",
        className
      ),
      ...props
    }
  )
);
AlertTitle.displayName = "AlertTitle";
var AlertDescription = forwardRef2(({ className, ...props }, ref) => /* @__PURE__ */ jsx2(
  "div",
  {
    ref,
    className: cn(
      "text-sm text-muted-foreground [&_p]:leading-relaxed",
      className
    ),
    ...props
  }
));
AlertDescription.displayName = "AlertDescription";

// components/v2/AlertDialog/AlertDialog.tsx
import { forwardRef as forwardRef3 } from "react";
import * as RadixAlertDialog from "@radix-ui/react-alert-dialog";

// components/v2/Button/button-variants.ts
import { cva as cva2 } from "class-variance-authority";
var buttonVariants = cva2(
  // base — shared by every variant
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap shrink-0",
    "rounded-md text-sm font-medium select-none",
    "transition-colors duration-150 ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
  ].join(" "),
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/80",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 active:bg-destructive/80",
        outline: "border border-input bg-background text-foreground hover:bg-muted hover:text-foreground",
        ghost: "bg-transparent text-foreground hover:bg-muted hover:text-foreground",
        link: "bg-transparent text-primary underline-offset-4 hover:underline h-auto px-0",
        // ── Custom variant (namespaced --ext-* tokens only) ──────────────────
        gamified: [
          "bg-ext-button-gamified-bg text-ext-button-gamified-foreground font-semibold uppercase tracking-wide",
          "shadow-[var(--ext-button-gamified-shadow)]",
          "hover:bg-ext-button-gamified-bg-hover hover:-translate-y-0.5",
          "active:bg-ext-button-gamified-bg-active active:translate-y-0 active:shadow-none",
          "focus-visible:ring-ext-button-gamified-ring"
        ].join(" ")
      },
      size: {
        sm: "h-8 px-3 text-xs",
        md: "h-10 px-4 text-sm",
        lg: "h-11 px-6 text-base",
        icon: "size-10 p-0"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
);

// components/v2/AlertDialog/AlertDialog.tsx
import { jsx as jsx3, jsxs as jsxs2 } from "react/jsx-runtime";
var AlertDialog = RadixAlertDialog.Root;
var AlertDialogTrigger = RadixAlertDialog.Trigger;
var AlertDialogPortal = RadixAlertDialog.Portal;
var AlertDialogOverlay = forwardRef3(({ className, ...props }, ref) => /* @__PURE__ */ jsx3(
  RadixAlertDialog.Overlay,
  {
    ref,
    className: cn(
      "fixed inset-0 z-50 bg-foreground/50 backdrop-blur-sm",
      "transition-opacity duration-200 ease-out",
      "data-[state=closed]:opacity-0 data-[state=open]:opacity-100",
      className
    ),
    ...props
  }
));
AlertDialogOverlay.displayName = "AlertDialogOverlay";
var AlertDialogContent = forwardRef3(({ className, ...props }, ref) => /* @__PURE__ */ jsxs2(AlertDialogPortal, { children: [
  /* @__PURE__ */ jsx3(AlertDialogOverlay, {}),
  /* @__PURE__ */ jsx3(
    RadixAlertDialog.Content,
    {
      ref,
      className: cn(
        "fixed left-1/2 top-1/2 z-50 grid w-full max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4",
        "rounded-lg border border-border bg-popover p-6 text-popover-foreground shadow-lg",
        "transition-all duration-200 ease-out",
        "data-[state=closed]:scale-95 data-[state=closed]:opacity-0",
        "data-[state=open]:scale-100 data-[state=open]:opacity-100",
        "focus-visible:outline-none",
        className
      ),
      ...props
    }
  )
] }));
AlertDialogContent.displayName = "AlertDialogContent";
var AlertDialogHeader = ({
  className,
  ...props
}) => /* @__PURE__ */ jsx3(
  "div",
  {
    className: cn("flex flex-col gap-1.5 text-center sm:text-start", className),
    ...props
  }
);
AlertDialogHeader.displayName = "AlertDialogHeader";
var AlertDialogFooter = ({
  className,
  ...props
}) => /* @__PURE__ */ jsx3(
  "div",
  {
    className: cn(
      "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
      className
    ),
    ...props
  }
);
AlertDialogFooter.displayName = "AlertDialogFooter";
var AlertDialogTitle = forwardRef3(({ className, ...props }, ref) => /* @__PURE__ */ jsx3(
  RadixAlertDialog.Title,
  {
    ref,
    className: cn("text-lg font-semibold leading-none text-foreground", className),
    ...props
  }
));
AlertDialogTitle.displayName = "AlertDialogTitle";
var AlertDialogDescription = forwardRef3(({ className, ...props }, ref) => /* @__PURE__ */ jsx3(
  RadixAlertDialog.Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
AlertDialogDescription.displayName = "AlertDialogDescription";
var AlertDialogAction = forwardRef3(({ className, ...props }, ref) => /* @__PURE__ */ jsx3(
  RadixAlertDialog.Action,
  {
    ref,
    className: cn(buttonVariants(), className),
    ...props
  }
));
AlertDialogAction.displayName = "AlertDialogAction";
var AlertDialogCancel = forwardRef3(({ className, ...props }, ref) => /* @__PURE__ */ jsx3(
  RadixAlertDialog.Cancel,
  {
    ref,
    className: cn(buttonVariants({ variant: "outline" }), className),
    ...props
  }
));
AlertDialogCancel.displayName = "AlertDialogCancel";

// components/v2/AspectRatio/AspectRatio.tsx
import * as RadixAspectRatio from "@radix-ui/react-aspect-ratio";
var AspectRatio = RadixAspectRatio.Root;

// components/v2/Avatar/Avatar.tsx
import { forwardRef as forwardRef4 } from "react";
import * as RadixAvatar from "@radix-ui/react-avatar";
import { jsx as jsx4 } from "react/jsx-runtime";
var Avatar = forwardRef4(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx4(
    RadixAvatar.Root,
    {
      ref,
      className: cn(
        "relative flex size-10 shrink-0 overflow-hidden rounded-full",
        className
      ),
      ...props
    }
  )
);
Avatar.displayName = "Avatar";
var AvatarImage = forwardRef4(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx4(
    RadixAvatar.Image,
    {
      ref,
      className: cn("aspect-square size-full object-cover", className),
      ...props
    }
  )
);
AvatarImage.displayName = "AvatarImage";
var AvatarFallback = forwardRef4(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx4(
    RadixAvatar.Fallback,
    {
      ref,
      className: cn(
        "flex size-full items-center justify-center rounded-full bg-muted text-sm font-medium text-muted-foreground",
        className
      ),
      ...props
    }
  )
);
AvatarFallback.displayName = "AvatarFallback";

// components/v2/Badge/Badge.tsx
import { forwardRef as forwardRef5 } from "react";
import { Slot } from "@radix-ui/react-slot";

// components/v2/Badge/badge-variants.ts
import { cva as cva3 } from "class-variance-authority";
var badgeVariants = cva3(
  [
    "inline-flex items-center justify-center gap-1 shrink-0 w-fit",
    "rounded-md border px-2 py-0.5 text-xs font-medium whitespace-nowrap",
    "transition-colors",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "[&_svg]:pointer-events-none [&_svg]:size-3 [&_svg]:shrink-0"
  ].join(" "),
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground",
        secondary: "border-transparent bg-secondary text-secondary-foreground",
        destructive: "border-transparent bg-destructive text-destructive-foreground",
        outline: "border-border bg-transparent text-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);

// components/v2/Badge/Badge.tsx
import { jsx as jsx5 } from "react/jsx-runtime";
var Badge = forwardRef5(
  ({ className, variant, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "span";
    return /* @__PURE__ */ jsx5(
      Comp,
      {
        ref,
        className: cn(badgeVariants({ variant }), className),
        ...props
      }
    );
  }
);
Badge.displayName = "Badge";

// components/v2/Breadcrumb/Breadcrumb.tsx
import { forwardRef as forwardRef6 } from "react";
import { Slot as Slot2 } from "@radix-ui/react-slot";
import { ChevronRight, MoreHorizontal } from "lucide-react";
import { jsx as jsx6, jsxs as jsxs3 } from "react/jsx-runtime";
var Breadcrumb = forwardRef6(
  ({ ...props }, ref) => /* @__PURE__ */ jsx6("nav", { ref, "aria-label": "breadcrumb", ...props })
);
Breadcrumb.displayName = "Breadcrumb";
var BreadcrumbList = forwardRef6(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx6(
    "ol",
    {
      ref,
      className: cn(
        "flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground",
        className
      ),
      ...props
    }
  )
);
BreadcrumbList.displayName = "BreadcrumbList";
var BreadcrumbItem = forwardRef6(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx6(
    "li",
    {
      ref,
      className: cn("inline-flex items-center gap-1.5", className),
      ...props
    }
  )
);
BreadcrumbItem.displayName = "BreadcrumbItem";
var BreadcrumbLink = forwardRef6(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot2 : "a";
    return /* @__PURE__ */ jsx6(
      Comp,
      {
        ref,
        className: cn(
          "transition-colors hover:text-foreground",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm",
          className
        ),
        ...props
      }
    );
  }
);
BreadcrumbLink.displayName = "BreadcrumbLink";
var BreadcrumbPage = forwardRef6(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx6(
    "span",
    {
      ref,
      role: "link",
      "aria-disabled": "true",
      "aria-current": "page",
      className: cn("font-normal text-foreground", className),
      ...props
    }
  )
);
BreadcrumbPage.displayName = "BreadcrumbPage";
var BreadcrumbSeparator = ({
  children,
  className,
  ...props
}) => /* @__PURE__ */ jsx6(
  "li",
  {
    role: "presentation",
    "aria-hidden": "true",
    className: cn("[&_svg]:size-3.5", className),
    ...props,
    children: children ?? /* @__PURE__ */ jsx6(ChevronRight, {})
  }
);
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";
var BreadcrumbEllipsis = ({
  className,
  ...props
}) => /* @__PURE__ */ jsxs3(
  "span",
  {
    role: "presentation",
    "aria-hidden": "true",
    className: cn("flex size-9 items-center justify-center", className),
    ...props,
    children: [
      /* @__PURE__ */ jsx6(MoreHorizontal, { className: "size-4" }),
      /* @__PURE__ */ jsx6("span", { className: "sr-only", children: "More" })
    ]
  }
);
BreadcrumbEllipsis.displayName = "BreadcrumbEllipsis";

// components/v2/Button/Button.tsx
import { forwardRef as forwardRef7 } from "react";
import { Slot as Slot3 } from "@radix-ui/react-slot";
import { jsx as jsx7 } from "react/jsx-runtime";
var Button = forwardRef7(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot3 : "button";
    return /* @__PURE__ */ jsx7(
      Comp,
      {
        ref,
        className: cn(buttonVariants({ variant, size }), className),
        ...props
      }
    );
  }
);
Button.displayName = "Button";

// components/v2/Calendar/Calendar.tsx
import { DayPicker, getDefaultClassNames } from "react-day-picker";
import { ChevronLeft, ChevronRight as ChevronRight2 } from "lucide-react";
import { jsx as jsx8 } from "react/jsx-runtime";
function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}) {
  const defaults = getDefaultClassNames();
  return /* @__PURE__ */ jsx8(
    DayPicker,
    {
      showOutsideDays,
      className: cn("p-3", className),
      classNames: {
        months: cn(defaults.months, "relative flex flex-col gap-4 sm:flex-row"),
        month: cn(defaults.month, "flex flex-col gap-4"),
        month_caption: cn(
          defaults.month_caption,
          "flex h-9 items-center justify-center px-9"
        ),
        caption_label: cn(defaults.caption_label, "text-sm font-medium"),
        nav: cn(defaults.nav, "absolute inset-x-0 top-0 flex items-center justify-between"),
        button_previous: cn(
          buttonVariants({ variant: "outline", size: "icon" }),
          "size-7 p-0 opacity-50 hover:opacity-100"
        ),
        button_next: cn(
          buttonVariants({ variant: "outline", size: "icon" }),
          "size-7 p-0 opacity-50 hover:opacity-100"
        ),
        month_grid: cn(defaults.month_grid, "w-full border-collapse space-y-1"),
        weekdays: cn(defaults.weekdays, "flex"),
        weekday: cn(
          defaults.weekday,
          "w-9 text-xs font-normal text-muted-foreground"
        ),
        week: cn(defaults.week, "mt-2 flex w-full"),
        day: cn(
          defaults.day,
          "relative size-9 p-0 text-center text-sm focus-within:relative focus-within:z-20"
        ),
        day_button: cn(
          buttonVariants({ variant: "ghost", size: "icon" }),
          "size-9 p-0 font-normal aria-selected:opacity-100"
        ),
        selected: cn(
          defaults.selected,
          "[&>button]:bg-primary [&>button]:text-primary-foreground [&>button]:hover:bg-primary"
        ),
        today: cn(defaults.today, "[&>button]:bg-accent [&>button]:text-accent-foreground"),
        outside: cn(defaults.outside, "[&>button]:text-muted-foreground [&>button]:opacity-50"),
        disabled: cn(defaults.disabled, "[&>button]:text-muted-foreground [&>button]:opacity-50"),
        range_middle: cn(
          defaults.range_middle,
          "[&>button]:rounded-none [&>button]:bg-accent [&>button]:text-accent-foreground"
        ),
        hidden: cn(defaults.hidden, "invisible"),
        ...classNames
      },
      components: {
        Chevron: ({ orientation, className: chevronClassName, ...chevronProps }) => {
          const Icon2 = orientation === "left" ? ChevronLeft : ChevronRight2;
          return /* @__PURE__ */ jsx8(Icon2, { className: cn("size-4", chevronClassName), ...chevronProps });
        }
      },
      ...props
    }
  );
}
Calendar.displayName = "Calendar";

// components/v2/Card/Card.tsx
import { forwardRef as forwardRef8 } from "react";
import { jsx as jsx9 } from "react/jsx-runtime";
var Card = forwardRef8(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx9(
    "div",
    {
      ref,
      className: cn(
        "rounded-xl border border-border bg-card text-card-foreground shadow-sm",
        className
      ),
      ...props
    }
  )
);
Card.displayName = "Card";
var CardHeader = forwardRef8(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx9(
    "div",
    {
      ref,
      className: cn("flex flex-col gap-1.5 p-6", className),
      ...props
    }
  )
);
CardHeader.displayName = "CardHeader";
var CardTitle = forwardRef8(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx9(
    "h3",
    {
      ref,
      className: cn(
        "font-semibold leading-none tracking-tight",
        className
      ),
      ...props
    }
  )
);
CardTitle.displayName = "CardTitle";
var CardDescription = forwardRef8(({ className, ...props }, ref) => /* @__PURE__ */ jsx9(
  "p",
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
CardDescription.displayName = "CardDescription";
var CardContent = forwardRef8(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx9("div", { ref, className: cn("p-6 pt-0", className), ...props })
);
CardContent.displayName = "CardContent";
var CardFooter = forwardRef8(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx9(
    "div",
    {
      ref,
      className: cn("flex items-center p-6 pt-0", className),
      ...props
    }
  )
);
CardFooter.displayName = "CardFooter";

// components/v2/Carousel/Carousel.tsx
import {
  createContext,
  forwardRef as forwardRef9,
  useCallback,
  useContext,
  useEffect,
  useState
} from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { jsx as jsx10 } from "react/jsx-runtime";
var CarouselContext = createContext(null);
function useCarousel() {
  const context = useContext(CarouselContext);
  if (!context) {
    throw new Error("Carousel parts must be used within a <Carousel />.");
  }
  return context;
}
var Carousel = forwardRef9(
  ({
    orientation = "horizontal",
    opts,
    setApi,
    plugins,
    className,
    children,
    ...props
  }, ref) => {
    const [carouselRef, api] = useEmblaCarousel(
      { ...opts, axis: orientation === "horizontal" ? "x" : "y" },
      plugins
    );
    const [canScrollPrev, setCanScrollPrev] = useState(false);
    const [canScrollNext, setCanScrollNext] = useState(false);
    const onSelect = useCallback((emblaApi) => {
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
    }, []);
    const scrollPrev = useCallback(() => api?.scrollPrev(), [api]);
    const scrollNext = useCallback(() => api?.scrollNext(), [api]);
    const handleKeyDown = useCallback(
      (event) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          scrollPrev();
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          scrollNext();
        }
      },
      [scrollPrev, scrollNext]
    );
    useEffect(() => {
      if (api && setApi) setApi(api);
    }, [api, setApi]);
    useEffect(() => {
      if (!api) return;
      onSelect(api);
      api.on("reInit", onSelect);
      api.on("select", onSelect);
      return () => {
        api.off("reInit", onSelect);
        api.off("select", onSelect);
      };
    }, [api, onSelect]);
    return /* @__PURE__ */ jsx10(
      CarouselContext.Provider,
      {
        value: {
          carouselRef,
          api,
          opts,
          orientation,
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext
        },
        children: /* @__PURE__ */ jsx10(
          "div",
          {
            ref,
            onKeyDownCapture: handleKeyDown,
            className: cn("relative", className),
            role: "region",
            "aria-roledescription": "carousel",
            ...props,
            children
          }
        )
      }
    );
  }
);
Carousel.displayName = "Carousel";
var CarouselContent = forwardRef9(
  ({ className, ...props }, ref) => {
    const { carouselRef, orientation } = useCarousel();
    return /* @__PURE__ */ jsx10("div", { ref: carouselRef, className: "overflow-hidden", children: /* @__PURE__ */ jsx10(
      "div",
      {
        ref,
        className: cn(
          "flex",
          orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
          className
        ),
        ...props
      }
    ) });
  }
);
CarouselContent.displayName = "CarouselContent";
var CarouselItem = forwardRef9(
  ({ className, ...props }, ref) => {
    const { orientation } = useCarousel();
    return /* @__PURE__ */ jsx10(
      "div",
      {
        ref,
        role: "group",
        "aria-roledescription": "slide",
        className: cn(
          "min-w-0 shrink-0 grow-0 basis-full",
          orientation === "horizontal" ? "pl-4" : "pt-4",
          className
        ),
        ...props
      }
    );
  }
);
CarouselItem.displayName = "CarouselItem";
var CarouselPrevious = forwardRef9(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel();
  return /* @__PURE__ */ jsx10(
    Button,
    {
      ref,
      variant,
      size,
      className: cn(
        "absolute rounded-full",
        orientation === "horizontal" ? "-left-12 top-1/2 -translate-y-1/2" : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      ),
      disabled: !canScrollPrev,
      onClick: scrollPrev,
      "aria-label": "Previous slide",
      ...props,
      children: /* @__PURE__ */ jsx10(ArrowLeft, {})
    }
  );
});
CarouselPrevious.displayName = "CarouselPrevious";
var CarouselNext = forwardRef9(
  ({ className, variant = "outline", size = "icon", ...props }, ref) => {
    const { orientation, scrollNext, canScrollNext } = useCarousel();
    return /* @__PURE__ */ jsx10(
      Button,
      {
        ref,
        variant,
        size,
        className: cn(
          "absolute rounded-full",
          orientation === "horizontal" ? "-right-12 top-1/2 -translate-y-1/2" : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
          className
        ),
        disabled: !canScrollNext,
        onClick: scrollNext,
        "aria-label": "Next slide",
        ...props,
        children: /* @__PURE__ */ jsx10(ArrowRight, {})
      }
    );
  }
);
CarouselNext.displayName = "CarouselNext";

// components/v2/Chart/Chart.tsx
import { forwardRef as forwardRef10 } from "react";
import { Legend, ResponsiveContainer, Tooltip } from "recharts";
import { jsx as jsx11, jsxs as jsxs4 } from "react/jsx-runtime";
function configToColorVars(config) {
  const vars = {};
  for (const [key, series] of Object.entries(config)) {
    if (series.color) vars[`--color-${key}`] = series.color;
  }
  return vars;
}
var ChartContainer = forwardRef10(
  ({ config, className, children, style, ...props }, ref) => /* @__PURE__ */ jsx11(
    "div",
    {
      ref,
      "data-chart": true,
      className: cn(
        "flex aspect-video justify-center text-xs",
        "[&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground",
        "[&_.recharts-cartesian-grid_line]:stroke-border/50",
        "[&_.recharts-curve.recharts-tooltip-cursor]:stroke-border",
        "[&_.recharts-radial-bar-background-sector]:fill-muted",
        "[&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted",
        "[&_.recharts-sector]:outline-none [&_.recharts-surface]:outline-none",
        className
      ),
      style: { ...configToColorVars(config), ...style },
      ...props,
      children: /* @__PURE__ */ jsx11(ResponsiveContainer, { width: "100%", height: "100%", children })
    }
  )
);
ChartContainer.displayName = "ChartContainer";
var ChartTooltip = Tooltip;
var ChartTooltipContent = forwardRef10(
  ({ active, payload, label, hideIndicator, hideLabel, config, className }, ref) => {
    if (!active || !payload?.length) return null;
    return /* @__PURE__ */ jsxs4(
      "div",
      {
        ref,
        className: cn(
          "grid min-w-32 gap-1.5 rounded-lg border border-border bg-popover px-2.5 py-1.5 text-xs text-popover-foreground shadow-md",
          className
        ),
        children: [
          !hideLabel && label != null && /* @__PURE__ */ jsx11("div", { className: "font-medium", children: label }),
          /* @__PURE__ */ jsx11("div", { className: "grid gap-1.5", children: payload.map((item, i) => {
            const key = String(item.name ?? item.dataKey ?? i);
            const seriesLabel = config?.[key]?.label ?? item.name ?? item.dataKey;
            return /* @__PURE__ */ jsxs4(
              "div",
              {
                className: "flex items-center justify-between gap-4",
                children: [
                  /* @__PURE__ */ jsxs4("div", { className: "flex items-center gap-1.5", children: [
                    !hideIndicator && /* @__PURE__ */ jsx11(
                      "span",
                      {
                        className: "size-2.5 shrink-0 rounded-sm",
                        style: { backgroundColor: item.color }
                      }
                    ),
                    /* @__PURE__ */ jsx11("span", { className: "text-muted-foreground", children: seriesLabel })
                  ] }),
                  /* @__PURE__ */ jsx11("span", { className: "font-mono font-medium tabular-nums text-foreground", children: item.value })
                ]
              },
              item.dataKey ?? i
            );
          }) })
        ]
      }
    );
  }
);
ChartTooltipContent.displayName = "ChartTooltipContent";
var ChartLegend = Legend;
var ChartLegendContent = forwardRef10(({ payload, nameKey, config, hideIcon, className }, ref) => {
  if (!payload?.length) return null;
  return /* @__PURE__ */ jsx11(
    "div",
    {
      ref,
      className: cn("flex flex-wrap items-center justify-center gap-4", className),
      children: payload.map((item, i) => {
        const raw = nameKey ? item.payload?.[nameKey] : item.value;
        const key = String(raw ?? item.value ?? i);
        const seriesLabel = config?.[key]?.label ?? key;
        return /* @__PURE__ */ jsxs4(
          "div",
          {
            className: "flex items-center gap-1.5 text-xs text-muted-foreground",
            children: [
              !hideIcon && /* @__PURE__ */ jsx11(
                "span",
                {
                  className: "size-2.5 shrink-0 rounded-sm",
                  style: { backgroundColor: item.color }
                }
              ),
              seriesLabel
            ]
          },
          key
        );
      })
    }
  );
});
ChartLegendContent.displayName = "ChartLegendContent";

// components/v2/Checkbox/Checkbox.tsx
import { forwardRef as forwardRef11 } from "react";
import * as RadixCheckbox from "@radix-ui/react-checkbox";
import { Check, Minus } from "lucide-react";
import { jsx as jsx12, jsxs as jsxs5 } from "react/jsx-runtime";
var Checkbox = forwardRef11(({ className, ...props }, ref) => /* @__PURE__ */ jsx12(
  RadixCheckbox.Root,
  {
    ref,
    className: cn(
      "group peer size-4 shrink-0 rounded-sm border border-input bg-background",
      "transition-colors",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      "data-[state=indeterminate]:border-primary data-[state=indeterminate]:bg-primary data-[state=indeterminate]:text-primary-foreground",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsxs5(
      RadixCheckbox.Indicator,
      {
        className: cn("flex items-center justify-center text-current"),
        children: [
          /* @__PURE__ */ jsx12(Check, { className: "size-3.5 group-data-[state=indeterminate]:hidden" }),
          /* @__PURE__ */ jsx12(Minus, { className: "hidden size-3.5 group-data-[state=indeterminate]:block" })
        ]
      }
    )
  }
));
Checkbox.displayName = "Checkbox";

// components/v2/Collapsible/Collapsible.tsx
import { forwardRef as forwardRef12 } from "react";
import * as RadixCollapsible from "@radix-ui/react-collapsible";
import { jsx as jsx13 } from "react/jsx-runtime";
var Collapsible = RadixCollapsible.Root;
var CollapsibleTrigger = forwardRef12(({ className, ...props }, ref) => /* @__PURE__ */ jsx13(
  RadixCollapsible.Trigger,
  {
    ref,
    className: cn(
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm",
      "disabled:pointer-events-none disabled:opacity-50",
      className
    ),
    ...props
  }
));
CollapsibleTrigger.displayName = "CollapsibleTrigger";
var CollapsibleContent = forwardRef12(({ className, ...props }, ref) => /* @__PURE__ */ jsx13(
  RadixCollapsible.Content,
  {
    ref,
    className: cn(
      "overflow-hidden",
      "data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up",
      className
    ),
    ...props
  }
));
CollapsibleContent.displayName = "CollapsibleContent";

// components/v2/Combobox/Combobox.tsx
import { forwardRef as forwardRef15, useState as useState2 } from "react";
import { Check as Check2, ChevronsUpDown } from "lucide-react";

// components/v2/Popover/Popover.tsx
import { forwardRef as forwardRef13 } from "react";
import * as RadixPopover from "@radix-ui/react-popover";
import { jsx as jsx14 } from "react/jsx-runtime";
var Popover = RadixPopover.Root;
var PopoverTrigger = RadixPopover.Trigger;
var PopoverAnchor = RadixPopover.Anchor;
var PopoverContent = forwardRef13(
  ({ className, align = "center", sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx14(RadixPopover.Portal, { children: /* @__PURE__ */ jsx14(
    RadixPopover.Content,
    {
      ref,
      align,
      sideOffset,
      className: cn(
        "z-50 w-72 rounded-md border border-border bg-popover p-4 text-popover-foreground shadow-md",
        "origin-[var(--radix-popover-content-transform-origin)]",
        "transition-all duration-150 ease-out",
        "data-[state=closed]:scale-95 data-[state=closed]:opacity-0",
        "data-[state=open]:scale-100 data-[state=open]:opacity-100",
        "focus-visible:outline-none",
        className
      ),
      ...props
    }
  ) })
);
PopoverContent.displayName = "PopoverContent";

// components/v2/Command/Command.tsx
import { forwardRef as forwardRef14 } from "react";
import { Command as CommandPrimitive } from "cmdk";
import { Search } from "lucide-react";
import { jsx as jsx15, jsxs as jsxs6 } from "react/jsx-runtime";
var Command = forwardRef14(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx15(
    CommandPrimitive,
    {
      ref,
      className: cn(
        "flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",
        className
      ),
      ...props
    }
  )
);
Command.displayName = "Command";
var CommandInput = forwardRef14(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxs6("div", { className: "flex items-center border-b border-border px-3", children: [
    /* @__PURE__ */ jsx15(Search, { className: "me-2 size-4 shrink-0 text-muted-foreground" }),
    /* @__PURE__ */ jsx15(
      CommandPrimitive.Input,
      {
        ref,
        className: cn(
          "flex h-10 w-full bg-transparent py-3 text-sm text-foreground outline-none",
          "placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
          className
        ),
        ...props
      }
    )
  ] })
);
CommandInput.displayName = "CommandInput";
var CommandList = forwardRef14(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx15(
    CommandPrimitive.List,
    {
      ref,
      className: cn("max-h-64 overflow-y-auto overflow-x-hidden p-1", className),
      ...props
    }
  )
);
CommandList.displayName = "CommandList";
var CommandEmpty = forwardRef14(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx15(
    CommandPrimitive.Empty,
    {
      ref,
      className: cn("py-6 text-center text-sm text-muted-foreground", className),
      ...props
    }
  )
);
CommandEmpty.displayName = "CommandEmpty";
var CommandGroup = forwardRef14(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx15(
    CommandPrimitive.Group,
    {
      ref,
      className: cn(
        "overflow-hidden p-1 text-foreground",
        "[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5",
        "[&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",
        className
      ),
      ...props
    }
  )
);
CommandGroup.displayName = "CommandGroup";
var CommandSeparator = forwardRef14(({ className, ...props }, ref) => /* @__PURE__ */ jsx15(
  CommandPrimitive.Separator,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-border", className),
    ...props
  }
));
CommandSeparator.displayName = "CommandSeparator";
var CommandItem = forwardRef14(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx15(
    CommandPrimitive.Item,
    {
      ref,
      className: cn(
        "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm text-foreground outline-none",
        "data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground",
        "data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
        "[&_svg]:size-4 [&_svg]:shrink-0",
        className
      ),
      ...props
    }
  )
);
CommandItem.displayName = "CommandItem";

// components/v2/Combobox/Combobox.tsx
import { jsx as jsx16, jsxs as jsxs7 } from "react/jsx-runtime";
var Combobox = forwardRef15(
  ({
    options,
    value,
    onChange,
    placeholder = "Select\u2026",
    searchPlaceholder = "Search\u2026",
    emptyText = "No results found.",
    disabled = false,
    className
  }, ref) => {
    const [open, setOpen] = useState2(false);
    const [internal, setInternal] = useState2("");
    const selected = value ?? internal;
    const setValue = (next) => {
      if (value === void 0) setInternal(next);
      onChange?.(next);
    };
    const selectedLabel = options.find((o) => o.value === selected)?.label;
    return /* @__PURE__ */ jsxs7(Popover, { open, onOpenChange: setOpen, children: [
      /* @__PURE__ */ jsx16(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxs7(
        Button,
        {
          ref,
          variant: "outline",
          role: "combobox",
          "aria-expanded": open,
          disabled,
          className: cn("w-64 justify-between font-normal", className),
          children: [
            /* @__PURE__ */ jsx16("span", { className: cn(!selectedLabel && "text-muted-foreground"), children: selectedLabel ?? placeholder }),
            /* @__PURE__ */ jsx16(ChevronsUpDown, { className: "ms-2 size-4 shrink-0 opacity-50" })
          ]
        }
      ) }),
      /* @__PURE__ */ jsx16(PopoverContent, { className: cn("w-64 p-0", className), align: "start", children: /* @__PURE__ */ jsxs7(Command, { children: [
        /* @__PURE__ */ jsx16(CommandInput, { placeholder: searchPlaceholder }),
        /* @__PURE__ */ jsxs7(CommandList, { children: [
          /* @__PURE__ */ jsx16(CommandEmpty, { children: emptyText }),
          options.map((option) => /* @__PURE__ */ jsxs7(
            CommandItem,
            {
              value: option.label,
              disabled: option.disabled,
              onSelect: () => {
                setValue(option.value === selected ? "" : option.value);
                setOpen(false);
              },
              children: [
                /* @__PURE__ */ jsx16(
                  Check2,
                  {
                    className: cn(
                      selected === option.value ? "opacity-100" : "opacity-0"
                    )
                  }
                ),
                option.label
              ]
            },
            option.value
          ))
        ] })
      ] }) })
    ] });
  }
);
Combobox.displayName = "Combobox";

// components/v2/ContextMenu/ContextMenu.tsx
import { forwardRef as forwardRef16 } from "react";
import * as RadixContextMenu from "@radix-ui/react-context-menu";
import { Check as Check3, ChevronRight as ChevronRight3, Circle } from "lucide-react";
import { jsx as jsx17, jsxs as jsxs8 } from "react/jsx-runtime";
var ContextMenu = RadixContextMenu.Root;
var ContextMenuTrigger = RadixContextMenu.Trigger;
var ContextMenuGroup = RadixContextMenu.Group;
var ContextMenuPortal = RadixContextMenu.Portal;
var ContextMenuSub = RadixContextMenu.Sub;
var ContextMenuRadioGroup = RadixContextMenu.RadioGroup;
var ContextMenuContent = forwardRef16(({ className, ...props }, ref) => /* @__PURE__ */ jsx17(ContextMenuPortal, { children: /* @__PURE__ */ jsx17(
  RadixContextMenu.Content,
  {
    ref,
    className: cn(
      "z-50 min-w-32 overflow-hidden rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-md",
      "origin-[var(--radix-context-menu-content-transform-origin)]",
      "transition-all duration-150 ease-out",
      "data-[state=closed]:scale-95 data-[state=closed]:opacity-0",
      "data-[state=open]:scale-100 data-[state=open]:opacity-100",
      "focus-visible:outline-none",
      className
    ),
    ...props
  }
) }));
ContextMenuContent.displayName = "ContextMenuContent";
var ContextMenuItem = forwardRef16(
  ({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx17(
    RadixContextMenu.Item,
    {
      ref,
      className: cn(
        "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none",
        "transition-colors focus:bg-accent focus:text-accent-foreground",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        "[&>svg]:size-4 [&>svg]:shrink-0",
        inset && "ps-8",
        className
      ),
      ...props
    }
  )
);
ContextMenuItem.displayName = "ContextMenuItem";
var ContextMenuCheckboxItem = forwardRef16(({ className, children, checked, ...props }, ref) => /* @__PURE__ */ jsxs8(
  RadixContextMenu.CheckboxItem,
  {
    ref,
    checked,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pe-2 ps-8 text-sm outline-none",
      "transition-colors focus:bg-accent focus:text-accent-foreground",
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsx17("span", { className: "absolute start-2 flex size-3.5 items-center justify-center", children: /* @__PURE__ */ jsx17(RadixContextMenu.ItemIndicator, { children: /* @__PURE__ */ jsx17(Check3, { className: "size-4", "aria-hidden": true }) }) }),
      children
    ]
  }
));
ContextMenuCheckboxItem.displayName = "ContextMenuCheckboxItem";
var ContextMenuRadioItem = forwardRef16(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs8(
  RadixContextMenu.RadioItem,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pe-2 ps-8 text-sm outline-none",
      "transition-colors focus:bg-accent focus:text-accent-foreground",
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsx17("span", { className: "absolute start-2 flex size-3.5 items-center justify-center", children: /* @__PURE__ */ jsx17(RadixContextMenu.ItemIndicator, { children: /* @__PURE__ */ jsx17(Circle, { className: "size-2 fill-current", "aria-hidden": true }) }) }),
      children
    ]
  }
));
ContextMenuRadioItem.displayName = "ContextMenuRadioItem";
var ContextMenuLabel = forwardRef16(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx17(
  RadixContextMenu.Label,
  {
    ref,
    className: cn(
      "px-2 py-1.5 text-sm font-semibold text-foreground",
      inset && "ps-8",
      className
    ),
    ...props
  }
));
ContextMenuLabel.displayName = "ContextMenuLabel";
var ContextMenuSeparator = forwardRef16(({ className, ...props }, ref) => /* @__PURE__ */ jsx17(
  RadixContextMenu.Separator,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-border", className),
    ...props
  }
));
ContextMenuSeparator.displayName = "ContextMenuSeparator";
var ContextMenuSubTrigger = forwardRef16(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ jsxs8(
  RadixContextMenu.SubTrigger,
  {
    ref,
    className: cn(
      "flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none",
      "transition-colors focus:bg-accent focus:text-accent-foreground",
      "data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
      "[&>svg]:size-4 [&>svg]:shrink-0",
      inset && "ps-8",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx17(ChevronRight3, { className: "ms-auto size-4", "aria-hidden": true })
    ]
  }
));
ContextMenuSubTrigger.displayName = "ContextMenuSubTrigger";
var ContextMenuSubContent = forwardRef16(({ className, ...props }, ref) => /* @__PURE__ */ jsx17(ContextMenuPortal, { children: /* @__PURE__ */ jsx17(
  RadixContextMenu.SubContent,
  {
    ref,
    className: cn(
      "z-50 min-w-32 overflow-hidden rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-lg",
      "origin-[var(--radix-context-menu-content-transform-origin)]",
      "transition-all duration-150 ease-out",
      "data-[state=closed]:scale-95 data-[state=closed]:opacity-0",
      "data-[state=open]:scale-100 data-[state=open]:opacity-100",
      className
    ),
    ...props
  }
) }));
ContextMenuSubContent.displayName = "ContextMenuSubContent";
var ContextMenuShortcut = ({
  className,
  ...props
}) => /* @__PURE__ */ jsx17(
  "span",
  {
    className: cn(
      "ms-auto text-xs tracking-widest text-muted-foreground",
      className
    ),
    ...props
  }
);
ContextMenuShortcut.displayName = "ContextMenuShortcut";

// components/v2/DataTable/DataTable.tsx
import { useState as useState3 } from "react";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from "@tanstack/react-table";

// components/v2/Table/Table.tsx
import { forwardRef as forwardRef17 } from "react";
import { jsx as jsx18 } from "react/jsx-runtime";
var Table = forwardRef17(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx18("div", { className: "relative w-full overflow-x-auto", children: /* @__PURE__ */ jsx18(
    "table",
    {
      ref,
      className: cn("w-full caption-bottom text-sm", className),
      ...props
    }
  ) })
);
Table.displayName = "Table";
var TableHeader = forwardRef17(({ className, ...props }, ref) => /* @__PURE__ */ jsx18("thead", { ref, className: cn("[&_tr]:border-b [&_tr]:border-border", className), ...props }));
TableHeader.displayName = "TableHeader";
var TableBody = forwardRef17(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx18(
    "tbody",
    {
      ref,
      className: cn("[&_tr:last-child]:border-0", className),
      ...props
    }
  )
);
TableBody.displayName = "TableBody";
var TableFooter = forwardRef17(({ className, ...props }, ref) => /* @__PURE__ */ jsx18(
  "tfoot",
  {
    ref,
    className: cn(
      "border-t border-border bg-muted/50 font-medium [&>tr]:last:border-b-0",
      className
    ),
    ...props
  }
));
TableFooter.displayName = "TableFooter";
var TableRow = forwardRef17(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx18(
    "tr",
    {
      ref,
      className: cn(
        "border-b border-border transition-colors",
        "hover:bg-muted/50 data-[state=selected]:bg-muted",
        className
      ),
      ...props
    }
  )
);
TableRow.displayName = "TableRow";
var TableHead = forwardRef17(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx18(
    "th",
    {
      ref,
      className: cn(
        "h-10 px-2 text-start align-middle font-medium text-muted-foreground",
        "[&:has([role=checkbox])]:pe-0",
        className
      ),
      ...props
    }
  )
);
TableHead.displayName = "TableHead";
var TableCell = forwardRef17(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx18(
    "td",
    {
      ref,
      className: cn("p-2 align-middle [&:has([role=checkbox])]:pe-0", className),
      ...props
    }
  )
);
TableCell.displayName = "TableCell";
var TableCaption = forwardRef17(({ className, ...props }, ref) => /* @__PURE__ */ jsx18(
  "caption",
  {
    ref,
    className: cn("mt-4 text-sm text-muted-foreground", className),
    ...props
  }
));
TableCaption.displayName = "TableCaption";

// components/v2/Pagination/Pagination.tsx
import { forwardRef as forwardRef18 } from "react";
import { ChevronLeft as ChevronLeft2, ChevronRight as ChevronRight4, MoreHorizontal as MoreHorizontal2 } from "lucide-react";
import { jsx as jsx19, jsxs as jsxs9 } from "react/jsx-runtime";
var Pagination = ({ className, ...props }) => /* @__PURE__ */ jsx19(
  "nav",
  {
    role: "navigation",
    "aria-label": "pagination",
    className: cn("mx-auto flex w-full justify-center", className),
    ...props
  }
);
Pagination.displayName = "Pagination";
var PaginationContent = forwardRef18(({ className, ...props }, ref) => /* @__PURE__ */ jsx19(
  "ul",
  {
    ref,
    className: cn("flex flex-row items-center gap-1", className),
    ...props
  }
));
PaginationContent.displayName = "PaginationContent";
var PaginationItem = forwardRef18(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx19("li", { ref, className: cn(className), ...props })
);
PaginationItem.displayName = "PaginationItem";
var PaginationLink = forwardRef18(
  ({ className, isActive, size = "icon", ...props }, ref) => /* @__PURE__ */ jsx19(
    "a",
    {
      ref,
      "aria-current": isActive ? "page" : void 0,
      className: cn(
        buttonVariants({ variant: isActive ? "outline" : "ghost", size }),
        "cursor-pointer font-normal",
        className
      ),
      ...props
    }
  )
);
PaginationLink.displayName = "PaginationLink";
var PaginationPrevious = forwardRef18(({ className, ...props }, ref) => /* @__PURE__ */ jsxs9(
  PaginationLink,
  {
    ref,
    "aria-label": "Go to previous page",
    size: "md",
    className: cn("gap-1 ps-2.5", className),
    ...props,
    children: [
      /* @__PURE__ */ jsx19(ChevronLeft2, { className: "size-4" }),
      /* @__PURE__ */ jsx19("span", { children: "Previous" })
    ]
  }
));
PaginationPrevious.displayName = "PaginationPrevious";
var PaginationNext = forwardRef18(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxs9(
    PaginationLink,
    {
      ref,
      "aria-label": "Go to next page",
      size: "md",
      className: cn("gap-1 pe-2.5", className),
      ...props,
      children: [
        /* @__PURE__ */ jsx19("span", { children: "Next" }),
        /* @__PURE__ */ jsx19(ChevronRight4, { className: "size-4" })
      ]
    }
  )
);
PaginationNext.displayName = "PaginationNext";
var PaginationEllipsis = ({
  className,
  ...props
}) => /* @__PURE__ */ jsxs9(
  "span",
  {
    "aria-hidden": true,
    className: cn("flex size-9 items-center justify-center", className),
    ...props,
    children: [
      /* @__PURE__ */ jsx19(MoreHorizontal2, { className: "size-4" }),
      /* @__PURE__ */ jsx19("span", { className: "sr-only", children: "More pages" })
    ]
  }
);
PaginationEllipsis.displayName = "PaginationEllipsis";

// components/v2/DataTable/DataTable.tsx
import { jsx as jsx20, jsxs as jsxs10 } from "react/jsx-runtime";
function DataTable({
  columns,
  data,
  pagination = true,
  pageSize = 10,
  emptyText = "No results."
}) {
  const [sorting, setSorting] = useState3([]);
  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: pagination ? getPaginationRowModel() : void 0,
    initialState: pagination ? { pagination: { pageSize } } : void 0
  });
  const canPrev = pagination && table.getCanPreviousPage();
  const canNext = pagination && table.getCanNextPage();
  return /* @__PURE__ */ jsxs10("div", { className: "flex flex-col gap-4", children: [
    /* @__PURE__ */ jsx20("div", { className: "rounded-md border border-border", children: /* @__PURE__ */ jsxs10(Table, { children: [
      /* @__PURE__ */ jsx20(TableHeader, { children: table.getHeaderGroups().map((headerGroup) => /* @__PURE__ */ jsx20(TableRow, { children: headerGroup.headers.map((header) => {
        const sorted = header.column.getIsSorted();
        return /* @__PURE__ */ jsx20(
          TableHead,
          {
            "aria-sort": sorted === "asc" ? "ascending" : sorted === "desc" ? "descending" : void 0,
            children: header.isPlaceholder ? null : header.column.getCanSort() ? /* @__PURE__ */ jsxs10(
              "button",
              {
                type: "button",
                onClick: header.column.getToggleSortingHandler(),
                className: cn(
                  "inline-flex items-center gap-1 rounded-sm font-medium",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                ),
                children: [
                  flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  ),
                  /* @__PURE__ */ jsx20("span", { "aria-hidden": true, className: "text-muted-foreground", children: sorted === "asc" ? "\u2191" : sorted === "desc" ? "\u2193" : "" })
                ]
              }
            ) : flexRender(
              header.column.columnDef.header,
              header.getContext()
            )
          },
          header.id
        );
      }) }, headerGroup.id)) }),
      /* @__PURE__ */ jsx20(TableBody, { children: table.getRowModel().rows.length ? table.getRowModel().rows.map((row) => /* @__PURE__ */ jsx20(
        TableRow,
        {
          "data-state": row.getIsSelected() ? "selected" : void 0,
          children: row.getVisibleCells().map((cell) => /* @__PURE__ */ jsx20(TableCell, { children: flexRender(cell.column.columnDef.cell, cell.getContext()) }, cell.id))
        },
        row.id
      )) : /* @__PURE__ */ jsx20(TableRow, { children: /* @__PURE__ */ jsx20(
        TableCell,
        {
          colSpan: columns.length,
          className: "h-24 text-center text-muted-foreground",
          children: emptyText
        }
      ) }) })
    ] }) }),
    pagination && /* @__PURE__ */ jsxs10("div", { className: "flex items-center justify-between gap-2", children: [
      /* @__PURE__ */ jsxs10("span", { className: "text-sm text-muted-foreground", children: [
        "Page ",
        table.getState().pagination.pageIndex + 1,
        " of",
        " ",
        table.getPageCount()
      ] }),
      /* @__PURE__ */ jsx20(Pagination, { className: "mx-0 w-auto justify-end", children: /* @__PURE__ */ jsxs10(PaginationContent, { children: [
        /* @__PURE__ */ jsx20(PaginationItem, { children: /* @__PURE__ */ jsx20(
          PaginationPrevious,
          {
            role: "button",
            "aria-disabled": !canPrev,
            className: cn(
              !canPrev && "pointer-events-none opacity-50"
            ),
            onClick: () => table.previousPage()
          }
        ) }),
        /* @__PURE__ */ jsx20(PaginationItem, { children: /* @__PURE__ */ jsx20(
          PaginationNext,
          {
            role: "button",
            "aria-disabled": !canNext,
            className: cn(
              !canNext && "pointer-events-none opacity-50"
            ),
            onClick: () => table.nextPage()
          }
        ) })
      ] }) })
    ] })
  ] });
}
DataTable.displayName = "DataTable";

// components/v2/DatePicker/DatePicker.tsx
import { forwardRef as forwardRef19, useState as useState4 } from "react";
import { CalendarIcon } from "lucide-react";
import { jsx as jsx21, jsxs as jsxs11 } from "react/jsx-runtime";
var DatePicker = forwardRef19(
  ({
    value,
    onChange,
    defaultValue,
    placeholder = "Pick a date",
    disabled = false,
    locale,
    className
  }, ref) => {
    const [open, setOpen] = useState4(false);
    const [internal, setInternal] = useState4(defaultValue);
    const selected = value ?? internal;
    const setValue = (next) => {
      if (value === void 0) setInternal(next);
      onChange?.(next);
    };
    const label = selected ? selected.toLocaleDateString(locale, {
      year: "numeric",
      month: "long",
      day: "numeric"
    }) : placeholder;
    return /* @__PURE__ */ jsxs11(Popover, { open, onOpenChange: setOpen, children: [
      /* @__PURE__ */ jsx21(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxs11(
        Button,
        {
          ref,
          variant: "outline",
          disabled,
          className: cn(
            "w-64 justify-start gap-2 font-normal",
            !selected && "text-muted-foreground",
            className
          ),
          children: [
            /* @__PURE__ */ jsx21(CalendarIcon, { className: "size-4 shrink-0" }),
            label
          ]
        }
      ) }),
      /* @__PURE__ */ jsx21(PopoverContent, { className: "w-auto p-0", align: "start", children: /* @__PURE__ */ jsx21(
        Calendar,
        {
          mode: "single",
          selected,
          onSelect: (date) => {
            setValue(date);
            setOpen(false);
          },
          autoFocus: true
        }
      ) })
    ] });
  }
);
DatePicker.displayName = "DatePicker";

// components/v2/Dialog/Dialog.tsx
import { forwardRef as forwardRef20 } from "react";
import * as RadixDialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";

// components/utils/i18n/useGeeklegoI18n.ts
import { useContext as useContext2, useMemo as useMemo2 } from "react";

// components/utils/i18n/GeeklegoI18nProvider.tsx
import { createContext as createContext2, useMemo } from "react";
import { jsx as jsx22 } from "react/jsx-runtime";
var GeeklegoI18nContext = createContext2(null);
function GeeklegoI18nProvider({
  children,
  strings = {},
  formatters = {},
  locale
}) {
  const value = useMemo(
    () => ({ strings, formatters, locale }),
    [strings, formatters, locale]
  );
  return /* @__PURE__ */ jsx22(GeeklegoI18nContext.Provider, { value, children });
}

// components/utils/i18n/GeeklegoI18nProvider.types.ts
var DEFAULT_STRINGS = {
  label: {
    required: "(required)",
    optional: "(Optional)"
  },
  dialog: {
    closeLabel: "Close"
  },
  popover: {
    closeLabel: "Close"
  },
  dropdownMenu: {
    defaultMenuLabel: "Menu"
  },
  combobox: {
    clearLabel: "Clear",
    listboxLabel: "Options",
    noResultsMessage: "No results",
    loadingMessage: "Loading options\u2026"
  },
  command: {
    emptyMessage: "No results found."
  },
  accordion: {
    expandLabel: "Expand",
    collapseLabel: "Collapse"
  },
  select: {
    placeholder: "Select\u2026"
  }
};
var DEFAULT_FORMATTERS = {
  formatPercent: (value, fractionDigits = 1) => `${value.toFixed(fractionDigits)}%`,
  formatDate: (value, options) => {
    const date = value instanceof Date ? value : new Date(value);
    return new Intl.DateTimeFormat(void 0, options).format(date);
  }
  // formatNumber intentionally omitted — components use their own built-in formatter
  // and only swap to this when explicitly provided via context.
};

// components/utils/i18n/useGeeklegoI18n.ts
function useComponentI18n(componentKey, propOverride) {
  const ctx = useContext2(GeeklegoI18nContext);
  return useMemo2(
    () => ({
      // Layer 1 — hardcoded English defaults (always present)
      ...DEFAULT_STRINGS[componentKey],
      // Layer 2 — consumer's i18n provider (partial overrides)
      ...ctx?.strings[componentKey],
      // Layer 3 — per-instance prop override (most specific — always wins)
      ...propOverride,
      // Formatters travel with the resolved strings (defaults if no context)
      formatters: {
        ...DEFAULT_FORMATTERS,
        ...ctx?.formatters
      }
    }),
    [componentKey, ctx, propOverride]
  );
}

// components/v2/Dialog/Dialog.tsx
import { jsx as jsx23, jsxs as jsxs12 } from "react/jsx-runtime";
var Dialog = RadixDialog.Root;
var DialogTrigger = RadixDialog.Trigger;
var DialogClose = RadixDialog.Close;
var DialogPortal = RadixDialog.Portal;
var DialogOverlay = forwardRef20(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx23(
    RadixDialog.Overlay,
    {
      ref,
      className: cn(
        "fixed inset-0 z-50 bg-foreground/50 backdrop-blur-sm",
        "transition-opacity duration-200 ease-out",
        "data-[state=closed]:opacity-0 data-[state=open]:opacity-100",
        className
      ),
      ...props
    }
  )
);
DialogOverlay.displayName = "DialogOverlay";
var DialogContent = forwardRef20(
  ({ className, children, showClose = true, i18nStrings, ...props }, ref) => {
    const t = useComponentI18n("dialog", i18nStrings);
    return /* @__PURE__ */ jsxs12(DialogPortal, { children: [
      /* @__PURE__ */ jsx23(DialogOverlay, {}),
      /* @__PURE__ */ jsxs12(
        RadixDialog.Content,
        {
          ref,
          className: cn(
            "fixed left-1/2 top-1/2 z-50 grid w-full max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4",
            "rounded-lg border border-border bg-popover p-6 text-popover-foreground shadow-lg",
            "transition-all duration-200 ease-out",
            "data-[state=closed]:scale-95 data-[state=closed]:opacity-0",
            "data-[state=open]:scale-100 data-[state=open]:opacity-100",
            "focus-visible:outline-none",
            className
          ),
          ...props,
          children: [
            children,
            showClose && /* @__PURE__ */ jsx23(
              RadixDialog.Close,
              {
                className: cn(
                  "absolute end-4 top-4 rounded-sm text-muted-foreground opacity-70",
                  "transition-opacity hover:opacity-100",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-popover",
                  "disabled:pointer-events-none"
                ),
                "aria-label": t.closeLabel,
                children: /* @__PURE__ */ jsx23(X, { className: "size-4" })
              }
            )
          ]
        }
      )
    ] });
  }
);
DialogContent.displayName = "DialogContent";
var DialogHeader = ({ className, ...props }) => /* @__PURE__ */ jsx23(
  "div",
  {
    className: cn("flex flex-col gap-1.5 text-center sm:text-start", className),
    ...props
  }
);
DialogHeader.displayName = "DialogHeader";
var DialogFooter = ({ className, ...props }) => /* @__PURE__ */ jsx23(
  "div",
  {
    className: cn(
      "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
      className
    ),
    ...props
  }
);
DialogFooter.displayName = "DialogFooter";
var DialogTitle = forwardRef20(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx23(
    RadixDialog.Title,
    {
      ref,
      className: cn(
        "text-lg font-semibold leading-none text-foreground",
        className
      ),
      ...props
    }
  )
);
DialogTitle.displayName = "DialogTitle";
var DialogDescription = forwardRef20(({ className, ...props }, ref) => /* @__PURE__ */ jsx23(
  RadixDialog.Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
DialogDescription.displayName = "DialogDescription";

// components/v2/Drawer/Drawer.tsx
import { forwardRef as forwardRef21 } from "react";
import { Drawer as VaulDrawer } from "vaul";
import { jsx as jsx24, jsxs as jsxs13 } from "react/jsx-runtime";
var Drawer = ({ shouldScaleBackground = true, ...props }) => /* @__PURE__ */ jsx24(VaulDrawer.Root, { shouldScaleBackground, ...props });
Drawer.displayName = "Drawer";
var DrawerTrigger = VaulDrawer.Trigger;
var DrawerPortal = VaulDrawer.Portal;
var DrawerClose = VaulDrawer.Close;
var DrawerOverlay = forwardRef21(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx24(
    VaulDrawer.Overlay,
    {
      ref,
      className: cn("fixed inset-0 z-50 bg-foreground/50", className),
      ...props
    }
  )
);
DrawerOverlay.displayName = "DrawerOverlay";
var DrawerContent = forwardRef21(
  ({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs13(DrawerPortal, { children: [
    /* @__PURE__ */ jsx24(DrawerOverlay, {}),
    /* @__PURE__ */ jsxs13(
      VaulDrawer.Content,
      {
        ref,
        className: cn(
          "group/drawer fixed z-50 flex border border-border bg-background focus-visible:outline-none",
          // bottom (default): full-width strip pinned to the bottom edge
          "data-[vaul-drawer-direction=bottom]:inset-x-0 data-[vaul-drawer-direction=bottom]:bottom-0 data-[vaul-drawer-direction=bottom]:mt-24 data-[vaul-drawer-direction=bottom]:h-auto data-[vaul-drawer-direction=bottom]:flex-col data-[vaul-drawer-direction=bottom]:rounded-t-lg",
          // top: full-width strip pinned to the top edge
          "data-[vaul-drawer-direction=top]:inset-x-0 data-[vaul-drawer-direction=top]:top-0 data-[vaul-drawer-direction=top]:mb-24 data-[vaul-drawer-direction=top]:h-auto data-[vaul-drawer-direction=top]:flex-col data-[vaul-drawer-direction=top]:rounded-b-lg",
          // right: full-height panel pinned to the right edge
          "data-[vaul-drawer-direction=right]:inset-y-0 data-[vaul-drawer-direction=right]:right-0 data-[vaul-drawer-direction=right]:w-3/4 data-[vaul-drawer-direction=right]:flex-col data-[vaul-drawer-direction=right]:rounded-l-lg data-[vaul-drawer-direction=right]:sm:max-w-sm",
          // left: full-height panel pinned to the left edge
          "data-[vaul-drawer-direction=left]:inset-y-0 data-[vaul-drawer-direction=left]:left-0 data-[vaul-drawer-direction=left]:w-3/4 data-[vaul-drawer-direction=left]:flex-col data-[vaul-drawer-direction=left]:rounded-r-lg data-[vaul-drawer-direction=left]:sm:max-w-sm",
          className
        ),
        ...props,
        children: [
          /* @__PURE__ */ jsx24("div", { className: "mx-auto mt-4 hidden h-2 w-24 shrink-0 rounded-full bg-muted group-data-[vaul-drawer-direction=bottom]/drawer:block group-data-[vaul-drawer-direction=top]/drawer:block" }),
          children
        ]
      }
    )
  ] })
);
DrawerContent.displayName = "DrawerContent";
var DrawerHeader = ({ className, ...props }) => /* @__PURE__ */ jsx24(
  "div",
  {
    className: cn("grid gap-1.5 p-4 text-center sm:text-start", className),
    ...props
  }
);
DrawerHeader.displayName = "DrawerHeader";
var DrawerFooter = ({ className, ...props }) => /* @__PURE__ */ jsx24("div", { className: cn("mt-auto flex flex-col gap-2 p-4", className), ...props });
DrawerFooter.displayName = "DrawerFooter";
var DrawerTitle = forwardRef21(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx24(
    VaulDrawer.Title,
    {
      ref,
      className: cn(
        "text-lg font-semibold leading-none tracking-tight text-foreground",
        className
      ),
      ...props
    }
  )
);
DrawerTitle.displayName = "DrawerTitle";
var DrawerDescription = forwardRef21(({ className, ...props }, ref) => /* @__PURE__ */ jsx24(
  VaulDrawer.Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
DrawerDescription.displayName = "DrawerDescription";

// components/v2/DropdownMenu/DropdownMenu.tsx
import { forwardRef as forwardRef22 } from "react";
import * as RadixDropdownMenu from "@radix-ui/react-dropdown-menu";
import { Check as Check4, ChevronRight as ChevronRight5, Circle as Circle2 } from "lucide-react";
import { jsx as jsx25, jsxs as jsxs14 } from "react/jsx-runtime";
var DropdownMenu = RadixDropdownMenu.Root;
var DropdownMenuTrigger = RadixDropdownMenu.Trigger;
var DropdownMenuGroup = RadixDropdownMenu.Group;
var DropdownMenuPortal = RadixDropdownMenu.Portal;
var DropdownMenuSub = RadixDropdownMenu.Sub;
var DropdownMenuRadioGroup = RadixDropdownMenu.RadioGroup;
var DropdownMenuContent = forwardRef22(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx25(DropdownMenuPortal, { children: /* @__PURE__ */ jsx25(
  RadixDropdownMenu.Content,
  {
    ref,
    sideOffset,
    className: cn(
      "z-50 min-w-32 overflow-hidden rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-md",
      "origin-[var(--radix-dropdown-menu-content-transform-origin)]",
      "transition-all duration-150 ease-out",
      "data-[state=closed]:scale-95 data-[state=closed]:opacity-0",
      "data-[state=open]:scale-100 data-[state=open]:opacity-100",
      "focus-visible:outline-none",
      className
    ),
    ...props
  }
) }));
DropdownMenuContent.displayName = "DropdownMenuContent";
var DropdownMenuItem = forwardRef22(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx25(
  RadixDropdownMenu.Item,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none",
      "transition-colors focus:bg-accent focus:text-accent-foreground",
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      "[&>svg]:size-4 [&>svg]:shrink-0",
      inset && "ps-8",
      className
    ),
    ...props
  }
));
DropdownMenuItem.displayName = "DropdownMenuItem";
var DropdownMenuCheckboxItem = forwardRef22(({ className, children, checked, ...props }, ref) => /* @__PURE__ */ jsxs14(
  RadixDropdownMenu.CheckboxItem,
  {
    ref,
    checked,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pe-2 ps-8 text-sm outline-none",
      "transition-colors focus:bg-accent focus:text-accent-foreground",
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsx25("span", { className: "absolute start-2 flex size-3.5 items-center justify-center", children: /* @__PURE__ */ jsx25(RadixDropdownMenu.ItemIndicator, { children: /* @__PURE__ */ jsx25(Check4, { className: "size-4", "aria-hidden": true }) }) }),
      children
    ]
  }
));
DropdownMenuCheckboxItem.displayName = "DropdownMenuCheckboxItem";
var DropdownMenuRadioItem = forwardRef22(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs14(
  RadixDropdownMenu.RadioItem,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pe-2 ps-8 text-sm outline-none",
      "transition-colors focus:bg-accent focus:text-accent-foreground",
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsx25("span", { className: "absolute start-2 flex size-3.5 items-center justify-center", children: /* @__PURE__ */ jsx25(RadixDropdownMenu.ItemIndicator, { children: /* @__PURE__ */ jsx25(Circle2, { className: "size-2 fill-current", "aria-hidden": true }) }) }),
      children
    ]
  }
));
DropdownMenuRadioItem.displayName = "DropdownMenuRadioItem";
var DropdownMenuLabel = forwardRef22(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx25(
  RadixDropdownMenu.Label,
  {
    ref,
    className: cn(
      "px-2 py-1.5 text-sm font-semibold text-foreground",
      inset && "ps-8",
      className
    ),
    ...props
  }
));
DropdownMenuLabel.displayName = "DropdownMenuLabel";
var DropdownMenuSeparator = forwardRef22(({ className, ...props }, ref) => /* @__PURE__ */ jsx25(
  RadixDropdownMenu.Separator,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-border", className),
    ...props
  }
));
DropdownMenuSeparator.displayName = "DropdownMenuSeparator";
var DropdownMenuSubTrigger = forwardRef22(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ jsxs14(
  RadixDropdownMenu.SubTrigger,
  {
    ref,
    className: cn(
      "flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none",
      "transition-colors focus:bg-accent focus:text-accent-foreground",
      "data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
      "[&>svg]:size-4 [&>svg]:shrink-0",
      inset && "ps-8",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx25(ChevronRight5, { className: "ms-auto size-4", "aria-hidden": true })
    ]
  }
));
DropdownMenuSubTrigger.displayName = "DropdownMenuSubTrigger";
var DropdownMenuSubContent = forwardRef22(({ className, ...props }, ref) => /* @__PURE__ */ jsx25(DropdownMenuPortal, { children: /* @__PURE__ */ jsx25(
  RadixDropdownMenu.SubContent,
  {
    ref,
    className: cn(
      "z-50 min-w-32 overflow-hidden rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-lg",
      "origin-[var(--radix-dropdown-menu-content-transform-origin)]",
      "transition-all duration-150 ease-out",
      "data-[state=closed]:scale-95 data-[state=closed]:opacity-0",
      "data-[state=open]:scale-100 data-[state=open]:opacity-100",
      className
    ),
    ...props
  }
) }));
DropdownMenuSubContent.displayName = "DropdownMenuSubContent";
var DropdownMenuShortcut = ({
  className,
  ...props
}) => /* @__PURE__ */ jsx25(
  "span",
  {
    className: cn(
      "ms-auto text-xs tracking-widest text-muted-foreground",
      className
    ),
    ...props
  }
);
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";

// components/v2/Field/Field.tsx
import {
  createContext as createContext3,
  forwardRef as forwardRef24,
  useContext as useContext3,
  useId
} from "react";
import { Slot as Slot4 } from "@radix-ui/react-slot";
import {
  Controller,
  FormProvider,
  useFormContext,
  useFormState
} from "react-hook-form";

// components/v2/Label/Label.tsx
import { forwardRef as forwardRef23 } from "react";
import * as RadixLabel from "@radix-ui/react-label";

// components/v2/Label/label-variants.ts
import { cva as cva4 } from "class-variance-authority";
var labelVariants = cva4(
  [
    "text-sm font-medium leading-none text-foreground",
    "peer-disabled:cursor-not-allowed peer-disabled:opacity-50"
  ].join(" ")
);

// components/v2/Label/Label.tsx
import { jsx as jsx26 } from "react/jsx-runtime";
var Label3 = forwardRef23(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx26(
    RadixLabel.Root,
    {
      ref,
      className: cn(labelVariants(), className),
      ...props
    }
  )
);
Label3.displayName = "Label";

// components/v2/Field/Field.tsx
import { jsx as jsx27 } from "react/jsx-runtime";
var Form = FormProvider;
var FormFieldContext = createContext3(null);
var FormItemContext = createContext3(null);
function useFormField() {
  const fieldContext = useContext3(FormFieldContext);
  const itemContext = useContext3(FormItemContext);
  const { getFieldState } = useFormContext();
  const formState = useFormState({ name: fieldContext?.name });
  if (!fieldContext) {
    throw new Error("useFormField must be used within a <FormField>");
  }
  if (!itemContext) {
    throw new Error("useFormField must be used within a <FormItem>");
  }
  const fieldState = getFieldState(fieldContext.name, formState);
  const { id } = itemContext;
  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState
  };
}
var FormField = (props) => /* @__PURE__ */ jsx27(FormFieldContext.Provider, { value: { name: props.name }, children: /* @__PURE__ */ jsx27(Controller, { ...props }) });
var FormItem = forwardRef24(
  ({ className, ...props }, ref) => {
    const id = useId();
    return /* @__PURE__ */ jsx27(FormItemContext.Provider, { value: { id }, children: /* @__PURE__ */ jsx27("div", { ref, className: cn("flex flex-col gap-2", className), ...props }) });
  }
);
FormItem.displayName = "FormItem";
var FormLabel = forwardRef24(
  ({ className, ...props }, ref) => {
    const { error, formItemId } = useFormField();
    return /* @__PURE__ */ jsx27(
      Label3,
      {
        ref,
        htmlFor: formItemId,
        className: cn(error && "text-destructive", className),
        ...props
      }
    );
  }
);
FormLabel.displayName = "FormLabel";
var FormControl = forwardRef24(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField();
  return /* @__PURE__ */ jsx27(
    Slot4,
    {
      ref,
      id: formItemId,
      "aria-describedby": error ? `${formDescriptionId} ${formMessageId}` : formDescriptionId,
      "aria-invalid": !!error,
      ...props
    }
  );
});
FormControl.displayName = "FormControl";
var FormDescription = forwardRef24(
  ({ className, ...props }, ref) => {
    const { formDescriptionId } = useFormField();
    return /* @__PURE__ */ jsx27(
      "p",
      {
        ref,
        id: formDescriptionId,
        className: cn("text-sm text-muted-foreground", className),
        ...props
      }
    );
  }
);
FormDescription.displayName = "FormDescription";
var FormMessage = forwardRef24(
  ({ className, children, ...props }, ref) => {
    const { error, formMessageId } = useFormField();
    const body = error ? String(error?.message ?? "") : children;
    if (!body) return null;
    return /* @__PURE__ */ jsx27(
      "p",
      {
        ref,
        id: formMessageId,
        className: cn("text-sm font-medium text-destructive", className),
        ...props,
        children: body
      }
    );
  }
);
FormMessage.displayName = "FormMessage";

// components/v2/HoverCard/HoverCard.tsx
import { forwardRef as forwardRef25 } from "react";
import * as RadixHoverCard from "@radix-ui/react-hover-card";
import { jsx as jsx28 } from "react/jsx-runtime";
var HoverCard = RadixHoverCard.Root;
var HoverCardTrigger = RadixHoverCard.Trigger;
var HoverCardContent = forwardRef25(({ className, align = "center", sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx28(RadixHoverCard.Portal, { children: /* @__PURE__ */ jsx28(
  RadixHoverCard.Content,
  {
    ref,
    align,
    sideOffset,
    className: cn(
      "z-50 w-64 rounded-md border border-border bg-popover p-4 text-popover-foreground shadow-md outline-none",
      "transition-all duration-150 ease-out",
      "data-[state=closed]:scale-95 data-[state=closed]:opacity-0",
      "data-[state=open]:scale-100 data-[state=open]:opacity-100",
      className
    ),
    ...props
  }
) }));
HoverCardContent.displayName = "HoverCardContent";

// components/v2/Input/Input.tsx
import { forwardRef as forwardRef26 } from "react";

// components/v2/Input/input-variants.ts
import { cva as cva5 } from "class-variance-authority";
var inputVariants = cva5(
  // base — shared by every variant
  [
    "flex w-full min-w-0 rounded-md border bg-background text-foreground",
    "shadow-xs transition-colors duration-150 ease-out",
    "placeholder:text-muted-foreground",
    "selection:bg-primary selection:text-primary-foreground",
    "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
  ].join(" "),
  {
    variants: {
      variant: {
        default: "border-input focus-visible:ring-ring",
        error: "border-destructive focus-visible:ring-destructive text-foreground"
      },
      inputSize: {
        sm: "h-8 px-2.5 py-1 text-xs file:py-1",
        md: "h-10 px-3 py-2 text-sm file:py-1.5",
        lg: "h-11 px-4 py-2.5 text-base file:py-2"
      }
    },
    defaultVariants: {
      variant: "default",
      inputSize: "md"
    }
  }
);

// components/v2/Input/Input.tsx
import { jsx as jsx29 } from "react/jsx-runtime";
var Input = forwardRef26(
  ({ className, variant, inputSize, type = "text", ...props }, ref) => {
    return /* @__PURE__ */ jsx29(
      "input",
      {
        ref,
        type,
        "data-slot": "input",
        "aria-invalid": variant === "error" ? true : props["aria-invalid"],
        className: cn(inputVariants({ variant, inputSize }), className),
        ...props
      }
    );
  }
);
Input.displayName = "Input";

// components/v2/InputOTP/InputOTP.tsx
import { forwardRef as forwardRef27, useContext as useContext4 } from "react";
import { OTPInput, OTPInputContext } from "input-otp";
import { Minus as Minus2 } from "lucide-react";
import { jsx as jsx30, jsxs as jsxs15 } from "react/jsx-runtime";
var InputOTP = forwardRef27(
  ({ className, containerClassName, ...props }, ref) => /* @__PURE__ */ jsx30(
    OTPInput,
    {
      ref,
      containerClassName: cn(
        "flex items-center gap-2 has-[:disabled]:opacity-50",
        containerClassName
      ),
      className: cn("disabled:cursor-not-allowed", className),
      ...props
    }
  )
);
InputOTP.displayName = "InputOTP";
var InputOTPGroup = forwardRef27(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx30("div", { ref, className: cn("flex items-center", className), ...props })
);
InputOTPGroup.displayName = "InputOTPGroup";
var InputOTPSlot = forwardRef27(
  ({ index, className, ...props }, ref) => {
    const inputOTPContext = useContext4(OTPInputContext);
    const slot = inputOTPContext?.slots[index];
    const { char, hasFakeCaret, isActive } = slot ?? {};
    return /* @__PURE__ */ jsxs15(
      "div",
      {
        ref,
        "data-active": isActive ? "" : void 0,
        className: cn(
          "relative flex size-10 items-center justify-center text-sm",
          "border-y border-r border-input bg-background text-foreground",
          "transition-all duration-150 ease-out",
          "first:rounded-l-md first:border-l last:rounded-r-md",
          "data-[active]:z-10 data-[active]:ring-2 data-[active]:ring-ring data-[active]:ring-offset-1 data-[active]:ring-offset-background",
          className
        ),
        ...props,
        children: [
          char,
          hasFakeCaret && /* @__PURE__ */ jsx30("div", { className: "pointer-events-none absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ jsx30("div", { className: "h-4 w-px animate-caret-blink bg-foreground duration-1000" }) })
        ]
      }
    );
  }
);
InputOTPSlot.displayName = "InputOTPSlot";
var InputOTPSeparator = forwardRef27(({ className, ...props }, ref) => /* @__PURE__ */ jsx30(
  "div",
  {
    ref,
    role: "separator",
    className: cn("flex items-center text-muted-foreground", className),
    ...props,
    children: /* @__PURE__ */ jsx30(Minus2, { className: "size-4" })
  }
));
InputOTPSeparator.displayName = "InputOTPSeparator";

// components/v2/Menubar/Menubar.tsx
import { forwardRef as forwardRef28 } from "react";
import * as RadixMenubar from "@radix-ui/react-menubar";
import { Check as Check5, ChevronRight as ChevronRight6, Circle as Circle3 } from "lucide-react";
import { jsx as jsx31, jsxs as jsxs16 } from "react/jsx-runtime";
var MenubarMenu = (props) => /* @__PURE__ */ jsx31(RadixMenubar.Menu, { ...props });
MenubarMenu.displayName = "MenubarMenu";
var MenubarGroup = RadixMenubar.Group;
var MenubarPortal = RadixMenubar.Portal;
var MenubarSub = RadixMenubar.Sub;
var MenubarRadioGroup = RadixMenubar.RadioGroup;
var Menubar = forwardRef28(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx31(
    RadixMenubar.Root,
    {
      ref,
      className: cn(
        "flex h-10 items-center gap-1 rounded-md border border-border bg-background p-1",
        className
      ),
      ...props
    }
  )
);
Menubar.displayName = "Menubar";
var MenubarTrigger = forwardRef28(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx31(
    RadixMenubar.Trigger,
    {
      ref,
      className: cn(
        "flex cursor-default select-none items-center rounded-sm px-3 py-1.5 text-sm font-medium outline-none",
        "transition-colors focus:bg-accent focus:text-accent-foreground",
        "data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
        className
      ),
      ...props
    }
  )
);
MenubarTrigger.displayName = "MenubarTrigger";
var MenubarContent = forwardRef28(
  ({ className, align = "start", alignOffset = -4, sideOffset = 8, ...props }, ref) => /* @__PURE__ */ jsx31(MenubarPortal, { children: /* @__PURE__ */ jsx31(
    RadixMenubar.Content,
    {
      ref,
      align,
      alignOffset,
      sideOffset,
      className: cn(
        "z-50 min-w-48 overflow-hidden rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-md",
        "origin-[var(--radix-menubar-content-transform-origin)]",
        "transition-all duration-150 ease-out",
        "data-[state=closed]:scale-95 data-[state=closed]:opacity-0",
        "data-[state=open]:scale-100 data-[state=open]:opacity-100",
        "focus-visible:outline-none",
        className
      ),
      ...props
    }
  ) })
);
MenubarContent.displayName = "MenubarContent";
var MenubarItem = forwardRef28(
  ({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx31(
    RadixMenubar.Item,
    {
      ref,
      className: cn(
        "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none",
        "transition-colors focus:bg-accent focus:text-accent-foreground",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        "[&>svg]:size-4 [&>svg]:shrink-0",
        inset && "ps-8",
        className
      ),
      ...props
    }
  )
);
MenubarItem.displayName = "MenubarItem";
var MenubarCheckboxItem = forwardRef28(({ className, children, checked, ...props }, ref) => /* @__PURE__ */ jsxs16(
  RadixMenubar.CheckboxItem,
  {
    ref,
    checked,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pe-2 ps-8 text-sm outline-none",
      "transition-colors focus:bg-accent focus:text-accent-foreground",
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsx31("span", { className: "absolute start-2 flex size-3.5 items-center justify-center", children: /* @__PURE__ */ jsx31(RadixMenubar.ItemIndicator, { children: /* @__PURE__ */ jsx31(Check5, { className: "size-4", "aria-hidden": true }) }) }),
      children
    ]
  }
));
MenubarCheckboxItem.displayName = "MenubarCheckboxItem";
var MenubarRadioItem = forwardRef28(
  ({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs16(
    RadixMenubar.RadioItem,
    {
      ref,
      className: cn(
        "relative flex cursor-default select-none items-center rounded-sm py-1.5 pe-2 ps-8 text-sm outline-none",
        "transition-colors focus:bg-accent focus:text-accent-foreground",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      ),
      ...props,
      children: [
        /* @__PURE__ */ jsx31("span", { className: "absolute start-2 flex size-3.5 items-center justify-center", children: /* @__PURE__ */ jsx31(RadixMenubar.ItemIndicator, { children: /* @__PURE__ */ jsx31(Circle3, { className: "size-2 fill-current", "aria-hidden": true }) }) }),
        children
      ]
    }
  )
);
MenubarRadioItem.displayName = "MenubarRadioItem";
var MenubarLabel = forwardRef28(
  ({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx31(
    RadixMenubar.Label,
    {
      ref,
      className: cn(
        "px-2 py-1.5 text-sm font-semibold text-foreground",
        inset && "ps-8",
        className
      ),
      ...props
    }
  )
);
MenubarLabel.displayName = "MenubarLabel";
var MenubarSeparator = forwardRef28(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx31(
    RadixMenubar.Separator,
    {
      ref,
      className: cn("-mx-1 my-1 h-px bg-border", className),
      ...props
    }
  )
);
MenubarSeparator.displayName = "MenubarSeparator";
var MenubarSubTrigger = forwardRef28(
  ({ className, inset, children, ...props }, ref) => /* @__PURE__ */ jsxs16(
    RadixMenubar.SubTrigger,
    {
      ref,
      className: cn(
        "flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none",
        "transition-colors focus:bg-accent focus:text-accent-foreground",
        "data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
        "[&>svg]:size-4 [&>svg]:shrink-0",
        inset && "ps-8",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsx31(ChevronRight6, { className: "ms-auto size-4", "aria-hidden": true })
      ]
    }
  )
);
MenubarSubTrigger.displayName = "MenubarSubTrigger";
var MenubarSubContent = forwardRef28(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx31(MenubarPortal, { children: /* @__PURE__ */ jsx31(
    RadixMenubar.SubContent,
    {
      ref,
      className: cn(
        "z-50 min-w-32 overflow-hidden rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-lg",
        "origin-[var(--radix-menubar-content-transform-origin)]",
        "transition-all duration-150 ease-out",
        "data-[state=closed]:scale-95 data-[state=closed]:opacity-0",
        "data-[state=open]:scale-100 data-[state=open]:opacity-100",
        className
      ),
      ...props
    }
  ) })
);
MenubarSubContent.displayName = "MenubarSubContent";
var MenubarShortcut = ({ className, ...props }) => /* @__PURE__ */ jsx31(
  "span",
  {
    className: cn("ms-auto text-xs tracking-widest text-muted-foreground", className),
    ...props
  }
);
MenubarShortcut.displayName = "MenubarShortcut";

// components/v2/NavigationMenu/NavigationMenu.tsx
import { forwardRef as forwardRef29 } from "react";
import * as RadixNavigationMenu from "@radix-ui/react-navigation-menu";
import { ChevronDown as ChevronDown2 } from "lucide-react";

// components/v2/NavigationMenu/navigation-menu-variants.ts
import { cva as cva6 } from "class-variance-authority";
var navigationMenuTriggerStyle = cva6(
  [
    "group inline-flex h-10 w-max items-center justify-center gap-1",
    "rounded-md bg-background px-4 py-2 text-sm font-medium",
    "transition-colors",
    "hover:bg-accent hover:text-accent-foreground",
    "focus:bg-accent focus:text-accent-foreground focus:outline-none",
    "disabled:pointer-events-none disabled:opacity-50",
    "data-[state=open]:bg-accent data-[state=open]:text-accent-foreground"
  ].join(" ")
);

// components/v2/NavigationMenu/NavigationMenu.tsx
import { jsx as jsx32, jsxs as jsxs17 } from "react/jsx-runtime";
var NavigationMenu = forwardRef29(({ className, children, viewport = true, ...props }, ref) => /* @__PURE__ */ jsxs17(
  RadixNavigationMenu.Root,
  {
    ref,
    className: cn(
      "relative z-10 flex max-w-max flex-1 items-center justify-center",
      className
    ),
    ...props,
    children: [
      children,
      viewport && /* @__PURE__ */ jsx32(NavigationMenuViewport, {})
    ]
  }
));
NavigationMenu.displayName = "NavigationMenu";
var NavigationMenuItem = RadixNavigationMenu.Item;
var NavigationMenuList = forwardRef29(({ className, ...props }, ref) => /* @__PURE__ */ jsx32(
  RadixNavigationMenu.List,
  {
    ref,
    className: cn("flex flex-1 list-none items-center justify-center gap-1", className),
    ...props
  }
));
NavigationMenuList.displayName = "NavigationMenuList";
var NavigationMenuTrigger = forwardRef29(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs17(
  RadixNavigationMenu.Trigger,
  {
    ref,
    className: cn(navigationMenuTriggerStyle(), className),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx32(
        ChevronDown2,
        {
          className: "relative top-px size-3 transition-transform duration-200 group-data-[state=open]:rotate-180",
          "aria-hidden": true
        }
      )
    ]
  }
));
NavigationMenuTrigger.displayName = "NavigationMenuTrigger";
var NavigationMenuContent = forwardRef29(({ className, ...props }, ref) => /* @__PURE__ */ jsx32(
  RadixNavigationMenu.Content,
  {
    ref,
    className: cn(
      "left-0 top-0 w-full p-4 md:absolute md:w-auto",
      "transition-opacity duration-200 ease-out",
      "data-[motion=from-start]:opacity-0 data-[motion=from-end]:opacity-0",
      "data-[motion=to-start]:opacity-0 data-[motion=to-end]:opacity-0",
      className
    ),
    ...props
  }
));
NavigationMenuContent.displayName = "NavigationMenuContent";
var NavigationMenuLink = forwardRef29(({ className, ...props }, ref) => /* @__PURE__ */ jsx32(
  RadixNavigationMenu.Link,
  {
    ref,
    className: cn(
      "block select-none rounded-md p-3 text-sm leading-none no-underline outline-none transition-colors",
      "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
      "data-[active=true]:bg-accent data-[active=true]:text-accent-foreground",
      className
    ),
    ...props
  }
));
NavigationMenuLink.displayName = "NavigationMenuLink";
var NavigationMenuIndicator = forwardRef29(({ className, ...props }, ref) => /* @__PURE__ */ jsx32(
  RadixNavigationMenu.Indicator,
  {
    ref,
    className: cn(
      "top-full z-10 flex h-2 items-end justify-center overflow-hidden",
      "transition-opacity duration-200 data-[state=hidden]:opacity-0 data-[state=visible]:opacity-100",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsx32("div", { className: "relative top-1 size-2 rotate-45 rounded-tl-sm border-l border-t border-border bg-popover" })
  }
));
NavigationMenuIndicator.displayName = "NavigationMenuIndicator";
var NavigationMenuViewport = forwardRef29(({ className, ...props }, ref) => /* @__PURE__ */ jsx32("div", { className: "absolute left-0 top-full flex justify-center", children: /* @__PURE__ */ jsx32(
  RadixNavigationMenu.Viewport,
  {
    ref,
    className: cn(
      "relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full origin-top-center overflow-hidden rounded-md border border-border bg-popover text-popover-foreground shadow-lg md:w-[var(--radix-navigation-menu-viewport-width)]",
      "transition-all duration-200 ease-out",
      "data-[state=closed]:scale-95 data-[state=closed]:opacity-0",
      "data-[state=open]:scale-100 data-[state=open]:opacity-100",
      className
    ),
    ...props
  }
) }));
NavigationMenuViewport.displayName = "NavigationMenuViewport";

// components/v2/PieChart/PieChart.tsx
import { forwardRef as forwardRef30 } from "react";
import {
  Cell,
  Label as Label5,
  LabelList,
  Pie,
  PieChart as RechartsPieChart
} from "recharts";
import { jsx as jsx33, jsxs as jsxs18 } from "react/jsx-runtime";
var PieChart = forwardRef30(
  ({
    data,
    config,
    title,
    description,
    footer,
    innerRadius = 60,
    outerRadius,
    showLegend = false,
    showTooltip = true,
    showLabels = false,
    centerValue,
    centerLabel,
    className,
    ...props
  }, ref) => {
    const isDonut = innerRadius > 0;
    const renderCenterText = isDonut && centerValue != null;
    return /* @__PURE__ */ jsxs18(Card, { ref, className: cn("flex flex-col", className), ...props, children: [
      (title != null || description != null) && /* @__PURE__ */ jsxs18(CardHeader, { className: "items-center pb-0 text-center", children: [
        title != null && /* @__PURE__ */ jsx33(CardTitle, { children: title }),
        description != null && /* @__PURE__ */ jsx33(CardDescription, { children: description })
      ] }),
      /* @__PURE__ */ jsx33(CardContent, { className: "flex-1 pb-0", children: /* @__PURE__ */ jsx33(
        ChartContainer,
        {
          config,
          className: "mx-auto aspect-square max-h-64",
          children: /* @__PURE__ */ jsxs18(RechartsPieChart, { children: [
            showTooltip && /* @__PURE__ */ jsx33(
              ChartTooltip,
              {
                cursor: false,
                content: /* @__PURE__ */ jsx33(ChartTooltipContent, { config, hideLabel: isDonut })
              }
            ),
            /* @__PURE__ */ jsxs18(
              Pie,
              {
                data,
                dataKey: "value",
                nameKey: "name",
                innerRadius,
                outerRadius,
                strokeWidth: 5,
                stroke: "var(--color-background)",
                children: [
                  data.map((datum) => /* @__PURE__ */ jsx33(Cell, { fill: `var(--color-${datum.name})` }, datum.name)),
                  showLabels && /* @__PURE__ */ jsx33(
                    LabelList,
                    {
                      dataKey: "name",
                      className: "fill-background",
                      stroke: "none",
                      fontSize: 12,
                      formatter: (value) => {
                        const key = String(value ?? "");
                        return config[key]?.label ?? key;
                      }
                    }
                  ),
                  renderCenterText && /* @__PURE__ */ jsx33(
                    Label5,
                    {
                      content: ({ viewBox }) => {
                        if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                          return /* @__PURE__ */ jsxs18(
                            "text",
                            {
                              x: viewBox.cx,
                              y: viewBox.cy,
                              textAnchor: "middle",
                              dominantBaseline: "middle",
                              children: [
                                /* @__PURE__ */ jsx33(
                                  "tspan",
                                  {
                                    x: viewBox.cx,
                                    y: viewBox.cy,
                                    className: "fill-foreground text-3xl font-bold",
                                    children: String(centerValue)
                                  }
                                ),
                                centerLabel != null && /* @__PURE__ */ jsx33(
                                  "tspan",
                                  {
                                    x: viewBox.cx,
                                    y: (viewBox.cy ?? 0) + 24,
                                    className: "fill-muted-foreground text-sm",
                                    children: String(centerLabel)
                                  }
                                )
                              ]
                            }
                          );
                        }
                        return null;
                      }
                    }
                  )
                ]
              }
            ),
            showLegend && /* @__PURE__ */ jsx33(
              ChartLegend,
              {
                verticalAlign: "bottom",
                content: /* @__PURE__ */ jsx33(ChartLegendContent, { nameKey: "name", config })
              }
            )
          ] })
        }
      ) }),
      footer != null && /* @__PURE__ */ jsx33(CardFooter, { className: "flex-col gap-2 pt-4 text-sm", children: footer })
    ] });
  }
);
PieChart.displayName = "PieChart";

// components/v2/Progress/Progress.tsx
import { forwardRef as forwardRef31 } from "react";
import * as RadixProgress from "@radix-ui/react-progress";
import { jsx as jsx34 } from "react/jsx-runtime";
var Progress = forwardRef31(({ className, value, max = 100, ...props }, ref) => {
  const pct = value == null ? 0 : Math.min(Math.max(value, 0), max) / max * 100;
  return /* @__PURE__ */ jsx34(
    RadixProgress.Root,
    {
      ref,
      value,
      max,
      className: cn(
        "relative h-2 w-full overflow-hidden rounded-full bg-secondary",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsx34(
        RadixProgress.Indicator,
        {
          className: "size-full flex-1 rounded-full bg-primary transition-transform duration-300 ease-out",
          style: { transform: `translateX(-${100 - pct}%)` }
        }
      )
    }
  );
});
Progress.displayName = "Progress";

// components/v2/ProductCard/ProductCard.tsx
import { forwardRef as forwardRef32 } from "react";

// components/v2/ProductCard/product-card-variants.ts
import { cva as cva7 } from "class-variance-authority";
var productCardVariants = cva7(
  "group overflow-hidden",
  {
    variants: {
      orientation: {
        vertical: "flex flex-col",
        horizontal: "flex flex-row"
      }
    },
    defaultVariants: {
      orientation: "vertical"
    }
  }
);
var productCardMediaVariants = cva7("relative overflow-hidden bg-muted", {
  variants: {
    orientation: {
      vertical: "w-full",
      horizontal: "w-40 shrink-0 self-stretch"
    }
  },
  defaultVariants: {
    orientation: "vertical"
  }
});

// components/v2/ProductCard/ProductCard.tsx
import { jsx as jsx35, jsxs as jsxs19 } from "react/jsx-runtime";
var ProductCard = forwardRef32(
  ({ className, orientation, ...props }, ref) => /* @__PURE__ */ jsx35(
    Card,
    {
      ref,
      className: cn(productCardVariants({ orientation }), className),
      ...props
    }
  )
);
ProductCard.displayName = "ProductCard";
var ProductCardMedia = forwardRef32(
  ({ className, orientation, src, alt = "", ratio = 4 / 3, imgProps, children, ...props }, ref) => {
    const image = src ? /* @__PURE__ */ jsx35(
      "img",
      {
        src,
        alt,
        ...imgProps,
        className: cn(
          "size-full object-cover transition-transform duration-300 ease-out group-hover:scale-105",
          imgProps?.className
        )
      }
    ) : null;
    return /* @__PURE__ */ jsxs19(
      "div",
      {
        ref,
        className: cn(productCardMediaVariants({ orientation }), className),
        ...props,
        children: [
          orientation === "horizontal" ? /* @__PURE__ */ jsx35("div", { className: "size-full", children: image }) : /* @__PURE__ */ jsx35(AspectRatio, { ratio, children: image }),
          children != null && /* @__PURE__ */ jsx35("div", { className: "absolute left-3 top-3 z-10", children })
        ]
      }
    );
  }
);
ProductCardMedia.displayName = "ProductCardMedia";
var ProductCardBody = forwardRef32(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx35(
    "div",
    {
      ref,
      className: cn("flex flex-1 flex-col gap-1.5 p-4", className),
      ...props
    }
  )
);
ProductCardBody.displayName = "ProductCardBody";
var ProductCardTitle = forwardRef32(({ className, ...props }, ref) => /* @__PURE__ */ jsx35(
  "h3",
  {
    ref,
    className: cn(
      "font-semibold leading-tight tracking-tight text-card-foreground",
      className
    ),
    ...props
  }
));
ProductCardTitle.displayName = "ProductCardTitle";
var ProductCardDescription = forwardRef32(({ className, ...props }, ref) => /* @__PURE__ */ jsx35(
  "p",
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
ProductCardDescription.displayName = "ProductCardDescription";
var ProductCardPrice = forwardRef32(({ className, price, originalPrice, ...props }, ref) => /* @__PURE__ */ jsxs19(
  "div",
  {
    ref,
    className: cn("mt-1 flex items-baseline gap-2", className),
    ...props,
    children: [
      /* @__PURE__ */ jsx35("span", { className: "text-lg font-bold text-card-foreground", children: price }),
      originalPrice != null && /* @__PURE__ */ jsx35("span", { className: "text-sm text-muted-foreground line-through", children: originalPrice })
    ]
  }
));
ProductCardPrice.displayName = "ProductCardPrice";
var ProductCardFooter = forwardRef32(({ className, ...props }, ref) => /* @__PURE__ */ jsx35(
  "div",
  {
    ref,
    className: cn("flex items-center gap-2 p-4 pt-0", className),
    ...props
  }
));
ProductCardFooter.displayName = "ProductCardFooter";

// components/v2/Resizable/Resizable.tsx
import { GripVertical } from "lucide-react";
import { Group as Group4, Panel, Separator as Separator4 } from "react-resizable-panels";
import { jsx as jsx36 } from "react/jsx-runtime";
var ResizablePanelGroup = ({
  className,
  orientation = "horizontal",
  ...props
}) => /* @__PURE__ */ jsx36(
  Group4,
  {
    orientation,
    className: cn("flex size-full", className),
    ...props
  }
);
ResizablePanelGroup.displayName = "ResizablePanelGroup";
var ResizablePanel = (props) => /* @__PURE__ */ jsx36(Panel, { ...props });
ResizablePanel.displayName = "ResizablePanel";
var ResizableHandle = ({
  className,
  orientation = "horizontal",
  withHandle = false,
  ...props
}) => /* @__PURE__ */ jsx36(
  Separator4,
  {
    className: cn(
      "relative flex items-center justify-center bg-border",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background",
      // horizontal group → a thin vertical divider
      orientation === "horizontal" && "w-px",
      // vertical group → a thin horizontal divider
      orientation === "vertical" && "h-px w-full",
      className
    ),
    ...props,
    children: withHandle && /* @__PURE__ */ jsx36(
      "div",
      {
        className: cn(
          "z-10 flex items-center justify-center rounded-sm border border-border bg-border",
          orientation === "horizontal" ? "h-4 w-3" : "h-3 w-4 rotate-90"
        ),
        children: /* @__PURE__ */ jsx36(GripVertical, { className: "size-2.5 text-muted-foreground", "aria-hidden": true })
      }
    )
  }
);
ResizableHandle.displayName = "ResizableHandle";

// components/v2/ScrollArea/ScrollArea.tsx
import { forwardRef as forwardRef33 } from "react";
import * as RadixScrollArea from "@radix-ui/react-scroll-area";
import { jsx as jsx37, jsxs as jsxs20 } from "react/jsx-runtime";
var ScrollArea = forwardRef33(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs20(
  RadixScrollArea.Root,
  {
    ref,
    className: cn("relative overflow-hidden", className),
    ...props,
    children: [
      /* @__PURE__ */ jsx37(RadixScrollArea.Viewport, { className: "size-full rounded-[inherit] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", children }),
      /* @__PURE__ */ jsx37(ScrollBar, {}),
      /* @__PURE__ */ jsx37(RadixScrollArea.Corner, {})
    ]
  }
));
ScrollArea.displayName = "ScrollArea";
var ScrollBar = forwardRef33(({ className, orientation = "vertical", ...props }, ref) => /* @__PURE__ */ jsx37(
  RadixScrollArea.ScrollAreaScrollbar,
  {
    ref,
    orientation,
    className: cn(
      "flex touch-none select-none transition-colors",
      orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent p-px",
      orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent p-px",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsx37(RadixScrollArea.ScrollAreaThumb, { className: "relative flex-1 rounded-full bg-border" })
  }
));
ScrollBar.displayName = "ScrollBar";

// components/v2/Select/Select.tsx
import { forwardRef as forwardRef34 } from "react";
import * as RadixSelect from "@radix-ui/react-select";
import { Check as Check6, ChevronDown as ChevronDown3, ChevronUp } from "lucide-react";
import { jsx as jsx38, jsxs as jsxs21 } from "react/jsx-runtime";
var Select = RadixSelect.Root;
var SelectGroup = RadixSelect.Group;
var SelectValue = RadixSelect.Value;
var SelectTrigger = forwardRef34(
  ({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs21(
    RadixSelect.Trigger,
    {
      ref,
      className: cn(
        "flex h-10 w-full items-center justify-between gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground",
        "shadow-xs transition-colors duration-150 ease-out",
        "placeholder:text-muted-foreground data-[placeholder]:text-muted-foreground",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "aria-[invalid=true]:border-destructive aria-[invalid=true]:focus-visible:ring-destructive",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "[&>span]:line-clamp-1",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsx38(RadixSelect.Icon, { asChild: true, children: /* @__PURE__ */ jsx38(ChevronDown3, { className: "size-4 shrink-0 text-muted-foreground", "aria-hidden": true }) })
      ]
    }
  )
);
SelectTrigger.displayName = "SelectTrigger";
var SelectScrollUpButton = forwardRef34(({ className, ...props }, ref) => /* @__PURE__ */ jsx38(
  RadixSelect.ScrollUpButton,
  {
    ref,
    className: cn(
      "flex cursor-default items-center justify-center py-1 text-muted-foreground",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsx38(ChevronUp, { className: "size-4", "aria-hidden": true })
  }
));
SelectScrollUpButton.displayName = "SelectScrollUpButton";
var SelectScrollDownButton = forwardRef34(({ className, ...props }, ref) => /* @__PURE__ */ jsx38(
  RadixSelect.ScrollDownButton,
  {
    ref,
    className: cn(
      "flex cursor-default items-center justify-center py-1 text-muted-foreground",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsx38(ChevronDown3, { className: "size-4", "aria-hidden": true })
  }
));
SelectScrollDownButton.displayName = "SelectScrollDownButton";
var SelectContent = forwardRef34(
  ({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ jsx38(RadixSelect.Portal, { children: /* @__PURE__ */ jsxs21(
    RadixSelect.Content,
    {
      ref,
      position,
      className: cn(
        "relative z-50 max-h-96 min-w-32 overflow-hidden rounded-md border border-border bg-popover text-popover-foreground shadow-md",
        "origin-[var(--radix-select-content-transform-origin)]",
        "transition-all duration-150 ease-out",
        "data-[state=closed]:scale-95 data-[state=closed]:opacity-0",
        "data-[state=open]:scale-100 data-[state=open]:opacity-100",
        position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=top]:-translate-y-1",
        className
      ),
      ...props,
      children: [
        /* @__PURE__ */ jsx38(SelectScrollUpButton, {}),
        /* @__PURE__ */ jsx38(
          RadixSelect.Viewport,
          {
            className: cn(
              "p-1",
              position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
            ),
            children
          }
        ),
        /* @__PURE__ */ jsx38(SelectScrollDownButton, {})
      ]
    }
  ) })
);
SelectContent.displayName = "SelectContent";
var SelectLabel = forwardRef34(
  ({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx38(
    RadixSelect.Label,
    {
      ref,
      className: cn(
        "px-2 py-1.5 text-xs font-semibold text-muted-foreground",
        inset && "ps-8",
        className
      ),
      ...props
    }
  )
);
SelectLabel.displayName = "SelectLabel";
var SelectItem = forwardRef34(
  ({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs21(
    RadixSelect.Item,
    {
      ref,
      className: cn(
        "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pe-2 ps-8 text-sm outline-none",
        "transition-colors focus:bg-accent focus:text-accent-foreground",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      ),
      ...props,
      children: [
        /* @__PURE__ */ jsx38("span", { className: "absolute start-2 flex size-3.5 items-center justify-center", children: /* @__PURE__ */ jsx38(RadixSelect.ItemIndicator, { children: /* @__PURE__ */ jsx38(Check6, { className: "size-4", "aria-hidden": true }) }) }),
        /* @__PURE__ */ jsx38(RadixSelect.ItemText, { children })
      ]
    }
  )
);
SelectItem.displayName = "SelectItem";
var SelectSeparator = forwardRef34(({ className, ...props }, ref) => /* @__PURE__ */ jsx38(
  RadixSelect.Separator,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-border", className),
    ...props
  }
));
SelectSeparator.displayName = "SelectSeparator";

// components/v2/Separator/Separator.tsx
import { forwardRef as forwardRef35 } from "react";
import * as RadixSeparator from "@radix-ui/react-separator";
import { jsx as jsx39 } from "react/jsx-runtime";
var Separator6 = forwardRef35(
  ({ className, orientation = "horizontal", decorative = true, ...props }, ref) => /* @__PURE__ */ jsx39(
    RadixSeparator.Root,
    {
      ref,
      orientation,
      decorative,
      className: cn(
        "shrink-0 bg-border",
        orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
        className
      ),
      ...props
    }
  )
);
Separator6.displayName = "Separator";

// components/v2/Sheet/Sheet.tsx
import { forwardRef as forwardRef36 } from "react";
import * as RadixDialog2 from "@radix-ui/react-dialog";
import { X as X2 } from "lucide-react";

// components/v2/Sheet/sheet-variants.ts
import { cva as cva8 } from "class-variance-authority";
var sheetVariants = cva8(
  [
    "fixed z-50 flex flex-col gap-4 bg-background p-6 shadow-lg",
    "transition-transform duration-300 ease-out"
  ].join(" "),
  {
    variants: {
      side: {
        top: [
          "inset-x-0 top-0 border-b border-border",
          "data-[state=closed]:-translate-y-full data-[state=open]:translate-y-0"
        ].join(" "),
        bottom: [
          "inset-x-0 bottom-0 border-t border-border",
          "data-[state=closed]:translate-y-full data-[state=open]:translate-y-0"
        ].join(" "),
        left: [
          "inset-y-0 left-0 h-full w-3/4 border-r border-border sm:max-w-sm",
          "data-[state=closed]:-translate-x-full data-[state=open]:translate-x-0"
        ].join(" "),
        right: [
          "inset-y-0 right-0 h-full w-3/4 border-l border-border sm:max-w-sm",
          "data-[state=closed]:translate-x-full data-[state=open]:translate-x-0"
        ].join(" ")
      }
    },
    defaultVariants: {
      side: "right"
    }
  }
);

// components/v2/Sheet/Sheet.tsx
import { jsx as jsx40, jsxs as jsxs22 } from "react/jsx-runtime";
var Sheet = RadixDialog2.Root;
var SheetTrigger = RadixDialog2.Trigger;
var SheetClose = RadixDialog2.Close;
var SheetPortal = RadixDialog2.Portal;
var SheetOverlay = forwardRef36(({ className, ...props }, ref) => /* @__PURE__ */ jsx40(
  RadixDialog2.Overlay,
  {
    ref,
    className: cn(
      "fixed inset-0 z-50 bg-foreground/50 backdrop-blur-sm",
      "transition-opacity duration-200 ease-out",
      "data-[state=closed]:opacity-0 data-[state=open]:opacity-100",
      className
    ),
    ...props
  }
));
SheetOverlay.displayName = "SheetOverlay";
var SheetContent = forwardRef36(({ side, className, children, showClose = true, i18nStrings, ...props }, ref) => {
  const t = useComponentI18n("dialog", i18nStrings);
  return /* @__PURE__ */ jsxs22(SheetPortal, { children: [
    /* @__PURE__ */ jsx40(SheetOverlay, {}),
    /* @__PURE__ */ jsxs22(
      RadixDialog2.Content,
      {
        ref,
        className: cn(sheetVariants({ side }), "focus-visible:outline-none", className),
        ...props,
        children: [
          children,
          showClose && /* @__PURE__ */ jsx40(
            RadixDialog2.Close,
            {
              className: cn(
                "absolute end-4 top-4 rounded-sm text-muted-foreground opacity-70",
                "transition-opacity hover:opacity-100",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                "disabled:pointer-events-none"
              ),
              "aria-label": t.closeLabel,
              children: /* @__PURE__ */ jsx40(X2, { className: "size-4" })
            }
          )
        ]
      }
    )
  ] });
});
SheetContent.displayName = "SheetContent";
var SheetHeader = ({ className, ...props }) => /* @__PURE__ */ jsx40(
  "div",
  {
    className: cn("flex flex-col gap-1.5 text-center sm:text-start", className),
    ...props
  }
);
SheetHeader.displayName = "SheetHeader";
var SheetFooter = ({ className, ...props }) => /* @__PURE__ */ jsx40(
  "div",
  {
    className: cn(
      "mt-auto flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
      className
    ),
    ...props
  }
);
SheetFooter.displayName = "SheetFooter";
var SheetTitle = forwardRef36(({ className, ...props }, ref) => /* @__PURE__ */ jsx40(
  RadixDialog2.Title,
  {
    ref,
    className: cn("text-lg font-semibold text-foreground", className),
    ...props
  }
));
SheetTitle.displayName = "SheetTitle";
var SheetDescription = forwardRef36(({ className, ...props }, ref) => /* @__PURE__ */ jsx40(
  RadixDialog2.Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
SheetDescription.displayName = "SheetDescription";

// components/v2/Sidebar/Sidebar.tsx
import {
  createContext as createContext4,
  forwardRef as forwardRef38,
  useCallback as useCallback2,
  useContext as useContext5,
  useEffect as useEffect2,
  useMemo as useMemo3,
  useState as useState5
} from "react";
import { Slot as Slot5 } from "@radix-ui/react-slot";
import { PanelLeft } from "lucide-react";

// components/v2/Tooltip/Tooltip.tsx
import { forwardRef as forwardRef37 } from "react";
import * as RadixTooltip from "@radix-ui/react-tooltip";
import { jsx as jsx41 } from "react/jsx-runtime";
var TooltipProvider = RadixTooltip.Provider;
var Tooltip2 = RadixTooltip.Root;
var TooltipTrigger = RadixTooltip.Trigger;
var TooltipContent = forwardRef37(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx41(RadixTooltip.Portal, { children: /* @__PURE__ */ jsx41(
  RadixTooltip.Content,
  {
    ref,
    sideOffset,
    className: cn(
      "z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground shadow-md",
      "origin-[var(--radix-tooltip-content-transform-origin)]",
      "transition-all duration-150 ease-out",
      "data-[state=delayed-open]:scale-100 data-[state=delayed-open]:opacity-100",
      "data-[state=instant-open]:scale-100 data-[state=instant-open]:opacity-100",
      "data-[state=closed]:scale-95 data-[state=closed]:opacity-0",
      className
    ),
    ...props
  }
) }));
TooltipContent.displayName = "TooltipContent";

// components/v2/Sidebar/sidebar-variants.ts
import { cva as cva9 } from "class-variance-authority";
var sidebarMenuButtonVariants = cva9(
  [
    "peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-start text-sm outline-none",
    "text-ext-sidebar-foreground",
    "transition-colors",
    "hover:bg-ext-sidebar-accent hover:text-ext-sidebar-accent-foreground",
    "focus-visible:ring-2 focus-visible:ring-ext-sidebar-ring",
    "active:bg-ext-sidebar-accent active:text-ext-sidebar-accent-foreground",
    "disabled:pointer-events-none disabled:opacity-50",
    "data-[active=true]:bg-ext-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-ext-sidebar-accent-foreground",
    // icon-collapsed: the root carries data-[collapsible=icon]; squeeze to a
    // square. `!` so it beats any size-variant h-* (e.g. lg's h-12) — matches
    // ShadCN, which forces the collapse with important too.
    "group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-2 group-data-[collapsible=icon]:justify-center",
    "[&>span:last-child]:truncate",
    // icon-collapsed: hide the trailing label entirely (not just truncate) so
    // the gap collapses and the lone icon centers in the square.
    "group-data-[collapsible=icon]:[&>span:last-child]:hidden",
    "[&>svg]:size-4 [&>svg]:shrink-0"
  ].join(" "),
  {
    variants: {
      variant: {
        default: "",
        outline: "border border-ext-sidebar-border bg-ext-sidebar-bg shadow-sm"
      },
      size: {
        sm: "h-7 text-xs",
        md: "h-8 text-sm",
        lg: "h-12 text-sm"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
);

// components/v2/Sidebar/Sidebar.tsx
import { jsx as jsx42, jsxs as jsxs23 } from "react/jsx-runtime";
var MOBILE_BREAKPOINT = 768;
var SidebarContext = createContext4(null);
function useSidebar() {
  const context = useContext5(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a <SidebarProvider>.");
  }
  return context;
}
function useIsMobile() {
  const [isMobile, setIsMobile] = useState5(false);
  useEffect2(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => setIsMobile(mql.matches);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);
  return isMobile;
}
var SidebarProvider = forwardRef38(
  ({
    defaultOpen = true,
    open: openProp,
    onOpenChange,
    className,
    children,
    ...props
  }, ref) => {
    const isMobile = useIsMobile();
    const [openMobile, setOpenMobile] = useState5(false);
    const [internalOpen, setInternalOpen] = useState5(defaultOpen);
    const open = openProp ?? internalOpen;
    const setOpen = useCallback2(
      (value) => {
        if (onOpenChange) onOpenChange(value);
        else setInternalOpen(value);
      },
      [onOpenChange]
    );
    const toggleSidebar = useCallback2(() => {
      if (isMobile) setOpenMobile((v) => !v);
      else setOpen(!open);
    }, [isMobile, open, setOpen]);
    const state = open ? "expanded" : "collapsed";
    const contextValue = useMemo3(
      () => ({
        state,
        open,
        setOpen,
        openMobile,
        setOpenMobile,
        isMobile,
        toggleSidebar
      }),
      [state, open, setOpen, openMobile, isMobile, toggleSidebar]
    );
    return /* @__PURE__ */ jsx42(SidebarContext.Provider, { value: contextValue, children: /* @__PURE__ */ jsx42(
      "div",
      {
        ref,
        "data-slot": "sidebar-wrapper",
        className: cn(
          "flex min-h-svh w-full text-ext-sidebar-foreground",
          className
        ),
        ...props,
        children
      }
    ) });
  }
);
SidebarProvider.displayName = "SidebarProvider";
var Sidebar = forwardRef38(
  ({
    side = "left",
    variant = "sidebar",
    collapsible = "icon",
    className,
    children,
    ...props
  }, ref) => {
    const { isMobile, state, openMobile, setOpenMobile } = useSidebar();
    if (collapsible === "none") {
      return /* @__PURE__ */ jsx42(
        "div",
        {
          ref,
          "data-slot": "sidebar",
          className: cn(
            "flex h-full w-64 flex-col border-ext-sidebar-border bg-ext-sidebar-bg",
            side === "left" ? "border-r" : "border-l",
            className
          ),
          ...props,
          children
        }
      );
    }
    if (isMobile) {
      return /* @__PURE__ */ jsx42(Sheet, { open: openMobile, onOpenChange: setOpenMobile, children: /* @__PURE__ */ jsxs23(
        SheetContent,
        {
          side,
          showClose: false,
          "data-slot": "sidebar",
          "data-sidebar": "sidebar",
          "data-mobile": "true",
          className: "w-72 gap-0 border-ext-sidebar-border bg-ext-sidebar-bg p-0 text-ext-sidebar-foreground sm:max-w-72",
          children: [
            /* @__PURE__ */ jsxs23(SheetHeader, { className: "sr-only", children: [
              /* @__PURE__ */ jsx42(SheetTitle, { children: "Sidebar" }),
              /* @__PURE__ */ jsx42(SheetDescription, { children: "Application navigation." })
            ] }),
            /* @__PURE__ */ jsx42("div", { className: "flex h-full w-full flex-col", children })
          ]
        }
      ) });
    }
    return /* @__PURE__ */ jsxs23(
      "div",
      {
        ref,
        className: "group peer hidden md:block",
        "data-slot": "sidebar",
        "data-state": state,
        "data-collapsible": state === "collapsed" ? collapsible : "",
        "data-variant": variant,
        "data-side": side,
        children: [
          /* @__PURE__ */ jsx42(
            "div",
            {
              className: cn(
                "relative h-svh w-64 bg-transparent transition-[width] duration-200 ease-linear",
                "group-data-[collapsible=offcanvas]:w-0",
                variant === "sidebar" ? "group-data-[collapsible=icon]:w-12" : "group-data-[collapsible=icon]:w-16"
              )
            }
          ),
          /* @__PURE__ */ jsx42(
            "div",
            {
              className: cn(
                "fixed inset-y-0 z-10 hidden h-svh w-64 transition-[left,right,width] duration-200 ease-linear md:flex",
                side === "left" ? "left-0 group-data-[collapsible=offcanvas]:-left-64" : "right-0 group-data-[collapsible=offcanvas]:-right-64",
                variant === "floating" || variant === "inset" ? "p-2 group-data-[collapsible=icon]:w-16" : "group-data-[collapsible=icon]:w-12",
                className
              ),
              ...props,
              children: /* @__PURE__ */ jsx42(
                "div",
                {
                  "data-sidebar": "sidebar",
                  className: cn(
                    "flex h-full w-full flex-col bg-ext-sidebar-bg text-ext-sidebar-foreground",
                    variant === "floating" ? "rounded-lg border border-ext-sidebar-border shadow-sm" : variant === "inset" ? "rounded-lg" : side === "left" ? "border-r border-ext-sidebar-border" : "border-l border-ext-sidebar-border"
                  ),
                  children
                }
              )
            }
          )
        ]
      }
    );
  }
);
Sidebar.displayName = "Sidebar";
var SidebarTrigger = forwardRef38(({ className, onClick, ...props }, ref) => {
  const { toggleSidebar } = useSidebar();
  return /* @__PURE__ */ jsx42(
    "button",
    {
      ref,
      type: "button",
      "data-slot": "sidebar-trigger",
      "aria-label": "Toggle sidebar",
      onClick: (event) => {
        onClick?.(event);
        toggleSidebar();
      },
      className: cn(
        "inline-flex size-8 items-center justify-center rounded-md text-ext-sidebar-foreground",
        "transition-colors hover:bg-ext-sidebar-accent hover:text-ext-sidebar-accent-foreground",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ext-sidebar-ring",
        "[&>svg]:size-4",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsx42(PanelLeft, {})
    }
  );
});
SidebarTrigger.displayName = "SidebarTrigger";
var SidebarRail = forwardRef38(
  ({ className, ...props }, ref) => {
    const { toggleSidebar } = useSidebar();
    return /* @__PURE__ */ jsx42(
      "button",
      {
        ref,
        type: "button",
        "data-slot": "sidebar-rail",
        "aria-label": "Toggle sidebar",
        tabIndex: -1,
        onClick: toggleSidebar,
        title: "Toggle sidebar",
        className: cn(
          "absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all md:flex",
          "after:absolute after:inset-y-0 after:left-1/2 after:w-0.5 hover:after:bg-ext-sidebar-border",
          "group-data-[side=left]:-right-4 group-data-[side=right]:left-0",
          className
        ),
        ...props
      }
    );
  }
);
SidebarRail.displayName = "SidebarRail";
var SidebarInset = forwardRef38(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx42(
    "main",
    {
      ref,
      "data-slot": "sidebar-inset",
      className: cn(
        "relative flex min-h-svh flex-1 flex-col bg-background",
        className
      ),
      ...props
    }
  )
);
SidebarInset.displayName = "SidebarInset";
var SidebarHeader = forwardRef38(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx42(
    "div",
    {
      ref,
      "data-slot": "sidebar-header",
      className: cn("flex flex-col gap-2 p-2", className),
      ...props
    }
  )
);
SidebarHeader.displayName = "SidebarHeader";
var SidebarFooter = forwardRef38(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx42(
    "div",
    {
      ref,
      "data-slot": "sidebar-footer",
      className: cn("flex flex-col gap-2 p-2", className),
      ...props
    }
  )
);
SidebarFooter.displayName = "SidebarFooter";
var SidebarContent = forwardRef38(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx42(
    "div",
    {
      ref,
      "data-slot": "sidebar-content",
      className: cn(
        "flex min-h-0 flex-1 flex-col gap-2 overflow-auto p-2",
        "group-data-[collapsible=icon]:overflow-hidden",
        className
      ),
      ...props
    }
  )
);
SidebarContent.displayName = "SidebarContent";
var SidebarSeparator = forwardRef38(({ className, ...props }, ref) => /* @__PURE__ */ jsx42(
  "div",
  {
    ref,
    "data-slot": "sidebar-separator",
    role: "separator",
    "aria-orientation": "horizontal",
    className: cn("mx-2 h-px shrink-0 bg-ext-sidebar-border", className),
    ...props
  }
));
SidebarSeparator.displayName = "SidebarSeparator";
var SidebarGroup = forwardRef38(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx42(
    "div",
    {
      ref,
      "data-slot": "sidebar-group",
      className: cn(
        // Vertical padding only — horizontal gutter comes from SidebarContent's
        // p-2, so the group label + menu items share ONE left inset with the
        // header (which is also p-2). Adding px here would double the gutter and
        // push menu icons out of vertical alignment with the header icon.
        "relative flex w-full min-w-0 flex-col py-2",
        className
      ),
      ...props
    }
  )
);
SidebarGroup.displayName = "SidebarGroup";
var SidebarGroupLabel = forwardRef38(({ className, ...props }, ref) => /* @__PURE__ */ jsx42(
  "div",
  {
    ref,
    "data-slot": "sidebar-group-label",
    className: cn(
      "flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-muted-foreground outline-none",
      "transition-[margin,opacity] duration-200 ease-linear",
      "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0",
      className
    ),
    ...props
  }
));
SidebarGroupLabel.displayName = "SidebarGroupLabel";
var SidebarGroupContent = forwardRef38(({ className, ...props }, ref) => /* @__PURE__ */ jsx42(
  "div",
  {
    ref,
    "data-slot": "sidebar-group-content",
    className: cn("w-full text-sm", className),
    ...props
  }
));
SidebarGroupContent.displayName = "SidebarGroupContent";
var SidebarMenu = forwardRef38(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx42(
    "ul",
    {
      ref,
      "data-slot": "sidebar-menu",
      className: cn("flex w-full min-w-0 flex-col gap-1", className),
      ...props
    }
  )
);
SidebarMenu.displayName = "SidebarMenu";
var SidebarMenuItem = forwardRef38(({ className, ...props }, ref) => /* @__PURE__ */ jsx42(
  "li",
  {
    ref,
    "data-slot": "sidebar-menu-item",
    className: cn("group/menu-item relative", className),
    ...props
  }
));
SidebarMenuItem.displayName = "SidebarMenuItem";
var SidebarMenuButton = forwardRef38(
  ({
    asChild = false,
    isActive = false,
    variant,
    size,
    tooltip,
    className,
    ...props
  }, ref) => {
    const { isMobile, state } = useSidebar();
    const Comp = asChild ? Slot5 : "button";
    const button = /* @__PURE__ */ jsx42(
      Comp,
      {
        ref,
        "data-slot": "sidebar-menu-button",
        "data-active": isActive,
        className: cn(sidebarMenuButtonVariants({ variant, size }), className),
        ...props
      }
    );
    if (!tooltip) return button;
    return /* @__PURE__ */ jsxs23(Tooltip2, { children: [
      /* @__PURE__ */ jsx42(TooltipTrigger, { asChild: true, children: button }),
      /* @__PURE__ */ jsx42(
        TooltipContent,
        {
          side: "right",
          align: "center",
          hidden: state !== "collapsed" || isMobile,
          children: tooltip
        }
      )
    ] });
  }
);
SidebarMenuButton.displayName = "SidebarMenuButton";
var SidebarMenuSub = forwardRef38(({ className, ...props }, ref) => /* @__PURE__ */ jsx42(
  "ul",
  {
    ref,
    "data-slot": "sidebar-menu-sub",
    className: cn(
      "mx-3 flex min-w-0 flex-col gap-1 border-l border-ext-sidebar-border px-2 py-0.5",
      "group-data-[collapsible=icon]:hidden",
      className
    ),
    ...props
  }
));
SidebarMenuSub.displayName = "SidebarMenuSub";
var SidebarMenuSubButton = forwardRef38(
  ({ asChild = false, isActive = false, size = "md", className, ...props }, ref) => {
    const Comp = asChild ? Slot5 : "a";
    return /* @__PURE__ */ jsx42(
      Comp,
      {
        ref,
        "data-slot": "sidebar-menu-sub-button",
        "data-active": isActive,
        className: cn(
          "flex h-7 min-w-0 items-center gap-2 overflow-hidden rounded-md px-2 text-ext-sidebar-foreground outline-none",
          "transition-colors hover:bg-ext-sidebar-accent hover:text-ext-sidebar-accent-foreground",
          "focus-visible:ring-2 focus-visible:ring-ext-sidebar-ring",
          "data-[active=true]:bg-ext-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-ext-sidebar-accent-foreground",
          "[&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
          size === "sm" ? "text-xs" : "text-sm",
          "group-data-[collapsible=icon]:hidden",
          className
        ),
        ...props
      }
    );
  }
);
SidebarMenuSubButton.displayName = "SidebarMenuSubButton";

// components/v2/Skeleton/Skeleton.tsx
import { forwardRef as forwardRef39 } from "react";
import { jsx as jsx43 } from "react/jsx-runtime";
var Skeleton = forwardRef39(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx43(
    "div",
    {
      ref,
      className: cn("animate-pulse rounded-md bg-muted", className),
      ...props
    }
  )
);
Skeleton.displayName = "Skeleton";

// components/v2/Sonner/Sonner.tsx
import { Toaster as SonnerToaster, toast } from "sonner";
import { jsx as jsx44 } from "react/jsx-runtime";
var Toaster = ({ ...props }) => /* @__PURE__ */ jsx44(
  SonnerToaster,
  {
    className: "toaster group",
    toastOptions: {
      classNames: {
        toast: "group toast group-[.toaster]:bg-popover group-[.toaster]:text-popover-foreground group-[.toaster]:border group-[.toaster]:border-border group-[.toaster]:rounded-lg group-[.toaster]:shadow-lg",
        description: "group-[.toast]:text-muted-foreground",
        actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground group-[.toast]:rounded-md",
        cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground group-[.toast]:rounded-md",
        closeButton: "group-[.toast]:bg-popover group-[.toast]:text-foreground group-[.toast]:border-border",
        error: "group-[.toaster]:border-destructive group-[.toaster]:text-destructive",
        success: "group-[.toaster]:text-foreground"
      }
    },
    ...props
  }
);
Toaster.displayName = "Toaster";

// components/v2/Switch/Switch.tsx
import { forwardRef as forwardRef40 } from "react";
import * as RadixSwitch from "@radix-ui/react-switch";
import { jsx as jsx45 } from "react/jsx-runtime";
var Switch = forwardRef40(({ className, ...props }, ref) => /* @__PURE__ */ jsx45(
  RadixSwitch.Root,
  {
    ref,
    className: cn(
      "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent",
      "transition-colors",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsx45(
      RadixSwitch.Thumb,
      {
        className: cn(
          "pointer-events-none block size-4 rounded-full bg-background shadow-sm ring-0",
          "transition-transform",
          "data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0"
        )
      }
    )
  }
));
Switch.displayName = "Switch";

// components/v2/Tabs/Tabs.tsx
import { forwardRef as forwardRef41 } from "react";
import * as RadixTabs from "@radix-ui/react-tabs";
import { jsx as jsx46 } from "react/jsx-runtime";
var Tabs = RadixTabs.Root;
var TabsList = forwardRef41(({ className, ...props }, ref) => /* @__PURE__ */ jsx46(
  RadixTabs.List,
  {
    ref,
    className: cn(
      "inline-flex h-10 items-center justify-center gap-1 rounded-md bg-muted p-1 text-muted-foreground",
      className
    ),
    ...props
  }
));
TabsList.displayName = "TabsList";
var TabsTrigger = forwardRef41(({ className, ...props }, ref) => /* @__PURE__ */ jsx46(
  RadixTabs.Trigger,
  {
    ref,
    className: cn(
      "inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium",
      "ring-offset-background transition-all",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      "disabled:pointer-events-none disabled:opacity-50",
      "data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
      "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      className
    ),
    ...props
  }
));
TabsTrigger.displayName = "TabsTrigger";
var TabsContent = forwardRef41(({ className, ...props }, ref) => /* @__PURE__ */ jsx46(
  RadixTabs.Content,
  {
    ref,
    className: cn(
      "mt-2 ring-offset-background",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    ),
    ...props
  }
));
TabsContent.displayName = "TabsContent";

// components/v2/Toggle/Toggle.tsx
import { forwardRef as forwardRef42 } from "react";
import * as RadixToggle from "@radix-ui/react-toggle";

// components/v2/Toggle/toggle-variants.ts
import { cva as cva10 } from "class-variance-authority";
var toggleVariants = cva10(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap shrink-0",
    "rounded-md text-sm font-medium select-none",
    "transition-colors duration-150 ease-out",
    "hover:bg-muted hover:text-muted-foreground",
    "data-[state=on]:bg-accent data-[state=on]:text-accent-foreground",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
  ].join(" "),
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline: "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground"
      },
      size: {
        sm: "h-8 min-w-8 px-2",
        md: "h-10 min-w-10 px-3",
        lg: "h-11 min-w-11 px-5"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
);

// components/v2/Toggle/Toggle.tsx
import { jsx as jsx47 } from "react/jsx-runtime";
var Toggle = forwardRef42(({ className, variant, size, ...props }, ref) => /* @__PURE__ */ jsx47(
  RadixToggle.Root,
  {
    ref,
    className: cn(toggleVariants({ variant, size }), className),
    ...props
  }
));
Toggle.displayName = "Toggle";

// components/v2/ToggleGroup/ToggleGroup.tsx
import { createContext as createContext5, forwardRef as forwardRef43, useContext as useContext6 } from "react";
import * as RadixToggleGroup from "@radix-ui/react-toggle-group";
import { jsx as jsx48 } from "react/jsx-runtime";
var ToggleGroupContext = createContext5({
  variant: "default",
  size: "md"
});
var ToggleGroup = forwardRef43(({ className, variant, size, children, ...props }, ref) => /* @__PURE__ */ jsx48(
  RadixToggleGroup.Root,
  {
    ref,
    className: cn("flex items-center justify-center gap-1", className),
    ...props,
    children: /* @__PURE__ */ jsx48(ToggleGroupContext.Provider, { value: { variant, size }, children })
  }
));
ToggleGroup.displayName = "ToggleGroup";
var ToggleGroupItem = forwardRef43(({ className, variant, size, children, ...props }, ref) => {
  const ctx = useContext6(ToggleGroupContext);
  return /* @__PURE__ */ jsx48(
    RadixToggleGroup.Item,
    {
      ref,
      className: cn(
        toggleVariants({
          variant: variant ?? ctx.variant,
          size: size ?? ctx.size
        }),
        className
      ),
      ...props,
      children
    }
  );
});
ToggleGroupItem.displayName = "ToggleGroupItem";

// components/v2/Typography/Typography.tsx
import { forwardRef as forwardRef44 } from "react";
import { Slot as Slot6 } from "@radix-ui/react-slot";

// components/v2/Typography/typography-variants.ts
import { cva as cva11 } from "class-variance-authority";
var typographyVariants = cva11("text-foreground", {
  variants: {
    variant: {
      h1: "scroll-m-20 text-4xl font-extrabold tracking-tight text-balance",
      h2: "scroll-m-20 text-3xl font-semibold tracking-tight",
      h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
      h4: "scroll-m-20 text-xl font-semibold tracking-tight",
      lead: "text-xl text-muted-foreground",
      body: "text-base leading-normal",
      large: "text-lg font-semibold",
      small: "text-sm font-medium leading-none",
      muted: "text-sm text-muted-foreground",
      blockquote: "border-s-2 border-border ps-6 italic",
      code: "relative rounded bg-muted px-1.5 py-0.5 font-mono text-sm font-semibold"
    }
  },
  defaultVariants: {
    variant: "body"
  }
});

// components/v2/Typography/Typography.tsx
import { jsx as jsx49 } from "react/jsx-runtime";
var variantElement = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  lead: "p",
  body: "p",
  large: "div",
  small: "small",
  muted: "p",
  blockquote: "blockquote",
  code: "code"
};
var Typography = forwardRef44(
  ({ className, variant = "body", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot6 : variantElement[variant ?? "body"];
    return /* @__PURE__ */ jsx49(
      Comp,
      {
        ref,
        className: cn(typographyVariants({ variant }), className),
        ...props
      }
    );
  }
);
Typography.displayName = "Typography";

// components/utils/accessibility/aria-helpers.ts
import React from "react";
function getDisclosureProps(isExpanded, panelId) {
  return [
    { "aria-expanded": isExpanded, "aria-controls": panelId },
    { id: panelId, role: "region" }
  ];
}
function getNavigationItemProps(options) {
  const props = {};
  if (options.isActive) props["aria-current"] = "page";
  if (options.disabled) {
    props["aria-disabled"] = true;
    props.tabIndex = -1;
  }
  return props;
}
function getLiveRegionProps(type) {
  switch (type) {
    case "assertive":
      return { "aria-live": "assertive", "aria-atomic": true, role: "alert" };
    case "status":
      return { "aria-live": "polite", "aria-atomic": true, role: "status" };
    case "polite":
    default:
      return { "aria-live": "polite", "aria-atomic": true };
  }
}
function getLoadingProps(isLoading) {
  return isLoading ? { "aria-busy": true } : {};
}
function getDisabledProps(isDisabled) {
  return isDisabled ? { "aria-disabled": true, disabled: true } : {};
}
function getErrorFieldProps(hasError, errorId) {
  return hasError ? { "aria-invalid": "true", "aria-describedby": errorId } : {};
}
function getIconProps(isDecorative, label) {
  if (isDecorative) {
    return { "aria-hidden": true };
  }
  return { role: "img", "aria-label": label };
}

// components/utils/accessibility/VisuallyHidden.tsx
import { forwardRef as forwardRef45, memo, useMemo as useMemo4 } from "react";
import { jsx as jsx50 } from "react/jsx-runtime";
var BASE_CLASSES = "sr-only";
var VisuallyHidden = memo(
  forwardRef45(
    ({ as = "span", children, className, ...rest }, ref) => {
      const Element = as;
      const classes = useMemo4(
        () => [BASE_CLASSES, className].filter(Boolean).join(" "),
        [className]
      );
      return /* @__PURE__ */ jsx50(Element, { ref, className: classes, ...rest, children });
    }
  )
);
VisuallyHidden.displayName = "VisuallyHidden";

// components/utils/security/sanitize.ts
var UNSAFE_PROTOCOLS = [
  "javascript:",
  "vbscript:",
  "data:text/html"
];
function sanitizeHref(href) {
  if (!href || href.trim() === "") return "#";
  const normalized = href.trim().toLowerCase().replace(/\s/g, "");
  for (const protocol of UNSAFE_PROTOCOLS) {
    if (normalized.startsWith(protocol)) return "#";
  }
  return href;
}
function getSafeExternalLinkProps(href, target, rel) {
  const safeHref = sanitizeHref(href);
  if (target === "_blank") {
    const consumerParts = rel ? rel.split(/\s+/).filter((part) => part !== "noopener" && part !== "noreferrer") : [];
    return {
      href: safeHref,
      target: "_blank",
      rel: ["noopener", "noreferrer", ...consumerParts].join(" ")
    };
  }
  const result = { href: safeHref };
  if (target !== void 0) result.target = target;
  if (rel !== void 0) result.rel = rel;
  return result;
}

// components/utils/StructuredData/StructuredData.tsx
import { useEffect as useEffect3, useRef } from "react";
function StructuredData({ data }) {
  const scriptRef = useRef(null);
  useEffect3(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);
    scriptRef.current = script;
    return () => {
      if (scriptRef.current && scriptRef.current.parentNode) {
        scriptRef.current.parentNode.removeChild(scriptRef.current);
      }
    };
  }, [data]);
  return null;
}
export {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Alert,
  AlertDescription,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertTitle,
  AspectRatio,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Button,
  Calendar,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  Checkbox,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Combobox,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuPortal,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
  DataTable,
  DatePicker,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerPortal,
  DrawerTitle,
  DrawerTrigger,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  GeeklegoI18nProvider,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  Input,
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
  Label3 as Label,
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarPortal,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PieChart,
  Popover,
  PopoverAnchor,
  PopoverContent,
  PopoverTrigger,
  ProductCard,
  ProductCardBody,
  ProductCardDescription,
  ProductCardFooter,
  ProductCardMedia,
  ProductCardPrice,
  ProductCardTitle,
  Progress,
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
  ScrollArea,
  ScrollBar,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  Separator6 as Separator,
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetOverlay,
  SheetPortal,
  SheetTitle,
  SheetTrigger,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  Skeleton,
  StructuredData,
  Switch,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Toaster,
  Toggle,
  ToggleGroup,
  ToggleGroupItem,
  Tooltip2 as Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  Typography,
  VisuallyHidden,
  alertVariants,
  badgeVariants,
  buttonVariants,
  getDisabledProps,
  getDisclosureProps,
  getErrorFieldProps,
  getIconProps,
  getLiveRegionProps,
  getLoadingProps,
  getNavigationItemProps,
  getSafeExternalLinkProps,
  inputVariants,
  labelVariants,
  navigationMenuTriggerStyle,
  sanitizeHref,
  sheetVariants,
  sidebarMenuButtonVariants,
  toast,
  toggleVariants,
  typographyVariants,
  useFormField,
  useSidebar
};
