import axios from 'axios'
import { getToken, clearToken, isTokenExpired } from '@/utils/token'

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000'

export const api = axios.create({
  baseURL: API_BASE + '/api',
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
})

api.interceptors.request.use((config) => {
  const token = getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => {
      if (response.data && typeof response.data === 'object' && 'success' in response.data && 'data' in response.data) {
        const { data, meta } = response.data
        response.data = meta ? { data, meta } : data
      }
    return response
  },
  (error) => {
    if (error.response?.status === 401 || isTokenExpired()) {
      clearToken()
      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  },
)
