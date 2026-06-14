import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Plus, Pencil, Trash2, ToggleLeft, ToggleRight } from 'lucide-react'
import { toast } from 'sonner'
import type { InstallationRule } from '@/types'
import { installationRulesService } from '@/services/installation-rules.service'
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
import { formatCurrency } from '@/utils/format'

const ruleSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  fee: z.coerce.number().min(0, 'Base fee is required'),
  free_distance: z.coerce.number().min(0, 'Free distance is required'),
  extra_meter_price: z.coerce.number().min(0, 'Extra meter price is required'),
  description: z.string().optional(),
})

type RuleFormData = z.infer<typeof ruleSchema>

export function InstallationRulesPage() {
  const [rules, setRules] = useState<InstallationRule[]>([])
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingRule, setEditingRule] = useState<InstallationRule | null>(null)
  const [confirmOpen, setConfirmOpen] = useState<{ type: 'toggle' | 'delete'; rule: InstallationRule } | null>(null)
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
    installationRulesService.findAll().then(setRules).catch(() => toast.error('Failed to load rules'))
  }, [])

  const openAdd = () => {
    setEditingRule(null)
    reset({ name: '', fee: 0, free_distance: 0, extra_meter_price: 0, description: '' })
    setDialogOpen(true)
  }

  const openEdit = (rule: InstallationRule) => {
    if (rule.status !== 'active') return
    setEditingRule(rule)
    reset({
      name: rule.name,
      fee: Number(rule.fee),
      free_distance: Number(rule.free_distance),
      extra_meter_price: Number(rule.extra_meter_price),
      description: rule.description ?? '',
    })
    setDialogOpen(true)
  }

  const onSubmit = async (data: RuleFormData) => {
    setSaving(true)
    const payload = { ...data, description: data.description || null }
    try {
      if (editingRule) {
        const updated = await installationRulesService.update(editingRule.id, payload)
        setRules((prev) => prev.map((r) => (r.id === editingRule.id ? updated : r)))
        toast.success('Rule updated')
      } else {
        const created = await installationRulesService.create(payload)
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

  const handleToggleStatus = async (rule: InstallationRule) => {
    const newStatus = rule.status === 'active' ? 'disabled' : 'active'
    try {
      const updated = await installationRulesService.update(rule.id, { status: newStatus })
      setRules((prev) => prev.map((r) => (r.id === rule.id ? updated : r)))
      toast.success(`Rule ${newStatus === 'active' ? 'enabled' : 'disabled'}`)
    } catch {
      toast.error('Failed to update status')
    }
    setConfirmOpen(null)
  }

  const handleDelete = async (rule: InstallationRule) => {
    try {
      await installationRulesService.remove(rule.id)
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
        title="Installation Rules"
        description="Manage installation pricing rules"
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
            <Card key={rule.id} glass className={disabled ? 'opacity-50 grayscale' : ''}>
              <span className="flex items-start justify-between gap-2">
                <h3 className="font-semibold">{rule.name}</h3>
                {disabled && <Badge className="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">Disabled</Badge>}
              </span>
              <ul className="mt-3 space-y-1 text-sm text-slate-600 dark:text-slate-400">
                <li>Base fee: {formatCurrency(Number(rule.fee))}</li>
                <li>Free distance: {Number(rule.free_distance)}m</li>
                <li>Extra meter: {formatCurrency(Number(rule.extra_meter_price))}/m</li>
                {rule.description && <li className="text-xs italic">{rule.description}</li>}
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
          <p className="col-span-full py-12 text-center text-sm text-slate-400">No installation rules found.</p>
        )}
      </span>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingRule ? 'Edit Installation Rule' : 'Add Installation Rule'}</DialogTitle>
            <DialogDescription>Configure the installation pricing rule details.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input label="Name *" error={errors.name?.message} {...register('name')} />
            <Input label="Base Fee (MMK) *" type="number" error={errors.fee?.message} {...register('fee', { valueAsNumber: true })} />
            <Input label="Free Distance (Meter) *" type="number" error={errors.free_distance?.message} {...register('free_distance', { valueAsNumber: true })} />
            <Input label="Extra Fee/Meter (MMK) *" type="number" error={errors.extra_meter_price?.message} {...register('extra_meter_price', { valueAsNumber: true })} />
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
