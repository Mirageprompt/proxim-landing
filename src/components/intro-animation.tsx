'use client'

import { useEffect, useState } from 'react'
import { m, AnimatePresence, useReducedMotion } from 'framer-motion'

export function IntroAnimation() {
  const [visible, setVisible] = useState(false)
  const [done, setDone] = useState(false)
  const shouldReduce = useReducedMotion()

  useEffect(() => {
    if (shouldReduce) return
    const seen = sessionStorage.getItem('proxim-intro-seen')
    if (!seen) {
      setVisible(true)
      sessionStorage.setItem('proxim-intro-seen', '1')
      const timer = setTimeout(() => setDone(true), 2400)
      return () => clearTimeout(timer)
    }
    return undefined
  }, [shouldReduce])

  if (!visible) return null

  const lineEase: [number, number, number, number] = [0.25, 0.1, 0.25, 1.0]

  return (
    <AnimatePresence mode="wait">
      {!done && (
        <m.div
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
          style={{ background: '#0A1A1A' }}
          exit={{ opacity: 0, transition: { duration: 0.4, ease: 'easeOut' } }}
        >
          <m.div
            className="absolute top-1/2 left-0 right-0"
            style={{ height: '1px', background: '#14B8A6', top: '50%' }}
            initial={{ scaleX: 0, transformOrigin: 'left' }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.7, ease: lineEase }}
          />
          <m.div
            className="absolute top-0 bottom-0 left-1/2"
            style={{ width: '1px', background: '#14B8A6', left: '50%' }}
            initial={{ scaleY: 0, transformOrigin: 'top' }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.7, ease: lineEase }}
          />

          <m.div
            className="relative z-10 flex flex-col items-center gap-3"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, duration: 0.25 }}
          >
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <circle cx="20" cy="20" r="5" fill="#14B8A6" />
              <line x1="20" y1="20" x2="20" y2="2" stroke="#14B8A6" strokeWidth="1.5" />
              <line x1="20" y1="20" x2="20" y2="38" stroke="#14B8A6" strokeWidth="1.5" />
              <line x1="20" y1="20" x2="2" y2="20" stroke="#14B8A6" strokeWidth="1.5" />
              <line x1="20" y1="20" x2="38" y2="20" stroke="#14B8A6" strokeWidth="1.5" />
            </svg>
            <m.span
              style={{ color: '#14B8A6', fontSize: '18px', fontWeight: 500, letterSpacing: '0.05em' }}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.2 }}
            >
              Proxim
            </m.span>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  )
}
