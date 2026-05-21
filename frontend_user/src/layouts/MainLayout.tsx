import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { ScrollProgress } from './ScrollProgress'
import { FloatingContactButton } from './FloatingContactButton'
import { Navbar } from './Navbar'
import { Footer } from './Footer'

export function MainLayout() {
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-dark-950 text-white">
      <ScrollProgress />
      <FloatingContactButton />
      <Navbar />

      <main className="relative">
        <Outlet />
      </main>

      <Footer />

      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: showScrollTop ? 1 : 0, scale: showScrollTop ? 1 : 0 }}
        onClick={scrollToTop}
        className="fixed bottom-6 left-6 z-40 p-3 rounded-full bg-white/10 backdrop-blur-xl border border-white/10 text-white hover:bg-white/20 transition-all duration-300 cursor-pointer"
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-5 h-5" />
      </motion.button>
    </div>
  )
}
