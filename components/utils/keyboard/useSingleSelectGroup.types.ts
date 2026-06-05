export interface UseSingleSelectGroupOptions<T extends string> {
  options: readonly { value: T; disabled?: boolean }[];
  value?: T;
  defaultValue: T;
  onChange?: (value: T) => void;
}

export interface SingleSelectGroupReturn<T extends string> {
  containerProps: {
    role: 'group';
    onKeyDown: (e: React.KeyboardEvent) => void;
  };
  getSegmentProps: (index: number) => {
    ref: (el: HTMLButtonElement | null) => void;
    tabIndex: 0 | -1;
    'aria-pressed': boolean;
    onClick: () => void;
  };
  selectedValue: T;
}
