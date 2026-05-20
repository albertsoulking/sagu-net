import { useEffect, useState, useMemo } from 'react'
import { createColumnHelper } from '@tanstack/react-table'
import { Plus } from 'lucide-react'
import { toast } from 'sonner'
import { mockApi } from '@/services/mock/api'
import type { Region } from '@/types'
import { PageHeader } from '@/components/ui/PageHeader'
import { Button } from '@/components/ui/Button'
import { DataTable } from '@/components/ui/DataTable'
import { MapView } from '@/components/map/MapView'
import { formatCurrency } from '@/utils/format'

const col = createColumnHelper<Region>()

export function RegionsPage() {
  const [regions, setRegions] = useState<Region[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    mockApi.getRegions().then((d) => { setRegions(d); setLoading(false) })
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
      <PageHeader title="Regions" description="Coverage areas and village management" actions={<Button size="sm" onClick={() => toast.info('Add region modal')}><Plus className="h-4 w-4" /> Add Region</Button>} />
      <MapView markers={markers} height="320px" />
      <DataTable data={regions} columns={columns} isLoading={loading} searchPlaceholder="Search regions..." />
    </span>
  )
}
