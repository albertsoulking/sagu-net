import { useEffect, useState, useMemo } from 'react'
import { createColumnHelper } from '@tanstack/react-table'
import { Plus } from 'lucide-react'
import { toast } from 'sonner'
import { mockApi } from '@/services/mock/api'
import type { IncomeChange } from '@/types'
import { PageHeader } from '@/components/ui/PageHeader'
import { Button } from '@/components/ui/Button'
import { DataTable } from '@/components/ui/DataTable'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Modal } from '@/components/ui/Modal'
import { Input } from '@/components/ui/Input'
import { formatCurrency, formatDate } from '@/utils/format'

const col = createColumnHelper<IncomeChange>()

export function IncomeChangesPage() {
  const [data, setData] = useState<IncomeChange[]>([])
  const [loading, setLoading] = useState(true)
  const [addOpen, setAddOpen] = useState(false)

  useEffect(() => {
    mockApi.getIncomeChanges().then((d) => { setData(d); setLoading(false) })
  }, [])

  const cashBalance = data.filter((d) => d.direction === 'in' && d.paymentType === 'cash').reduce((s, d) => s + d.amount, 0)
    - data.filter((d) => d.direction === 'out' && d.paymentType === 'cash').reduce((s, d) => s + d.amount, 0)

  const columns = useMemo(
    () => [
      col.accessor('date', { header: 'Date', cell: (i) => formatDate(i.getValue()) }),
      col.accessor('paymentType', { header: 'Payment Type' }),
      col.accessor('direction', {
        header: 'Direction',
        cell: (i) => (
          <Badge className={i.getValue() === 'in' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}>
            {i.getValue() === 'in' ? 'In' : 'Out'}
          </Badge>
        ),
      }),
      col.accessor('amount', { header: 'Amount', cell: (i) => formatCurrency(i.getValue()) }),
      col.accessor('description', { header: 'Description' }),
    ],
    [],
  )

  return (
    <span className="space-y-6">
      <PageHeader title="Income Changes" description="Manual adjustments and cash flow tracking" actions={<Button size="sm" onClick={() => setAddOpen(true)}><Plus className="h-4 w-4" /> Add Adjustment</Button>} />
      <span className="grid gap-4 sm:grid-cols-3">
        <Card><p className="text-sm text-slate-500">Daily Balance</p><p className="text-2xl font-bold">{formatCurrency(cashBalance)}</p></Card>
        <Card><p className="text-sm text-slate-500">Cash Flow Status</p><p className="text-2xl font-bold text-emerald-600">Healthy</p></Card>
        <Card><p className="text-sm text-slate-500">Records</p><p className="text-2xl font-bold">{data.length}</p></Card>
      </span>
      <DataTable data={data} columns={columns} isLoading={loading} searchPlaceholder="Search records..." />
      <Modal open={addOpen} onClose={() => setAddOpen(false)} title="Income Adjustment">
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); toast.success('Adjustment saved'); setAddOpen(false) }}>
          <Input label="Amount" type="number" required />
          <Input label="Description" required />
          <span>
            <label className="mb-1.5 block text-sm font-medium">Direction</label>
            <select className="w-full rounded-xl border px-4 py-2.5 text-sm dark:bg-slate-800"><option value="in">In</option><option value="out">Out</option></select>
          </span>
          <Button type="submit" className="w-full">Save</Button>
        </form>
      </Modal>
    </span>
  )
}
