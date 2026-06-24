import { usePasswordStore } from '@/features/generator/store'

const STRENGTH_LABELS: Record<string, string> = {
  'weak':        'Débil',
  'medium':      'Media',
  'strong':      'Fuerte',
  'very-strong': 'Muy fuerte',
}

const STRENGTH_COLORS: Record<string, string> = {
  'weak':        'var(--color-error)',
  'medium':      'var(--color-warning)',
  'strong':      'var(--color-success)',
  'very-strong': 'var(--color-cyan)',
}

export function PasswordDisplay() {
  const currentResult = usePasswordStore((state) => state.currentResult)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>

      {/* Contraseña */}
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '1.4rem',
        fontWeight: 700,
        letterSpacing: '-0.01em',
        padding: '1.25rem 1.5rem',
        background: 'rgba(0,0,0,0.3)',
        border: '1px solid var(--color-border)',
        borderRadius: '14px',
        wordBreak: 'break-all',
        lineHeight: 1.5,
        userSelect: 'all',
        textAlign: 'center',
        color: 'var(--color-text)',
        minHeight: '4rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {currentResult?.password ?? 'Generando…'}
      </div>

      {/* Barra de entropía */}
      {currentResult && (
        <>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', whiteSpace: 'nowrap', flexShrink: 0 }}>
              Entropía
            </span>
            <div style={{ flex: 1, height: '7px', background: 'var(--color-border)', borderRadius: '99px', overflow: 'hidden' }}>
              <div style={{
                height: '100%',
                width: `${Math.min(100, (currentResult.bits / 80) * 100)}%`,
                borderRadius: '99px',
                background: 'linear-gradient(90deg, var(--color-error), var(--color-warning), var(--color-success), var(--color-cyan))',
                transition: `width var(--duration-slow) var(--ease-out)`,
              }} />
            </div>
            <span style={{
              fontSize: '0.85rem',
              fontWeight: 700,
              color: 'var(--color-cyan)',
              fontFamily: 'var(--font-mono)',
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}>
              {currentResult.bits} bits
            </span>
          </div>

          {/* Tags */}
          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <span style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              padding: '0.4rem 0.9rem',
              borderRadius: '99px',
              fontSize: '0.75rem',
              fontWeight: 500,
              background: `${STRENGTH_COLORS[currentResult.strength]}18`,
              border: `1px solid ${STRENGTH_COLORS[currentResult.strength]}33`,
              color: STRENGTH_COLORS[currentResult.strength],
            }}>
              🔒 {STRENGTH_LABELS[currentResult.strength]}
            </span>
            <span style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              padding: '0.4rem 0.9rem',
              borderRadius: '99px',
              fontSize: '0.75rem',
              fontWeight: 500,
              background: 'var(--color-accent-soft)',
              border: '1px solid rgba(99,102,241,0.2)',
              color: 'var(--color-accent)',
            }}>
              ✦ {currentResult.password.length} caracteres
            </span>
          </div>
        </>
      )}
    </div>
  )
}