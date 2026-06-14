import { api } from './api'
import type { SubscriptionRule } from '@/types'

export const subscriptionRulesService = {
  async findAll() {
    const res = await api.get('/subscription-rules')
    return res.data as SubscriptionRule[]
  },

  async create(data: Partial<SubscriptionRule>) {
    const res = await api.post('/subscription-rules', data)
    return res.data as SubscriptionRule
  },

  async update(id: number, data: Partial<SubscriptionRule>) {
    const res = await api.patch(`/subscription-rules/${id}`, data)
    return res.data as SubscriptionRule
  },

  async remove(id: number) {
    const res = await api.delete(`/subscription-rules/${id}`)
    return res.data
  },
}
