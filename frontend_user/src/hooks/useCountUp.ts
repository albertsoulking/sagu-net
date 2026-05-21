import { useState, useEffect, useRef } from 'react'

export function useCountUp(end: number, duration = 2500, startOnView = true, inView = true) {
  const [count, setCount] = useState(0)
  const started = useRef(false)

  useEffect(() => {
    if (!startOnView || !inView || started.current) return
    started.current = true

    const startTime = performance.now()
    const startVal = 0

    function animate(currentTime: number) {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = startVal + (end - startVal) * eased

      setCount(current)

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setCount(end)
      }
    }

    requestAnimationFrame(animate)
  }, [end, duration, startOnView, inView])

  return count
}
