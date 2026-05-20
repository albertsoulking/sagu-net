import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { mockApi } from '@/services/mock/api'
import type { SubscriptionRule } from '@/types'
import { PageHeader } from '@/components/ui/PageHeader'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'

export function SubscriptionRulesPage() {
  const [rules, setRules] = useState<SubscriptionRule[]>([])

  useEffect(() => {
    mockApi.getSubscriptionRules().then(setRules)
  }, [])

  return (
    <span className="space-y-6">
      <PageHeader title="Subscription Rules" description="Discounts and promotional months" />
      <span className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {rules.map((rule) => (
          <Card key={rule.id} hover glass className="text-center">
            <p className="text-4xl font-bold text-primary-600">{rule.months}</p>
            <p className="text-sm text-slate-500">month{rule.months > 1 ? 's' : ''}</p>
            {rule.promotionBadge && <Badge className="mt-2 bg-primary-100 text-primary-700">{rule.promotionBadge}</Badge>}
            <p className="mt-3 text-sm">Discount: {rule.discountPercent}%</p>
            {rule.extraMonths > 0 && <p className="text-sm text-emerald-600">+{rule.extraMonths} free month(s)</p>}
            <Button className="mt-4 w-full" size="sm" variant="outline" onClick={() => toast.success('Rule saved')}>Edit</Button>
          </Card>
        ))}
      </span>
    </span>
  )
}
