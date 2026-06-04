import { EdDialog } from '../editor-ds/primitives/EdDialog'
import { EdButton } from '../editor-ds/primitives/EdButton'

interface ShortcutGroup {
  group: string
  shortcuts: { keys: string; description: string }[]
}

const SHORTCUT_GROUPS: ShortcutGroup[] = [
  {
    group: 'Navigation',
    shortcuts: [
      { keys: '\u2318K', description: 'Search tokens' },
      { keys: '?', description: 'Show keyboard shortcuts' },
      { keys: '\u2318Z', description: 'Undo' },
      { keys: '\u2325\u21E7Z', description: 'Redo' },
    ],
  },
  {
    group: 'Selection',
    shortcuts: [
      { keys: 'Click', description: 'Select token' },
      { keys: '\u21E9Click', description: 'Range select tokens' },
      { keys: '\u2318A', description: 'Select all tokens' },
      { keys: 'Esc', description: 'Clear selection / Close drawer' },
    ],
  },
  {
    group: 'Editing',
    shortcuts: [
      { keys: 'Enter', description: 'Confirm value' },
      { keys: 'Esc', description: 'Cancel editing' },
      { keys: 'Tab', description: 'Next field' },
    ],
  },
]

interface KeyboardShortcutsProps {
  onClose: () => void
}

export function KeyboardShortcuts({ onClose }: KeyboardShortcutsProps) {
  return (
    <EdDialog isOpen={true} onClose={onClose} title="Keyboard Shortcuts" size="md">
      <div className="ed-keyboard-shortcuts">
        {SHORTCUT_GROUPS.map(group => (
          <div key={group.group} className="ed-keyboard-shortcuts__group">
            <h4 className="ed-keyboard-shortcuts__group-title">{group.group}</h4>
            <div className="ed-keyboard-shortcuts__list">
              {group.shortcuts.map(s => (
                <div key={s.keys} className="ed-keyboard-shortcuts__item">
                  <kbd className="ed-keyboard-shortcuts__key">{s.keys}</kbd>
                  <span className="ed-keyboard-shortcuts__desc">{s.description}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}>
        <EdButton variant="secondary" size="sm" onClick={onClose}>Close</EdButton>
      </div>
    </EdDialog>
  )
}
