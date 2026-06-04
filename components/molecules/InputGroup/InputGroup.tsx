"use client"
import { forwardRef, memo, useMemo, isValidElement, Children } from 'react';
import { Input } from '../../atoms/Input/Input';
import { useComponentI18n } from '../../utils/i18n/useGeeklegoI18n';
import type {
  InputGroupProps,
  InputGroupInputProps,
  InputGroupAddonProps,
  InputGroupButtonProps,
  InputGroupAddonAlign,
  InputGroupComponent,
} from './InputGroup.types';

// ── Slot type markers — parent uses these to classify children ────────────────
const SLOT_INPUT = 'input-group-input';
const SLOT_ADDON = 'input-group-addon';
const SLOT_BUTTON = 'input-group-button';

// ── Group container variant classes ──────────────────────────────────────────

const groupVariantClasses: Record<string, string> = {
  default: [
    'bg-[var(--input-group-bg)] border border-[var(--input-group-border)]',
    'hover:bg-[var(--input-group-bg-hover)] hover:border-[var(--input-group-border-hover)]',
    'focus-within:border-[var(--input-group-border-focus)]',
  ].join(' '),
  filled: [
    'bg-[var(--input-group-addon-bg)] border border-transparent',
    'hover:bg-[var(--input-group-bg-hover)]',
    'focus-within:bg-[var(--input-group-bg)] focus-within:border-[var(--input-group-border-focus)]',
  ].join(' '),
  flushed: [
    'bg-transparent border-0 border-b border-[var(--input-group-border)] rounded-none',
    'hover:border-[var(--input-group-border-hover)]',
    'focus-within:border-[var(--input-group-border-focus)]',
  ].join(' '),
  unstyled: 'bg-transparent border-0',
};

const groupErrorClasses: Record<string, string> = {
  default: [
    'bg-[var(--input-group-bg)] border border-[var(--input-group-border-error)]',
    'hover:bg-[var(--input-group-bg-hover)]',
    'focus-within:border-[var(--input-group-border-error)]',
  ].join(' '),
  filled: [
    'bg-[var(--input-group-addon-bg)] border border-[var(--input-group-border-error)]',
    'hover:bg-[var(--input-group-bg-hover)]',
    'focus-within:bg-[var(--input-group-bg)] focus-within:border-[var(--input-group-border-error)]',
  ].join(' '),
  flushed: [
    'bg-transparent border-0 border-b border-[var(--input-group-border-error)] rounded-none',
    'focus-within:border-[var(--input-group-border-error)]',
  ].join(' '),
  unstyled: 'bg-transparent border-0',
};

const groupDisabledClasses =
  'bg-[var(--input-group-bg-disabled)] border border-[var(--input-group-border-disabled)] cursor-not-allowed';

// ── Size map ──────────────────────────────────────────────────────────────────

const groupHeightClasses: Record<string, string> = {
  sm: 'h-[var(--input-height-sm)]',
  md: 'h-[var(--input-height-md)]',
  lg: 'h-[var(--input-height-lg)]',
};

const addonPxClasses: Record<string, string> = {
  sm: 'px-[var(--input-group-addon-px-sm)]',
  md: 'px-[var(--input-group-addon-px-md)]',
  lg: 'px-[var(--input-group-addon-px-lg)]',
};

// ── Addon flex order by alignment ─────────────────────────────────────────────

const addonOrderClasses: Record<InputGroupAddonAlign, string> = {
  'inline-start': 'order-0',
  'inline-end': 'order-20',
  'block-start': 'order-0',
  'block-end': 'order-20',
};

function addonEdgeClasses(align: InputGroupAddonAlign): string {
  switch (align) {
    case 'inline-start':
      return 'border-e border-[var(--input-group-addon-border)] rounded-s-none';
    case 'inline-end':
      return 'border-s border-[var(--input-group-addon-border)] rounded-e-none';
    case 'block-start':
      return 'border-b border-[var(--input-group-addon-border)] rounded-t-none';
    case 'block-end':
      return 'border-t border-[var(--input-group-addon-border)] rounded-b-none';
  }
}

// ── InputGroup.Input slot ─────────────────────────────────────────────────────

const InputSlot = memo(forwardRef<HTMLInputElement, InputGroupInputProps>(
  ({ className, ...rest }, ref) => (
    <Input
      ref={ref}
      variant="unstyled"
      wrapperClassName="content-flex h-full"
      className={['content-flex h-full', className].filter(Boolean).join(' ')}
      {...rest}
    />
  ),
));
InputSlot.displayName = 'InputGroup.Input';
(InputSlot as any).__inputGroupSlot = SLOT_INPUT;

// ── InputGroup.Addon slot ─────────────────────────────────────────────────────

const AddonSlot = memo(forwardRef<HTMLDivElement, InputGroupAddonProps>(
  ({ align = 'inline-start', className, children, ...rest }, ref) => {
    const classes = useMemo(() => [
      'flex shrink-0 items-center self-stretch',
      addonPxClasses['md'],
      'text-[var(--input-group-addon-text)]',
      'bg-[var(--input-group-addon-bg)]',
      addonEdgeClasses(align),
      addonOrderClasses[align],
      className,
    ].filter(Boolean).join(' '), [align, className]);

    return (
      <div ref={ref} data-slot="input-group-addon" className={classes} {...rest}>
        {children}
      </div>
    );
  },
));
AddonSlot.displayName = 'InputGroup.Addon';
(AddonSlot as any).__inputGroupSlot = SLOT_ADDON;

// ── InputGroup.Button slot ────────────────────────────────────────────────────
// Renders a raw <button> that fuses visually with the group boundary.
// Transparent bg, group text color, only the inner edge is modified
// (clipped radius + separator border). No Button atom variant baggage.

const buttonPxClasses: Record<string, string> = {
  sm: 'px-[var(--input-group-button-px-sm)]',
  md: 'px-[var(--input-group-button-px-md)]',
  lg: 'px-[var(--input-group-button-px-lg)]',
};

const ButtonSlot = memo(forwardRef<HTMLButtonElement, InputGroupButtonProps>(
  ({ size = 'md', className, children, disabled, ...rest }, ref) => {
    const classes = useMemo(() => [
      'flex shrink-0 items-center justify-center gap-[var(--input-group-button-gap)]',
      'self-stretch',
      buttonPxClasses[size],
      'text-body-sm',
      'bg-[var(--input-group-button-bg)]',
      'text-[var(--input-group-button-text)]',
      'border-s border-[var(--input-group-button-border-inline)]',
      'rounded-ss-none rounded-es-none',
      'transition-default',
      'focus-visible:outline-none focus-visible:focus-ring',
      'hover:bg-[var(--input-group-button-bg-hover)] hover:text-[var(--input-group-button-text-hover)] hover:border-[var(--input-group-button-border-inline-hover)]',
      'active:bg-[var(--input-group-button-bg-active)]',
      disabled
        ? 'bg-[var(--input-group-button-bg-disabled)] text-[var(--input-group-button-text-disabled)] border-[var(--input-group-button-border-inline-disabled)] cursor-not-allowed pointer-events-none'
        : '',
      className,
    ].filter(Boolean).join(' '), [size, className, disabled]);

    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled}
        aria-disabled={disabled || undefined}
        data-slot="input-group-button"
        className={classes}
        {...rest}
      >
        {children}
      </button>
    );
  },
));
ButtonSlot.displayName = 'InputGroup.Button';
(ButtonSlot as any).__inputGroupSlot = SLOT_BUTTON;

// ── Slot classifier ───────────────────────────────────────────────────────────

interface ClassifiedChild {
  type: 'input' | 'addon' | 'button' | 'unknown';
  element: React.ReactElement;
  key: string | null;
  ref: React.Ref<any> | null;
}

function classifyChildren(children: React.ReactNode): ClassifiedChild[] {
  const result: ClassifiedChild[] = [];
  Children.forEach(children, (child) => {
    if (!isValidElement(child)) return;
    const el = child as React.ReactElement;
    const comp = el.type as any;
    const slot = comp?.__inputGroupSlot;
    const ref = (el as any).ref ?? null;
    if (slot === SLOT_INPUT) result.push({ type: 'input', element: el, key: el.key, ref });
    else if (slot === SLOT_ADDON) result.push({ type: 'addon', element: el, key: el.key, ref });
    else if (slot === SLOT_BUTTON) result.push({ type: 'button', element: el, key: el.key, ref });
    else result.push({ type: 'unknown', element: el, key: el.key, ref });
  });
  return result;
}

// ── InputGroup root ──────────────────────────────────────────────────────────

// ── Public export with static slot properties ─────────────────────────────────

export const InputGroup = Object.assign(
  memo(forwardRef<HTMLDivElement, InputGroupProps>(
    (
      {
        variant = 'default',
        size = 'md',
        error = false,
        loading = false,
        disabled,
        className,
        'aria-label': ariaLabel,
        i18nStrings,
        children,
        ...rest
      },
      ref,
    ) => {
      const i18n = useComponentI18n('inputGroup', i18nStrings);
      const isDisabled = disabled || loading;
      const classified = useMemo(() => classifyChildren(children), [children]);

      const groupClasses = useMemo(() => [
        'relative flex items-center w-full transition-default overflow-hidden',
        variant !== 'flushed' ? 'rounded-[var(--input-group-radius)]' : '',
        groupHeightClasses[size],
        isDisabled
          ? groupDisabledClasses
          : error
            ? groupErrorClasses[variant]
            : groupVariantClasses[variant],
        className,
      ].filter(Boolean).join(' '), [variant, size, isDisabled, error, className]);

      const addonPx = addonPxClasses[size];

      return (
        <div
          ref={ref}
          role="group"
          aria-label={ariaLabel}
          aria-disabled={isDisabled || undefined}
          className={groupClasses}
          {...rest}
        >
          {classified.map(({ type, element, key }, index) => {
          if (type === 'input') {
            const props = (element as React.ReactElement<InputGroupInputProps>).props;
            const { className: inputClassName, placeholder: inputPlaceholder, disabled: inputDisabled, ...inputRest } = props;
            return (
              <Input
                key={key ?? 'input'}
                ref={ref as React.Ref<HTMLInputElement>}
                variant="unstyled"
                size={size}
                wrapperClassName="content-flex h-full"
                className={['content-flex h-full', inputClassName].filter(Boolean).join(' ')}
                placeholder={inputPlaceholder ?? i18n.placeholder}
                disabled={isDisabled || inputDisabled}
                {...inputRest}
              />
            );
          }

            if (type === 'addon') {
              const props = (element as React.ReactElement<InputGroupAddonProps>).props;
              const { align: addonAlign, className: addonClassName, children: addonChildren, ...addonRest } = props;
              const align = addonAlign ?? 'inline-start';
              return (
                <div
                  key={key ?? 'addon'}
                  data-slot="input-group-addon"
                  className={[
                    'flex shrink-0 items-center self-stretch',
                    addonPx,
                    'text-[var(--input-group-addon-text)]',
                    'bg-[var(--input-group-addon-bg)]',
                    addonEdgeClasses(align),
                    addonOrderClasses[align],
                    addonClassName,
                  ].filter(Boolean).join(' ')}
                  {...addonRest}
                >
                  {addonChildren}
                </div>
              );
            }

            if (type === 'button') {
              const props = (element as React.ReactElement<InputGroupButtonProps>).props;
              const { size: btnSize, className: btnClassName, children: btnChildren, disabled: btnDisabled, ...btnRest } = props;
              return (
                <button
                  key={key ?? 'button'}
                  ref={ref as React.Ref<HTMLButtonElement>}
                  type="button"
                  disabled={isDisabled || btnDisabled}
                  aria-disabled={(isDisabled || btnDisabled) || undefined}
                  data-slot="input-group-button"
                  className={[
                    'flex shrink-0 items-center justify-center gap-[var(--input-group-button-gap)]',
                    'self-stretch',
                    buttonPxClasses[btnSize ?? size],
                    'text-body-sm',
                    'bg-[var(--input-group-button-bg)]',
                    'text-[var(--input-group-button-text)]',
                    'border-s border-[var(--input-group-button-border-inline)]',
                    'rounded-ss-none rounded-es-none',
                    'transition-default',
                    'focus-visible:outline-none focus-visible:focus-ring',
                    'hover:bg-[var(--input-group-button-bg-hover)] hover:text-[var(--input-group-button-text-hover)] hover:border-[var(--input-group-button-border-inline-hover)]',
                    'active:bg-[var(--input-group-button-bg-active)]',
                    (isDisabled || btnDisabled)
                      ? 'bg-[var(--input-group-button-bg-disabled)] text-[var(--input-group-button-text-disabled)] border-[var(--input-group-button-border-inline-disabled)] cursor-not-allowed pointer-events-none'
                      : '',
                    btnClassName,
                  ].filter(Boolean).join(' ')}
                  {...btnRest}
                >
                  {btnChildren}
                </button>
              );
            }

            // Unknown child — render as-is
            return <span key={key ?? `unknown-${index}`}>{element}</span>;
          })}
        </div>
      );
    },
  )),
  {
    Input: InputSlot,
    Addon: AddonSlot,
    Button: ButtonSlot,
  },
);
InputGroup.displayName = 'InputGroup';

// Named exports for MDX compound slot registration
export const InputGroupInput = InputSlot;
export const InputGroupAddon = AddonSlot;
export const InputGroupButton = ButtonSlot;
