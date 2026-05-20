import { create } from 'zustand'
import type { IspUser } from '@/types'
import { mockUsers as mockUsersSeed } from '@/services/mock/data'

interface UsersState {
  users: IspUser[]
  setUsers: (users: IspUser[]) => void
  getById: (id: string) => IspUser | undefined
  updateUser: (id: string, patch: Partial<IspUser>) => void
  deleteUser: (id: string) => void
  addUser: (user: IspUser) => void
}

function cloneSeed(): IspUser[] {
  return structuredClone(mockUsersSeed)
}

export const useUsersStore = create<UsersState>((set, get) => ({
  users: cloneSeed(),

  setUsers: (users) => set({ users }),

  getById: (id) => get().users.find((u) => u.id === id),

  updateUser: (id, patch) =>
    set({
      users: get().users.map((u) => (u.id === id ? { ...u, ...patch } : u)),
    }),

  deleteUser: (id) =>
    set({
      users: get().users.filter((u) => u.id !== id),
    }),

  addUser: (user) => set({ users: [user, ...get().users] }),
}))
