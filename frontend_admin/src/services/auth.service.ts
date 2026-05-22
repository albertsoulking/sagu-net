import { api } from './api'

export interface LoginRequest {
  username: string
  password: string
}

export interface AuthResponse {
  access_token: string
  refresh_token: string
  user: {
    id: number
    username: string
    name: string | null
    email: string | null
    phone: string | null
    role: string
  }
}

export const authService = {
  async login(data: LoginRequest) {
    const res = await api.post<AuthResponse>('/auth/login', data)
    return res.data
  },

  async logout(refreshToken?: string) {
    const res = await api.post('/auth/logout', { refresh_token: refreshToken })
    return res.data
  },

  async checkInit() {
    const res = await api.get<{ initialized: boolean }>('/auth/check-init')
    return res.data
  },

  async init() {
    const res = await api.post<{ message: string }>('/auth/init')
    return res.data
  },

  async updateProfile(data: { username?: string; password?: string }) {
    const res = await api.put('/auth/profile', data)
    return res.data
  },

  async refresh(refreshToken: string) {
    const res = await api.post('/auth/refresh', { refresh_token: refreshToken })
    return res.data
  },

  async getProfile() {
    const res = await api.get('/auth/profile')
    return res.data
  },

  async changePassword(oldPassword: string, newPassword: string) {
    const res = await api.post('/auth/change-password', {
      old_password: oldPassword,
      new_password: newPassword,
    })
    return res.data
  },
}
