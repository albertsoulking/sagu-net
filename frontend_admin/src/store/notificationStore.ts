import { create } from 'zustand'
import type { Notification } from '@/types'
import { mockApi } from '@/services/mock/api'

interface NotificationState {
  items: Notification[]
  isLoading: boolean
  fetch: () => Promise<void>
  markRead: (id: string) => void
  markAllRead: () => void
  unreadCount: () => number
}

export const useNotificationStore = create<NotificationState>((set, get) => ({
  items: [],
  isLoading: false,

  fetch: async () => {
    set({ isLoading: true })
    const items = await mockApi.getNotifications()
    set({ items, isLoading: false })
  },

  markRead: (id) => {
    set({
      items: get().items.map((n) => (n.id === id ? { ...n, read: true } : n)),
    })
  },

  markAllRead: () => {
    set({ items: get().items.map((n) => ({ ...n, read: true })) })
  },

  unreadCount: () => get().items.filter((n) => !n.read).length,
}))
