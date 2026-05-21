import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Check, Zap, Clock, Users, HeadphonesIcon } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { fadeInUp, staggerContainer, staggerItem } from '@/animations'
import { services } from '@/data'
import { COMPANY } from '@/constants'

const extendedDescriptions: Record<string, string[]> = {
  'Fiber Internet': [
    'Experience lightning-fast internet with our state-of-the-art fiber optic technology. Perfect for streaming, gaming, video conferencing, and working from home.',
    'Our fiber connections deliver symmetrical upload and download speeds, ensuring you get the best performance for all your online activities.',
    'Every fiber installation includes a high-quality WiFi router, professional setup, and ongoing technical support to keep you connected.',
  ],
  'Business Network': [
    'Empower your business with enterprise-grade networking solutions designed for reliability and performance. Static IPs, dedicated bandwidth, and priority support included.',
    'Our business plans come with service level agreements guaranteeing 99.9% uptime, ensuring your operations never miss a beat.',
    'We provide end-to-end network design, implementation, and management, so you can focus on growing your business.',
  ],
  'Enterprise Solutions': [
    'Comprehensive IT infrastructure solutions for large organizations requiring robust, scalable, and secure network environments.',
    'From dedicated servers and cloud services to managed network operations, we provide the full spectrum of enterprise connectivity solutions.',
    'Our enterprise team works closely with your IT department to design, implement, and maintain solutions tailored to your specific needs.',
  ],
  'CCTV & Security': [
    'Advanced surveillance systems with high-definition cameras, remote monitoring capabilities, and AI-powered analytics for intelligent threat detection.',
    'All footage is securely stored in the cloud with redundant backup, ensuring your data is safe and accessible whenever you need it.',
    'Our security solutions integrate seamlessly with your existing network infrastructure for a unified approach to safety.',
  ],
  'Network Installation': [
    'Professional fiber optic installation services by our team of certified technicians with years of experience in structured cabling.',
    'We handle everything from site survey and design to installation, testing, and certification of your network infrastructure.',
    'Our installation services ensure optimal performance, minimal disruption, and future-proof scalability for your network.',
  ],
  'Smart Community': [
    'Transform your community with integrated smart solutions including IoT sensors, public WiFi hotspots, and centralized community network management.',
    'Our smart community solutions enable efficient resource management, enhanced public safety, and improved quality of life for residents.',
    'We partner with local authorities and community leaders to design solutions that address specific local needs and challenges.',
  ],
}

const features = [
  { icon: Zap, title: 'Lightning Speed', description: 'Fiber optic technology delivers speeds up to 1 Gbps for ultra-fast connectivity.' },
  { icon: Clock, title: '99.9% Uptime', description: 'Enterprise-grade reliability with redundant systems and automatic failover.' },
  { icon: Users, title: 'Expert Team', description: 'Certified network engineers and technicians providing professional service.' },
  { icon: HeadphonesIcon, title: '24/7 Support', description: 'Round-the-clock customer support in local languages.' },
]

export default function ServicesPage() {
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
            Our <span className="gradient-text">Services</span>
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto"
          >
            Comprehensive connectivity solutions for homes, businesses, and communities
          </motion.p>
        </div>
      </section>

      {/* Features Bar */}
      <section className="relative -mt-8 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                variants={staggerItem}
                className="glass rounded-2xl p-4 md:p-6 text-center"
              >
                <feature.icon className="w-6 h-6 text-primary-400 mx-auto mb-2" />
                <h3 className="text-white font-semibold text-sm mb-1">{feature.title}</h3>
                <p className="text-white/40 text-xs leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Detail */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            subtitle="What We Offer"
            title="Complete Service Portfolio"
            description="Every service is backed by our commitment to quality, reliability, and customer satisfaction."
          />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="space-y-8"
          >
            {services.map((service, index) => {
              const details = extendedDescriptions[service.title] || []
              return (
                <motion.div
                  key={service.title}
                  variants={staggerItem}
                  className="glass rounded-2xl p-8 md:p-10"
                >
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500/10 to-accent-500/10 border border-primary-500/10 flex items-center justify-center shrink-0">
                      <service.icon className="w-8 h-8 text-primary-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-2xl font-bold text-white mb-1">{service.title}</h3>
                          <p className="text-white/50">{service.description}</p>
                        </div>
                      </div>
                      {details.length > 0 && (
                        <ul className="space-y-3 mt-6">
                          {details.map((detail, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <Check className="w-5 h-5 text-accent-400 mt-0.5 shrink-0" />
                              <span className="text-white/50 text-sm">{detail}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20">
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
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Get Connected?
              </h2>
              <p className="text-white/50 text-lg mb-8 max-w-xl mx-auto">
                Contact us today and let our team help you find the perfect connectivity solution.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/contact">
                  <Button size="lg">
                    Contact Us <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link to="/pricing">
                  <Button variant="outline" size="lg">
                    View Pricing
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
