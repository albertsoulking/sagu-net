import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { User, Lock } from 'lucide-react'
import { useAuthStore } from '@/store/authStore'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { PageHeader } from '@/components/ui/PageHeader'

const usernameSchema = z.object({
  username: z.string().min(1, 'Username is required'),
})

const passwordSchema = z.object({
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export function ProfilePage() {
  const user = useAuthStore((s) => s.user)
  const updateProfile = useAuthStore((s) => s.updateProfile)
  const [savingUsername, setSavingUsername] = useState(false)
  const [savingPassword, setSavingPassword] = useState(false)

  const usernameForm = useForm<{ username: string }>({
    resolver: zodResolver(usernameSchema),
    values: { username: user?.username ?? '' },
  })

  const passwordForm = useForm<{ password: string }>({
    resolver: zodResolver(passwordSchema),
    defaultValues: { password: '' },
  })

  const handleUsernameSubmit = async (data: { username: string }) => {
    if (data.username === user?.username) return
    setSavingUsername(true)
    try {
      await updateProfile({ username: data.username })
      toast.success('Username updated')
    } catch {
      toast.error('Failed to update username')
    } finally {
      setSavingUsername(false)
    }
  }

  const handlePasswordSubmit = async (data: { password: string }) => {
    setSavingPassword(true)
    try {
      await updateProfile({ password: data.password })
      toast.success('Password updated')
      passwordForm.reset()
    } catch {
      toast.error('Failed to update password')
    } finally {
      setSavingPassword(false)
    }
  }

  return (
    <span>
      <PageHeader title="Profile" />
      <span className="mx-auto mt-6 max-w-lg space-y-6">
        <span className="rounded-2xl border bg-white p-6 dark:bg-slate-900">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold">
            <User className="h-5 w-5" />
            Username
          </h2>
          <form onSubmit={usernameForm.handleSubmit(handleUsernameSubmit)} className="space-y-4">
            <Input
              label="Username"
              id="profile-username"
              error={usernameForm.formState.errors.username?.message}
              {...usernameForm.register('username')}
            />
            <Button type="submit" loading={savingUsername}>
              Save Username
            </Button>
          </form>
        </span>

        <span className="rounded-2xl border bg-white p-6 dark:bg-slate-900">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold">
            <Lock className="h-5 w-5" />
            Password
          </h2>
          <form onSubmit={passwordForm.handleSubmit(handlePasswordSubmit)} className="space-y-4">
            <Input
              label="New Password"
              id="profile-password"
              type="password"
              error={passwordForm.formState.errors.password?.message}
              {...passwordForm.register('password')}
            />
            <Button type="submit" loading={savingPassword}>
              Change Password
            </Button>
          </form>
        </span>
      </span>
    </span>
  )
}
