'use client'

import { m, useReducedMotion } from 'framer-motion'
import { useEffect, useRef } from 'react'

type Props = {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  featured?: boolean
}

export function GlowingBorderCard({ children, className, style, featured = false }: Props) {
  const shouldReduce = useReducedMotion()
  const angleRef = useRef(0)
  const frameRef = useRef<number | null>(null)
  const borderRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!featured || shouldReduce || !borderRef.current) return

    const el = borderRef.current
    const speed = 1

    const tick = () => {
      angleRef.current = (angleRef.current + speed) % 360
      el.style.setProperty('--angle', `${angleRef.current}deg`)
      frameRef.current = requestAnimationFrame(tick)
    }

    frameRef.current = requestAnimationFrame(tick)
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
    }
  }, [featured, shouldReduce])

  if (!featured) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    )
  }

  return (
    <div
      ref={borderRef}
      className={className}
      style={{
        ...style,
        background: 'conic-gradient(from var(--angle, 0deg), #14B8A6 0%, #0A1A1A 30%, #0A1A1A 70%, #14B8A6 100%)',
        padding: '1px',
        borderRadius: '12px',
        ['--angle' as string]: '0deg',
      }}
    >
      <div
        style={{
          background: '#0A1A1A',
          borderRadius: '11px',
          height: '100%',
          width: '100%',
        }}
      >
        {children}
      </div>
    </div>
  )
}
