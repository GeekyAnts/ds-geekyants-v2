'use client'

import React, { useState, useRef, useEffect, type ReactNode } from 'react'

interface EdMenuItem {
  id: string
  label: string
  onClick?: () => void
  disabled?: boolean
  icon?: ReactNode
}

interface EdMenuProps {
  trigger: ReactNode
  items: EdMenuItem[]
  position?: 'bottom-left' | 'bottom-right'
}

export const EdMenu = ({ trigger, items, position = 'bottom-left' }: EdMenuProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (
        menuRef.current && !menuRef.current.contains(event.target as Node) &&
        triggerRef.current && !triggerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  const posStyle: React.CSSProperties = position === 'bottom-right'
    ? { top: 'calc(100% + 4px)', right: 0 }
    : { top: 'calc(100% + 4px)', left: 0 }

  return (
    <div style={{ position: 'relative', display: 'inline-block' }} ref={triggerRef}>
      <div onClick={() => setIsOpen((v) => !v)}>{trigger}</div>
      {isOpen && (
        <div ref={menuRef} className="ed-menu" style={posStyle} role="menu" aria-label="Menu">
          {items.map((item) => (
            <button
              key={item.id}
              className="ed-menu__item"
              onClick={() => { item.onClick?.(); setIsOpen(false) }}
              disabled={item.disabled}
              role="menuitem"
              tabIndex={item.disabled ? -1 : 0}
            >
              {item.icon && <span aria-hidden="true">{item.icon}</span>}
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
