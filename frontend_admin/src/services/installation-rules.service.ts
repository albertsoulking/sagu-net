import { api } from './api'
import type { InstallationRule } from '@/types'

export const installationRulesService = {
  async findAll() {
    const res = await api.get('/installation-rules')
    return res.data as InstallationRule[]
  },

  async create(data: Partial<InstallationRule>) {
    const res = await api.post('/installation-rules', data)
    return res.data as InstallationRule
  },

  async update(id: number, data: Partial<InstallationRule>) {
    const res = await api.patch(`/installation-rules/${id}`, data)
    return res.data as InstallationRule
  },

  async remove(id: number) {
    const res = await api.delete(`/installation-rules/${id}`)
    return res.data
  },
}
