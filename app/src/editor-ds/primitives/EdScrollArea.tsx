'use client'

import React, { type ReactNode } from 'react'

interface EdScrollAreaProps {
  children: ReactNode
  className?: string
  orientation?: 'horizontal' | 'vertical' | 'both'
  /**
   * Visual mode. We keep the API for back-compat but render a single themed
   * scrollable region whose scrollbar inherits from the global .ed-shell rules.
   */
  type?: 'scrollable' | 'hover' | 'native'
}

export const EdScrollArea = ({ children, className, orientation = 'vertical' }: EdScrollAreaProps) => {
  const style: React.CSSProperties = {
    overflowY: orientation === 'horizontal' ? 'hidden' : 'auto',
    overflowX: orientation === 'vertical' ? 'hidden' : 'auto',
    scrollbarWidth: 'thin',
    scrollbarColor: 'var(--ed-border-strong) transparent',
  }
  return <div className={className} style={style}>{children}</div>
}
