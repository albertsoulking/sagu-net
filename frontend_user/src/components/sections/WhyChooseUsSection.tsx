import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { whyChooseUs } from '@/data'
import { cn } from '@/lib/utils'
import { staggerContainer, staggerItem } from '@/animations'

const spans = [
  'md:col-span-2 md:row-span-1',
  'md:col-span-1 md:row-span-2',
  'md:col-span-1 md:row-span-1',
  'md:col-span-1 md:row-span-1',
  'md:col-span-2 md:row-span-1',
  'md:col-span-1 md:row-span-1',
]

const contentSizes = [
  'large',
  'small',
  'small',
  'small',
  'large',
  'small',
]

export default function WhyChooseUsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="py-20 md:py-32 px-4 relative overflow-hidden">
      <div className="hero-glow top-1/3 -right-40 bg-accent-500 opacity-10" />

      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-300 text-sm mb-6">
            <span>Why Us</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Why Choose <span className="gradient-text">Sagu Net</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-lg">
            We deliver more than just internet — we provide a complete, reliable, 
            and secure digital experience backed by enterprise infrastructure.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-auto"
        >
          {whyChooseUs.map((item, index) => {
            const Icon = item.icon
            const span = spans[index]
            const isLarge = contentSizes[index] === 'large'

            return (
              <motion.div
                key={item.title}
                variants={staggerItem}
                className={cn('group', span)}
              >
                <div
                  className={cn(
                    'glass rounded-2xl relative overflow-hidden',
                    'transition-all duration-500',
                    'group-hover:scale-[1.02]',
                    'group-hover:shadow-xl group-hover:shadow-primary-500/10',
                    'h-full',
                    isLarge ? 'p-8 md:p-10' : 'p-6',
                  )}
                >
                  {/* Gradient border on hover */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-500/20 to-accent-500/20 p-[1px]">
                      <div className="w-full h-full rounded-2xl bg-dark-900" />
                    </div>
                  </div>

                  {/* Hover gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-500/0 via-transparent to-accent-500/0 opacity-0 group-hover:opacity-100 group-hover:from-primary-500/5 group-hover:to-accent-500/5 transition-all duration-500" />

                  <div className="relative z-10">
                    <div className={cn(
                      'rounded-xl bg-gradient-to-br from-primary-500/20 to-accent-500/20 flex items-center justify-center mb-4 group-hover:from-primary-500/30 group-hover:to-accent-500/30 transition-all duration-500',
                      isLarge ? 'w-14 h-14' : 'w-12 h-12',
                    )}>
                      <Icon className={cn(
                        'text-primary-300',
                        isLarge ? 'w-6 h-6' : 'w-5 h-5',
                      )} />
                    </div>

                    <h3 className={cn(
                      'font-semibold text-white mb-2',
                      isLarge ? 'text-xl' : 'text-base',
                    )}>
                      {item.title}
                    </h3>

                    <p className={cn(
                      'text-white/50 leading-relaxed',
                      isLarge ? 'text-base' : 'text-sm',
                    )}>
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
