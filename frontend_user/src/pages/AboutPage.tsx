import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Target, Eye, Heart, Check, Star } from 'lucide-react'
import CountUp from 'react-countup'
import { useInView } from 'react-intersection-observer'
import { Button } from '@/components/ui/Button'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { fadeInUp, staggerContainer, staggerItem, fadeIn, scaleIn } from '@/animations'
import { cn } from '@/lib/utils'
import { STATS, COMPANY } from '@/constants'

const milestones = [
  { year: 2020, title: 'Company Founded', description: 'Sagu Net was established with a vision to connect Mandalay with high-speed fiber internet.' },
  { year: 2021, title: 'First 1,000 Customers', description: 'Reached our first major milestone of serving 1,000 satisfied customers in Mandalay region.' },
  { year: 2022, title: 'Network Expansion', description: 'Expanded fiber network to 50 villages across the Mandalay and Sagaing regions.' },
  { year: 2023, title: 'Enterprise Services Launch', description: 'Launched enterprise-grade solutions for businesses, including dedicated bandwidth and cloud services.' },
  { year: 2024, title: '10,000 Customers Milestone', description: 'Achieved 10,000 active customers with 99.9% network uptime.' },
  { year: 2025, title: 'Regional Leadership', description: 'Became the leading fiber ISP in upper Myanmar with 150+ villages connected.' },
]

const team = [
  { name: 'U Myo Win', role: 'CEO & Founder', initials: 'MW', bio: 'Former telecom executive with 20+ years of experience in Myanmar\'s telecommunications industry.' },
  { name: 'Daw Su Su Hlaing', role: 'CTO', initials: 'SH', bio: 'Network architect with expertise in fiber optics and enterprise network infrastructure.' },
  { name: 'U Aung Min', role: 'COO', initials: 'AM', bio: 'Operations expert focused on delivering world-class customer service and network reliability.' },
  { name: 'Daw Khin Mar Kyi', role: 'CFO', initials: 'KK', bio: 'Finance professional ensuring sustainable growth and accessible pricing for all customers.' },
]

const values = [
  { icon: Target, title: 'Mission', description: 'To provide affordable, high-speed internet connectivity that empowers communities, businesses, and individuals across Myanmar to thrive in the digital age.' },
  { icon: Eye, title: 'Vision', description: 'A fully connected Myanmar where every village, home, and business has access to world-class internet infrastructure, creating limitless opportunities for all.' },
  { icon: Heart, title: 'Values', description: 'Integrity, innovation, customer-centricity, and community development guide every decision we make at Sagu Net.' },
]

function StatItem({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 })
  return (
    <div ref={ref} className="text-center p-6">
      <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
        {inView ? <CountUp end={value} decimals={value % 1 ? 1 : 0} duration={2.5} /> : 0}
        {suffix}
      </div>
      <p className="text-white/50 text-sm">{label}</p>
    </div>
  )
}

export default function AboutPage() {
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
            About <span className="gradient-text">Sagu Net</span>
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto"
          >
            Building Myanmar&apos;s digital future with reliable, affordable fiber internet
          </motion.p>
        </div>
      </section>

      {/* Company Story */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <SectionTitle
                subtitle="Our Story"
                title="From Vision to Reality"
                className="text-left mb-6"
              />
              <div className="space-y-4 text-white/50 leading-relaxed">
                <p>
                  Sagu Net was founded in 2020 by a team of telecommunications professionals who saw 
                  a critical gap in Myanmar&apos;s internet infrastructure. While urban areas enjoyed 
                  increasingly fast connectivity, rural communities and smaller towns were being left behind.
                </p>
                <p>
                  Starting in Mandalay, we built our first fiber network from the ground up, focusing on 
                  quality, reliability, and affordability. Our name &ldquo;Sagu&rdquo; reflects our commitment 
                  to growth and prosperity for the communities we serve.
                </p>
                <p>
                  Today, we serve over 5,000 active customers across 150+ villages, providing everything 
                  from basic home internet to enterprise-grade solutions. Our team of 50+ dedicated 
                  professionals works around the clock to ensure our customers stay connected.
                </p>
              </div>
            </motion.div>
            <motion.div
              variants={scaleIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-primary-500/10 to-accent-500/10 border border-white/5 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl font-bold">SN</span>
                  </div>
                  <p className="text-white/40 text-sm">{COMPANY.tagline}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="relative py-20 bg-dark-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            subtitle="Our Foundation"
            title="Mission, Vision & Values"
            description="The core principles that drive everything we do at Sagu Net"
          />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-6"
          >
            {values.map((item) => (
              <motion.div
                key={item.title}
                variants={staggerItem}
                className="glass rounded-2xl p-8 text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500/10 to-accent-500/10 border border-primary-500/10 flex items-center justify-center mx-auto mb-5">
                  <item.icon className="w-8 h-8 text-primary-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">{item.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="relative py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            subtitle="Our Journey"
            title="Company Milestones"
            description="Key moments in our growth story"
          />
          <div className="relative">
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary-500/50 via-accent-500/50 to-transparent" />
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="space-y-12"
            >
              {milestones.map((milestone, i) => (
                <motion.div
                  key={milestone.year}
                  variants={staggerItem}
                  className={cn(
                    'relative flex flex-col md:flex-row gap-6 md:gap-10',
                    i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse',
                  )}
                >
                  <div className={cn(
                    'flex-1',
                    i % 2 === 0 ? 'md:text-right' : 'md:text-left',
                  )}>
                    <div className="glass rounded-2xl p-6">
                      <span className={cn(
                        'inline-block text-sm font-semibold text-primary-400 mb-2',
                      )}>
                        {milestone.year}
                      </span>
                      <h3 className="text-lg font-semibold text-white mb-2">{milestone.title}</h3>
                      <p className="text-white/50 text-sm leading-relaxed">{milestone.description}</p>
                    </div>
                  </div>
                  <div className="absolute left-6 md:left-1/2 w-3 h-3 rounded-full bg-primary-500 border-2 border-dark-950 -translate-x-1/2 mt-6 z-10" />
                  <div className="flex-1 hidden md:block" />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="relative py-20 bg-dark-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            subtitle="Our Team"
            title="Meet The Leadership"
            description="Experienced professionals dedicated to connecting Myanmar"
          />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {team.map((member) => (
              <motion.div
                key={member.name}
                variants={staggerItem}
                className="glass rounded-2xl p-6 text-center group"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-2xl font-bold mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  {member.initials}
                </div>
                <h3 className="text-lg font-semibold text-white mb-1">{member.name}</h3>
                <p className="text-primary-400 text-sm font-medium mb-3">{member.role}</p>
                <p className="text-white/40 text-sm leading-relaxed">{member.bio}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="relative py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="glass rounded-2xl p-8 md:p-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 divide-x divide-y md:divide-y-0 divide-white/5"
          >
            {STATS.map((stat) => (
              <StatItem key={stat.label} {...stat} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="glass rounded-3xl p-12 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-accent-500/5" />
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Want to Be Part of Our Story?
              </h2>
              <p className="text-white/50 text-lg mb-8 max-w-xl mx-auto">
                Join us in building Myanmar&apos;s digital future. Explore career opportunities at Sagu Net.
              </p>
              <Link to="/careers">
                <Button size="lg">
                  Join Our Team <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
