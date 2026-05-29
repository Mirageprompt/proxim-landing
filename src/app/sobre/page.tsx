'use client'

import { useRef } from 'react'
import { m, useScroll, useTransform, useInView, useReducedMotion } from 'framer-motion'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { AnimatedText } from '@/components/animated-text'
import { TextScramble } from '@/components/text-scramble'
import { MagneticButton } from '@/components/magnetic-button'
import { SectionReveal } from '@/components/section-reveal'
import Link from 'next/link'

const milestones = [
  { date: 'Jan 2025', title: 'Concepção da plataforma', desc: 'A ideia de um sistema operacional de IA para empresas enxutas toma forma.' },
  { date: 'Mar 2025', title: 'Definição dos 6 departamentos', desc: 'Financeiro, Juridico, RH, Marketing, Atendimento e Comercial são mapeados.' },
  { date: 'Jun 2025', title: 'Skills Engine implementado', desc: 'A biblioteca de habilidades de IA por departamento entra em produção.' },
  { date: 'Set 2025', title: 'Agent Builder lançado', desc: 'Qualquer pessoa pode criar agentes com nome, função e ferramentas próprias.' },
  { date: 'Dez 2025', title: 'MCP Hub disponível', desc: 'Integração com Gmail, Notion, Sheets e dezenas de ferramentas externas.' },
  { date: '2026', title: 'Plataforma completa', desc: 'O Proxim está disponível para qualquer empresa que queira operar com IA.' },
]

type Milestone = { date: string; title: string; desc: string }

type MilestoneItemProps = {
  milestone: Milestone
  index: number
}

function MilestoneItem({ milestone, index }: MilestoneItemProps) {
  const nodeRef = useRef<HTMLDivElement>(null)
  const shouldReduce = useReducedMotion()
  const inView = useInView(nodeRef, { once: true, margin: '-40px 0px' })
  const isLeft = index % 2 === 0

  return (
    <div
      ref={nodeRef}
      style={{
        position: 'relative',
        display: 'grid',
        gridTemplateColumns: '1fr 40px 1fr',
        alignItems: 'center',
        gap: '16px',
        marginLeft: '-50%',
      }}
    >
      <div style={{ textAlign: 'right', paddingRight: '16px' }}>
        {isLeft ? (
          <m.div
            initial={shouldReduce ? false : { opacity: 0, x: -16 }}
            animate={inView || shouldReduce ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1.0] }}
            style={{ textAlign: 'right' }}
          >
            <p style={{ fontSize: '10px', color: '#14B8A6', fontWeight: 500, marginBottom: '4px', letterSpacing: '0.08em' }}>{milestone.date}</p>
            <p style={{ fontSize: '14px', fontWeight: 500, color: 'rgba(255,255,255,0.9)', marginBottom: '4px' }}>{milestone.title}</p>
            <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.5 }}>{milestone.desc}</p>
          </m.div>
        ) : (
          <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.15)' }}></span>
        )}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <m.div
          style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#14B8A6', border: '2px solid #0A1A1A', flexShrink: 0 }}
          initial={shouldReduce ? false : { opacity: 0, scale: 0 }}
          animate={inView || shouldReduce ? { opacity: 1, scale: 1 } : {}}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        />
      </div>

      <div style={{ paddingLeft: '16px' }}>
        {!isLeft ? (
          <m.div
            initial={shouldReduce ? false : { opacity: 0, x: 16 }}
            animate={inView || shouldReduce ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1.0] }}
          >
            <p style={{ fontSize: '10px', color: '#14B8A6', fontWeight: 500, marginBottom: '4px', letterSpacing: '0.08em' }}>{milestone.date}</p>
            <p style={{ fontSize: '14px', fontWeight: 500, color: 'rgba(255,255,255,0.9)', marginBottom: '4px' }}>{milestone.title}</p>
            <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.5 }}>{milestone.desc}</p>
          </m.div>
        ) : (
          <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.15)' }}></span>
        )}
      </div>
    </div>
  )
}

function Timeline() {
  const ref = useRef<HTMLDivElement>(null)
  const shouldReduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.4'] })
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <div ref={ref} style={{ position: 'relative', paddingLeft: '50%' }}>
      <div style={{ position: 'absolute', left: 'calc(50% - 0.5px)', top: 0, bottom: 0, width: '1px', background: 'rgba(20,184,166,0.1)' }}>
        <m.div
          style={{ width: '100%', background: '#14B8A6', height: shouldReduce ? '100%' : lineHeight, opacity: 0.4 }}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '48px', paddingBottom: '32px' }}>
        {milestones.map((milestone, i) => (
          <MilestoneItem key={milestone.title} milestone={milestone} index={i} />
        ))}
      </div>
    </div>
  )
}

export default function SobrePage() {
  const shouldReduce = useReducedMotion()

  return (
    <>
      <Navbar />

      <main style={{ background: '#0A1A1A', paddingTop: '60px' }}>
        {/* Hero */}
        <section style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', padding: '80px 0 64px' }}>
          <div className="mx-auto max-w-3xl px-6" style={{ textAlign: 'center' }}>
            <m.p
              style={{ fontSize: '10px', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#14B8A6', marginBottom: '24px' }}
              initial={shouldReduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.18 }}
            >
              Nossa missão
            </m.p>
            <AnimatedText
              text="Dar a uma pessoa o poder de operar uma empresa inteira."
              tag="h1"
              style={{ fontSize: 'clamp(24px, 4vw, 40px)', fontWeight: 500, color: 'rgba(255,255,255,0.95)', lineHeight: 1.2, marginBottom: '24px', display: 'flex', flexWrap: 'wrap', gap: '0.25em', justifyContent: 'center' }}
            />
            <SectionReveal delay={0.4}>
              <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>
                Acreditamos que inteligência artificial não é só para grandes corporações. Qualquer pessoa com clareza e as ferramentas certas pode construir e operar uma empresa completa.
              </p>
            </SectionReveal>
          </div>
        </section>

        {/* Visão */}
        <section style={{ padding: '96px 0' }}>
          <div className="mx-auto max-w-4xl px-6">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'start' }}>
              <SectionReveal>
                <p style={{ fontSize: '10px', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#14B8A6', marginBottom: '20px' }}>
                  O mundo que enxergamos
                </p>
                <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.8 }}>
                  O trabalho está mudando. Times menores conseguem fazer mais. Uma pessoa com as ferramentas certas substitui departamentos inteiros — não por demissão, mas por escolha inteligente de como alocar energia humana.
                </p>
              </SectionReveal>

              <SectionReveal delay={0.15}>
                <p style={{ fontSize: '10px', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#14B8A6', marginBottom: '20px' }}>
                  O futuro que construímos
                </p>
                <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.8 }}>
                  O Proxim é o sistema operacional dessa nova forma de trabalhar. Cada agente, cada skill, cada workflow existe para que você dedique seu tempo ao que realmente importa: decisão, criatividade e relacionamentos.
                </p>
              </SectionReveal>
            </div>
          </div>
        </section>

        {/* Ideia central */}
        <section style={{ background: '#0D2020', padding: '120px 0', textAlign: 'center' }}>
          <div className="mx-auto max-w-3xl px-6">
            <h2 style={{ fontSize: 'clamp(20px, 4vw, 36px)', fontWeight: 500, color: 'rgba(255,255,255,0.9)', lineHeight: 1.3 }}>
              <TextScramble text="Uma pessoa com as ferramentas certas pode operar uma empresa inteira." />
            </h2>
          </div>
        </section>

        {/* Timeline */}
        <section style={{ padding: '96px 0' }}>
          <div className="mx-auto max-w-4xl px-6">
            <SectionReveal style={{ textAlign: 'center', marginBottom: '64px' }}>
              <p style={{ fontSize: '10px', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#14B8A6', marginBottom: '16px' }}>
                Roadmap
              </p>
              <h2 style={{ fontSize: '28px', fontWeight: 500, color: 'rgba(255,255,255,0.95)', lineHeight: 1.2 }}>
                De onde viemos. Para onde vamos.
              </h2>
            </SectionReveal>

            <Timeline />
          </div>
        </section>

        {/* CTA Final */}
        <section style={{ padding: '120px 0', textAlign: 'center' }}>
          <div className="mx-auto max-w-2xl px-6">
            <SectionReveal style={{ marginBottom: '16px' }}>
              <p style={{ fontSize: '10px', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#14B8A6' }}>
                Comece agora
              </p>
            </SectionReveal>

            <h2 style={{ fontSize: 'clamp(24px, 4vw, 40px)', fontWeight: 500, color: 'rgba(255,255,255,0.95)', lineHeight: 1.2, marginBottom: '20px' }}>
              <TextScramble text="Sua empresa começa aqui." />
            </h2>

            <SectionReveal delay={0.2} style={{ marginBottom: '40px' }}>
              <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.7 }}>
                Junte-se a quem já está operando com inteligência.
              </p>
            </SectionReveal>

            <SectionReveal delay={0.3}>
              <MagneticButton>
                <Link href="/auth/register" style={{ color: '#fff', textDecoration: 'none', display: 'block' }}>
                  Começar agora — é grátis
                </Link>
              </MagneticButton>
            </SectionReveal>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
