'use client'

import { useState, useEffect, useRef } from 'react'
import { m, AnimatePresence, useReducedMotion } from 'framer-motion'
import { FileText } from 'lucide-react'

type Demo = {
  tab: string
  userMsg: string
  botMsg: string
  export: string
}

const demos: Demo[] = [
  {
    tab: 'Financeiro',
    userMsg: 'Gere o fluxo de caixa de junho',
    botMsg: 'Analisando os lançamentos de junho. Receitas: R$ 42.800. Despesas: R$ 31.200. Saldo líquido: R$ 11.600. Identificamos três picos de saída nos dias 5, 15 e 25, coincidindo com folha e fornecedores. Relatório detalhado pronto para exportação.',
    export: 'fluxo-caixa-junho.xlsx',
  },
  {
    tab: 'Juridico',
    userMsg: 'Rascunhe um contrato de prestação de serviço',
    botMsg: 'Contrato rascunhado com as cláusulas padrão: objeto, prazo, valor, forma de pagamento, obrigações das partes, sigilo, rescisão e foro. Apliquei as diretrizes da sua empresa. Revise os valores e datas antes de assinar.',
    export: 'contrato-prestacao-servico.docx',
  },
  {
    tab: 'Atendimento',
    userMsg: 'Como responder reclamação sobre atraso na entrega',
    botMsg: 'Resposta sugerida: "Lamentamos o atraso. Identificamos o problema e seu pedido será entregue em até 2 dias úteis. Como compensação, aplicamos desconto de 10% na próxima compra. Qualquer dúvida, estamos à disposição." Tom alinhado com sua política de atendimento.',
    export: 'resposta-padrao-atraso.txt',
  },
]

type Phase = 'idle' | 'user' | 'typing' | 'bot' | 'export'

export function ChatDemo() {
  const [activeTab, setActiveTab] = useState(0)
  const [phase, setPhase] = useState<Phase>('idle')
  const [displayedBot, setDisplayedBot] = useState('')
  const shouldReduce = useReducedMotion()
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const runDemo = (tabIdx: number) => {
    if (timerRef.current) clearTimeout(timerRef.current)
    setDisplayedBot('')
    setPhase('user')

    const currentDemo = demos[tabIdx]
    if (!currentDemo) return

    timerRef.current = setTimeout(() => {
      setPhase('typing')
      timerRef.current = setTimeout(() => {
        const words = currentDemo.botMsg.split(' ')
        let i = 0
        setPhase('bot')
        setDisplayedBot('')

        const interval = setInterval(() => {
          i++
          setDisplayedBot(words.slice(0, i).join(' '))
          if (i >= words.length) {
            clearInterval(interval)
            timerRef.current = setTimeout(() => setPhase('export'), 600)
          }
        }, shouldReduce ? 0 : 40)
      }, shouldReduce ? 0 : 1200)
    }, shouldReduce ? 0 : 400)
  }

  useEffect(() => {
    runDemo(activeTab)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [activeTab])

  const demo = demos[activeTab] ?? demos[0]!

  return (
    <div
      style={{
        background: '#0D2020',
        border: '0.5px solid rgba(20,184,166,0.12)',
        borderRadius: '12px',
        overflow: 'hidden',
        maxWidth: '640px',
        margin: '0 auto',
      }}
    >
      <div
        style={{
          display: 'flex',
          borderBottom: '0.5px solid rgba(20,184,166,0.12)',
          padding: '0 4px',
        }}
      >
        {demos.map((d, i) => (
          <button
            key={d.tab}
            onClick={() => { setActiveTab(i) }}
            style={{
              padding: '12px 16px',
              fontSize: '12px',
              fontWeight: activeTab === i ? 500 : 400,
              color: activeTab === i ? '#14B8A6' : 'rgba(255,255,255,0.45)',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              borderBottom: activeTab === i ? '1px solid #14B8A6' : '1px solid transparent',
              transition: 'color 0.15s',
              minHeight: '44px',
            }}
          >
            {d.tab}
          </button>
        ))}
      </div>

      <div style={{ padding: '20px', minHeight: '220px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <AnimatePresence mode="popLayout">
          {(phase === 'user' || phase === 'typing' || phase === 'bot' || phase === 'export') && (
            <m.div
              key="user-msg"
              style={{
                alignSelf: 'flex-end',
                background: 'rgba(20,184,166,0.12)',
                border: '0.5px solid rgba(20,184,166,0.25)',
                borderRadius: '8px 8px 2px 8px',
                padding: '8px 12px',
                fontSize: '13px',
                color: 'rgba(255,255,255,0.9)',
                maxWidth: '80%',
              }}
              initial={shouldReduce ? false : { opacity: 0, y: 8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            >
              {demo.userMsg}
            </m.div>
          )}

          {phase === 'typing' && (
            <m.div
              key="typing"
              style={{ display: 'flex', gap: '4px', padding: '8px 12px', alignSelf: 'flex-start' }}
              initial={shouldReduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {[0, 1, 2].map(i => (
                <m.span
                  key={i}
                  style={{ width: '5px', height: '5px', background: '#14B8A6', borderRadius: '50%', display: 'block' }}
                  animate={shouldReduce ? {} : { opacity: [0.3, 1, 0.3] }}
                  transition={{ delay: i * 0.15, duration: 0.8, repeat: Infinity }}
                />
              ))}
            </m.div>
          )}

          {(phase === 'bot' || phase === 'export') && displayedBot && (
            <m.div
              key="bot-msg"
              style={{
                alignSelf: 'flex-start',
                background: '#0F2828',
                border: '0.5px solid rgba(20,184,166,0.12)',
                borderRadius: '2px 8px 8px 8px',
                padding: '8px 12px',
                fontSize: '13px',
                color: 'rgba(255,255,255,0.8)',
                lineHeight: 1.6,
                maxWidth: '88%',
              }}
              initial={shouldReduce ? false : { opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.15 }}
            >
              {displayedBot}
            </m.div>
          )}

          {phase === 'export' && (
            <m.div
              key="export"
              style={{
                alignSelf: 'flex-start',
                background: 'rgba(20,184,166,0.06)',
                border: '0.5px solid rgba(20,184,166,0.2)',
                borderRadius: '8px',
                padding: '8px 12px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '12px',
                color: '#14B8A6',
              }}
              initial={shouldReduce ? false : { opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            >
              <FileText size={14} />
              <span>{demo.export}</span>
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
