import { EdButton, EdIconButton } from '../../editor-ds/primitives'
import { Sun, Moon } from 'lucide-react'
import './Header.css'

interface HeaderProps {
  pendingCount: number
  onOpenCommandPalette: () => void
  onOpenExport: () => void
  onOpenPending: () => void
  previewTheme: 'light' | 'dark'
  onTogglePreviewTheme: () => void
}

export function Header({
  pendingCount,
  onOpenCommandPalette,
  onOpenExport,
  onOpenPending,
  previewTheme,
  onTogglePreviewTheme,
}: HeaderProps) {
  return (
    <header className="ed-header" role="banner">
      <div className="ed-header__logo">
        <img
          src="/geeklego-logo.svg"
          alt="Geeklego"
          className="ed-header__logo-icon"
        />
        <span className="ed-header__logo-text">Geeklego</span>
      </div>

      <button
        type="button"
        className="ed-header__search-trigger"
        onClick={onOpenCommandPalette}
        aria-label="Search tokens"
      >
        <span>Search tokens...</span>
        <kbd>⌘K</kbd>
      </button>

      <div className="ed-header__spacer" />

      <div className="ed-header__actions">
        {pendingCount > 0 && (
          <button
            type="button"
            className="ed-header__pending-badge"
            aria-label={`${pendingCount} pending changes — click to review`}
            onClick={onOpenPending}
            title="Review pending changes"
          >
            {pendingCount}
          </button>
        )}

        <EdIconButton
          icon={previewTheme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          aria-label={`Switch to ${previewTheme === 'dark' ? 'light' : 'dark'} preview`}
          onClick={onTogglePreviewTheme}
          variant="ghost"
          size="sm"
        />

        <EdButton
          variant="primary"
          size="md"
          onClick={onOpenExport}
        >
          Export...
        </EdButton>
      </div>
    </header>
  )
}
