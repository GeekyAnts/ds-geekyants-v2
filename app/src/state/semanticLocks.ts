// Per-semantic "lock" state for the brand-aware auto-pick feature.
//
// A locked semantic is one the user has deliberately set — the auto-pick engine
// must never overwrite it. This is EDITOR metadata, not design-system data, so it
// lives in a state store (mirroring pinning.ts) and is intentionally NOT part of
// the GeeklegoTokensV2 model: keeping it out of the model is what preserves the
// CSS parse→generate round-trip contract (see v2-semantics-roundtrip.test.ts).
//
// Keys are CSS token names without the leading `--` (e.g. "primary",
// "primary-foreground", "ring") — matching the V2Semantics map keys.

const STORAGE_KEY = "geeklego.editor.semantic-locks.v1";

const lockedSemantics: Set<string> = new Set();

let callbacks: (() => void)[] = [];

export function subscribeToLockChanges(cb: () => void): () => void {
  callbacks.push(cb);
  return () => {
    callbacks = callbacks.filter(c => c !== cb);
  };
}

function notifyChanges(): void {
  for (const cb of callbacks) {
    cb();
  }
}

function loadFromStorage(): void {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) {
        for (const name of parsed) {
          if (typeof name === "string") {
            lockedSemantics.add(name);
          }
        }
      }
    }
  } catch {
    // Ignore parse errors
  }
}

function persistToStorage(): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...lockedSemantics]));
  } catch {
    // Ignore storage errors
  }
}

export function lockSemantic(key: string): void {
  lockedSemantics.add(key);
  persistToStorage();
  notifyChanges();
}

export function unlockSemantic(key: string): void {
  lockedSemantics.delete(key);
  persistToStorage();
  notifyChanges();
}

export function toggleLock(key: string): void {
  if (lockedSemantics.has(key)) {
    lockedSemantics.delete(key);
  } else {
    lockedSemantics.add(key);
  }
  persistToStorage();
  notifyChanges();
}

export function isLocked(key: string): boolean {
  return lockedSemantics.has(key);
}

export function getAllLocked(): string[] {
  return [...lockedSemantics];
}

loadFromStorage();
