import type {
  ActivityItem,
  AppSettings,
  ChartPoint,
  DashboardStats,
  Employee,
  Expense,
  IncomeChange,
  InstallationRule,
  IspUser,
  Notification,
  PackagePlan,
  Region,
  Subscription,
  SubscriptionRule,
} from '@/types'
import dayjs from 'dayjs'

export const mockDashboardStats: DashboardStats = {
  activeUsers: 1248,
  expiredUsers: 86,
  totalRevenue: 45820000,
  totalExpense: 12340000,
  netProfit: 33480000,
  bandwidthUsage: 78.5,
  cashBalance: 12500000,
  kpayBalance: 8200000,
  changes: {
    activeUsers: 5.2,
    expiredUsers: -2.1,
    totalRevenue: 12.4,
    totalExpense: 3.8,
    netProfit: 15.1,
    bandwidthUsage: 4.2,
    cashBalance: 8.0,
    kpayBalance: 6.5,
  },
}

export const mockUsers: IspUser[] = Array.from({ length: 25 }, (_, i) => {
  const statuses = ['active', 'expired', 'suspended'] as const
  const types = ['premium', 'foc'] as const
  const plans = ['15 Mbps', '20 Mbps', '30 Mbps', '45 Mbps', '60 Mbps']
  const regions = ['Mandalay North', 'Amarapura', 'Pyin Oo Lwin', 'Sagaing Hill', 'Taungtha']
  const status = statuses[i % 3]
  const endDate = dayjs().add(status === 'expired' ? -5 : 30 - i, 'day')
  const id = `USR-${String(i + 1).padStart(4, '0')}`
  return {
    id,
    username: `customer_${i + 1}`,
    name: `User ${i + 1}`,
    phone: `09${String(450000000 + i).slice(0, 9)}`,
    region: regions[i % regions.length],
    plan: plans[i % plans.length],
    months: [1, 3, 6, 12][i % 4],
    endDate: endDate.format('YYYY-MM-DD'),
    remainingDays: endDate.diff(dayjs(), 'day'),
    status,
    onuStatus: i % 3 === 0 ? 'offline' : 'online',
    userType: types[i % 2],
    port: `P-${(i % 48) + 1}`,
    cableLength: 50 + i * 3,
    registrationDate: dayjs().subtract(180 + i, 'day').format('YYYY-MM-DD'),
    latitude: 21.95 + (i % 10) * 0.01,
    longitude: 96.08 + (i % 10) * 0.01,
    dnSn: `DN-${1000 + i}`,
    onuMac: `AA:BB:CC:DD:EE:${String(i).padStart(2, '0')}`,
    onuType: ['Huawei', 'ZTE', 'FiberHome'][i % 3],
    installStaff: ['Ko Min Thu', 'Ko Zaw', 'Ma Hnin'][i % 3],
    installType: i % 2 === 0 ? 'standard' : 'free',
    notes: i % 4 === 0 ? 'VIP customer' : undefined,
    adjustmentAmount: i % 5 === 0 ? 5000 : 0,
  }
})

export const mockSubscriptions: Subscription[] = Array.from({ length: 20 }, (_, i) => ({
  id: `SUB-${String(i + 1).padStart(4, '0')}`,
  date: dayjs().subtract(i, 'day').format('YYYY-MM-DD'),
  userId: mockUsers[i % mockUsers.length].id,
  username: mockUsers[i % mockUsers.length].username,
  packagePlan: mockUsers[i % mockUsers.length].plan,
  months: [1, 3, 6, 12][i % 4],
  installationType: ['Renewal', 'Standard', 'Free', 'Relocation'][i % 4],
  paymentType: i % 2 === 0 ? 'cash' : 'kpay',
  startDate: dayjs().subtract(i, 'day').format('YYYY-MM-DD'),
  endDate: dayjs().add(30 * ([1, 3, 6, 12][i % 4]), 'day').format('YYYY-MM-DD'),
  discount: [0, 5, 10, 15][i % 4],
  actualPrice: 25000 * ([1, 3, 6, 12][i % 4]) * (1 - [0, 0.05, 0.1, 0.15][i % 4]),
}))

export const mockPackages: PackagePlan[] = [
  { id: 'PKG-01', category: 'Residential', plan: '15 Mbps', basePrice: 25000, userCount: 320, revenue: 8000000 },
  { id: 'PKG-02', category: 'Residential', plan: '20 Mbps', basePrice: 35000, userCount: 280, revenue: 9800000 },
  { id: 'PKG-03', category: 'Residential', plan: '30 Mbps', basePrice: 45000, userCount: 410, revenue: 18450000 },
  { id: 'PKG-04', category: 'Business', plan: '45 Mbps', basePrice: 65000, userCount: 156, revenue: 10140000 },
  { id: 'PKG-05', category: 'Business', plan: '60 Mbps', basePrice: 85000, userCount: 82, revenue: 6970000 },
]

export const mockRegions: Region[] = [
  { id: 'REG-01', villageName: 'Mandalay North', myanmarDescription: 'မန္တလေး မြောက်ပိုင်း', activeUsers: 245, revenue: 12500000, coverage: 85, lat: 21.98, lng: 96.09 },
  { id: 'REG-02', villageName: 'Amarapura', myanmarDescription: 'အမရပူရ', activeUsers: 189, revenue: 9800000, coverage: 72, lat: 21.92, lng: 96.05 },
  { id: 'REG-03', villageName: 'Pyin Oo Lwin', myanmarDescription: 'ပြင်ဦးလွင်', activeUsers: 156, revenue: 8200000, coverage: 65, lat: 22.03, lng: 96.46 },
  { id: 'REG-04', villageName: 'Sagaing Hill', myanmarDescription: 'စစ်ကိုင်း တောင်ကုန်း', activeUsers: 98, revenue: 5400000, coverage: 48, lat: 21.88, lng: 95.98 },
]

export const mockEmployees: Employee[] = [
  { id: 'EMP-01', name: 'Ko Min Thu', phone: '09450001111', position: 'Technician', department: 'Field Ops', basicSalary: 450000, advancePayment: 50000, bonus: 30000, overtime: 45000, absentDays: 1, payableWages: 475000 },
  { id: 'EMP-02', name: 'Ma Hnin', phone: '09450002222', position: 'Accountant', department: 'Finance', basicSalary: 550000, advancePayment: 0, bonus: 50000, overtime: 0, absentDays: 0, payableWages: 600000 },
  { id: 'EMP-03', name: 'U Kyaw', phone: '09450003333', position: 'Manager', department: 'Operations', basicSalary: 800000, advancePayment: 100000, bonus: 80000, overtime: 0, absentDays: 0, payableWages: 780000 },
  { id: 'EMP-04', name: 'Ko Zaw', phone: '09450004444', position: 'Installer', department: 'Field Ops', basicSalary: 400000, advancePayment: 30000, bonus: 20000, overtime: 60000, absentDays: 2, payableWages: 430000 },
]

export const mockExpenses: Expense[] = Array.from({ length: 15 }, (_, i) => ({
  id: `EXP-${String(i + 1).padStart(4, '0')}`,
  date: dayjs().subtract(i * 2, 'day').format('YYYY-MM-DD'),
  name: ['Salary Payment', 'Fuel', 'Fiber Cable', 'Office Rent', 'Marketing'][i % 5],
  category: ['HR & Payroll', 'Petrol', 'Fiber Cable', 'Office Expense', 'Marketing'][i % 5],
  paymentType: (['cash', 'kpay', 'bank'] as const)[i % 3],
  singleAmount: [500000, 80000, 1200000, 350000, 200000][i % 5],
  quantity: [1, 1, 1, 1, 1][i % 5],
  totalAmount: [500000, 80000, 1200000, 350000, 200000][i % 5],
}))

export const mockIncomeChanges: IncomeChange[] = Array.from({ length: 12 }, (_, i) => ({
  id: `INC-${String(i + 1).padStart(4, '0')}`,
  date: dayjs().subtract(i, 'day').format('YYYY-MM-DD'),
  paymentType: (['cash', 'kpay', 'bank'] as const)[i % 3],
  direction: i % 3 === 0 ? 'out' : 'in',
  amount: [150000, 2500000, 80000, 500000][i % 4],
  description: ['Daily cash adjustment', 'Kpay deposit', 'Petty cash', 'Bank transfer'][i % 4],
}))

export const mockInstallationRules: InstallationRule[] = [
  { id: 'IR-01', type: 'renewal', installationFee: 0, freeDistance: 50, extraMeterPrice: 500 },
  { id: 'IR-02', type: 'free', installationFee: 0, freeDistance: 100, extraMeterPrice: 0 },
  { id: 'IR-03', type: 'standard', installationFee: 15000, freeDistance: 50, extraMeterPrice: 500 },
  { id: 'IR-04', type: 'relocation', installationFee: 10000, freeDistance: 30, extraMeterPrice: 800 },
]

export const mockSubscriptionRules: SubscriptionRule[] = [
  { id: 'SR-01', months: 1, discountPercent: 0, extraMonths: 0 },
  { id: 'SR-02', months: 3, discountPercent: 5, extraMonths: 0, promotionBadge: 'Save 5%' },
  { id: 'SR-03', months: 6, discountPercent: 10, extraMonths: 1, promotionBadge: '1 Month Free' },
  { id: 'SR-04', months: 12, discountPercent: 15, extraMonths: 2, promotionBadge: 'Best Value' },
]

export const mockNotifications: Notification[] = [
  { id: 'N-01', type: 'expiring', title: 'Users Expiring Soon', message: '12 users expire within 3 days', read: false, createdAt: dayjs().subtract(1, 'hour').toISOString() },
  { id: 'N-02', type: 'expired', title: 'Expired Users', message: '86 users have expired subscriptions', read: false, createdAt: dayjs().subtract(3, 'hour').toISOString() },
  { id: 'N-03', type: 'installation', title: 'New Installation', message: 'Installation scheduled for USR-0024', read: true, createdAt: dayjs().subtract(1, 'day').toISOString() },
  { id: 'N-04', type: 'budget', title: 'Budget Alert', message: 'Marketing expenses exceeded monthly budget', read: false, createdAt: dayjs().subtract(2, 'day').toISOString() },
]

export const mockActivities: ActivityItem[] = [
  { id: 'A-01', type: 'renewal', title: 'Subscription Renewed', description: 'customer_5 renewed 30 Mbps for 6 months', amount: 243000, createdAt: dayjs().subtract(2, 'hour').toISOString() },
  { id: 'A-02', type: 'installation', title: 'New Installation', description: 'customer_24 - Standard installation completed', createdAt: dayjs().subtract(5, 'hour').toISOString() },
  { id: 'A-03', type: 'expense', title: 'Expense Recorded', description: 'Fiber Cable purchase - MMK 1,200,000', amount: 1200000, createdAt: dayjs().subtract(1, 'day').toISOString() },
  { id: 'A-04', type: 'user', title: 'New User', description: 'customer_25 registered in Mandalay North', createdAt: dayjs().subtract(2, 'day').toISOString() },
]

export const mockRevenueExpenseChart: ChartPoint[] = [
  { name: 'Jan', revenue: 3200000, expense: 980000 },
  { name: 'Feb', revenue: 3800000, expense: 1100000 },
  { name: 'Mar', revenue: 4100000, expense: 1050000 },
  { name: 'Apr', revenue: 4500000, expense: 1200000 },
  { name: 'May', revenue: 4800000, expense: 1150000 },
  { name: 'Jun', revenue: 5200000, expense: 1300000 },
]

export const mockDailyRenewals: ChartPoint[] = Array.from({ length: 7 }, (_, i) => ({
  name: dayjs().subtract(6 - i, 'day').format('ddd'),
  value: 15 + Math.floor(Math.random() * 20),
}))

export const mockPackageDistribution: ChartPoint[] = mockPackages.map((p) => ({
  name: p.plan,
  value: p.userCount,
}))

export const mockUserStatusChart: ChartPoint[] = [
  { name: 'Active', value: 1248 },
  { name: 'Expired', value: 86 },
  { name: 'Warning', value: 42 },
  { name: 'Free', value: 18 },
]

export const mockCashFlow: ChartPoint[] = [
  { name: 'Week 1', inflow: 4200000, outflow: 1800000 },
  { name: 'Week 2', inflow: 5100000, outflow: 2100000 },
  { name: 'Week 3', inflow: 4800000, outflow: 1950000 },
  { name: 'Week 4', inflow: 5500000, outflow: 2300000 },
]

export const mockMonthlyProfit: ChartPoint[] = [
  { name: 'Jan', value: 2220000 },
  { name: 'Feb', value: 2700000 },
  { name: 'Mar', value: 3050000 },
  { name: 'Apr', value: 3300000 },
  { name: 'May', value: 3650000 },
  { name: 'Jun', value: 3900000 },
]

export const mockExpenseByCategory: ChartPoint[] = [
  { name: 'HR & Payroll', value: 4500000 },
  { name: 'Fiber Cable', value: 2800000 },
  { name: 'Petrol', value: 890000 },
  { name: 'Marketing', value: 650000 },
  { name: 'Utilities', value: 420000 },
]

export const defaultSettings: AppSettings = {
  companyName: 'Sagu Net ISP',
  currency: 'MMK',
  tax: 5,
  smsApiEnabled: true,
  whatsappApiEnabled: false,
  notificationsEnabled: true,
}
