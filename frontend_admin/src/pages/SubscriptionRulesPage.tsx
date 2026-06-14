import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Plus, Pencil, Trash2, ToggleLeft, ToggleRight } from 'lucide-react'
import { toast } from 'sonner'
import type { SubscriptionRule } from '@/types'
import { subscriptionRulesService } from '@/services/subscription-rules.service'
import { PageHeader } from '@/components/ui/PageHeader'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/Badge'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'

const ruleSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  min_months: z.coerce.number().min(1, 'Min months is required'),
  discount_percent: z.coerce.number().min(0, 'Discount percent is required').max(100),
  extra_months: z.coerce.number().min(0, 'Extra months is required'),
  description: z.string().optional(),
})

type RuleFormData = z.infer<typeof ruleSchema>

export function SubscriptionRulesPage() {
  const [rules, setRules] = useState<SubscriptionRule[]>([])
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingRule, setEditingRule] = useState<SubscriptionRule | null>(null)
  const [confirmOpen, setConfirmOpen] = useState<{ type: 'toggle' | 'delete'; rule: SubscriptionRule } | null>(null)
  const [saving, setSaving] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RuleFormData>({
    resolver: zodResolver(ruleSchema),
  })

  useEffect(() => {
    subscriptionRulesService.findAll().then(setRules).catch(() => toast.error('Failed to load rules'))
  }, [])

  const openAdd = () => {
    setEditingRule(null)
    reset({ name: '', min_months: 1, discount_percent: 0, extra_months: 0, description: '' })
    setDialogOpen(true)
  }

  const openEdit = (rule: SubscriptionRule) => {
    if (rule.status !== 'active') return
    setEditingRule(rule)
    reset({
      name: rule.name,
      min_months: rule.min_months,
      discount_percent: Number(rule.discount_percent),
      extra_months: rule.extra_months,
      description: rule.description ?? '',
    })
    setDialogOpen(true)
  }

  const onSubmit = async (data: RuleFormData) => {
    setSaving(true)
    const payload = { ...data, description: data.description || null }
    try {
      if (editingRule) {
        const updated = await subscriptionRulesService.update(editingRule.id, payload)
        setRules((prev) => prev.map((r) => (r.id === editingRule.id ? updated : r)))
        toast.success('Rule updated')
      } else {
        const created = await subscriptionRulesService.create(payload)
        setRules((prev) => [...prev, created])
        toast.success('Rule created')
      }
      setDialogOpen(false)
    } catch {
      toast.error('Failed to save rule')
    } finally {
      setSaving(false)
    }
  }

  const handleToggleStatus = async (rule: SubscriptionRule) => {
    const newStatus = rule.status === 'active' ? 'disabled' : 'active'
    try {
      const updated = await subscriptionRulesService.update(rule.id, { status: newStatus })
      setRules((prev) => prev.map((r) => (r.id === rule.id ? updated : r)))
      toast.success(`Rule ${newStatus === 'active' ? 'enabled' : 'disabled'}`)
    } catch {
      toast.error('Failed to update status')
    }
    setConfirmOpen(null)
  }

  const handleDelete = async (rule: SubscriptionRule) => {
    try {
      await subscriptionRulesService.remove(rule.id)
      setRules((prev) => prev.filter((r) => r.id !== rule.id))
      toast.success('Rule deleted')
    } catch {
      toast.error('Failed to delete rule')
    }
    setConfirmOpen(null)
  }

  const sorted = [...rules].sort((a, b) => {
    if (a.status === 'active' && b.status !== 'active') return -1
    if (a.status !== 'active' && b.status === 'active') return 1
    return 0
  })

  return (
    <span className="space-y-6">
      <PageHeader
        title="Subscription Rules"
        description="Manage discount and promotional rules"
        actions={
          <Button onClick={openAdd}>
            <Plus className="h-4 w-4" /> Add Rule
          </Button>
        }
      />

      <span className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {sorted.map((rule) => {
          const disabled = rule.status !== 'active'
          return (
            <Card key={rule.id} glass className={disabled ? 'opacity-60 grayscale' : ''}>
              <span className="flex items-start justify-between gap-2">
                <h3 className="font-semibold">{rule.name}</h3>
                {disabled && <Badge className="bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-300">Disabled</Badge>}
              </span>
              <ul className="mt-3 space-y-1 text-sm text-slate-600 dark:text-slate-400">
                <li>
                  Min months: <span className="font-medium">{rule.min_months}</span>
                </li>
                <li>
                  Discount: <span className="font-medium">{Number(rule.discount_percent)}%</span>
                </li>
                {rule.extra_months > 0 && (
                  <li>
                    Extra months: <span className="font-medium text-emerald-600">+{rule.extra_months}</span>
                  </li>
                )}
                {rule.description && <li className="pt-1 text-xs italic">{rule.description}</li>}
              </ul>
              <span className="mt-4 flex flex-wrap gap-2">
                <Button size="sm" variant="outline" disabled={disabled} onClick={() => openEdit(rule)}>
                  <Pencil className="h-3.5 w-3.5" /> Edit
                </Button>
                <Button
                  size="sm"
                  variant={disabled ? 'secondary' : 'outline'}
                  onClick={() => setConfirmOpen({ type: 'toggle', rule })}
                >
                  {disabled ? <ToggleRight className="h-3.5 w-3.5" /> : <ToggleLeft className="h-3.5 w-3.5" />}
                  {disabled ? 'Enable' : 'Disable'}
                </Button>
                <Button size="sm" variant="danger" onClick={() => setConfirmOpen({ type: 'delete', rule })}>
                  <Trash2 className="h-3.5 w-3.5" /> Delete
                </Button>
              </span>
            </Card>
          )
        })}
        {sorted.length === 0 && (
          <p className="col-span-full py-12 text-center text-sm text-slate-400">No subscription rules found.</p>
        )}
      </span>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingRule ? 'Edit Subscription Rule' : 'Add Subscription Rule'}</DialogTitle>
            <DialogDescription>Configure the subscription rule details.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input label="Name *" error={errors.name?.message} {...register('name')} />
            <Input
              label="Min Months *"
              type="number"
              error={errors.min_months?.message}
              {...register('min_months', { valueAsNumber: true })}
            />
            <Input
              label="Discount Percent (%) *"
              type="number"
              error={errors.discount_percent?.message}
              {...register('discount_percent', { valueAsNumber: true })}
            />
            <Input
              label="Extra Months"
              type="number"
              error={errors.extra_months?.message}
              {...register('extra_months', { valueAsNumber: true })}
            />
            <span>
              <Label>Description</Label>
              <Textarea className="mt-1.5" placeholder="Optional notes…" {...register('description')} />
            </span>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
              <Button type="submit" loading={saving}>{editingRule ? 'Save' : 'Create'}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={!!confirmOpen} onOpenChange={() => setConfirmOpen(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {confirmOpen?.type === 'toggle'
                ? `${confirmOpen.rule.status === 'active' ? 'Disable' : 'Enable'} Rule`
                : confirmOpen?.type === 'delete' ? 'Delete Rule' : ''}
            </DialogTitle>
            <DialogDescription>
              {confirmOpen?.type === 'toggle'
                ? `Are you sure you want to ${confirmOpen.rule.status === 'active' ? 'disable' : 'enable'} "${confirmOpen.rule.name}"?`
                : confirmOpen?.type === 'delete' ? `Are you sure you want to delete "${confirmOpen.rule.name}"? This action cannot be undone.` : ''}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmOpen(null)}>Cancel</Button>
            <Button
              variant={confirmOpen?.type === 'delete' ? 'danger' : 'primary'}
              onClick={() => {
                if (!confirmOpen) return
                if (confirmOpen.type === 'toggle') handleToggleStatus(confirmOpen.rule)
                else handleDelete(confirmOpen.rule)
              }}
            >
              {confirmOpen?.type === 'toggle'
                ? `${confirmOpen.rule.status === 'active' ? 'Disable' : 'Enable'}`
                : 'Delete'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </span>
  )
}
