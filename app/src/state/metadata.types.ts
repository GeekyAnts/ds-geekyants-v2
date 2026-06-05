export interface TokenMetadata {
  description?: string
  category?: string
  subcategory?: string
  type?: string
  previewAs?: string
  tags?: string[]
  relatedTokens?: string[]
  deprecated?: boolean
  deprecatedBy?: string
}

export interface TokensMetadata {
  version: string
  lastUpdated: string
  tokens: Record<string, TokenMetadata>
}

export interface MetadataDiff {
  tokenName: string
  field: keyof TokenMetadata
  oldValue?: any
  newValue: any
}

export type MetadataStagedChanges = Record<string, Partial<TokenMetadata>>
