const MAX_HISTORY_SIZE = 50;

interface HistoryEntry {
  snapshot: Map<string, string>;
}

const historyStack: HistoryEntry[] = [];
const redoStack: HistoryEntry[] = [];

let currentSnapshot: Map<string, string> | null = null;

export function pushState(stagedState: Map<string, string>): void {
  if (currentSnapshot && mapEquals(currentSnapshot, stagedState)) {
    return;
  }

  if (currentSnapshot) {
    historyStack.push({ snapshot: new Map(currentSnapshot) });
    if (historyStack.length > MAX_HISTORY_SIZE) {
      historyStack.shift();
    }
  }

  currentSnapshot = new Map(stagedState);
  redoStack.length = 0;
}

export function undo(): Map<string, string> | null {
  if (historyStack.length === 0 || !currentSnapshot) {
    return null;
  }

  const previousEntry = historyStack.pop();
  if (!previousEntry) {
    return null;
  }

  if (currentSnapshot) {
    redoStack.push({ snapshot: new Map(currentSnapshot) });
  }

  currentSnapshot = previousEntry.snapshot;
  return new Map(currentSnapshot);
}

export function redo(): Map<string, string> | null {
  if (redoStack.length === 0 || currentSnapshot === null) {
    return null;
  }

  const nextEntry = redoStack.pop();
  if (!nextEntry) {
    return null;
  }

  historyStack.push({ snapshot: new Map(currentSnapshot) });
  if (historyStack.length > MAX_HISTORY_SIZE) {
    historyStack.shift();
  }

  currentSnapshot = nextEntry.snapshot;
  return new Map(currentSnapshot);
}

export function canUndo(): boolean {
  return historyStack.length > 0 && currentSnapshot !== null;
}

export function canRedo(): boolean {
  return redoStack.length > 0 && currentSnapshot !== null;
}

export function clear(): void {
  historyStack.length = 0;
  redoStack.length = 0;
  currentSnapshot = null;
}

export function getCurrentSnapshot(): Map<string, string> | null {
  return currentSnapshot ? new Map(currentSnapshot) : null;
}

export function getHistorySize(): number {
  return historyStack.length;
}

export function getRedoSize(): number {
  return redoStack.length;
}

function mapEquals(a: Map<string, string>, b: Map<string, string>): boolean {
  if (a.size !== b.size) {
    return false;
  }
  for (const [key, value] of a) {
    if (b.get(key) !== value) {
      return false;
    }
  }
  return true;
}

let keydownHandler: ((event: KeyboardEvent) => void) | null = null;

export function bindGlobalUndoRedo(): void {
  if (keydownHandler) {
    return;
  }

  keydownHandler = (event: KeyboardEvent) => {
    if (typeof document === "undefined") {
      return;
    }

    const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
    const metaKey = isMac ? event.metaKey : event.ctrlKey;

    if (metaKey && !event.shiftKey && event.key === "z") {
      event.preventDefault();
      undo();
    } else if (metaKey && event.shiftKey && event.key === "z") {
      event.preventDefault();
      redo();
    }
  };

  document.addEventListener("keydown", keydownHandler);
}

export function unbindGlobalUndoRedo(): void {
  if (keydownHandler && typeof document !== "undefined") {
    document.removeEventListener("keydown", keydownHandler);
    keydownHandler = null;
  }
}
