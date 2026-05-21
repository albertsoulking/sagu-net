import { useCountUp } from '@/hooks/useCountUp'

interface CountUpProps {
  end: number
  decimals?: number
  duration?: number
  start?: boolean
  suffix?: string
  prefix?: string
}

export default function CountUp({ end, decimals = 0, duration = 2500, start = true, suffix = '', prefix = '' }: CountUpProps) {
  const count = useCountUp(end, duration, true, start)
  const display = count.toFixed(decimals)
  return <>{prefix}{display}{suffix}</>
}
