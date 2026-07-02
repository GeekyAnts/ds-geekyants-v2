"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// components/index.ts
var index_exports = {};
__export(index_exports, {
  Accordion: () => Accordion,
  AccordionContent: () => AccordionContent,
  AccordionItem: () => AccordionItem,
  AccordionTrigger: () => AccordionTrigger,
  Alert: () => Alert,
  AlertDescription: () => AlertDescription,
  AlertDialog: () => AlertDialog,
  AlertDialogAction: () => AlertDialogAction,
  AlertDialogCancel: () => AlertDialogCancel,
  AlertDialogContent: () => AlertDialogContent,
  AlertDialogDescription: () => AlertDialogDescription,
  AlertDialogFooter: () => AlertDialogFooter,
  AlertDialogHeader: () => AlertDialogHeader,
  AlertDialogOverlay: () => AlertDialogOverlay,
  AlertDialogPortal: () => AlertDialogPortal,
  AlertDialogTitle: () => AlertDialogTitle,
  AlertDialogTrigger: () => AlertDialogTrigger,
  AlertTitle: () => AlertTitle,
  AspectRatio: () => AspectRatio,
  Avatar: () => Avatar,
  AvatarFallback: () => AvatarFallback,
  AvatarImage: () => AvatarImage,
  Badge: () => Badge,
  Breadcrumb: () => Breadcrumb,
  BreadcrumbEllipsis: () => BreadcrumbEllipsis,
  BreadcrumbItem: () => BreadcrumbItem,
  BreadcrumbLink: () => BreadcrumbLink,
  BreadcrumbList: () => BreadcrumbList,
  BreadcrumbPage: () => BreadcrumbPage,
  BreadcrumbSeparator: () => BreadcrumbSeparator,
  Button: () => Button,
  Calendar: () => Calendar,
  Card: () => Card,
  CardContent: () => CardContent,
  CardDescription: () => CardDescription,
  CardFooter: () => CardFooter,
  CardHeader: () => CardHeader,
  CardTitle: () => CardTitle,
  Carousel: () => Carousel,
  CarouselContent: () => CarouselContent,
  CarouselItem: () => CarouselItem,
  CarouselNext: () => CarouselNext,
  CarouselPrevious: () => CarouselPrevious,
  ChartContainer: () => ChartContainer,
  ChartLegend: () => ChartLegend,
  ChartLegendContent: () => ChartLegendContent,
  ChartTooltip: () => ChartTooltip,
  ChartTooltipContent: () => ChartTooltipContent,
  Checkbox: () => Checkbox,
  Collapsible: () => Collapsible,
  CollapsibleContent: () => CollapsibleContent,
  CollapsibleTrigger: () => CollapsibleTrigger,
  Combobox: () => Combobox,
  Command: () => Command,
  CommandEmpty: () => CommandEmpty,
  CommandGroup: () => CommandGroup,
  CommandInput: () => CommandInput,
  CommandItem: () => CommandItem,
  CommandList: () => CommandList,
  CommandSeparator: () => CommandSeparator,
  ContextMenu: () => ContextMenu,
  ContextMenuCheckboxItem: () => ContextMenuCheckboxItem,
  ContextMenuContent: () => ContextMenuContent,
  ContextMenuGroup: () => ContextMenuGroup,
  ContextMenuItem: () => ContextMenuItem,
  ContextMenuLabel: () => ContextMenuLabel,
  ContextMenuPortal: () => ContextMenuPortal,
  ContextMenuRadioGroup: () => ContextMenuRadioGroup,
  ContextMenuRadioItem: () => ContextMenuRadioItem,
  ContextMenuSeparator: () => ContextMenuSeparator,
  ContextMenuShortcut: () => ContextMenuShortcut,
  ContextMenuSub: () => ContextMenuSub,
  ContextMenuSubContent: () => ContextMenuSubContent,
  ContextMenuSubTrigger: () => ContextMenuSubTrigger,
  ContextMenuTrigger: () => ContextMenuTrigger,
  DataTable: () => DataTable,
  DatePicker: () => DatePicker,
  Dialog: () => Dialog,
  DialogClose: () => DialogClose,
  DialogContent: () => DialogContent,
  DialogDescription: () => DialogDescription,
  DialogFooter: () => DialogFooter,
  DialogHeader: () => DialogHeader,
  DialogOverlay: () => DialogOverlay,
  DialogPortal: () => DialogPortal,
  DialogTitle: () => DialogTitle,
  DialogTrigger: () => DialogTrigger,
  Drawer: () => Drawer,
  DrawerClose: () => DrawerClose,
  DrawerContent: () => DrawerContent,
  DrawerDescription: () => DrawerDescription,
  DrawerFooter: () => DrawerFooter,
  DrawerHeader: () => DrawerHeader,
  DrawerOverlay: () => DrawerOverlay,
  DrawerPortal: () => DrawerPortal,
  DrawerTitle: () => DrawerTitle,
  DrawerTrigger: () => DrawerTrigger,
  DropdownMenu: () => DropdownMenu,
  DropdownMenuCheckboxItem: () => DropdownMenuCheckboxItem,
  DropdownMenuContent: () => DropdownMenuContent,
  DropdownMenuGroup: () => DropdownMenuGroup,
  DropdownMenuItem: () => DropdownMenuItem,
  DropdownMenuLabel: () => DropdownMenuLabel,
  DropdownMenuPortal: () => DropdownMenuPortal,
  DropdownMenuRadioGroup: () => DropdownMenuRadioGroup,
  DropdownMenuRadioItem: () => DropdownMenuRadioItem,
  DropdownMenuSeparator: () => DropdownMenuSeparator,
  DropdownMenuShortcut: () => DropdownMenuShortcut,
  DropdownMenuSub: () => DropdownMenuSub,
  DropdownMenuSubContent: () => DropdownMenuSubContent,
  DropdownMenuSubTrigger: () => DropdownMenuSubTrigger,
  DropdownMenuTrigger: () => DropdownMenuTrigger,
  Form: () => Form,
  FormControl: () => FormControl,
  FormDescription: () => FormDescription,
  FormField: () => FormField,
  FormItem: () => FormItem,
  FormLabel: () => FormLabel,
  FormMessage: () => FormMessage,
  GeeklegoI18nProvider: () => GeeklegoI18nProvider,
  HoverCard: () => HoverCard,
  HoverCardContent: () => HoverCardContent,
  HoverCardTrigger: () => HoverCardTrigger,
  Input: () => Input,
  InputOTP: () => InputOTP,
  InputOTPGroup: () => InputOTPGroup,
  InputOTPSeparator: () => InputOTPSeparator,
  InputOTPSlot: () => InputOTPSlot,
  Label: () => Label3,
  Menubar: () => Menubar,
  MenubarCheckboxItem: () => MenubarCheckboxItem,
  MenubarContent: () => MenubarContent,
  MenubarGroup: () => MenubarGroup,
  MenubarItem: () => MenubarItem,
  MenubarLabel: () => MenubarLabel,
  MenubarMenu: () => MenubarMenu,
  MenubarPortal: () => MenubarPortal,
  MenubarRadioGroup: () => MenubarRadioGroup,
  MenubarRadioItem: () => MenubarRadioItem,
  MenubarSeparator: () => MenubarSeparator,
  MenubarShortcut: () => MenubarShortcut,
  MenubarSub: () => MenubarSub,
  MenubarSubContent: () => MenubarSubContent,
  MenubarSubTrigger: () => MenubarSubTrigger,
  MenubarTrigger: () => MenubarTrigger,
  NavigationMenu: () => NavigationMenu,
  NavigationMenuContent: () => NavigationMenuContent,
  NavigationMenuIndicator: () => NavigationMenuIndicator,
  NavigationMenuItem: () => NavigationMenuItem,
  NavigationMenuLink: () => NavigationMenuLink,
  NavigationMenuList: () => NavigationMenuList,
  NavigationMenuTrigger: () => NavigationMenuTrigger,
  NavigationMenuViewport: () => NavigationMenuViewport,
  Pagination: () => Pagination,
  PaginationContent: () => PaginationContent,
  PaginationEllipsis: () => PaginationEllipsis,
  PaginationItem: () => PaginationItem,
  PaginationLink: () => PaginationLink,
  PaginationNext: () => PaginationNext,
  PaginationPrevious: () => PaginationPrevious,
  PieChart: () => PieChart,
  Popover: () => Popover,
  PopoverAnchor: () => PopoverAnchor,
  PopoverContent: () => PopoverContent,
  PopoverTrigger: () => PopoverTrigger,
  ProductCard: () => ProductCard,
  ProductCardBody: () => ProductCardBody,
  ProductCardDescription: () => ProductCardDescription,
  ProductCardFooter: () => ProductCardFooter,
  ProductCardMedia: () => ProductCardMedia,
  ProductCardPrice: () => ProductCardPrice,
  ProductCardTitle: () => ProductCardTitle,
  Progress: () => Progress,
  ResizableHandle: () => ResizableHandle,
  ResizablePanel: () => ResizablePanel,
  ResizablePanelGroup: () => ResizablePanelGroup,
  ScrollArea: () => ScrollArea,
  ScrollBar: () => ScrollBar,
  Select: () => Select,
  SelectContent: () => SelectContent,
  SelectGroup: () => SelectGroup,
  SelectItem: () => SelectItem,
  SelectLabel: () => SelectLabel,
  SelectScrollDownButton: () => SelectScrollDownButton,
  SelectScrollUpButton: () => SelectScrollUpButton,
  SelectSeparator: () => SelectSeparator,
  SelectTrigger: () => SelectTrigger,
  SelectValue: () => SelectValue,
  Separator: () => Separator6,
  Sheet: () => Sheet,
  SheetClose: () => SheetClose,
  SheetContent: () => SheetContent,
  SheetDescription: () => SheetDescription,
  SheetFooter: () => SheetFooter,
  SheetHeader: () => SheetHeader,
  SheetOverlay: () => SheetOverlay,
  SheetPortal: () => SheetPortal,
  SheetTitle: () => SheetTitle,
  SheetTrigger: () => SheetTrigger,
  Sidebar: () => Sidebar,
  SidebarContent: () => SidebarContent,
  SidebarFooter: () => SidebarFooter,
  SidebarGroup: () => SidebarGroup,
  SidebarGroupContent: () => SidebarGroupContent,
  SidebarGroupLabel: () => SidebarGroupLabel,
  SidebarHeader: () => SidebarHeader,
  SidebarInset: () => SidebarInset,
  SidebarMenu: () => SidebarMenu,
  SidebarMenuButton: () => SidebarMenuButton,
  SidebarMenuItem: () => SidebarMenuItem,
  SidebarMenuSub: () => SidebarMenuSub,
  SidebarMenuSubButton: () => SidebarMenuSubButton,
  SidebarProvider: () => SidebarProvider,
  SidebarRail: () => SidebarRail,
  SidebarSeparator: () => SidebarSeparator,
  SidebarTrigger: () => SidebarTrigger,
  Skeleton: () => Skeleton,
  StructuredData: () => StructuredData,
  Switch: () => Switch,
  Table: () => Table,
  TableBody: () => TableBody,
  TableCaption: () => TableCaption,
  TableCell: () => TableCell,
  TableFooter: () => TableFooter,
  TableHead: () => TableHead,
  TableHeader: () => TableHeader,
  TableRow: () => TableRow,
  Tabs: () => Tabs,
  TabsContent: () => TabsContent,
  TabsList: () => TabsList,
  TabsTrigger: () => TabsTrigger,
  Toaster: () => Toaster,
  Toggle: () => Toggle,
  ToggleGroup: () => ToggleGroup,
  ToggleGroupItem: () => ToggleGroupItem,
  Tooltip: () => Tooltip2,
  TooltipContent: () => TooltipContent,
  TooltipProvider: () => TooltipProvider,
  TooltipTrigger: () => TooltipTrigger,
  Typography: () => Typography,
  VisuallyHidden: () => VisuallyHidden,
  alertVariants: () => alertVariants,
  badgeVariants: () => badgeVariants,
  buttonVariants: () => buttonVariants,
  getDisabledProps: () => getDisabledProps,
  getDisclosureProps: () => getDisclosureProps,
  getErrorFieldProps: () => getErrorFieldProps,
  getIconProps: () => getIconProps,
  getLiveRegionProps: () => getLiveRegionProps,
  getLoadingProps: () => getLoadingProps,
  getNavigationItemProps: () => getNavigationItemProps,
  getSafeExternalLinkProps: () => getSafeExternalLinkProps,
  inputVariants: () => inputVariants,
  labelVariants: () => labelVariants,
  navigationMenuTriggerStyle: () => navigationMenuTriggerStyle,
  sanitizeHref: () => sanitizeHref,
  sheetVariants: () => sheetVariants,
  sidebarMenuButtonVariants: () => sidebarMenuButtonVariants,
  toast: () => import_sonner.toast,
  toggleVariants: () => toggleVariants,
  typographyVariants: () => typographyVariants,
  useFormField: () => useFormField,
  useSidebar: () => useSidebar
});
module.exports = __toCommonJS(index_exports);

// components/v2/Accordion/Accordion.tsx
var import_react = require("react");
var RadixAccordion = __toESM(require("@radix-ui/react-accordion"), 1);
var import_lucide_react = require("lucide-react");

// components/v2/lib/cn.ts
var import_clsx = require("clsx");
var import_tailwind_merge = require("tailwind-merge");
function cn(...inputs) {
  return (0, import_tailwind_merge.twMerge)((0, import_clsx.clsx)(inputs));
}

// components/v2/Accordion/Accordion.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var Accordion = RadixAccordion.Root;
var AccordionItem = (0, import_react.forwardRef)(
  ({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    RadixAccordion.Item,
    {
      ref,
      className: cn("border-b border-border", className),
      ...props
    }
  )
);
AccordionItem.displayName = "AccordionItem";
var AccordionTrigger = (0, import_react.forwardRef)(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadixAccordion.Header, { className: "flex", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
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
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        import_lucide_react.ChevronDown,
        {
          className: "size-4 shrink-0 text-muted-foreground transition-transform duration-200",
          "aria-hidden": true
        }
      )
    ]
  }
) }));
AccordionTrigger.displayName = "AccordionTrigger";
var AccordionContent = (0, import_react.forwardRef)(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
  RadixAccordion.Content,
  {
    ref,
    className: cn(
      "overflow-hidden text-sm text-muted-foreground",
      "data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up",
      className
    ),
    ...props,
    children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pb-4 pt-0", children })
  }
));
AccordionContent.displayName = "AccordionContent";

// components/v2/Alert/Alert.tsx
var import_react2 = require("react");

// components/v2/Alert/alert-variants.ts
var import_class_variance_authority = require("class-variance-authority");
var alertVariants = (0, import_class_variance_authority.cva)(
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
var import_jsx_runtime2 = require("react/jsx-runtime");
var Alert = (0, import_react2.forwardRef)(
  ({ className, variant, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
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
var AlertTitle = (0, import_react2.forwardRef)(
  ({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
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
var AlertDescription = (0, import_react2.forwardRef)(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
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
var import_react3 = require("react");
var RadixAlertDialog = __toESM(require("@radix-ui/react-alert-dialog"), 1);

// components/v2/Button/button-variants.ts
var import_class_variance_authority2 = require("class-variance-authority");
var buttonVariants = (0, import_class_variance_authority2.cva)(
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
var import_jsx_runtime3 = require("react/jsx-runtime");
var AlertDialog = RadixAlertDialog.Root;
var AlertDialogTrigger = RadixAlertDialog.Trigger;
var AlertDialogPortal = RadixAlertDialog.Portal;
var AlertDialogOverlay = (0, import_react3.forwardRef)(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
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
var AlertDialogContent = (0, import_react3.forwardRef)(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(AlertDialogPortal, { children: [
  /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(AlertDialogOverlay, {}),
  /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
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
}) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
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
}) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
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
var AlertDialogTitle = (0, import_react3.forwardRef)(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
  RadixAlertDialog.Title,
  {
    ref,
    className: cn("text-lg font-semibold leading-none text-foreground", className),
    ...props
  }
));
AlertDialogTitle.displayName = "AlertDialogTitle";
var AlertDialogDescription = (0, import_react3.forwardRef)(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
  RadixAlertDialog.Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
AlertDialogDescription.displayName = "AlertDialogDescription";
var AlertDialogAction = (0, import_react3.forwardRef)(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
  RadixAlertDialog.Action,
  {
    ref,
    className: cn(buttonVariants(), className),
    ...props
  }
));
AlertDialogAction.displayName = "AlertDialogAction";
var AlertDialogCancel = (0, import_react3.forwardRef)(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
  RadixAlertDialog.Cancel,
  {
    ref,
    className: cn(buttonVariants({ variant: "outline" }), className),
    ...props
  }
));
AlertDialogCancel.displayName = "AlertDialogCancel";

// components/v2/AspectRatio/AspectRatio.tsx
var RadixAspectRatio = __toESM(require("@radix-ui/react-aspect-ratio"), 1);
var AspectRatio = RadixAspectRatio.Root;

// components/v2/Avatar/Avatar.tsx
var import_react4 = require("react");
var RadixAvatar = __toESM(require("@radix-ui/react-avatar"), 1);
var import_jsx_runtime4 = require("react/jsx-runtime");
var Avatar = (0, import_react4.forwardRef)(
  ({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
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
var AvatarImage = (0, import_react4.forwardRef)(
  ({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
    RadixAvatar.Image,
    {
      ref,
      className: cn("aspect-square size-full object-cover", className),
      ...props
    }
  )
);
AvatarImage.displayName = "AvatarImage";
var AvatarFallback = (0, import_react4.forwardRef)(
  ({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
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
var import_react5 = require("react");
var import_react_slot = require("@radix-ui/react-slot");

// components/v2/Badge/badge-variants.ts
var import_class_variance_authority3 = require("class-variance-authority");
var badgeVariants = (0, import_class_variance_authority3.cva)(
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
var import_jsx_runtime5 = require("react/jsx-runtime");
var Badge = (0, import_react5.forwardRef)(
  ({ className, variant, asChild = false, ...props }, ref) => {
    const Comp = asChild ? import_react_slot.Slot : "span";
    return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
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
var import_react6 = require("react");
var import_react_slot2 = require("@radix-ui/react-slot");
var import_lucide_react2 = require("lucide-react");
var import_jsx_runtime6 = require("react/jsx-runtime");
var Breadcrumb = (0, import_react6.forwardRef)(
  ({ ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("nav", { ref, "aria-label": "breadcrumb", ...props })
);
Breadcrumb.displayName = "Breadcrumb";
var BreadcrumbList = (0, import_react6.forwardRef)(
  ({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
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
var BreadcrumbItem = (0, import_react6.forwardRef)(
  ({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
    "li",
    {
      ref,
      className: cn("inline-flex items-center gap-1.5", className),
      ...props
    }
  )
);
BreadcrumbItem.displayName = "BreadcrumbItem";
var BreadcrumbLink = (0, import_react6.forwardRef)(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? import_react_slot2.Slot : "a";
    return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
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
var BreadcrumbPage = (0, import_react6.forwardRef)(
  ({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
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
}) => /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
  "li",
  {
    role: "presentation",
    "aria-hidden": "true",
    className: cn("[&_svg]:size-3.5", className),
    ...props,
    children: children ?? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_lucide_react2.ChevronRight, {})
  }
);
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";
var BreadcrumbEllipsis = ({
  className,
  ...props
}) => /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
  "span",
  {
    role: "presentation",
    "aria-hidden": "true",
    className: cn("flex size-9 items-center justify-center", className),
    ...props,
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_lucide_react2.MoreHorizontal, { className: "size-4" }),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "sr-only", children: "More" })
    ]
  }
);
BreadcrumbEllipsis.displayName = "BreadcrumbEllipsis";

// components/v2/Button/Button.tsx
var import_react7 = require("react");
var import_react_slot3 = require("@radix-ui/react-slot");
var import_jsx_runtime7 = require("react/jsx-runtime");
var Button = (0, import_react7.forwardRef)(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? import_react_slot3.Slot : "button";
    return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
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
var import_react_day_picker = require("react-day-picker");
var import_lucide_react3 = require("lucide-react");
var import_jsx_runtime8 = require("react/jsx-runtime");
function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}) {
  const defaults = (0, import_react_day_picker.getDefaultClassNames)();
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
    import_react_day_picker.DayPicker,
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
          const Icon2 = orientation === "left" ? import_lucide_react3.ChevronLeft : import_lucide_react3.ChevronRight;
          return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(Icon2, { className: cn("size-4", chevronClassName), ...chevronProps });
        }
      },
      ...props
    }
  );
}
Calendar.displayName = "Calendar";

// components/v2/Card/Card.tsx
var import_react8 = require("react");
var import_jsx_runtime9 = require("react/jsx-runtime");
var Card = (0, import_react8.forwardRef)(
  ({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
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
var CardHeader = (0, import_react8.forwardRef)(
  ({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
    "div",
    {
      ref,
      className: cn("flex flex-col gap-1.5 p-6", className),
      ...props
    }
  )
);
CardHeader.displayName = "CardHeader";
var CardTitle = (0, import_react8.forwardRef)(
  ({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
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
var CardDescription = (0, import_react8.forwardRef)(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
  "p",
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
CardDescription.displayName = "CardDescription";
var CardContent = (0, import_react8.forwardRef)(
  ({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", { ref, className: cn("p-6 pt-0", className), ...props })
);
CardContent.displayName = "CardContent";
var CardFooter = (0, import_react8.forwardRef)(
  ({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
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
var import_react9 = require("react");
var import_embla_carousel_react = __toESM(require("embla-carousel-react"), 1);
var import_lucide_react4 = require("lucide-react");
var import_jsx_runtime10 = require("react/jsx-runtime");
var CarouselContext = (0, import_react9.createContext)(null);
function useCarousel() {
  const context = (0, import_react9.useContext)(CarouselContext);
  if (!context) {
    throw new Error("Carousel parts must be used within a <Carousel />.");
  }
  return context;
}
var Carousel = (0, import_react9.forwardRef)(
  ({
    orientation = "horizontal",
    opts,
    setApi,
    plugins,
    className,
    children,
    ...props
  }, ref) => {
    const [carouselRef, api] = (0, import_embla_carousel_react.default)(
      { ...opts, axis: orientation === "horizontal" ? "x" : "y" },
      plugins
    );
    const [canScrollPrev, setCanScrollPrev] = (0, import_react9.useState)(false);
    const [canScrollNext, setCanScrollNext] = (0, import_react9.useState)(false);
    const onSelect = (0, import_react9.useCallback)((emblaApi) => {
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
    }, []);
    const scrollPrev = (0, import_react9.useCallback)(() => api?.scrollPrev(), [api]);
    const scrollNext = (0, import_react9.useCallback)(() => api?.scrollNext(), [api]);
    const handleKeyDown = (0, import_react9.useCallback)(
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
    (0, import_react9.useEffect)(() => {
      if (api && setApi) setApi(api);
    }, [api, setApi]);
    (0, import_react9.useEffect)(() => {
      if (!api) return;
      onSelect(api);
      api.on("reInit", onSelect);
      api.on("select", onSelect);
      return () => {
        api.off("reInit", onSelect);
        api.off("select", onSelect);
      };
    }, [api, onSelect]);
    return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
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
        children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
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
var CarouselContent = (0, import_react9.forwardRef)(
  ({ className, ...props }, ref) => {
    const { carouselRef, orientation } = useCarousel();
    return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("div", { ref: carouselRef, className: "overflow-hidden", children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
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
var CarouselItem = (0, import_react9.forwardRef)(
  ({ className, ...props }, ref) => {
    const { orientation } = useCarousel();
    return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
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
var CarouselPrevious = (0, import_react9.forwardRef)(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel();
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
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
      children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(import_lucide_react4.ArrowLeft, {})
    }
  );
});
CarouselPrevious.displayName = "CarouselPrevious";
var CarouselNext = (0, import_react9.forwardRef)(
  ({ className, variant = "outline", size = "icon", ...props }, ref) => {
    const { orientation, scrollNext, canScrollNext } = useCarousel();
    return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
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
        children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(import_lucide_react4.ArrowRight, {})
      }
    );
  }
);
CarouselNext.displayName = "CarouselNext";

// components/v2/Chart/Chart.tsx
var import_react10 = require("react");
var import_recharts = require("recharts");
var import_jsx_runtime11 = require("react/jsx-runtime");
function configToColorVars(config) {
  const vars = {};
  for (const [key, series] of Object.entries(config)) {
    if (series.color) vars[`--color-${key}`] = series.color;
  }
  return vars;
}
var ChartContainer = (0, import_react10.forwardRef)(
  ({ config, className, children, style, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
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
      children: /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_recharts.ResponsiveContainer, { width: "100%", height: "100%", children })
    }
  )
);
ChartContainer.displayName = "ChartContainer";
var ChartTooltip = import_recharts.Tooltip;
var ChartTooltipContent = (0, import_react10.forwardRef)(
  ({ active, payload, label, hideIndicator, hideLabel, config, className }, ref) => {
    if (!active || !payload?.length) return null;
    return /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(
      "div",
      {
        ref,
        className: cn(
          "grid min-w-32 gap-1.5 rounded-lg border border-border bg-popover px-2.5 py-1.5 text-xs text-popover-foreground shadow-md",
          className
        ),
        children: [
          !hideLabel && label != null && /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("div", { className: "font-medium", children: label }),
          /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("div", { className: "grid gap-1.5", children: payload.map((item, i) => {
            const key = String(item.name ?? item.dataKey ?? i);
            const seriesLabel = config?.[key]?.label ?? item.name ?? item.dataKey;
            return /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(
              "div",
              {
                className: "flex items-center justify-between gap-4",
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { className: "flex items-center gap-1.5", children: [
                    !hideIndicator && /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
                      "span",
                      {
                        className: "size-2.5 shrink-0 rounded-sm",
                        style: { backgroundColor: item.color }
                      }
                    ),
                    /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("span", { className: "text-muted-foreground", children: seriesLabel })
                  ] }),
                  /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("span", { className: "font-mono font-medium tabular-nums text-foreground", children: item.value })
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
var ChartLegend = import_recharts.Legend;
var ChartLegendContent = (0, import_react10.forwardRef)(({ payload, nameKey, config, hideIcon, className }, ref) => {
  if (!payload?.length) return null;
  return /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
    "div",
    {
      ref,
      className: cn("flex flex-wrap items-center justify-center gap-4", className),
      children: payload.map((item, i) => {
        const raw = nameKey ? item.payload?.[nameKey] : item.value;
        const key = String(raw ?? item.value ?? i);
        const seriesLabel = config?.[key]?.label ?? key;
        return /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(
          "div",
          {
            className: "flex items-center gap-1.5 text-xs text-muted-foreground",
            children: [
              !hideIcon && /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
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
var import_react11 = require("react");
var RadixCheckbox = __toESM(require("@radix-ui/react-checkbox"), 1);
var import_lucide_react5 = require("lucide-react");
var import_jsx_runtime12 = require("react/jsx-runtime");
var Checkbox = (0, import_react11.forwardRef)(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
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
    children: /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)(
      RadixCheckbox.Indicator,
      {
        className: cn("flex items-center justify-center text-current"),
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(import_lucide_react5.Check, { className: "size-3.5 group-data-[state=indeterminate]:hidden" }),
          /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(import_lucide_react5.Minus, { className: "hidden size-3.5 group-data-[state=indeterminate]:block" })
        ]
      }
    )
  }
));
Checkbox.displayName = "Checkbox";

// components/v2/Collapsible/Collapsible.tsx
var import_react12 = require("react");
var RadixCollapsible = __toESM(require("@radix-ui/react-collapsible"), 1);
var import_jsx_runtime13 = require("react/jsx-runtime");
var Collapsible = RadixCollapsible.Root;
var CollapsibleTrigger = (0, import_react12.forwardRef)(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
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
var CollapsibleContent = (0, import_react12.forwardRef)(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
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
var import_react15 = require("react");
var import_lucide_react7 = require("lucide-react");

// components/v2/Popover/Popover.tsx
var import_react13 = require("react");
var RadixPopover = __toESM(require("@radix-ui/react-popover"), 1);
var import_jsx_runtime14 = require("react/jsx-runtime");
var Popover = RadixPopover.Root;
var PopoverTrigger = RadixPopover.Trigger;
var PopoverAnchor = RadixPopover.Anchor;
var PopoverContent = (0, import_react13.forwardRef)(
  ({ className, align = "center", sideOffset = 4, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(RadixPopover.Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
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
var import_react14 = require("react");
var import_cmdk = require("cmdk");
var import_lucide_react6 = require("lucide-react");
var import_jsx_runtime15 = require("react/jsx-runtime");
var Command = (0, import_react14.forwardRef)(
  ({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
    import_cmdk.Command,
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
var CommandInput = (0, import_react14.forwardRef)(
  ({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("div", { className: "flex items-center border-b border-border px-3", children: [
    /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(import_lucide_react6.Search, { className: "me-2 size-4 shrink-0 text-muted-foreground" }),
    /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
      import_cmdk.Command.Input,
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
var CommandList = (0, import_react14.forwardRef)(
  ({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
    import_cmdk.Command.List,
    {
      ref,
      className: cn("max-h-64 overflow-y-auto overflow-x-hidden p-1", className),
      ...props
    }
  )
);
CommandList.displayName = "CommandList";
var CommandEmpty = (0, import_react14.forwardRef)(
  ({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
    import_cmdk.Command.Empty,
    {
      ref,
      className: cn("py-6 text-center text-sm text-muted-foreground", className),
      ...props
    }
  )
);
CommandEmpty.displayName = "CommandEmpty";
var CommandGroup = (0, import_react14.forwardRef)(
  ({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
    import_cmdk.Command.Group,
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
var CommandSeparator = (0, import_react14.forwardRef)(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
  import_cmdk.Command.Separator,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-border", className),
    ...props
  }
));
CommandSeparator.displayName = "CommandSeparator";
var CommandItem = (0, import_react14.forwardRef)(
  ({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
    import_cmdk.Command.Item,
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
var import_jsx_runtime16 = require("react/jsx-runtime");
var Combobox = (0, import_react15.forwardRef)(
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
    const [open, setOpen] = (0, import_react15.useState)(false);
    const [internal, setInternal] = (0, import_react15.useState)("");
    const selected = value ?? internal;
    const setValue = (next) => {
      if (value === void 0) setInternal(next);
      onChange?.(next);
    };
    const selectedLabel = options.find((o) => o.value === selected)?.label;
    return /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)(Popover, { open, onOpenChange: setOpen, children: [
      /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)(
        Button,
        {
          ref,
          variant: "outline",
          role: "combobox",
          "aria-expanded": open,
          disabled,
          className: cn("w-64 justify-between font-normal", className),
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("span", { className: cn(!selectedLabel && "text-muted-foreground"), children: selectedLabel ?? placeholder }),
            /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(import_lucide_react7.ChevronsUpDown, { className: "ms-2 size-4 shrink-0 opacity-50" })
          ]
        }
      ) }),
      /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(PopoverContent, { className: cn("w-64 p-0", className), align: "start", children: /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)(Command, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(CommandInput, { placeholder: searchPlaceholder }),
        /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)(CommandList, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(CommandEmpty, { children: emptyText }),
          options.map((option) => /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)(
            CommandItem,
            {
              value: option.label,
              disabled: option.disabled,
              onSelect: () => {
                setValue(option.value === selected ? "" : option.value);
                setOpen(false);
              },
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
                  import_lucide_react7.Check,
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
var import_react16 = require("react");
var RadixContextMenu = __toESM(require("@radix-ui/react-context-menu"), 1);
var import_lucide_react8 = require("lucide-react");
var import_jsx_runtime17 = require("react/jsx-runtime");
var ContextMenu = RadixContextMenu.Root;
var ContextMenuTrigger = RadixContextMenu.Trigger;
var ContextMenuGroup = RadixContextMenu.Group;
var ContextMenuPortal = RadixContextMenu.Portal;
var ContextMenuSub = RadixContextMenu.Sub;
var ContextMenuRadioGroup = RadixContextMenu.RadioGroup;
var ContextMenuContent = (0, import_react16.forwardRef)(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(ContextMenuPortal, { children: /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
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
var ContextMenuItem = (0, import_react16.forwardRef)(
  ({ className, inset, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
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
var ContextMenuCheckboxItem = (0, import_react16.forwardRef)(({ className, children, checked, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)(
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
      /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("span", { className: "absolute start-2 flex size-3.5 items-center justify-center", children: /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(RadixContextMenu.ItemIndicator, { children: /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(import_lucide_react8.Check, { className: "size-4", "aria-hidden": true }) }) }),
      children
    ]
  }
));
ContextMenuCheckboxItem.displayName = "ContextMenuCheckboxItem";
var ContextMenuRadioItem = (0, import_react16.forwardRef)(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)(
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
      /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("span", { className: "absolute start-2 flex size-3.5 items-center justify-center", children: /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(RadixContextMenu.ItemIndicator, { children: /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(import_lucide_react8.Circle, { className: "size-2 fill-current", "aria-hidden": true }) }) }),
      children
    ]
  }
));
ContextMenuRadioItem.displayName = "ContextMenuRadioItem";
var ContextMenuLabel = (0, import_react16.forwardRef)(({ className, inset, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
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
var ContextMenuSeparator = (0, import_react16.forwardRef)(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
  RadixContextMenu.Separator,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-border", className),
    ...props
  }
));
ContextMenuSeparator.displayName = "ContextMenuSeparator";
var ContextMenuSubTrigger = (0, import_react16.forwardRef)(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)(
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
      /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(import_lucide_react8.ChevronRight, { className: "ms-auto size-4", "aria-hidden": true })
    ]
  }
));
ContextMenuSubTrigger.displayName = "ContextMenuSubTrigger";
var ContextMenuSubContent = (0, import_react16.forwardRef)(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(ContextMenuPortal, { children: /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
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
}) => /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
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
var import_react19 = require("react");
var import_react_table = require("@tanstack/react-table");

// components/v2/Table/Table.tsx
var import_react17 = require("react");
var import_jsx_runtime18 = require("react/jsx-runtime");
var Table = (0, import_react17.forwardRef)(
  ({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("div", { className: "relative w-full overflow-x-auto", children: /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
    "table",
    {
      ref,
      className: cn("w-full caption-bottom text-sm", className),
      ...props
    }
  ) })
);
Table.displayName = "Table";
var TableHeader = (0, import_react17.forwardRef)(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("thead", { ref, className: cn("[&_tr]:border-b [&_tr]:border-border", className), ...props }));
TableHeader.displayName = "TableHeader";
var TableBody = (0, import_react17.forwardRef)(
  ({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
    "tbody",
    {
      ref,
      className: cn("[&_tr:last-child]:border-0", className),
      ...props
    }
  )
);
TableBody.displayName = "TableBody";
var TableFooter = (0, import_react17.forwardRef)(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
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
var TableRow = (0, import_react17.forwardRef)(
  ({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
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
var TableHead = (0, import_react17.forwardRef)(
  ({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
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
var TableCell = (0, import_react17.forwardRef)(
  ({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
    "td",
    {
      ref,
      className: cn("p-2 align-middle [&:has([role=checkbox])]:pe-0", className),
      ...props
    }
  )
);
TableCell.displayName = "TableCell";
var TableCaption = (0, import_react17.forwardRef)(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
  "caption",
  {
    ref,
    className: cn("mt-4 text-sm text-muted-foreground", className),
    ...props
  }
));
TableCaption.displayName = "TableCaption";

// components/v2/Pagination/Pagination.tsx
var import_react18 = require("react");
var import_lucide_react9 = require("lucide-react");
var import_jsx_runtime19 = require("react/jsx-runtime");
var Pagination = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(
  "nav",
  {
    role: "navigation",
    "aria-label": "pagination",
    className: cn("mx-auto flex w-full justify-center", className),
    ...props
  }
);
Pagination.displayName = "Pagination";
var PaginationContent = (0, import_react18.forwardRef)(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(
  "ul",
  {
    ref,
    className: cn("flex flex-row items-center gap-1", className),
    ...props
  }
));
PaginationContent.displayName = "PaginationContent";
var PaginationItem = (0, import_react18.forwardRef)(
  ({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("li", { ref, className: cn(className), ...props })
);
PaginationItem.displayName = "PaginationItem";
var PaginationLink = (0, import_react18.forwardRef)(
  ({ className, isActive, size = "icon", ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(
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
var PaginationPrevious = (0, import_react18.forwardRef)(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)(
  PaginationLink,
  {
    ref,
    "aria-label": "Go to previous page",
    size: "md",
    className: cn("gap-1 ps-2.5", className),
    ...props,
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(import_lucide_react9.ChevronLeft, { className: "size-4" }),
      /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("span", { children: "Previous" })
    ]
  }
));
PaginationPrevious.displayName = "PaginationPrevious";
var PaginationNext = (0, import_react18.forwardRef)(
  ({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)(
    PaginationLink,
    {
      ref,
      "aria-label": "Go to next page",
      size: "md",
      className: cn("gap-1 pe-2.5", className),
      ...props,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("span", { children: "Next" }),
        /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(import_lucide_react9.ChevronRight, { className: "size-4" })
      ]
    }
  )
);
PaginationNext.displayName = "PaginationNext";
var PaginationEllipsis = ({
  className,
  ...props
}) => /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)(
  "span",
  {
    "aria-hidden": true,
    className: cn("flex size-9 items-center justify-center", className),
    ...props,
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(import_lucide_react9.MoreHorizontal, { className: "size-4" }),
      /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("span", { className: "sr-only", children: "More pages" })
    ]
  }
);
PaginationEllipsis.displayName = "PaginationEllipsis";

// components/v2/DataTable/DataTable.tsx
var import_jsx_runtime20 = require("react/jsx-runtime");
function DataTable({
  columns,
  data,
  pagination = true,
  pageSize = 10,
  emptyText = "No results."
}) {
  const [sorting, setSorting] = (0, import_react19.useState)([]);
  const table = (0, import_react_table.useReactTable)({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: (0, import_react_table.getCoreRowModel)(),
    getSortedRowModel: (0, import_react_table.getSortedRowModel)(),
    getPaginationRowModel: pagination ? (0, import_react_table.getPaginationRowModel)() : void 0,
    initialState: pagination ? { pagination: { pageSize } } : void 0
  });
  const canPrev = pagination && table.getCanPreviousPage();
  const canNext = pagination && table.getCanNextPage();
  return /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)("div", { className: "flex flex-col gap-4", children: [
    /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("div", { className: "rounded-md border border-border", children: /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)(Table, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(TableHeader, { children: table.getHeaderGroups().map((headerGroup) => /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(TableRow, { children: headerGroup.headers.map((header) => {
        const sorted = header.column.getIsSorted();
        return /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(
          TableHead,
          {
            "aria-sort": sorted === "asc" ? "ascending" : sorted === "desc" ? "descending" : void 0,
            children: header.isPlaceholder ? null : header.column.getCanSort() ? /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)(
              "button",
              {
                type: "button",
                onClick: header.column.getToggleSortingHandler(),
                className: cn(
                  "inline-flex items-center gap-1 rounded-sm font-medium",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                ),
                children: [
                  (0, import_react_table.flexRender)(
                    header.column.columnDef.header,
                    header.getContext()
                  ),
                  /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("span", { "aria-hidden": true, className: "text-muted-foreground", children: sorted === "asc" ? "\u2191" : sorted === "desc" ? "\u2193" : "" })
                ]
              }
            ) : (0, import_react_table.flexRender)(
              header.column.columnDef.header,
              header.getContext()
            )
          },
          header.id
        );
      }) }, headerGroup.id)) }),
      /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(TableBody, { children: table.getRowModel().rows.length ? table.getRowModel().rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(
        TableRow,
        {
          "data-state": row.getIsSelected() ? "selected" : void 0,
          children: row.getVisibleCells().map((cell) => /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(TableCell, { children: (0, import_react_table.flexRender)(cell.column.columnDef.cell, cell.getContext()) }, cell.id))
        },
        row.id
      )) : /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(TableRow, { children: /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(
        TableCell,
        {
          colSpan: columns.length,
          className: "h-24 text-center text-muted-foreground",
          children: emptyText
        }
      ) }) })
    ] }) }),
    pagination && /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)("div", { className: "flex items-center justify-between gap-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)("span", { className: "text-sm text-muted-foreground", children: [
        "Page ",
        table.getState().pagination.pageIndex + 1,
        " of",
        " ",
        table.getPageCount()
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(Pagination, { className: "mx-0 w-auto justify-end", children: /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)(PaginationContent, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(PaginationItem, { children: /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(
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
        /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(PaginationItem, { children: /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(
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
var import_react20 = require("react");
var import_lucide_react10 = require("lucide-react");
var import_jsx_runtime21 = require("react/jsx-runtime");
var DatePicker = (0, import_react20.forwardRef)(
  ({
    value,
    onChange,
    defaultValue,
    placeholder = "Pick a date",
    disabled = false,
    locale,
    className
  }, ref) => {
    const [open, setOpen] = (0, import_react20.useState)(false);
    const [internal, setInternal] = (0, import_react20.useState)(defaultValue);
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
    return /* @__PURE__ */ (0, import_jsx_runtime21.jsxs)(Popover, { open, onOpenChange: setOpen, children: [
      /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ (0, import_jsx_runtime21.jsxs)(
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
            /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(import_lucide_react10.CalendarIcon, { className: "size-4 shrink-0" }),
            label
          ]
        }
      ) }),
      /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(PopoverContent, { className: "w-auto p-0", align: "start", children: /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(
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
var import_react23 = require("react");
var RadixDialog = __toESM(require("@radix-ui/react-dialog"), 1);
var import_lucide_react11 = require("lucide-react");

// components/utils/i18n/useGeeklegoI18n.ts
var import_react22 = require("react");

// components/utils/i18n/GeeklegoI18nProvider.tsx
var import_react21 = require("react");
var import_jsx_runtime22 = require("react/jsx-runtime");
var GeeklegoI18nContext = (0, import_react21.createContext)(null);
function GeeklegoI18nProvider({
  children,
  strings = {},
  formatters = {},
  locale
}) {
  const value = (0, import_react21.useMemo)(
    () => ({ strings, formatters, locale }),
    [strings, formatters, locale]
  );
  return /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(GeeklegoI18nContext.Provider, { value, children });
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
  const ctx = (0, import_react22.useContext)(GeeklegoI18nContext);
  return (0, import_react22.useMemo)(
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
var import_jsx_runtime23 = require("react/jsx-runtime");
var Dialog = RadixDialog.Root;
var DialogTrigger = RadixDialog.Trigger;
var DialogClose = RadixDialog.Close;
var DialogPortal = RadixDialog.Portal;
var DialogOverlay = (0, import_react23.forwardRef)(
  ({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(
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
var DialogContent = (0, import_react23.forwardRef)(
  ({ className, children, showClose = true, i18nStrings, ...props }, ref) => {
    const t = useComponentI18n("dialog", i18nStrings);
    return /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)(DialogPortal, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(DialogOverlay, {}),
      /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)(
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
            showClose && /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(
              RadixDialog.Close,
              {
                className: cn(
                  "absolute end-4 top-4 rounded-sm text-muted-foreground opacity-70",
                  "transition-opacity hover:opacity-100",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-popover",
                  "disabled:pointer-events-none"
                ),
                "aria-label": t.closeLabel,
                children: /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(import_lucide_react11.X, { className: "size-4" })
              }
            )
          ]
        }
      )
    ] });
  }
);
DialogContent.displayName = "DialogContent";
var DialogHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(
  "div",
  {
    className: cn("flex flex-col gap-1.5 text-center sm:text-start", className),
    ...props
  }
);
DialogHeader.displayName = "DialogHeader";
var DialogFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(
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
var DialogTitle = (0, import_react23.forwardRef)(
  ({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(
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
var DialogDescription = (0, import_react23.forwardRef)(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(
  RadixDialog.Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
DialogDescription.displayName = "DialogDescription";

// components/v2/Drawer/Drawer.tsx
var import_react24 = require("react");
var import_vaul = require("vaul");
var import_jsx_runtime24 = require("react/jsx-runtime");
var Drawer = ({ shouldScaleBackground = true, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(import_vaul.Drawer.Root, { shouldScaleBackground, ...props });
Drawer.displayName = "Drawer";
var DrawerTrigger = import_vaul.Drawer.Trigger;
var DrawerPortal = import_vaul.Drawer.Portal;
var DrawerClose = import_vaul.Drawer.Close;
var DrawerOverlay = (0, import_react24.forwardRef)(
  ({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(
    import_vaul.Drawer.Overlay,
    {
      ref,
      className: cn("fixed inset-0 z-50 bg-foreground/50", className),
      ...props
    }
  )
);
DrawerOverlay.displayName = "DrawerOverlay";
var DrawerContent = (0, import_react24.forwardRef)(
  ({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)(DrawerPortal, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(DrawerOverlay, {}),
    /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)(
      import_vaul.Drawer.Content,
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
          /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("div", { className: "mx-auto mt-4 hidden h-2 w-24 shrink-0 rounded-full bg-muted group-data-[vaul-drawer-direction=bottom]/drawer:block group-data-[vaul-drawer-direction=top]/drawer:block" }),
          children
        ]
      }
    )
  ] })
);
DrawerContent.displayName = "DrawerContent";
var DrawerHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(
  "div",
  {
    className: cn("grid gap-1.5 p-4 text-center sm:text-start", className),
    ...props
  }
);
DrawerHeader.displayName = "DrawerHeader";
var DrawerFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("div", { className: cn("mt-auto flex flex-col gap-2 p-4", className), ...props });
DrawerFooter.displayName = "DrawerFooter";
var DrawerTitle = (0, import_react24.forwardRef)(
  ({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(
    import_vaul.Drawer.Title,
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
var DrawerDescription = (0, import_react24.forwardRef)(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(
  import_vaul.Drawer.Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
DrawerDescription.displayName = "DrawerDescription";

// components/v2/DropdownMenu/DropdownMenu.tsx
var import_react25 = require("react");
var RadixDropdownMenu = __toESM(require("@radix-ui/react-dropdown-menu"), 1);
var import_lucide_react12 = require("lucide-react");
var import_jsx_runtime25 = require("react/jsx-runtime");
var DropdownMenu = RadixDropdownMenu.Root;
var DropdownMenuTrigger = RadixDropdownMenu.Trigger;
var DropdownMenuGroup = RadixDropdownMenu.Group;
var DropdownMenuPortal = RadixDropdownMenu.Portal;
var DropdownMenuSub = RadixDropdownMenu.Sub;
var DropdownMenuRadioGroup = RadixDropdownMenu.RadioGroup;
var DropdownMenuContent = (0, import_react25.forwardRef)(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(DropdownMenuPortal, { children: /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(
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
var DropdownMenuItem = (0, import_react25.forwardRef)(({ className, inset, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(
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
var DropdownMenuCheckboxItem = (0, import_react25.forwardRef)(({ className, children, checked, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)(
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
      /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("span", { className: "absolute start-2 flex size-3.5 items-center justify-center", children: /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(RadixDropdownMenu.ItemIndicator, { children: /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(import_lucide_react12.Check, { className: "size-4", "aria-hidden": true }) }) }),
      children
    ]
  }
));
DropdownMenuCheckboxItem.displayName = "DropdownMenuCheckboxItem";
var DropdownMenuRadioItem = (0, import_react25.forwardRef)(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)(
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
      /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("span", { className: "absolute start-2 flex size-3.5 items-center justify-center", children: /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(RadixDropdownMenu.ItemIndicator, { children: /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(import_lucide_react12.Circle, { className: "size-2 fill-current", "aria-hidden": true }) }) }),
      children
    ]
  }
));
DropdownMenuRadioItem.displayName = "DropdownMenuRadioItem";
var DropdownMenuLabel = (0, import_react25.forwardRef)(({ className, inset, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(
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
var DropdownMenuSeparator = (0, import_react25.forwardRef)(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(
  RadixDropdownMenu.Separator,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-border", className),
    ...props
  }
));
DropdownMenuSeparator.displayName = "DropdownMenuSeparator";
var DropdownMenuSubTrigger = (0, import_react25.forwardRef)(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)(
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
      /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(import_lucide_react12.ChevronRight, { className: "ms-auto size-4", "aria-hidden": true })
    ]
  }
));
DropdownMenuSubTrigger.displayName = "DropdownMenuSubTrigger";
var DropdownMenuSubContent = (0, import_react25.forwardRef)(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(DropdownMenuPortal, { children: /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(
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
}) => /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(
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
var import_react27 = require("react");
var import_react_slot4 = require("@radix-ui/react-slot");
var import_react_hook_form = require("react-hook-form");

// components/v2/Label/Label.tsx
var import_react26 = require("react");
var RadixLabel = __toESM(require("@radix-ui/react-label"), 1);

// components/v2/Label/label-variants.ts
var import_class_variance_authority4 = require("class-variance-authority");
var labelVariants = (0, import_class_variance_authority4.cva)(
  [
    "text-sm font-medium leading-none text-foreground",
    "peer-disabled:cursor-not-allowed peer-disabled:opacity-50"
  ].join(" ")
);

// components/v2/Label/Label.tsx
var import_jsx_runtime26 = require("react/jsx-runtime");
var Label3 = (0, import_react26.forwardRef)(
  ({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(
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
var import_jsx_runtime27 = require("react/jsx-runtime");
var Form = import_react_hook_form.FormProvider;
var FormFieldContext = (0, import_react27.createContext)(null);
var FormItemContext = (0, import_react27.createContext)(null);
function useFormField() {
  const fieldContext = (0, import_react27.useContext)(FormFieldContext);
  const itemContext = (0, import_react27.useContext)(FormItemContext);
  const { getFieldState } = (0, import_react_hook_form.useFormContext)();
  const formState = (0, import_react_hook_form.useFormState)({ name: fieldContext?.name });
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
var FormField = (props) => /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(FormFieldContext.Provider, { value: { name: props.name }, children: /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(import_react_hook_form.Controller, { ...props }) });
var FormItem = (0, import_react27.forwardRef)(
  ({ className, ...props }, ref) => {
    const id = (0, import_react27.useId)();
    return /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(FormItemContext.Provider, { value: { id }, children: /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("div", { ref, className: cn("flex flex-col gap-2", className), ...props }) });
  }
);
FormItem.displayName = "FormItem";
var FormLabel = (0, import_react27.forwardRef)(
  ({ className, ...props }, ref) => {
    const { error, formItemId } = useFormField();
    return /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(
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
var FormControl = (0, import_react27.forwardRef)(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField();
  return /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(
    import_react_slot4.Slot,
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
var FormDescription = (0, import_react27.forwardRef)(
  ({ className, ...props }, ref) => {
    const { formDescriptionId } = useFormField();
    return /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(
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
var FormMessage = (0, import_react27.forwardRef)(
  ({ className, children, ...props }, ref) => {
    const { error, formMessageId } = useFormField();
    const body = error ? String(error?.message ?? "") : children;
    if (!body) return null;
    return /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(
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
var import_react28 = require("react");
var RadixHoverCard = __toESM(require("@radix-ui/react-hover-card"), 1);
var import_jsx_runtime28 = require("react/jsx-runtime");
var HoverCard = RadixHoverCard.Root;
var HoverCardTrigger = RadixHoverCard.Trigger;
var HoverCardContent = (0, import_react28.forwardRef)(({ className, align = "center", sideOffset = 4, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(RadixHoverCard.Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(
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
var import_react29 = require("react");

// components/v2/Input/input-variants.ts
var import_class_variance_authority5 = require("class-variance-authority");
var inputVariants = (0, import_class_variance_authority5.cva)(
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
var import_jsx_runtime29 = require("react/jsx-runtime");
var Input = (0, import_react29.forwardRef)(
  ({ className, variant, inputSize, type = "text", ...props }, ref) => {
    return /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(
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
var import_react30 = require("react");
var import_input_otp = require("input-otp");
var import_lucide_react13 = require("lucide-react");
var import_jsx_runtime30 = require("react/jsx-runtime");
var InputOTP = (0, import_react30.forwardRef)(
  ({ className, containerClassName, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(
    import_input_otp.OTPInput,
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
var InputOTPGroup = (0, import_react30.forwardRef)(
  ({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime30.jsx)("div", { ref, className: cn("flex items-center", className), ...props })
);
InputOTPGroup.displayName = "InputOTPGroup";
var InputOTPSlot = (0, import_react30.forwardRef)(
  ({ index, className, ...props }, ref) => {
    const inputOTPContext = (0, import_react30.useContext)(import_input_otp.OTPInputContext);
    const slot = inputOTPContext?.slots[index];
    const { char, hasFakeCaret, isActive } = slot ?? {};
    return /* @__PURE__ */ (0, import_jsx_runtime30.jsxs)(
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
          hasFakeCaret && /* @__PURE__ */ (0, import_jsx_runtime30.jsx)("div", { className: "pointer-events-none absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ (0, import_jsx_runtime30.jsx)("div", { className: "h-4 w-px animate-caret-blink bg-foreground duration-1000" }) })
        ]
      }
    );
  }
);
InputOTPSlot.displayName = "InputOTPSlot";
var InputOTPSeparator = (0, import_react30.forwardRef)(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(
  "div",
  {
    ref,
    role: "separator",
    className: cn("flex items-center text-muted-foreground", className),
    ...props,
    children: /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(import_lucide_react13.Minus, { className: "size-4" })
  }
));
InputOTPSeparator.displayName = "InputOTPSeparator";

// components/v2/Menubar/Menubar.tsx
var import_react31 = require("react");
var RadixMenubar = __toESM(require("@radix-ui/react-menubar"), 1);
var import_lucide_react14 = require("lucide-react");
var import_jsx_runtime31 = require("react/jsx-runtime");
var MenubarMenu = (props) => /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(RadixMenubar.Menu, { ...props });
MenubarMenu.displayName = "MenubarMenu";
var MenubarGroup = RadixMenubar.Group;
var MenubarPortal = RadixMenubar.Portal;
var MenubarSub = RadixMenubar.Sub;
var MenubarRadioGroup = RadixMenubar.RadioGroup;
var Menubar = (0, import_react31.forwardRef)(
  ({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
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
var MenubarTrigger = (0, import_react31.forwardRef)(
  ({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
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
var MenubarContent = (0, import_react31.forwardRef)(
  ({ className, align = "start", alignOffset = -4, sideOffset = 8, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(MenubarPortal, { children: /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
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
var MenubarItem = (0, import_react31.forwardRef)(
  ({ className, inset, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
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
var MenubarCheckboxItem = (0, import_react31.forwardRef)(({ className, children, checked, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)(
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
      /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("span", { className: "absolute start-2 flex size-3.5 items-center justify-center", children: /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(RadixMenubar.ItemIndicator, { children: /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(import_lucide_react14.Check, { className: "size-4", "aria-hidden": true }) }) }),
      children
    ]
  }
));
MenubarCheckboxItem.displayName = "MenubarCheckboxItem";
var MenubarRadioItem = (0, import_react31.forwardRef)(
  ({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)(
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
        /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("span", { className: "absolute start-2 flex size-3.5 items-center justify-center", children: /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(RadixMenubar.ItemIndicator, { children: /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(import_lucide_react14.Circle, { className: "size-2 fill-current", "aria-hidden": true }) }) }),
        children
      ]
    }
  )
);
MenubarRadioItem.displayName = "MenubarRadioItem";
var MenubarLabel = (0, import_react31.forwardRef)(
  ({ className, inset, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
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
var MenubarSeparator = (0, import_react31.forwardRef)(
  ({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
    RadixMenubar.Separator,
    {
      ref,
      className: cn("-mx-1 my-1 h-px bg-border", className),
      ...props
    }
  )
);
MenubarSeparator.displayName = "MenubarSeparator";
var MenubarSubTrigger = (0, import_react31.forwardRef)(
  ({ className, inset, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)(
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
        /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(import_lucide_react14.ChevronRight, { className: "ms-auto size-4", "aria-hidden": true })
      ]
    }
  )
);
MenubarSubTrigger.displayName = "MenubarSubTrigger";
var MenubarSubContent = (0, import_react31.forwardRef)(
  ({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(MenubarPortal, { children: /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
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
var MenubarShortcut = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
  "span",
  {
    className: cn("ms-auto text-xs tracking-widest text-muted-foreground", className),
    ...props
  }
);
MenubarShortcut.displayName = "MenubarShortcut";

// components/v2/NavigationMenu/NavigationMenu.tsx
var import_react32 = require("react");
var RadixNavigationMenu = __toESM(require("@radix-ui/react-navigation-menu"), 1);
var import_lucide_react15 = require("lucide-react");

// components/v2/NavigationMenu/navigation-menu-variants.ts
var import_class_variance_authority6 = require("class-variance-authority");
var navigationMenuTriggerStyle = (0, import_class_variance_authority6.cva)(
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
var import_jsx_runtime32 = require("react/jsx-runtime");
var NavigationMenu = (0, import_react32.forwardRef)(({ className, children, viewport = true, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime32.jsxs)(
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
      viewport && /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(NavigationMenuViewport, {})
    ]
  }
));
NavigationMenu.displayName = "NavigationMenu";
var NavigationMenuItem = RadixNavigationMenu.Item;
var NavigationMenuList = (0, import_react32.forwardRef)(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(
  RadixNavigationMenu.List,
  {
    ref,
    className: cn("flex flex-1 list-none items-center justify-center gap-1", className),
    ...props
  }
));
NavigationMenuList.displayName = "NavigationMenuList";
var NavigationMenuTrigger = (0, import_react32.forwardRef)(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime32.jsxs)(
  RadixNavigationMenu.Trigger,
  {
    ref,
    className: cn(navigationMenuTriggerStyle(), className),
    ...props,
    children: [
      children,
      /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(
        import_lucide_react15.ChevronDown,
        {
          className: "relative top-px size-3 transition-transform duration-200 group-data-[state=open]:rotate-180",
          "aria-hidden": true
        }
      )
    ]
  }
));
NavigationMenuTrigger.displayName = "NavigationMenuTrigger";
var NavigationMenuContent = (0, import_react32.forwardRef)(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(
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
var NavigationMenuLink = (0, import_react32.forwardRef)(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(
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
var NavigationMenuIndicator = (0, import_react32.forwardRef)(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(
  RadixNavigationMenu.Indicator,
  {
    ref,
    className: cn(
      "top-full z-10 flex h-2 items-end justify-center overflow-hidden",
      "transition-opacity duration-200 data-[state=hidden]:opacity-0 data-[state=visible]:opacity-100",
      className
    ),
    ...props,
    children: /* @__PURE__ */ (0, import_jsx_runtime32.jsx)("div", { className: "relative top-1 size-2 rotate-45 rounded-tl-sm border-l border-t border-border bg-popover" })
  }
));
NavigationMenuIndicator.displayName = "NavigationMenuIndicator";
var NavigationMenuViewport = (0, import_react32.forwardRef)(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime32.jsx)("div", { className: "absolute left-0 top-full flex justify-center", children: /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(
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
var import_react33 = require("react");
var import_recharts2 = require("recharts");
var import_jsx_runtime33 = require("react/jsx-runtime");
var PieChart = (0, import_react33.forwardRef)(
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
    return /* @__PURE__ */ (0, import_jsx_runtime33.jsxs)(Card, { ref, className: cn("flex flex-col", className), ...props, children: [
      (title != null || description != null) && /* @__PURE__ */ (0, import_jsx_runtime33.jsxs)(CardHeader, { className: "items-center pb-0 text-center", children: [
        title != null && /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(CardTitle, { children: title }),
        description != null && /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(CardDescription, { children: description })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(CardContent, { className: "flex-1 pb-0", children: /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(
        ChartContainer,
        {
          config,
          className: "mx-auto aspect-square max-h-64",
          children: /* @__PURE__ */ (0, import_jsx_runtime33.jsxs)(import_recharts2.PieChart, { children: [
            showTooltip && /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(
              ChartTooltip,
              {
                cursor: false,
                content: /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(ChartTooltipContent, { config, hideLabel: isDonut })
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime33.jsxs)(
              import_recharts2.Pie,
              {
                data,
                dataKey: "value",
                nameKey: "name",
                innerRadius,
                outerRadius,
                strokeWidth: 5,
                stroke: "var(--color-background)",
                children: [
                  data.map((datum) => /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(import_recharts2.Cell, { fill: `var(--color-${datum.name})` }, datum.name)),
                  showLabels && /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(
                    import_recharts2.LabelList,
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
                  renderCenterText && /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(
                    import_recharts2.Label,
                    {
                      content: ({ viewBox }) => {
                        if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                          return /* @__PURE__ */ (0, import_jsx_runtime33.jsxs)(
                            "text",
                            {
                              x: viewBox.cx,
                              y: viewBox.cy,
                              textAnchor: "middle",
                              dominantBaseline: "middle",
                              children: [
                                /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(
                                  "tspan",
                                  {
                                    x: viewBox.cx,
                                    y: viewBox.cy,
                                    className: "fill-foreground text-3xl font-bold",
                                    children: String(centerValue)
                                  }
                                ),
                                centerLabel != null && /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(
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
            showLegend && /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(
              ChartLegend,
              {
                verticalAlign: "bottom",
                content: /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(ChartLegendContent, { nameKey: "name", config })
              }
            )
          ] })
        }
      ) }),
      footer != null && /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(CardFooter, { className: "flex-col gap-2 pt-4 text-sm", children: footer })
    ] });
  }
);
PieChart.displayName = "PieChart";

// components/v2/Progress/Progress.tsx
var import_react34 = require("react");
var RadixProgress = __toESM(require("@radix-ui/react-progress"), 1);
var import_jsx_runtime34 = require("react/jsx-runtime");
var Progress = (0, import_react34.forwardRef)(({ className, value, max = 100, ...props }, ref) => {
  const pct = value == null ? 0 : Math.min(Math.max(value, 0), max) / max * 100;
  return /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(
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
      children: /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(
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
var import_react35 = require("react");

// components/v2/ProductCard/product-card-variants.ts
var import_class_variance_authority7 = require("class-variance-authority");
var productCardVariants = (0, import_class_variance_authority7.cva)(
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
var productCardMediaVariants = (0, import_class_variance_authority7.cva)("relative overflow-hidden bg-muted", {
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
var import_jsx_runtime35 = require("react/jsx-runtime");
var ProductCard = (0, import_react35.forwardRef)(
  ({ className, orientation, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(
    Card,
    {
      ref,
      className: cn(productCardVariants({ orientation }), className),
      ...props
    }
  )
);
ProductCard.displayName = "ProductCard";
var ProductCardMedia = (0, import_react35.forwardRef)(
  ({ className, orientation, src, alt = "", ratio = 4 / 3, imgProps, children, ...props }, ref) => {
    const image = src ? /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(
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
    return /* @__PURE__ */ (0, import_jsx_runtime35.jsxs)(
      "div",
      {
        ref,
        className: cn(productCardMediaVariants({ orientation }), className),
        ...props,
        children: [
          orientation === "horizontal" ? /* @__PURE__ */ (0, import_jsx_runtime35.jsx)("div", { className: "size-full", children: image }) : /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(AspectRatio, { ratio, children: image }),
          children != null && /* @__PURE__ */ (0, import_jsx_runtime35.jsx)("div", { className: "absolute left-3 top-3 z-10", children })
        ]
      }
    );
  }
);
ProductCardMedia.displayName = "ProductCardMedia";
var ProductCardBody = (0, import_react35.forwardRef)(
  ({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(
    "div",
    {
      ref,
      className: cn("flex flex-1 flex-col gap-1.5 p-4", className),
      ...props
    }
  )
);
ProductCardBody.displayName = "ProductCardBody";
var ProductCardTitle = (0, import_react35.forwardRef)(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(
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
var ProductCardDescription = (0, import_react35.forwardRef)(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(
  "p",
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
ProductCardDescription.displayName = "ProductCardDescription";
var ProductCardPrice = (0, import_react35.forwardRef)(({ className, price, originalPrice, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime35.jsxs)(
  "div",
  {
    ref,
    className: cn("mt-1 flex items-baseline gap-2", className),
    ...props,
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime35.jsx)("span", { className: "text-lg font-bold text-card-foreground", children: price }),
      originalPrice != null && /* @__PURE__ */ (0, import_jsx_runtime35.jsx)("span", { className: "text-sm text-muted-foreground line-through", children: originalPrice })
    ]
  }
));
ProductCardPrice.displayName = "ProductCardPrice";
var ProductCardFooter = (0, import_react35.forwardRef)(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(
  "div",
  {
    ref,
    className: cn("flex items-center gap-2 p-4 pt-0", className),
    ...props
  }
));
ProductCardFooter.displayName = "ProductCardFooter";

// components/v2/Resizable/Resizable.tsx
var import_lucide_react16 = require("lucide-react");
var import_react_resizable_panels = require("react-resizable-panels");
var import_jsx_runtime36 = require("react/jsx-runtime");
var ResizablePanelGroup = ({
  className,
  orientation = "horizontal",
  ...props
}) => /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(
  import_react_resizable_panels.Group,
  {
    orientation,
    className: cn("flex size-full", className),
    ...props
  }
);
ResizablePanelGroup.displayName = "ResizablePanelGroup";
var ResizablePanel = (props) => /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(import_react_resizable_panels.Panel, { ...props });
ResizablePanel.displayName = "ResizablePanel";
var ResizableHandle = ({
  className,
  orientation = "horizontal",
  withHandle = false,
  ...props
}) => /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(
  import_react_resizable_panels.Separator,
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
    children: withHandle && /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(
      "div",
      {
        className: cn(
          "z-10 flex items-center justify-center rounded-sm border border-border bg-border",
          orientation === "horizontal" ? "h-4 w-3" : "h-3 w-4 rotate-90"
        ),
        children: /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(import_lucide_react16.GripVertical, { className: "size-2.5 text-muted-foreground", "aria-hidden": true })
      }
    )
  }
);
ResizableHandle.displayName = "ResizableHandle";

// components/v2/ScrollArea/ScrollArea.tsx
var import_react36 = require("react");
var RadixScrollArea = __toESM(require("@radix-ui/react-scroll-area"), 1);
var import_jsx_runtime37 = require("react/jsx-runtime");
var ScrollArea = (0, import_react36.forwardRef)(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime37.jsxs)(
  RadixScrollArea.Root,
  {
    ref,
    className: cn("relative overflow-hidden", className),
    ...props,
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(RadixScrollArea.Viewport, { className: "size-full rounded-[inherit] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", children }),
      /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(ScrollBar, {}),
      /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(RadixScrollArea.Corner, {})
    ]
  }
));
ScrollArea.displayName = "ScrollArea";
var ScrollBar = (0, import_react36.forwardRef)(({ className, orientation = "vertical", ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(
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
    children: /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(RadixScrollArea.ScrollAreaThumb, { className: "relative flex-1 rounded-full bg-border" })
  }
));
ScrollBar.displayName = "ScrollBar";

// components/v2/Select/Select.tsx
var import_react37 = require("react");
var RadixSelect = __toESM(require("@radix-ui/react-select"), 1);
var import_lucide_react17 = require("lucide-react");
var import_jsx_runtime38 = require("react/jsx-runtime");
var Select = RadixSelect.Root;
var SelectGroup = RadixSelect.Group;
var SelectValue = RadixSelect.Value;
var SelectTrigger = (0, import_react37.forwardRef)(
  ({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime38.jsxs)(
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
        /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(RadixSelect.Icon, { asChild: true, children: /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(import_lucide_react17.ChevronDown, { className: "size-4 shrink-0 text-muted-foreground", "aria-hidden": true }) })
      ]
    }
  )
);
SelectTrigger.displayName = "SelectTrigger";
var SelectScrollUpButton = (0, import_react37.forwardRef)(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(
  RadixSelect.ScrollUpButton,
  {
    ref,
    className: cn(
      "flex cursor-default items-center justify-center py-1 text-muted-foreground",
      className
    ),
    ...props,
    children: /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(import_lucide_react17.ChevronUp, { className: "size-4", "aria-hidden": true })
  }
));
SelectScrollUpButton.displayName = "SelectScrollUpButton";
var SelectScrollDownButton = (0, import_react37.forwardRef)(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(
  RadixSelect.ScrollDownButton,
  {
    ref,
    className: cn(
      "flex cursor-default items-center justify-center py-1 text-muted-foreground",
      className
    ),
    ...props,
    children: /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(import_lucide_react17.ChevronDown, { className: "size-4", "aria-hidden": true })
  }
));
SelectScrollDownButton.displayName = "SelectScrollDownButton";
var SelectContent = (0, import_react37.forwardRef)(
  ({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(RadixSelect.Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime38.jsxs)(
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
        /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(SelectScrollUpButton, {}),
        /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(
          RadixSelect.Viewport,
          {
            className: cn(
              "p-1",
              position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
            ),
            children
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(SelectScrollDownButton, {})
      ]
    }
  ) })
);
SelectContent.displayName = "SelectContent";
var SelectLabel = (0, import_react37.forwardRef)(
  ({ className, inset, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(
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
var SelectItem = (0, import_react37.forwardRef)(
  ({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime38.jsxs)(
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
        /* @__PURE__ */ (0, import_jsx_runtime38.jsx)("span", { className: "absolute start-2 flex size-3.5 items-center justify-center", children: /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(RadixSelect.ItemIndicator, { children: /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(import_lucide_react17.Check, { className: "size-4", "aria-hidden": true }) }) }),
        /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(RadixSelect.ItemText, { children })
      ]
    }
  )
);
SelectItem.displayName = "SelectItem";
var SelectSeparator = (0, import_react37.forwardRef)(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(
  RadixSelect.Separator,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-border", className),
    ...props
  }
));
SelectSeparator.displayName = "SelectSeparator";

// components/v2/Separator/Separator.tsx
var import_react38 = require("react");
var RadixSeparator = __toESM(require("@radix-ui/react-separator"), 1);
var import_jsx_runtime39 = require("react/jsx-runtime");
var Separator6 = (0, import_react38.forwardRef)(
  ({ className, orientation = "horizontal", decorative = true, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(
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
var import_react39 = require("react");
var RadixDialog2 = __toESM(require("@radix-ui/react-dialog"), 1);
var import_lucide_react18 = require("lucide-react");

// components/v2/Sheet/sheet-variants.ts
var import_class_variance_authority8 = require("class-variance-authority");
var sheetVariants = (0, import_class_variance_authority8.cva)(
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
var import_jsx_runtime40 = require("react/jsx-runtime");
var Sheet = RadixDialog2.Root;
var SheetTrigger = RadixDialog2.Trigger;
var SheetClose = RadixDialog2.Close;
var SheetPortal = RadixDialog2.Portal;
var SheetOverlay = (0, import_react39.forwardRef)(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(
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
var SheetContent = (0, import_react39.forwardRef)(({ side, className, children, showClose = true, i18nStrings, ...props }, ref) => {
  const t = useComponentI18n("dialog", i18nStrings);
  return /* @__PURE__ */ (0, import_jsx_runtime40.jsxs)(SheetPortal, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(SheetOverlay, {}),
    /* @__PURE__ */ (0, import_jsx_runtime40.jsxs)(
      RadixDialog2.Content,
      {
        ref,
        className: cn(sheetVariants({ side }), "focus-visible:outline-none", className),
        ...props,
        children: [
          children,
          showClose && /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(
            RadixDialog2.Close,
            {
              className: cn(
                "absolute end-4 top-4 rounded-sm text-muted-foreground opacity-70",
                "transition-opacity hover:opacity-100",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                "disabled:pointer-events-none"
              ),
              "aria-label": t.closeLabel,
              children: /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(import_lucide_react18.X, { className: "size-4" })
            }
          )
        ]
      }
    )
  ] });
});
SheetContent.displayName = "SheetContent";
var SheetHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(
  "div",
  {
    className: cn("flex flex-col gap-1.5 text-center sm:text-start", className),
    ...props
  }
);
SheetHeader.displayName = "SheetHeader";
var SheetFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(
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
var SheetTitle = (0, import_react39.forwardRef)(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(
  RadixDialog2.Title,
  {
    ref,
    className: cn("text-lg font-semibold text-foreground", className),
    ...props
  }
));
SheetTitle.displayName = "SheetTitle";
var SheetDescription = (0, import_react39.forwardRef)(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(
  RadixDialog2.Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
SheetDescription.displayName = "SheetDescription";

// components/v2/Sidebar/Sidebar.tsx
var import_react41 = require("react");
var import_react_slot5 = require("@radix-ui/react-slot");
var import_lucide_react19 = require("lucide-react");

// components/v2/Tooltip/Tooltip.tsx
var import_react40 = require("react");
var RadixTooltip = __toESM(require("@radix-ui/react-tooltip"), 1);
var import_jsx_runtime41 = require("react/jsx-runtime");
var TooltipProvider = RadixTooltip.Provider;
var Tooltip2 = RadixTooltip.Root;
var TooltipTrigger = RadixTooltip.Trigger;
var TooltipContent = (0, import_react40.forwardRef)(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime41.jsx)(RadixTooltip.Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime41.jsx)(
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
var import_class_variance_authority9 = require("class-variance-authority");
var sidebarMenuButtonVariants = (0, import_class_variance_authority9.cva)(
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
var import_jsx_runtime42 = require("react/jsx-runtime");
var MOBILE_BREAKPOINT = 768;
var SidebarContext = (0, import_react41.createContext)(null);
function useSidebar() {
  const context = (0, import_react41.useContext)(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a <SidebarProvider>.");
  }
  return context;
}
function useIsMobile() {
  const [isMobile, setIsMobile] = (0, import_react41.useState)(false);
  (0, import_react41.useEffect)(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => setIsMobile(mql.matches);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);
  return isMobile;
}
var SidebarProvider = (0, import_react41.forwardRef)(
  ({
    defaultOpen = true,
    open: openProp,
    onOpenChange,
    className,
    children,
    ...props
  }, ref) => {
    const isMobile = useIsMobile();
    const [openMobile, setOpenMobile] = (0, import_react41.useState)(false);
    const [internalOpen, setInternalOpen] = (0, import_react41.useState)(defaultOpen);
    const open = openProp ?? internalOpen;
    const setOpen = (0, import_react41.useCallback)(
      (value) => {
        if (onOpenChange) onOpenChange(value);
        else setInternalOpen(value);
      },
      [onOpenChange]
    );
    const toggleSidebar = (0, import_react41.useCallback)(() => {
      if (isMobile) setOpenMobile((v) => !v);
      else setOpen(!open);
    }, [isMobile, open, setOpen]);
    const state = open ? "expanded" : "collapsed";
    const contextValue = (0, import_react41.useMemo)(
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
    return /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(SidebarContext.Provider, { value: contextValue, children: /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(
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
var Sidebar = (0, import_react41.forwardRef)(
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
      return /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(
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
      return /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(Sheet, { open: openMobile, onOpenChange: setOpenMobile, children: /* @__PURE__ */ (0, import_jsx_runtime42.jsxs)(
        SheetContent,
        {
          side,
          showClose: false,
          "data-slot": "sidebar",
          "data-sidebar": "sidebar",
          "data-mobile": "true",
          className: "w-72 gap-0 border-ext-sidebar-border bg-ext-sidebar-bg p-0 text-ext-sidebar-foreground sm:max-w-72",
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime42.jsxs)(SheetHeader, { className: "sr-only", children: [
              /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(SheetTitle, { children: "Sidebar" }),
              /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(SheetDescription, { children: "Application navigation." })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime42.jsx)("div", { className: "flex h-full w-full flex-col", children })
          ]
        }
      ) });
    }
    return /* @__PURE__ */ (0, import_jsx_runtime42.jsxs)(
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
          /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(
            "div",
            {
              className: cn(
                "relative h-svh w-64 bg-transparent transition-[width] duration-200 ease-linear",
                "group-data-[collapsible=offcanvas]:w-0",
                variant === "sidebar" ? "group-data-[collapsible=icon]:w-12" : "group-data-[collapsible=icon]:w-16"
              )
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(
            "div",
            {
              className: cn(
                "fixed inset-y-0 z-10 hidden h-svh w-64 transition-[left,right,width] duration-200 ease-linear md:flex",
                side === "left" ? "left-0 group-data-[collapsible=offcanvas]:-left-64" : "right-0 group-data-[collapsible=offcanvas]:-right-64",
                variant === "floating" || variant === "inset" ? "p-2 group-data-[collapsible=icon]:w-16" : "group-data-[collapsible=icon]:w-12",
                className
              ),
              ...props,
              children: /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(
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
var SidebarTrigger = (0, import_react41.forwardRef)(({ className, onClick, ...props }, ref) => {
  const { toggleSidebar } = useSidebar();
  return /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(
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
      children: /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(import_lucide_react19.PanelLeft, {})
    }
  );
});
SidebarTrigger.displayName = "SidebarTrigger";
var SidebarRail = (0, import_react41.forwardRef)(
  ({ className, ...props }, ref) => {
    const { toggleSidebar } = useSidebar();
    return /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(
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
var SidebarInset = (0, import_react41.forwardRef)(
  ({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(
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
var SidebarHeader = (0, import_react41.forwardRef)(
  ({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(
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
var SidebarFooter = (0, import_react41.forwardRef)(
  ({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(
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
var SidebarContent = (0, import_react41.forwardRef)(
  ({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(
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
var SidebarSeparator = (0, import_react41.forwardRef)(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(
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
var SidebarGroup = (0, import_react41.forwardRef)(
  ({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(
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
var SidebarGroupLabel = (0, import_react41.forwardRef)(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(
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
var SidebarGroupContent = (0, import_react41.forwardRef)(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(
  "div",
  {
    ref,
    "data-slot": "sidebar-group-content",
    className: cn("w-full text-sm", className),
    ...props
  }
));
SidebarGroupContent.displayName = "SidebarGroupContent";
var SidebarMenu = (0, import_react41.forwardRef)(
  ({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(
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
var SidebarMenuItem = (0, import_react41.forwardRef)(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(
  "li",
  {
    ref,
    "data-slot": "sidebar-menu-item",
    className: cn("group/menu-item relative", className),
    ...props
  }
));
SidebarMenuItem.displayName = "SidebarMenuItem";
var SidebarMenuButton = (0, import_react41.forwardRef)(
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
    const Comp = asChild ? import_react_slot5.Slot : "button";
    const button = /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(
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
    return /* @__PURE__ */ (0, import_jsx_runtime42.jsxs)(Tooltip2, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(TooltipTrigger, { asChild: true, children: button }),
      /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(
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
var SidebarMenuSub = (0, import_react41.forwardRef)(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(
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
var SidebarMenuSubButton = (0, import_react41.forwardRef)(
  ({ asChild = false, isActive = false, size = "md", className, ...props }, ref) => {
    const Comp = asChild ? import_react_slot5.Slot : "a";
    return /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(
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
var import_react42 = require("react");
var import_jsx_runtime43 = require("react/jsx-runtime");
var Skeleton = (0, import_react42.forwardRef)(
  ({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(
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
var import_sonner = require("sonner");
var import_jsx_runtime44 = require("react/jsx-runtime");
var Toaster = ({ ...props }) => /* @__PURE__ */ (0, import_jsx_runtime44.jsx)(
  import_sonner.Toaster,
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
var import_react43 = require("react");
var RadixSwitch = __toESM(require("@radix-ui/react-switch"), 1);
var import_jsx_runtime45 = require("react/jsx-runtime");
var Switch = (0, import_react43.forwardRef)(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime45.jsx)(
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
    children: /* @__PURE__ */ (0, import_jsx_runtime45.jsx)(
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
var import_react44 = require("react");
var RadixTabs = __toESM(require("@radix-ui/react-tabs"), 1);
var import_jsx_runtime46 = require("react/jsx-runtime");
var Tabs = RadixTabs.Root;
var TabsList = (0, import_react44.forwardRef)(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime46.jsx)(
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
var TabsTrigger = (0, import_react44.forwardRef)(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime46.jsx)(
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
var TabsContent = (0, import_react44.forwardRef)(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime46.jsx)(
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
var import_react45 = require("react");
var RadixToggle = __toESM(require("@radix-ui/react-toggle"), 1);

// components/v2/Toggle/toggle-variants.ts
var import_class_variance_authority10 = require("class-variance-authority");
var toggleVariants = (0, import_class_variance_authority10.cva)(
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
var import_jsx_runtime47 = require("react/jsx-runtime");
var Toggle = (0, import_react45.forwardRef)(({ className, variant, size, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime47.jsx)(
  RadixToggle.Root,
  {
    ref,
    className: cn(toggleVariants({ variant, size }), className),
    ...props
  }
));
Toggle.displayName = "Toggle";

// components/v2/ToggleGroup/ToggleGroup.tsx
var import_react46 = require("react");
var RadixToggleGroup = __toESM(require("@radix-ui/react-toggle-group"), 1);
var import_jsx_runtime48 = require("react/jsx-runtime");
var ToggleGroupContext = (0, import_react46.createContext)({
  variant: "default",
  size: "md"
});
var ToggleGroup = (0, import_react46.forwardRef)(({ className, variant, size, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime48.jsx)(
  RadixToggleGroup.Root,
  {
    ref,
    className: cn("flex items-center justify-center gap-1", className),
    ...props,
    children: /* @__PURE__ */ (0, import_jsx_runtime48.jsx)(ToggleGroupContext.Provider, { value: { variant, size }, children })
  }
));
ToggleGroup.displayName = "ToggleGroup";
var ToggleGroupItem = (0, import_react46.forwardRef)(({ className, variant, size, children, ...props }, ref) => {
  const ctx = (0, import_react46.useContext)(ToggleGroupContext);
  return /* @__PURE__ */ (0, import_jsx_runtime48.jsx)(
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
var import_react47 = require("react");
var import_react_slot6 = require("@radix-ui/react-slot");

// components/v2/Typography/typography-variants.ts
var import_class_variance_authority11 = require("class-variance-authority");
var typographyVariants = (0, import_class_variance_authority11.cva)("text-foreground", {
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
var import_jsx_runtime49 = require("react/jsx-runtime");
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
var Typography = (0, import_react47.forwardRef)(
  ({ className, variant = "body", asChild = false, ...props }, ref) => {
    const Comp = asChild ? import_react_slot6.Slot : variantElement[variant ?? "body"];
    return /* @__PURE__ */ (0, import_jsx_runtime49.jsx)(
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
var import_react48 = __toESM(require("react"), 1);
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
var import_react49 = require("react");
var import_jsx_runtime50 = require("react/jsx-runtime");
var BASE_CLASSES = "sr-only";
var VisuallyHidden = (0, import_react49.memo)(
  (0, import_react49.forwardRef)(
    ({ as = "span", children, className, ...rest }, ref) => {
      const Element = as;
      const classes = (0, import_react49.useMemo)(
        () => [BASE_CLASSES, className].filter(Boolean).join(" "),
        [className]
      );
      return /* @__PURE__ */ (0, import_jsx_runtime50.jsx)(Element, { ref, className: classes, ...rest, children });
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
var import_react50 = require("react");
function StructuredData({ data }) {
  const scriptRef = (0, import_react50.useRef)(null);
  (0, import_react50.useEffect)(() => {
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
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
  Label,
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
  Separator,
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
  Tooltip,
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
});
