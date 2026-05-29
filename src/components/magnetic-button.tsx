'use client'

import { useRef, useState } from 'react'
import { m, useSpring, useReducedMotion } from 'framer-motion'

type Props = {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  href?: string
}

export function MagneticButton({ children, className, onClick }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const shouldReduce = useReducedMotion()
  const [isHovered, setIsHovered] = useState(false)

  const x = useSpring(0, { stiffness: 300, damping: 25 })
  const y = useSpring(0, { stiffness: 300, damping: 25 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduce || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = e.clientX - cx
    const dy = e.clientY - cy
    const dist = Math.sqrt(dx * dx + dy * dy)
    if (dist < 80) {
      x.set(dx * 0.3)
      y.set(dy * 0.3)
    }
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    setIsHovered(false)
  }

  return (
    <m.div
      ref={ref}
      style={{ x, y, display: 'inline-block' }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      <m.button
        className={className}
        style={{
          background: isHovered
            ? 'conic-gradient(from var(--angle), #14B8A6, #2DD4BF, #14B8A6)'
            : '#14B8A6',
          color: '#ffffff',
          fontWeight: 500,
          fontSize: '15px',
          padding: '12px 32px',
          borderRadius: '8px',
          border: 'none',
          cursor: 'pointer',
          position: 'relative',
          overflow: 'hidden',
        }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        animate={isHovered ? { '--angle': '360deg' } as Record<string, string> : {}}
      >
        {children}
      </m.button>
    </m.div>
  )
}
