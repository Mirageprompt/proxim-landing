'use client'

import { useRef } from 'react'
import { m, useInView, useReducedMotion } from 'framer-motion'
import { Zap, Bot, Plug, GitBranch, Inbox } from 'lucide-react'

const nodes = [
  { id: 'skills', label: 'Skills', icon: Zap, x: 0 },
  { id: 'agents', label: 'Agentes', icon: Bot, x: 1 },
  { id: 'mcp', label: 'MCP Hub', icon: Plug, x: 2 },
  { id: 'workflows', label: 'Workflows', icon: GitBranch, x: 3 },
  { id: 'inbox', label: 'Inbox', icon: Inbox, x: 4 },
]

export function SvgDiagram() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px 0px' })
  const shouldReduce = useReducedMotion()

  const nodeSpacing = 140
  const totalWidth = nodeSpacing * (nodes.length - 1)
  const svgWidth = totalWidth + 80
  const nodeY = 40
  const lineY = nodeY

  return (
    <div ref={ref} className="overflow-x-auto">
      <div style={{ minWidth: `${svgWidth}px`, padding: '20px 40px' }}>
        <svg width={svgWidth} height={100} viewBox={`0 0 ${svgWidth} 100`}>
          {nodes.slice(0, -1).map((node, i) => {
            const x1 = 40 + i * nodeSpacing + 20
            const x2 = 40 + (i + 1) * nodeSpacing - 20

            return (
              <m.line
                key={`line-${i}`}
                x1={x1}
                y1={lineY}
                x2={x2}
                y2={lineY}
                stroke="rgba(20,184,166,0.4)"
                strokeWidth={1}
                strokeDasharray="4 3"
                initial={shouldReduce ? false : { pathLength: 0, opacity: 0 }}
                animate={inView || shouldReduce ? { pathLength: 1, opacity: 1 } : {}}
                transition={{ delay: i * 0.3 + 0.2, duration: 0.4 }}
              />
            )
          })}
        </svg>

        <div className="flex items-center" style={{ marginTop: '-80px' }}>
          {nodes.map((node, i) => {
            const Icon = node.icon
            return (
              <m.div
                key={node.id}
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px',
                }}
                initial={shouldReduce ? false : { opacity: 0, scale: 0.8 }}
                animate={inView || shouldReduce ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: i * 0.3, type: 'spring', stiffness: 300, damping: 25 }}
              >
                <m.div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: 'rgba(20,184,166,0.12)',
                    border: '0.5px solid rgba(20,184,166,0.35)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                  }}
                  animate={shouldReduce ? {} : {
                    boxShadow: [
                      '0 0 0 0 rgba(20,184,166,0)',
                      '0 0 0 8px rgba(20,184,166,0.08)',
                      '0 0 0 0 rgba(20,184,166,0)',
                    ],
                  }}
                  transition={{ delay: i * 0.3 + 0.5, duration: 2, repeat: Infinity }}
                >
                  <Icon size={16} color="#14B8A6" />
                </m.div>
                <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.55)', fontWeight: 400 }}>
                  {node.label}
                </span>
              </m.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
