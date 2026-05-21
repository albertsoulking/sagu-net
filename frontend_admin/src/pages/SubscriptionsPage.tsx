import { useEffect, useState, useMemo } from 'react'
import { createColumnHelper } from '@tanstack/react-table'
import { Plus } from 'lucide-react'
import { toast } from 'sonner'
import { subscriptionsService } from '@/services/subscriptions.service'
import { packagesService } from '@/services/packages.service'
import { usersService } from '@/services/users.service'
import type { Subscription, PackagePlan, IspUser } from '@/types'
import { PageHeader } from '@/components/ui/PageHeader'
import { Button } from '@/components/ui/Button'
import { DataTable } from '@/components/ui/DataTable'
import { Modal } from '@/components/ui/Modal'
import { Card } from '@/components/ui/Card'
import { formatCurrency, formatDate } from '@/utils/format'

const col = createColumnHelper<Subscription>()

export function SubscriptionsPage() {
  const [data, setData] = useState<Subscription[]>([])
  const [packages, setPackages] = useState<PackagePlan[]>([])
  const [users, setUsers] = useState<IspUser[]>([])
  const [loading, setLoading] = useState(true)
  const [renewOpen, setRenewOpen] = useState(false)
  const [form, setForm] = useState<{ userId: string; plan: string; months: number; installationType: string; paymentType: 'cash' | 'kpay' }>({
    userId: '',
    plan: '',
    months: 3,
    installationType: 'Renewal',
    paymentType: 'cash',
  })

  useEffect(() => {
    Promise.all([
      subscriptionsService.findAll(),
      packagesService.findAll(),
      usersService.findAll(),
    ]).then(([subs, pkgs, usrs]) => {
      setData(subs.data)
      setPackages(pkgs.data)
      setUsers(usrs.data)
      setLoading(false)
    })
  }, [])

  const basePrice = packages.find((p) => p.plan === form.plan)?.basePrice ?? 25000
  const discount = form.months >= 12 ? 15 : form.months >= 6 ? 10 : form.months >= 3 ? 5 : 0
  const installationFee = form.installationType === 'Standard' ? 15000 : 0
  const finalPrice = basePrice * form.months * (1 - discount / 100) + installationFee

  const columns = useMemo(
    () => [
      col.accessor('date', { header: 'Date', cell: (i) => formatDate(i.getValue()) }),
      col.accessor('userId', { header: 'User ID' }),
      col.accessor('packagePlan', { header: 'Package' }),
      col.accessor('months', { header: 'Months' }),
      col.accessor('installationType', { header: 'Installation' }),
      col.accessor('paymentType', { header: 'Payment' }),
      col.accessor('startDate', { header: 'Start', cell: (i) => formatDate(i.getValue()) }),
      col.accessor('endDate', { header: 'End', cell: (i) => formatDate(i.getValue()) }),
      col.accessor('discount', { header: 'Discount %' }),
      col.accessor('actualPrice', { header: 'Price', cell: (i) => formatCurrency(i.getValue()) }),
    ],
    [],
  )

  return (
    <span className="space-y-6">
      <PageHeader
        title="Subscriptions"
        description="Broadband renewal and payment records"
        actions={<Button size="sm" onClick={() => setRenewOpen(true)}><Plus className="h-4 w-4" /> Quick Renewal</Button>}
      />
      <DataTable data={data} columns={columns} isLoading={loading} searchPlaceholder="Search subscriptions..." />
      <Modal open={renewOpen} onClose={() => setRenewOpen(false)} title="Quick Renewal" size="lg">
        <span className="grid gap-4 sm:grid-cols-2">
          <span>
            <label className="mb-1.5 block text-sm font-medium">User</label>
            <select className="w-full rounded-xl border px-4 py-2.5 text-sm dark:bg-slate-800" value={form.userId} onChange={(e) => setForm({ ...form, userId: e.target.value })}>
              <option value="">Select user</option>
              {users.map((u) => <option key={u.id} value={u.id}>{u.username}</option>)}
            </select>
          </span>
          <span>
            <label className="mb-1.5 block text-sm font-medium">Package</label>
            <select className="w-full rounded-xl border px-4 py-2.5 text-sm dark:bg-slate-800" value={form.plan} onChange={(e) => setForm({ ...form, plan: e.target.value })}>
              {packages.map((p) => <option key={p.id} value={p.plan}>{p.plan}</option>)}
            </select>
          </span>
          <span>
            <label className="mb-1.5 block text-sm font-medium">Months</label>
            <select className="w-full rounded-xl border px-4 py-2.5 text-sm dark:bg-slate-800" value={form.months} onChange={(e) => setForm({ ...form, months: Number(e.target.value) })}>
              {[1, 3, 6, 12].map((m) => <option key={m} value={m}>{m} month{m > 1 ? 's' : ''}</option>)}
            </select>
          </span>
          <span>
            <label className="mb-1.5 block text-sm font-medium">Installation Type</label>
            <select className="w-full rounded-xl border px-4 py-2.5 text-sm dark:bg-slate-800" value={form.installationType} onChange={(e) => setForm({ ...form, installationType: e.target.value })}>
              {['Renewal', 'Free Installation', 'Standard Installation', 'ONU Relocation'].map((t) => <option key={t}>{t}</option>)}
            </select>
          </span>
          <span>
            <label className="mb-1.5 block text-sm font-medium">Payment</label>
            <select className="w-full rounded-xl border px-4 py-2.5 text-sm dark:bg-slate-800" value={form.paymentType} onChange={(e) => setForm({ ...form, paymentType: e.target.value as 'cash' | 'kpay' })}>
              <option value="cash">Cash</option>
              <option value="kpay">Kpay</option>
            </select>
          </span>
        </span>
        <Card className="mt-4">
          <h4 className="font-semibold mb-2">Summary</h4>
          <p className="text-sm">Base: {formatCurrency(basePrice * form.months)}</p>
          <p className="text-sm">Discount: {discount}%</p>
          <p className="text-sm">Installation: {formatCurrency(installationFee)}</p>
          <p className="text-lg font-bold mt-2">Final: {formatCurrency(finalPrice)}</p>
        </Card>
        <span className="mt-4 flex justify-end gap-2">
          <Button variant="outline" onClick={() => setRenewOpen(false)}>Cancel</Button>
          <Button onClick={() => { toast.success('Renewal completed'); setRenewOpen(false) }}>Confirm Renewal</Button>
        </span>
      </Modal>
    </span>
  )
}
