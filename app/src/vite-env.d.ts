/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_APP_VERSION: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
  hot?: {
    accept?: (cb: () => void) => void
    dispose?: (cb: (data: unknown) => void) => void
    decline?: () => void
    invalidate?: () => void
    on?: (event: string, cb: (...args: unknown[]) => void) => void
  }
}
