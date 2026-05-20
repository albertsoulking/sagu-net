import dayjs from 'dayjs'
import type { PackagePlan } from '@/types'

/** Extra promo months bundled with term (UI: +1 for 6m, +2 for 12m). */
export function bundledExtraMonths(subscriptionMonths: 1 | 3 | 6 | 12): number {
  if (subscriptionMonths === 6) return 1
  if (subscriptionMonths === 12) return 2
  return 0
}

export function subscriptionBaseAmount(planName: string, months: number, packages: PackagePlan[]): number {
  const p = packages.find((x) => x.plan === planName)
  return (p?.basePrice ?? 0) * months
}

export type InstallBillingType = 'free' | 'standard'

/**
 * Free install: no install fee; cable beyond 300m → 300 MMK/m.
 * Standard: 50,000 MMK install; cable beyond 300m → 300 MMK/m.
 */
export function calculateCableInstallCost(installType: InstallBillingType, cableMeters: number) {
  const installationFee = installType === 'standard' ? 50000 : 0
  const overMeters = Math.max(0, cableMeters - 300)
  const cableExtra = overMeters * 300
  return { installationFee, cableExtra, total: installationFee + cableExtra }
}

/** Extend subscription from the later of current end date or today. */
export function computeRenewalEndAndDays(currentEndDate: string, renewMonths: number) {
  const end = dayjs(currentEndDate)
  const base = end.isAfter(dayjs(), 'day') ? end : dayjs()
  const newEnd = base.add(renewMonths, 'month')
  return {
    endDate: newEnd.format('YYYY-MM-DD'),
    remainingDays: newEnd.diff(dayjs(), 'day'),
  }
}

export function computeBillingEndFromStart(billingStart: string, paidMonths: number, extraMonths: number) {
  const newEnd = dayjs(billingStart).add(paidMonths + extraMonths, 'month')
  return newEnd.format('YYYY-MM-DD')
}
