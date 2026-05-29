'use client'

import { useState } from 'react'
import Link from 'next/link'
import { m, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Check, Minus } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { AnimatedText } from '@/components/animated-text'
import { PricingToggle } from '@/components/pricing-toggle'
import { GlowingBorderCard } from '@/components/glowing-border-card'
import { RoiCalculator } from '@/components/roi-calculator'
import { SectionReveal } from '@/components/section-reveal'

type Plan = {
  name: string
  price: { monthly: number; annual: number }
  desc: string
  featured: boolean
  cta: string
  features: string[]
}

const plans: Plan[] = [
  {
    name: 'Starter',
    price: { monthly: 197, annual: 157 },
    desc: 'Para quem está começando a operar com IA.',
    featured: false,
    cta: 'Começar grátis',
    features: [
      '3 seats',
      '2 departamentos',
      'Skills built-in',
      '2 agentes',
      '2 conexões MCP',
      '3 workflows ativos',
      'Histórico 90 dias',
    ],
  },
  {
    name: 'Professional',
    price: { monthly: 397, annual: 317 },
    desc: 'Para times que precisam de toda a plataforma.',
    featured: true,
    cta: 'Escolher Professional',
    features: [
      '20 seats',
      '6 departamentos completos',
      'Skills + custom skills',
      '10 agentes',
      '10 conexões MCP',
      '20 workflows ativos',
      'Inbox unificado',
      'Histórico 1 ano',
      'Relatório de ROI mensal',
    ],
  },
  {
    name: 'Enterprise',
    price: { monthly: 697, annual: 557 },
    desc: 'Para empresas que precisam de escala e suporte.',
    featured: false,
    cta: 'Falar com vendas',
    features: [
      'Seats ilimitados',
      'Tudo do Professional',
      'Skills customizadas',
      'Agentes ilimitados',
      'MCP ilimitado',
      'Workflows ilimitados',
      'Multi-agente',
      'SLA garantido',
      'Onboarding dedicado',
    ],
  },
]

const allFeatures = [
  'Departamentos disponíveis',
  'Seats inclusos',
  'Skills Engine',
  'Custom Skills',
  'Agent Builder',
  'Agentes simultâneos',
  'MCP Hub',
  'Conexões MCP',
  'Workflows ativos',
  'Inbox Unificado',
  'ROI Dashboard',
  'Histórico',
  'Suporte',
  'SLA garantido',
  'Onboarding dedicado',
]

const featureMatrix: Record<string, [string, string, string]> = {
  'Departamentos disponíveis': ['2', '6', 'Todos'],
  'Seats inclusos': ['3', '20', 'Ilimitado'],
  'Skills Engine': ['check', 'check', 'check'],
  'Custom Skills': ['minus', 'check', 'check'],
  'Agent Builder': ['check', 'check', 'check'],
  'Agentes simultâneos': ['2', '10', 'Ilimitado'],
  'MCP Hub': ['check', 'check', 'check'],
  'Conexões MCP': ['2', '10', 'Ilimitado'],
  'Workflows ativos': ['3', '20', 'Ilimitado'],
  'Inbox Unificado': ['minus', 'check', 'check'],
  'ROI Dashboard': ['minus', 'check', 'check'],
  'Histórico': ['90 dias', '1 ano', 'Ilimitado'],
  'Suporte': ['E-mail', 'Prioritário', 'Dedicado'],
  'SLA garantido': ['minus', 'minus', 'check'],
  'Onboarding dedicado': ['minus', 'minus', 'check'],
}

function FeatureCell({ value }: { value: string }) {
  if (value === 'check') return <Check size={14} color="#14B8A6" />
  if (value === 'minus') return <Minus size={14} color="rgba(255,255,255,0.2)" />
  return <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}>{value}</span>
}

export default function PrecosPage() {
  const [annual, setAnnual] = useState(false)
  const shouldReduce = useReducedMotion()

  return (
    <>
      <Navbar />

      <main style={{ background: '#0A1A1A', paddingTop: '60px' }}>
        {/* Hero */}
        <section style={{ padding: '80px 0 64px', textAlign: 'center', minHeight: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="mx-auto max-w-3xl px-6">
            <m.p
              style={{ fontSize: '10px', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#14B8A6', marginBottom: '24px' }}
              initial={shouldReduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.18 }}
            >
              Planos
            </m.p>
            <AnimatedText
              text="Escolha seu plano."
              tag="h1"
              style={{ fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 500, color: 'rgba(255,255,255,0.95)', lineHeight: 1.15, marginBottom: '20px', display: 'flex', flexWrap: 'wrap', gap: '0.25em', justifyContent: 'center' }}
            />
            <SectionReveal delay={0.3} style={{ marginBottom: '32px' }}>
              <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.7 }}>
                Comece com o plano certo e escale conforme sua empresa cresce.
              </p>
            </SectionReveal>
            <SectionReveal delay={0.4}>
              <PricingToggle annual={annual} onChange={setAnnual} />
            </SectionReveal>
          </div>
        </section>

        {/* Cards */}
        <section style={{ padding: '0 0 96px' }}>
          <div className="mx-auto max-w-6xl px-6">
            <m.div
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', alignItems: 'start' }}
              initial={shouldReduce ? false : 'hidden'}
              whileInView="visible"
              viewport={{ once: true }}
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
            >
              {plans.map(plan => (
                <m.div
                  key={plan.name}
                  variants={{ hidden: { opacity: 0, scale: 0.96 }, visible: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 250, damping: 28 } } }}
                  style={{ transform: plan.featured ? 'scale(1.02)' : undefined }}
                >
                  <GlowingBorderCard
                    featured={plan.featured}
                    style={{
                      background: plan.featured ? undefined : '#0D2020',
                      border: plan.featured ? undefined : '0.5px solid rgba(20,184,166,0.12)',
                      borderRadius: '12px',
                      padding: '28px',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <div style={{ padding: plan.featured ? '28px' : '0', flex: 1, display: 'flex', flexDirection: 'column' }}>
                      {plan.featured && (
                        <div style={{ marginBottom: '8px' }}>
                          <span style={{ fontSize: '10px', fontWeight: 500, padding: '3px 8px', borderRadius: '9999px', background: 'rgba(20,184,166,0.15)', color: '#14B8A6', border: '0.5px solid rgba(20,184,166,0.3)' }}>
                            Recomendado
                          </span>
                        </div>
                      )}
                      <p style={{ fontSize: '16px', fontWeight: 500, color: 'rgba(255,255,255,0.9)', marginBottom: '6px' }}>{plan.name}</p>
                      <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginBottom: '20px', lineHeight: 1.5 }}>{plan.desc}</p>

                      <AnimatePresence mode="wait">
                        <m.div
                          key={annual ? 'annual' : 'monthly'}
                          initial={shouldReduce ? false : { opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.15 }}
                          style={{ marginBottom: '24px' }}
                        >
                          <span style={{ fontSize: '32px', fontWeight: 500, color: 'rgba(255,255,255,0.95)' }}>
                            R$ {(annual ? plan.price.annual : plan.price.monthly).toLocaleString('pt-BR')}
                          </span>
                          <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)', marginLeft: '4px' }}>/mês</span>
                        </m.div>
                      </AnimatePresence>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px', flex: 1 }}>
                        {plan.features.map(f => (
                          <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Check size={13} color="#14B8A6" style={{ flexShrink: 0 }} />
                            <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.4 }}>{f}</span>
                          </div>
                        ))}
                      </div>

                      <Link
                        href="/auth/register"
                        style={{
                          display: 'block',
                          textAlign: 'center',
                          padding: '10px 20px',
                          borderRadius: '8px',
                          fontSize: '13px',
                          fontWeight: 500,
                          textDecoration: 'none',
                          background: plan.featured ? '#14B8A6' : 'transparent',
                          color: plan.featured ? '#ffffff' : '#14B8A6',
                          border: plan.featured ? 'none' : '0.5px solid #14B8A6',
                          transition: 'background 0.15s, opacity 0.15s',
                        }}
                      >
                        {plan.cta}
                      </Link>
                    </div>
                  </GlowingBorderCard>
                </m.div>
              ))}
            </m.div>
          </div>
        </section>

        {/* ROI Calculator */}
        <section style={{ background: '#0D2020', padding: '96px 0' }}>
          <div className="mx-auto max-w-4xl px-6">
            <SectionReveal style={{ textAlign: 'center', marginBottom: '48px' }}>
              <p style={{ fontSize: '10px', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#14B8A6', marginBottom: '16px' }}>
                Calculadora
              </p>
              <h2 style={{ fontSize: '28px', fontWeight: 500, color: 'rgba(255,255,255,0.95)', lineHeight: 1.2, marginBottom: '12px' }}>
                Quanto o Proxim vale para você?
              </h2>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.6 }}>
                Ajuste os valores conforme a sua realidade.
              </p>
            </SectionReveal>

            <SectionReveal delay={0.1}>
              <RoiCalculator />
            </SectionReveal>
          </div>
        </section>

        {/* Feature Table */}
        <section style={{ padding: '96px 0' }}>
          <div className="mx-auto max-w-6xl px-6">
            <SectionReveal style={{ textAlign: 'center', marginBottom: '48px' }}>
              <h2 style={{ fontSize: '22px', fontWeight: 500, color: 'rgba(255,255,255,0.95)', marginBottom: '8px' }}>
                Comparativo completo
              </h2>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)' }}>
                Todos os recursos, plano por plano.
              </p>
            </SectionReveal>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '560px' }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: 'left', padding: '12px 16px', fontSize: '12px', color: 'rgba(255,255,255,0.3)', fontWeight: 400, borderBottom: '0.5px solid rgba(20,184,166,0.1)' }}>
                      Recurso
                    </th>
                    {plans.map(p => (
                      <th key={p.name} style={{ padding: '12px 16px', fontSize: '12px', color: p.featured ? '#14B8A6' : 'rgba(255,255,255,0.5)', fontWeight: 500, textAlign: 'center', borderBottom: '0.5px solid rgba(20,184,166,0.1)' }}>
                        {p.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {allFeatures.map((feat, i) => (
                    <m.tr
                      key={feat}
                      initial={shouldReduce ? false : { opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.03 }}
                      style={{ borderBottom: '0.5px solid rgba(20,184,166,0.06)' }}
                    >
                      <td style={{ padding: '12px 16px', fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>{feat}</td>
                      {featureMatrix[feat]?.map((val, j) => (
                        <td key={j} style={{ padding: '12px 16px', textAlign: 'center' }}>
                          <FeatureCell value={val} />
                        </td>
                      ))}
                    </m.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
