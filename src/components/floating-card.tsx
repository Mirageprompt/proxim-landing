'use client'

import { m, useReducedMotion } from 'framer-motion'
import type { MotionStyle } from 'framer-motion'

type Props = {
  children: React.ReactNode
  duration?: number
  delay?: number
  className?: string
  style?: MotionStyle
}

export function FloatingCard({ children, duration = 3, delay = 0, className, style }: Props) {
  const shouldReduce = useReducedMotion()

  return (
    <m.div
      className={className}
      {...(style ? { style } : {})}
      animate={shouldReduce ? {} : {
        y: [0, -8, 0],
      }}
      transition={shouldReduce ? {} : {
        duration,
        delay,
        repeat: Infinity,
        repeatType: 'loop',
        ease: 'easeInOut',
      }}
    >
      {children}
    </m.div>
  )
}
