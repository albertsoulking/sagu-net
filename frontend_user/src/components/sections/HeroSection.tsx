import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, MapPin, Users, Gauge, Signal } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { fadeIn, fadeInLeft, fadeInRight, staggerContainer } from '@/animations'

const statCards = [
  { icon: Users, value: '5,000+', label: 'Active Customers', color: 'from-primary-400 to-primary-600' },
  { icon: MapPin, value: '150+', label: 'Villages Connected', color: 'from-accent-400 to-accent-600' },
  { icon: Gauge, value: '1 Gbps', label: 'Max Speed', color: 'from-purple-400 to-purple-600' },
]

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background gradient orbs */}
      <div className="hero-glow top-20 -left-20 bg-primary-500" />
      <div className="hero-glow bottom-20 -right-20 bg-accent-500" />
      <div className="hero-glow top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary-500 opacity-10" />

      {/* Network particles - CSS dots & lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[10%] left-[5%] w-1 h-1 rounded-full bg-primary-400/60 animate-pulse" />
        <div className="absolute top-[20%] right-[15%] w-1.5 h-1.5 rounded-full bg-accent-400/60 animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-[40%] left-[10%] w-1 h-1 rounded-full bg-primary-400/40 animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-[60%] right-[8%] w-1.5 h-1.5 rounded-full bg-accent-400/50 animate-pulse" style={{ animationDelay: '0.5s' }} />
        <div className="absolute top-[75%] left-[15%] w-1 h-1 rounded-full bg-primary-400/60 animate-pulse" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-[85%] right-[20%] w-1 h-1 rounded-full bg-accent-400/40 animate-pulse" style={{ animationDelay: '2.5s' }} />
        <div className="absolute top-[30%] left-[30%] w-1 h-1 rounded-full bg-primary-400/50 animate-pulse" style={{ animationDelay: '0.8s' }} />
        <div className="absolute top-[50%] right-[30%] w-1.5 h-1.5 rounded-full bg-accent-400/60 animate-pulse" style={{ animationDelay: '1.8s' }} />
        {/* Connection lines */}
        <div className="network-line top-[25%] left-[5%] w-[20%] rotate-12" />
        <div className="network-line top-[45%] right-[10%] w-[25%] -rotate-12" />
        <div className="network-line top-[65%] left-[8%] w-[15%] rotate-6" />
        <div className="network-line top-[35%] right-[5%] w-[18%] -rotate-6" />
        <div className="network-line top-[55%] left-[3%] w-[12%] rotate-3" />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-20 md:py-32 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-8"
          >
            <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-300 text-sm">
              <Signal className="w-4 h-4" />
              <span>Myanmar's Fastest Growing ISP</span>
            </motion.div>

            <motion.h1
              variants={fadeInLeft}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
            >
              <span className="gradient-text">Building The Future</span>
              <br />
              <span className="text-white">Of Internet Connectivity</span>
            </motion.h1>

            <motion.p
              variants={fadeInLeft}
              className="text-lg md:text-xl text-white/60 max-w-xl leading-relaxed"
            >
              Experience lightning-fast fiber internet with 99.9% uptime reliability. 
              Connecting homes, businesses, and communities across Myanmar with 
              next-generation network technology.
            </motion.p>

            <motion.div
              variants={fadeIn}
              className="flex flex-wrap gap-4"
            >
              <Link to="/services">
                <Button variant="primary" size="lg">
                  Explore Services
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/coverage">
                <Button variant="outline" size="lg">
                  View Coverage
                  <MapPin className="w-4 h-4" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right - Floating Stat Cards */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="hidden lg:flex flex-col gap-6 relative"
          >
            {/* Central network node */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-primary-500/10 border border-primary-500/30 animate-pulse-glow" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-primary-500/20 border border-primary-500/40" />

            {statCards.map((card, index) => (
              <motion.div
                key={card.label}
                variants={fadeInRight}
                custom={index}
                className="relative ml-auto"
                style={{ marginTop: index === 0 ? '2rem' : index === 2 ? '-1rem' : '0' }}
              >
                <div
                  className="glass rounded-2xl p-5 flex items-center gap-4 min-w-[260px] animate-float"
                  style={{ animationDelay: `${index * 0.5}s` }}
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center flex-shrink-0`}>
                    <card.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold gradient-text">{card.value}</p>
                    <p className="text-sm text-white/50">{card.label}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
