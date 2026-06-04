import type { ReactNode } from 'react'

interface EdEmptyStateProps {
  icon?: ReactNode
  title: string
  description?: string
  action?: ReactNode
}

export function EdEmptyState({ icon, title, description, action }: EdEmptyStateProps) {
  return (
    <div className="ed-empty-state">
      {icon && <div className="ed-empty-state__icon">{icon}</div>}
      <h3 className="ed-empty-state__title">{title}</h3>
      {description && <p className="ed-empty-state__description">{description}</p>}
      {action && <div className="ed-empty-state__action">{action}</div>}
    </div>
  )
}
