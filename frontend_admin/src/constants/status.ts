import type { SubscriberAccountStatus, OnuConnectionStatus, SubscriberAccountType } from '@/types'

export const SUBSCRIBER_STATUS_COLORS: Record<SubscriberAccountStatus, string> = {
  active: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  expired: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300',
  suspended: 'bg-slate-200 text-slate-800 dark:bg-slate-700 dark:text-slate-200',
}

export const ONU_STATUS_COLORS: Record<OnuConnectionStatus, string> = {
  online: 'bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-200',
  offline: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200',
}

export const USER_TYPE_COLORS: Record<SubscriberAccountType, string> = {
  premium: 'bg-violet-100 text-violet-800 dark:bg-violet-900/40 dark:text-violet-200',
  foc: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/40 dark:text-cyan-200',
}

export const SUBSCRIBER_STATUS_LABELS: Record<SubscriberAccountStatus, string> = {
  active: 'Active',
  expired: 'Expired',
  suspended: 'Suspended',
}

export const ONU_STATUS_LABELS: Record<OnuConnectionStatus, string> = {
  online: 'Online',
  offline: 'Offline',
}

export const USER_TYPE_LABELS: Record<SubscriberAccountType, string> = {
  premium: 'Premium',
  foc: 'FOC',
}

export const EXPENSE_CATEGORIES = [
  'HR & Payroll',
  'Vehicle Maintenance',
  'Petrol',
  'Equipment',
  'Fiber Cable',
  'Office Expense',
  'Marketing',
  'Utilities',
] as const
