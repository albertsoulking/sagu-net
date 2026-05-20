import { NavLink, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronLeft, Wifi } from 'lucide-react'
import { getMenuForRole, LOGOUT_ITEM } from '@/constants/menu'
import { useAuthStore } from '@/store/authStore'
import { useUiStore } from '@/store/uiStore'
import { cn } from '@/utils/cn'

export function Sidebar() {
  const user = useAuthStore((s) => s.user)
  const logout = useAuthStore((s) => s.logout)
  const { sidebarCollapsed, toggleSidebarCollapsed, mobileMenuOpen, setMobileMenuOpen } = useUiStore()
  const navigate = useNavigate()

  if (!user) return null
  const menu = getMenuForRole(user.role)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const content = (
  <>
      <span className="flex items-center gap-3 border-b border-slate-200/60 px-4 py-5 dark:border-slate-700/60">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl gradient-primary">
          <Wifi className="h-5 w-5 text-white" />
        </span>
        {!sidebarCollapsed && (
          <span>
            <p className="font-bold">Sagu Net</p>
            <p className="text-xs text-slate-500">ISP Management</p>
          </span>
        )}
      </span>

      <nav className="flex-1 space-y-1 p-3">
        {menu.map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            end={item.path === '/'}
            onClick={() => setMobileMenuOpen(false)}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
                isActive
                  ? 'gradient-primary text-white shadow-md'
                  : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800',
              )
            }
          >
            <item.icon className="h-5 w-5 shrink-0" />
            {!sidebarCollapsed && item.label}
          </NavLink>
        ))}
      </nav>

      <span className="border-t border-slate-200/60 p-3 dark:border-slate-700/60">
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
        >
          <LOGOUT_ITEM.icon className="h-5 w-5" />
          {!sidebarCollapsed && LOGOUT_ITEM.label}
        </button>
      </span>
  </>
  )

  return (
    <>
      {mobileMenuOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
          aria-label="Close menu"
        />
      )}
      <motion.aside
        initial={false}
        animate={{ width: sidebarCollapsed ? 72 : 256 }}
        className={cn(
          'fixed left-0 top-0 z-50 flex h-full flex-col glass lg:sticky lg:z-30',
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
        )}
      >
        <button
          type="button"
          onClick={toggleSidebarCollapsed}
          className="absolute -right-3 top-20 hidden h-6 w-6 items-center justify-center rounded-full border bg-white shadow lg:flex dark:bg-slate-800"
        >
          <ChevronLeft className={cn('h-4 w-4 transition-transform', sidebarCollapsed && 'rotate-180')} />
        </button>
        {content}
      </motion.aside>
    </>
  )
}
