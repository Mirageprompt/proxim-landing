'use client'

import { useState } from 'react'
import { m, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Zap, Bot, Plug, GitBranch, Inbox, BarChart3 } from 'lucide-react'

const NODES = [
  { id: 'skills', label: 'Skills Engine', icon: Zap, angle: -90, desc: 'Biblioteca de habilidades prontas por departamento. Treine, ajuste e publique em minutos.' },
  { id: 'agents', label: 'Agent Builder', icon: Bot, angle: -30, desc: 'Crie agentes com nome, função e ferramentas próprias que trabalham enquanto você decide.' },
  { id: 'mcp', label: 'MCP Hub', icon: Plug, angle: 30, desc: 'Conecte Gmail, Notion, Sheets e dezenas de ferramentas externas sem nenhuma linha de código.' },
  { id: 'workflows', label: 'Workflows', icon: GitBranch, angle: 90, desc: 'Automações visuais disparadas por eventos, agenda ou decisões dos seus agentes.' },
  { id: 'inbox', label: 'Inbox Unificado', icon: Inbox, angle: 150, desc: 'Todas as tarefas, alertas e resultados dos agentes em um único painel centralizado.' },
  { id: 'roi', label: 'ROI Dashboard', icon: BarChart3, angle: 210, desc: 'Visualize em tempo real o valor gerado pela plataforma com métricas por departamento.' },
]

const R = 150
const C = 210

function toRad(deg: number) { return deg * (Math.PI / 180) }

export function NeuralNetwork() {
  const [activeId, setActiveId] = useState<string | null>(null)
  const shouldReduce = useReducedMotion()

  const activeNode = NODES.find(n => n.id === activeId) ?? null

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '28px' }}>
      <div style={{ position: 'relative', width: C * 2, height: C * 2 }}>

        {/* SVG background — rings + lines */}
        <svg width={C * 2} height={C * 2} style={{ position: 'absolute', inset: 0, overflow: 'visible' }}>
          {/* Slow rotating dashed outer ring */}
          <m.circle
            cx={C} cy={C} r={R + 28}
            fill="none" stroke="rgba(20,184,166,0.07)" strokeWidth={1} strokeDasharray="6 10"
            animate={shouldReduce ? {} : { rotate: 360 }}
            transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
            style={{ transformOrigin: `${C}px ${C}px` }}
          />
          {/* Counter-rotating inner ring */}
          <m.circle
            cx={C} cy={C} r={R - 28}
            fill="none" stroke="rgba(20,184,166,0.05)" strokeWidth={1} strokeDasharray="3 7"
            animate={shouldReduce ? {} : { rotate: -360 }}
            transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
            style={{ transformOrigin: `${C}px ${C}px` }}
          />
          {/* Main orbit ring */}
          <circle cx={C} cy={C} r={R} fill="none" stroke="rgba(20,184,166,0.06)" strokeWidth={0.5} />

          {/* Connections center → each node */}
          {NODES.map((node) => {
            const x = C + R * Math.cos(toRad(node.angle))
            const y = C + R * Math.sin(toRad(node.angle))
            const isActive = activeId === node.id
            return (
              <m.line
                key={`line-${node.id}`}
                x1={C} y1={C} x2={x} y2={y}
                stroke={isActive ? '#14B8A6' : 'rgba(20,184,166,0.18)'}
                strokeWidth={isActive ? 1.5 : 0.5}
                strokeDasharray={isActive ? undefined : '3 5'}
                animate={isActive && !shouldReduce ? { opacity: [0.5, 1, 0.5] } : {}}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            )
          })}

          {/* Polygon connecting all nodes */}
          <polygon
            points={NODES.map(n => {
              const x = C + R * Math.cos(toRad(n.angle))
              const y = C + R * Math.sin(toRad(n.angle))
              return `${x},${y}`
            }).join(' ')}
            fill="none"
            stroke="rgba(20,184,166,0.06)"
            strokeWidth={0.5}
          />

          {/* Expanding pulses from center */}
          {!shouldReduce && [0, 1.2, 2.4].map((delay, i) => (
            <m.circle
              key={`pulse-${i}`}
              cx={C} cy={C} r={24}
              fill="none" stroke="rgba(20,184,166,0.25)" strokeWidth={1}
              animate={{ r: [24, R + 20], opacity: [0.35, 0] }}
              transition={{ duration: 2.8, delay, repeat: Infinity, ease: 'easeOut' }}
            />
          ))}
        </svg>

        {/* Center hub */}
        <div style={{
          position: 'absolute',
          top: C - 28, left: C - 28,
          width: 56, height: 56,
          borderRadius: '50%',
          background: 'rgba(20,184,166,0.1)',
          border: '1px solid rgba(20,184,166,0.35)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 0 24px rgba(20,184,166,0.15)',
        }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="3" fill="#14B8A6" />
            <line x1="12" y1="12" x2="12" y2="2" stroke="#14B8A6" strokeWidth="1.5" />
            <line x1="12" y1="12" x2="12" y2="22" stroke="#14B8A6" strokeWidth="1.5" />
            <line x1="12" y1="12" x2="2" y2="12" stroke="#14B8A6" strokeWidth="1.5" />
            <line x1="12" y1="12" x2="22" y2="12" stroke="#14B8A6" strokeWidth="1.5" />
          </svg>
        </div>

        {/* Nodes */}
        {NODES.map((node) => {
          const x = C + R * Math.cos(toRad(node.angle))
          const y = C + R * Math.sin(toRad(node.angle))
          const Icon = node.icon
          const isActive = activeId === node.id

          // Label offset based on angle position
          const labelOffsetY = y < C ? -52 : 32
          const labelOffsetX = x < C - 30 ? -40 : x > C + 30 ? -40 : -50

          return (
            <div key={node.id}>
              {/* Node button */}
              <m.button
                style={{
                  position: 'absolute',
                  top: y - 24, left: x - 24,
                  width: 48, height: 48,
                  borderRadius: '50%',
                  background: isActive ? 'rgba(20,184,166,0.22)' : 'rgba(20,184,166,0.07)',
                  border: `1px solid ${isActive ? 'rgba(20,184,166,0.7)' : 'rgba(20,184,166,0.22)'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: isActive ? '0 0 20px rgba(20,184,166,0.3)' : 'none',
                  transition: 'background 0.2s, border-color 0.2s, box-shadow 0.2s',
                }}
                whileHover={shouldReduce ? {} : { scale: 1.18 }}
                whileTap={{ scale: 0.92 }}
                onHoverStart={() => setActiveId(node.id)}
                onHoverEnd={() => setActiveId(null)}
                onClick={() => setActiveId(isActive ? null : node.id)}
                aria-label={node.label}
              >
                <Icon size={17} color={isActive ? '#14B8A6' : 'rgba(255,255,255,0.55)'} />
              </m.button>

              {/* Label */}
              <div style={{
                position: 'absolute',
                top: y + labelOffsetY,
                left: x + labelOffsetX,
                width: 100,
                textAlign: 'center',
                fontSize: '10px',
                color: isActive ? '#14B8A6' : 'rgba(255,255,255,0.35)',
                fontWeight: isActive ? 500 : 400,
                letterSpacing: '0.04em',
                pointerEvents: 'none',
                transition: 'color 0.2s',
                lineHeight: 1.3,
              }}>
                {node.label}
              </div>
            </div>
          )
        })}
      </div>

      {/* Detail card */}
      <div style={{ minHeight: '88px', width: '100%', maxWidth: '400px' }}>
        <AnimatePresence mode="wait">
          {activeNode ? (
            <m.div
              key={activeNode.id}
              initial={{ opacity: 0, y: 8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 4, scale: 0.98 }}
              transition={{ duration: 0.18 }}
              style={{
                background: '#0D2020',
                border: '0.5px solid rgba(20,184,166,0.3)',
                borderRadius: '12px',
                padding: '18px 22px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <div style={{ width: '26px', height: '26px', background: 'rgba(20,184,166,0.12)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {(() => { const Icon = activeNode.icon; return <Icon size={13} color="#14B8A6" /> })()}
                </div>
                <span style={{ fontSize: '13px', fontWeight: 500, color: 'rgba(255,255,255,0.9)' }}>{activeNode.label}</span>
              </div>
              <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.65 }}>{activeNode.desc}</p>
            </m.div>
          ) : (
            <m.p
              key="hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ fontSize: '11px', color: 'rgba(255,255,255,0.18)', textAlign: 'center', paddingTop: '28px' }}
            >
              Passe o mouse sobre um nó para explorar
            </m.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
