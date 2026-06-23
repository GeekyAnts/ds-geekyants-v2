/**
 * Public API for Geeklego i18n.
 *
 * Consumers import the provider and its types from here:
 *   import { GeeklegoI18nProvider } from '../utils/i18n';
 *   import type { GeeklegoI18nStrings } from '../utils/i18n';
 *
 * The internal useComponentI18n hook is NOT exported here — it is for
 * Geeklego component internals only and is imported via relative path.
 */

export { GeeklegoI18nProvider } from './GeeklegoI18nProvider';
export type { GeeklegoI18nProviderProps } from './GeeklegoI18nProvider';

export type {
  GeeklegoI18nStrings,
  GeeklegoFormatters,
  GeeklegoI18nContextValue,
  LabelI18nStrings,
  DialogI18nStrings,
  PopoverI18nStrings,
  DropdownMenuI18nStrings,
  ComboboxI18nStrings,
  CommandI18nStrings,
  AccordionI18nStrings,
  SelectI18nStrings,
} from './GeeklegoI18nProvider.types';
