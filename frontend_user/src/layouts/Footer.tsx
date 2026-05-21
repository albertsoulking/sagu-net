import { Link } from 'react-router-dom'
import { Wifi, Mail, Phone, MapPin, Globe, MessageCircle, ExternalLink, Share2, Video } from 'lucide-react'
import { COMPANY, NAV_LINKS } from '@/constants'

const services = [
  { label: 'Fiber Internet', href: '/services' },
  { label: 'Business Network', href: '/services' },
  { label: 'Enterprise Solutions', href: '/services' },
  { label: 'CCTV & Security', href: '/services' },
  { label: 'Smart Community', href: '/services' },
]

const socialLinks = [
  { icon: Globe, href: COMPANY.social.facebook },
  { icon: MessageCircle, href: COMPANY.social.twitter },
  { icon: Share2, href: COMPANY.social.linkedin },
  { icon: Video, href: COMPANY.social.youtube },
  { icon: ExternalLink, href: COMPANY.social.instagram },
]

const contactDetails = [
  { icon: Phone, value: COMPANY.phone, href: `tel:${COMPANY.phone}` },
  { icon: Mail, value: COMPANY.email, href: `mailto:${COMPANY.email}` },
  { icon: MapPin, value: COMPANY.address },
]

export function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-dark-900 to-dark-950 border-t border-white/5 overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500">
                <Wifi className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">
                {COMPANY.name}
              </span>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              {COMPANY.description}
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map(({ icon: Icon, href }, index) => (
                <a
                  key={index}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white/5 text-white/40 hover:text-white hover:bg-white/10 hover:shadow-lg hover:shadow-primary-500/10 transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-white/50 hover:text-white text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Our Services</h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <Link
                    to={service.href}
                    className="text-white/50 hover:text-white text-sm transition-colors duration-200"
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-4">
              {contactDetails.map(({ icon: Icon, value, href }, index) => (
                <li key={index}>
                  {href ? (
                    <a
                      href={href}
                      className="flex items-start gap-3 text-white/50 hover:text-white text-sm transition-colors duration-200"
                    >
                      <Icon className="w-4 h-4 mt-0.5 shrink-0 text-primary-400" />
                      <span>{value}</span>
                    </a>
                  ) : (
                    <span className="flex items-start gap-3 text-white/50 text-sm">
                      <Icon className="w-4 h-4 mt-0.5 shrink-0 text-primary-400" />
                      <span>{value}</span>
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            &copy; {new Date().getFullYear()} {COMPANY.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-white/40 hover:text-white text-sm transition-colors duration-200">
              Terms of Service
            </a>
            <a href="#" className="text-white/40 hover:text-white text-sm transition-colors duration-200">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
