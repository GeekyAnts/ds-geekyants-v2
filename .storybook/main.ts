import type { StorybookConfig } from '@storybook/react-vite';
import type { InlineConfig } from 'vite';

const config: StorybookConfig = {
  // v2 only — render the ShadCN/Radix slice under components/v2/.
  // Legacy stories/** (broken Configure.mdx + 3-tier DesignSystem) and the
  // editor-ds stories under app/** are intentionally not globbed.
  stories: [
    "../components/v2/**/*.stories.@(ts|tsx)",
  ],
  addons: [
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
  ],
  framework: "@storybook/react-vite",
  viteFinal: async (config: InlineConfig) => {
    // Remove token-editor's 'root: app' so Storybook resolves from project root
    delete config.root;

    // Pre-bundle the component-layer deps at startup. Without this, Vite
    // transforms the Radix/cmdk dependency chain LAZILY the first time a given
    // component is opened — a ~1s+ main-thread stall that reads as "Storybook
    // froze when I opened the Combobox/Select/Dialog". Listing them in
    // optimizeDeps.include moves that cost to server boot (once), so every
    // first-interaction is instant. (Pure dev-server fix; no effect on the
    // production build, which already bundles everything ahead of time.)
    config.optimizeDeps = {
      ...config.optimizeDeps,
      include: [
        ...(config.optimizeDeps?.include ?? []),
        "react",
        "react-dom",
        "react-dom/client",
        "@radix-ui/react-slot",
        "@radix-ui/react-dialog",
        "@radix-ui/react-popover",
        "@radix-ui/react-select",
        "@radix-ui/react-dropdown-menu",
        "@radix-ui/react-accordion",
        "@radix-ui/react-label",
        "cmdk",
        "class-variance-authority",
        "clsx",
        "tailwind-merge",
        "lucide-react",
      ],
    };

    return config;
  }
};
export default config;
