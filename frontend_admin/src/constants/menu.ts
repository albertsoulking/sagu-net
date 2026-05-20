import type { LucideIcon } from 'lucide-react'
import {
  LayoutDashboard,
  Users,
  Wallet,
  CreditCard,
  MapPinned,
  BadgeDollarSign,
  Receipt,
  TrendingUp,
  Wrench,
  FileText,
  Settings,
  LogOut,
  ScrollText,
} from 'lucide-react'
import type { UserRole } from '@/types'

export interface MenuItem {
  id: string
  label: string
  path: string
  icon: LucideIcon
  roles: UserRole[]
}

export const MENU_ITEMS: MenuItem[] = [
  { id: 'dashboard', label: 'Dashboard', path: '/', icon: LayoutDashboard, roles: ['admin', 'manager', 'staff', 'technician'] },
  { id: 'users', label: 'Users', path: '/users', icon: Users, roles: ['admin', 'manager', 'staff'] },
  { id: 'subscriptions', label: 'Subscriptions', path: '/subscriptions', icon: Wallet, roles: ['admin', 'manager', 'staff'] },
  { id: 'packages', label: 'Packages', path: '/packages', icon: CreditCard, roles: ['admin', 'manager'] },
  { id: 'regions', label: 'Regions', path: '/regions', icon: MapPinned, roles: ['admin', 'manager', 'technician'] },
  { id: 'employees', label: 'Employees', path: '/employees', icon: BadgeDollarSign, roles: ['admin', 'manager'] },
  { id: 'expenses', label: 'Expenses', path: '/expenses', icon: Receipt, roles: ['admin', 'manager'] },
  { id: 'income', label: 'Income Changes', path: '/income-changes', icon: TrendingUp, roles: ['admin', 'manager'] },
  { id: 'installation-rules', label: 'Installation Rules', path: '/installation-rules', icon: Wrench, roles: ['admin'] },
  { id: 'subscription-rules', label: 'Subscription Rules', path: '/subscription-rules', icon: ScrollText, roles: ['admin'] },
  { id: 'reports', label: 'Reports', path: '/reports', icon: FileText, roles: ['admin', 'manager'] },
  { id: 'settings', label: 'Settings', path: '/settings', icon: Settings, roles: ['admin'] },
]

export const LOGOUT_ITEM = { id: 'logout', label: 'Logout', icon: LogOut }

export function getMenuForRole(role: UserRole): MenuItem[] {
  return MENU_ITEMS.filter((item) => item.roles.includes(role))
}
