import { useState } from 'react'
import { Download, FileText } from 'lucide-react'
import { toast } from 'sonner'
import { PageHeader } from '@/components/ui/PageHeader'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

const REPORT_TYPES = [
  'Revenue Report',
  'Expense Report',
  'Profit Report',
  'User Growth Report',
  'Region Report',
  'Employee Payroll Report',
]

export function ReportsPage() {
  const [filters, setFilters] = useState({ region: '', plan: '', paymentType: '', from: '', to: '' })

  const exportReport = (format: string) => {
    toast.success(`${format} report generated (mock)`)
  }

  return (
    <span className="space-y-6">
      <PageHeader title="Reports" description="Advanced analytics and exports" />
      <Card>
        <h3 className="mb-4 font-semibold">Filters</h3>
        <span className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <span>
            <label className="text-sm font-medium">From</label>
            <input type="date" className="mt-1 w-full rounded-xl border px-3 py-2 text-sm dark:bg-slate-800" value={filters.from} onChange={(e) => setFilters({ ...filters, from: e.target.value })} />
          </span>
          <span>
            <label className="text-sm font-medium">To</label>
            <input type="date" className="mt-1 w-full rounded-xl border px-3 py-2 text-sm dark:bg-slate-800" value={filters.to} onChange={(e) => setFilters({ ...filters, to: e.target.value })} />
          </span>
          <span>
            <label className="text-sm font-medium">Region</label>
            <select className="mt-1 w-full rounded-xl border px-3 py-2 text-sm dark:bg-slate-800" value={filters.region} onChange={(e) => setFilters({ ...filters, region: e.target.value })}>
              <option value="">All</option>
              <option>Mandalay North</option>
              <option>Amarapura</option>
            </select>
          </span>
          <span>
            <label className="text-sm font-medium">Payment</label>
            <select className="mt-1 w-full rounded-xl border px-3 py-2 text-sm dark:bg-slate-800" value={filters.paymentType} onChange={(e) => setFilters({ ...filters, paymentType: e.target.value })}>
              <option value="">All</option>
              <option value="cash">Cash</option>
              <option value="kpay">Kpay</option>
            </select>
          </span>
        </span>
      </Card>
      <span className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {REPORT_TYPES.map((name) => (
          <Card key={name} hover>
            <span className="flex items-start gap-3">
              <FileText className="h-8 w-8 text-primary-500" />
              <span>
                <h3 className="font-semibold">{name}</h3>
                <span className="mt-3 flex flex-wrap gap-2">
                  <Button size="sm" variant="outline" onClick={() => exportReport('PDF')}><Download className="h-3 w-3" /> PDF</Button>
                  <Button size="sm" variant="outline" onClick={() => exportReport('Excel')}>Excel</Button>
                  <Button size="sm" variant="ghost" onClick={() => exportReport('CSV')}>CSV</Button>
                </span>
              </span>
            </span>
          </Card>
        ))}
      </span>
    </span>
  )
}
