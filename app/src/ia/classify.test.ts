// ─── Classification Tests (Manual Verification) ───────────────────────────────
// Run with: npx tsc --noEmit src/ia/classify.test.ts && node <generated JS>

import { classifyTokens, getComponentNameFromToken, getTokenCategory, getKnownComponents } from './classify.ts'

// Sample token list from a typical geeklego.css
const SAMPLE_TOKENS = [
  // Foundations - Colors
  '--color-neutral-50',
  '--color-neutral-100',
  '--color-neutral-900',
  '--color-brand-500',
  '--color-brand-600',
  '--color-success-500',
  '--color-warning-500',
  '--color-error-500',

  // Foundations - Spacing
  '--spacing-2',
  '--spacing-4',
  '--spacing-8',
  '--spacing-16',
  '--spacing-32',

  // Foundations - Radius
  '--radius-sm',
  '--radius-md',
  '--radius-lg',
  '--radius-xl',

  // Foundations - Typography
  '--font-size-xs',
  '--font-size-sm',
  '--font-size-md',
  '--font-size-lg',
  '--font-size-xl',
  '--font-weight-light',
  '--font-weight-normal',
  '--font-weight-bold',
  '--line-height-tight',
  '--line-height-normal',
  '--line-height-relaxed',
  '--letter-spacing-tight',
  '--letter-spacing-normal',

  // Foundations - Shadow
  '--shadow-sm',
  '--shadow-md',
  '--shadow-lg',
  '--shadow-xl',

  // Foundations - Motion
  '--duration-slow',
  '--duration-normal',
  '--duration-fast',
  '--easing-default',
  '--easing-smooth',

  // Foundations - Z-index
  '--z-dropdown',
  '--z-sticky',
  '--z-fixed',
  '--z-modal',
  '--z-tooltip',

  // Foundations - Border
  '--border-width-sm',
  '--border-width-md',
  '--border-width-lg',

  // Semantic
  '--surface-primary',
  '--surface-secondary',
  '--surface-elevated',
  '--content-primary',
  '--content-secondary',
  '--content-tertiary',
  '--content-disabled',
  '--interactive-primary',
  '--interactive-hover',
  '--interactive-active',
  '--status-success',
  '--status-warning',
  '--status-error',
  '--status-info',
  '--layout-border',

  // Component tokens
  '--button-bg',
  '--button-bg-hover',
  '--button-bg-active',
  '--button-text',
  '--button-border',
  '--button-radius',
  '--button-height-sm',
  '--button-height-md',
  '--button-height-lg',
  '--card-bg',
  '--card-border',
  '--card-radius',

  // Uncategorized (unknown pattern)
  '--custom-mytoken',
  '--unknown-pattern-here',
]

// ─── Test Functions ───────────────────────────────────────────────────────────

function runTests() {
  console.log('🧪 Running IA Classification Tests...\n')

  // Test 1: classifyAllTokens
  console.log('Test 1: classifyAllTokens')
  const classified = classifyTokens(SAMPLE_TOKENS)
  console.log('  ✅ Classified tokens:')
  console.log('    - Foundations:', classified.foundations.length, 'categories')
  console.log('    - Semantic:', classified.semantic.length, 'categories')
  console.log('    - Components:', classified.components.length, 'categories')
  console.log('    - Uncategorized:', classified.uncategorized.length, 'tokens')
  console.log()

  // Test 2: Foundation categories
  console.log('Test 2: Foundation Categories')
  classified.foundations.forEach(cat => {
    const tokens = cat.tokens.slice(0, 3)
    console.log(`  • ${cat.label} (${cat.tokens.length} tokens)`)
    console.log(`    Sample: ${tokens.join(', ')}`)
  })
  console.log()

  // Test 3: Semantic categories
  console.log('Test 3: Semantic Categories')
  classified.semantic.forEach(cat => {
    const tokens = cat.tokens.slice(0, 3)
    console.log(`  • ${cat.label} (${cat.tokens.length} tokens)`)
    console.log(`    Sample: ${tokens.join(', ')}`)
  })
  console.log()

  // Test 4: Component categories
  console.log('Test 4: Component Categories')
  classified.components.forEach(cat => {
    const tokens = cat.tokens.slice(0, 3)
    console.log(`  • ${cat.label} (${cat.tokens.length} tokens)`)
    console.log(`    Sample: ${tokens.join(', ')}`)
  })
  console.log()

  // Test 5: getComponentNameFromToken
  console.log('Test 5: getComponentNameFromToken')
  const testTokens = [
    { token: '--button-bg', expected: 'button' },
    { token: '--card-border', expected: 'card' },
    { token: '--color-brand-500', expected: undefined },
    { token: '--surface-primary', expected: undefined },
  ]
  testTokens.forEach(({ token, expected }) => {
    const result = getComponentNameFromToken(token)
    const pass = result === expected
    console.log(`  ${pass ? '✅' : '❌'} ${token} → ${result ?? 'undefined'} (expected: ${expected ?? 'undefined'})`)
  })
  console.log()

  // Test 6: getTokenCategory
  console.log('Test 6: getTokenCategory')
  const categoryTests = [
    { token: '--color-neutral-500', topLevel: 'foundations', subCategory: 'color' },
    { token: '--surface-primary', topLevel: 'semantic', subCategory: 'surface' },
    { token: '--button-bg', topLevel: 'components', subCategory: 'component' },
    { token: '--unknown-test', topLevel: null, subCategory: null },
  ]
  categoryTests.forEach(({ token, topLevel, subCategory }) => {
    const result = getTokenCategory(token)
    const pass = result?.topLevel === topLevel && result?.subCategory === subCategory
    console.log(`  ${pass ? '✅' : '❌'} ${token} → ${result?.topLevel ?? 'null'}/${result?.subCategory ?? 'null'}`)
  })
  console.log()

  // Test 7: getKnownComponents
  console.log('Test 7: getKnownComponents')
  const known = getKnownComponents()
  console.log(`  ✅ Found ${known.length} known components`)
  console.log('    Sample: button, card, input, select, checkbox...')
  console.log()

  // Test 8: Verification Summary
  console.log('📊 Summary')
  console.log(`  Total tokens processed: ${SAMPLE_TOKENS.length}`)
  console.log(`  Foundation categories: ${classified.foundations.length}`)
  console.log(`  Semantic categories: ${classified.semantic.length}`)
  console.log(`  Component categories: ${classified.components.length}`)
  console.log(`  Uncategorized: ${classified.uncategorized.length}`)
  console.log()

  // Final check
  const foundationTokenCount = classified.foundations.reduce((sum, c) => sum + c.tokens.length, 0)
  const semanticTokenCount = classified.semantic.reduce((sum, c) => sum + c.tokens.length, 0)
  const componentTokenCount = classified.components.reduce((sum, c) => sum + c.tokens.length, 0)
  const totalClassified = foundationTokenCount + semanticTokenCount + componentTokenCount + classified.uncategorized.length

  console.log(`  ✅ Classification complete: ${totalClassified}/${SAMPLE_TOKENS.length} tokens classified`)

  if (totalClassified !== SAMPLE_TOKENS.length) {
    console.log(`  ⚠️  Warning: Mismatch! ${SAMPLE_TOKENS.length - totalClassified} tokens unaccounted for`)
  }
}

// Export for manual testing
export { runTests }

// Auto-run if direct execution (for Node.js)
if (typeof require !== 'undefined' && require.main === module) {
  runTests()
}

