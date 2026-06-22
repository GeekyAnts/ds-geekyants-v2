# Screenshot Workflow

## Foundation

This skill automates visual verification of Geeklego components by capturing screenshots from Storybook via Playwright, analyzing them for design issues, and iterating until the component looks production-grade.

**When to use this skill:** After creating or modifying any component, after changing design tokens, or whenever visual verification is needed. Use it as part of Phase 4 (Verify) of the `component-builder-v2` skill, or standalone when debugging visual issues.

**Prerequisites:**
- Playwright is installed (`playwright` in devDependencies)
- Storybook is configured (`.storybook/`, globbed to `components/v2/**`)
- Component has v2 stories (`Default`, `Variants`, `Sizes`, states, each `--ext-*` variant,
  `asChild` if applicable, `DarkMode`) — see `components/v2/Button/Button.stories.tsx`. There is
  no fixed story count; cover what the component has.

---

## Workflow — Capture, Analyze, Fix, Verify

```
Step 1 — Ensure Storybook is running
Step 2 — Discover story IDs for the target component
Step 3 — Capture screenshots of all stories
Step 4 — Analyze screenshots for design issues
Step 5 — Fix issues found
Step 6 — Recapture and verify (max 3 iterations)
```

---

## Step 1 — Ensure Storybook is Running

Check if Storybook is already serving. Try common ports in order:

```bash
curl -s http://localhost:6006 > /dev/null 2>&1 && echo "running:6006" || \
curl -s http://localhost:6007 > /dev/null 2>&1 && echo "running:6007" || \
curl -s http://localhost:6008 > /dev/null 2>&1 && echo "running:6008" || \
echo "not running"
```

If not running, start it in the background:

```bash
npm run storybook -- --port 6006 --no-open &
```

Wait for Storybook to be ready before proceeding (poll with `curl` every 3 seconds, max 60 seconds).

---

## Step 2 — Discover Story IDs

Query the Storybook index to find all stories for the target component:

```bash
curl -s http://localhost:<PORT>/index.json | python3 -c "
import sys, json
d = json.load(sys.stdin)
entries = d.get('entries', d.get('v', {}))
component = '<component-name-lowercase>'
stories = [k for k in entries.keys() if component in k.lower()]
for s in stories:
    print(s)
"
```

v2 story IDs are derived from the `title: "v2/<Name>"` meta, so they are prefixed `v2-<name>--`:
- `v2-<name>--default`
- `v2-<name>--variants`
- `v2-<name>--sizes`
- `v2-<name>--disabled` (or other state stories)
- `v2-<name>--dark-mode`

Plus any custom variant stories (e.g. `--gamified` for the Button `--ext-*` canary) and
`--as-child-link` where applicable. The set is per-component — discover it from `index.json`
rather than assuming a fixed count.

---

## Step 3 — Capture Screenshots

Use a single Playwright script to capture all stories. This avoids the overhead of launching a new browser for each story.

```javascript
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 800, height: 900 } });
  const port = <PORT>;
  const stories = [<STORY_IDS>];  // array of story IDs
  const outDir = '/tmp/screenshots/<component>';

  for (const story of stories) {
    const url = `http://localhost:${port}/iframe.html?id=${story}&viewMode=story`;
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);  // allow animations to settle
    await page.screenshot({
      path: `${outDir}/${story}.png`,
      fullPage: true
    });
    console.log(`captured: ${story}`);
  }

  await browser.close();
})();
```

Run the script:
```bash
mkdir -p /tmp/screenshots/<component>
node -e "<script>"
```

The `waitForTimeout(2000)` is important — Storybook iframes need time to hydrate after `networkidle`. For the first screenshot in a session, use 3000ms since Storybook's initial load is slower.

---

## Step 4 — Analyze Screenshots

Read each screenshot using the Read tool and check for these issues:

### Design Quality Checklist

**Layout & Spacing**
- [ ] Content is properly aligned (not floating off-center)
- [ ] Internal spacing feels balanced (padding, gaps)
- [ ] Title and description have correct visual hierarchy
- [ ] Media/content/actions are properly distributed across the row
- [ ] No unexpected overflow or clipping

**Typography**
- [ ] Title text is visibly bolder/heavier than description
- [ ] Text sizes feel proportional to the component size
- [ ] Text is not truncated when it shouldn't be (or is truncated when it should be)

**Visual Variants**
- [ ] Each variant is visually distinct at a glance
  - Default: has visible background fill
  - Outlined: has visible border, different from default
  - Elevated: has visible shadow, lifts from surface
  - Ghost: appears transparent/minimal
- [ ] Variants use different visual strategies (not just color shifts)

**States**
- [ ] Disabled state is visibly muted (reduced opacity/contrast)
- [ ] Selected state is clearly highlighted
- [ ] Loading skeleton maintains component dimensions
- [ ] Skeleton animation placeholders are visible

**Theme Verification**
- [ ] Dark mode: text is readable against dark background
- [ ] Dark mode: borders are visible (not same shade as background)
- [ ] Dark mode: shadows are perceptible
- [ ] All themes produce visibly different results

**Component Integrity**
- [ ] All expected slots are rendering (media, title, description, actions)
- [ ] Icons are properly sized and colored
- [ ] Border radius is consistent across variants
- [ ] Component fills expected width

### Common Issues to Watch For

| Symptom | Likely Cause | Fix |
|---------|-------------|-----|
| Invisible text on dark bg | Semantic resolving to same shade | Check the dark overrides in `design-system/v2/themes/dark.css` (`--foreground`, `--muted-foreground`) |
| No visible border on outline variant | `--border`/`--input` too subtle | Check `--border` / `--input` semantic (and its dark override) |
| Shadow invisible in dark | Shadow color too light for dark bg | Adjust the `--ext-*` shadow token or its dark override |
| Component too narrow/short | Wrong size class | Check the `size` variant classes in `<name>-variants.ts` |
| Variants look identical | Same visual strategy | Ensure variants use distinct semantics (`bg-primary` vs `bg-secondary` vs `border-input`) |
| Custom variant unthemed | `--ext-*` token wrong | Check the `--ext-<component>-<variant>-*` block in `design-system/v2/semantics.css` |

---

## Step 5 — Fix Issues

When issues are found:

1. **Semantic/theme issues** → Edit `design-system/v2/semantics.css` (semantics + `--ext-*`) or
   `design-system/v2/themes/dark.css` (dark overrides). Never edit the stale 3-tier
   `design-system/geeklego.css`.
2. **Variant/class issues** → Edit the component `<name>-variants.ts` (or `.tsx`) file
3. **Story issues** → Edit the `.stories.tsx` file

After fixing, proceed to Step 6.

---

## Step 6 — Recapture and Verify

After fixing issues, recapture the affected screenshots and re-analyze. Maximum 3 iterations before presenting to the user for feedback.

Each iteration:
1. Recapture only the stories affected by changes
2. Re-read the screenshots
3. Check if the specific issue is resolved
4. Check for regressions in other stories

When satisfied (or after 3 iterations), present a summary:

```
## Visual Verification Summary

**Component:** [name]
**Stories captured:** [count]
**Iterations:** [N]

### Issues found and fixed:
- [issue 1] → [fix applied]
- [issue 2] → [fix applied]

### Remaining concerns:
- [any unresolved items for user review]
```

---

## Viewport Sizes

Use these viewport sizes based on what you're capturing:

| Context | Width | Height | When to use |
|---------|-------|--------|-------------|
| Component stories | 800 | 900 | Default for all component screenshots |
| Wide components | 1200 | 900 | Tables, headers, full-width layouts |
| Mobile preview | 375 | 812 | Responsive testing |

---

## Integration with Component Builder

When used as part of the **`component-builder-v2`** skill's Phase 4 (Verify):

1. After writing the v2 component files (`<Name>.tsx`, `.types.ts`, `<name>-variants.ts`,
   `.stories.tsx`), run this screenshot workflow
2. Capture all of the component's `v2-<name>--*` stories (discover them from `index.json`)
3. Analyze against the design quality checklist — in particular confirm the semantic chain
   themes correctly in `DarkMode` (both `data-theme="dark"` and `.dark`)
4. Fix any issues found before presenting the component as complete

This replaces the manual "eyeball check" in the verification checklist with automated visual capture and AI analysis.

---

## Quick Reference — Single Component Screenshot

For a fast single-story capture (e.g., during iterative debugging):

```bash
node -e "
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 800, height: 900 } });
  await page.goto('http://localhost:<PORT>/iframe.html?id=<STORY_ID>&viewMode=story', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: '/tmp/<name>.png', fullPage: true });
  await browser.close();
})();
"
```

Then read the screenshot with the Read tool to analyze it visually.
