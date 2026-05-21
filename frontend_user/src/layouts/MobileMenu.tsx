import { motion, AnimatePresence } from 'framer-motion'
import { X, Globe, MessageCircle, Share2, Video, ExternalLink } from 'lucide-react'
import { Link } from 'react-router-dom'
import { NAV_LINKS, COMPANY } from '@/constants'
import { cn } from '@/lib/utils'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

const socialIcons = [
  { icon: Globe, href: COMPANY.social.facebook },
  { icon: MessageCircle, href: COMPANY.social.twitter },
  { icon: Share2, href: COMPANY.social.linkedin },
  { icon: Video, href: COMPANY.social.youtube },
  { icon: ExternalLink, href: COMPANY.social.instagram },
]

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-sm z-50 bg-dark-950/95 backdrop-blur-xl border-l border-white/10 overflow-y-auto"
          >
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <span className="text-xl font-bold gradient-text">Sagu Net</span>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close menu"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            <nav className="p-6 space-y-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={onClose}
                  className={cn(
                    'block py-3 px-4 rounded-xl text-white/70 hover:text-white hover:bg-white/5 transition-all duration-200 text-lg font-medium',
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="p-6 border-t border-white/10">
              <p className="text-white/40 text-sm mb-4">Connect With Us</p>
              <div className="flex items-center gap-3">
                {socialIcons.map(({ icon: Icon, href }, index) => (
                  <a
                    key={index}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-white/5 text-white/50 hover:text-white hover:bg-white/10 transition-all duration-200"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
