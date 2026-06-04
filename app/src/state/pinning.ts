const STORAGE_KEY = "geeklego.editor.pinned.v1";

const pinnedTokens: Set<string> = new Set();

let callbacks: (() => void)[] = [];

export function subscribeToPinnedChanges(cb: () => void): () => void {
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
            pinnedTokens.add(name);
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
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...pinnedTokens]));
  } catch {
    // Ignore storage errors
  }
}

export function pinToken(tokenName: string): void {
  pinnedTokens.add(tokenName);
  persistToStorage();
  notifyChanges();
}

export function unpinToken(tokenName: string): void {
  pinnedTokens.delete(tokenName);
  persistToStorage();
  notifyChanges();
}

export function togglePin(tokenName: string): void {
  if (pinnedTokens.has(tokenName)) {
    pinnedTokens.delete(tokenName);
  } else {
    pinnedTokens.add(tokenName);
  }
  persistToStorage();
  notifyChanges();
}

export function isPinned(tokenName: string): boolean {
  return pinnedTokens.has(tokenName);
}

export function getAllPinned(): string[] {
  return [...pinnedTokens];
}

export function getPinnedCount(): number {
  return pinnedTokens.size;
}

loadFromStorage();
