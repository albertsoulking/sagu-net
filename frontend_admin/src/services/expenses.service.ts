import { api } from './api'

export const expensesService = {
  async findAll(params?: Record<string, any>) {
    const res = await api.get('/expenses', { params })
    return res.data
  },

  async findOne(id: number) {
    const res = await api.get(`/expenses/${id}`)
    return res.data
  },

  async create(data: any) {
    const res = await api.post('/expenses', data)
    return res.data
  },

  async update(id: number, data: any) {
    const res = await api.patch(`/expenses/${id}`, data)
    return res.data
  },

  async remove(id: number) {
    const res = await api.delete(`/expenses/${id}`)
    return res.data
  },

  async getCategories() {
    const res = await api.get('/expenses/categories')
    return res.data
  },
}
