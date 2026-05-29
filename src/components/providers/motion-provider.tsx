'use client'

import { LazyMotion, domAnimation } from 'framer-motion'

type Props = {
  children: React.ReactNode
}

export function MotionProvider({ children }: Props) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  )
}
