'use client'

import { useEffect, useRef } from 'react'
import { useInView, useMotionValue, animate, useReducedMotion } from 'framer-motion'

type Props = {
  target: number
  prefix?: string
  suffix?: string
  className?: string
}

export function Counter({ target, prefix = '', suffix = '', className }: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px 0px' })
  const motionVal = useMotionValue(0)
  const shouldReduce = useReducedMotion()

  useEffect(() => {
    if (!inView) return

    if (shouldReduce) {
      if (ref.current) ref.current.textContent = `${prefix}${target.toLocaleString('pt-BR')}${suffix}`
      return
    }

    const controls = animate(motionVal, target, {
      duration: 1.8,
      ease: [0, 0.5, 0.8, 1],
      onUpdate(value) {
        if (ref.current) {
          ref.current.textContent = `${prefix}${Math.round(value).toLocaleString('pt-BR')}${suffix}`
        }
      },
    })

    return () => controls.stop()
  }, [inView, target, prefix, suffix, motionVal, shouldReduce])

  return (
    <span ref={ref} className={className}>
      {prefix}0{suffix}
    </span>
  )
}
