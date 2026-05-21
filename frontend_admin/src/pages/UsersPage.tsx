import { useEffect, useMemo, useState } from 'react'
import { createColumnHelper } from '@tanstack/react-table'
import { Download, Plus } from 'lucide-react'
import { toast } from 'sonner'
import type { IspUser } from '@/types'
import { usersService } from '@/services/users.service'
import { AddUserWizard } from '@/features/users/AddUserWizard'
import { useUsersStore } from '@/store/usersStore'
import { UserDetailPanel } from '@/pages/UserDetailPage'
import { PageHeader } from '@/components/ui/PageHeader'
import { Button } from '@/components/ui/Button'
import { DataTable } from '@/components/ui/DataTable'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { Drawer } from '@/components/ui/Drawer'
import {
  ONU_STATUS_COLORS,
  ONU_STATUS_LABELS,
  SUBSCRIBER_STATUS_COLORS,
  SUBSCRIBER_STATUS_LABELS,
  USER_TYPE_COLORS,
  USER_TYPE_LABELS,
} from '@/constants/status'
import { cn } from '@/utils/cn'
import { formatDate } from '@/utils/format'

const col = createColumnHelper<IspUser>()

export function UsersPage() {
  const users = useUsersStore((s) => s.users)
  const setUsers = useUsersStore((s) => s.setUsers)
  const [addOpen, setAddOpen] = useState(false)

  useEffect(() => {
    usersService.findAll().then((res) => setUsers(res.data))
  }, [setUsers])
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const selectedUser = useMemo(
    () => users.find((user) => user.id === selectedId) ?? null,
    [users, selectedId],
  )

  const stats = useMemo(
    () => ({
      total: users.length,
      active: users.filter((u) => u.status === 'active').length,
      expired: users.filter((u) => u.status === 'expired').length,
      onlineOnu: users.filter((u) => u.onuStatus === 'online').length,
    }),
    [users],
  )

  const columns = useMemo(
    () => [
      col.accessor('id', {
        header: 'User ID',
        cell: (i) => <span className="font-mono text-xs font-semibold text-slate-700 dark:text-slate-200">{i.getValue()}</span>,
      }),
      col.accessor('name', {
        header: 'Name',
        cell: (i) => <span className="font-medium text-slate-900 dark:text-slate-100">{i.getValue()}</span>,
      }),
      col.accessor('phone', { header: 'Phone' }),
      col.accessor('region', { header: 'Region' }),
      col.accessor('plan', { header: 'Plan' }),
      col.accessor('months', {
        header: 'Months',
        cell: (i) => <span>{i.getValue()}</span>,
      }),
      col.accessor('endDate', {
        header: 'End Date',
        cell: (i) => formatDate(i.getValue()),
      }),
      col.accessor('remainingDays', {
        header: 'Day Left',
        cell: (i) => (
          <span
            className={cn(
              'font-medium',
              i.getValue() < 0 && 'text-red-600 dark:text-red-400',
              i.getValue() >= 0 && i.getValue() <= 7 && 'text-amber-600 dark:text-amber-300',
            )}
          >
            {i.getValue()}
          </span>
        ),
      }),
      col.accessor('status', {
        header: 'Status',
        cell: (i) => (
          <Badge className={SUBSCRIBER_STATUS_COLORS[i.getValue()]}>
            {SUBSCRIBER_STATUS_LABELS[i.getValue()]}
          </Badge>
        ),
      }),
      col.accessor('onuStatus', {
        header: 'ONU Status',
        cell: (i) => (
          <Badge className={ONU_STATUS_COLORS[i.getValue()]}>
            {ONU_STATUS_LABELS[i.getValue()]}
          </Badge>
        ),
      }),
      col.accessor('userType', {
        header: 'Type',
        cell: (i) => <Badge className={USER_TYPE_COLORS[i.getValue()]}>{USER_TYPE_LABELS[i.getValue()]}</Badge>,
      }),
      col.accessor('registrationDate', {
        header: 'Registered',
        cell: (i) => formatDate(i.getValue()),
      }),
    ],
    [],
  )

  return (
    <div className="space-y-6">
      <PageHeader
        title="Users"
        description="Manage subscriber identity, subscription state, and ONU access"
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

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Card className="p-4">
          <p className="text-xs font-medium uppercase text-slate-500">Total users</p>
          <p className="mt-2 text-2xl font-semibold">{stats.total}</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs font-medium uppercase text-slate-500">Active</p>
          <p className="mt-2 text-2xl font-semibold text-emerald-600 dark:text-emerald-300">{stats.active}</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs font-medium uppercase text-slate-500">Expired</p>
          <p className="mt-2 text-2xl font-semibold text-red-600 dark:text-red-300">{stats.expired}</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs font-medium uppercase text-slate-500">ONU online</p>
          <p className="mt-2 text-2xl font-semibold text-sky-600 dark:text-sky-300">{stats.onlineOnu}</p>
        </Card>
      </div>

      <DataTable
        data={users}
        columns={columns}
        searchPlaceholder="Search users..."
        onRowClick={(user) => setSelectedId(user.id)}
        emptyTitle="No users found"
        tableClassName="min-w-[1320px]"
      />

      <Drawer
        open={!!selectedUser}
        onClose={() => setSelectedId(null)}
        title={selectedUser?.id ?? 'User Details'}
        width="xl"
      >
        {selectedUser && (
          <UserDetailPanel
            key={selectedUser.id}
            user={selectedUser}
            onDeleted={() => setSelectedId(null)}
          />
        )}
      </Drawer>

      <AddUserWizard open={addOpen} onOpenChange={setAddOpen} />
    </div>
  )
}
