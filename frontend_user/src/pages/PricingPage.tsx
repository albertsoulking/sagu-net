import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Check, X, ChevronDown, HelpCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { fadeInUp, staggerContainer, staggerItem } from '@/animations'
import { cn } from '@/lib/utils'
import { pricingPlans } from '@/data'

const compareFeatures = [
  { name: 'Max Speed', basic: '15 Mbps', standard: '30 Mbps', premium: '60 Mbps', enterprise: '1 Gbps' },
  { name: 'Installation', basic: 'Standard', standard: 'Free', premium: 'Free Premium', enterprise: 'Enterprise' },
  { name: 'WiFi Router', basic: 'Basic', standard: 'Included', premium: 'Mesh System', enterprise: 'Full Setup' },
  { name: 'Support', basic: 'Email', standard: 'Priority', premium: '24/7 Priority', enterprise: 'Dedicated Manager' },
  { name: 'Uptime SLA', basic: 'Standard', standard: '99.5%', premium: '99.9%', enterprise: '99.99%' },
  { name: 'Static IP', basic: <X className="w-4 h-4 text-red-400" />, standard: <X className="w-4 h-4 text-red-400" />, premium: <Check className="w-4 h-4 text-accent-400" />, enterprise: <Check className="w-4 h-4 text-accent-400" /> },
  { name: 'Annual Discount', basic: <X className="w-4 h-4 text-red-400" />, standard: '1 Month Free', premium: '2 Months Free', enterprise: 'Custom' },
  { name: 'Dedicated Bandwidth', basic: <X className="w-4 h-4 text-red-400" />, standard: <X className="w-4 h-4 text-red-400" />, premium: <X className="w-4 h-4 text-red-400" />, enterprise: <Check className="w-4 h-4 text-accent-400" /> },
  { name: 'Contract', basic: 'No Contract', standard: 'No Contract', premium: 'No Contract', enterprise: 'Annual' },
]

const faqItems = [
  { q: 'Are there any hidden fees?', a: 'No, we believe in transparent pricing. The price you see is the price you pay. There are no hidden installation fees, equipment charges, or surprise costs.' },
  { q: 'Can I change my plan later?', a: 'Yes, you can upgrade or downgrade your plan at any time. Upgrades take effect immediately, while downgrades take effect from the next billing cycle.' },
  { q: 'Is there a contract or lock-in period?', a: 'Our residential plans have no long-term contracts. You can cancel at any time. Enterprise plans may require an annual commitment for pricing guarantees.' },
  { q: 'What payment methods do you accept?', a: 'We accept bank transfers, mobile payments (Wave Money, KBZ Pay), and cash payments at our office. Online payment options coming soon.' },
  { q: 'Do you offer discounts for annual payments?', a: 'Yes! Annual subscribers get 1-2 months free depending on the plan. Enterprise customers get custom pricing for long-term commitments.' },
  { q: 'What happens if I exceed my data limit?', a: 'We do not enforce data caps on any of our fiber plans. Enjoy unlimited data usage at full speeds.' },
]

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

export default function PricingPage() {
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
            Transparent <span className="gradient-text">Pricing</span>
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto"
          >
            No hidden fees. No surprises. Just fast, reliable internet at affordable prices.
          </motion.p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="relative -mt-8 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {pricingPlans.map((plan) => (
              <motion.div
                key={plan.name}
                variants={staggerItem}
                className={cn(
                  'relative rounded-2xl p-6 border transition-all duration-300',
                  plan.popular
                    ? 'bg-gradient-to-b from-primary-500/10 to-accent-500/5 border-primary-500/30'
                    : 'glass border-white/5 hover:border-white/10',
                )}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 text-xs font-semibold">
                    Most Popular
                  </div>
                )}
                <h3 className="text-lg font-semibold text-white mb-1">{plan.name}</h3>
                <p className="text-white/40 text-sm mb-4">{plan.speed}</p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-sm text-white/50">{plan.currency}</span>
                  <span className="text-3xl font-bold text-white">{plan.price.toLocaleString()}</span>
                  <span className="text-white/40 text-sm">{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-accent-400 mt-0.5 shrink-0" />
                      <span className="text-white/50 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/contact">
                  <Button
                    variant={plan.popular ? 'primary' : 'outline'}
                    className="w-full"
                  >
                    Get Started
                  </Button>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="relative py-20 bg-dark-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            subtitle="Comparison"
            title="Plan Comparison"
            description="See exactly what each plan includes. Choose the one that fits your needs."
          />

          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="overflow-x-auto"
          >
            <div className="min-w-[700px]">
              <div className="grid grid-cols-5 gap-4 p-4 border-b border-white/5">
                <span className="text-white/40 text-sm font-medium">Features</span>
                {pricingPlans.map((plan) => (
                  <span key={plan.name} className={cn(
                    'text-sm font-semibold text-center',
                    plan.popular ? 'text-primary-400' : 'text-white',
                  )}>
                    {plan.name}
                  </span>
                ))}
              </div>
              {compareFeatures.map((feature) => (
                <div
                  key={feature.name}
                  className="grid grid-cols-5 gap-4 p-4 border-b border-white/5 hover:bg-white/5 transition-colors items-center"
                >
                  <span className="text-white text-sm font-medium">{feature.name}</span>
                  <span className="text-white/50 text-sm text-center">{feature.basic}</span>
                  <span className="text-white/50 text-sm text-center">{feature.standard}</span>
                  <span className="text-white/50 text-sm text-center">{feature.premium}</span>
                  <span className="text-white/50 text-sm text-center">{feature.enterprise}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            subtitle="FAQ"
            title="Pricing Questions"
            description="Everything you need to know about our pricing and plans."
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
      <section className="relative py-20 bg-dark-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="glass rounded-3xl p-12 md:p-16 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-accent-500/5" />
            <div className="relative">
              <HelpCircle className="w-12 h-12 text-primary-400 mx-auto mb-4" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Not Sure Which Plan?
              </h2>
              <p className="text-white/50 text-lg mb-8 max-w-xl mx-auto">
                Contact our team and we&apos;ll help you find the perfect plan for your needs.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/contact">
                  <Button size="lg">
                    Contact Us <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link to="/coverage">
                  <Button variant="outline" size="lg">
                    Check Coverage
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
