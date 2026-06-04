interface EdSkeletonProps {
  width?: string | number
  height?: string | number
  borderRadius?: string | number
  className?: string
}

export function EdSkeleton({ width, height = 16, borderRadius = 6, className }: EdSkeletonProps) {
  return (
    <div
      className={`ed-skeleton ${className || ''}`}
      style={{ width, height, borderRadius }}
      aria-hidden="true"
    />
  )
}

export function EdSkeletonText({ lines = 3, className }: { lines?: number; className?: string }) {
  return (
    <div className={`ed-skeleton-text ${className || ''}`} aria-hidden="true">
      {Array.from({ length: lines }).map((_, i) => (
        <EdSkeleton
          key={i}
          height={12}
          width={i === lines - 1 ? '60%' : '100%'}
          className="ed-skeleton-text__line"
        />
      ))}
    </div>
  )
}

export function EdSkeletonCard({ className }: { className?: string }) {
  return (
    <div className={`ed-skeleton-card ${className || ''}`} aria-hidden="true">
      <EdSkeleton height={20} width="40%" />
      <EdSkeletonText lines={2} />
      <EdSkeleton height={120} borderRadius={8} />
    </div>
  )
}
