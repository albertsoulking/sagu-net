import { cn } from '@/utils/cn'

export function Skeleton({ className }: { className?: string }) {
  return <span className={cn('block animate-pulse rounded-xl bg-slate-200 dark:bg-slate-700', className)} />
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <>
      {Array.from({ length: rows }).map((_, i) => (
        <Skeleton key={i} className="mb-3 h-12 w-full" />
      ))}
    </>
  )
}
