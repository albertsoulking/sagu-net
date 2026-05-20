import { create } from 'zustand'
import type { AuthUser, LoginCredentials } from '@/types'
import { mockApi } from '@/services/mock/api'
import { clearToken, getToken, getStoredUser, isTokenExpired, setStoredUser, setToken } from '@/utils/token'

interface AuthState {
  user: AuthUser | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (credentials: LoginCredentials) => Promise<void>
  logout: () => void
  hydrate: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,

  hydrate: () => {
    const token = getToken()
    const user = getStoredUser<AuthUser>()
    if (token && user && !isTokenExpired()) {
      set({ user, isAuthenticated: true })
    } else {
      clearToken()
      set({ user: null, isAuthenticated: false })
    }
  },

  login: async (credentials) => {
    set({ isLoading: true })
    try {
      const res = await mockApi.login(credentials)
      setToken(res.token)
      setStoredUser(res.user, res.expiresAt)
      set({ user: res.user, isAuthenticated: true, isLoading: false })
    } catch (e) {
      set({ isLoading: false })
      throw e
    }
  },

  logout: () => {
    clearToken()
    set({ user: null, isAuthenticated: false })
  },
}))
