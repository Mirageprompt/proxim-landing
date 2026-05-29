'use client'

import { useState, useRef } from 'react'
import { m, useInView, useReducedMotion } from 'framer-motion'

type SliderProps = {
  label: string
  value: number
  min: number
  max: number
  prefix?: string
  suffix?: string
  onChange: (v: number) => void
  delay?: number
}

function Slider({ label, value, min, max, prefix = '', suffix = '', onChange, delay = 0 }: SliderProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })
  const shouldReduce = useReducedMotion()
  const pct = ((value - min) / (max - min)) * 100

  return (
    <m.div
      ref={ref}
      initial={shouldReduce ? false : { opacity: 0, y: 8 }}
      animate={inView || shouldReduce ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.18 }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
        <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', fontWeight: 400 }}>{label}</span>
        <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.9)', fontWeight: 500 }}>
          {prefix}{value.toLocaleString('pt-BR')}{suffix}
        </span>
      </div>
      <div style={{ position: 'relative', height: '4px', background: 'rgba(255,255,255,0.08)', borderRadius: '9999px' }}>
        <m.div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            background: '#14B8A6',
            borderRadius: '9999px',
            transformOrigin: 'left',
          }}
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: pct / 100 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1.0], delay: delay + 0.1 }}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={e => onChange(Number(e.target.value))}
          style={{
            position: 'absolute',
            top: '-8px',
            left: 0,
            right: 0,
            width: '100%',
            opacity: 0,
            cursor: 'pointer',
            height: '20px',
          }}
        />
      </div>
    </m.div>
  )
}

export function RoiCalculator() {
  const [employees, setEmployees] = useState(5)
  const [hoursPerWeek, setHoursPerWeek] = useState(8)
  const [hourlyRate, setHourlyRate] = useState(60)
  const shouldReduce = useReducedMotion()

  const weeksPerMonth = 4.3
  const savingsPerMonth = Math.round(employees * hoursPerWeek * weeksPerMonth * hourlyRate)

  return (
    <div
      style={{
        background: '#0D2020',
        border: '0.5px solid rgba(20,184,166,0.15)',
        borderRadius: '12px',
        padding: '32px',
        maxWidth: '540px',
        margin: '0 auto',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', marginBottom: '32px' }}>
        <Slider
          label="Número de funcionários"
          value={employees}
          min={1}
          max={50}
          onChange={setEmployees}
          delay={0}
        />
        <Slider
          label="Horas economizadas por semana"
          value={hoursPerWeek}
          min={1}
          max={20}
          suffix="h"
          onChange={setHoursPerWeek}
          delay={0.1}
        />
        <Slider
          label="Valor por hora"
          value={hourlyRate}
          min={20}
          max={200}
          prefix="R$ "
          onChange={setHourlyRate}
          delay={0.2}
        />
      </div>

      <div
        style={{
          borderTop: '0.5px solid rgba(20,184,166,0.12)',
          paddingTop: '24px',
          textAlign: 'center',
        }}
      >
        <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.45)', marginBottom: '8px' }}>
          Você economiza por mês
        </p>
        <m.p
          key={savingsPerMonth}
          style={{ fontSize: '36px', fontWeight: 500, color: '#14B8A6' }}
          initial={shouldReduce ? false : { opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        >
          R$ {savingsPerMonth.toLocaleString('pt-BR')}
        </m.p>
        <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)', marginTop: '4px' }}>
          calculado sobre valor/hora informado
        </p>
      </div>
    </div>
  )
}
