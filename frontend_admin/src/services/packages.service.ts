import { api } from './api'

export const packagesService = {
  async findAll() {
    const res = await api.get('/packages')
    return res.data
  },

  async findOne(id: number) {
    const res = await api.get(`/packages/${id}`)
    return res.data
  },

  async create(data: any) {
    const res = await api.post('/packages', data)
    return res.data
  },

  async update(id: number, data: any) {
    const res = await api.patch(`/packages/${id}`, data)
    return res.data
  },

  async remove(id: number) {
    const res = await api.delete(`/packages/${id}`)
    return res.data
  },
}
