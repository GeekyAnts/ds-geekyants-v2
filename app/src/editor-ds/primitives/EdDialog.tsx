'use client'

import React, { useEffect, useRef, type ReactNode } from 'react'
import { X } from 'lucide-react'
import { EdIconButton } from './EdIconButton'

interface EdDialogProps {
  isOpen: boolean
  onClose: () => void
  title: string
  description?: string
  children: ReactNode
  footer?: ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'

export const EdDialog = ({ isOpen, onClose, title, description, children, footer, size = 'md' }: EdDialogProps) => {
  const dialogRef = useRef<HTMLDivElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!isOpen) return
    previousFocusRef.current = document.activeElement as HTMLElement
    document.body.style.overflow = 'hidden'
    const firstFocusable = dialogRef.current?.querySelector<HTMLElement>(FOCUSABLE_SELECTOR)
    ;(firstFocusable ?? dialogRef.current)?.focus()
    return () => {
      document.body.style.overflow = ''
      previousFocusRef.current?.focus()
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key === 'Tab' && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
        if (focusable.length === 0) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
      }
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="ed-dialog-backdrop"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
      role="presentation"
    >
      <div
        ref={dialogRef}
        tabIndex={-1}
        className={`ed-dialog ed-dialog--${size}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="ed-dialog-title"
      >
        <div className="ed-dialog__header">
          <div>
            <h2 id="ed-dialog-title" className="ed-dialog__title">{title}</h2>
            {description && <p className="ed-dialog__description">{description}</p>}
          </div>
          <EdIconButton
            variant="ghost"
            aria-label="Close dialog"
            onClick={onClose}
            className="ed-dialog__close"
            icon={<X size={16} aria-hidden="true" />}
          />
        </div>
        <div className="ed-dialog__body">{children}</div>
        {footer && <div className="ed-dialog__footer">{footer}</div>}
      </div>
    </div>
  )
}
