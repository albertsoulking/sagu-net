import { api } from './api'

export const subscriptionsService = {
  async findAll(params?: Record<string, any>) {
    const res = await api.get('/subscriptions', { params })
    return res.data
  },

  async findOne(id: number) {
    const res = await api.get(`/subscriptions/${id}`)
    return res.data
  },

  async create(data: any) {
    const res = await api.post('/subscriptions', data)
    return res.data
  },
}
