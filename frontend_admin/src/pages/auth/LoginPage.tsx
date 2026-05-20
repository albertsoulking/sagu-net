import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Navigate, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Wifi } from 'lucide-react'
import { toast } from 'sonner'
import { useAuthStore } from '@/store/authStore'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { DEMO_CREDENTIALS } from '@/constants/roles'

const schema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean().optional(),
})

type FormData = z.infer<typeof schema>

export function LoginPage() {
  const navigate = useNavigate()
  const login = useAuthStore((s) => s.login)
  const isLoading = useAuthStore((s) => s.isLoading)
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  const [showPassword, setShowPassword] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { rememberMe: true },
  })

  const onSubmit = async (data: FormData) => {
    try {
      await login(data)
      toast.success('Welcome back!')
      navigate('/')
    } catch {
      toast.error('Invalid username or password')
    }
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return (
    <span className="flex min-h-screen">
      <span className="hidden w-1/2 flex-col justify-between bg-gradient-to-br from-primary-600 via-primary-700 to-accent-600 p-12 text-white lg:flex">
        <span>
          <span className="mb-8 flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur">
              <Wifi className="h-7 w-7" />
            </span>
            <span>
              <h1 className="text-2xl font-bold">Sagu Net ISP</h1>
              <p className="text-white/80">Management System</p>
            </span>
          </span>
          <h2 className="text-4xl font-bold leading-tight">
            Enterprise broadband
            <br />
            management platform
          </h2>
          <p className="mt-4 max-w-md text-lg text-white/80">
            Manage users, subscriptions, installations, finances, and network infrastructure in one place.
          </p>
        </span>
        <span className="rounded-2xl bg-white/10 p-6 backdrop-blur">
          <p className="text-sm text-white/70">Demo accounts</p>
          <ul className="mt-2 space-y-1 text-sm">
            {DEMO_CREDENTIALS.map((c) => (
              <li key={c.username}>
                {c.username} / {c.password} ({c.role})
              </li>
            ))}
          </ul>
        </span>
      </span>

      <span className="flex w-full flex-col justify-center bg-slate-50 p-8 dark:bg-slate-950 lg:w-1/2">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mx-auto w-full max-w-md space-y-6 rounded-2xl glass p-8"
        >
          <span className="text-center lg:hidden">
            <span className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl gradient-primary">
              <Wifi className="h-6 w-6 text-white" />
            </span>
            <h1 className="text-2xl font-bold">Sign in</h1>
            <p className="text-slate-500">Sagu Net ISP Management</p>
          </span>

          <Input label="Username" id="username" error={errors.username?.message} {...register('username')} />
          <span className="relative block">
            <Input
              label="Password"
              id="password"
              type={showPassword ? 'text' : 'password'}
              error={errors.password?.message}
              {...register('password')}
            />
            <button
              type="button"
              className="absolute right-3 top-9 text-slate-400"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </span>

          <span className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded" {...register('rememberMe')} />
              Remember me
            </label>
            <button type="button" className="text-primary-600 hover:underline">
              Forgot password?
            </button>
          </span>

          <Button type="submit" className="w-full" size="lg" loading={isLoading}>
            Sign in
          </Button>
        </form>
      </span>
    </span>
  )
}
