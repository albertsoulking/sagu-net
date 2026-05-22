import type { UserRole } from '@/types'

export const ROLE_LABELS: Record<UserRole, string> = {
  super_admin: 'Super Admin',
  admin: 'Administrator',
  manager: 'Manager',
  staff: 'Staff',
  technician: 'Technician',
  finance: 'Finance',
  employee: 'Employee',
}

export const DEMO_CREDENTIALS = [
  { username: 'admin', password: 'admin123', role: 'super_admin' as const },
  { username: 'manager', password: 'manager123', role: 'manager' as const },
  { username: 'technician', password: 'tech123', role: 'technician' as const },
]
