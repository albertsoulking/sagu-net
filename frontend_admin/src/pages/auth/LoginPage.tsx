import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Navigate, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Shield, Wifi } from 'lucide-react'
import { toast } from 'sonner'
import { useAuthStore } from '@/store/authStore'
import { authService } from '@/services/auth.service'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

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
  const [initStatus, setInitStatus] = useState<'loading' | 'initialized' | 'uninitialized'>('loading')
  const [initLoading, setInitLoading] = useState(false)

  useEffect(() => {
    authService.checkInit().then((res) => {
      setInitStatus(res.initialized ? 'initialized' : 'uninitialized')
    }).catch(() => setInitStatus('initialized'))
  }, [])

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

  const handleInit = async () => {
    setInitLoading(true)
    try {
      await authService.init()
      toast.success('Default admin created: admin / admin123')
      setInitStatus('initialized')
    } catch {
      toast.error('Failed to initialize')
    } finally {
      setInitLoading(false)
    }
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />
  }

  if (initStatus === 'loading') {
    return null
  }

  return (
    <div className="flex min-h-screen">
      {/* ─── 左侧：ISP 品牌展示区（添加科技感背景图案） ─── */}
      <div className="relative hidden w-1/2 flex-col justify-between bg-gradient-to-br from-primary-600 via-primary-700 to-accent-600 p-12 text-white lg:flex overflow-hidden">
        
        {/* 💡 新增：网络点阵纹理背景（符合 ISP 基础设施调性） */}
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none" 
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '24px 24px'
          }}
        />

        {/* 💡 新增：柔和的微光光晕（打破大块纯色的单调） */}
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-cyan-400 blur-[120px] opacity-30 pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-indigo-500 blur-[140px] opacity-40 pointer-events-none" />

        {/* 确保原有文字内容在光晕上方展示 */}
        <div className="relative z-10">
          <div className="mb-8 flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur">
              <Wifi className="h-7 w-7" />
            </span>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Sagu Net ISP</h1>
              <p className="text-white/80 text-xs">Management System</p>
            </div>
          </div>
          <h2 className="text-4xl font-bold leading-tight tracking-tight">
            Enterprise broadband
            <br />
            management platform
          </h2>
          <p className="mt-4 max-w-md text-base text-white/85 leading-relaxed">
            Manage users, subscriptions, installations, finances, and network infrastructure in one place.
          </p>
        </div>

        {/* 底部保留预留空间，可放底噪版权 */}
        <div className="relative z-10 text-xs text-white/40">
          © {new Date().getFullYear()} Sagu Net. Panel v1.0
        </div>
      </div>

      {/* ─── 右侧：表单登录区（添加 LOGIN 标题提示） ─── */}
      <div className="flex w-full flex-col justify-center bg-slate-50 p-8 dark:bg-slate-950 lg:w-1/2">
        {initStatus === 'uninitialized' ? (
          <div className="mx-auto w-full max-w-md space-y-6 rounded-2xl glass p-8 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl gradient-primary">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold">Initialize System</h1>
            <p className="text-slate-500">
              No admin accounts found. Click below to create the default super admin account and get started.
            </p>
            <Button className="w-full" size="lg" loading={initLoading} onClick={handleInit}>
              Initialize Admin
            </Button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mx-auto w-full max-w-md space-y-6 rounded-2xl glass p-8 shadow-xl shadow-slate-100 dark:shadow-none"
          >
            {/* 📱 移动端看：保持原样 */}
            <div className="text-center lg:hidden">
              <span className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl gradient-primary">
                <Wifi className="h-6 w-6 text-white" />
              </span>
              <h1 className="text-2xl font-bold">Sign in</h1>
              <p className="text-slate-500">Sagu Net ISP Management</p>
            </div>

            {/* 💡 新增：大屏端（电脑端）展示的 LOGIN 头部字样 */}
            <div className="hidden lg:block border-b border-slate-100 dark:border-slate-800 pb-4 mb-2">
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Account Login</h1>
              <p className="text-sm text-slate-400 mt-1">Sagu Net ISP Administrator Panel</p>
            </div>

            {/* ─── 以下是你原有的表单逻辑，完美保留 ─── */}
            <Input label="Username" id="username" error={errors.username?.message} {...register('username')} />
            <div className="relative block">
              <Input
                label="Password"
                id="password"
                type={showPassword ? 'text' : 'password'}
                error={errors.password?.message}
                {...register('password')}
              />
              <button
                type="button"
                className="absolute right-3 top-9 text-slate-400 hover:text-slate-600 transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer select-none text-slate-600 dark:text-slate-400">
                <input type="checkbox" className="rounded border-slate-300 text-primary-600 focus:ring-primary-500" {...register('rememberMe')} />
                Remember me
              </label>
              <button type="button" className="text-primary-600 hover:underline font-medium">
                Forgot password?
              </button>
            </div>

            <Button type="submit" className="w-full" size="lg" loading={isLoading}>
              Sign in
            </Button>
          </form>
        )}
      </div>
    </div>
  )
}