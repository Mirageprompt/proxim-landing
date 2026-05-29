'use client'

import { useScroll, useSpring, m, useReducedMotion } from 'framer-motion'

export function ScrollProgress() {
  const shouldReduce = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  if (shouldReduce) return null

  return (
    <m.div
      className="absolute bottom-0 left-0 right-0 h-px origin-left"
      style={{ background: '#14B8A6', scaleX }}
    />
  )
}
