import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Wifi, Menu } from 'lucide-react'
import { NAV_LINKS } from '@/constants'
import { cn } from '@/lib/utils'
import { navVariants } from '@/animations'
import { MobileMenu } from './MobileMenu'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  return (
    <>
      <motion.header
        variants={navVariants}
        initial="hidden"
        animate="visible"
        className={cn(
          'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
          scrolled
            ? 'bg-dark-950/80 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/10'
            : 'bg-transparent',
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="p-2 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 group-hover:shadow-lg group-hover:shadow-primary-500/30 transition-shadow duration-300">
                <Wifi className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">
                Sagu<span className="gradient-text"> Net</span>
              </span>
            </Link>

            <nav className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => {
                const isActive = location.pathname === link.href
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={cn(
                      'relative px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200',
                      isActive
                        ? 'text-white'
                        : 'text-white/60 hover:text-white hover:bg-white/5',
                    )}
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="activeNav"
                        className="absolute inset-0 bg-white/10 rounded-full -z-10"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                )
              })}
            </nav>

            <div className="hidden lg:flex items-center gap-3">
              <a
                href="http://localhost:5173"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2 text-sm font-medium text-white/70 hover:text-white transition-colors duration-200"
              >
                Login
              </a>
              <Link
                to="/pricing"
                className="px-6 py-2.5 text-sm font-medium rounded-full bg-gradient-to-r from-primary-500 to-accent-500 text-white hover:shadow-lg hover:shadow-primary-500/25 transition-all duration-300"
              >
                Get Started
              </Link>
            </div>

            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 rounded-full hover:bg-white/5 transition-colors cursor-pointer"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />}
      </AnimatePresence>
    </>
  )
}
