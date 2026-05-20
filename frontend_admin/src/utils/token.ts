const TOKEN_KEY = 'sagu_net_token'
const USER_KEY = 'sagu_net_user'
const EXPIRES_KEY = 'sagu_net_expires'

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY)
}

export function setToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token)
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
  localStorage.removeItem(EXPIRES_KEY)
}

export function getStoredUser<T>(): T | null {
  const raw = localStorage.getItem(USER_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw) as T
  } catch {
    return null
  }
}

export function setStoredUser(user: unknown, expiresAt: number) {
  localStorage.setItem(USER_KEY, JSON.stringify(user))
  localStorage.setItem(EXPIRES_KEY, String(expiresAt))
}

export function isTokenExpired(): boolean {
  const expires = localStorage.getItem(EXPIRES_KEY)
  if (!expires) return true
  return Date.now() > Number(expires)
}
