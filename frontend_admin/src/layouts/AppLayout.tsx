import { Outlet } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { Header } from './Header'

export function AppLayout() {
  const location = useLocation()

  return (
    <span className="flex min-h-screen">
      <Sidebar />
      <span className="flex min-w-0 flex-1 flex-col lg:pl-0">
        <Header />
        <main className="flex-1 p-4 lg:p-6">
          <AnimatePresence mode="wait">
            <motion.span
              key={location.pathname}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="block"
            >
              <Outlet />
            </motion.span>
          </AnimatePresence>
        </main>
      </span>
    </span>
  )
}
