import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import CountUp from 'react-countup'
import { MapPin, Users, Wifi, CheckCircle, Activity, Zap, Timer, Shield } from 'lucide-react'
import { cn } from '@/lib/utils'
import { fadeInLeft, fadeInRight, staggerContainer, staggerItem } from '@/animations'

const coverageStats = [
  { icon: MapPin, value: 95, suffix: '%', label: 'Fiber Coverage', color: 'from-primary-400 to-primary-600' },
  { icon: Users, value: 150, suffix: '+', label: 'Active Regions', color: 'from-accent-400 to-accent-600' },
  { icon: Wifi, value: 5000, suffix: '+', label: 'Connected Users', color: 'from-purple-400 to-purple-600' },
]

const qualityMetrics = [
  { icon: CheckCircle, label: 'Uptime', value: '99.9%', color: 'text-green-400' },
  { icon: Timer, label: 'Avg. Ping', value: '<10ms', color: 'text-primary-300' },
  { icon: Zap, label: 'Speed', value: '1 Gbps', color: 'text-accent-300' },
  { icon: Shield, label: 'Reliability', value: 'Enterprise', color: 'text-purple-300' },
]

export default function CoverageSection() {
  const ref = useRef(null)
  const mapRef = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const mapInView = useInView(mapRef, { once: true, margin: '-100px' })

  return (
    <section className="py-20 md:py-32 px-4 relative overflow-hidden">
      <div className="hero-glow top-20 -left-40 bg-primary-500 opacity-10" />

      <motion.div
        ref={ref}
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="max-w-7xl mx-auto"
      >
        <motion.div variants={staggerItem} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-300 text-sm mb-6">
            <MapPin className="w-4 h-4" />
            <span>Our Network</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Coverage <span className="gradient-text">Map</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-lg">
            Expanding our fiber network across Myanmar, connecting communities 
            from Mandalay to the furthest villages.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Map Placeholder */}
          <motion.div
            ref={mapRef}
            variants={fadeInLeft}
            initial="hidden"
            animate={mapInView ? 'visible' : 'hidden'}
            className="relative"
          >
            <div className="glass rounded-2xl overflow-hidden aspect-[4/3] relative">
              {/* Styled network coverage map */}
              <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-primary-950/50 to-dark-900" />

              {/* Grid overlay */}
              <div className="absolute inset-0 opacity-20" style={{
                backgroundImage: 'linear-gradient(rgba(99,102,241,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.2) 1px, transparent 1px)',
                backgroundSize: '30px 30px'
              }} />

              {/* Coverage heat zones */}
              <div className="absolute top-[20%] left-[30%] w-40 h-40 rounded-full bg-primary-500/20 blur-3xl" />
              <div className="absolute top-[40%] right-[20%] w-32 h-32 rounded-full bg-accent-500/15 blur-3xl" />
              <div className="absolute bottom-[25%] left-[40%] w-36 h-36 rounded-full bg-primary-500/15 blur-3xl" />
              <div className="absolute top-[55%] left-[15%] w-24 h-24 rounded-full bg-accent-500/10 blur-2xl" />

              {/* Network nodes */}
              <div className="absolute top-[20%] left-[30%] w-3 h-3 rounded-full bg-primary-400 shadow-lg shadow-primary-500/50 animate-pulse" />
              <div className="absolute top-[40%] right-[20%] w-2.5 h-2.5 rounded-full bg-accent-400 shadow-lg shadow-accent-500/50 animate-pulse" style={{ animationDelay: '1s' }} />
              <div className="absolute bottom-[25%] left-[40%] w-3 h-3 rounded-full bg-primary-400 shadow-lg shadow-primary-500/50 animate-pulse" style={{ animationDelay: '0.5s' }} />
              <div className="absolute top-[55%] left-[15%] w-2 h-2 rounded-full bg-accent-400 shadow-lg shadow-accent-500/50 animate-pulse" style={{ animationDelay: '1.5s' }} />
              <div className="absolute top-[30%] right-[35%] w-2.5 h-2.5 rounded-full bg-primary-400 shadow-lg shadow-primary-500/50 animate-pulse" style={{ animationDelay: '0.8s' }} />
              <div className="absolute bottom-[40%] right-[25%] w-2 h-2 rounded-full bg-accent-400 shadow-lg shadow-accent-500/50 animate-pulse" style={{ animationDelay: '2s' }} />

              {/* Connection lines between nodes */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300">
                <line x1="120" y1="60" x2="320" y2="120" stroke="rgba(99,102,241,0.3)" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="320" y1="120" x2="160" y2="225" stroke="rgba(20,184,166,0.3)" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="160" y1="225" x2="120" y2="60" stroke="rgba(99,102,241,0.2)" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="120" y1="60" x2="60" y2="165" stroke="rgba(20,184,166,0.2)" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="60" y1="165" x2="160" y2="225" stroke="rgba(99,102,241,0.2)" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="320" y1="120" x2="260" y2="180" stroke="rgba(20,184,166,0.2)" strokeWidth="1" strokeDasharray="4 4" />
              </svg>

              {/* Center branding */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center mb-2 shadow-lg">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <p className="text-xs text-white/40">Mandalay Region</p>
              </div>
            </div>
          </motion.div>

          {/* Coverage Stats */}
          <motion.div
            variants={fadeInRight}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="flex flex-col gap-6"
          >
            {/* Main stats */}
            <div className="space-y-4">
              {coverageStats.map((stat, i) => (
                <div key={stat.label} className="glass rounded-xl p-5 flex items-center gap-4 group hover:border-primary-500/30 transition-all duration-300">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center flex-shrink-0`}>
                    <stat.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold gradient-text">
                      {isInView ? (
                        <CountUp
                          end={stat.value}
                          suffix={stat.suffix}
                          duration={2.5}
                          decimals={0}
                        />
                      ) : (
                        <span>0{stat.suffix}</span>
                      )}
                    </div>
                    <p className="text-sm text-white/50">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quality metrics */}
            <div className="glass rounded-xl p-6">
              <h4 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-4">
                Network Quality
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {qualityMetrics.map((metric) => {
                  const Icon = metric.icon
                  return (
                    <div
                      key={metric.label}
                      className="flex items-center gap-3 p-3 rounded-lg bg-white/5"
                    >
                      <Icon className={`w-4 h-4 ${metric.color}`} />
                      <div>
                        <p className="text-xs text-white/50">{metric.label}</p>
                        <p className={`text-sm font-semibold ${metric.color}`}>
                          {metric.value}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
