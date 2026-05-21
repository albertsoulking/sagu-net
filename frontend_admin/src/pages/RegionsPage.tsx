import { useEffect, useState, useMemo } from 'react'
import { createColumnHelper } from '@tanstack/react-table'
import { Plus } from 'lucide-react'
import { regionsService } from '@/services/regions.service'
import type { Region } from '@/types'
import { AddRegionDialog } from '@/components/dialogs/AddRegionDialog'
import { PageHeader } from '@/components/ui/PageHeader'
import { Button } from '@/components/ui/Button'
import { DataTable } from '@/components/ui/DataTable'
import { MapView } from '@/components/map/MapView'
import { formatCurrency } from '@/utils/format'
import { useRegionDialog } from '@/hooks/useRegionDialog'

const col = createColumnHelper<Region>()

export function RegionsPage() {
  const [regions, setRegions] = useState<Region[]>([])
  const [loading, setLoading] = useState(true)
  const regionDialog = useRegionDialog()

  useEffect(() => {
    regionsService.findAll().then((res) => { setRegions(res.data); setLoading(false) })
  }, [])

  const columns = useMemo(
    () => [
      col.accessor('villageName', { header: 'Village' }),
      col.accessor('myanmarDescription', { header: 'Myanmar' }),
      col.accessor('activeUsers', { header: 'Active Users' }),
      col.accessor('revenue', { header: 'Revenue', cell: (i) => formatCurrency(i.getValue()) }),
      col.accessor('coverage', { header: 'Coverage %', cell: (i) => `${i.getValue()}%` }),
    ],
    [],
  )

  const markers = regions.map((r) => ({ lat: r.lat ?? 21.95, lng: r.lng ?? 96.08, label: r.villageName }))

  return (
    <span className="space-y-6">
      <PageHeader title="Regions" description="Coverage areas and village management" actions={<Button size="sm" onClick={regionDialog.openDialog}><Plus className="h-4 w-4" /> Add Region</Button>} />
      <MapView markers={markers} height="320px" />
      <DataTable data={regions} columns={columns} isLoading={loading} searchPlaceholder="Search regions..." />
      <AddRegionDialog
        open={regionDialog.open}
        saving={regionDialog.saving}
        regions={regions}
        onOpenChange={regionDialog.setOpen}
        onSavingChange={regionDialog.setSaving}
        onRegionCreated={(region) => setRegions((current) => [region, ...current])}
      />
    </span>
  )
}
