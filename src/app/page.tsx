'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { m, useInView, useSpring, useReducedMotion } from 'framer-motion'
import {
  DollarSign, Scale, Users, Megaphone, Headphones,
  Zap, Bot, Plug, GitBranch, Inbox, BarChart3, CheckCircle2, X, ArrowDown,
  ChevronRight,
} from 'lucide-react'
import { IntroAnimation } from '@/components/intro-animation'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { AnimatedText } from '@/components/animated-text'
import { TextScramble } from '@/components/text-scramble'
import { MagneticButton } from '@/components/magnetic-button'
import { Counter } from '@/components/counter'
import { NeuralNetwork } from '@/components/neural-network'
import { DeptCarousel } from '@/components/dept-carousel'
import { FloatingCard } from '@/components/floating-card'
import { SectionReveal } from '@/components/section-reveal'

const sectionLabel = {
  fontSize: '10px',
  fontWeight: 500 as const,
  letterSpacing: '0.12em',
  textTransform: 'uppercase' as const,
  color: '#14B8A6',
  marginBottom: '16px',
}

const sectionTitle = {
  fontSize: '28px',
  fontWeight: 500 as const,
  color: 'rgba(255,255,255,0.95)',
  lineHeight: 1.2,
  marginBottom: '16px',
}

const sectionSubtitle = {
  fontSize: '15px',
  fontWeight: 400 as const,
  color: 'rgba(255,255,255,0.55)',
  lineHeight: 1.7,
  maxWidth: '480px',
}

const deptSidebar = [
  { label: 'Financeiro', icon: DollarSign },
  { label: 'Jurídico', icon: Scale },
  { label: 'RH', icon: Users },
  { label: 'Marketing', icon: Megaphone },
  { label: 'Atendimento', icon: Headphones },
]

const features = [
  { label: 'Skills Engine', icon: Zap, desc: 'Biblioteca de habilidades prontas para cada departamento.' },
  { label: 'Agent Builder', icon: Bot, desc: 'Crie agentes com nome, função e ferramentas próprias.' },
  { label: 'MCP Hub', icon: Plug, desc: 'Conecte Gmail, Notion, Sheets e mais em minutos.' },
  { label: 'Workflows', icon: GitBranch, desc: 'Automações visuais disparadas por eventos ou agenda.' },
  { label: 'Inbox Unificado', icon: Inbox, desc: 'Todas as tarefas dos agentes em um único lugar.' },
  { label: 'ROI Dashboard', icon: BarChart3, desc: 'Visualize o valor gerado pela plataforma em tempo real.' },
]

const painPoints = [
  'Planilhas manuais que ninguém entende',
  'Contratos redigidos do zero toda vez',
  'Currículos triados manualmente por horas',
  'Atendimento lento e inconsistente',
  'Propostas comerciais que demoram dias',
  'Dados financeiros sempre desatualizados',
]

const solutions = [
  'Relatórios gerados e explicados pela IA',
  'Contratos rascunhados em segundos',
  'Triagem automatizada com critérios seus',
  'Respostas consistentes em menos de 2 min',
  'Propostas personalizadas em instantes',
  'Dashboard financeiro sempre atualizado',
]

const agents = [
  { name: 'Sofia', role: 'Vendas', tools: ['CRM', 'E-mail', 'Propostas'], duration: 3, delay: 0 },
  { name: 'Carlos', role: 'Juridico', tools: ['Docs', 'Contratos', 'Compliance'], duration: 3.4, delay: 0.4 },
  { name: 'Ana', role: 'Financeiro', tools: ['Sheets', 'Faturamento', 'BI'], duration: 2.8, delay: 0.2 },
]

const builderSteps = ['Definir', 'Conectar', 'Treinar', 'Publicar', 'Monitorar']

const metrics = [
  { value: 38, prefix: '', suffix: '', label: 'horas economizadas por mês' },
  { value: 2800, prefix: 'R$ ', suffix: '', label: 'em valor gerado' },
  { value: 142, prefix: '', suffix: '', label: 'tarefas automatizadas' },
  { value: 99, prefix: '', suffix: '%', label: 'de satisfação' },
]

function DashboardMockup() {
  const mouseRef = useRef<HTMLDivElement>(null)
  const shouldReduce = useReducedMotion()
  const rotX = useSpring(0, { stiffness: 150, damping: 20 })
  const rotY = useSpring(0, { stiffness: 150, damping: 20 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduce || !mouseRef.current) return
    const rect = mouseRef.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    rotY.set(((e.clientX - cx) / (rect.width / 2)) * 8)
    rotX.set(-((e.clientY - cy) / (rect.height / 2)) * 8)
  }

  const handleMouseLeave = () => {
    rotX.set(0)
    rotY.set(0)
  }

  return (
    <m.div
      ref={mouseRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={shouldReduce ? false : { scale: 0.92, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
      style={{ perspective: '1200px', willChange: 'transform' }}
    >
      <m.div
        style={{
          rotateX: rotX,
          rotateY: rotY,
          borderRadius: '12px',
          border: '0.5px solid rgba(20,184,166,0.25)',
          background: '#0D2020',
          overflow: 'hidden',
          boxShadow: '0 0 60px rgba(20,184,166,0.15), 0 0 120px rgba(20,184,166,0.05)',
        }}
        whileHover={{ boxShadow: '0 0 80px rgba(20,184,166,0.25)' }}
        transition={{ duration: 0.2 }}
      >
        <div style={{ display: 'flex', height: '340px' }}>
          <div style={{ width: '160px', borderRight: '0.5px solid rgba(20,184,166,0.1)', padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '16px' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="3" fill="#14B8A6" />
                <line x1="12" y1="12" x2="12" y2="2" stroke="#14B8A6" strokeWidth="1.5" />
                <line x1="12" y1="12" x2="12" y2="22" stroke="#14B8A6" strokeWidth="1.5" />
                <line x1="12" y1="12" x2="2" y2="12" stroke="#14B8A6" strokeWidth="1.5" />
                <line x1="12" y1="12" x2="22" y2="12" stroke="#14B8A6" strokeWidth="1.5" />
              </svg>
              <span style={{ fontSize: '11px', fontWeight: 500, color: '#14B8A6' }}>Proxim</span>
            </div>
            {deptSidebar.map((dept, i) => {
              const Icon = dept.icon
              return (
                <div
                  key={dept.label}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 8px',
                    borderRadius: '6px',
                    background: i === 0 ? 'rgba(20,184,166,0.1)' : 'transparent',
                  }}
                >
                  <Icon size={12} color={i === 0 ? '#14B8A6' : 'rgba(255,255,255,0.3)'} />
                  <span style={{ fontSize: '10px', color: i === 0 ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.35)' }}>
                    {dept.label}
                  </span>
                </div>
              )
            })}
          </div>
          <div style={{ flex: 1, padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.35)', marginBottom: '4px' }}>Financeiro · Hoje</div>
            <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '8px', padding: '10px 12px', alignSelf: 'flex-end', maxWidth: '70%' }}>
              <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.7)' }}>Qual o saldo de caixa desta semana?</p>
            </div>
            <div style={{ background: 'rgba(20,184,166,0.06)', border: '0.5px solid rgba(20,184,166,0.15)', borderRadius: '8px', padding: '10px 12px', maxWidth: '85%' }}>
              <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.5 }}>
                Saldo atual: <span style={{ color: '#14B8A6' }}>R$ 18.420</span>. Receitas previstas: R$ 12.000. Despesas programadas: R$ 8.300.
              </p>
            </div>
            <div style={{ marginTop: 'auto', display: 'flex', gap: '6px', borderTop: '0.5px solid rgba(20,184,166,0.08)', paddingTop: '8px' }}>
              <div style={{ flex: 1, background: 'rgba(255,255,255,0.04)', borderRadius: '6px', padding: '7px 10px', fontSize: '10px', color: 'rgba(255,255,255,0.2)' }}>
                Pergunte ao Financeiro...
              </div>
              <div style={{ width: '24px', height: '24px', background: '#14B8A6', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <ChevronRight size={12} color="#fff" />
              </div>
            </div>
          </div>
        </div>
      </m.div>
    </m.div>
  )
}

export default function HomePage() {
  const shouldReduce = useReducedMotion()
  const stepsRef = useRef<HTMLDivElement>(null)
  const stepsInView = useInView(stepsRef, { once: true })

  return (
    <>
      <IntroAnimation />
      <Navbar />

      <main style={{ background: '#0A1A1A' }}>
        {/* Hero */}
        <section style={{ minHeight: '100svh', display: 'flex', alignItems: 'center', paddingTop: '80px', paddingBottom: '60px', position: 'relative', overflow: 'hidden' }}>
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', opacity: 0.03 }} aria-hidden="true">
            <filter id="noise">
              <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
              <feColorMatrix type="saturate" values="0" />
            </filter>
            <rect width="100%" height="100%" filter="url(#noise)" />
          </svg>

          <div className="mx-auto w-full max-w-6xl px-6" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
            <div>
              <m.p
                style={{ ...sectionLabel, marginBottom: '24px' }}
                initial={shouldReduce ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.18 }}
              >
                AI Operating System
              </m.p>

              <AnimatedText text="Cada área da sua empresa. Potencializada por IA." delay={0.2} className="mb-6" tag="h1" style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 500, color: 'rgba(255,255,255,0.95)', lineHeight: 1.15, marginBottom: '24px', display: 'flex', flexWrap: 'wrap', gap: '0.25em' }} />

              <m.p
                style={{ ...sectionSubtitle, marginBottom: '36px' }}
                initial={shouldReduce ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.18 }}
              >
                A plataforma que opera todos os departamentos de uma empresa para uma pessoa ou time enxuto, com IA no centro de cada função.
              </m.p>

              <m.div
                style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}
                initial={shouldReduce ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.85, duration: 0.18 }}
              >
                <Link href="/auth/register" style={{ background: '#14B8A6', color: '#ffffff', fontWeight: 500, fontSize: '13px', padding: '10px 24px', borderRadius: '8px', textDecoration: 'none', transition: 'background 0.15s' }}>
                  Começar agora
                </Link>
                <Link href="/precos" style={{ background: 'transparent', color: '#14B8A6', fontWeight: 400, fontSize: '13px', padding: '10px 24px', borderRadius: '8px', border: '0.5px solid #14B8A6', textDecoration: 'none' }}>
                  Ver planos
                </Link>
              </m.div>
            </div>

            <div className="hidden md:block">
              <DashboardMockup />
            </div>
          </div>

          <m.div
            style={{ position: 'absolute', bottom: '32px', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}
            initial={shouldReduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.3 }}
          >
            <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.08em' }}>Role para descobrir</span>
            <m.div animate={shouldReduce ? {} : { y: [0, 5, 0] }} transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}>
              <ArrowDown size={14} color="rgba(255,255,255,0.25)" />
            </m.div>
          </m.div>
        </section>

        {/* O Problema */}
        <section style={{ background: '#0A1A1A', padding: '96px 0', position: 'relative', overflow: 'hidden' }}>
          {/* Subtle animated grid */}
          <m.div
            style={{
              position: 'absolute', inset: 0, pointerEvents: 'none',
              backgroundImage: 'linear-gradient(rgba(20,184,166,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(20,184,166,0.03) 1px, transparent 1px)',
              backgroundSize: '48px 48px',
            }}
            animate={shouldReduce ? {} : { backgroundPosition: ['0px 0px', '0px 48px'] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          />

          <div className="mx-auto max-w-6xl px-6" style={{ position: 'relative' }}>
            <SectionReveal style={{ textAlign: 'center', marginBottom: '64px' }}>
              <p style={sectionLabel}>O problema</p>
              <h2 style={sectionTitle}>Ferramentas demais. Tempo de menos.</h2>
              <p style={{ ...sectionSubtitle, margin: '0 auto' }}>A maioria das empresas opera com dezenas de ferramentas desconectadas. O Proxim une tudo.</p>
            </SectionReveal>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '32px', alignItems: 'start' }}>
              {/* Sem Proxim */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <m.p
                  style={{ fontSize: '11px', fontWeight: 500, color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}
                  initial={shouldReduce ? false : { opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3 }}
                >
                  Sem o Proxim
                </m.p>
                {painPoints.map((p, i) => (
                  <m.div
                    key={p}
                    initial={shouldReduce ? false : { opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-30px 0px' }}
                    transition={{ delay: i * 0.07, duration: 0.2 }}
                    whileHover={shouldReduce ? {} : { x: 3 }}
                    style={{
                      display: 'flex', alignItems: 'flex-start', gap: '10px',
                      padding: '10px 12px', borderRadius: '8px',
                      background: 'rgba(239,68,68,0.04)',
                      border: '0.5px solid rgba(239,68,68,0.1)',
                      transition: 'border-color 0.15s',
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(239,68,68,0.25)' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(239,68,68,0.1)' }}
                  >
                    <X size={13} color="#EF4444" style={{ marginTop: '1px', flexShrink: 0, opacity: 0.7 }} />
                    <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.5 }}>{p}</span>
                  </m.div>
                ))}
              </div>

              {/* Divider */}
              <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '44px' }}>
                <div style={{ position: 'relative', width: '1px', height: '280px' }}>
                  <m.div
                    style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent, #14B8A6, transparent)' }}
                    initial={shouldReduce ? false : { scaleY: 0, opacity: 0 }}
                    whileInView={{ scaleY: 1, opacity: 0.35 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                  />
                  {/* Traveling dot */}
                  {!shouldReduce && (
                    <m.div
                      style={{ position: 'absolute', left: '-3px', width: '7px', height: '7px', borderRadius: '50%', background: '#14B8A6', boxShadow: '0 0 8px rgba(20,184,166,0.8)' }}
                      animate={{ top: ['0%', '100%'] }}
                      transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', repeatType: 'reverse' }}
                    />
                  )}
                </div>
              </div>

              {/* Com Proxim */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <m.p
                  style={{ fontSize: '11px', fontWeight: 500, color: '#14B8A6', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}
                  initial={shouldReduce ? false : { opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  Com o Proxim
                </m.p>
                {solutions.map((s, i) => (
                  <m.div
                    key={s}
                    initial={shouldReduce ? false : { opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-30px 0px' }}
                    transition={{ delay: i * 0.07 + 0.25, duration: 0.2 }}
                    whileHover={shouldReduce ? {} : { x: -3 }}
                    style={{
                      display: 'flex', alignItems: 'flex-start', gap: '10px',
                      padding: '10px 12px', borderRadius: '8px',
                      background: 'rgba(20,184,166,0.04)',
                      border: '0.5px solid rgba(20,184,166,0.1)',
                      transition: 'border-color 0.15s',
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(20,184,166,0.35)' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(20,184,166,0.1)' }}
                  >
                    <CheckCircle2 size={13} color="#14B8A6" style={{ marginTop: '1px', flexShrink: 0 }} />
                    <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.85)', lineHeight: 1.5 }}>{s}</span>
                  </m.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* A Plataforma */}
        <section id="plataforma" style={{ background: '#0D2020', padding: '96px 0' }}>
          <div className="mx-auto max-w-6xl px-6">
            <SectionReveal style={{ textAlign: 'center', marginBottom: '64px' }}>
              <p style={sectionLabel}>A plataforma</p>
              <h2 style={sectionTitle}>Tudo conectado. Tudo funcionando.</h2>
              <p style={{ ...sectionSubtitle, margin: '0 auto' }}>Skills, agentes, integrações e workflows em um fluxo contínuo que opera sua empresa.</p>
            </SectionReveal>

            <SectionReveal style={{ marginBottom: '64px', display: 'flex', justifyContent: 'center' }}>
              <NeuralNetwork />
            </SectionReveal>

            <m.div
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}
              initial={shouldReduce ? false : 'hidden'}
              whileInView="visible"
              viewport={{ once: true, margin: '-60px 0px' }}
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
            >
              {features.map(f => {
                const Icon = f.icon
                return (
                  <m.div
                    key={f.label}
                    variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0, transition: { duration: 0.18 } } }}
                    whileHover={shouldReduce ? {} : { y: -2 }}
                    style={{ background: '#0A1A1A', border: '0.5px solid rgba(20,184,166,0.12)', borderRadius: '12px', padding: '20px', cursor: 'default', transition: 'border-color 0.15s' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(20,184,166,0.35)' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(20,184,166,0.12)' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                      <div style={{ width: '28px', height: '28px', background: 'rgba(20,184,166,0.1)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Icon size={14} color="#14B8A6" />
                      </div>
                      <span style={{ fontSize: '13px', fontWeight: 500, color: 'rgba(255,255,255,0.9)' }}>{f.label}</span>
                    </div>
                    <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.5 }}>{f.desc}</p>
                  </m.div>
                )
              })}
            </m.div>
          </div>
        </section>

        {/* Departamentos */}
        <section id="departamentos" style={{ background: '#0A1A1A', padding: '96px 0', overflow: 'hidden' }}>
          <div className="mx-auto max-w-6xl px-6">
            <SectionReveal style={{ textAlign: 'center', marginBottom: '64px' }}>
              <p style={sectionLabel}>Departamentos</p>
              <h2 style={sectionTitle}>Seis áreas. Uma plataforma.</h2>
              <p style={{ ...sectionSubtitle, margin: '0 auto' }}>Cada departamento opera com agentes especializados, skills treinadas e fluxos automatizados.</p>
            </SectionReveal>
          </div>

          {/* Full-width carousel — intentionally overflows the max-w container */}
          <SectionReveal>
            <DeptCarousel />
          </SectionReveal>
        </section>

        {/* Agentes */}
        <section id="agentes" style={{ background: '#0D2020', padding: '96px 0' }}>
          <div className="mx-auto max-w-6xl px-6">
            <SectionReveal style={{ textAlign: 'center', marginBottom: '64px' }}>
              <p style={sectionLabel}>Agentes</p>
              <h2 style={sectionTitle}>Funcionários de IA com identidade própria.</h2>
              <p style={{ ...sectionSubtitle, margin: '0 auto' }}>Crie agentes com nome, função e ferramentas próprias. Eles trabalham enquanto você foca no que importa.</p>
            </SectionReveal>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '64px' }}>
              {agents.map((agent, i) => (
                <FloatingCard key={agent.name} duration={agent.duration} delay={agent.delay}>
                  <SectionReveal delay={i * 0.1}>
                    <m.div
                      style={{ background: '#0A1A1A', border: '0.5px solid rgba(20,184,166,0.2)', borderRadius: '12px', padding: '20px', textAlign: 'center' }}
                      {...(!shouldReduce && { whileHover: { y: -4 } })}
                      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    >
                      <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(20,184,166,0.1)', border: '0.5px solid rgba(20,184,166,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', fontSize: '16px', fontWeight: 500, color: '#14B8A6' }}>
                        {agent.name[0]}
                      </div>
                      <p style={{ fontSize: '14px', fontWeight: 500, color: 'rgba(255,255,255,0.9)', marginBottom: '4px' }}>{agent.name}</p>
                      <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.45)', marginBottom: '12px' }}>{agent.role}</p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', justifyContent: 'center' }}>
                        {agent.tools.map(tool => (
                          <span key={tool} style={{ fontSize: '10px', padding: '2px 8px', borderRadius: '9999px', background: 'rgba(20,184,166,0.08)', border: '0.5px solid rgba(20,184,166,0.2)', color: '#14B8A6' }}>
                            {tool}
                          </span>
                        ))}
                      </div>
                    </m.div>
                  </SectionReveal>
                </FloatingCard>
              ))}
            </div>

            <SectionReveal>
              <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)', textAlign: 'center', marginBottom: '32px' }}>Agent Builder — 5 passos para criar seu agente</p>
              <div ref={stepsRef} style={{ display: 'flex', alignItems: 'center', gap: '0', position: 'relative' }}>
                {builderSteps.map((step, i) => (
                  <div key={step} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', position: 'relative' }}>
                    {i < builderSteps.length - 1 && (
                      <m.div
                        style={{ position: 'absolute', top: '16px', left: '50%', right: '-50%', height: '1px', background: '#14B8A6', transformOrigin: 'left', opacity: 0.3 }}
                        initial={shouldReduce ? false : { scaleX: 0 }}
                        animate={stepsInView || shouldReduce ? { scaleX: 1 } : {}}
                        transition={{ delay: i * 0.25 + 0.1, duration: 0.3 }}
                      />
                    )}
                    <m.div
                      style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(20,184,166,0.1)', border: '0.5px solid rgba(20,184,166,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 500, color: '#14B8A6', zIndex: 1 }}
                      initial={shouldReduce ? false : { opacity: 0, scale: 0.8 }}
                      animate={stepsInView || shouldReduce ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: i * 0.25, type: 'spring', stiffness: 300, damping: 25 }}
                    >
                      {i + 1}
                    </m.div>
                    <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.45)' }}>{step}</span>
                  </div>
                ))}
              </div>
            </SectionReveal>
          </div>
        </section>

        {/* Números */}
        <section style={{ background: '#0A1A1A', padding: '96px 0' }}>
          <div className="mx-auto max-w-6xl px-6">
            <SectionReveal style={{ textAlign: 'center', marginBottom: '64px' }}>
              <p style={sectionLabel}>Resultados</p>
              <h2 style={sectionTitle}>O que o Proxim entrega.</h2>
            </SectionReveal>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
              {metrics.map((metric, i) => (
                <SectionReveal key={metric.label} delay={i * 0.15}>
                  <div style={{ textAlign: 'center', padding: '32px 24px', background: '#0D2020', border: '0.5px solid rgba(20,184,166,0.1)', borderRadius: '12px' }}>
                    <div style={{ fontSize: '36px', fontWeight: 500, color: '#14B8A6', marginBottom: '8px' }}>
                      <Counter target={metric.value} prefix={metric.prefix} suffix={metric.suffix} />
                    </div>
                    <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.4 }}>{metric.label}</p>
                  </div>
                </SectionReveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section style={{ background: '#0A1A1A', padding: '120px 0', textAlign: 'center' }}>
          <div className="mx-auto max-w-3xl px-6">
            <SectionReveal style={{ marginBottom: '24px' }}>
              <p style={sectionLabel}>Comece hoje</p>
            </SectionReveal>

            <h2 style={{ fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 500, color: 'rgba(255,255,255,0.95)', lineHeight: 1.15, marginBottom: '20px' }}>
              <TextScramble text="Sua empresa nunca mais vai esperar." />
            </h2>

            <SectionReveal delay={0.2} style={{ marginBottom: '40px' }}>
              <p style={{ ...sectionSubtitle, margin: '0 auto', textAlign: 'center' }}>
                Comece agora e veja seus departamentos operando com inteligência em menos de 24 horas.
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
