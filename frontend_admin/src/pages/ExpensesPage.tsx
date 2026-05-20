import { useEffect, useState, useMemo } from 'react'
import { createColumnHelper } from '@tanstack/react-table'
import { Plus } from 'lucide-react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts'
import { toast } from 'sonner'
import { mockApi } from '@/services/mock/api'
import type { Expense } from '@/types'
import { PageHeader } from '@/components/ui/PageHeader'
import { Button } from '@/components/ui/Button'
import { DataTable } from '@/components/ui/DataTable'
import { Card } from '@/components/ui/Card'
import { Modal } from '@/components/ui/Modal'
import { Input } from '@/components/ui/Input'
import { EXPENSE_CATEGORIES } from '@/constants/status'
import { formatCurrency, formatDate } from '@/utils/format'

const COLORS = ['#3b82f6', '#06b6d4', '#10b981', '#f59e0b', '#8b5cf6']
const col = createColumnHelper<Expense>()

export function ExpensesPage() {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [chartData, setChartData] = useState<{ name: string; value: number }[]>([])
  const [loading, setLoading] = useState(true)
  const [addOpen, setAddOpen] = useState(false)

  useEffect(() => {
    Promise.all([mockApi.getExpenses(), mockApi.getExpenseCharts()]).then(([e, c]) => {
      setExpenses(e)
      setChartData(c.byCategory.map((d) => ({ name: d.name, value: d.value ?? 0 })))
      setLoading(false)
    })
  }, [])

  const columns = useMemo(
    () => [
      col.accessor('date', { header: 'Date', cell: (i) => formatDate(i.getValue()) }),
      col.accessor('name', { header: 'Name' }),
      col.accessor('category', { header: 'Category' }),
      col.accessor('paymentType', { header: 'Payment' }),
      col.accessor('singleAmount', { header: 'Unit', cell: (i) => formatCurrency(i.getValue()) }),
      col.accessor('quantity', { header: 'Qty' }),
      col.accessor('totalAmount', { header: 'Total', cell: (i) => formatCurrency(i.getValue()) }),
    ],
    [],
  )

  return (
    <span className="space-y-6">
      <PageHeader title="Expenses" description="Track business spending and receipts" actions={<Button size="sm" onClick={() => setAddOpen(true)}><Plus className="h-4 w-4" /> Add Expense</Button>} />
      <span className="grid gap-6 lg:grid-cols-2">
        <Card>
          <h3 className="mb-4 font-semibold">Expense by Category</h3>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                {chartData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip formatter={(v) => formatCurrency(Number(v))} />
            </PieChart>
          </ResponsiveContainer>
        </Card>
        <Card>
          <h3 className="mb-4 font-semibold">Monthly Expense</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tick={{ fontSize: 10 }} />
              <YAxis tickFormatter={(v) => `${(v / 1e6).toFixed(1)}M`} />
              <Tooltip formatter={(v) => formatCurrency(Number(v))} />
              <Bar dataKey="value" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </span>
      <DataTable data={expenses} columns={columns} isLoading={loading} searchPlaceholder="Search expenses..." />
      <Modal open={addOpen} onClose={() => setAddOpen(false)} title="Add Expense">
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); toast.success('Expense added'); setAddOpen(false) }}>
          <Input label="Name" required />
          <span>
            <label className="mb-1.5 block text-sm font-medium">Category</label>
            <select className="w-full rounded-xl border px-4 py-2.5 text-sm dark:bg-slate-800">
              {EXPENSE_CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </span>
          <Input label="Amount" type="number" required />
          <Input label="Quantity" type="number" defaultValue={1} />
          <Button type="submit" className="w-full">Save Expense</Button>
        </form>
      </Modal>
    </span>
  )
}
