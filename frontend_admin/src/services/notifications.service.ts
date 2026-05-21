import { api } from './api'

export const notificationsService = {
  async findAll() {
    const res = await api.get('/notifications')
    return res.data
  },

  async getUnreadCount() {
    const res = await api.get('/notifications/unread-count')
    return res.data
  },

  async markAsRead(id: number) {
    const res = await api.post(`/notifications/${id}/read`)
    return res.data
  },

  async markAllAsRead() {
    const res = await api.post('/notifications/read-all')
    return res.data
  },
}
