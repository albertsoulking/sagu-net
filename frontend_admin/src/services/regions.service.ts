import { api } from './api'

export const regionsService = {
  async findAll() {
    const res = await api.get('/regions')
    return res.data
  },

  async findOne(id: number) {
    const res = await api.get(`/regions/${id}`)
    return res.data
  },

  async create(data: any) {
    const res = await api.post('/regions', data)
    return res.data
  },

  async update(id: number, data: any) {
    const res = await api.patch(`/regions/${id}`, data)
    return res.data
  },

  async remove(id: number) {
    const res = await api.delete(`/regions/${id}`)
    return res.data
  },

  async getMapMarkers() {
    const res = await api.get('/regions/map-markers')
    return res.data
  },

  async getAnalytics() {
    const res = await api.get('/regions/analytics')
    return res.data
  },
}
