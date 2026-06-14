export type UserRole = 'super_admin' | 'admin' | 'manager' | 'technician' | 'finance' | 'employee' | 'staff'

/** Subscriber account state (Users module). */
export type SubscriberAccountStatus = 'active' | 'expired' | 'suspended'

/** ONU device connectivity. */
export type OnuConnectionStatus = 'online' | 'offline'

/** Billing / access tier. */
export type SubscriberAccountType = 'premium' | 'foc'

/** @deprecated Narrowed to subscriber statuses; kept for gradual migration. */
export type UserStatus = SubscriberAccountStatus

export interface AuthUser {
  id: string
  username: string
  name: string
  role: UserRole
  avatar?: string
}

export interface LoginCredentials {
  username: string
  password: string
  rememberMe?: boolean
}

export interface AuthResponse {
  token: string
  user: AuthUser
  expiresAt: number
}

export interface IspUser {
  id: string
  /** Display / login handle (subscriptions & legacy). */
  username: string
  /** Subscriber full name. */
  name: string
  phone: string
  region: string
  plan: string
  months: number
  endDate: string
  remainingDays: number
  status: SubscriberAccountStatus
  onuStatus: OnuConnectionStatus
  userType: SubscriberAccountType
  registrationDate: string
  notes?: string
  latitude?: number
  longitude?: number
  /** Distribution network serial / identifier. */
  dnSn?: string
  /** OLT PON / port label. */
  port: string
  cableLength: number
  onuMac?: string
  onuType?: string
  /** Installer staff name. */
  installStaff?: string
  installType?: string
  /** Applied on future renewals (MMK); positive adds, negative subtracts. */
  adjustmentAmount?: number
  billingStartDate?: string
  billingEndDate?: string
  paymentType?: 'cash' | 'bank_transfer' | 'mobile_money'
}

export interface Subscription {
  id: string
  date: string
  userId: string
  username: string
  packagePlan: string
  months: number
  installationType: string
  paymentType: 'cash' | 'kpay'
  startDate: string
  endDate: string
  discount: number
  actualPrice: number
}

export interface PackagePlan {
  id: string
  category: string
  plan: string
  basePrice: number
  userCount: number
  revenue: number
}

export interface Region {
  id: string
  villageName: string
  myanmarDescription: string
  township?: string
  activeUsers: number
  revenue: number
  coverage: number
  lat?: number
  lng?: number
  status?: 'active' | 'maintenance' | 'planned'
  estimatedCoverageRadius?: number
  fiberDistance?: number
  signalQuality?: number
}

export interface Employee {
  id: string
  name: string
  phone: string
  position: string
  department: string
  basicSalary: number
  advancePayment: number
  bonus: number
  overtime: number
  absentDays: number
  payableWages: number
}

export interface Expense {
  id: string
  date: string
  name: string
  category: string
  paymentType: 'cash' | 'kpay' | 'bank'
  singleAmount: number
  quantity: number
  totalAmount: number
  receiptUrl?: string
}

export interface IncomeChange {
  id: string
  date: string
  paymentType: 'cash' | 'kpay' | 'bank'
  direction: 'in' | 'out'
  amount: number
  description: string
}

export interface InstallationRule {
  id: number
  name: string
  fee: number
  free_distance: number
  extra_meter_price: number
  description: string | null
  status: string
  created_at: string
  updated_at: string
}

export interface SubscriptionRule {
  id: number
  name: string
  min_months: number
  discount_percent: number
  extra_months: number
  description: string | null
  status: string
  created_at: string
  updated_at: string
}

export interface Notification {
  id: string
  type: 'expiring' | 'expired' | 'installation' | 'income' | 'budget'
  title: string
  message: string
  read: boolean
  createdAt: string
}

export interface DashboardStats {
  activeUsers: number
  expiredUsers: number
  totalRevenue: number
  totalExpense: number
  netProfit: number
  bandwidthUsage: number
  cashBalance: number
  kpayBalance: number
  changes: Record<string, number>
}

export interface ActivityItem {
  id: string
  type: 'renewal' | 'installation' | 'expense' | 'user'
  title: string
  description: string
  amount?: number
  createdAt: string
}

export interface ChartPoint {
  name: string
  value?: number
  revenue?: number
  expense?: number
  inflow?: number
  outflow?: number
  [key: string]: string | number | undefined
}

export interface AppSettings {
  companyName: string
  companyLogo?: string
  currency: string
  tax: number
  smsApiEnabled: boolean
  whatsappApiEnabled: boolean
  notificationsEnabled: boolean
}
