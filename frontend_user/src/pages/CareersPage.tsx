import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, MapPin, Briefcase, Clock, ChevronDown, X, Check, Heart, Coffee, GraduationCap, Users, Gift, Zap, Send, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { fadeInUp, staggerContainer, staggerItem, scaleIn } from '@/animations'
import { cn } from '@/lib/utils'
import { jobs, benefits } from '@/data'

const benefitCards = [
  { icon: Heart, title: 'Health Insurance', description: 'Comprehensive health coverage for you and your family.' },
  { icon: Coffee, title: 'Great Culture', description: 'Collaborative, inclusive, and innovative work environment.' },
  { icon: GraduationCap, title: 'Learning & Growth', description: 'Continuous learning opportunities and career development.' },
  { icon: Users, title: 'Team Events', description: 'Regular team building activities and company outings.' },
  { icon: Gift, title: 'Competitive Benefits', description: 'Transportation, phone allowance, and performance bonuses.' },
  { icon: Zap, title: 'Modern Tools', description: 'Latest equipment and tools to do your best work.' },
]

interface PositionCardProps {
  job: typeof jobs[0]
  index: number
}

function PositionCard({ job, index }: PositionCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <motion.div
      variants={staggerItem}
      className="glass rounded-2xl overflow-hidden"
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-6 text-left cursor-pointer"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-white mb-2">{job.title}</h3>
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <span className="flex items-center gap-1.5 text-primary-400">
                <Briefcase className="w-4 h-4" />
                {job.department}
              </span>
              <span className="flex items-center gap-1.5 text-white/50">
                <MapPin className="w-4 h-4" />
                {job.location}
              </span>
              <span className="flex items-center gap-1.5 text-accent-400">
                <Clock className="w-4 h-4" />
                {job.type}
              </span>
            </div>
          </div>
          <ChevronDown
            className={cn(
              'w-5 h-5 text-white/40 shrink-0 transition-transform duration-300',
              isExpanded && 'rotate-180',
            )}
          />
        </div>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 border-t border-white/5 pt-4">
              <p className="text-white/50 text-sm leading-relaxed mb-6">{job.description}</p>
              <div className="flex flex-wrap gap-3">
                <Button
                  size="sm"
                  onClick={() => {
                    const form = document.getElementById('application-form')
                    if (form) form.scrollIntoView({ behavior: 'smooth' })
                  }}
                >
                  Apply Now <ArrowRight className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm">
                  Learn More
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function CareersPage() {
  const [formState, setFormState] = useState({
    name: '', email: '', phone: '', position: '', message: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    await new Promise((r) => setTimeout(r, 1500))
    setSubmitting(false)
    setSubmitted(true)
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
            Join <span className="gradient-text">Our Team</span>
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto"
          >
            Help us build Myanmar&apos;s digital future. We&apos;re looking for passionate people.
          </motion.p>
        </div>
      </section>

      {/* Company Culture / Benefits */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            subtitle="Why Join Us"
            title="Life at Sagu Net"
            description="We believe in creating an environment where our team can thrive, grow, and make an impact."
          />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {benefitCards.map((benefit) => (
              <motion.div
                key={benefit.title}
                variants={staggerItem}
                className="glass rounded-2xl p-6 text-center"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500/10 to-accent-500/10 border border-primary-500/10 flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-7 h-7 text-primary-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{benefit.title}</h3>
                <p className="text-white/50 text-sm">{benefit.description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Benefits List */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-12 glass rounded-2xl p-8"
          >
            <h3 className="text-xl font-semibold text-white mb-6 text-center">Additional Benefits</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {benefits.map((benefit, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-accent-400 shrink-0" />
                  <span className="text-white/50 text-sm">{benefit}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="relative py-20 bg-dark-900/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            subtitle="Open Positions"
            title="Current Job Openings"
            description="Explore opportunities to join our growing team."
          />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="space-y-4"
          >
            {jobs.map((job, index) => (
              <PositionCard key={job.title} job={job} index={index} />
            ))}
          </motion.div>

          {jobs.length === 0 && (
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center py-12"
            >
              <p className="text-white/50 text-lg">No open positions at the moment. Check back later!</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Application Form */}
      <section id="application-form" className="relative py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            subtitle="Apply Now"
            title="Submit Your Application"
            description="Fill out the form below and our HR team will get back to you."
          />

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
              <h3 className="text-2xl font-bold text-white mb-2">Application Submitted!</h3>
              <p className="text-white/50">
                Thank you for your interest. We&apos;ll review your application and get back to you soon.
              </p>
              <Button
                variant="outline"
                className="mt-6"
                onClick={() => {
                  setSubmitted(false)
                  setFormState({ name: '', email: '', phone: '', position: '', message: '' })
                }}
              >
                Submit Another Application
              </Button>
            </motion.div>
          ) : (
            <motion.form
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              onSubmit={handleSubmit}
              className="glass rounded-2xl p-8 space-y-5"
            >
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-white/70 text-sm font-medium mb-2">Full Name *</label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-primary-500/50 transition-colors"
                    placeholder="John Doe"
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
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="phone" className="block text-white/70 text-sm font-medium mb-2">Phone *</label>
                  <input
                    id="phone"
                    type="tel"
                    required
                    value={formState.phone}
                    onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-primary-500/50 transition-colors"
                    placeholder="+95 9 123 456 789"
                  />
                </div>
                <div>
                  <label htmlFor="position" className="block text-white/70 text-sm font-medium mb-2">Position *</label>
                  <select
                    id="position"
                    required
                    value={formState.position}
                    onChange={(e) => setFormState({ ...formState, position: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-primary-500/50 transition-colors"
                  >
                    <option value="" disabled className="bg-dark-900">Select a position</option>
                    {jobs.map((job) => (
                      <option key={job.title} value={job.title} className="bg-dark-900">{job.title}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-white/70 text-sm font-medium mb-2">Resume / CV</label>
                <div className="w-full px-4 py-8 rounded-xl bg-white/5 border border-dashed border-white/10 text-center cursor-pointer hover:border-primary-500/30 transition-colors">
                  <input type="file" className="hidden" accept=".pdf,.doc,.docx" />
                  <div className="text-white/30 text-sm">
                    <p className="mb-1">Drop your resume here or click to browse</p>
                    <p className="text-xs">PDF, DOC, DOCX (Max 10MB)</p>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-white/70 text-sm font-medium mb-2">Cover Letter / Message</label>
                <textarea
                  id="message"
                  rows={4}
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-primary-500/50 transition-colors resize-none"
                  placeholder="Tell us why you'd be a great fit..."
                />
              </div>

              <Button type="submit" className="w-full" loading={submitting}>
                {submitting ? 'Submitting...' : 'Submit Application'} <Send className="w-4 h-4" />
              </Button>
            </motion.form>
          )}
        </div>
      </section>
    </div>
  )
}
