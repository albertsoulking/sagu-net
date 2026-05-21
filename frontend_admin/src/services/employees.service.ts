import { api } from './api'

export const employeesService = {
  async findAll() {
    const res = await api.get('/employees')
    return res.data
  },

  async findOne(id: number) {
    const res = await api.get(`/employees/${id}`)
    return res.data
  },

  async create(data: any) {
    const res = await api.post('/employees', data)
    return res.data
  },

  async update(id: number, data: any) {
    const res = await api.patch(`/employees/${id}`, data)
    return res.data
  },

  async remove(id: number) {
    const res = await api.delete(`/employees/${id}`)
    return res.data
  },

  async processPayroll() {
    const res = await api.post('/employees/payroll')
    return res.data
  },
}
