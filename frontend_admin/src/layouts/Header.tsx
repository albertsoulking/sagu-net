import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Bell,
  Menu,
  Moon,
  Plus,
  Search,
  Sun,
  UserPlus,
  Wallet,
  Receipt,
  FileText,
} from 'lucide-react'
import { useAuthStore } from '@/store/authStore'
import { useThemeStore } from '@/store/themeStore'
import { useUiStore } from '@/store/uiStore'
import { useNotificationStore } from '@/store/notificationStore'
import { ROLE_LABELS } from '@/constants/roles'
import { cn } from '@/utils/cn'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

export function Header() {
  const user = useAuthStore((s) => s.user)
  const { isDark, toggle } = useThemeStore()
  const { setMobileMenuOpen } = useUiStore()
  const { items, fetch, markRead, markAllRead, unreadCount } = useNotificationStore()
  const [notifOpen, setNotifOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [quickOpen, setQuickOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    fetch()
  }, [fetch])

  const unread = unreadCount()

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b glass px-4 lg:px-6">
      <button
        type="button"
        className="rounded-lg p-2 hover:bg-slate-100 lg:hidden dark:hover:bg-slate-800"
        onClick={() => setMobileMenuOpen(true)}
      >
        <Menu className="h-5 w-5" />
      </button>

      <span className="relative hidden flex-1 max-w-md sm:block">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          type="search"
          placeholder="Global search users, subscriptions..."
          className="focus-glow h-10 w-full rounded-xl border border-slate-200 bg-white/80 pl-10 pr-4 text-sm dark:border-slate-700 dark:bg-slate-800/80"
        />
      </span>

      <span className="ml-auto flex items-center gap-2">
        <span className="relative">
          <button
            type="button"
            onClick={() => setQuickOpen(!quickOpen)}
            className="hidden items-center gap-1 rounded-xl gradient-primary px-3 py-2 text-sm font-medium text-white sm:flex"
          >
            <Plus className="h-4 w-4" /> Quick Actions
          </button>
          {quickOpen && (
            <>
              <button type="button" className="fixed inset-0 z-40" onClick={() => setQuickOpen(false)} />
              <span className="absolute right-0 top-full z-50 mt-2 w-48 rounded-xl border bg-white py-2 shadow-lg dark:bg-slate-900">
                {[
                  { label: 'Add User', icon: UserPlus, path: '/users' },
                  { label: 'Quick Renewal', icon: Wallet, path: '/subscriptions' },
                  { label: 'Add Expense', icon: Receipt, path: '/expenses' },
                  { label: 'Generate Report', icon: FileText, path: '/reports' },
                ].map((a) => (
                  <button
                    key={a.label}
                    type="button"
                    className="flex w-full items-center gap-2 px-4 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-800"
                    onClick={() => {
                      navigate(a.path)
                      setQuickOpen(false)
                    }}
                  >
                    <a.icon className="h-4 w-4" /> {a.label}
                  </button>
                ))}
              </span>
            </>
          )}
        </span>

        <button
          type="button"
          onClick={toggle}
          className="rounded-xl p-2 hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>

        <span className="relative">
          <button
            type="button"
            onClick={() => setNotifOpen(!notifOpen)}
            className="relative rounded-xl p-2 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <Bell className="h-5 w-5" />
            {unread > 0 && (
              <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                {unread}
              </span>
            )}
          </button>
          {notifOpen && (
            <>
              <button type="button" className="fixed inset-0 z-40" onClick={() => setNotifOpen(false)} />
              <span className="absolute right-0 top-full z-50 mt-2 w-80 rounded-xl border bg-white shadow-xl dark:bg-slate-900">
                <span className="flex items-center justify-between border-b px-4 py-3">
                  <span className="font-semibold">Notifications</span>
                  <button type="button" className="text-xs text-primary-600" onClick={markAllRead}>
                    Mark all read
                  </button>
                </span>
                <span className="max-h-80 overflow-y-auto">
                  {items.map((n) => (
                    <button
                      key={n.id}
                      type="button"
                      className={cn(
                        'w-full border-b px-4 py-3 text-left text-sm hover:bg-slate-50 dark:hover:bg-slate-800',
                        !n.read && 'bg-primary-50/50 dark:bg-primary-900/20',
                      )}
                      onClick={() => markRead(n.id)}
                    >
                      <p className="font-medium">{n.title}</p>
                      <p className="text-xs text-slate-500">{n.message}</p>
                      <p className="mt-1 text-xs text-slate-400">{dayjs(n.createdAt).fromNow()}</p>
                    </button>
                  ))}
                </span>
              </span>
            </>
          )}
        </span>

        <span className="relative">
          <button
            type="button"
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2 rounded-xl px-2 py-1 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full gradient-primary text-sm font-bold text-white">
              {user?.name?.[0] ?? 'U'}
            </span>
            <span className="hidden text-left md:block">
              <p className="text-sm font-medium">{user?.name}</p>
              <p className="text-xs text-slate-500">{user && ROLE_LABELS[user.role]}</p>
            </span>
          </button>
          {profileOpen && (
            <>
              <button type="button" className="fixed inset-0 z-40" onClick={() => setProfileOpen(false)} />
              <span className="absolute right-0 top-full z-50 mt-2 w-48 rounded-xl border bg-white py-2 shadow-lg dark:bg-slate-900">
                <span className="block px-4 py-2 text-sm text-slate-500">@{user?.username}</span>
                <button
                  type="button"
                  className="flex w-full items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800"
                  onClick={() => { setProfileOpen(false); navigate('/profile') }}
                >
                  Profile
                </button>
              </span>
            </>
          )}
        </span>
      </span>
    </header>
  )
}
