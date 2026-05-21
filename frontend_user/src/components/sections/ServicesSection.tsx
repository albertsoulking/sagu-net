import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { services } from '@/data'
import { cn } from '@/lib/utils'
import { staggerContainer, staggerItem } from '@/animations'

export default function ServicesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="py-20 md:py-32 px-4 relative overflow-hidden">
      <div className="hero-glow top-1/2 -right-40 bg-accent-500 opacity-10" />

      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-300 text-sm mb-6">
            <span>What We Offer</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Our <span className="gradient-text">Services</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-lg">
            Comprehensive internet and technology solutions tailored for homes, 
            businesses, and communities across Myanmar.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.title}
                variants={staggerItem}
                className="group relative"
              >
                <div
                  className={cn(
                    'glass rounded-2xl p-8 h-full relative overflow-hidden',
                    'transition-all duration-500',
                    'group-hover:scale-[1.02]',
                    'group-hover:shadow-xl group-hover:shadow-primary-500/10',
                  )}
                >
                  {/* Gradient border on hover */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-500/20 to-accent-500/20 p-[1px]">
                      <div className="w-full h-full rounded-2xl bg-dark-900" />
                    </div>
                  </div>

                  {/* Hover gradient shift */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-500/0 via-transparent to-accent-500/0 opacity-0 group-hover:opacity-100 group-hover:from-primary-500/5 group-hover:to-accent-500/5 transition-all duration-500" />

                  <div className="relative z-10">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary-500/20 to-accent-500/20 flex items-center justify-center mb-5 group-hover:from-primary-500/30 group-hover:to-accent-500/30 transition-all duration-500">
                      <Icon className="w-6 h-6 text-primary-300" />
                    </div>

                    <h3 className="text-xl font-semibold text-white mb-3">
                      {service.title}
                    </h3>

                    <p className="text-white/50 leading-relaxed mb-6">
                      {service.description}
                    </p>

                    <Link
                      to="/services"
                      className="inline-flex items-center gap-2 text-sm text-primary-300 hover:text-accent-400 transition-colors group/link"
                    >
                      Learn More
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
