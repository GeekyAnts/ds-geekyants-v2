import { useState, useEffect } from 'react'
import { hasPendingChanges, getPendingCount, getAllStaged } from '../state/staging'

interface AutoSaveBannerProps {
  onRestore: () => void
  onDismiss: () => void
}

const DISMISSED_STORAGE_KEY = 'geeklego.editor.sessionDismissedAutoSave.v1'

export function useAutoSaveBanner(onRestore: () => void, onDismiss: () => void): boolean {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const dismissed = localStorage.getItem(DISMISSED_STORAGE_KEY)
    if (dismissed) return

    const hasPending = hasPendingChanges()
    if (hasPending) {
      setShow(true)
    }
  }, [onRestore, onDismiss])

  function handleDismiss() {
    localStorage.setItem(DISMISSED_STORAGE_KEY, 'true')
    setShow(false)
    if (onDismiss) onDismiss()
  }

  function handleRestore() {
    setShow(false)
    if (onRestore) onRestore()
  }

  return show
}

export default function AutoSaveBanner({ onRestore, onDismiss }: AutoSaveBannerProps) {
  const show = useAutoSaveBanner(onRestore, onDismiss)
  const count = getPendingCount()

  if (!show) return null

  return (
    <div className="ed-auto-save-banner">
      <div className="ed-auto-save-banner-content">
        <div className="ed-auto-save-icon">💾</div>
        <p className="ed-auto-save-message">
          <strong>{count}</strong> pending change{count > 1 ? 's' : ''} from previous session.
        </p>
        <div className="ed-auto-save-actions">
          <button className="ed-auto-save-restore-btn" onClick={() => {
            getAllStaged()
            if (onRestore) onRestore()
          }}>
            Resume & Review
          </button>
          <button className="ed-auto-save-dismiss-btn" onClick={() => {
            localStorage.setItem('geeklego.editor.sessionDismissedAutoSave.v1', 'true')
            if (onDismiss) onDismiss()
          }}>
            Dismiss
          </button>
        </div>
      </div>
    </div>
  )
}
