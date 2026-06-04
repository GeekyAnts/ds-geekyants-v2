const STORAGE_KEY = "geeklego.editor.recentlyEdited.v1";
const MAX_RECENT = 20;

const recentlyEdited: string[] = [];

let callbacks: (() => void)[] = [];

export function subscribeToRecentlyEdited(cb: () => void): () => void {
  callbacks.push(cb);
  return () => {
    callbacks = callbacks.filter(c => c !== cb);
  };
}

function notify(): void {
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
        recentlyEdited.length = 0;
        for (const name of parsed) {
          if (typeof name === "string") {
            recentlyEdited.push(name);
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
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recentlyEdited));
  } catch {
    // Ignore storage errors
  }
}

export function recordEdit(tokenName: string): void {
  const index = recentlyEdited.indexOf(tokenName);
  if (index !== -1) {
    recentlyEdited.splice(index, 1);
  }
  recentlyEdited.unshift(tokenName);
  if (recentlyEdited.length > MAX_RECENT) {
    recentlyEdited.length = MAX_RECENT;
  }
  persistToStorage();
  notify();
}

export function getRecentlyEdited(): string[] {
  return [...recentlyEdited];
}

export function getRecentlyEditedCount(): number {
  return recentlyEdited.length;
}

loadFromStorage();
