import { useEffect, useState } from 'react'
import { Pencil, Trash2, Plus, BarChart3 } from 'lucide-react'
import { toast } from 'sonner'
import { mockApi } from '@/services/mock/api'
import type { PackagePlan } from '@/types'
import { PageHeader } from '@/components/ui/PageHeader'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Modal } from '@/components/ui/Modal'
import { Input } from '@/components/ui/Input'
import { formatCurrency } from '@/utils/format'
import { TableSkeleton } from '@/components/ui/Skeleton'

export function PackagesPage() {
  const [packages, setPackages] = useState<PackagePlan[]>([])
  const [loading, setLoading] = useState(true)
  const [editOpen, setEditOpen] = useState(false)
  const [form, setForm] = useState({ plan: '', basePrice: 0, category: 'Residential' })

  useEffect(() => {
    mockApi.getPackages().then((d) => { setPackages(d); setLoading(false) })
  }, [])

  if (loading) return <TableSkeleton rows={3} />

  return (
    <span className="space-y-6">
      <PageHeader
        title="Package Plans"
        description="Manage broadband speed tiers and pricing"
        actions={<Button size="sm" onClick={() => { setForm({ plan: '', basePrice: 25000, category: 'Residential' }); setEditOpen(true) }}><Plus className="h-4 w-4" /> Add Plan</Button>}
      />
      <span className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {packages.map((pkg) => (
          <Card key={pkg.id} hover glass className="relative overflow-hidden">
            <span className="absolute right-0 top-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-primary-500/10" />
            <p className="text-xs font-medium text-primary-600">{pkg.category}</p>
            <h3 className="mt-2 text-3xl font-bold">{pkg.plan}</h3>
            <p className="mt-1 text-2xl font-semibold text-primary-600">{formatCurrency(pkg.basePrice)}<span className="text-sm font-normal text-slate-500">/mo</span></p>
            <span className="mt-4 flex gap-4 text-sm text-slate-500">
              <span><strong className="text-slate-900 dark:text-white">{pkg.userCount}</strong> users</span>
              <span><strong className="text-slate-900 dark:text-white">{formatCurrency(pkg.revenue)}</strong> revenue</span>
            </span>
            <span className="mt-4 flex gap-2">
              <Button size="sm" variant="outline" onClick={() => { setForm({ plan: pkg.plan, basePrice: pkg.basePrice, category: pkg.category }); setEditOpen(true) }}><Pencil className="h-4 w-4" /></Button>
              <Button size="sm" variant="outline" onClick={() => toast.info('Analytics opened')}><BarChart3 className="h-4 w-4" /></Button>
              <Button size="sm" variant="danger" onClick={() => { setPackages(packages.filter((p) => p.id !== pkg.id)); toast.success('Plan deleted') }}><Trash2 className="h-4 w-4" /></Button>
            </span>
          </Card>
        ))}
      </span>
      <Modal open={editOpen} onClose={() => setEditOpen(false)} title="Edit Package">
        <span className="space-y-4">
          <Input label="Plan Name" value={form.plan} onChange={(e) => setForm({ ...form, plan: e.target.value })} />
          <Input label="Base Price" type="number" value={form.basePrice} onChange={(e) => setForm({ ...form, basePrice: Number(e.target.value) })} />
          <Input label="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
          <Button className="w-full" onClick={() => { toast.success('Plan saved'); setEditOpen(false) }}>Save</Button>
        </span>
      </Modal>
    </span>
  )
}
