import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { Plus_Jakarta_Sans } from 'next/font/google'
import { Providers } from './providers'
import { MotionProvider } from '@/components/providers/motion-provider'
import './globals.css'

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-primary',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Proxim — AI Operating System',
  description: 'A plataforma que opera todos os departamentos de uma empresa para uma pessoa ou time enxuto.',
  openGraph: {
    title: 'Proxim — AI Operating System',
    description: 'Sempre ao lado. Em cada decisão.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" className={plusJakartaSans.variable}>
      <body style={{ fontFamily: 'var(--font-primary)' }}>
        <MotionProvider>
          <Providers>
            {children}
          </Providers>
        </MotionProvider>
      </body>
    </html>
  )
}
