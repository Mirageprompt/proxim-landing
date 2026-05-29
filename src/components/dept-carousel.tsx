'use client'

import { useRef, useState } from 'react'
import { m, useReducedMotion, AnimatePresence } from 'framer-motion'
import { DollarSign, Scale, Users, Megaphone, Headphones, TrendingUp } from 'lucide-react'

const DEPTS = [
  {
    label: 'Financeiro',
    icon: DollarSign,
    tag: 'Finanças',
    desc: 'Fluxo de caixa, relatórios e análise financeira em tempo real. Nunca mais dados desatualizados.',
    tasks: ['Relatórios automáticos', 'Previsão de fluxo', 'Alertas de vencimento'],
    color: '#14B8A6',
  },
  {
    label: 'Jurídico',
    icon: Scale,
    tag: 'Legal',
    desc: 'Contratos, compliance e documentação legal automatizados. Reduza riscos sem aumentar o time.',
    tasks: ['Rascunho de contratos', 'Checklist de compliance', 'Revisão de cláusulas'],
    color: '#14B8A6',
  },
  {
    label: 'Recursos Humanos',
    icon: Users,
    tag: 'Pessoas',
    desc: 'Triagem de candidatos, onboarding e políticas de RH gerenciadas por agentes especializados.',
    tasks: ['Triagem de currículos', 'Onboarding guiado', 'Banco de políticas'],
    color: '#14B8A6',
  },
  {
    label: 'Marketing',
    icon: Megaphone,
    tag: 'Growth',
    desc: 'Criação de conteúdo, campanhas e análise de desempenho com IA focada em conversão.',
    tasks: ['Conteúdo personalizado', 'Análise de campanhas', 'SEO automatizado'],
    color: '#14B8A6',
  },
  {
    label: 'Atendimento',
    icon: Headphones,
    tag: 'Suporte',
    desc: 'Respostas padronizadas, escalação inteligente e histórico unificado em todos os canais.',
    tasks: ['Respostas em < 2 min', 'Escalação automática', 'Histórico centralizado'],
    color: '#14B8A6',
  },
  {
    label: 'Comercial',
    icon: TrendingUp,
    tag: 'Vendas',
    desc: 'Propostas, follow-up e pipeline de vendas automatizado para fechar mais em menos tempo.',
    tasks: ['Propostas em instantes', 'Follow-up automático', 'Pipeline visual'],
    color: '#14B8A6',
  },
]

const CARD_WIDTH = 300
const CARD_GAP = 16

export function DeptCarousel() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [activeIdx, setActiveIdx] = useState(0)
  const shouldReduce = useReducedMotion()

  const totalWidth = DEPTS.length * (CARD_WIDTH + CARD_GAP) - CARD_GAP
  const visibleWidth = typeof window !== 'undefined' ? Math.min(window.innerWidth - 48, 900) : 900
  const maxDrag = -(totalWidth - visibleWidth)

  return (
    <div style={{ position: 'relative' }}>
      {/* Fade masks */}
      <div style={{
        position: 'absolute', left: 0, top: 0, bottom: 0, width: '48px', zIndex: 2,
        background: 'linear-gradient(to right, #0A1A1A 20%, transparent)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', right: 0, top: 0, bottom: 0, width: '48px', zIndex: 2,
        background: 'linear-gradient(to left, #0A1A1A 20%, transparent)',
        pointerEvents: 'none',
      }} />

      {/* Drag track */}
      <div style={{ overflow: 'hidden', paddingBottom: '8px' }}>
        <m.div
          ref={trackRef}
          drag={shouldReduce ? false : 'x'}
          dragConstraints={{ left: maxDrag < 0 ? maxDrag : 0, right: 0 }}
          dragElastic={0.08}
          dragTransition={{ bounceStiffness: 300, bounceDamping: 30 }}
          style={{
            display: 'flex',
            gap: `${CARD_GAP}px`,
            paddingLeft: '24px',
            paddingRight: '24px',
            cursor: 'grab',
            userSelect: 'none',
            width: 'max-content',
          }}
          whileTap={{ cursor: 'grabbing' }}
        >
          {DEPTS.map((dept, i) => {
            const Icon = dept.icon
            const isActive = activeIdx === i

            return (
              <m.div
                key={dept.label}
                style={{
                  width: CARD_WIDTH,
                  flexShrink: 0,
                  background: isActive ? 'rgba(20,184,166,0.07)' : '#0D2020',
                  border: `0.5px solid ${isActive ? 'rgba(20,184,166,0.4)' : 'rgba(20,184,166,0.12)'}`,
                  borderRadius: '16px',
                  padding: '28px 24px',
                  transition: 'background 0.25s, border-color 0.25s',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                initial={shouldReduce ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px 0px' }}
                transition={{ delay: i * 0.07, duration: 0.22 }}
                onHoverStart={() => setActiveIdx(i)}
                onTap={() => setActiveIdx(i)}
              >
                {/* Subtle glow on active */}
                {isActive && !shouldReduce && (
                  <m.div
                    style={{
                      position: 'absolute', inset: 0, borderRadius: '16px',
                      background: 'radial-gradient(ellipse at 30% 30%, rgba(20,184,166,0.1) 0%, transparent 60%)',
                      pointerEvents: 'none',
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                )}

                {/* Tag */}
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                  background: 'rgba(20,184,166,0.08)',
                  border: '0.5px solid rgba(20,184,166,0.2)',
                  borderRadius: '9999px',
                  padding: '3px 10px',
                  marginBottom: '20px',
                }}>
                  <Icon size={10} color="#14B8A6" />
                  <span style={{ fontSize: '10px', color: '#14B8A6', letterSpacing: '0.06em' }}>{dept.tag}</span>
                </div>

                <p style={{ fontSize: '18px', fontWeight: 500, color: 'rgba(255,255,255,0.95)', marginBottom: '12px', lineHeight: 1.2 }}>
                  {dept.label}
                </p>

                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.65, marginBottom: '24px', minHeight: '60px' }}>
                  {dept.desc}
                </p>

                <AnimatePresence>
                  {isActive && (
                    <m.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.22 }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div style={{ borderTop: '0.5px solid rgba(20,184,166,0.12)', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {dept.tasks.map((task, ti) => (
                          <m.div
                            key={task}
                            initial={{ opacity: 0, x: -6 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: ti * 0.05, duration: 0.15 }}
                            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                          >
                            <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#14B8A6', flexShrink: 0 }} />
                            <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}>{task}</span>
                          </m.div>
                        ))}
                      </div>
                    </m.div>
                  )}
                </AnimatePresence>

                {!isActive && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {dept.tasks.map(task => (
                      <div key={task} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(20,184,166,0.3)', flexShrink: 0 }} />
                        <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)' }}>{task}</span>
                      </div>
                    ))}
                  </div>
                )}
              </m.div>
            )
          })}
        </m.div>
      </div>

      {/* Dot indicators */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginTop: '24px' }}>
        {DEPTS.map((_, i) => (
          <div
            key={i}
            style={{
              width: activeIdx === i ? '20px' : '6px',
              height: '6px',
              borderRadius: '9999px',
              background: activeIdx === i ? '#14B8A6' : 'rgba(20,184,166,0.2)',
              transition: 'width 0.25s, background 0.25s',
              cursor: 'pointer',
            }}
            onClick={() => setActiveIdx(i)}
          />
        ))}
      </div>

      <p style={{ textAlign: 'center', fontSize: '11px', color: 'rgba(255,255,255,0.2)', marginTop: '12px', letterSpacing: '0.04em' }}>
        Arraste para explorar
      </p>
    </div>
  )
}
