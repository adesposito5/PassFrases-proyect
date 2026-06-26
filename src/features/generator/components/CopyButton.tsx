import { useState, useCallback } from 'react'
import { Copy, Check } from 'lucide-react'

interface CopyButtonProps {
  text: string
}

export function CopyButton({ text }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }, [text])

  return (
    <button
      onClick={handleCopy}
      disabled={!text}
      aria-label={copied ? 'Contraseña copiada' : 'Copiar contraseña al portapapeles'}
      style={{
        all: 'unset',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.4rem',
        padding: '0.85rem 1.2rem',
        borderRadius: '12px',
        border: '1px solid var(--color-border)',
        background: copied ? 'var(--color-success-soft)' : 'transparent',
        color: copied ? 'var(--color-success)' : 'var(--color-text)',
        fontSize: '0.9rem',
        fontWeight: 600,
        fontFamily: 'var(--font-sans)',
        transition: 'all var(--duration-fast) var(--ease-out)',
        opacity: !text ? 0.5 : 1,
      }}
      onMouseEnter={(e) => {
        if (text) {
          e.currentTarget.style.borderColor = 'var(--color-accent)'
          e.currentTarget.style.background = 'var(--color-accent-soft)'
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--color-border)'
        e.currentTarget.style.background = copied ? 'var(--color-success-soft)' : 'transparent'
      }}
    >
      {copied ? <Check size={18} aria-hidden="true" /> : <Copy size={18} aria-hidden="true" />}
      {copied ? 'Copiado' : 'Copiar'}
    </button>
  )
}