import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Check, ChevronDown, Wifi, Activity, Gauge, Shield } from 'lucide-react'
import CountUp from 'react-countup'
import { useInView } from 'react-intersection-observer'
import { Button } from '@/components/ui/Button'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { fadeInUp, staggerContainer, staggerItem, scaleIn } from '@/animations'
import { cn } from '@/lib/utils'

const regions = [
  { name: 'Mandalay City', status: 'Full Coverage', townships: 'All 7 townships', speed: 'Up to 1 Gbps', customers: 2500 },
  { name: 'Amarapura', status: 'Full Coverage', townships: 'All areas', speed: 'Up to 500 Mbps', customers: 800 },
  { name: 'Pyin Oo Lwin', status: 'Full Coverage', townships: 'City center & suburbs', speed: 'Up to 300 Mbps', customers: 600 },
  { name: 'Sagaing', status: 'Full Coverage', townships: 'City & major villages', speed: 'Up to 300 Mbps', customers: 500 },
  { name: 'Patheingyi', status: 'Partial Coverage', townships: 'Selected areas', speed: 'Up to 200 Mbps', customers: 300 },
  { name: 'Madaya', status: 'Partial Coverage', townships: 'Town center', speed: 'Up to 100 Mbps', customers: 200 },
]

const metrics = [
  { icon: Activity, label: 'Network Uptime', value: 99.9, suffix: '%', color: 'text-accent-400' },
  { icon: Gauge, label: 'Average Speed', value: 150, suffix: ' Mbps', color: 'text-primary-400' },
  { icon: Wifi, label: 'Avg. Latency', value: 5, suffix: ' ms', color: 'text-accent-400' },
  { icon: Shield, label: 'Reliability', value: 99.5, suffix: '%', color: 'text-primary-400' },
]

const faqItems = [
  { q: 'How do I check if Sagu Net is available in my area?', a: 'You can use our coverage map above or contact our customer service team. We are continuously expanding our network, so even if your area is not currently covered, it may be added soon.' },
  { q: 'What internet speeds can I expect in my area?', a: 'Speeds vary by location. Our fiber connections typically offer speeds from 15 Mbps to 1 Gbps depending on your plan and area coverage.' },
  { q: 'Is fiber internet available in rural areas?', a: 'Yes! We have connected over 150 villages across the Mandalay and Sagaing regions. Our mission is to bring fiber internet to rural communities.' },
  { q: 'How long does installation take?', a: 'Standard installation takes 1-3 business days after sign-up. Premium installations can be completed within 24 hours.' },
  { q: 'Do you offer temporary connectivity for events?', a: 'Yes, we provide temporary internet connectivity solutions for events, exhibitions, and construction sites. Contact us for a custom quote.' },
]

function CoverageMap() {
  const locations = [
    { x: '50%', y: '40%', size: 'lg', label: 'Mandalay', pulse: true },
    { x: '30%', y: '35%', size: 'md', label: 'Sagaing' },
    { x: '70%', y: '25%', size: 'md', label: 'Pyin Oo Lwin' },
    { x: '45%', y: '55%', size: 'sm', label: 'Amarapura' },
    { x: '35%', y: '60%', size: 'sm', label: 'Patheingyi' },
    { x: '55%', y: '65%', size: 'sm', label: 'Madaya' },
  ]

  return (
    <div className="relative w-full aspect-[16/9] rounded-2xl bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 border border-white/5 overflow-hidden">
      {/* Grid lines */}
      <div className="absolute inset-0 opacity-10">
        {[0, 1, 2, 3].map((i) => (
          <div key={`h-${i}`} className="absolute left-0 right-0 h-px bg-primary-500" style={{ top: `${(i + 1) * 20}%` }} />
        ))}
        {[0, 1, 2, 3].map((i) => (
          <div key={`v-${i}`} className="absolute top-0 bottom-0 w-px bg-primary-500" style={{ left: `${(i + 1) * 20}%` }} />
        ))}
      </div>

      {/* Connection lines */}
      <svg className="absolute inset-0 w-full h-full" style={{ filter: 'blur(1px)' }}>
        <line x1="50%" y1="40%" x2="30%" y2="35%" stroke="rgba(99,102,241,0.2)" strokeWidth="1" />
        <line x1="50%" y1="40%" x2="70%" y2="25%" stroke="rgba(99,102,241,0.2)" strokeWidth="1" />
        <line x1="50%" y1="40%" x2="45%" y2="55%" stroke="rgba(99,102,241,0.2)" strokeWidth="1" />
        <line x1="50%" y1="40%" x2="35%" y2="60%" stroke="rgba(99,102,241,0.15)" strokeWidth="0.5" />
        <line x1="50%" y1="40%" x2="55%" y2="65%" stroke="rgba(99,102,241,0.15)" strokeWidth="0.5" />
      </svg>

      {/* Animated dots */}
      {locations.map((loc, i) => (
        <div
          key={i}
          className={cn(
            'absolute -translate-x-1/2 -translate-y-1/2',
            loc.size === 'lg' ? 'z-10' : loc.size === 'md' ? 'z-5' : 'z-1',
          )}
          style={{ left: loc.x, top: loc.y }}
        >
          <div className="relative flex items-center justify-center">
            <div
              className={cn(
                'rounded-full bg-primary-500',
                loc.size === 'lg' ? 'w-5 h-5' : loc.size === 'md' ? 'w-3 h-3' : 'w-2 h-2',
              )}
            />
            {loc.pulse && (
              <>
                <div className="absolute w-8 h-8 rounded-full bg-primary-500/30 animate-ping" />
                <div className="absolute w-12 h-12 rounded-full bg-primary-500/10 animate-ping" style={{ animationDelay: '0.5s' }} />
              </>
            )}
            <span
              className={cn(
                'absolute -bottom-6 left-1/2 -translate-x-1/2 text-nowrap font-medium',
                loc.size === 'lg' ? 'text-white text-sm' : 'text-white/50 text-xs',
              )}
            >
              {loc.label}
            </span>
          </div>
        </div>
      ))}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-transparent to-transparent pointer-events-none" />

      {/* Map placeholder text */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center">
        <p className="text-white/30 text-xs">Interactive coverage map - Mandalay Region</p>
      </div>
    </div>
  )
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="glass rounded-xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left cursor-pointer"
      >
        <span className="text-white font-medium text-sm pr-4">{question}</span>
        <ChevronDown
          className={cn(
            'w-5 h-5 text-white/40 shrink-0 transition-transform duration-300',
            isOpen && 'rotate-180',
          )}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-5 text-white/50 text-sm leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function CoveragePage() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 })

  return (
    <div className="overflow-hidden">
      {/* Hero Banner */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-dark-950 to-accent-500/10" />
        <div className="hero-glow bg-primary-500 top-[-200px] left-[-200px]" />
        <div className="hero-glow bg-accent-500 bottom-[-200px] right-[-200px]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
          >
            Network <span className="gradient-text">Coverage</span>
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto"
          >
            See if Sagu Net fiber internet is available in your area
          </motion.p>
        </div>
      </section>

      {/* Interactive Coverage Map */}
      <section className="relative -mt-8 pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <CoverageMap />
          </motion.div>
        </div>
      </section>

      {/* Coverage Statistics */}
      <section className="relative py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={ref}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="glass rounded-2xl p-8 md:p-12 grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {[
              { value: 150, suffix: '+', label: 'Villages Connected' },
              { value: 5000, suffix: '+', label: 'Active Customers' },
              { value: 500, suffix: '+ km', label: 'Fiber Network' },
              { value: 95, suffix: '%', label: 'Coverage Area' },
            ].map((stat) => (
              <motion.div key={stat.label} variants={staggerItem} className="text-center">
                <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                  {inView ? <CountUp end={stat.value} duration={2.5} /> : 0}
                  {stat.suffix}
                </div>
                <p className="text-white/50 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Network Performance Metrics */}
      <section className="relative py-20 bg-dark-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            subtitle="Performance"
            title="Network Performance Metrics"
            description="Our network is built for speed, reliability, and consistency across all coverage areas."
          />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-4 gap-6"
          >
            {metrics.map((metric) => (
              <motion.div
                key={metric.label}
                variants={staggerItem}
                className="glass rounded-2xl p-6 text-center"
              >
                <metric.icon className={cn('w-10 h-10 mx-auto mb-4', metric.color)} />
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                  {metric.value}
                  {metric.suffix}
                </div>
                <p className="text-white/50 text-sm">{metric.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Region List */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            subtitle="Regions"
            title="Coverage by Region"
            description="Detailed coverage information for areas we serve in the Mandalay region."
          />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="overflow-x-auto"
          >
            <div className="min-w-[600px]">
              <div className="grid grid-cols-5 gap-4 p-4 text-white/40 text-sm font-medium border-b border-white/5">
                <span>Region</span>
                <span>Status</span>
                <span>Townships</span>
                <span>Max Speed</span>
                <span>Customers</span>
              </div>
              {regions.map((region) => (
                <motion.div
                  key={region.name}
                  variants={staggerItem}
                  className="grid grid-cols-5 gap-4 p-4 items-center border-b border-white/5 hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary-400" />
                    <span className="text-white font-medium text-sm">{region.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={cn(
                      'w-2 h-2 rounded-full',
                      region.status === 'Full Coverage' ? 'bg-accent-400' : 'bg-amber-400',
                    )} />
                    <span className={cn(
                      'text-sm',
                      region.status === 'Full Coverage' ? 'text-accent-400' : 'text-amber-400',
                    )}>
                      {region.status}
                    </span>
                  </div>
                  <span className="text-white/50 text-sm">{region.townships}</span>
                  <span className="text-white/50 text-sm">{region.speed}</span>
                  <span className="text-white/50 text-sm">{region.customers.toLocaleString()}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative py-20 bg-dark-900/50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            subtitle="FAQ"
            title="Coverage Questions"
            description="Common questions about our network coverage and availability."
          />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-3"
          >
            {faqItems.map((item) => (
              <motion.div key={item.q} variants={staggerItem}>
                <FAQItem question={item.q} answer={item.a} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="glass rounded-3xl p-12 md:p-16 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-accent-500/5" />
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Don&apos;t See Your Area?
              </h2>
              <p className="text-white/50 text-lg mb-8 max-w-xl mx-auto">
                We&apos;re expanding rapidly. Let us know where you want us to connect next.
              </p>
              <Button size="lg">
                Request Coverage <MapPin className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
