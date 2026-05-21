import { create } from 'zustand'
import { notificationsService } from '@/services/notifications.service'

interface NotificationItem {
  id: number
  type: string
  title: string
  message: string
  read: boolean
  created_at: string
}

interface NotificationState {
  notifications: NotificationItem[]
  unreadCount: number
  isLoading: boolean
  fetch: () => Promise<void>
  markAsRead: (id: number) => Promise<void>
  markAllAsRead: () => Promise<void>
}

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [],
  unreadCount: 0,
  isLoading: false,

  fetch: async () => {
    set({ isLoading: true })
    try {
      const { data: notifications } = await notificationsService.findAll()
      const { data: unreadCount } = await notificationsService.getUnreadCount()
      set({ notifications, unreadCount, isLoading: false })
    } catch {
      set({ isLoading: false })
    }
  },

  markAsRead: async (id) => {
    await notificationsService.markAsRead(id)
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
      unreadCount: Math.max(0, state.unreadCount - 1),
    }))
  },

  markAllAsRead: async () => {
    await notificationsService.markAllAsRead()
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true })),
      unreadCount: 0,
    }))
  },
}))
