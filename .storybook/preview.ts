import type { Preview, Decorator } from '@storybook/react-vite';
import { createElement } from 'react';

// v2 2-tier design system (primitives → ShadCN semantics → dark theme).
// This is the only stylesheet Storybook loads; the dead 3-tier geeklego.css
// is not imported here.
import '../design-system/v2/index.css';

// ─── Dark-mode toggle ─────────────────────────────────────────────────────────
// A toolbar control flips the theme. The decorator sets BOTH selectors the v2
// themes/dark.css overrides target — `data-theme="dark"` and the `.dark` class —
// so semantics re-theme live (CLAUDE.md dual-selector convention).
const withTheme: Decorator = (Story, context) => {
  const theme = context.globals.theme === 'dark' ? 'dark' : 'light';
  return createElement(
    'div',
    {
      'data-theme': theme,
      className: theme === 'dark' ? 'dark' : undefined,
      style: { background: 'var(--background)', color: 'var(--foreground)', padding: '1.5rem' },
    },
    createElement(Story),
  );
};

const preview: Preview = {
  decorators: [withTheme],
  globalTypes: {
    theme: {
      description: 'Light / dark theme',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { theme: 'light' },
  parameters: {
    // Stop Storybook's manager-level keyboard shortcuts (single keys like
    // '/', 'A', 'D', arrows, …) from swallowing keystrokes meant for the
    // component under test — otherwise Radix keyboard nav (DropdownMenu arrow
    // nav, typeahead, Esc) appears "broken" inside the canvas.
    options: {
      enableShortcuts: false,
    },
    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
    viewport: {
      viewports: {
        mobile:  { name: 'Mobile',  styles: { width: '375px',  height: '812px' } },
        tablet:  { name: 'Tablet',  styles: { width: '768px',  height: '1024px' } },
        desktop: { name: 'Desktop', styles: { width: '1280px', height: '800px' } },
        wide:    { name: 'Wide',    styles: { width: '1536px', height: '900px' } },
      },
    },
  },
};

export default preview;
