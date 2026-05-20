import { cn } from '@/utils/cn'

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  glass?: boolean
}

export function Card({ children, className, hover, glass }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-[var(--radius-card)] border bg-white p-6 shadow-sm dark:bg-slate-900',
        glass && 'glass',
        hover && 'card-hover cursor-pointer',
        className,
      )}
    >
      {children}
    </div>
  )
}
