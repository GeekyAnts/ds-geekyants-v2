import { recordEdit } from './recentlyEdited.ts'

const STORAGE_KEY = "geeklego.editor.pending.v1";
const STORAGE_KEY_NEW = "geeklego.editor.new-tokens.v1";

const stagedEdits: Map<string, string> = new Map();

// ─── New token store ──────────────────────────────────────────────────────────

export type TokenTreePath =
  | { kind: 'primitiveColor'; family: string; shade: string }
  | { kind: 'primitiveFlat'; category: string; key: string }
  | { kind: 'semanticColorGroup'; group: string; key: string }
  | { kind: 'semanticFlat'; group: string; key: string }

export interface StagedNewToken {
  cssName: string
  value: string
  treePath: TokenTreePath
  addedAt: number
}

const stagedNewTokens: Map<string, StagedNewToken> = new Map()

// ─── Draft store (pre-save previews, never persisted) ─────────────────────────
const draftEdits: Map<string, string> = new Map()
let onDraftChangeCallbacks: (() => void)[] = []

export function setDraft(tokenName: string, value: string | null): void {
  if (value === null) draftEdits.delete(tokenName)
  else draftEdits.set(tokenName, value)
  for (const cb of onDraftChangeCallbacks) cb()
}

export function getDraft(tokenName: string): string | undefined {
  return draftEdits.get(tokenName)
}

export function subscribeToDraftChanges(callback: () => void): () => void {
  onDraftChangeCallbacks.push(callback)
  return () => { onDraftChangeCallbacks = onDraftChangeCallbacks.filter(cb => cb !== callback) }
}

let onPendingChangeCallbacks: (() => void)[] = [];

export function subscribeToPendingChanges(callback: () => void): () => void {
  onPendingChangeCallbacks.push(callback)
  return () => {
    onPendingChangeCallbacks = onPendingChangeCallbacks.filter(cb => cb !== callback)
  }
}

function notifyPendingChanges(): void {
  for (const callback of onPendingChangeCallbacks) {
    callback()
  }
}

export function stageNewToken(token: StagedNewToken): void {
  stagedNewTokens.set(token.cssName, token)
  persistNewTokensToStorage()
  notifyPendingChanges()
}

export function unstageNewToken(cssName: string): void {
  stagedNewTokens.delete(cssName)
  persistNewTokensToStorage()
  notifyPendingChanges()
}

export function getStagedNewTokens(): ReadonlyMap<string, StagedNewToken> {
  return stagedNewTokens
}

export function hasStagedNewToken(cssName: string): boolean {
  return stagedNewTokens.has(cssName)
}

export function discardAllNewTokens(): void {
  stagedNewTokens.clear()
  try { localStorage.removeItem(STORAGE_KEY_NEW) } catch { /* ignore */ }
}

export function loadFromStorage(): void {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed && typeof parsed === "object") {
        for (const [key, value] of Object.entries(parsed)) {
          if (typeof key === "string" && typeof value === "string") {
            stagedEdits.set(key, value);
          }
        }
      }
    }
  } catch {
    // Ignore parse errors
  }
  try {
    const storedNew = localStorage.getItem(STORAGE_KEY_NEW)
    if (storedNew) {
      const parsed = JSON.parse(storedNew)
      if (Array.isArray(parsed)) {
        for (const token of parsed) {
          if (token && typeof token.cssName === 'string') {
            stagedNewTokens.set(token.cssName, token as StagedNewToken)
          }
        }
      }
    }
  } catch {
    // Ignore parse errors
  }
}

export function stage(tokenName: string, newValue: string): void {
  stagedEdits.set(tokenName, newValue);
  recordEdit(tokenName);
  persistToStorage();
  notifyPendingChanges();
}

export function unstage(tokenName: string): void {
  stagedEdits.delete(tokenName);
  persistToStorage();
  notifyPendingChanges();
}

export function commitToExport(
  originalTokens: Map<string, string>
): Map<string, string> {
  const merged = new Map(originalTokens);
  for (const [tokenName, newValue] of stagedEdits) {
    merged.set(tokenName, newValue);
  }
  return merged;
}

export function discardAll(): void {
  stagedEdits.clear();
  discardAllNewTokens();
  persistToStorage();
  notifyPendingChanges();
}

export function getStagedValue(tokenName: string): string | undefined {
  return stagedEdits.get(tokenName);
}

export function hasPendingChanges(): boolean {
  return stagedEdits.size > 0 || stagedNewTokens.size > 0;
}

export function getPendingCount(): number {
  return stagedEdits.size + stagedNewTokens.size;
}

export function getAllStaged(): Map<string, string> {
  return new Map(stagedEdits);
}

export function hasListeners(): boolean {
  return onPendingChangeCallbacks.length > 0
}

export function invalidateAndRebuildGraph(): void {
  for (const callback of onPendingChangeCallbacks) {
    callback()
  }
}

function persistToStorage(): void {
  try {
    const toStore: Record<string, string> = {};
    for (const [key, value] of stagedEdits) {
      toStore[key] = value;
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toStore));
  } catch {
    // Ignore storage errors
  }
}

function persistNewTokensToStorage(): void {
  try {
    localStorage.setItem(STORAGE_KEY_NEW, JSON.stringify(Array.from(stagedNewTokens.values())))
  } catch {
    // Ignore storage errors
  }
}

// Auto-load persisted state on module initialisation (same pattern as recentlyEdited.ts)
loadFromStorage()
