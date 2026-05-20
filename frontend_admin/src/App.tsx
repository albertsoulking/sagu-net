import { useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'sonner'
import { router } from '@/routes'
import { useAuthStore } from '@/store/authStore'
import { useThemeStore } from '@/store/themeStore'

export default function App() {
  const hydrate = useAuthStore((s) => s.hydrate)
  const isDark = useThemeStore((s) => s.isDark)

  useEffect(() => {
    hydrate()
    document.documentElement.classList.toggle('dark', isDark)
  }, [hydrate, isDark])

  return (
    <>
      <RouterProvider router={router} />
      <Toaster position="top-right" richColors closeButton />
    </>
  )
}
