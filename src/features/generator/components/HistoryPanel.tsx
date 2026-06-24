import { useState } from 'react'
import { usePasswordStore } from '@/features/generator/store'

function timeAgo(date: number): string {
  const sec = Math.floor((Date.now() - date) / 1000)
  if (sec < 5) return 'recién'
  if (sec < 60) return `hace ${sec} seg`
  const min = Math.floor(sec / 60)
  if (min === 1) return 'hace 1 min'
  if (min < 60) return `hace ${min} min`
  const hrs = Math.floor(min / 60)
  return `hace ${hrs} ${hrs === 1 ? 'hora' : 'horas'}`
}

export default function HistoryPanel() {
  const sessionHistory = usePasswordStore((state) => state.sessionHistory)
  const clearHistory = usePasswordStore((state) => state.clearHistory)
  const historyOpen = usePasswordStore((state) => state.historyOpen)
  const toggleHistory = usePasswordStore((state) => state.toggleHistory)
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null)

  async function handleCopy(password: string, id: string) {
    try {
      await navigator.clipboard.writeText(password)
      setCopiedIndex(id)
      setTimeout(() => setCopiedIndex(null), 2000)
    } catch {
      setCopiedIndex(null)
    }
  }

  return (
    <>
      {/* FAB button */}
      <button
        onClick={toggleHistory}
        aria-label="Abrir historial de sesión"
        aria-expanded={historyOpen}
        style={{
          all: 'unset',
          cursor: 'pointer',
          position: 'fixed',
          bottom: '1.5rem',
          right: '1.5rem',
          width: '52px',
          height: '52px',
          borderRadius: '50%',
          background: 'var(--gradient-cta)',
          color: '#fff',
          fontSize: '1.3rem',
          display: 'grid',
          placeItems: 'center',
          boxShadow: '0 4px 24px var(--color-pink-glow)',
          transition: 'all var(--duration-fast) var(--ease-out)',
          zIndex: 999,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)'
          e.currentTarget.style.boxShadow = '0 6px 32px var(--color-pink-glow)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = ''
          e.currentTarget.style.boxShadow = ''
        }}
      >
        📜
        {sessionHistory.length > 0 && (
          <span style={{
            position: 'absolute',
            top: '-4px',
            right: '-4px',
            background: 'var(--color-pink)',
            color: '#fff',
            fontSize: '0.65rem',
            fontWeight: 700,
            fontFamily: 'var(--font-mono)',
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            display: 'grid',
            placeItems: 'center',
            border: '2px solid var(--color-surface)',
          }}>
            {sessionHistory.length}
          </span>
        )}
      </button>

      {/* Panel */}
      {historyOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '5.5rem',
            right: '1.5rem',
            width: '340px',
            maxHeight: '460px',
            background: 'rgba(8,12,28,0.95)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-lg)',
            boxShadow: '0 16px 48px rgba(0,0,0,0.6)',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 1000,
            overflow: 'hidden',
            animation: 'fadeIn var(--duration-normal) var(--ease-out)',
          }}
          role="dialog"
          aria-label="Historial de sesión"
        >
          {/* Header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1rem 1.25rem',
            borderBottom: '1px solid var(--color-border)',
          }}>
            <h3 style={{
              fontSize: '0.85rem',
              fontWeight: 700,
              color: 'var(--color-text)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}>
              📜 Historial de sesión
              <span style={{
                fontSize: '0.7rem',
                color: 'var(--color-text-tertiary)',
                fontWeight: 500,
              }}>
                ({sessionHistory.length})
              </span>
            </h3>
            <div style={{ display: 'flex', gap: '0.35rem' }}>
              {sessionHistory.length > 0 && (
                <button
                  onClick={clearHistory}
                  aria-label="Limpiar historial"
                  style={{
                    all: 'unset',
                    cursor: 'pointer',
                    fontSize: '0.75rem',
                    color: 'var(--color-text-tertiary)',
                    padding: '0.25rem 0.5rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--color-border)',
                    transition: 'all var(--duration-fast) var(--ease-out)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--color-error)'
                    e.currentTarget.style.borderColor = 'var(--color-error)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--color-text-tertiary)'
                    e.currentTarget.style.borderColor = 'var(--color-border)'
                  }}
                >
                  🗑 Limpiar
                </button>
              )}
              <button
                onClick={toggleHistory}
                aria-label="Cerrar historial"
                style={{
                  all: 'unset',
                  cursor: 'pointer',
                  color: 'var(--color-text-tertiary)',
                  fontSize: '1.1rem',
                  padding: '0.25rem 0.5rem',
                  borderRadius: 'var(--radius-sm)',
                  transition: 'all var(--duration-fast) var(--ease-out)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--color-text)'
                  e.currentTarget.style.background = 'var(--color-accent-soft)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--color-text-tertiary)'
                  e.currentTarget.style.background = 'transparent'
                }}
              >
                ✕
              </button>
            </div>
          </div>

          {/* Content */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '0.75rem 1.25rem',
          }}>
            {sessionHistory.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '2rem 0',
                color: 'var(--color-text-tertiary)',
                fontSize: '0.8rem',
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📭</div>
                <p>Todavía no generaste ninguna frase</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {sessionHistory.map((entry, i) => (
                  <div
                    key={entry.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: i === 0 ? '0.6rem 0.5rem' : '0.6rem 0',
                      borderBottom: i < sessionHistory.length - 1 ? '1px solid rgba(99,102,241,0.06)' : 'none',
                      background: i === 0 ? 'rgba(99,102,241,0.04)' : 'transparent',
                      margin: i === 0 ? '0 -0.5rem' : '0',
                      borderRadius: i === 0 ? 'var(--radius-sm)' : undefined,
                    }}
                  >
                    {/* Index */}
                    <span style={{
                      fontSize: '0.65rem',
                      fontWeight: 700,
                      color: 'var(--color-text-tertiary)',
                      fontFamily: 'var(--font-mono)',
                      minWidth: '1.2rem',
                    }}>
                      #{sessionHistory.length - i}
                    </span>

                    {/* Password */}
                    <span style={{
                      flex: 1,
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      color: 'var(--color-text)',
                      wordBreak: 'break-all',
                    }}>
                      {entry.password}
                    </span>

                    {/* Bits */}
                    <span style={{
                      fontSize: '0.65rem',
                      color: 'var(--color-cyan)',
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 600,
                      whiteSpace: 'nowrap',
                      minWidth: '2.5rem',
                      textAlign: 'right',
                    }}>
                      {entry.bits}b
                    </span>

                    {/* Time */}
                    <span style={{
                      fontSize: '0.6rem',
                      color: 'var(--color-text-tertiary)',
                      whiteSpace: 'nowrap',
                      minWidth: '3.5rem',
                      textAlign: 'right',
                    }}>
                      {timeAgo(entry.timestamp)}
                    </span>

                    {/* Copy */}
                    <button
                      onClick={() => handleCopy(entry.password, entry.id)}
                      aria-label={`Copiar frase ${sessionHistory.length - i}`}
                      style={{
                        all: 'unset',
                        cursor: 'pointer',
                        fontSize: '0.85rem',
                        color: copiedIndex === entry.id ? 'var(--color-success)' : 'var(--color-text-tertiary)',
                        transition: 'all var(--duration-fast) var(--ease-out)',
                        flexShrink: 0,
                      }}
                    >
                      {copiedIndex === entry.id ? '✅' : '📋'}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div style={{
            padding: '0.6rem 1.25rem',
            borderTop: '1px solid var(--color-border)',
            fontSize: '0.65rem',
            color: 'var(--color-text-tertiary)',
            textAlign: 'center',
          }}>
            El historial vive solo en memoria · No se persiste
          </div>
        </div>
      )}
    </>
  )
}
