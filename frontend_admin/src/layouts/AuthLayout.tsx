import { Outlet } from 'react-router-dom'

export function AuthLayout() {
  return (
    <span className="min-h-screen">
      <Outlet />
    </span>
  )
}
