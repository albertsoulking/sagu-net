import { motion } from 'framer-motion'
import { fadeInUp } from '@/animations'

const sections = [
  {
    title: '1. Acceptance of Terms',
    content: 'By accessing or using Sagu Net\'s internet services, you agree to be bound by these Terms of Service. If you do not agree to all the terms, you may not access or use our services. These terms apply to all visitors, users, and customers of Sagu Net.',
  },
  {
    title: '2. Service Description',
    content: 'Sagu Net provides high-speed fiber optic internet connectivity services to residential and business customers in Myanmar. Service availability, speeds, and features may vary depending on your location and selected plan. We reserve the right to modify, suspend, or discontinue any aspect of our services at any time with reasonable notice.',
  },
  {
    title: '3. User Responsibilities',
    content: 'As a user of Sagu Net services, you agree to: (a) provide accurate and complete information during registration; (b) maintain the confidentiality of your account credentials; (c) use the services in compliance with all applicable laws and regulations; (d) not engage in any activity that interferes with or disrupts our network; (e) not use our services for any illegal or unauthorized purpose.',
  },
  {
    title: '4. Payment Terms',
    content: 'All service fees are due in advance on a monthly or annual basis as selected during sign-up. Payments can be made via bank transfer, mobile payment services, or cash at our office. Late payments may result in service suspension. Refunds are provided on a case-by-case basis and are subject to our refund policy.',
  },
  {
    title: '5. Service Level Agreement',
    content: 'Sagu Net is committed to providing reliable service with target uptime of 99.9% for residential plans and 99.99% for enterprise plans. In the event of service interruptions, we will make commercially reasonable efforts to restore service promptly. Credits for extended outages may be provided at our discretion.',
  },
  {
    title: '6. Acceptable Use Policy',
    content: 'Our services may not be used for: (a) transmitting illegal content; (b) hacking, phishing, or other cybersecurity attacks; (c) sending unsolicited bulk messages (spam); (d) hosting illegal content or services; (e) any activity that causes harm to minors; (f) any activity that violates Myanmar laws or international regulations.',
  },
  {
    title: '7. Privacy and Data Protection',
    content: 'We collect and process personal information in accordance with our Privacy Policy. We implement reasonable security measures to protect your data. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security of your data.',
  },
  {
    title: '8. Limitation of Liability',
    content: 'Sagu Net shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our services. Our total liability for any claims under these terms shall not exceed the total fees paid by you during the 12 months preceding the claim.',
  },
  {
    title: '9. Termination',
    content: 'Either party may terminate the service agreement with 30 days written notice. Sagu Net reserves the right to terminate or suspend services immediately for violations of these terms. Upon termination, you must return or destroy any equipment provided by Sagu Net.',
  },
  {
    title: '10. Changes to Terms',
    content: 'We reserve the right to update or modify these terms at any time. We will notify users of material changes via email or through our website. Continued use of our services after changes constitutes acceptance of the modified terms.',
  },
]

export default function TermsPage() {
  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-dark-950 to-accent-500/10" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            Terms of <span className="gradient-text">Service</span>
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1 }}
            className="text-white/50"
          >
            Last updated: January 1, 2026
          </motion.p>
        </div>
      </section>

      {/* Content */}
      <section className="relative pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="glass rounded-2xl p-8 md:p-12"
          >
            <p className="text-white/50 text-sm leading-relaxed mb-8">
              Please read these Terms of Service carefully before using Sagu Net services.
            </p>
            <div className="space-y-8">
              {sections.map((section) => (
                <div key={section.title}>
                  <h2 className="text-xl font-semibold text-white mb-3">{section.title}</h2>
                  <p className="text-white/50 text-sm leading-relaxed">{section.content}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
