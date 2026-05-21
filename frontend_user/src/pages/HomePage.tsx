import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Check, Star, Wifi, Shield, Globe, Server } from 'lucide-react'
import { useInView } from 'react-intersection-observer'
import CountUp from 'react-countup'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { Button } from '@/components/ui/Button'
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer, staggerItem, fadeIn, scaleIn } from '@/animations'
import { cn } from '@/lib/utils'
import { services, pricingPlans, testimonials, whyChooseUs } from '@/data'
import { STATS, COMPANY } from '@/constants'

function AnimatedSection({ children, className, ...props }: { children: React.ReactNode; className?: string; [key: string]: unknown }) {
  return (
    <motion.section
      variants={fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      className={cn('relative py-20 lg:py-28', className)}
      {...props}
    >
      {children}
    </motion.section>
  )
}

function StatItem({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 })
  return (
    <motion.div
      ref={ref}
      variants={staggerItem}
      className="text-center p-6"
    >
      <div className="text-3xl md:text-4xl lg:text-5xl font-bold gradient-text mb-2">
        {inView ? <CountUp end={value} decimals={value % 1 ? 1 : 0} duration={2.5} /> : 0}
        {suffix}
      </div>
      <p className="text-white/50 text-sm md:text-base">{label}</p>
    </motion.div>
  )
}

export default function HomePage() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="hero-glow bg-primary-500 top-[-100px] left-[-100px]" />
        <div className="hero-glow bg-accent-500 bottom-[-100px] right-[-100px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.08)_0%,transparent_70%)]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-300 text-sm mb-6">
                <span className="w-2 h-2 rounded-full bg-accent-400 animate-pulse" />
                Building The Future Of Connectivity
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6">
                High-Speed Fiber
                <span className="block gradient-text">Internet in Myanmar</span>
              </h1>
              <p className="text-lg lg:text-xl text-white/50 max-w-xl mb-8 leading-relaxed">
                {COMPANY.description}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/pricing">
                  <Button size="lg">
                    View Plans <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link to="/coverage">
                  <Button variant="outline" size="lg">
                    Check Coverage
                  </Button>
                </Link>
              </div>

              <div className="flex items-center gap-6 mt-10 pt-8 border-t border-white/5">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 border-2 border-dark-950 flex items-center justify-center text-xs font-bold"
                    >
                      {['KM', 'DH', 'SW', 'AA'][i - 1]}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>
                  <p className="text-white/40 text-sm">Trusted by 5,000+ customers</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
              className="relative hidden lg:block"
            >
              <div className="relative aspect-square max-w-lg mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-accent-500/20 rounded-full blur-3xl" />
                <div className="relative w-full h-full flex items-center justify-center">
                  <div className="grid grid-cols-2 gap-4 w-full">
                    {[
                      { icon: Wifi, label: 'Fiber Optic' },
                      { icon: Shield, label: 'Secure' },
                      { icon: Globe, label: 'Global Speed' },
                      { icon: Server, label: '24/7 Support' },
                    ].map((item, i) => (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + i * 0.1 }}
                        className="glass rounded-2xl p-6 text-center hover:border-primary-500/30 transition-all duration-300"
                      >
                        <item.icon className="w-8 h-8 text-primary-400 mx-auto mb-3" />
                        <p className="text-white/70 text-sm font-medium">{item.label}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="glass rounded-2xl p-8 md:p-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 divide-x divide-y md:divide-y-0 divide-white/5"
          >
            {STATS.map((stat) => (
              <StatItem key={stat.label} {...stat} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <AnimatedSection>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              variants={fadeInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-primary-500/10 to-accent-500/10 border border-white/5 overflow-hidden">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center p-8">
                    <Wifi className="w-16 h-16 text-primary-400 mx-auto mb-4" />
                    <p className="text-white/30 text-sm">Sagu Net Fiber Network</p>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 p-0.5">
                <div className="w-full h-full rounded-2xl bg-dark-950 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold gradient-text">2020</div>
                    <div className="text-white/50 text-xs">Founded</div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={fadeInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <SectionTitle
                subtitle="About Us"
                title="Connecting Myanmar to the Future"
                description="We are on a mission to bridge the digital divide and bring world-class internet connectivity to every corner of Myanmar."
                className="text-left mb-6"
              />
              <p className="text-white/50 leading-relaxed mb-6">
                Founded in 2020, Sagu Net has grown from a small local ISP to a leading fiber internet provider 
                in the Mandalay region. Our commitment to quality, reliability, and customer satisfaction has 
                earned us the trust of thousands of homes and businesses.
              </p>
              <div className="space-y-4 mb-8">
                {[
                  'State-of-the-art fiber optic infrastructure',
                  'Expert team of certified network engineers',
                  '24/7 customer support in local languages',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-accent-500/10 flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 text-accent-400" />
                    </div>
                    <span className="text-white/60 text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <Link to="/about">
                <Button variant="outline">
                  Learn More <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      {/* Services Section */}
      <AnimatedSection className="bg-dark-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            subtitle="Our Services"
            title="Comprehensive Connectivity Solutions"
            description="From high-speed fiber internet to enterprise-grade networking solutions, we offer everything you need to stay connected."
          />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {services.map((service) => (
              <motion.div
                key={service.title}
                variants={staggerItem}
                whileHover="hover"
                initial="rest"
                className="glass rounded-2xl p-8 group cursor-default"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary-500/10 to-accent-500/10 border border-primary-500/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="w-7 h-7 text-primary-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{service.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{service.description}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mt-10"
          >
            <Link to="/services">
              <Button variant="primary">
                View All Services <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Pricing Section */}
      <AnimatedSection>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            subtitle="Pricing Plans"
            title="Choose Your Perfect Plan"
            description="Flexible plans designed to meet your needs. All plans include free installation and 24/7 support."
          />

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

          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mt-10"
          >
            <Link to="/pricing">
              <Button variant="ghost">
                Compare All Plans <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Coverage Section */}
      <AnimatedSection className="bg-dark-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            subtitle="Coverage"
            title="Expanding Across Myanmar"
            description="Our fiber network is rapidly expanding. Check if we serve your area."
          />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="grid md:grid-cols-3 gap-6 mb-12"
          >
            {[
              { value: '95%', label: 'Mandalay Coverage' },
              { value: '150+', label: 'Villages Connected' },
              { value: '500+', label: 'Fiber Km Installed' },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={staggerItem}
                className="glass rounded-2xl p-6 text-center"
              >
                <div className="text-3xl font-bold gradient-text mb-1">{item.value}</div>
                <p className="text-white/50 text-sm">{item.label}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center"
          >
            <Link to="/coverage">
              <Button variant="outline">
                View Full Coverage Map <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Why Choose Us Section */}
      <AnimatedSection>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            subtitle="Why Choose Us"
            title="The Sagu Net Advantage"
            description="We go beyond just providing internet. Here's why thousands trust us."
          />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {whyChooseUs.map((item) => (
              <motion.div
                key={item.title}
                variants={staggerItem}
                className="glass rounded-2xl p-6 flex items-start gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center shrink-0">
                  <item.icon className="w-6 h-6 text-primary-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">{item.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Vision Section */}
      <AnimatedSection className="bg-dark-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass rounded-3xl p-8 md:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-accent-500/5" />
            <div className="relative">
              <motion.div
                variants={scaleIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <Globe className="w-16 h-16 text-primary-400 mx-auto mb-6" />
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                  Our Vision for{' '}
                  <span className="gradient-text">Myanmar</span>
                </h2>
                <p className="text-white/50 text-lg max-w-3xl mx-auto leading-relaxed mb-8">
                  We envision a Myanmar where every village, every home, and every business has access 
                  to fast, reliable, and affordable internet connectivity. A digitally connected Myanmar 
                  where opportunities are limitless.
                </p>
                <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                  {[
                    { label: 'Villages Connected', value: '500+', sub: 'by 2028' },
                    { label: 'Speed Target', value: '10 Gbps', sub: 'backbone capacity' },
                    { label: 'Customer Goal', value: '50,000+', sub: 'happy customers' },
                  ].map((item, i) => (
                    <div key={i} className="p-4 rounded-xl bg-white/5">
                      <div className="text-2xl font-bold gradient-text">{item.value}</div>
                      <div className="text-white/40 text-sm">{item.label}</div>
                      <div className="text-accent-400 text-xs">{item.sub}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Testimonials Section */}
      <AnimatedSection>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            subtitle="Testimonials"
            title="What Our Customers Say"
            description="Hear from our customers about their experience with Sagu Net."
          />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {testimonials.slice(0, 3).map((testimonial) => (
              <motion.div
                key={testimonial.name}
                variants={staggerItem}
                className="glass rounded-2xl p-6"
              >
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                  ))}
                </div>
                <p className="text-white/60 text-sm leading-relaxed mb-6 italic">
                  &ldquo;{testimonial.content}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-sm font-bold">
                    {testimonial.initials}
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm">{testimonial.name}</p>
                    <p className="text-white/40 text-xs">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </AnimatedSection>
    </div>
  )
}
