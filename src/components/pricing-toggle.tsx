'use client'

import { m, AnimatePresence, useReducedMotion } from 'framer-motion'

type Props = {
  annual: boolean
  onChange: (annual: boolean) => void
}

export function PricingToggle({ annual, onChange }: Props) {
  const shouldReduce = useReducedMotion()

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', justifyContent: 'center' }}>
      <span
        style={{
          fontSize: '13px',
          color: !annual ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.45)',
          fontWeight: !annual ? 500 : 400,
          cursor: 'pointer',
          transition: 'color 0.15s',
        }}
        onClick={() => onChange(false)}
      >
        Mensal
      </span>

      <button
        onClick={() => onChange(!annual)}
        aria-checked={annual}
        role="switch"
        style={{
          width: '44px',
          height: '24px',
          borderRadius: '9999px',
          background: annual ? '#14B8A6' : 'rgba(255,255,255,0.1)',
          border: '0.5px solid rgba(20,184,166,0.3)',
          cursor: 'pointer',
          position: 'relative',
          transition: 'background 0.2s',
          padding: 0,
          minWidth: '44px',
          minHeight: '44px',
          display: 'flex',
          alignItems: 'center',
          paddingLeft: '2px',
          paddingRight: '2px',
        }}
      >
        <m.div
          layoutId="pricing-toggle"
          style={{
            width: '18px',
            height: '18px',
            borderRadius: '50%',
            background: '#ffffff',
            position: 'absolute',
            left: annual ? 'calc(100% - 20px)' : '2px',
          }}
          transition={shouldReduce ? {} : { type: 'spring', stiffness: 350, damping: 30 }}
        />
      </button>

      <span
        style={{
          fontSize: '13px',
          color: annual ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.45)',
          fontWeight: annual ? 500 : 400,
          cursor: 'pointer',
          transition: 'color 0.15s',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        }}
        onClick={() => onChange(true)}
      >
        Anual
        <AnimatePresence mode="popLayout">
          {annual && (
            <m.span
              key="badge"
              style={{
                background: 'rgba(20,184,166,0.15)',
                color: '#14B8A6',
                fontSize: '10px',
                fontWeight: 500,
                padding: '2px 6px',
                borderRadius: '9999px',
                border: '0.5px solid rgba(20,184,166,0.3)',
              }}
              initial={shouldReduce ? false : { opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            >
              -20%
            </m.span>
          )}
        </AnimatePresence>
      </span>
    </div>
  )
}
