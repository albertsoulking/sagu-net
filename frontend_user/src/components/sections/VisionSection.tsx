import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Cpu, Radio, Wifi, Network, Building2, Cloud } from 'lucide-react'
import { cn } from '@/lib/utils'
import { staggerContainer, staggerItem } from '@/animations'

const visionItems = [
  { icon: Building2, title: 'Smart City', description: 'Building interconnected urban ecosystems with IoT and smart infrastructure for sustainable cities.', color: 'from-primary-400 to-primary-600' },
  { icon: Cpu, title: 'AI Network', description: 'Leveraging artificial intelligence for predictive maintenance, traffic optimization, and network automation.', color: 'from-purple-400 to-purple-600' },
  { icon: Radio, title: '5G Ready', description: 'Preparing our infrastructure for next-generation 5G connectivity across urban and rural areas.', color: 'from-accent-400 to-accent-600' },
  { icon: Wifi, title: 'Fiber Expansion', description: 'Continuous expansion of our fiber backbone to reach every household and business in Myanmar.', color: 'from-blue-400 to-blue-600' },
  { icon: Network, title: 'Smart Villages', description: 'Bringing digital transformation to rural communities with affordable, reliable connectivity solutions.', color: 'from-teal-400 to-teal-600' },
  { icon: Cloud, title: 'Cloud Services', description: 'Integrated cloud solutions for businesses including storage, computing, and managed services.', color: 'from-amber-400 to-amber-600' },
]

export default function VisionSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="relative min-h-screen py-20 md:py-32 px-4 overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-950 via-primary-950/30 to-dark-950 animate-gradient" />

      {/* Grid lines background */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(rgba(99,102,241,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.5) 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }} />

      <div className="hero-glow top-1/3 left-1/3 bg-primary-500 opacity-15" />
      <div className="hero-glow bottom-1/3 right-1/3 bg-accent-500 opacity-10" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            The Future of{' '}
            <span className="gradient-text">Connectivity</span>
          </h2>
          <p className="text-white/60 max-w-3xl mx-auto text-lg leading-relaxed">
            We're not just building an internet network — we're laying the foundation 
            for a digitally empowered Myanmar. Our vision extends beyond connectivity 
            to create smart ecosystems that transform how people live, work, and thrive.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {visionItems.map((item) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.title}
                variants={staggerItem}
                className="group"
              >
                <div
                  className={cn(
                    'glass rounded-2xl p-8 h-full relative overflow-hidden',
                    'transition-all duration-500',
                    'group-hover:scale-[1.02]',
                    'group-hover:shadow-xl group-hover:shadow-primary-500/10',
                    'hover:border-primary-500/30',
                  )}
                >
                  {/* Gradient border on hover */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-500/20 to-accent-500/20 p-[1px]">
                      <div className="w-full h-full rounded-2xl bg-dark-900" />
                    </div>
                  </div>

                  <div className="relative z-10">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-5 shadow-lg`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>

                    <h3 className="text-xl font-semibold text-white mb-3">
                      {item.title}
                    </h3>

                    <p className="text-white/50 leading-relaxed">
                      {item.description}
                    </p>
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
