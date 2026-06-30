import { useSyncExternalStore } from 'react'

/**
 * Shared "active theme" for the docked component preview.
 *
 * This single piece of state unifies two concerns that used to be separate:
 *   1. The manual Light|Dark toggle on the preview band.
 *   2. Which theme set the Inspector's Value section is editing (its old local
 *      `editTheme`). When you switch the Inspector to the Dark tab, the preview
 *      auto-flips to dark — because they read/write THIS store, they can't
 *      disagree.
 *
 * Mirrors the subscribe/get/set pattern used by `staging.ts`. Defaults to light.
 */
export type PreviewTheme = 'light' | 'dark'

let current: PreviewTheme = 'light'
let listeners: (() => void)[] = []

export function getPreviewTheme(): PreviewTheme {
  return current
}

export function setPreviewTheme(theme: PreviewTheme): void {
  if (theme === current) return
  current = theme
  for (const l of listeners) l()
}

export function togglePreviewTheme(): void {
  setPreviewTheme(current === 'dark' ? 'light' : 'dark')
}

export function subscribeToPreviewTheme(callback: () => void): () => void {
  listeners.push(callback)
  return () => {
    listeners = listeners.filter(l => l !== callback)
  }
}

/** React hook: re-renders the caller when the preview theme changes. */
export function usePreviewTheme(): PreviewTheme {
  return useSyncExternalStore(subscribeToPreviewTheme, getPreviewTheme, getPreviewTheme)
}
