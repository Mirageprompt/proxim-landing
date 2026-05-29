'use client'

import { useRef } from 'react'
import { m, useInView, useReducedMotion } from 'framer-motion'
import type { MotionStyle } from 'framer-motion'

type Props = {
  children: React.ReactNode
  className?: string
  style?: MotionStyle
  delay?: number
  once?: boolean
}

export function SectionReveal({ children, className, style, delay = 0, once = true }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once, margin: '-60px 0px' })
  const shouldReduce = useReducedMotion()

  return (
    <m.div
      ref={ref}
      className={className}
      {...(style ? { style } : {})}
      initial={shouldReduce ? false : { opacity: 0, y: 16 }}
      animate={inView || shouldReduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1.0], delay }}
    >
      {children}
    </m.div>
  )
}
