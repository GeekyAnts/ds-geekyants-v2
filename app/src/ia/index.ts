// ─── IA Module Exports ────────────────────────────────────────────────────────

export * from './classify.types.ts'
export { classifyTokens, generateNavigationStructure, getComponentNameFromToken, getTokenCategory, getKnownComponents } from './classify.ts'
export { getMetaForCategory, getCategoryById, groupTokensByPattern } from './categoryCopy.ts'

