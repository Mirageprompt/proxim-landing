'use client'

import { m, useReducedMotion } from 'framer-motion'

type Props = {
  text: string
  className?: string
  style?: React.CSSProperties
  delay?: number
  tag?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
}

export function AnimatedText({ text, className, style, delay = 0, tag: Tag = 'h1' }: Props) {
  const shouldReduce = useReducedMotion()
  const words = text.split(' ')

  if (shouldReduce) {
    return <Tag className={className} style={style}>{text}</Tag>
  }

  return (
    <Tag className={className} style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3em', ...style }}>
      {words.map((word, i) => (
        <m.span
          key={i}
          style={{ display: 'inline-block' }}
          initial={{ opacity: 0, y: 32, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{
            delay: delay + i * 0.065,
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {word}
        </m.span>
      ))}
    </Tag>
  )
}
