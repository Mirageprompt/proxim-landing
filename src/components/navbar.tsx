'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { m, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { ScrollProgress } from './scroll-progress'

const ProximLogo = () => (
  <Link href="/" className="flex items-center gap-2">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="3" fill="#14B8A6" />
      <line x1="12" y1="12" x2="12" y2="2" stroke="#14B8A6" strokeWidth="1.5" />
      <line x1="12" y1="12" x2="12" y2="22" stroke="#14B8A6" strokeWidth="1.5" />
      <line x1="12" y1="12" x2="2" y2="12" stroke="#14B8A6" strokeWidth="1.5" />
      <line x1="12" y1="12" x2="22" y2="12" stroke="#14B8A6" strokeWidth="1.5" />
    </svg>
    <span style={{ color: '#14B8A6', fontSize: '15px', fontWeight: 500, letterSpacing: '0.02em' }}>
      Proxim
    </span>
  </Link>
)

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/precos', label: 'Preços' },
  { href: '/sobre', label: 'Sobre' },
]

type NavLinkProps = {
  href: string
  label: string
  active: boolean
  onClick?: React.MouseEventHandler<HTMLAnchorElement>
}

function NavLink({ href, label, active, onClick }: NavLinkProps) {
  const shouldReduce = useReducedMotion()

  return (
    <Link
      href={href}
      {...(onClick ? { onClick } : {})}
      className="relative text-sm font-[400] transition-colors duration-150"
      style={{
        color: active ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.55)',
        fontSize: '13px',
      }}
    >
      {label}
      {active && (
        <m.span
          layoutId="active-link"
          className="absolute -bottom-0.5 left-0 right-0 h-px"
          style={{ background: '#14B8A6' }}
          transition={{ type: 'spring', stiffness: 350, damping: 30 }}
        />
      )}
      {!active && !shouldReduce && (
        <m.span
          className="absolute -bottom-0.5 left-0 right-0 h-px origin-left"
          style={{ background: '#14B8A6' }}
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.15 }}
        />
      )}
    </Link>
  )
}

export function Navbar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const shouldReduce = useReducedMotion()

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: 'rgba(10,26,26,0.85)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: '0.5px solid rgba(20,184,166,0.12)',
          height: '60px',
        }}
      >
        <nav className="mx-auto flex h-full max-w-6xl items-center justify-between px-6">
          <ProximLogo />

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <NavLink
                key={link.href}
                href={link.href}
                label={link.label}
                active={pathname === link.href}
              />
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/auth/login"
              style={{
                color: 'rgba(255,255,255,0.55)',
                fontSize: '13px',
                fontWeight: 400,
              }}
              className="transition-colors hover:text-white"
            >
              Entrar
            </Link>
            <Link
              href="/auth/register"
              className="rounded-md px-4 py-2 text-sm font-[500] transition-colors"
              style={{
                background: '#14B8A6',
                color: '#ffffff',
                fontSize: '13px',
                borderRadius: '8px',
                padding: '8px 18px',
              }}
              onMouseEnter={e => { (e.target as HTMLElement).style.background = '#0D9488' }}
              onMouseLeave={e => { (e.target as HTMLElement).style.background = '#14B8A6' }}
            >
              Começar agora
            </Link>
          </div>

          <button
            className="md:hidden flex items-center justify-center"
            onClick={() => setMobileOpen(v => !v)}
            aria-label="Abrir menu"
            style={{ color: 'rgba(255,255,255,0.7)', padding: '8px', minWidth: '44px', minHeight: '44px' }}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>

        <ScrollProgress />
      </header>

      <AnimatePresence mode="wait">
        {mobileOpen && (
          <m.div
            className="fixed inset-0 z-40 md:hidden"
            style={{ background: '#0A1A1A', paddingTop: '60px' }}
            initial={shouldReduce ? false : { opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className="flex flex-col gap-6 p-8">
              {navLinks.map(link => (
                <NavLink
                  key={link.href}
                  href={link.href}
                  label={link.label}
                  active={pathname === link.href}
                  onClick={() => setMobileOpen(false)}
                />
              ))}
              <Link
                href="/auth/register"
                onClick={() => setMobileOpen(false)}
                className="mt-4 rounded-md py-3 text-center font-[500]"
                style={{
                  background: '#14B8A6',
                  color: '#ffffff',
                  fontSize: '13px',
                  borderRadius: '8px',
                }}
              >
                Começar agora
              </Link>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  )
}
