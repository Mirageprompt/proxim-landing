'use client'

import Link from 'next/link'
import { m, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const footerLinks = {
  produto: [
    { href: '/#plataforma', label: 'Plataforma' },
    { href: '/#departamentos', label: 'Departamentos' },
    { href: '/#agentes', label: 'Agentes' },
    { href: '/precos', label: 'Preços' },
  ],
  empresa: [
    { href: '/sobre', label: 'Sobre' },
    { href: '/sobre#roadmap', label: 'Roadmap' },
  ],
  contato: [
    { label: 'gabrielgodoyy808@gmail.com', href: 'mailto:gabrielgodoyy808@gmail.com' },
  ],
}

export function Footer() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] })
  const wordmarkY = useTransform(scrollYProgress, [0, 1], [20, -10])

  return (
    <footer
      ref={ref}
      style={{
        background: '#0A1A1A',
        borderTop: '0.5px solid rgba(20,184,166,0.12)',
        paddingTop: '64px',
        paddingBottom: '32px',
        overflow: 'hidden',
      }}
    >
      <div className="mx-auto max-w-6xl px-6">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '48px',
            marginBottom: '64px',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="3" fill="#14B8A6" />
                <line x1="12" y1="12" x2="12" y2="2" stroke="#14B8A6" strokeWidth="1.5" />
                <line x1="12" y1="12" x2="12" y2="22" stroke="#14B8A6" strokeWidth="1.5" />
                <line x1="12" y1="12" x2="2" y2="12" stroke="#14B8A6" strokeWidth="1.5" />
                <line x1="12" y1="12" x2="22" y2="12" stroke="#14B8A6" strokeWidth="1.5" />
              </svg>
              <span style={{ color: '#14B8A6', fontSize: '14px', fontWeight: 500 }}>Proxim</span>
            </div>
            <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)', lineHeight: 1.6, maxWidth: '180px' }}>
              Sempre ao lado. Em cada decisão.
            </p>
          </div>

          <div>
            <p style={{ fontSize: '10px', fontWeight: 500, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px' }}>
              Produto
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {footerLinks.produto.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)', textDecoration: 'none', transition: 'color 0.15s' }}
                  onMouseEnter={e => { (e.target as HTMLElement).style.color = '#14B8A6' }}
                  onMouseLeave={e => { (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.45)' }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p style={{ fontSize: '10px', fontWeight: 500, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px' }}>
              Empresa
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {footerLinks.empresa.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)', textDecoration: 'none', transition: 'color 0.15s' }}
                  onMouseEnter={e => { (e.target as HTMLElement).style.color = '#14B8A6' }}
                  onMouseLeave={e => { (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.45)' }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p style={{ fontSize: '10px', fontWeight: 500, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px' }}>
              Contato
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {footerLinks.contato.map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)', textDecoration: 'none', transition: 'color 0.15s' }}
                  onMouseEnter={e => { (e.target as HTMLElement).style.color = '#14B8A6' }}
                  onMouseLeave={e => { (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.45)' }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div
          style={{
            borderTop: '0.5px solid rgba(20,184,166,0.08)',
            paddingTop: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '8px',
          }}
        >
          <m.span
            style={{
              fontSize: '10px',
              fontWeight: 300,
              color: 'rgba(255,255,255,0.08)',
              letterSpacing: '0.05em',
              y: wordmarkY,
              display: 'block',
            }}
          >
            PROXIM
          </m.span>
          <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.2)', fontWeight: 400 }}>
            © 2026 Proxim. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
