import {
  Wifi,
  Building2,
  Server,
  Shield,
  Cable,
  Network,
  Globe,
  Cpu,
  Radio,
  Cloud,
  Smartphone,
  Tv,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export interface Service {
  icon: LucideIcon
  title: string
  description: string
}

export interface PricingPlan {
  name: string
  speed: string
  price: number
  currency: string
  period: string
  features: string[]
  popular: boolean
  color: string
}

export interface Testimonial {
  name: string
  role: string
  content: string
  rating: number
  avatar: string
  initials: string
}

export interface Job {
  title: string
  department: string
  location: string
  type: string
  description: string
}

export interface NewsItem {
  title: string
  category: string
  date: string
  excerpt: string
  image: string
}

export const services: Service[] = [
  { icon: Wifi, title: 'Fiber Internet', description: 'Lightning-fast fiber optic broadband for seamless streaming, gaming, and work-from-home experience with speeds up to 1 Gbps.' },
  { icon: Building2, title: 'Business Network', description: 'Enterprise-grade networking solutions with dedicated bandwidth, static IPs, and 24/7 priority support for your business.' },
  { icon: Server, title: 'Enterprise Solutions', description: 'Comprehensive IT infrastructure including cloud services, dedicated servers, and managed network solutions for large organizations.' },
  { icon: Shield, title: 'CCTV & Security', description: 'Advanced surveillance systems with remote monitoring, AI-powered analytics, and secure cloud storage for complete peace of mind.' },
  { icon: Cable, title: 'Network Installation', description: 'Professional fiber optic installation, structured cabling, and network optimization services by certified technicians.' },
  { icon: Network, title: 'Smart Community', description: 'End-to-end smart village solutions including IoT integration, public WiFi, and community network management.' },
]

export const pricingPlans: PricingPlan[] = [
  { name: 'Basic', speed: '15 Mbps', price: 25000, currency: 'MMK', period: '/month', features: ['Up to 15 Mbps speed', 'Standard installation', 'Basic router included', 'Email support', 'Standard reliability'], popular: false, color: 'from-slate-400 to-slate-600' },
  { name: 'Standard', speed: '30 Mbps', price: 45000, currency: 'MMK', period: '/month', features: ['Up to 30 Mbps speed', 'Free installation', 'WiFi router included', 'Priority support', '99.5% uptime SLA', 'Free 1 month extra (annual)'], popular: true, color: 'from-primary-500 to-accent-500' },
  { name: 'Premium', speed: '60 Mbps', price: 75000, currency: 'MMK', period: '/month', features: ['Up to 60 Mbps speed', 'Free premium installation', 'Mesh WiFi system', '24/7 priority support', '99.9% uptime SLA', 'Static IP included', 'Free 2 months extra (annual)'], popular: false, color: 'from-purple-500 to-pink-500' },
  { name: 'Enterprise', speed: '100+ Mbps', price: 150000, currency: 'MMK', period: '/month', features: ['Up to 1 Gbps dedicated', 'Enterprise installation', 'Full network setup', 'Dedicated account manager', '99.99% uptime SLA', 'SLA guarantees', 'Custom solutions'], popular: false, color: 'from-amber-500 to-orange-500' },
]

export const testimonials: Testimonial[] = [
  { name: 'Kyaw Min Thu', role: 'Home User - Mandalay', content: 'Since switching to Sagu Net Fiber, our whole family enjoys buffer-free streaming and smooth video calls. The installation was quick and professional.', rating: 5, avatar: '', initials: 'KM' },
  { name: 'Daw Hlaing', role: 'Business Owner - Amarapura', content: 'Reliable business internet has transformed our operations. Sagu Net\'s enterprise support team responds within minutes whenever we need assistance.', rating: 5, avatar: '', initials: 'DH' },
  { name: 'U Soe Win', role: 'School Principal - Pyin Oo Lwin', content: 'We connected our entire school with Sagu Net. The educational impact has been remarkable - students now have access to online learning resources.', rating: 5, avatar: '', initials: 'SW' },
  { name: 'Ma Aye Aye', role: 'Shop Owner - Sagaing', content: 'Affordable and reliable. My online business depends on stable internet, and Sagu Net delivers consistently. Highly recommended for small businesses.', rating: 5, avatar: '', initials: 'AA' },
  { name: 'Ko Zaw Lin', role: 'Remote Worker - Mandalay', content: 'As a software developer working remotely, I need rock-solid internet. Sagu Net\'s fiber connection has been absolutely flawless for the past year.', rating: 5, avatar: '', initials: 'ZL' },
]

export const jobs: Job[] = [
  { title: 'Senior Network Engineer', department: 'Engineering', location: 'Mandalay', type: 'Full-time', description: 'Design, implement and maintain our growing fiber network infrastructure. Lead technical projects and mentor junior engineers.' },
  { title: 'Field Technician', department: 'Operations', location: 'Multiple Locations', type: 'Full-time', description: 'Perform fiber optic installations, troubleshooting, and maintenance. Provide excellent customer service during on-site visits.' },
  { title: 'Customer Support Specialist', department: 'Support', location: 'Mandalay', type: 'Full-time', description: 'Handle customer inquiries, troubleshoot connectivity issues, and ensure world-class customer experience.' },
  { title: 'Finance Officer', department: 'Finance', location: 'Mandalay', type: 'Full-time', description: 'Manage accounts, billing operations, payroll processing, and financial reporting for the organization.' },
  { title: 'Marketing Specialist', department: 'Marketing', location: 'Mandalay', type: 'Full-time', description: 'Develop and execute marketing campaigns, manage social media presence, and drive brand awareness across Myanmar.' },
]

export const news: NewsItem[] = [
  { title: 'Sagu Net Expands Fiber Network to 10 New Villages', category: 'Expansion', date: '2026-05-15', excerpt: 'We are thrilled to announce the expansion of our fiber optic network to 10 new villages in the Mandalay region, connecting over 2,000 households.', image: '' },
  { title: 'Introducing Our New 1 Gbps Fiber Plan', category: 'Product', date: '2026-04-20', excerpt: 'Experience blazing-fast internet with our new 1 Gbps fiber plan, perfect for heavy users, gamers, and businesses with high-bandwidth needs.', image: '' },
  { title: 'Community Internet Initiative Launch', category: 'Community', date: '2026-03-10', excerpt: 'Our new Community Internet Initiative aims to provide affordable connectivity to rural areas, bridging the digital divide in Myanmar.', image: '' },
  { title: 'Sagu Net Achieves 99.9% Uptime Milestone', category: 'Achievement', date: '2026-02-28', excerpt: 'We are proud to announce that we have maintained 99.9% network uptime for the past 12 months, exceeding our service level commitments.', image: '' },
  { title: 'Partnering with Leading Technology Providers', category: 'Partnership', date: '2026-01-15', excerpt: 'Strategic partnerships with global technology leaders to bring the latest networking innovations to our customers in Myanmar.', image: '' },
]

export const benefits = [
  'Competitive salary package', 'Health insurance', 'Professional development', 'Flexible working hours',
  'Transportation allowance', 'Team building events', 'Career growth opportunities', 'Modern equipment',
]

export const whyChooseUs = [
  { icon: Shield, title: '99.9% Uptime', description: 'Enterprise-grade network reliability with redundant fiber paths and automatic failover systems.' },
  { icon: Globe, title: 'Fast Support', description: '24/7 local customer support with average response time under 15 minutes for all issues.' },
  { icon: Wifi, title: 'Affordable Pricing', description: 'Competitive pricing tailored for the Myanmar market without compromising on quality.' },
  { icon: Server, title: 'Enterprise Security', description: 'Bank-grade encryption, DDoS protection, and advanced firewall systems to keep you safe.' },
  { icon: Cable, title: 'Fiber Infrastructure', description: 'State-of-the-art fiber optic network built with global standard equipment and technology.' },
  { icon: Cpu, title: '24/7 Monitoring', description: 'Real-time network monitoring and proactive maintenance to prevent issues before they occur.' },
]
