import { useEffect, useMemo, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, Controller, useWatch, type Resolver } from 'react-hook-form'
import { z } from 'zod'
import { toast } from 'sonner'
import dayjs from 'dayjs'
import type { IspUser, SubscriberAccountStatus } from '@/types'
import { packagesService } from '@/services/packages.service'
import { regionsService } from '@/services/regions.service'
import { employeesService } from '@/services/employees.service'
import { useUsersStore } from '@/store/usersStore'
import {
  bundledExtraMonths,
  subscriptionBaseAmount,
  calculateCableInstallCost,
  computeBillingEndFromStart,
  type InstallBillingType,
} from '@/utils/subscriberPricing'
import { formatCurrency } from '@/utils/format'
import { MapView } from '@/components/map/MapView'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/utils/cn'

const step1Schema = z.object({
  id: z.string().min(1, 'User ID is required'),
  name: z.string().min(1, 'Name is required'),
  phone: z.string().min(6, 'Phone is required'),
  region: z.string().min(1, 'Region is required'),
  notes: z.string().optional(),
})

const step2Schema = z.object({
  userType: z.enum(['premium', 'foc']),
  plan: z.string().min(1),
  subscriptionMonths: z.union([z.literal(1), z.literal(3), z.literal(6), z.literal(12)]),
  extraMonthsDisplay: z.number().min(0),
  billingStart: z.string().min(1, 'Billing start required'),
  billingEnd: z.string().min(1, 'Billing end required'),
  adjustmentAmount: z.coerce.number().default(0),
})

const optionalCoord = z.preprocess(
  (value) => {
    if (value === '' || value == null) return undefined
    if (typeof value === 'number' && Number.isNaN(value)) return undefined
    return value
  },
  z.coerce.number().optional(),
)

const step3Schema = z.object({
  installStaff: z.string().min(1, 'Staff name required'),
  onuMac: z.string().min(1, 'ONU SN/MAC required'),
  onuType: z.string().min(1, 'ONU type required'),
  onuStatus: z.enum(['online', 'offline']),
  ponPort: z.string().min(1, 'PON port required'),
  dnSn: z.string().min(1, 'DN/SN required'),
  latitude: optionalCoord,
  longitude: optionalCoord,
  installBillingType: z.enum(['free', 'standard']),
  installTypeLabel: z.string().min(1),
  cableLength: z.coerce.number().min(0),
  paymentType: z.enum(['cash', 'bank_transfer', 'mobile_money']),
})

type Step1 = z.infer<typeof step1Schema>
type Step2 = z.infer<typeof step2Schema>
type Step3 = z.infer<typeof step3Schema>

const steps = ['Basic Info', 'Subscription Info', 'Installation & ONU']
const onuTypeOptions = ['Huawei', 'ZTE', 'FiberHome', 'TP-Link']

interface AddUserWizardProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddUserWizard({ open, onOpenChange }: AddUserWizardProps) {
  const addUser = useUsersStore((s) => s.addUser)
  const users = useUsersStore((s) => s.users)
  const [step, setStep] = useState(0)
  const [data1, setData1] = useState<Step1 | null>(null)
  const [data2, setData2] = useState<Step2 | null>(null)
  const [packages, setPackages] = useState<any[]>([])
  const [regions, setRegions] = useState<any[]>([])
  const [employees, setEmployees] = useState<any[]>([])

  useEffect(() => {
    if (!open) return
    packagesService.findAll().then(setPackages).catch(() => {})
    regionsService.findAll().then(setRegions).catch(() => {})
    employeesService.findAll().then(setEmployees).catch(() => {})
  }, [open])

  const form1 = useForm<Step1>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      id: '',
      name: '',
      phone: '',
      region: '',
      notes: '',
    },
  })

  const form2 = useForm<Step2>({
    resolver: zodResolver(step2Schema) as Resolver<Step2>,
    defaultValues: {
      userType: 'premium',
      plan: '',
      subscriptionMonths: 1,
      extraMonthsDisplay: 0,
      billingStart: dayjs().format('YYYY-MM-DD'),
      billingEnd: dayjs().add(1, 'month').format('YYYY-MM-DD'),
      adjustmentAmount: 0,
    },
  })

  const form3 = useForm<Step3>({
    resolver: zodResolver(step3Schema) as Resolver<Step3>,
    defaultValues: {
      installStaff: '',
      onuMac: '',
      onuType: onuTypeOptions[0],
      onuStatus: 'offline',
      ponPort: '',
      dnSn: '',
      latitude: 21.9588,
      longitude: 96.0891,
      installBillingType: 'standard',
      installTypeLabel: 'Standard installation',
      cableLength: 50,
      paymentType: 'cash',
    },
  })

  const { setValue: setForm2, getValues: getForm2Values } = form2
  const subMonths = useWatch({ control: form2.control, name: 'subscriptionMonths' })
  const bundleExtra = useMemo(() => bundledExtraMonths(subMonths), [subMonths])
  const userTypeWatch = useWatch({ control: form2.control, name: 'userType' })
  const planWatch = useWatch({ control: form2.control, name: 'plan' })
  const adjustmentWatch = useWatch({ control: form2.control, name: 'adjustmentAmount' })
  const billingStartWatch = useWatch({ control: form2.control, name: 'billingStart' })

  useEffect(() => {
    const extra = bundledExtraMonths(subMonths)
    setForm2('extraMonthsDisplay', extra)
    const start = getForm2Values('billingStart')
    const end = computeBillingEndFromStart(start, subMonths, extra)
    setForm2('billingEnd', end)
  }, [subMonths, billingStartWatch, setForm2, getForm2Values])

  const subLineTotal = useMemo(() => {
    const base = subscriptionBaseAmount(planWatch, subMonths, packages)
    if (userTypeWatch === 'foc') return 0
    return base
  }, [planWatch, subMonths, userTypeWatch, packages])

  const renewalDisplay = subLineTotal + (Number(adjustmentWatch) || 0)

  const installBilling = useWatch({ control: form3.control, name: 'installBillingType' })
  const cableLen = useWatch({ control: form3.control, name: 'cableLength' })
  const cableMeters = Number.isFinite(Number(cableLen)) ? Number(cableLen) : 0
  const installCost = useMemo(
    () => calculateCableInstallCost(installBilling as InstallBillingType, cableMeters),
    [installBilling, cableMeters],
  )

  const lat = useWatch({ control: form3.control, name: 'latitude' })
  const lng = useWatch({ control: form3.control, name: 'longitude' })
  const hasCoords = Number.isFinite(lat) && Number.isFinite(lng)

  const resetWizard = () => {
    setStep(0)
    setData1(null)
    setData2(null)
    form1.reset()
    form2.reset({
      userType: 'premium',
      plan: packages[0]?.name ?? '',
      subscriptionMonths: 1,
      extraMonthsDisplay: 0,
      billingStart: dayjs().format('YYYY-MM-DD'),
      billingEnd: dayjs().add(1, 'month').format('YYYY-MM-DD'),
      adjustmentAmount: 0,
    })
    form3.reset({
      installStaff: employees[0]?.name ?? '',
      onuMac: '',
      onuType: onuTypeOptions[0],
      onuStatus: 'offline',
      ponPort: '',
      dnSn: '',
      latitude: 21.9588,
      longitude: 96.0891,
      installBillingType: 'standard',
      installTypeLabel: 'Standard installation',
      cableLength: 50,
      paymentType: 'cash',
    })
  }

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) resetWizard()
    onOpenChange(nextOpen)
  }

  const suggestNextId = () => {
    const nums = users
      .map((u) => {
        const m = /^USR-(\d+)$/.exec(u.id)
        return m ? parseInt(m[1], 10) : 0
      })
      .filter(Boolean)
    const next = (nums.length ? Math.max(...nums) : 0) + 1
    return `USR-${String(next).padStart(4, '0')}`
  }

  function syncStep3InstallBilling(label: string) {
    const l = label.toLowerCase()
    if (l.includes('free')) form3.setValue('installBillingType', 'free')
    else form3.setValue('installBillingType', 'standard')
  }

  const onNextFromStep1 = form1.handleSubmit((d) => {
    if (users.some((u) => u.id === d.id)) {
      form1.setError('id', { message: 'User ID already exists' })
      return
    }
    setData1(d)
    setStep(1)
  })

  const onNextFromStep2 = form2.handleSubmit((d) => {
    setData2(d)
    setStep(2)
  })

  const onSubmit = form3.handleSubmit((d3) => {
    if (!data1 || !data2) return
    const extra = bundledExtraMonths(data2.subscriptionMonths)
    const endDate = computeBillingEndFromStart(data2.billingStart, data2.subscriptionMonths, extra)
    const remainingDays = dayjs(endDate).diff(dayjs(), 'day')
    let status: SubscriberAccountStatus = 'active'
    if (remainingDays < 0) status = 'expired'

    const user: IspUser = {
      id: data1.id,
      username: data1.name.toLowerCase().replace(/\s+/g, '_') || data1.id,
      name: data1.name,
      phone: data1.phone,
      region: data1.region,
      plan: data2.plan,
      months: data2.subscriptionMonths,
      endDate,
      remainingDays,
      status,
      userType: data2.userType,
      registrationDate: dayjs().format('YYYY-MM-DD'),
      notes: data1.notes || undefined,
      latitude: d3.latitude,
      longitude: d3.longitude,
      dnSn: d3.dnSn,
      port: d3.ponPort,
      cableLength: d3.cableLength,
      onuMac: d3.onuMac,
      onuType: d3.onuType,
      onuStatus: d3.onuStatus,
      installStaff: d3.installStaff,
      installType: d3.installTypeLabel,
      adjustmentAmount: data2.adjustmentAmount,
      billingStartDate: data2.billingStart,
      billingEndDate: data2.billingEnd,
      paymentType: d3.paymentType,
    }

    addUser(user)
    toast.success(`User ${data1.id} created (${d3.paymentType.replace('_', ' ')})`)
    handleOpenChange(false)
  })

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto sm:max-w-3xl" showClose>
        <DialogHeader>
          <DialogTitle>Add user — step {step + 1} of 3</DialogTitle>
        </DialogHeader>

        <div className="flex flex-wrap gap-2 text-xs">
          {steps.map((label, i) => (
            <div
              key={label}
              className={cn(
                'flex flex-1 min-w-[100px] items-center gap-2 rounded-xl border px-3 py-2',
                i === step && 'border-primary-500 bg-primary-50 dark:bg-primary-950/40',
                i < step && 'border-emerald-200 bg-emerald-50/50 dark:border-emerald-900 dark:bg-emerald-950/30',
              )}
            >
              <span
                className={cn(
                  'flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold',
                  i === step ? 'bg-primary-600 text-white' : i < step ? 'bg-emerald-600 text-white' : 'bg-slate-200 dark:bg-slate-700',
                )}
              >
                {i + 1}
              </span>
              <span className="font-medium">{label}</span>
            </div>
          ))}
        </div>

        <Separator />

        {step === 0 && (
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <Input label="User ID *" {...form1.register('id')} error={form1.formState.errors.id?.message} />
            {!form1.getValues('id') && (
              <Button type="button" variant="ghost" size="sm" className="-mt-2" onClick={() => form1.setValue('id', suggestNextId())}>
                Use suggested ID
              </Button>
            )}
            <Input label="Name *" {...form1.register('name')} error={form1.formState.errors.name?.message} />
            <Input label="Phone *" {...form1.register('phone')} error={form1.formState.errors.phone?.message} />
            <div>
              <Label className="mb-1.5 block">Region *</Label>
              <select
                className="focus-glow w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm dark:border-slate-600 dark:bg-slate-900"
                {...form1.register('region')}
              >
                {regions.length > 0 ? regions.map((r) => (
                  <option key={r.id} value={r.village_name ?? r.villageName}>
                    {r.village_name ?? r.villageName}
                  </option>
                )) : <option value="">No regions available</option>}
              </select>
            </div>
            <div>
              <Label className="mb-1.5 block">Notes</Label>
              <Textarea placeholder="Special cases for admins…" {...form1.register('notes')} />
            </div>
            <DialogFooter className="pt-4">
              <Button type="button" onClick={onNextFromStep1}>
                Next
              </Button>
            </DialogFooter>
          </form>
        )}

        {step === 1 && (
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label className="mb-1.5 block">User type</Label>
                <Controller
                  name="userType"
                  control={form2.control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="premium">Premium</SelectItem>
                        <SelectItem value="foc">FOC</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              <div>
                <Label className="mb-1.5 block">Wi-Fi plan</Label>
                <Controller
                  name="plan"
                  control={form2.control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {packages.map((p) => (
                          <SelectItem key={p.id} value={p.name ?? p.plan}>
                            {p.name ?? p.plan} — {formatCurrency(p.base_price ?? p.basePrice)}/mo
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              <div>
                <Label className="mb-1.5 block">Subscription term</Label>
                <Controller
                  name="subscriptionMonths"
                  control={form2.control}
                  render={({ field }) => (
                    <Select
                      value={String(field.value)}
                      onValueChange={(v) => field.onChange(Number(v) as 1 | 3 | 6 | 12)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 month</SelectItem>
                        <SelectItem value="3">3 months</SelectItem>
                        <SelectItem value="6">6 months (+1 promo month)</SelectItem>
                        <SelectItem value="12">12 months (+2 promo months)</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              <div>
                <Label className="mb-1.5 block">Extra promo months (auto)</Label>
                <Input readOnly disabled value={bundleExtra ? `+${bundleExtra}` : '0'} />
              </div>
              <Input label="Billing start *" type="date" {...form2.register('billingStart')} />
              <Input label="Billing end *" type="date" readOnly {...form2.register('billingEnd')} />
              <div className="sm:col-span-2">
                <Input
                  label="Adjustment amount (MMK)"
                  type="number"
                  {...form2.register('adjustmentAmount', { valueAsNumber: true })}
                  placeholder="Positive adds, negative subtracts on renewal"
                />
              </div>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm dark:border-slate-800 dark:bg-slate-900/50">
              <p className="font-medium text-slate-800 dark:text-slate-100">Billing preview</p>
              <p className="mt-2 text-slate-600 dark:text-slate-400">
                Plan line: <strong>{formatCurrency(subLineTotal)}</strong>
                {userTypeWatch === 'foc' && <span className="ml-2 text-xs">(FOC — plan fee waived)</span>}
              </p>
              <p className="text-slate-600 dark:text-slate-400">
                After adjustment: <strong className="text-primary-600">{formatCurrency(renewalDisplay)}</strong>
              </p>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setStep(0)}>
                Back
              </Button>
              <Button type="button" onClick={onNextFromStep2}>
                Next
              </Button>
            </DialogFooter>
          </form>
        )}

        {step === 2 && (
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label className="mb-1.5 block">Install staff</Label>
                <Controller
                  name="installStaff"
                  control={form3.control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select staff" />
                      </SelectTrigger>
                      <SelectContent>
                        {employees.map((e) => (
                          <SelectItem key={e.id} value={e.name}>
                            {e.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {form3.formState.errors.installStaff && (
                  <p className="mt-1 text-xs text-red-500">{form3.formState.errors.installStaff.message}</p>
                )}
              </div>
              <div>
                <Label className="mb-1.5 block">Install type</Label>
                <Controller
                  name="installTypeLabel"
                  control={form3.control}
                  render={({ field }) => (
                    <Select
                      value={field.value}
                      onValueChange={(v) => {
                        field.onChange(v)
                        syncStep3InstallBilling(v)
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Free installation">Free installation</SelectItem>
                        <SelectItem value="Standard installation">Standard installation (50,000 MMK)</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              <Input label="ONU SN/MAC *" {...form3.register('onuMac')} error={form3.formState.errors.onuMac?.message} />
              <div>
                <Label className="mb-1.5 block">ONU type</Label>
                <Controller
                  name="onuType"
                  control={form3.control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {onuTypeOptions.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              <div>
                <Label className="mb-1.5 block">ONU status</Label>
                <Controller
                  name="onuStatus"
                  control={form3.control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="online">Online</SelectItem>
                        <SelectItem value="offline">Offline</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              <Input label="OLT / PON port *" {...form3.register('ponPort')} error={form3.formState.errors.ponPort?.message} />
              <Input label="DN/SN *" {...form3.register('dnSn')} error={form3.formState.errors.dnSn?.message} />
              <Input
                label="Cable length (m)"
                type="number"
                {...form3.register('cableLength', { valueAsNumber: true })}
              />
              <Input
                label="Latitude"
                type="number"
                step="any"
                {...form3.register('latitude', { valueAsNumber: true })}
              />
              <Input
                label="Longitude"
                type="number"
                step="any"
                {...form3.register('longitude', { valueAsNumber: true })}
              />
              <div className="sm:col-span-2">
                <Label className="mb-1.5 block">Payment type</Label>
                <Controller
                  name="paymentType"
                  control={form3.control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cash">Cash</SelectItem>
                        <SelectItem value="bank_transfer">Bank transfer</SelectItem>
                        <SelectItem value="mobile_money">Mobile money</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>

            <div className="rounded-xl border p-4 text-sm dark:border-slate-800">
              <p className="font-medium">Installation cable cost (auto)</p>
              <p className="mt-2 text-slate-600 dark:text-slate-400">
                Installation fee: <strong>{formatCurrency(installCost.installationFee)}</strong>
              </p>
              <p className="text-slate-600 dark:text-slate-400">
                Cable over 300m ({Math.max(0, cableMeters - 300)}m × 300 MMK):{' '}
                <strong>{formatCurrency(installCost.cableExtra)}</strong>
              </p>
              <p className="mt-2 font-semibold text-primary-600">Total install: {formatCurrency(installCost.total)}</p>
            </div>

            <div>
              <Label className="mb-1.5 block">Map preview</Label>
              <MapView
                center={hasCoords ? [lat!, lng!] : undefined}
                markers={
                  hasCoords
                    ? [{ lat: lat!, lng: lng!, label: data1?.name ?? data1?.id ?? 'Install' }]
                    : []
                }
                onClick={(la, lo) => {
                  form3.setValue('latitude', la)
                  form3.setValue('longitude', lo)
                }}
                height="220px"
                showNoCoordsHint
              />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button type="button" onClick={onSubmit}>
                Confirm create
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
