import { useEffect, useState, useMemo } from 'react'
import { createColumnHelper } from '@tanstack/react-table'
import { Download, DollarSign } from 'lucide-react'
import { toast } from 'sonner'
import { employeesService } from '@/services/employees.service'
import type { Employee } from '@/types'
import { PageHeader } from '@/components/ui/PageHeader'
import { Button } from '@/components/ui/Button'
import { DataTable } from '@/components/ui/DataTable'
import { Drawer } from '@/components/ui/Drawer'
import { formatCurrency } from '@/utils/format'

const col = createColumnHelper<Employee>()

function calcPayable(e: Employee) {
  const absentDeduction = e.absentDays * (e.basicSalary / 26)
  const overtimePay = e.overtime
  const bonus = e.bonus + (e.absentDays === 0 ? 20000 : 0)
  return e.basicSalary - absentDeduction + overtimePay + bonus - e.advancePayment
}

export function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<Employee | null>(null)

  useEffect(() => {
    employeesService.findAll().then((res) => { setEmployees(res); setLoading(false) })
  }, [])

  const columns = useMemo(
    () => [
      col.accessor('name', { header: 'Name' }),
      col.accessor('phone', { header: 'Phone' }),
      col.accessor('position', { header: 'Position' }),
      col.accessor('department', { header: 'Department' }),
      col.accessor('basicSalary', { header: 'Basic', cell: (i) => formatCurrency(i.getValue()) }),
      col.accessor('advancePayment', { header: 'Advance', cell: (i) => formatCurrency(i.getValue()) }),
      col.accessor('bonus', { header: 'Bonus', cell: (i) => formatCurrency(i.getValue()) }),
      col.accessor('overtime', { header: 'Overtime', cell: (i) => formatCurrency(i.getValue()) }),
      col.accessor('absentDays', { header: 'Absent' }),
      col.accessor('payableWages', { header: 'Payable', cell: (i) => formatCurrency(i.getValue()) }),
    ],
    [],
  )

  return (
    <span className="space-y-6">
      <PageHeader
        title="Employees"
        description="Payroll, attendance, and staff management"
        actions={
          <>
            <Button variant="outline" size="sm" onClick={() => toast.success('Payroll generated')}><Download className="h-4 w-4" /> Payroll</Button>
            <Button size="sm" onClick={() => toast.success('Payslip exported')}><Download className="h-4 w-4" /> Export</Button>
          </>
        }
      />
      <DataTable data={employees} columns={columns} isLoading={loading} onRowClick={setSelected} searchPlaceholder="Search employees..." />
      <Drawer open={!!selected} onClose={() => setSelected(null)} title={selected?.name ?? ''}>
        {selected && (
          <span className="space-y-4">
            <p className="text-sm text-slate-500">{selected.position} · {selected.department}</p>
            <span className="rounded-xl bg-slate-50 p-4 dark:bg-slate-800 space-y-2 text-sm">
              <p>Basic: {formatCurrency(selected.basicSalary)}</p>
              <p>Absent deduction: {formatCurrency(selected.absentDays * (selected.basicSalary / 26))}</p>
              <p>Calculated payable: <strong>{formatCurrency(calcPayable(selected))}</strong></p>
            </span>
            <p className="text-sm text-slate-500">Installations this month: 24 · Repairs: 8</p>
            <Button onClick={() => toast.success('Salary paid')}><DollarSign className="h-4 w-4" /> Pay Salary</Button>
          </span>
        )}
      </Drawer>
    </span>
  )
}
