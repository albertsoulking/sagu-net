import { create } from 'zustand'
import type { LoginCredentials } from '@/types'
import { authService } from '@/services/auth.service'
import { clearToken, getToken, getStoredUser, isTokenExpired, setStoredUser, setToken } from '@/utils/token'

interface AuthState {
  user: { id: number; username: string; email: string; phone: string; role: string } | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (credentials: LoginCredentials) => Promise<void>
  logout: () => void
  hydrate: () => void
  fetchProfile: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,

  hydrate: () => {
    const token = getToken()
    const user = getStoredUser<{ id: number; username: string; email: string; phone: string; role: string }>()
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
      const { data } = await authService.login(credentials)
      setToken(data.access_token)
      setStoredUser(data.user, Date.now() + 86400000)
      set({ user: data.user, isAuthenticated: true, isLoading: false })
    } catch (e) {
      set({ isLoading: false })
      throw e
    }
  },

  logout: () => {
    clearToken()
    set({ user: null, isAuthenticated: false })
  },

  fetchProfile: async () => {
    try {
      const { data } = await authService.getProfile()
      set({ user: data })
    } catch {
      clearToken()
      set({ user: null, isAuthenticated: false })
    }
  },
}))
