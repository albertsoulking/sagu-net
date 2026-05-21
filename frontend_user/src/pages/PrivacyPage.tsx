import { motion } from 'framer-motion'
import { fadeInUp } from '@/animations'

const sections = [
  {
    title: '1. Information We Collect',
    content: 'We collect information you provide directly, such as your name, email address, phone number, billing address, and payment information when you sign up for our services. We also automatically collect certain technical information including your IP address, device type, browser type, and usage data to improve our services and network performance.',
  },
  {
    title: '2. How We Use Your Information',
    content: 'We use the collected information to: (a) provide, maintain, and improve our internet services; (b) process transactions and send billing notifications; (c) respond to your inquiries and provide customer support; (d) monitor network performance and troubleshoot issues; (e) comply with legal obligations and enforce our terms of service; (f) send service-related communications and updates.',
  },
  {
    title: '3. Information Sharing',
    content: 'We do not sell, trade, or rent your personal information to third parties. We may share information with trusted service providers who assist us in operating our business, provided they agree to keep your information confidential. We may also disclose information when required by law or to protect our rights and property.',
  },
  {
    title: '4. Data Security',
    content: 'We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These include encryption, firewalls, secure servers, and regular security audits. However, no internet transmission is completely secure, and we cannot guarantee absolute security.',
  },
  {
    title: '5. Data Retention',
    content: 'We retain your personal information for as long as your account is active and for a reasonable period thereafter for legal and business purposes. Usage logs and technical data may be retained for network management and security purposes in accordance with applicable laws.',
  },
  {
    title: '6. Your Rights',
    content: 'You have the right to: (a) access your personal information held by us; (b) request correction of inaccurate data; (c) request deletion of your data, subject to legal requirements; (d) object to processing of your data for marketing purposes; (e) request a copy of your data in a portable format. To exercise these rights, please contact us using the information provided below.',
  },
  {
    title: '7. Cookies and Tracking',
    content: 'We use cookies and similar tracking technologies to enhance your browsing experience, analyze website traffic, and understand where our visitors come from. You can control cookie preferences through your browser settings. Disabling cookies may affect certain features of our website.',
  },
  {
    title: '8. Third-Party Services',
    content: 'Our website and services may contain links to third-party websites or services. We are not responsible for the privacy practices of these third parties. We encourage you to review the privacy policies of any third-party services you use.',
  },
  {
    title: '9. Children\'s Privacy',
    content: 'Our services are not directed to children under the age of 13. We do not knowingly collect personal information from children. If you believe a child has provided us with personal information, please contact us, and we will take steps to delete such information.',
  },
  {
    title: '10. Changes to This Policy',
    content: 'We may update this Privacy Policy from time to time. We will notify you of material changes by posting the updated policy on our website and, where appropriate, through email notification. Your continued use of our services after changes constitutes acceptance of the updated policy.',
  },
  {
    title: '11. Contact Us',
    content: 'If you have any questions about this Privacy Policy or our data practices, please contact us at contact@sagunet.com or visit our office at No. 123, 78th Street, Mandalay, Myanmar.',
  },
]

export default function PrivacyPage() {
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
            Privacy <span className="gradient-text">Policy</span>
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
              At Sagu Net, we take your privacy seriously. This policy describes how we collect, use, and protect your personal information.
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
