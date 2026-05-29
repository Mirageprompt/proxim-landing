'use client'

import { useRef } from 'react'
import { m, useSpring, useReducedMotion } from 'framer-motion'

type Props = {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

export function MagneticCard({ children, className, style }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const shouldReduce = useReducedMotion()

  const innerX = useSpring(0, { stiffness: 200, damping: 20 })
  const innerY = useSpring(0, { stiffness: 200, damping: 20 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduce || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    innerX.set((e.clientX - cx) * 0.06)
    innerY.set((e.clientY - cy) * 0.06)
  }

  const handleMouseLeave = () => {
    innerX.set(0)
    innerY.set(0)
  }

  return (
    <div
      ref={ref}
      className={className}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <m.div style={{ x: innerX, y: innerY }}>
        {children}
      </m.div>
    </div>
  )
}
