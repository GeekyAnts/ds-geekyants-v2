const STORAGE_KEY = 'geeklego.editor.snapshots.v1'
const MAX_SNAPSHOTS = 50

export interface TokenSnapshot {
  id: string
  label: string
  timestamp: number
  stagedEdits: Record<string, string>
  tokenCount: number
}

interface StoredSnapshots {
  snapshots: TokenSnapshot[]
}

function loadAll(): TokenSnapshot[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed: StoredSnapshots = JSON.parse(raw)
    return parsed.snapshots ?? []
  } catch {
    return []
  }
}

function saveAll(snapshots: TokenSnapshot[]): void {
  try {
    const toStore: StoredSnapshots = { snapshots }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toStore))
  } catch {
    // Storage full or unavailable
  }
}

function trimLRU(snapshots: TokenSnapshot[]): TokenSnapshot[] {
  if (snapshots.length <= MAX_SNAPSHOTS) return snapshots
  snapshots.sort((a, b) => b.timestamp - a.timestamp)
  return snapshots.slice(0, MAX_SNAPSHOTS)
}

export function createSnapshot(label: string, stagedEdits: Map<string, string>): TokenSnapshot {
  const allExisting = loadAll()
  const snapshot: TokenSnapshot = {
    id: `snapshot-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`,
    label: label || `Snapshot ${new Date().toLocaleString()}`,
    timestamp: Date.now(),
    stagedEdits: Object.fromEntries(stagedEdits),
    tokenCount: stagedEdits.size,
  }

  const updated = trimLRU([snapshot, ...allExisting])
  saveAll(updated)
  return snapshot
}

export function getSnapshot(id: string): TokenSnapshot | undefined {
  return loadAll().find((s) => s.id === id)
}

export function getAllSnapshots(): TokenSnapshot[] {
  return loadAll()
}

export function deleteSnapshot(id: string): boolean {
  const all = loadAll()
  const filtered = all.filter((s) => s.id !== id)
  if (filtered.length === all.length) return false
  saveAll(filtered)
  return true
}

export function restoreSnapshot(id: string): TokenSnapshot | null {
  const snapshot = getSnapshot(id)
  if (!snapshot) return null
  return snapshot
}

export function downloadSnapshotAsJSON(snapshot: TokenSnapshot): void {
  const blob = new Blob([JSON.stringify(snapshot, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `geeklego-snapshot-${snapshot.id}.json`
  a.click()
  URL.revokeObjectURL(url)
}

export function clearAllSnapshots(): void {
  localStorage.removeItem(STORAGE_KEY)
}
