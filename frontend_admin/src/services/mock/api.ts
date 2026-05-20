import type { AuthResponse, LoginCredentials } from '@/types'
import { DEMO_CREDENTIALS } from '@/constants/roles'
import {
  mockDashboardStats,
  mockUsers,
  mockSubscriptions,
  mockPackages,
  mockRegions,
  mockEmployees,
  mockExpenses,
  mockIncomeChanges,
  mockInstallationRules,
  mockSubscriptionRules,
  mockNotifications,
  mockActivities,
  mockRevenueExpenseChart,
  mockDailyRenewals,
  mockPackageDistribution,
  mockUserStatusChart,
  mockCashFlow,
  mockMonthlyProfit,
  mockExpenseByCategory,
  defaultSettings,
} from './data'

const delay = (ms = 400) => new Promise((r) => setTimeout(r, ms))

export const mockApi = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    await delay(600)
    const match = DEMO_CREDENTIALS.find(
      (c) => c.username === credentials.username && c.password === credentials.password,
    )
    if (!match) {
      throw new Error('Invalid username or password')
    }
    const expiresAt = Date.now() + (credentials.rememberMe ? 7 : 1) * 24 * 60 * 60 * 1000
    return {
      token: `mock_jwt_${match.role}_${Date.now()}`,
      user: {
        id: `auth-${match.role}`,
        username: match.username,
        name: match.username.charAt(0).toUpperCase() + match.username.slice(1),
        role: match.role,
      },
      expiresAt,
    }
  },

  async getProfile() {
    await delay(200)
    return null
  },

  async getDashboardStats() {
    await delay()
    return mockDashboardStats
  },

  async getDashboardCharts() {
    await delay()
    return {
      revenueExpense: mockRevenueExpenseChart,
      dailyRenewals: mockDailyRenewals,
      packageDistribution: mockPackageDistribution,
      userStatus: mockUserStatusChart,
      cashFlow: mockCashFlow,
      monthlyProfit: mockMonthlyProfit,
    }
  },

  async getActivities() {
    await delay()
    return mockActivities
  },

  async getUsers() {
    await delay()
    return [...mockUsers]
  },

  async getSubscriptions() {
    await delay()
    return [...mockSubscriptions]
  },

  async getPackages() {
    await delay()
    return [...mockPackages]
  },

  async getRegions() {
    await delay()
    return [...mockRegions]
  },

  async getEmployees() {
    await delay()
    return [...mockEmployees]
  },

  async getExpenses() {
    await delay()
    return [...mockExpenses]
  },

  async getIncomeChanges() {
    await delay()
    return [...mockIncomeChanges]
  },

  async getInstallationRules() {
    await delay()
    return [...mockInstallationRules]
  },

  async getSubscriptionRules() {
    await delay()
    return [...mockSubscriptionRules]
  },

  async getNotifications() {
    await delay(200)
    return [...mockNotifications]
  },

  async getSettings() {
    await delay(200)
    return { ...defaultSettings }
  },

  async getExpenseCharts() {
    await delay()
    return { byCategory: mockExpenseByCategory }
  },
}
