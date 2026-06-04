import type { ValidatorResult } from './types'

const VAR_REF = /var\(--([\w-]+)/g

function extractVarReferences(value: string): string[] {
  const refs: string[] = []
  let match: RegExpExecArray | null
  VAR_REF.lastIndex = 0
  while ((match = VAR_REF.exec(value)) !== null) {
    refs.push(`--${match[1]}`)
  }
  return refs
}

export function checkBrokenReferences(
  tokenName: string,
  value: string,
  knownTokens: Set<string>
): ValidatorResult[] {
  const results: ValidatorResult[] = []

  if (!value.includes('var(')) {
    return results
  }

  const refs = extractVarReferences(value)

  for (const ref of refs) {
    if (!knownTokens.has(ref)) {
      results.push({
        tokenName,
        severity: 'block',
        category: 'broken-ref',
        message: `Broken reference: ${ref}`,
        details: `Token ${tokenName} references ${ref} which is not defined`,
      })
    }
  }

  return results
}
