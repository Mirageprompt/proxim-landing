'use client'

import { useEffect, useState } from 'react'
import { m, AnimatePresence, useReducedMotion } from 'framer-motion'

const BOOT_LINES = [
  { text: '> Iniciando Proxim OS...', suffix: null, delay: 0 },
  { text: '> Carregando departamentos...', suffix: ' [OK]', delay: 650 },
  { text: '> Conectando agentes...', suffix: ' [OK]', delay: 1200 },
  { text: '> Compilando workflows...', suffix: ' [OK]', delay: 1700 },
  { text: '> Sistema operacional pronto.', suffix: null, delay: 2150 },
]

export function IntroAnimation() {
  const [visible, setVisible] = useState(false)
  const [done, setDone] = useState(false)
  const [glitch, setGlitch] = useState(false)
  const [shownLines, setShownLines] = useState<number[]>([])
  const shouldReduce = useReducedMotion()

  useEffect(() => {
    if (shouldReduce) return
    const seen = sessionStorage.getItem('proxim-intro-seen')
    if (seen) return
    sessionStorage.setItem('proxim-intro-seen', '1')
    setVisible(true)

    BOOT_LINES.forEach((line, i) => {
      setTimeout(() => setShownLines(prev => [...prev, i]), line.delay)
    })

    setTimeout(() => setGlitch(true), 2750)
    setTimeout(() => setDone(true), 3150)
  }, [shouldReduce])

  if (!visible) return null

  return (
    <AnimatePresence>
      {!done && (
        <m.div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: '#030F0F',
            fontFamily: "'JetBrains Mono', 'Courier New', monospace",
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '0 60px',
            overflow: 'hidden',
          }}
          exit={{ opacity: 0, transition: { duration: 0.35, ease: 'easeIn' } }}
        >
          {/* Scanlines */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.1) 3px, rgba(0,0,0,0.1) 4px)',
          }} />

          {/* Vignette */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.7) 100%)',
          }} />

          {/* Glitch effect */}
          {glitch && (
            <>
              <m.div
                style={{ position: 'absolute', inset: 0, background: '#14B8A6', mixBlendMode: 'screen' }}
                animate={{ opacity: [0, 0.4, 0, 0.6, 0, 0.2, 0], x: [0, -6, 8, -3, 2, 0] }}
                transition={{ duration: 0.35, times: [0, 0.1, 0.2, 0.4, 0.6, 0.8, 1] }}
              />
              <m.div
                style={{ position: 'absolute', inset: 0, background: '#0A1A1A' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0, 0.9, 0.2, 1] }}
                transition={{ duration: 0.35, delay: 0.05, times: [0, 0.2, 0.4, 0.7, 1] }}
              />
            </>
          )}

          {/* Content */}
          <div style={{ position: 'relative', zIndex: 1, maxWidth: '520px' }}>
            <m.div
              style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '48px' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="3" fill="#14B8A6" />
                <line x1="12" y1="12" x2="12" y2="2" stroke="#14B8A6" strokeWidth="1.5" />
                <line x1="12" y1="12" x2="12" y2="22" stroke="#14B8A6" strokeWidth="1.5" />
                <line x1="12" y1="12" x2="2" y2="12" stroke="#14B8A6" strokeWidth="1.5" />
                <line x1="12" y1="12" x2="22" y2="12" stroke="#14B8A6" strokeWidth="1.5" />
              </svg>
              <span style={{ color: 'rgba(20,184,166,0.6)', fontSize: '11px', letterSpacing: '0.15em' }}>
                PROXIM OS — v1.0.0
              </span>
            </m.div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {BOOT_LINES.map((line, i) => {
                const shown = shownLines.includes(i)
                const isLast = i === shownLines[shownLines.length - 1]
                return (
                  <AnimatePresence key={i}>
                    {shown && (
                      <m.div
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.18 }}
                        style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
                      >
                        <span style={{
                          color: line.suffix ? 'rgba(255,255,255,0.5)' : 'rgba(20,184,166,0.9)',
                          fontSize: '13px',
                          letterSpacing: '0.04em',
                        }}>
                          {line.text}
                        </span>
                        {line.suffix && (
                          <m.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.35 }}
                            style={{ color: '#14B8A6', fontSize: '13px', fontWeight: 600 }}
                          >
                            {line.suffix}
                          </m.span>
                        )}
                        {isLast && !glitch && (
                          <m.span
                            style={{
                              display: 'inline-block',
                              width: '7px',
                              height: '13px',
                              background: '#14B8A6',
                              marginLeft: '3px',
                            }}
                            animate={{ opacity: [1, 0] }}
                            transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
                          />
                        )}
                      </m.div>
                    )}
                  </AnimatePresence>
                )
              })}
            </div>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  )
}
