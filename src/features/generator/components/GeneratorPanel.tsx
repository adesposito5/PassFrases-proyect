import { useNavigate } from 'react-router-dom'
import { usePasswordStore } from '@/features/generator/store'
import { PasswordDisplay } from './PasswordDisplay'

const SEPARATORS = [
  { value: '-', label: '-' },
  { value: '.', label: '.' },
  { value: '_', label: '_' },
] as const

export default function GeneratorPanel() {
  const config = usePasswordStore((state) => state.config)
  const currentStep = usePasswordStore((state) => state.currentStep)
  const setWordCount = usePasswordStore((state) => state.setWordCount)
  const setSeparator = usePasswordStore((state) => state.setSeparator)
  const toggleNumbers = usePasswordStore((state) => state.toggleNumbers)
  const toggleSymbols = usePasswordStore((state) => state.toggleSymbols)
  const toggleCapitalize = usePasswordStore((state) => state.toggleCapitalize)
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

        {/* ── Cantidad de palabras ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text)' }}>
              Cantidad de palabras
            </span>
            <span style={{ fontSize: '0.85rem', color: 'var(--color-accent)', fontWeight: 600, fontFamily: 'var(--font-mono)' }}>
              {config.wordCount}
            </span>
          </div>
          <input
            type="range"
            min={2}
            max={6}
            step={1}
            value={config.wordCount}
            aria-label="Cantidad de palabras"
            aria-valuenow={config.wordCount}
            aria-valuemin={2}
            aria-valuemax={6}
            onChange={(e) => setWordCount(Number(e.target.value))}
            style={{
              width: '100%',
              height: '5px',
              appearance: 'none',
              WebkitAppearance: 'none',
              background: `linear-gradient(to right, var(--color-accent) 0%, var(--color-accent) ${((config.wordCount - 2) / 4) * 100}%, var(--color-border) ${((config.wordCount - 2) / 4) * 100}%, var(--color-border) 100%)`,
              borderRadius: '99px',
              outline: 'none',
              cursor: 'pointer',
            }}
          />
        </div>

        {/* ── Separador ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text)' }}>
            Separador
          </span>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {SEPARATORS.map((sep) => (
              <button
                key={sep.value}
                onClick={() => setSeparator(sep.value)}
                aria-selected={config.separator === sep.value}
                style={{
                  flex: 1,
                  padding: '0.65rem 0.5rem',
                  border: `1px solid ${config.separator === sep.value ? 'var(--color-accent)' : 'var(--color-border)'}`,
                  borderRadius: 'var(--radius-md)',
                  background: config.separator === sep.value ? 'var(--color-accent-soft)' : 'transparent',
                  color: config.separator === sep.value ? 'var(--color-accent)' : 'var(--color-text-tertiary)',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  fontFamily: 'var(--font-mono)',
                  cursor: 'pointer',
                  transition: 'all var(--duration-fast) var(--ease-out)',
                  boxShadow: config.separator === sep.value ? '0 0 20px rgba(99,102,241,0.1)' : 'none',
                }}
              >
                {sep.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Toggles ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem' }}>
          {[
            { label: '123', desc: 'Números',    value: config.includeNumbers,  toggle: toggleNumbers },
            { label: 'Aa',  desc: 'Mayúsculas', value: config.capitalize,      toggle: toggleCapitalize },
            { label: '!@#', desc: 'Símbolos',   value: config.includeSymbols,  toggle: toggleSymbols },
          ].map((item) => (
            <div
              key={item.desc}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.6rem 0.85rem',
                background: 'var(--color-accent-soft)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
              }}
            >
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  color: 'var(--color-text)',
                  userSelect: 'none',
                }}
              >
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
                  {item.label}
                </span>
                {item.desc}
              </label>

              <button
                role="switch"
                aria-checked={item.value}
                aria-label={item.desc}
                onClick={item.toggle}
                style={{
                  all: 'unset',
                  cursor: 'pointer',
                  width: '38px',
                  height: '22px',
                  background: item.value ? 'var(--gradient-blue)' : 'var(--color-border)',
                  borderRadius: '99px',
                  position: 'relative',
                  transition: 'background var(--duration-fast) var(--ease-out)',
                  flexShrink: 0,
                }}
              >
                <span style={{
                  position: 'absolute',
                  top: '2px',
                  left: item.value ? '18px' : '2px',
                  width: '18px',
                  height: '18px',
                  background: item.value ? '#fff' : 'var(--color-text-tertiary)',
                  borderRadius: '50%',
                  transition: 'all var(--duration-fast) var(--ease-out)',
                }} />
              </button>
            </div>
          ))}
        </div>

        {/* ── Botón generar ── */}
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

        {/* ── Volver a inicio ── */}
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

      <PasswordDisplay />

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
      </div>

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
