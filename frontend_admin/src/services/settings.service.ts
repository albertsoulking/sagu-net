import { api } from './api'

export const settingsService = {
  async findAll() {
    const res = await api.get('/settings')
    return res.data
  },

  async update(key: string, value: string) {
    const res = await api.put(`/settings/${key}`, { value })
    return res.data
  },

  async bulkUpdate(data: Record<string, string>) {
    const res = await api.put('/settings', data)
    return res.data
  },
}
