import { motion } from 'framer-motion'
import { ArrowDownRight, ArrowUpRight, type LucideIcon } from 'lucide-react'
import { cn } from '@/utils/cn'
import { formatCurrency } from '@/utils/format'

interface StatCardProps {
  title: string
  value: number | string
  change?: number
  icon: LucideIcon
  isCurrency?: boolean
  gradient?: boolean
}

export function StatCard({ title, value, change, icon: Icon, isCurrency, gradient }: StatCardProps) {
  const displayValue = isCurrency && typeof value === 'number' ? formatCurrency(value) : value
  const isPositive = (change ?? 0) >= 0

  return (
    <motion.article
      whileHover={{ y: -2 }}
      className={cn(
        'rounded-[var(--radius-card)] p-5 shadow-sm card-hover',
        gradient
          ? 'gradient-primary text-white'
          : 'glass border border-slate-200/60 dark:border-slate-700/60',
      )}
    >
      <span className="flex items-start justify-between">
        <span>
          <p className={cn('text-sm font-medium', gradient ? 'text-white/80' : 'text-slate-500')}>{title}</p>
          <p className="mt-2 text-2xl font-bold">{displayValue}</p>
          {change !== undefined && (
            <span className={cn('mt-2 inline-flex items-center gap-1 text-xs font-medium', gradient ? 'text-white/90' : isPositive ? 'text-emerald-600' : 'text-red-500')}>
              {isPositive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
              {Math.abs(change)}%
            </span>
          )}
        </span>
        <span className={cn('rounded-xl p-3', gradient ? 'bg-white/20' : 'bg-primary-100 dark:bg-primary-900/40')}>
          <Icon className={cn('h-5 w-5', gradient ? 'text-white' : 'text-primary-600')} />
        </span>
      </span>
    </motion.article>
  )
}
