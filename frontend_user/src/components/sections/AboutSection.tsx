import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Target, Eye, Clock } from 'lucide-react'
import { cn } from '@/lib/utils'
import { fadeInLeft, fadeInRight, staggerContainer, staggerItem, fadeInUp } from '@/animations'

const milestones = [
  { year: '2020', title: 'Founded', description: 'Sagu Net established with a vision to connect Myanmar.' },
  { year: '2021', title: 'First 1,000 Customers', description: 'Reached milestone of 1,000 active subscribers in Mandalay region.' },
  { year: '2022', title: 'Fiber Expansion', description: 'Launched fiber optic network across major townships.' },
  { year: '2024', title: '150 Villages Connected', description: 'Expanded reach to rural communities across Upper Myanmar.' },
  { year: '2026', title: 'Leading ISP', description: 'Recognized as Myanmar\'s fastest-growing internet provider.' },
]

export default function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="py-20 md:py-32 px-4 relative overflow-hidden">
      <div className="hero-glow top-1/3 -left-40 bg-primary-500 opacity-10" />

      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-24"
        >
          {/* Image placeholder */}
          <motion.div variants={fadeInLeft} className="relative">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-600/30 via-dark-800 to-accent-600/30" />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-900/60 to-transparent" />
              {/* Decorative elements */}
              <div className="absolute top-8 left-8 w-20 h-20 rounded-full bg-primary-500/20 blur-xl" />
              <div className="absolute bottom-8 right-8 w-32 h-32 rounded-full bg-accent-500/20 blur-xl" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                <p className="text-5xl font-bold gradient-text">5+</p>
                <p className="text-white/60 mt-2">Years of Excellence</p>
              </div>
              {/* Grid lines overlay */}
              <div className="absolute inset-0 opacity-10">
                <div className="w-full h-full" style={{
                  backgroundImage: 'linear-gradient(rgba(99,102,241,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.3) 1px, transparent 1px)',
                  backgroundSize: '40px 40px'
                }} />
              </div>
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-4 -right-4 glass rounded-xl px-4 py-3 flex items-center gap-3 animate-float">
              <Clock className="w-4 h-4 text-accent-400" />
              <span className="text-sm text-white/80">Est. 2020</span>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div variants={fadeInRight} className="flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-300 text-sm w-fit">
              <Target className="w-4 h-4" />
              <span>About Us</span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              Connecting Myanmar With{' '}
              <span className="gradient-text">Next-Gen Fiber</span>
            </h2>

            <p className="text-white/60 leading-relaxed">
              Founded in 2020, Sagu Net has grown from a small local ISP to one of 
              Myanmar's most trusted internet service providers. Our mission is to 
              bridge the digital divide by delivering high-speed, reliable, and 
              affordable internet connectivity to every home, business, and community.
            </p>

            {/* Mission & Vision */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <div className="glass rounded-xl p-5">
                <Target className="w-5 h-5 text-primary-400 mb-3" />
                <h3 className="font-semibold text-white mb-1">Our Mission</h3>
                <p className="text-sm text-white/50">
                  To provide accessible, high-quality internet connectivity that empowers 
                  communities and drives digital transformation across Myanmar.
                </p>
              </div>
              <div className="glass rounded-xl p-5">
                <Eye className="w-5 h-5 text-accent-400 mb-3" />
                <h3 className="font-semibold text-white mb-1">Our Vision</h3>
                <p className="text-sm text-white/50">
                  A fully connected Myanmar where everyone has equal access to the 
                  opportunities of the digital age.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="relative"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-12">
            Our <span className="gradient-text">Journey</span>
          </h3>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 -translate-x-px top-0 bottom-0 w-px bg-gradient-to-b from-primary-500/50 via-accent-500/50 to-primary-500/50 hidden md:block" />

            <div className="space-y-8 md:space-y-0 relative">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  variants={staggerItem}
                  className={cn(
                    'flex flex-col md:flex-row items-center gap-4 md:gap-8',
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse',
                  )}
                >
                  <div className={cn(
                    'flex-1',
                    index % 2 === 0 ? 'md:text-right' : 'md:text-left',
                  )}>
                    <div className="glass rounded-xl p-5 inline-block max-w-sm">
                      <p className="text-sm text-primary-300 font-semibold">{milestone.year}</p>
                      <h4 className="text-lg font-semibold text-white mt-1">{milestone.title}</h4>
                      <p className="text-sm text-white/50 mt-1">{milestone.description}</p>
                    </div>
                  </div>

                  {/* Timeline dot */}
                  <div className="hidden md:flex w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 items-center justify-center flex-shrink-0 relative z-10 shadow-lg shadow-primary-500/30">
                    <div className="w-3 h-3 rounded-full bg-white" />
                  </div>

                  <div className="flex-1 hidden md:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
