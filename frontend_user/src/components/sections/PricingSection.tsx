import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Check, Star } from 'lucide-react'
import { pricingPlans } from '@/data'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import { staggerContainer, staggerItem } from '@/animations'

export default function PricingSection() {
  const [yearly, setYearly] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="py-20 md:py-32 px-4 relative overflow-hidden">
      <div className="hero-glow top-20 -left-20 bg-primary-500 opacity-10" />
      <div className="hero-glow bottom-20 -right-20 bg-accent-500 opacity-10" />

      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-300 text-sm mb-6">
            <Star className="w-4 h-4" />
            <span>Pricing</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Choose Your <span className="gradient-text">Plan</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-lg">
            Flexible plans designed to meet your needs. From home browsing to 
            enterprise-grade connectivity.
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-3 mt-8 p-1.5 glass rounded-full">
            <button
              onClick={() => setYearly(false)}
              className={cn(
                'px-5 py-2 rounded-full text-sm font-medium transition-all duration-300',
                !yearly ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg' : 'text-white/60 hover:text-white',
              )}
            >
              Monthly
            </button>
            <button
              onClick={() => setYearly(true)}
              className={cn(
                'px-5 py-2 rounded-full text-sm font-medium transition-all duration-300',
                yearly ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg' : 'text-white/60 hover:text-white',
              )}
            >
              Annual
            </button>
          </div>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {pricingPlans.map((plan) => (
            <motion.div
              key={plan.name}
              variants={staggerItem}
              className="group relative"
            >
              <div
                className={cn(
                  'glass rounded-2xl p-8 h-full relative overflow-hidden',
                  'transition-all duration-500',
                  'group-hover:scale-[1.03]',
                  'group-hover:shadow-xl group-hover:shadow-primary-500/10',
                  plan.popular && 'border-primary-500/30',
                )}
              >
                {/* Gradient border on hover */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-500/20 to-accent-500/20 p-[1px]">
                    <div className="w-full h-full rounded-2xl bg-dark-900" />
                  </div>
                </div>

                {/* Popular badge */}
                {plan.popular && (
                  <div className="absolute top-4 right-4 z-10">
                    <div className="px-3 py-1 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 text-xs font-semibold text-white shadow-lg">
                      Popular
                    </div>
                  </div>
                )}

                <div className="relative z-10">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${plan.color} flex items-center justify-center mb-5`}>
                    <span className="text-white font-bold text-lg">
                      {plan.name.charAt(0)}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-white mb-1">{plan.name}</h3>
                  <p className="text-sm text-white/40 mb-4">{plan.speed}</p>

                  <div className="mb-6">
                    <div className="flex items-baseline gap-1">
                      <span className="text-sm text-white/40">{plan.currency}</span>
                      <span className="text-4xl font-bold gradient-text">
                        {yearly
                          ? Math.round(plan.price * 10)
                          : plan.price.toLocaleString()
                        }
                      </span>
                    </div>
                    <p className="text-sm text-white/40 mt-1">
                      {yearly ? '/year' : plan.period}
                      {yearly && (
                        <span className="text-accent-400 ml-2">Save ~17%</span>
                      )}
                    </p>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check className="w-4 h-4 text-accent-400 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-white/60">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    variant={plan.popular ? 'primary' : 'secondary'}
                    className="w-full"
                  >
                    Get Started
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
