import { api } from './api'

export const reportsService = {
  async getRevenue(startDate?: string, endDate?: string) {
    const res = await api.get('/reports/revenue', { params: { startDate, endDate } })
    return res.data
  },

  async getExpenses(startDate?: string, endDate?: string) {
    const res = await api.get('/reports/expenses', { params: { startDate, endDate } })
    return res.data
  },

  async getProfit(startDate?: string, endDate?: string) {
    const res = await api.get('/reports/profit', { params: { startDate, endDate } })
    return res.data
  },
}
