import { useEffect, useState, useMemo } from 'react'
import { createColumnHelper } from '@tanstack/react-table'
import { Plus, Download, MessageSquare, Phone } from 'lucide-react'
import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import { mockApi } from '@/services/mock/api'
import type { IspUser } from '@/types'
import { PageHeader } from '@/components/ui/PageHeader'
import { Button } from '@/components/ui/Button'
import { DataTable } from '@/components/ui/DataTable'
import { Badge } from '@/components/ui/Badge'
import { Drawer } from '@/components/ui/Drawer'
import { Modal } from '@/components/ui/Modal'
import { Input } from '@/components/ui/Input'
import { MapView } from '@/components/map/MapView'
import { SUBSCRIBER_STATUS_COLORS, SUBSCRIBER_STATUS_LABELS } from '@/constants/status'
import { formatDate, formatCurrency } from '@/utils/format'
import { mockPackages, mockRegions } from '@/services/mock/data'

const col = createColumnHelper<IspUser>()

export function UsersPage() {
  const [users, setUsers] = useState<IspUser[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<IspUser | null>(null)
  const [addOpen, setAddOpen] = useState(false)
  const { register, handleSubmit, reset, watch, setValue } = useForm({
    defaultValues: {
      username: '',
      phone: '',
      region: mockRegions[0].villageName,
      package: mockPackages[0].plan,
      months: 1,
      installationType: 'Standard',
      latitude: 21.9588,
      longitude: 96.0891,
      port: '',
      cableMeter: 50,
      onuMac: '',
      onuType: 'Huawei',
    },
  })

  const months = watch('months')
  const pkg = watch('package')
  const basePrice = mockPackages.find((p) => p.plan === pkg)?.basePrice ?? 25000
  const totalPrice = basePrice * Number(months)

  const load = async () => {
    setLoading(true)
    setUsers(await mockApi.getUsers())
    setLoading(false)
  }

  useEffect(() => {
    load()
  }, [])

  const columns = useMemo(
    () => [
      col.accessor('id', { header: 'User ID' }),
      col.accessor('username', { header: 'Username' }),
      col.accessor('phone', { header: 'Phone' }),
      col.accessor('region', { header: 'Region' }),
      col.accessor('plan', { header: 'Plan' }),
      col.accessor('months', { header: 'Months' }),
      col.accessor('endDate', { header: 'End Date', cell: (i) => formatDate(i.getValue()) }),
      col.accessor('remainingDays', { header: 'Days Left' }),
      col.accessor('status', {
        header: 'Status',
        cell: (i) => (
          <Badge className={SUBSCRIBER_STATUS_COLORS[i.getValue()]}>{SUBSCRIBER_STATUS_LABELS[i.getValue()]}</Badge>
        ),
      }),
      col.accessor('onuStatus', { header: 'ONU' }),
      col.accessor('port', { header: 'Port' }),
      col.accessor('cableLength', { header: 'Cable (m)' }),
      col.accessor('registrationDate', { header: 'Registered', cell: (i) => formatDate(i.getValue()) }),
    ],
    [],
  )

  const onAddUser = handleSubmit((data) => {
    const newUser: IspUser = {
      id: `USR-${String(users.length + 1).padStart(4, '0')}`,
      username: data.username,
      name: data.username,
      phone: data.phone,
      region: data.region,
      plan: data.package,
      months: Number(data.months),
      endDate: formatDate(new Date(Date.now() + Number(data.months) * 30 * 86400000), 'YYYY-MM-DD'),
      remainingDays: Number(data.months) * 30,
      status: 'active',
      onuStatus: 'offline',
      userType: 'premium',
      port: data.port,
      cableLength: Number(data.cableMeter),
      registrationDate: formatDate(new Date(), 'YYYY-MM-DD'),
      latitude: data.latitude,
      longitude: data.longitude,
      onuMac: data.onuMac,
      onuType: data.onuType,
    }
    setUsers([newUser, ...users])
    setAddOpen(false)
    reset()
    toast.success('User created successfully')
  })

  return (
    <span className="space-y-6">
      <PageHeader
        title="Users"
        description="Manage ISP subscribers and network assignments"
        actions={
          <>
            <Button variant="outline" size="sm" onClick={() => toast.success('Exporting Excel...')}>
              <Download className="h-4 w-4" /> Export
            </Button>
            <Button size="sm" onClick={() => setAddOpen(true)}>
              <Plus className="h-4 w-4" /> Add User
            </Button>
          </>
        }
      />

      <DataTable
        data={users}
        columns={columns}
        isLoading={loading}
        searchPlaceholder="Search users..."
        onRowClick={setSelected}
        emptyTitle="No users found"
      />

      <Drawer open={!!selected} onClose={() => setSelected(null)} title={selected?.username ?? 'User Details'} width="xl">
        {selected && (
          <span className="space-y-6">
            <span className="grid gap-4 sm:grid-cols-2">
              <span><p className="text-xs text-slate-500">Phone</p><p className="font-medium">{selected.phone}</p></span>
              <span><p className="text-xs text-slate-500">Region</p><p className="font-medium">{selected.region}</p></span>
              <span><p className="text-xs text-slate-500">Plan</p><p className="font-medium">{selected.plan}</p></span>
              <span><p className="text-xs text-slate-500">ONU MAC</p><p className="font-medium">{selected.onuMac}</p></span>
            </span>

            <MapView
              center={[selected.latitude ?? 21.95, selected.longitude ?? 96.08]}
              markers={[{ lat: selected.latitude ?? 21.95, lng: selected.longitude ?? 96.08, label: selected.username }]}
              height="240px"
            />

            <span className="flex flex-wrap gap-2">
              <Button size="sm" onClick={() => toast.success('Renewal started')}>Quick Renewal</Button>
              <Button size="sm" variant="outline" onClick={() => toast.info('User suspended')}>Suspend</Button>
              <Button size="sm" variant="outline" onClick={() => toast.success('User activated')}>Activate</Button>
              <Button size="sm" variant="danger" onClick={() => { toast.error('User deleted'); setSelected(null) }}>Delete</Button>
              <Button size="sm" variant="ghost"><MessageSquare className="h-4 w-4" /> SMS</Button>
              <Button size="sm" variant="ghost"><Phone className="h-4 w-4" /> WhatsApp</Button>
            </span>
          </span>
        )}
      </Drawer>

      <Modal open={addOpen} onClose={() => setAddOpen(false)} title="Add User" size="lg">
        <form onSubmit={onAddUser} className="grid gap-4 sm:grid-cols-2">
          <Input label="Username" {...register('username', { required: true })} />
          <Input label="Phone" {...register('phone', { required: true })} />
          <span>
            <label className="mb-1.5 block text-sm font-medium">Region</label>
            <select className="focus-glow w-full rounded-xl border px-4 py-2.5 text-sm dark:bg-slate-800" {...register('region')}>
              {mockRegions.map((r) => <option key={r.id} value={r.villageName}>{r.villageName}</option>)}
            </select>
          </span>
          <span>
            <label className="mb-1.5 block text-sm font-medium">Package</label>
            <select className="focus-glow w-full rounded-xl border px-4 py-2.5 text-sm dark:bg-slate-800" {...register('package')}>
              {mockPackages.map((p) => <option key={p.id} value={p.plan}>{p.plan}</option>)}
            </select>
          </span>
          <Input label="Months" type="number" {...register('months')} />
          <Input label="Port" {...register('port')} />
          <Input label="Cable Meter" type="number" {...register('cableMeter')} />
          <Input label="ONU MAC" {...register('onuMac')} />
          <Input label="ONU Type" {...register('onuType')} />
          <span className="sm:col-span-2 rounded-xl bg-slate-50 p-4 dark:bg-slate-800">
            <p className="text-sm text-slate-500">Estimated price: <strong>{formatCurrency(totalPrice)}</strong></p>
            <p className="text-sm text-slate-500">End date: auto-calculated on save</p>
          </span>
          <span className="sm:col-span-2">
            <MapView
              center={[watch('latitude'), watch('longitude')]}
              onClick={(lat, lng) => { setValue('latitude', lat); setValue('longitude', lng) }}
              height="200px"
            />
          </span>
          <span className="flex justify-end gap-2 sm:col-span-2">
            <Button type="button" variant="outline" onClick={() => setAddOpen(false)}>Cancel</Button>
            <Button type="submit">Create User</Button>
          </span>
        </form>
      </Modal>

    </span>
  )
}
