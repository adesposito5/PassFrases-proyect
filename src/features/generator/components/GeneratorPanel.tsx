import { useNavigate } from 'react-router-dom'
import { usePasswordStore } from '@/features/generator/store'
import { CopyButton } from '@/features/generator/components/CopyButton'

export default function GeneratorPanel() {
  const currentResult = usePasswordStore((state) => state.currentResult)
  const currentStep = usePasswordStore((state) => state.currentStep)
  const generate = usePasswordStore((state) => state.generate)
  const setStep = usePasswordStore((state) => state.setStep)
  const navigate = useNavigate()

  function handleGenerate() {
    generate()
    setStep(3)
  }

  function handleBackToStep2() {
    setStep(2)
  }

  function handleBackToStart() {
    setStep(1)
    navigate('/')
  }

  /* ═══════════════ STEP 2: PERSONALIZAR ═══════════════ */
  if (currentStep === 2) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, textAlign: 'center', color: 'var(--color-text)' }}>
          Personalizá tu contraseña
        </h2>

        <div style={{
          textAlign: 'center',
          padding: '1.5rem',
          color: 'var(--color-text-tertiary)',
          fontSize: '0.9rem',
          border: '1px dashed var(--color-border)',
          borderRadius: 'var(--radius-md)',
        }}>
          <p style={{ margin: 0 }}>Opciones de personalización próximamente</p>
        </div>

        <button
          onClick={handleGenerate}
          aria-label="Generar nueva contraseña"
          style={{
            all: 'unset',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            width: '100%',
            padding: '1rem',
            borderRadius: '14px',
            background: 'var(--gradient-blue)',
            color: '#fff',
            fontSize: '1.05rem',
            fontWeight: 700,
            fontFamily: 'var(--font-sans)',
            transition: 'all var(--duration-fast) var(--ease-out)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)'
            e.currentTarget.style.boxShadow = '0 8px 32px rgba(99,102,241,0.35)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = ''
            e.currentTarget.style.boxShadow = ''
          }}
        >
          ✨ Generar nueva
        </button>

        <button
          onClick={handleBackToStart}
          style={{
            all: 'unset',
            cursor: 'pointer',
            textAlign: 'center',
            marginTop: '0.25rem',
            fontSize: '0.85rem',
            color: 'var(--color-text-tertiary)',
            fontFamily: 'var(--font-sans)',
            padding: '4px 0',
            transition: 'color var(--duration-fast) var(--ease-out)',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-pink)' }}
          onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-text-tertiary)' }}
        >
          ← Volver a inicio
        </button>
      </div>
    )
  }

  /* ═══════════════ STEP 3: RESULTADO ═══════════════ */
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', textAlign: 'center' }}>
      <div style={{ fontSize: '2.8rem', display: 'inline-block', marginBottom: '0.5rem', filter: 'drop-shadow(0 0 24px rgba(99,102,241,0.35))' }}>
        🛡️
      </div>

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

      <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
        <button
          onClick={handleGenerate}
          style={{
            all: 'unset',
            cursor: 'pointer',
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.4rem',
            padding: '0.85rem',
            borderRadius: '12px',
            background: 'var(--gradient-blue)',
            color: '#fff',
            fontSize: '0.9rem',
            fontWeight: 600,
            fontFamily: 'var(--font-sans)',
            transition: 'all var(--duration-fast) var(--ease-out)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(99,102,241,0.3)'
            e.currentTarget.style.transform = 'translateY(-1px)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = ''
            e.currentTarget.style.transform = ''
          }}
        >
          🔄 Generar nueva
        </button>
        <CopyButton text={currentResult?.password ?? ''} full />
      </div>

      {currentResult?.analysis ? (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          padding: '1rem',
          border: '1px solid var(--color-border)',
          borderRadius: '16px',
          background: 'rgba(255,255,255,0.04)',
          color: 'var(--color-text)',
          textAlign: 'left',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
            <div>
              <p style={{ margin: 0, fontSize: '0.95rem', fontWeight: 700 }}>Análisis de seguridad</p>
              <p style={{ margin: '0.35rem 0 0', fontSize: '0.85rem', color: 'var(--color-text-tertiary)' }}>
                Recomendaciones basadas en la contraseña generada.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <span style={{ padding: '0.45rem 0.75rem', borderRadius: '999px', background: 'rgba(99,102,241,0.12)', color: 'var(--color-text)', fontSize: '0.8rem', fontWeight: 700 }}>
                Entropía: {currentResult.analysis.entropy === null ? 'No disponible' : `${currentResult.analysis.entropy.toFixed(1)} bits`}
              </span>
              <span style={{ padding: '0.45rem 0.75rem', borderRadius: '999px', background: 'rgba(34,197,94,0.12)', color: 'var(--color-success)', fontSize: '0.8rem', fontWeight: 700 }}>
                {currentResult.analysis.recommendations.length} recomendación{currentResult.analysis.recommendations.length === 1 ? '' : 'es'}
              </span>
            </div>
          </div>

          {currentResult.analysis.recommendations.length > 0 ? (
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              {currentResult.analysis.recommendations.map((recommendation) => (
                <div key={recommendation.id} style={{
                  padding: '1rem',
                  borderRadius: '12px',
                  border: '1px solid var(--color-border)',
                  background: recommendation.severity === 'high'
                    ? 'rgba(239,68,68,0.08)'
                    : recommendation.severity === 'medium'
                      ? 'rgba(245,158,11,0.08)'
                      : 'rgba(34,197,94,0.08)',
                }}>
                  <p style={{ margin: 0, fontWeight: 700, color: 'var(--color-text)' }}>{recommendation.title}</p>
                  <p style={{ margin: '0.35rem 0 0', fontSize: '0.9rem', color: 'var(--color-text-tertiary)' }}>{recommendation.detail}</p>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ padding: '1rem', borderRadius: '12px', background: 'rgba(34,197,94,0.08)', color: 'var(--color-success)', fontWeight: 600 }}>
              ¡Excelente! No hay recomendaciones adicionales para esta contraseña.
            </div>
          )}
        </div>
      ) : null}

      <button
        onClick={handleBackToStep2}
        style={{
          all: 'unset',
          cursor: 'pointer',
          textAlign: 'center',
          marginTop: '0.25rem',
          fontSize: '0.85rem',
          color: 'var(--color-text-tertiary)',
          fontFamily: 'var(--font-sans)',
          padding: '4px 0',
          transition: 'color var(--duration-fast) var(--ease-out)',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-pink)' }}
        onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-text-tertiary)' }}
      >
        ← Personalizar
      </button>
    </div>
  )
}
