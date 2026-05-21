import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import CountUp from '@/components/ui/CountUp'
import { staggerItem } from '@/animations'
import { cn } from '@/lib/utils'

interface StatItemProps {
  value: number
  suffix: string
  label: string
  prefix?: string
  className?: string
}

export default function StatItem({ value, suffix, label, prefix = '', className }: StatItemProps) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })
  return (
    <motion.div
      ref={ref}
      variants={staggerItem}
      className={cn('text-center p-6', className)}
    >
      <div className="text-3xl md:text-4xl lg:text-5xl font-bold gradient-text mb-2">
        {prefix}
        <CountUp end={value} decimals={value % 1 ? 1 : 0} duration={2500} start={inView} />
        {suffix}
      </div>
      <p className="text-white/50 text-sm md:text-base">{label}</p>
    </motion.div>
  )
}
