import { api } from './api'

export const dashboardService = {
  async getSummary() {
    const res = await api.get('/dashboard/summary')
    return res.data
  },

  async getCharts() {
    const res = await api.get('/dashboard/charts')
    return res.data
  },

  async getRecentActivities() {
    const res = await api.get('/dashboard/recent-activities')
    return res.data
  },
}
