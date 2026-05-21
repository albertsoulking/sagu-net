import { api } from './api'

export const usersService = {
  async findAll(params?: Record<string, any>) {
    const res = await api.get('/users', { params })
    return res.data
  },

  async findOne(id: number) {
    const res = await api.get(`/users/${id}`)
    return res.data
  },

  async create(data: any) {
    const res = await api.post('/users', data)
    return res.data
  },

  async update(id: number, data: any) {
    const res = await api.patch(`/users/${id}`, data)
    return res.data
  },

  async remove(id: number) {
    const res = await api.delete(`/users/${id}`)
    return res.data
  },

  async suspend(id: number) {
    const res = await api.post(`/users/${id}/suspend`)
    return res.data
  },

  async activate(id: number) {
    const res = await api.post(`/users/${id}/activate`)
    return res.data
  },

  async renew(id: number, data: any) {
    const res = await api.post(`/users/${id}/renew`, data)
    return res.data
  },
}
