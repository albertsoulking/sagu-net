import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import CountUp from 'react-countup'
import { Users, MapPin, Gauge, Globe, Shield } from 'lucide-react'
import { STATS } from '@/constants'
import { cn } from '@/lib/utils'
import { staggerContainer, staggerItem } from '@/animations'

const icons = [Users, MapPin, Gauge, Globe, Shield]

export default function StatsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="py-20 md:py-32 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6"
        >
          {STATS.map((stat, index) => {
            const Icon = icons[index]
            return (
              <motion.div
                key={stat.label}
                variants={staggerItem}
                className="group relative"
              >
                <div
                  className={cn(
                    'glass rounded-2xl p-6 md:p-8 text-center relative overflow-hidden',
                    'transition-all duration-300',
                    'hover:shadow-lg hover:shadow-primary-500/10',
                    'hover:border-primary-500/40',
                    'before:absolute before:inset-0 before:rounded-2xl before:opacity-0 before:transition-opacity before:duration-300',
                    'hover:before:opacity-100 before:bg-gradient-to-b before:from-primary-500/5 before:to-accent-500/5',
                  )}
                >
                  {/* Gradient border on hover */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-500/20 to-accent-500/20 p-[1px]">
                      <div className="w-full h-full rounded-2xl bg-dark-900" />
                    </div>
                  </div>

                  <div className="relative z-10">
                    <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-primary-500/20 to-accent-500/20 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary-300" />
                    </div>

                    <div className="text-3xl md:text-4xl font-bold gradient-text mb-1">
                      {isInView ? (
                        <CountUp
                          end={stat.value}
                          suffix={stat.suffix}
                          prefix={stat.prefix}
                          duration={2.5}
                          decimals={stat.value % 1 !== 0 ? 1 : 0}
                        />
                      ) : (
                        <span>0{stat.suffix}</span>
                      )}
                    </div>

                    <p className="text-sm text-white/50">{stat.label}</p>
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
