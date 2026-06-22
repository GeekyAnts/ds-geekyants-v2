/** @type {import('stylelint').Config} */
export default {
  // v2 is 2-tier (primitives → standard ShadCN semantics) with NO component-token
  // tier, so the old `geeklego/no-tier1-in-component-tokens` tier-guard no longer
  // applies. `lint-css` now lints the v2 design system (design-system/v2/**/*.css).
  rules: {},
};
