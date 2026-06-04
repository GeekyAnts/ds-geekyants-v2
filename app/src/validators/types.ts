export type ValidatorSeverity = 'block' | 'warn' | 'notice'

export type ValidatorCategory =
  | 'broken-ref'
  | 'circular-alias'
  | 'type-mismatch'
  | 'contrast'
  | 'out-of-scale'
  | 'drift'

export interface ValidatorResult {
  tokenName: string
  severity: ValidatorSeverity
  category: ValidatorCategory
  message: string
  details?: string
}
