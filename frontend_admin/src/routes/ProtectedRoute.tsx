import { Navigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import { isTokenExpired } from '@/utils/token'

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, user } = useAuthStore()
  const location = useLocation()

  if (!isAuthenticated || !user || isTokenExpired()) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <>{children}</>
}
