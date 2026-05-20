import { useEffect, useMemo, type ComponentType } from 'react'
import { Controller, useForm, useWatch, type Resolver } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { DollarSign, Map, MapPinned, Save, Users, X } from 'lucide-react'
import { toast } from 'sonner'
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from 'react-leaflet'
import L, { type Marker as LeafletMarker } from 'leaflet'
import type { Region } from '@/types'
import {
  defaultRegionFormValues,
  REGION_STATUS_OPTIONS,
  regionSchema,
  type RegionFormValues,
} from '@/schemas/region.schema'
import {
  calculateMockCoverageAnalytics,
  createMockRegion,
  DuplicateRegionError,
} from '@/services/region.service'
import { formatCurrency } from '@/utils/format'
import { cn } from '@/utils/cn'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogClose,
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

const defaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
})
L.Marker.prototype.options.icon = defaultIcon

const DEFAULT_COORDS = {
  lat: defaultRegionFormValues.latitude,
  lng: defaultRegionFormValues.longitude,
}

interface AddRegionDialogProps {
  open: boolean
  saving: boolean
  regions: Region[]
  onOpenChange: (open: boolean) => void
  onSavingChange: (saving: boolean) => void
  onRegionCreated: (region: Region) => void
}

export function AddRegionDialog({
  open,
  saving,
  regions,
  onOpenChange,
  onSavingChange,
  onRegionCreated,
}: AddRegionDialogProps) {
  const form = useForm<RegionFormValues>({
    resolver: zodResolver(regionSchema) as Resolver<RegionFormValues>,
    defaultValues: defaultRegionFormValues,
    mode: 'onSubmit',
  })

  const coverage = useWatch({ control: form.control, name: 'coveragePercentage' })
  const estimatedUsers = useWatch({ control: form.control, name: 'estimatedUsers' })
  const latitude = useWatch({ control: form.control, name: 'latitude' })
  const longitude = useWatch({ control: form.control, name: 'longitude' })
  const monthlyRevenue = useWatch({ control: form.control, name: 'monthlyRevenue' })

  const analytics = useMemo(() => {
    const safeCoverage = Number.isFinite(Number(coverage)) ? Number(coverage) : 0
    const safeUsers = Number.isFinite(Number(estimatedUsers)) ? Number(estimatedUsers) : 0
    const mockAnalytics = calculateMockCoverageAnalytics({
      coveragePercentage: safeCoverage,
      estimatedUsers: safeUsers,
    })

    return {
      radius: mockAnalytics.estimatedCoverageRadius,
      fiberDistance: mockAnalytics.fiberDistance,
      signalQuality: mockAnalytics.signalQuality,
      potentialUsers: safeUsers,
      coverage: safeCoverage,
    }
  }, [coverage, estimatedUsers])

  useEffect(() => {
    if (!open) form.reset(defaultRegionFormValues)
  }, [form, open])

  const setCoords = (lat: number, lng: number) => {
    form.setValue('latitude', Number(lat.toFixed(6)), { shouldDirty: true, shouldValidate: true })
    form.setValue('longitude', Number(lng.toFixed(6)), { shouldDirty: true, shouldValidate: true })
  }

  const submit = form.handleSubmit(
    async (values) => {
      onSavingChange(true)
      try {
        const region = await createMockRegion(values, regions)
        onRegionCreated(region)
        toast.success(`${region.villageName} region created`)
        onOpenChange(false)
      } catch (error) {
        if (error instanceof DuplicateRegionError) {
          toast.warning(error.message)
          return
        }
        toast.error('Unable to save mock region')
      } finally {
        onSavingChange(false)
      }
    },
    () => {
      toast.error('Please fix the highlighted fields')
    },
  )

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showClose={false}
        className="left-0 top-0 flex h-[100dvh] max-h-[100dvh] w-screen max-w-none translate-x-0 translate-y-0 flex-col gap-0 overflow-hidden rounded-none border-slate-200 bg-white/95 p-0 shadow-2xl backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/95 sm:left-[50%] sm:top-[50%] sm:h-auto sm:max-h-[85vh] sm:w-[700px] sm:max-w-[700px] sm:translate-x-[-50%] sm:translate-y-[-50%] sm:rounded-2xl"
      >
        <DialogHeader className="border-b border-slate-200 bg-white/85 px-5 py-4 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/85 sm:px-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex min-w-0 items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 text-white shadow-md">
                <MapPinned className="h-5 w-5" />
              </span>
              <span className="min-w-0">
                <DialogTitle className="text-left text-lg font-semibold">Add New Region</DialogTitle>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Create and manage coverage areas
                </p>
              </span>
            </div>
            <DialogClose asChild>
              <button
                type="button"
                className="rounded-xl p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary-400/50 dark:hover:bg-slate-800 dark:hover:text-slate-100"
              >
                <X className="h-5 w-5" />
                <span className="sr-only">Close</span>
              </button>
            </DialogClose>
          </div>
        </DialogHeader>

        <form onSubmit={submit} className="flex min-h-0 flex-1 flex-col">
          <div className="min-h-0 flex-1 overflow-y-auto bg-slate-50/70 px-5 py-5 dark:bg-slate-950 sm:px-6">
            <section className="rounded-2xl border border-slate-200 bg-white/85 p-4 shadow-sm backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/80 sm:p-5">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Region Information</h3>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <Input
                  label="Village Name"
                  placeholder="Mandalay North"
                  {...form.register('villageName')}
                  error={form.formState.errors.villageName?.message}
                />
                <Input
                  label="Myanmar Name"
                  placeholder="မန္တလေး မြောက်ပိုင်း"
                  {...form.register('myanmarName')}
                  error={form.formState.errors.myanmarName?.message}
                />
                <Input
                  label="Township"
                  placeholder="Aungmyaythazan"
                  {...form.register('township')}
                  error={form.formState.errors.township?.message}
                />
                <Input
                  label="Coverage Percentage"
                  type="number"
                  min={0}
                  max={100}
                  placeholder="65"
                  {...form.register('coveragePercentage', { valueAsNumber: true })}
                  error={form.formState.errors.coveragePercentage?.message}
                />
                <Input
                  label="Estimated Users"
                  type="number"
                  min={0}
                  placeholder="120"
                  {...form.register('estimatedUsers', { valueAsNumber: true })}
                  error={form.formState.errors.estimatedUsers?.message}
                />
                <Input
                  label="Monthly Revenue"
                  type="number"
                  min={0}
                  placeholder="3500000"
                  {...form.register('monthlyRevenue', { valueAsNumber: true })}
                  error={form.formState.errors.monthlyRevenue?.message}
                />
                <div className="md:col-span-2">
                  <Label className="mb-1.5 block">Status</Label>
                  <Controller
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {REGION_STATUS_OPTIONS.map((status) => (
                            <SelectItem key={status} value={status}>
                              {formatStatusLabel(status)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
              </div>
            </section>

            <section className="mt-5 rounded-2xl border border-slate-200 bg-white/85 p-4 shadow-sm backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/80 sm:p-5">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Map & Coverage</h3>
              <div className="mt-4 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
                <div className="space-y-3">
                  <div className="relative z-0 isolate overflow-hidden rounded-2xl border border-slate-200 shadow-sm dark:border-slate-700">
                    <MiniRegionMap lat={latitude} lng={longitude} onChange={setCoords} />
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Input
                      label="Latitude"
                      type="number"
                      step="any"
                      {...form.register('latitude', { valueAsNumber: true })}
                      error={form.formState.errors.latitude?.message}
                    />
                    <Input
                      label="Longitude"
                      type="number"
                      step="any"
                      {...form.register('longitude', { valueAsNumber: true })}
                      error={form.formState.errors.longitude?.message}
                    />
                  </div>
                </div>

                <CoverageAnalytics
                  radius={analytics.radius}
                  potentialUsers={analytics.potentialUsers}
                  fiberDistance={analytics.fiberDistance}
                  signalQuality={analytics.signalQuality}
                  coverage={analytics.coverage}
                  monthlyRevenue={Number(monthlyRevenue) || 0}
                />
              </div>
            </section>
          </div>

          <DialogFooter className="sticky bottom-0 items-stretch border-t border-slate-200 bg-white/90 px-5 py-4 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/90 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={saving} className="sm:w-auto">
              Cancel
            </Button>
            <Button type="submit" loading={saving} disabled={saving} className="sm:w-auto">
              <Save className={cn('h-4 w-4', saving && 'hidden')} />
              Save Region
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

function formatStatusLabel(status: RegionFormValues['status']) {
  if (status === 'active') return 'Active'
  if (status === 'maintenance') return 'Maintenance'
  return 'Planned'
}

function MiniRegionMap({
  lat,
  lng,
  onChange,
}: {
  lat: number
  lng: number
  onChange: (lat: number, lng: number) => void
}) {
  const safeLat = Number.isFinite(Number(lat)) ? Number(lat) : DEFAULT_COORDS.lat
  const safeLng = Number.isFinite(Number(lng)) ? Number(lng) : DEFAULT_COORDS.lng

  return (
    <MapContainer center={[safeLat, safeLng]} zoom={12} style={{ height: 260, width: '100%' }}>
      <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <MapClickHandler onChange={onChange} />
      <RecenterMap lat={safeLat} lng={safeLng} />
      <Marker
        position={[safeLat, safeLng]}
        draggable
        eventHandlers={{
          dragend(event) {
            const marker = event.target as LeafletMarker
            const next = marker.getLatLng()
            onChange(next.lat, next.lng)
          },
        }}
      >
        <Popup>New coverage region</Popup>
      </Marker>
    </MapContainer>
  )
}

function MapClickHandler({ onChange }: { onChange: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(event) {
      onChange(event.latlng.lat, event.latlng.lng)
    },
  })
  return null
}

function RecenterMap({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap()

  useEffect(() => {
    map.setView([lat, lng], map.getZoom(), { animate: true })
  }, [lat, lng, map])

  return null
}

function CoverageAnalytics({
  radius,
  potentialUsers,
  fiberDistance,
  signalQuality,
  coverage,
  monthlyRevenue,
}: {
  radius: number
  potentialUsers: number
  fiberDistance: number
  signalQuality: number
  coverage: number
  monthlyRevenue: number
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-primary-50 via-white to-cyan-50 p-4 shadow-sm dark:border-slate-800 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800">
      <div className="flex items-center gap-2">
        <span className="rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 p-2 text-white shadow-sm">
          <Map className="h-4 w-4" />
        </span>
        <div>
          <p className="text-sm font-semibold">Coverage Analytics</p>
          <p className="text-xs text-slate-500">Live estimate from coverage inputs</p>
        </div>
      </div>

      <div className="mt-4 space-y-4">
        <Metric label="Estimated Coverage Radius" value={`${radius} km`} progress={Math.min(100, radius * 14)} />
        <Metric label="Signal Quality" value={`${signalQuality}%`} progress={signalQuality} />
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        <SmallStat icon={Users} label="Potential Users" value={potentialUsers.toLocaleString('en-US')} />
        <SmallStat icon={Map} label="Fiber Distance" value={`${fiberDistance} km`} />
        <SmallStat icon={DollarSign} label="Revenue" value={formatCurrency(monthlyRevenue)} />
        <SmallStat icon={MapPinned} label="Coverage" value={`${Math.round(coverage)}%`} />
      </div>
    </div>
  )
}

function Metric({ label, value, progress }: { label: string; value: string; progress: number }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-2">
        <span className="text-xs font-medium text-slate-600 dark:text-slate-300">{label}</span>
        <span className="text-xs font-semibold text-slate-900 dark:text-slate-100">{value}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
        <div
          className="h-full rounded-full bg-gradient-to-r from-primary-500 to-accent-500 transition-all"
          style={{ width: `${Math.max(0, Math.min(100, progress))}%` }}
        />
      </div>
    </div>
  )
}

function SmallStat({
  icon: Icon,
  label,
  value,
}: {
  icon: ComponentType<{ className?: string }>
  label: string
  value: string
}) {
  return (
    <div className="rounded-xl border border-white/70 bg-white/75 p-3 shadow-sm backdrop-blur dark:border-slate-700 dark:bg-slate-900/70">
      <Icon className="h-4 w-4 text-primary-600 dark:text-primary-300" />
      <p className="mt-2 text-[11px] font-medium uppercase text-slate-500">{label}</p>
      <p className="mt-1 truncate text-sm font-semibold text-slate-900 dark:text-slate-100">{value}</p>
    </div>
  )
}
