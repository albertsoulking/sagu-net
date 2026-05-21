import { create } from 'zustand'
import { usersService } from '@/services/users.service'

interface UserItem {
  id: number
  username: string
  phone: string
  email: string
  status: string
  region?: any
  package?: any
  [key: string]: any
}

interface UsersState {
  users: UserItem[]
  total: number
  page: number
  limit: number
  isLoading: boolean
  fetchUsers: (params?: Record<string, any>) => Promise<void>
  setUsers: (users: UserItem[]) => void
}

export const useUsersStore = create<UsersState>((set) => ({
  users: [],
  total: 0,
  page: 1,
  limit: 10,
  isLoading: false,

  fetchUsers: async (params) => {
    set({ isLoading: true })
    try {
      const res = await usersService.findAll(params)
      set({
        users: res.data,
        total: res.meta?.total || 0,
        page: res.meta?.page || 1,
        limit: res.meta?.limit || 10,
        isLoading: false,
      })
    } catch {
      set({ isLoading: false })
    }
  },

  setUsers: (users) => set({ users }),
}))
