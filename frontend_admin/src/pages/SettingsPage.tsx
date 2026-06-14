import { useEffect } from 'react'
import { toast } from 'sonner'
import { useThemeStore } from '@/store/themeStore'
import { useSettingsStore } from '@/store/settingsStore'
import { PageHeader } from '@/components/ui/PageHeader'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

export function SettingsPage() {
  const { isDark, setDark } = useThemeStore()
  const { settings, fetch, update, isLoading } = useSettingsStore()

  useEffect(() => {
    fetch()
  }, [fetch])

  if (isLoading) return <p className="text-slate-500">Loading settings...</p>

  return (
    <span className="space-y-6">
      <PageHeader title="Settings" description="System configuration and integrations" />
      <span className="grid gap-6 lg:grid-cols-2">
        <Card>
          <h3 className="mb-4 font-semibold">Company</h3>
          <span className="space-y-4">
            <Input label="Company Name" value={settings['companyName'] ?? ''} onChange={(e) => update('companyName', e.target.value)} />
            <Input label="Currency" value={settings['currency'] ?? ''} onChange={(e) => update('currency', e.target.value)} />
            <Input label="Tax (%)" type="number" value={settings['tax'] ?? ''} onChange={(e) => update('tax', String(e.target.value))} />
          </span>
        </Card>
        <Card>
          <h3 className="mb-4 font-semibold">Appearance</h3>
          <label className="flex items-center justify-between">
            <span className="text-sm">Dark Mode</span>
            <input type="checkbox" checked={isDark} onChange={(e) => setDark(e.target.checked)} className="h-5 w-5 rounded" />
          </label>
        </Card>
        <Card>
          <h3 className="mb-4 font-semibold">Notifications</h3>
          <span className="space-y-3">
            {[
              { key: 'notificationsEnabled' as const, label: 'Push Notifications' },
              { key: 'smsApiEnabled' as const, label: 'SMS API' },
              { key: 'whatsappApiEnabled' as const, label: 'WhatsApp API' },
            ].map(({ key, label }) => (
              <label key={key} className="flex items-center justify-between text-sm">
                {label}
                <input
                  type="checkbox"
                  checked={settings[key] === 'true'}
                  onChange={(e) => update(key, String(e.target.checked))}
                  className="h-5 w-5 rounded"
                />
              </label>
            ))}
          </span>
        </Card>
        <Card>
          <h3 className="mb-4 font-semibold">Backup</h3>
          <p className="mb-4 text-sm text-slate-500">Export or restore database backup</p>
          <span className="flex gap-2">
            <Button variant="outline" onClick={() => toast.success('Backup started')}>Backup Database</Button>
            <Button variant="outline" onClick={() => toast.info('Restore wizard opened')}>Restore</Button>
          </span>
        </Card>
      </span>
      <Button onClick={() => toast.success('Settings saved')}>Save Settings</Button>
    </span>
  )
}
