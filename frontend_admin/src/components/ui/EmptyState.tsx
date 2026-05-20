import { Inbox } from 'lucide-react'
import { Button } from './Button'

interface EmptyStateProps {
  title?: string
  description?: string
  actionLabel?: string
  onAction?: () => void
}

export function EmptyState({
  title = 'No data found',
  description = 'Try adjusting your filters or add new records.',
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <span className="flex flex-col items-center justify-center py-16 text-center w-full">
      <span className="mb-4 rounded-2xl bg-slate-100 p-4 dark:bg-slate-800 inline-flex">
        <Inbox className="h-10 w-10 text-slate-400" />
      </span>
      <h3 className="text-lg font-medium">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-slate-500">{description}</p>
      {actionLabel && onAction && (
        <Button className="mt-4" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </span>
  )
}
