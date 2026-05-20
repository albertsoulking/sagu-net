import type { UserRole } from '@/types'

export const ROLE_LABELS: Record<UserRole, string> = {
  admin: 'Administrator',
  manager: 'Manager',
  staff: 'Staff',
  technician: 'Technician',
}

export const DEMO_CREDENTIALS = [
  { username: 'admin', password: 'admin123', role: 'admin' as const },
  { username: 'manager', password: 'manager123', role: 'manager' as const },
  { username: 'staff', password: 'staff123', role: 'staff' as const },
  { username: 'technician', password: 'tech123', role: 'technician' as const },
]
