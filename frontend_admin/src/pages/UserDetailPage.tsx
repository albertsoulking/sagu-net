import { useMemo, useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import type {
  OnuConnectionStatus,
  SubscriberAccountStatus,
  SubscriberAccountType,
} from '@/types'
import { mockPackages } from '@/services/mock/data'
import { useUsersStore } from '@/store/usersStore'
import { computeRenewalEndAndDays, subscriptionBaseAmount } from '@/utils/subscriberPricing'
import { formatCurrency, formatDate } from '@/utils/format'
import { MapView } from '@/components/map/MapView'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { PageHeader } from '@/components/ui/PageHeader'
import { Card } from '@/components/ui/Card'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  SUBSCRIBER_STATUS_COLORS,
  ONU_STATUS_COLORS,
  USER_TYPE_COLORS,
  SUBSCRIBER_STATUS_LABELS,
  ONU_STATUS_LABELS,
  USER_TYPE_LABELS,
} from '@/constants/status'

export function UserDetailPage() {
  const { userId } = useParams<{ userId: string }>()
  const navigate = useNavigate()
  const user = useUsersStore((s) => (userId ? s.getById(userId) : undefined))
  const updateUser = useUsersStore((s) => s.updateUser)
  const deleteUser = useUsersStore((s) => s.deleteUser)

  const [notesDraft, setNotesDraft] = useState('')
  useEffect(() => {
    setNotesDraft(user?.notes ?? '')
  }, [user?.notes, user?.id])

  const [renewOpen, setRenewOpen] = useState(false)
  const [renewMonths, setRenewMonths] = useState(1)
  const [upgradeOpen, setUpgradeOpen] = useState(false)
  const [upgradePlan, setUpgradePlan] = useState('')
  const [typeOpen, setTypeOpen] = useState(false)
  const [statusOpen, setStatusOpen] = useState(false)
  const [onuOpen, setOnuOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)

  const upgradeEstimate = useMemo(() => {
    if (!user || !upgradePlan) return 0
    const m = Math.max(1, user.months)
    return subscriptionBaseAmount(upgradePlan, m, mockPackages) + (user.adjustmentAmount ?? 0)
  }, [user, upgradePlan])

  if (!userId) {
    navigate('/users')
    return null
  }

  if (!user) {
    return (
      <div className="space-y-4">
        <PageHeader title="User not found" description="This subscriber ID does not exist." />
        <Button variant="outline" onClick={() => navigate('/users')}>
          Back to users
        </Button>
      </div>
    )
  }

  const saveNotes = () => {
    updateUser(user.id, { notes: notesDraft || undefined })
    toast.success('Notes saved')
  }

  const runRenew = () => {
    const { endDate, remainingDays } = computeRenewalEndAndDays(user.endDate, renewMonths)
    let status: SubscriberAccountStatus = user.status
    if (remainingDays >= 0) status = 'active'
    updateUser(user.id, {
      endDate,
      remainingDays,
      months: renewMonths,
      status,
    })
    setRenewOpen(false)
    toast.success(`Renewed ${renewMonths} month(s). New end: ${formatDate(endDate)}`)
  }

  const runUpgrade = () => {
    if (!upgradePlan) return
    updateUser(user.id, { plan: upgradePlan })
    setUpgradeOpen(false)
    toast.success(`Plan updated to ${upgradePlan}. Estimated renewal: ${formatCurrency(upgradeEstimate)}`)
  }

  const runSetType = (t: SubscriberAccountType) => {
    updateUser(user.id, { userType: t })
    setTypeOpen(false)
    toast.success(`Type set to ${USER_TYPE_LABELS[t]}`)
  }

  const runSetStatus = (s: SubscriberAccountStatus) => {
    updateUser(user.id, { status: s })
    setStatusOpen(false)
    toast.success(`Status set to ${SUBSCRIBER_STATUS_LABELS[s]}`)
  }

  const runSetOnu = (o: OnuConnectionStatus) => {
    updateUser(user.id, { onuStatus: o })
    setOnuOpen(false)
    toast.success(`ONU set to ${ONU_STATUS_LABELS[o]}`)
  }

  const runDelete = () => {
    deleteUser(user.id)
    setDeleteOpen(false)
    toast.success('User removed')
    navigate('/users')
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Link
            to="/users"
            className="mb-3 inline-flex items-center gap-1 text-sm text-primary-600 hover:underline"
          >
            <ArrowLeft className="h-4 w-4" /> Users
          </Link>
          <PageHeader title={user.id} description="Subscriber profile and network actions" />
        </div>
      </div>

      <Card>
        <h2 className="mb-4 text-lg font-semibold">Profile</h2>
        <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <dt className="text-xs text-slate-500">Name</dt>
            <dd className="font-medium">{user.name}</dd>
          </div>
          <div>
            <dt className="text-xs text-slate-500">Phone</dt>
            <dd className="font-medium">{user.phone}</dd>
          </div>
          <div>
            <dt className="text-xs text-slate-500">Region</dt>
            <dd className="font-medium">{user.region}</dd>
          </div>
          <div>
            <dt className="text-xs text-slate-500">Plan</dt>
            <dd className="font-medium">{user.plan}</dd>
          </div>
          <div>
            <dt className="text-xs text-slate-500">Months (term)</dt>
            <dd className="font-medium">{user.months}</dd>
          </div>
          <div>
            <dt className="text-xs text-slate-500">End date</dt>
            <dd className="font-medium">{formatDate(user.endDate)}</dd>
          </div>
          <div>
            <dt className="text-xs text-slate-500">Day left</dt>
            <dd className="font-medium">{user.remainingDays}</dd>
          </div>
          <div>
            <dt className="text-xs text-slate-500">Status</dt>
            <dd>
              <Badge className={SUBSCRIBER_STATUS_COLORS[user.status]}>
                {SUBSCRIBER_STATUS_LABELS[user.status]}
              </Badge>
            </dd>
          </div>
          <div>
            <dt className="text-xs text-slate-500">Type</dt>
            <dd>
              <Badge className={USER_TYPE_COLORS[user.userType]}>{USER_TYPE_LABELS[user.userType]}</Badge>
            </dd>
          </div>
          <div>
            <dt className="text-xs text-slate-500">Registered</dt>
            <dd className="font-medium">{formatDate(user.registrationDate)}</dd>
          </div>
        </dl>
        <div className="mt-6">
          <Label className="mb-1.5 block">Notes</Label>
          <Textarea value={notesDraft} onChange={(e) => setNotesDraft(e.target.value)} rows={3} />
          <Button className="mt-2" size="sm" type="button" onClick={saveNotes}>
            Save notes
          </Button>
        </div>
      </Card>

      <Card>
        <h2 className="mb-4 text-lg font-semibold">Installation</h2>
        <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <dt className="text-xs text-slate-500">Longitude</dt>
            <dd className="font-medium">{user.longitude ?? '—'}</dd>
          </div>
          <div>
            <dt className="text-xs text-slate-500">Latitude</dt>
            <dd className="font-medium">{user.latitude ?? '—'}</dd>
          </div>
          <div>
            <dt className="text-xs text-slate-500">DN/SN</dt>
            <dd className="font-medium">{user.dnSn ?? '—'}</dd>
          </div>
          <div>
            <dt className="text-xs text-slate-500">Port (PON)</dt>
            <dd className="font-medium">{user.port}</dd>
          </div>
          <div>
            <dt className="text-xs text-slate-500">Cable length</dt>
            <dd className="font-medium">{user.cableLength} m</dd>
          </div>
          <div>
            <dt className="text-xs text-slate-500">SN / MAC</dt>
            <dd className="font-medium font-mono text-sm">{user.onuMac ?? '—'}</dd>
          </div>
          <div>
            <dt className="text-xs text-slate-500">ONU type</dt>
            <dd className="font-medium">{user.onuType ?? '—'}</dd>
          </div>
          <div>
            <dt className="text-xs text-slate-500">ONU status</dt>
            <dd>
              <Badge className={ONU_STATUS_COLORS[user.onuStatus]}>{ONU_STATUS_LABELS[user.onuStatus]}</Badge>
            </dd>
          </div>
          {user.installStaff && (
            <div>
              <dt className="text-xs text-slate-500">Install staff</dt>
              <dd className="font-medium">{user.installStaff}</dd>
            </div>
          )}
        </dl>

        <div className="mt-6">
          <h3 className="mb-2 text-sm font-medium text-slate-600 dark:text-slate-400">Location</h3>
          <MapView
            height="280px"
            center={
              user.latitude != null && user.longitude != null
                ? [user.latitude, user.longitude]
                : undefined
            }
            markers={
              user.latitude != null && user.longitude != null
                ? [{ lat: user.latitude, lng: user.longitude, label: user.name }]
                : []
            }
            showNoCoordsHint
          />
        </div>
      </Card>

      <Card>
        <h2 className="mb-4 text-lg font-semibold">Actions</h2>
        <div className="flex flex-wrap gap-2">
          <Button size="sm" onClick={() => setRenewOpen(true)}>
            Renew
          </Button>
          <Button size="sm" variant="secondary" onClick={() => { setUpgradePlan(user.plan); setUpgradeOpen(true) }}>
            Upgrade plan
          </Button>
          <Button size="sm" variant="outline" onClick={() => setTypeOpen(true)}>
            Set type
          </Button>
          <Button size="sm" variant="outline" onClick={() => setStatusOpen(true)}>
            Set status
          </Button>
          <Button size="sm" variant="outline" onClick={() => setOnuOpen(true)}>
            Set ONU status
          </Button>
          <Button size="sm" variant="danger" onClick={() => setDeleteOpen(true)}>
            <Trash2 className="mr-1 h-4 w-4" /> Delete
          </Button>
        </div>
      </Card>

      <Dialog open={renewOpen} onOpenChange={setRenewOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Renew subscription</DialogTitle>
          </DialogHeader>
          <div>
            <Label className="mb-1.5 block">Months</Label>
            <Select value={String(renewMonths)} onValueChange={(v) => setRenewMonths(Number(v))}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                  <SelectItem key={m} value={String(m)}>{m} month{m > 1 ? 's' : ''}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRenewOpen(false)}>Cancel</Button>
            <Button onClick={runRenew}>Apply renew</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={upgradeOpen} onOpenChange={setUpgradeOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upgrade package</DialogTitle>
          </DialogHeader>
          <div>
            <Label className="mb-1.5 block">New plan</Label>
            <Select value={upgradePlan} onValueChange={setUpgradePlan}>
              <SelectTrigger><SelectValue placeholder="Select plan" /></SelectTrigger>
              <SelectContent>
                {mockPackages.map((p) => (
                  <SelectItem key={p.id} value={p.plan}>{p.plan} — {formatCurrency(p.basePrice)}/mo</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
              Estimated renewal (plan × current term months + adjustment):{' '}
              <strong>{formatCurrency(upgradeEstimate)}</strong>
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setUpgradeOpen(false)}>Cancel</Button>
            <Button onClick={runUpgrade}>Confirm upgrade</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={typeOpen} onOpenChange={setTypeOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Set user type</DialogTitle>
          </DialogHeader>
          <div className="flex gap-2">
            <Button className="flex-1" variant={user.userType === 'premium' ? 'primary' : 'outline'} onClick={() => runSetType('premium')}>
              Premium
            </Button>
            <Button className="flex-1" variant={user.userType === 'foc' ? 'primary' : 'outline'} onClick={() => runSetType('foc')}>
              FOC
            </Button>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setTypeOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={statusOpen} onOpenChange={setStatusOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Set account status</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            {(['active', 'expired', 'suspended'] as const).map((s) => (
              <Button key={s} variant="outline" onClick={() => runSetStatus(s)}>
                {SUBSCRIBER_STATUS_LABELS[s]}
              </Button>
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setStatusOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={onuOpen} onOpenChange={setOnuOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Set ONU status</DialogTitle>
          </DialogHeader>
          <div className="flex gap-2">
            <Button className="flex-1" variant="outline" onClick={() => runSetOnu('online')}>Online</Button>
            <Button className="flex-1" variant="outline" onClick={() => runSetOnu('offline')}>Offline</Button>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOnuOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete account</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Remove {user.id} and related client-side data? This cannot be undone in the mock app.
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteOpen(false)}>Cancel</Button>
            <Button variant="danger" onClick={runDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
