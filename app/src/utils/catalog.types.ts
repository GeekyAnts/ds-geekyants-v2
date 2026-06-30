// Shape of an entry in `app/src/generated/catalog.json`, produced by
// `scripts/generate-catalog.ts`. Kept app-side (no Node deps) so views and
// utils can type the imported JSON without pulling in the generator.
export interface CatalogEntry {
  /** Component name as it appears in the story title, e.g. "Button", "InputOTP". */
  name: string
  /** Storybook story-id prefix, e.g. "v2-button" (title lowercased, "/" → "-"). */
  storyIdPrefix: string
  /** Story rendered in the gallery card by default (prefers "Default"). */
  defaultStory: string
  /** All named story exports found in the file, in source order. */
  stories: string[]
}
