'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

type Props = {
  text: string
  className?: string
}

export function TextScramble({ text, className }: Props) {
  const [display, setDisplay] = useState(text)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px 0px' })
  const shouldReduce = useReducedMotion()
  const startedRef = useRef(false)

  useEffect(() => {
    if (!inView || shouldReduce || startedRef.current) return
    startedRef.current = true

    const totalFrames = 24
    const fps = 30
    const interval = 1000 / fps
    let frame = 0

    const timer = setInterval(() => {
      frame++
      const progress = frame / totalFrames
      const resolved = Math.floor(progress * text.length)

      setDisplay(
        text
          .split('')
          .map((char, i) => {
            if (char === ' ') return ' '
            if (i < resolved) return char
            return CHARS[Math.floor(Math.random() * CHARS.length)]
          })
          .join('')
      )

      if (frame >= totalFrames) {
        clearInterval(timer)
        setDisplay(text)
      }
    }, interval)

    return () => clearInterval(timer)
  }, [inView, text, shouldReduce])

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  )
}
