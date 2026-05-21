import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { api } from '@/services/api'
import type { InstallationRule } from '@/types'
import { PageHeader } from '@/components/ui/PageHeader'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { formatCurrency } from '@/utils/format'

const TYPE_LABELS: Record<InstallationRule['type'], string> = {
  renewal: 'Renewal',
  free: 'Free Installation',
  standard: 'Standard Installation',
  relocation: 'ONU Relocation',
}

export function InstallationRulesPage() {
  const [rules, setRules] = useState<InstallationRule[]>([])
  const [cableMeters, setCableMeters] = useState(80)

  useEffect(() => {
    api.get('/installation-rules').then((res) => setRules(res.data.data))
  }, [])

  const calcFee = (rule: InstallationRule) => {
    const extra = Math.max(0, cableMeters - rule.freeDistance)
    return rule.installationFee + extra * rule.extraMeterPrice
  }

  return (
    <span className="space-y-6">
      <PageHeader title="Installation Rules" description="Cable fees and installation pricing" />
      <Card>
        <label className="text-sm font-medium">Cable length (meters) for preview</label>
        <Input type="number" value={cableMeters} onChange={(e) => setCableMeters(Number(e.target.value))} className="mt-2 max-w-xs" />
      </Card>
      <span className="grid gap-4 md:grid-cols-2">
        {rules.map((rule) => (
          <Card key={rule.id} glass>
            <h3 className="font-semibold">{TYPE_LABELS[rule.type]}</h3>
            <ul className="mt-3 space-y-1 text-sm text-slate-600 dark:text-slate-400">
              <li>Installation fee: {formatCurrency(rule.installationFee)}</li>
              <li>Free distance: {rule.freeDistance}m</li>
              <li>Extra meter: {formatCurrency(rule.extraMeterPrice)}</li>
              <li className="font-medium text-primary-600">Calculated: {formatCurrency(calcFee(rule))}</li>
            </ul>
            <Button className="mt-4" size="sm" variant="outline" onClick={() => toast.success('Rule updated')}>Edit</Button>
          </Card>
        ))}
      </span>
    </span>
  )
}
