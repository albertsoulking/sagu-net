import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { fadeIn } from '@/animations'

interface SectionTitleProps {
  subtitle?: string
  title: string
  description?: string
  className?: string
  light?: boolean
}

export function SectionTitle({
  subtitle,
  title,
  description,
  className,
  light,
}: SectionTitleProps) {
  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      className={cn('max-w-2xl mx-auto text-center mb-16', className)}
    >
      {subtitle && (
        <span
          className={cn(
            'inline-block text-sm font-semibold tracking-widest uppercase mb-3',
            light
              ? 'text-primary-600'
              : 'bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent',
          )}
        >
          {subtitle}
        </span>
      )}
      <h2
        className={cn(
          'text-3xl md:text-4xl lg:text-5xl font-bold leading-tight',
          light ? 'text-dark-950' : 'text-white',
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            'mt-4 text-lg leading-relaxed',
            light ? 'text-dark-700' : 'text-white/60',
          )}
        >
          {description}
        </p>
      )}
    </motion.div>
  )
}
