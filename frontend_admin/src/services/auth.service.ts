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
    email: string
    phone: string
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
