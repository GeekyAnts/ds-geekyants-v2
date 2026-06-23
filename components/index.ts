// ─── GeekLego barrel ──────────────────────────────────────────────────────────
//
// The old 3-tier component exports (atoms/molecules/organisms) and the
// component catalog were removed in the v2 2-tier cut (see PROTOTYPE-SHADCN-2TIER.md
// §7.5). v2 components live under components/v2/<Name>/ and are re-exported below
// as the package's published surface.
//
// This barrel exports two groups: the v2 components, and the shared utility
// modules kept per §5 (pending a Radix audit — Radix may make some of the
// keyboard/a11y hooks redundant as v2 grows).

// ─── v2 components (the published surface) ──────────────────────────────────────
// Re-exported so `pnpm build` bundles them into dist/index.js — without this a
// consuming app cannot `import { Button } from "@scope/pkg"`. Every new component
// built via component-builder-v2 (Phase 3.5) must be added here. `export *` picks
// up compound sub-parts (DialogTrigger, etc.) in one line.
export * from './v2/Accordion/Accordion';
export type * from './v2/Accordion/Accordion.types';
export * from './v2/Button/Button';
export type * from './v2/Button/Button.types';
export * from './v2/Combobox/Combobox';
export type * from './v2/Combobox/Combobox.types';
export * from './v2/Command/Command';
export type * from './v2/Command/Command.types';
export * from './v2/Dialog/Dialog';
export type * from './v2/Dialog/Dialog.types';
export * from './v2/DropdownMenu/DropdownMenu';
export type * from './v2/DropdownMenu/DropdownMenu.types';
export * from './v2/Input/Input';
export type * from './v2/Input/Input.types';
export * from './v2/Label/Label';
export type * from './v2/Label/Label.types';
export * from './v2/Popover/Popover';
export type * from './v2/Popover/Popover.types';
export * from './v2/Select/Select';
export type * from './v2/Select/Select.types';

// NOTE: the hand-rolled keyboard hooks (useFocusTrap/useEscapeDismiss/
// useClickOutside/useRovingTabindex/useSingleSelectGroup) were removed in the
// v2 cleanup — Radix Dialog/Popover + cmdk provide that behavior natively
// (PROTOTYPE-SHADCN-2TIER.md §5 audit; Step 4 verdict on Radix redundancy).

// Accessibility helpers
export {
  getDisclosureProps,
  getNavigationItemProps,
  getLiveRegionProps,
  getLoadingProps,
  getDisabledProps,
  getErrorFieldProps,
  getIconProps,
} from './utils/accessibility/aria-helpers';
export type * from './utils/accessibility/aria-types';
export * from './utils/accessibility/VisuallyHidden';
export type * from './utils/accessibility/VisuallyHidden.types';

// Security utilities
export { sanitizeHref, getSafeExternalLinkProps } from './utils/security/sanitize';
export type { SafeExternalLinkProps, UnsafeProtocol } from './utils/security/sanitize.types';

// i18n
export { GeeklegoI18nProvider } from './utils/i18n/GeeklegoI18nProvider';
export type { GeeklegoI18nProviderProps } from './utils/i18n/GeeklegoI18nProvider';
export type {
  GeeklegoI18nStrings,
  NavbarI18nStrings,
  FooterI18nStrings,
  GeeklegoFormatters,
  GeeklegoI18nContextValue,
  LabelI18nStrings,
  AvatarI18nStrings,
  RatingI18nStrings,
  BreadcrumbI18nStrings,
  SidebarI18nStrings,
  BarChartI18nStrings,
  AreaChartI18nStrings,
  FileInputI18nStrings,
  SearchBarI18nStrings,
  AlertBannerI18nStrings,
  TooltipI18nStrings,
  PaginationI18nStrings,
  ToastI18nStrings,
  PopoverI18nStrings,
  ComboboxI18nStrings,
  ChipI18nStrings,
  FieldsetI18nStrings,
  StepperI18nStrings,
  HeaderI18nStrings,
  ModalI18nStrings,
  DrawerI18nStrings,
  AccordionI18nStrings,
  TabsI18nStrings,
  DataTableI18nStrings,
  ColorPickerI18nStrings,
  CarouselI18nStrings,
  CalendarI18nStrings,
} from './utils/i18n/GeeklegoI18nProvider.types';

// StructuredData
export * from './utils/StructuredData/StructuredData';
export type * from './utils/StructuredData/StructuredData.types';
