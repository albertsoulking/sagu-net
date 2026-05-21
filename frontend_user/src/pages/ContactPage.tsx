import { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Clock, Send, Check, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { fadeInUp, staggerItem, staggerContainer, scaleIn } from '@/animations'
import { COMPANY } from '@/constants'

const contactInfo = [
  { icon: Phone, label: 'Phone', value: COMPANY.phone, action: 'tel:+959450000111' },
  { icon: Mail, label: 'Email', value: COMPANY.email, action: `mailto:${COMPANY.email}` },
  { icon: MapPin, label: 'Address', value: COMPANY.address },
  { icon: Clock, label: 'Working Hours', value: COMPANY.workingHours },
]

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: '', email: '', phone: '', subject: '', message: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    await new Promise((r) => setTimeout(r, 1500))
    setSubmitting(false)
    setSubmitted(true)
    alert('Thank you for your message! We will get back to you soon.')
  }

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
            Get In <span className="gradient-text">Touch</span>
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto"
          >
            Have a question or need help? We&apos;re here for you.
          </motion.p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="relative -mt-8 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Left - Contact Info */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="lg:col-span-2 space-y-4"
            >
              {contactInfo.map((info) => (
                <motion.div
                  key={info.label}
                  variants={staggerItem}
                  className="glass rounded-2xl p-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500/10 to-accent-500/10 border border-primary-500/10 flex items-center justify-center shrink-0">
                      <info.icon className="w-6 h-6 text-primary-400" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">{info.label}</h3>
                      {info.action ? (
                        <a
                          href={info.action}
                          className="text-white/50 text-sm hover:text-accent-400 transition-colors"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-white/50 text-sm">{info.value}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Social quick links */}
              <motion.div variants={staggerItem} className="glass rounded-2xl p-6">
                <h3 className="text-white font-semibold mb-3">Follow Us</h3>
                <div className="flex items-center gap-2">
                  {[
                    { label: 'Facebook', href: COMPANY.social.facebook },
                    { label: 'Twitter', href: COMPANY.social.twitter },
                    { label: 'LinkedIn', href: COMPANY.social.linkedin },
                    { label: 'YouTube', href: COMPANY.social.youtube },
                  ].map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-full bg-white/5 text-white/50 text-xs hover:bg-white/10 hover:text-white transition-all"
                    >
                      {social.label}
                    </a>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Right - Contact Form */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="lg:col-span-3"
            >
              {submitted ? (
                <motion.div
                  variants={scaleIn}
                  initial="hidden"
                  animate="visible"
                  className="glass rounded-2xl p-12 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-accent-500/10 flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-accent-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                  <p className="text-white/50 mb-6">We&apos;ll get back to you within 24 hours.</p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSubmitted(false)
                      setFormState({ name: '', email: '', phone: '', subject: '', message: '' })
                    }}
                  >
                    Send Another Message
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block text-white/70 text-sm font-medium mb-2">Name *</label>
                      <input
                        id="name"
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-primary-500/50 transition-colors"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-white/70 text-sm font-medium mb-2">Email *</label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-primary-500/50 transition-colors"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="phone" className="block text-white/70 text-sm font-medium mb-2">Phone</label>
                      <input
                        id="phone"
                        type="tel"
                        value={formState.phone}
                        onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-primary-500/50 transition-colors"
                        placeholder="+95 9 123 456 789"
                      />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-white/70 text-sm font-medium mb-2">Subject *</label>
                      <select
                        id="subject"
                        required
                        value={formState.subject}
                        onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-primary-500/50 transition-colors"
                      >
                        <option value="" disabled className="bg-dark-900">Select a subject</option>
                        <option value="general" className="bg-dark-900">General Inquiry</option>
                        <option value="support" className="bg-dark-900">Technical Support</option>
                        <option value="billing" className="bg-dark-900">Billing Question</option>
                        <option value="installation" className="bg-dark-900">New Installation</option>
                        <option value="business" className="bg-dark-900">Business Inquiry</option>
                        <option value="other" className="bg-dark-900">Other</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-white/70 text-sm font-medium mb-2">Message *</label>
                    <textarea
                      id="message"
                      rows={5}
                      required
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-primary-500/50 transition-colors resize-none"
                      placeholder="How can we help you?"
                    />
                  </div>
                  <Button type="submit" className="w-full" loading={submitting}>
                    {submitting ? 'Sending...' : 'Send Message'} <Send className="w-4 h-4" />
                  </Button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="relative pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="rounded-2xl overflow-hidden relative"
          >
            <div className="aspect-[21/9] bg-gradient-to-br from-primary-500/20 via-dark-900 to-accent-500/20 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-10 h-10 text-primary-400 mx-auto mb-2" />
                <p className="text-white/50 text-sm">{COMPANY.address}</p>
              </div>
            </div>
            <div className="absolute inset-0 bg-dark-950/20" />
          </motion.div>
        </div>
      </section>
    </div>
  )
}
