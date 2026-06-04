'use client'

import React, { useState, useRef, useEffect, type ReactNode } from 'react'

interface EdTooltipProps {
  content: ReactNode
  children: ReactNode
  position?: 'top' | 'bottom' | 'left' | 'right'
  delay?: number
}

export const EdTooltip = ({ content, children, position = 'top', delay = 200 }: EdTooltipProps) => {
  const [visible, setVisible] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current) }, [])

  const show = () => {
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => setVisible(true), delay)
  }
  const hide = () => {
    if (timer.current) clearTimeout(timer.current)
    setVisible(false)
  }

  const stylesByPosition: Record<NonNullable<EdTooltipProps['position']>, React.CSSProperties> = {
    top:    { bottom: '100%', left: '50%', transform: 'translateX(-50%)', marginBottom: 6 },
    bottom: { top:    '100%', left: '50%', transform: 'translateX(-50%)', marginTop: 6 },
    left:   { right:  '100%', top: '50%',  transform: 'translateY(-50%)', marginRight: 6 },
    right:  { left:   '100%', top: '50%',  transform: 'translateY(-50%)', marginLeft: 6 },
  }

  return (
    <span
      style={{ position: 'relative', display: 'inline-block' }}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {children}
      {visible && (
        <span className="ed-tooltip" style={stylesByPosition[position]} role="tooltip">
          {content}
        </span>
      )}
    </span>
  )
}
