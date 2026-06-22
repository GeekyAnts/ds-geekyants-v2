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
    return config;
  }
};
export default config;
